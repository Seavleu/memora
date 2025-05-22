import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SearchInterface } from "@/components/dashboard/search-interface";

export default function SearchPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Search"
        text="Search across all your meeting recordings and transcripts."
      />
      <SearchInterface />
    </DashboardShell>
  );
}