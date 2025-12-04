import { onRequest } from "firebase-functions/v2/https";
import app from "./server";

// You can also configure CORS here instead of using the cors() middleware.
export const api = onRequest(
  { cors: ["http://localhost:5173", /web\.app$/, /firebaseapp\.com$/] },
  app
);