import "server-only";
import fs from "node:fs";
import path from "node:path";
import { screenKeys, screenMeta, type Screens } from "./screens";

const EXTENSIONS = ["webp", "png", "jpg", "jpeg", "avif"];
const DIR = path.join(process.cwd(), "public", "app-screens");

/** Looks for /public/app-screens/<key>.<ext> for every registered screen. */
export function resolveScreens(): Screens {
  const entries = screenKeys.map((key) => {
    const ext = EXTENSIONS.find((e) => fs.existsSync(path.join(DIR, `${key}.${e}`)));
    return [key, { key, ...screenMeta[key], src: ext ? `/app-screens/${key}.${ext}` : null }];
  });
  return Object.fromEntries(entries) as Screens;
}
