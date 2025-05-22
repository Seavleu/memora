import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { MeetingList } from "@/components/dashboard/meeting-list";
import { UploadAudio } from "@/components/dashboard/upload-audio";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Search } from "@/components/dashboard/search";

export default function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Manage your meeting recordings and transcripts."
      >
        <UploadAudio />
      </DashboardHeader>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardTabs />
          <Search />
          <MeetingList />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  );
}