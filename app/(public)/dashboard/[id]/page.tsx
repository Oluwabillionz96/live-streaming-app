"use client";
import DashboardOverview from "@/components/dashboard-overview";
import { useParams } from "next/navigation";

const DashboardNavigations = () => {
  const params = useParams();

  const pageId = Array.isArray(params.id) ? params.id[0] : params.id;

  return <>{pageId === "overview" ? <DashboardOverview /> : <>{pageId}</>}</>;
};

export default DashboardNavigations;
