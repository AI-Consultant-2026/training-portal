import { ComponentType, lazy } from "react";

// react-router page components in this app all use named exports (not default), so
// React.lazy -- which only accepts a promise resolving to { default }, per the React
// docs -- can't be pointed at an import() call directly. This adapts a named export to
// that shape without needing a default-export wrapper file per page.
export function lazyImport<P extends object>(
  factory: () => Promise<Record<string, unknown>>,
  exportName: string,
) {
  return lazy(async () => {
    const module = await factory();
    return { default: module[exportName] as ComponentType<P> };
  });
}
