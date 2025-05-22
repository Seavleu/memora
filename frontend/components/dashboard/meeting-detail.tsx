"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Star, 
  Download, 
  Share2, 
  MoreVertical, 
  Edit, 
  Trash2,
  Play,
  Pause,
  Volume2,
  SkipForward,
  SkipBack,
  Clock,
  Users,
  Wand2,
  Loader2 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock data for meetings
const MOCK_MEETING_DATA = {
  "1": {
    id: "1",
    title: "Weekly Team Sync",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    duration: "45 minutes",
    participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    status: "completed",
    isFavorite: true,
    transcript: `
      [00:00:05] John: Let's start by going through last week's action items.
      [00:01:20] Jane: I completed the design review for the new landing page.
      [00:02:45] Mike: I've been working on the API integration, but I'm facing some issues with authentication.
      [00:03:30] John: Can you elaborate on the issues you're facing?
      [00:04:15] Mike: The OAuth flow is not working correctly. I think there might be an issue with the redirect URI.
      [00:05:40] Jane: I can help you with that after the meeting.
      [00:06:20] John: Great, thanks Jane. Now, let's discuss the upcoming sprint planning.
      [00:10:15] John: Any other topics we need to cover today?
      [00:10:30] Jane: Yes, we need to decide on the launch date for the new feature.
      [00:12:45] Mike: I think we should aim for next Wednesday, assuming we resolve the authentication issues by Friday.
      [00:15:10] John: Sounds good. Let's plan for Wednesday then.
    `,
    summary: `
      # Meeting Summary

      ## Key Points
      - Jane completed the design review for the new landing page
      - Mike is facing issues with OAuth authentication in the API integration
      - Jane offered to help Mike with the authentication issue
      - Team discussed sprint planning for upcoming week
      - Decided on Wednesday as the launch date for the new feature

      ## Action Items
      - Mike to fix the OAuth authentication issues by Friday
      - Jane to assist Mike with authentication issues
      - All team members to prepare for Wednesday feature launch
      - John to communicate launch date to stakeholders

      ## Decisions Made
      - New feature will be launched on Wednesday
      - Next sprint planning meeting scheduled for Monday
    `,
  },
  "2": {
    id: "2",
    title: "Product Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    duration: "1 hour 15 minutes",
    participants: ["Jane Smith", "Sarah Connor", "Tom Wilson"],
    status: "completed",
    isFavorite: false,
    transcript: `
      [00:00:10] Jane: Today we need to finalize the roadmap for Q3.
      [00:01:30] Sarah: I've gathered feedback from customers about the most requested features.
      [00:03:15] Tom: Let's prioritize based on both customer requests and technical feasibility.
      [00:05:20] Jane: Good point. What are the top three customer requests?
      [00:06:45] Sarah: First is improved search functionality, second is better mobile support, and third is integration with third-party tools.
      [00:08:30] Tom: From a technical perspective, the search improvements would require the most work.
      [00:10:15] Jane: Let's prioritize mobile support first since it aligns with our company goal of increasing mobile usage.
      [00:15:40] Sarah: I agree. We've seen a 25% increase in mobile users over the last quarter.
      [00:18:20] Tom: We should also consider how these features align with our marketing campaigns.
      [00:22:10] Jane: Good point. Let's ensure our marketing team is aware of the upcoming features.
    `,
    summary: `
      # Meeting Summary

      ## Key Points
      - Team discussed the product roadmap for Q3
      - Sarah presented customer feedback on most requested features
      - Top three customer requests: improved search, better mobile support, integration with third-party tools
      - Mobile usage has increased by 25% over the last quarter

      ## Action Items
      - Prioritize mobile support development for Q3
      - Sarah to share detailed customer feedback with development team
      - Tom to assess technical requirements for search improvements
      - Jane to coordinate with marketing team on upcoming features

      ## Decisions Made
      - Mobile support will be the top priority for Q3
      - Search improvements will be planned for Q4
      - Team will revisit third-party integrations after mobile support is completed
    `,
  },
  "3": {
    id: "3",
    title: "Client Onboarding: Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72),
    duration: "35 minutes",
    participants: ["John Doe", "Client Representative"],
    status: "completed",
    isFavorite: false,
    transcript: `
      [00:00:15] John: Thank you for choosing our platform. Today we'll go through the onboarding process.
      [00:01:30] Client: We're excited to get started. Our team is eager to implement your solution.
      [00:02:45] John: Great! Let's start with setting up your account and configuring initial preferences.
      [00:05:20] Client: Do you provide any training materials for our team?
      [00:06:15] John: Yes, we have comprehensive documentation, video tutorials, and we can arrange a training session for your team.
      [00:08:30] Client: That would be very helpful. When can we schedule the training?
      [00:09:45] John: We can schedule it for next week. I'll send you some available time slots after this call.
      [00:11:20] Client: Perfect. And what about data migration from our current system?
      [00:12:30] John: We have a dedicated migration tool. I'll introduce you to our migration specialist who will guide you through the process.
      [00:15:10] Client: That sounds great. What are the next steps?
    `,
    summary: `
      # Meeting Summary

      ## Key Points
      - Initial onboarding meeting with Acme Corp
      - Discussed account setup and initial configuration
      - Client team is eager to implement the solution
      - Client requested training materials and sessions

      ## Action Items
      - John to send available time slots for team training next week
      - John to introduce client to migration specialist
      - Client to prepare current system data for migration
      - Schedule follow-up meeting after initial setup is complete

      ## Decisions Made
      - Training session will be scheduled for next week
      - Data migration will be handled by the migration specialist
      - Client will use provided documentation and video tutorials for initial familiarization
    `,
  },
  "4": {
    id: "4",
    title: "Design Review",
    date: new Date(Date.now() - 1000 * 60 * 10),
    duration: "52 minutes",
    participants: ["Sarah Connor", "Mike Johnson", "Tom Wilson"],
    status: "processing",
    isFavorite: false,
    progress: 65,
    transcript: "",
    summary: "",
  },
};

interface MeetingDetailProps {
  id: string;
}

export function MeetingDetail({ id }: MeetingDetailProps) {
  const router = useRouter();
  const [meeting, setMeeting] = useState(MOCK_MEETING_DATA[id as keyof typeof MOCK_MEETING_DATA]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(0.75);
  const [generatingSummary, setGeneratingSummary] = useState(false);

  const toggleFavorite = () => {
    setMeeting({
      ...meeting,
      isFavorite: !meeting.isFavorite,
    });
  };

  const handleGenerateSummary = () => {
    if (meeting.status === "processing") {
      toast.error("Meeting is still being processed", {
        description: "Please wait until processing is complete to generate a summary."
      });
      return;
    }
    
    setGeneratingSummary(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratingSummary(false);
      
      setMeeting({
        ...meeting,
        summary: `
          # Meeting Summary

          ## Key Points
          - Discussed design updates for the application dashboard
          - Reviewed user feedback on recent UI changes
          - Decided on color scheme adjustments for better accessibility

          ## Action Items
          - Sarah to update the design mockups based on feedback
          - Mike to implement the approved design changes by next week
          - Tom to conduct user testing on the new design

          ## Decisions Made
          - Approved new color palette for improved accessibility
          - Simplified navigation menu structure
          - Added new user onboarding flow
        `,
      });
      
      toast.success("Summary generated", {
        description: "AI summary has been generated successfully."
      });
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className={meeting.isFavorite ? "text-yellow-500" : "text-muted-foreground"}
          >
            <Star className="h-4 w-4" fill={meeting.isFavorite ? "currentColor" : "none"} />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{meeting.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {meeting.date.toLocaleDateString()} • {meeting.duration}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {meeting.participants.join(", ")}
              </div>
              {meeting.status === "processing" && (
                <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  Processing
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {meeting.status === "processing" ? (
            <div className="space-y-4 py-8">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Processing meeting</h3>
                  <p className="text-sm text-muted-foreground">
                    Your meeting is being transcribed and analyzed. This may take a few minutes.
                  </p>
                </div>
                <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs">
                    <span>Processing...</span>
                    <span>{meeting.progress}%</span>
                  </div>
                  <Progress value={meeting.progress} className="mt-2" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-md bg-muted/50 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-16 w-full bg-muted/50 rounded-md relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                      Audio waveform visualization (simulated)
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="transcript">
                <TabsList className="mb-4">
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="transcript" className="space-y-4">
                  <div className="rounded-md border p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{meeting.transcript}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="summary" className="space-y-4">
                  {meeting.summary ? (
                    <div className="rounded-md border p-4">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <pre className="text-sm whitespace-pre-wrap font-sans">{meeting.summary}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                      <Wand2 className="h-8 w-8 text-muted-foreground" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Generate AI summary</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Get a concise summary of this meeting, including key points, action items, and decisions.
                        </p>
                      </div>
                      <Button onClick={handleGenerateSummary} disabled={generatingSummary}>
                        {generatingSummary ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Summary
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}