/**
 * Server-side environment variables for the Next.js app.
 * All values are read from process.env at runtime.
 */
export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-in-prod",
  supermoveWebhookUrl: process.env.SUPERMOVE_WEBHOOK_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  ownerName: process.env.OWNER_NAME ?? "",
  nodeEnv: process.env.NODE_ENV ?? "development",
};
