// src/lib/vapi.js
import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_API_KEY);
