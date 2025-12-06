"use client";
import DashboardOverview from "@/components/dashboard-overview";
import SettingsPage from "@/components/settings-page";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export const PageContents = ({
  pageTitle,
  pageDesc,
  children,
}: {
  pageTitle: string;
  pageDesc: string;
  children?: ReactNode;
}) => {
  return (
    <section className="min-h-screen  text-white">
      <header className="py-4 border-b mb-4">
        <h2 className="mb-6">{pageTitle}</h2>
        <p className="text-(--color-text-secondary)">{pageDesc}</p>
      </header>
      {children}
    </section>
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
          pageTitle="Upcoming and Past Streams"
          pageDesc="Your stream upcoming and past streams will appear here."
        />
      ) : pageId === "analytics" ? (
        <PageContents
          pageDesc=" Detailed analytics and insights coming soon."
          pageTitle="Analytics"
        />
      ) : pageId === "settings" ? (
        <SettingsPage />
      ) : null}
    </>
  );
};

export default DashboardNavigations;
