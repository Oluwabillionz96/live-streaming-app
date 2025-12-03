"use client";
import DashboardOverview from "@/components/dashboard-overview";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/store/auth-store";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

const PageContents = ({
  pageTitle,
  pageDesc,
  children,
}: {
  pageTitle: string;
  pageDesc: string;
  children?: ReactNode;
}) => {
  return (
    <section>
      <header className="py-4">
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
  const signOut = useAuthStore((state) => state.signOut);

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
        >
          <Button onClick={signOut}>Log out</Button>
        </PageContents>
      ) : null}
    </>
  );
};

export default DashboardNavigations;
