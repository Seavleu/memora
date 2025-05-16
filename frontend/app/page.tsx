import AudioUploader from "./components/AudioUploader" 
import MeetingList from "./components/MeetingList"

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Memora: AI Meeting Memory</h1>
      <AudioUploader />
      <MeetingList />
    </main>
  )
}
