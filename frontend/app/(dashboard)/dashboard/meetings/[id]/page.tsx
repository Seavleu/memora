import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MeetingDetail } from "@/components/dashboard/meeting-detail";

export const metadata: Metadata = {
  title: "Meeting Details",
  description: "View detailed meeting information, transcript, and summary.",
};

interface MeetingPageProps {
  params: {
    id: string;
  };
}

export default function MeetingPage({ params }: MeetingPageProps) {
  // In a real application, you would fetch the meeting data from an API
  // For this demo, we'll use mock data based on the ID
  
  // If the ID is invalid, return 404
  if (params.id !== "1" && params.id !== "2" && params.id !== "3" && params.id !== "4") {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Meeting Details"
        text="View detailed meeting information, transcript, and summary."
      />
      <MeetingDetail id={params.id} />
    </DashboardShell>
  );
}