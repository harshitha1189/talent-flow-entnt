"use client";
import { useEffect } from "react";

export default function MockWorkerGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@/mocks"); 
    }
  }, []);

  return null;
}
