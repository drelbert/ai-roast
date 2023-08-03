'use client'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts'

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative text-white">
        <div
          className="absolute left-2 top-2 w-4 h-4 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.subject}</p>
        <p className="intro text-lg ">{analysis.roast}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'90%'}>
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <YAxis dataKey="sentimentScore" />
        <XAxis dataKey="updatedAt" className="" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
