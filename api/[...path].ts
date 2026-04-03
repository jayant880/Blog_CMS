import app from "../backend/src/index";
import type { IncomingMessage, ServerResponse } from "node:http";

export default function handler(req: IncomingMessage & { url?: string }, res: ServerResponse) {
  // Ensure Express sees the same `/api/*` path it expects.
  // Vercel routes this function at `/api/*` and may pass `req.url` as `/<rest>`.
  if (req.url && !req.url.startsWith("/api")) {
    req.url = `/api${req.url.startsWith("/") ? "" : "/"}${req.url}`;
  }
  return app(req as any, res as any);
}

