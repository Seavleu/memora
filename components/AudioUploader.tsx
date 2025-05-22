"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AudioUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [transcript, setTranscript] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await axios.post("http://localhost:8000/api/upload/audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setTranscript(res.data.transcript)
    } catch (err) {
      console.error(err)
      setTranscript("Error uploading file.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept=".mp3"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Transcribing..." : "Upload & Transcribe"}
      </Button>
      {transcript && (
        <Textarea readOnly value={transcript} rows={12} />
      )}
    </div>
  )
}
