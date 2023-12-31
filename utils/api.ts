// util fn to create the url dynamically
// for the built in Request object
const createURL = (path) => {
  return window.location.origin + path
}

// these functions call the respective apis in /api folder roast, group, question ...
export const updateEntry = async (id, content) => {
  const res = await fetch(
    // uisng the Request standard object built into web
    new Request(createURL(`/api/roast/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
  //  when error
  return { error: true, code: 3434, messageForUI: 'Error Message ...' }
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/roast'), {
      method: 'POST',
      body: JSON.stringify({}),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

// for the qa search bar feature
export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

// for adding a group
export const createGroup = async (title) => {
  const res = await fetch(
    new Request(createURL('api/group'), {
      method: 'POST',
      body: JSON.stringify({ title }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
