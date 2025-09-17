// src/mocks/index.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

if (typeof window !== "undefined") {
  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js", 
    },
  });
  console.log("[MSW] Mocking enabled 🚀");
}
