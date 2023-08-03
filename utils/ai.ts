// the llm wrapper
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import z from 'zod'

// the sentiment analysis section
// build parser that takes in a zod object, the schema
// the use of langchain StructuredOutputParser allows for a simplified tempalte below
// and is good for our use case as it allows for passing of structured data
// from getPrompt to the analyze function
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
    roast: z
      .string()
      .describe(
        'The coffee bean roast result according to the person who wrote the entry.'
      ),
    summary: z
      .string()
      .describe('Two word summary of the entire coffee bean roast entry.'),
    subject: z
      .string()
      .describe('The name of the coffee bean that was roasted.'),
    negative: z
      .boolean()
      .describe(
        'Is the coffee bean roast roast entry negative? (i.e. does it contain negative langauge?)'
      ),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the coffee bean roast of the entry.  Example #0101fe for blue representing a positive coffee bean roast result'
      ),
  })
)

// prompt engineering
const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    // steering instructions
    template:
      'Analyze the following coffee bean roast entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  // console.log(input)
  return input
}

export const analyze = async (content) => {
  // pass in the results of parser and getPrompt
  const input = await getPrompt(content)
  // temperature is a setting (for a completion) which describes the variance of outcomes
  // set at 0 to reduce hallucination for deterministic outcome
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  // make the completion
  const result = await model.call(input)

  // if parser fails to parse json
  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
  // console.log(result)
}

// the search section = question and answer
// how to feed llm to answer the search input question?
// given token limitations
export const qa = async (question, entries) => {
  // turn all entries into a langchain doc with map
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })

  // create a search model
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  // chain multiple llm calls together
  // loadQARefinedChain iterates over docs updating the previous answer
  const chain = loadQARefineChain(model)
  // const to handle the converstion of text to numerical vectors
  const embeddings = new OpenAIEmbeddings()
  // implementing a vector store
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  // get the refined set of entries to answer the question
  const relevantDocs = await store.similaritySearch(question)
  // make the call to ai
  const res = await chain.call({
    input_documents: relevantDocs,
    // this is where the response can be dialed in
    question,
  })
  return res.output_text
}
