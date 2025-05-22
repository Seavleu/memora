import { formatDistanceToNow } from "date-fns";
import { MessageSquare, FileText, Upload, Download } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for activities
const activities = [
  {
    id: "1",
    type: "upload",
    title: "Design Review",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    icon: <Upload className="h-4 w-4" />,
  },
  {
    id: "2",
    type: "comment",
    title: "Added comment to Weekly Team Sync",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "3",
    type: "download",
    title: "Downloaded Product Planning transcript",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    icon: <Download className="h-4 w-4" />,
  },
  {
    id: "4",
    type: "summary",
    title: "Generated summary for Client Onboarding",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    icon: <FileText className="h-4 w-4" />,
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                {activity.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}