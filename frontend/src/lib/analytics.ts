// Thin wrapper over window.ptTrack, which /analytics.js defines (served by the backend:
// real GA4 + consent banner once GA4_MEASUREMENT_ID is set, a no-op stub before that, and
// absent entirely under the Vite dev server). Analytics must never break the app, so this
// never throws and never sends personal data -- event names and coarse parameters only.
declare global {
  interface Window {
    ptTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export function track(name: string, params?: Record<string, unknown>): void {
  try {
    window.ptTrack?.(name, params);
  } catch {
    // ignore
  }
}
