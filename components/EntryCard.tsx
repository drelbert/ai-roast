// server component as its rendering data

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">Added: {date}</div>
      <div className="px-4 py-5 sm:px-6">{entry.content}</div>
      <div className="px-4 py-4 sm:px-6">{entry.analysis.subject}</div>
    </div>
  )
}

export default EntryCard
