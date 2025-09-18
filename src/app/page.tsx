"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("seenOnboarding");
    if (seen) {
      router.replace("/jobs");
    } else {
      router.replace("/onboarding");
    }
  }, [router]);

  return null;
}
