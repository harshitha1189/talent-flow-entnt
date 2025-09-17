import "./globals.css";
import { ThemeProvider } from "next-themes";
import MockWorkerGuard from "@/components/MockWorkerGuard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          {/* ✅ Start MSW in dev (only on client) */}
          <MockWorkerGuard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
