import { createRouteHandler } from "uploadthing/next";
 
export const dynamic = 'force-dynamic' 
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    logLevel: "debug",
    callbackUrl: 'https://chatbot.sfxdx.com',
    isDev: true,
    uploadthingId: '*YOUR_APP_ID*',
    uploadthingSecret: '*YOUR_SECRET*'
  }, 
  // Apply an (optional) custom config:
  // config: { ... },
});