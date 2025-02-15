// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // Your existing Next.js configuration
  experimental:{
    // instrumentationHook: true,
  }
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: "islam-abozeed",
  project: "repairshop",

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false, // Can be used to suppress logs

  hideSourceMaps: true,
  disableLogger:true
});
