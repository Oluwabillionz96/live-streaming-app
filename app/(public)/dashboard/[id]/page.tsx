"use client";
import DashboardOverview from "@/components/dashboard-overview";
import { useParams } from "next/navigation";

const PageContents = ({
  pageTitle,
  pageDesc,
}: {
  pageTitle: string;
  pageDesc: string;
}) => {
  return (
    <div>
      <h2 className="mb-6">{pageTitle}</h2>
      <p className="text-(--color-text-secondary)">{pageDesc}</p>
    </div>
  );
};

const DashboardNavigations = () => {
  const params = useParams();

  const pageId = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <>
      {pageId === "overview" ? (
        <DashboardOverview />
      ) : pageId === "streams" ? (
        <PageContents
          pageTitle="Past Streams"
          pageDesc="Your stream history will appear here."
        />
      ) : pageId === "analytics" ? (
        <PageContents
          pageDesc=" Detailed analytics and insights coming soon."
          pageTitle="Analytics"
        />
      ) : pageId === "settings" ? (
        <PageContents
          pageTitle="Settings"
          pageDesc=" Channel settings and preferences."
        />
      ) : null}
    </>
  );
};

export default DashboardNavigations;
