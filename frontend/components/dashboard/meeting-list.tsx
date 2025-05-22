"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { 
  Star, 
  MoreVertical, 
  Download, 
  Trash2, 
  Edit, 
  Clock, 
  Share2 
} from "lucide-react";

import { useHasMounted } from "@/lib/useHasMounted";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";

// Mock data for meetings
const MOCK_MEETINGS = [
  {
    id: "1",
    title: "Weekly Team Sync",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    duration: "45 minutes",
    participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    status: "completed",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Product Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    duration: "1 hour 15 minutes",
    participants: ["Jane Smith", "Sarah Connor", "Tom Wilson"],
    status: "completed",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Client Onboarding: Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72),
    duration: "35 minutes",
    participants: ["John Doe", "Client Representative"],
    status: "completed",
    isFavorite: false,
  },
  {
    id: "4",
    title: "Design Review",
    date: new Date(Date.now() - 1000 * 60 * 10),
    duration: "52 minutes",
    participants: ["Sarah Connor", "Mike Johnson", "Tom Wilson"],
    status: "processing",
    isFavorite: false,
    progress: 65,
  },
];

export function MeetingList() {
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);
  const [loading, setLoading] = useState(false);
  const hasMounted = useHasMounted()

  const toggleFavorite = (id: string) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === id
          ? { ...meeting, isFavorite: !meeting.isFavorite }
          : meeting
      )
    );
  };

  const deleteMeeting = (id: string) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== id));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-40" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <EmptyPlaceholder
        title="No meetings found"
        description="Upload your first meeting recording to get started."
        buttonText="Upload Audio"
        buttonHref="#"
      />
    );
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-start justify-between p-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Link href={`/dashboard/meetings/${meeting.id}`} className="hover:underline">
                    <h3 className="font-medium">{meeting.title}</h3>
                  </Link>
                  {meeting.status === "processing" && (
                    <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Processing
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {hasMounted ? (
                    <span>
                    {formatDistanceToNow(meeting.date, { addSuffix: true })} • {meeting.duration}
                  </span>
                  ) : (
                    <span>Loading time...</span>
                  )}
                </div>
                <div className="flex items-center -space-x-2 overflow-hidden">
                  {meeting.participants.map((participant, i) => (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                      title={participant}
                    >
                      {participant.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(meeting.id)}
                  className={meeting.isFavorite ? "text-yellow-500" : "text-muted-foreground"}
                >
                  <Star className="h-4 w-4" fill={meeting.isFavorite ? "currentColor" : "none"} />
                  <span className="sr-only">Favorite</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/meetings/${meeting.id}`}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => deleteMeeting(meeting.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {meeting.status === "processing" && (
              <div className="bg-muted px-6 py-3">
                <div className="flex justify-between text-xs">
                  <span>Processing...</span>
                  <span>{meeting.progress}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted-foreground/20">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${meeting.progress}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}