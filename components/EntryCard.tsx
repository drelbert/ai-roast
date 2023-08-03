// server component as its rendering data

// entry = the prop
const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5  ">
        <div className="flex gap-x-4 ">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6">{entry.analysis.subject}</p>
          </div>

          <div
            className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset "
            style={{ backgroundColor: entry.analysis.color }}
          >
            {entry.analysis.summary}
          </div>
        </div>

        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 ">{date}</p>
        </div>
      </li>
    </ul>
  )
}

export default EntryCard
