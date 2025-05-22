'use client'

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "sonner"

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null)
  const [transcript, setTranscript] = useState("")
  const [loading, setLoading] = useState(false)
  // const { toast } = useToast()


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
      toast.success("Upload Successful", { description: "Transcript generated." })
    } catch (err) {
        toast.error("Upload Failed", { description: "Something went wrong." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Upload Meeting Audio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button onClick={handleUpload} disabled={loading || !file}>
          {loading ? "Transcribing..." : "Upload & Transcribe"}
        </Button>

        {transcript && (
          <Tabs defaultValue="transcript" className="mt-6">
            <TabsList>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="summary" disabled>Summary</TabsTrigger>
              <TabsTrigger value="actions" disabled>Action Items</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript">
              <Textarea readOnly rows={10} value={transcript} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
