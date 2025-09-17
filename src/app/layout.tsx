import "./globals.css";
import { ThemeProvider } from "next-themes";

if (process.env.NODE_ENV === "development") {
  // Load MSW only in dev
  import("@/mocks").then(({ initMocks }) => {
    initMocks();
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
