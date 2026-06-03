"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const AcademyPage = dynamic(() => import("@/app/academy/page"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function DashboardPage() {
  return <AcademyPage />;
}
