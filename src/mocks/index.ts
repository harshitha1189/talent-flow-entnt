import { handlers } from "./handlers";

export async function initMocks() {
  if (typeof window === "undefined") {
    // 👉 Running on server (SSR / build)
    const { setupServer } = await import("msw/node");
    const server = setupServer(...handlers);
    server.listen({ onUnhandledRequest: "bypass" });
    console.log("[MSW] Server-side mocking enabled 🚀");
    return server;
  } else {
    // 👉 Running on browser (client)
    const { setupWorker } = await import("msw/browser");
    const worker = setupWorker(...handlers);
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: { url: "/mockServiceWorker.js" },
    });
    console.log("[MSW] Client-side mocking enabled 🚀");
    return worker;
  }
}
