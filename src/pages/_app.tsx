// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../app/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("@/mocks").then(({ initMocks }) => {
    initMocks();
  });
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      console.log("✅ MSW enabled");
    }
  }, []);

  return <Component {...pageProps} />;
}
