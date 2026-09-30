"use client";

import { createContext, useContext } from "react";
import type { ScreenKey, Screens } from "@/lib/screens";

const ScreensContext = createContext<Screens | null>(null);

/** Receives the build-time screen map (see lib/resolve-screens.ts). */
export function ScreensProvider({ screens, children }: { screens: Screens; children: React.ReactNode }) {
  return <ScreensContext.Provider value={screens}>{children}</ScreensContext.Provider>;
}

export function useScreen(key: ScreenKey) {
  const screens = useContext(ScreensContext);
  if (!screens) throw new Error("useScreen must be used inside <ScreensProvider>");
  return screens[key];
}
