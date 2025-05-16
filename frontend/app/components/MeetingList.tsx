"use client"

import { useEffect, useState } from "react"
import axios from "axios"

type Meeting = {
  id: number
  title: string
  transcript: string
  created_at: string
}

export default function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([])

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await axios.get("http://localhost:8000/api/meetings/")
      setMeetings(res.data)
    }
    fetchMeetings()
  }, [])

  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-2xl font-semibold">Past Meetings</h2>
      <div className="space-y-2">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-4 border rounded shadow-sm">
            <p className="font-medium">{meeting.title}</p>
            <p className="text-xs text-muted-foreground">{new Date(meeting.created_at).toLocaleString()}</p>
            <p className="text-sm mt-2 line-clamp-3">{meeting.transcript}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
