/**
 * Screenshot registry.
 *
 * Every phone on the site renders one of these screens. To swap a placeholder
 * for the real app, drop the image into /public/app-screens/ using the file
 * name below (any of .webp / .png / .jpg / .jpeg). Nothing else needs to change:
 * resolveScreens() detects the file at build time and the placeholder is
 * replaced automatically. See /public/app-screens/README.md.
 */

export const screenKeys = [
  "landlord-home",
  "property-details",
  "onboarding",
  "invitation",
  "tenant-join",
  "tenant-home",
  "report-issue",
] as const;

export type ScreenKey = (typeof screenKeys)[number];

export type ScreenMeta = {
  /** Short Hebrew name shown on the placeholder and used as alt text. */
  label: string;
  /** Who sees this screen in the app. Shown on the placeholder. */
  audience: "בעל הדירה" | "השוכר";
};

export const screenMeta: Record<ScreenKey, ScreenMeta> = {
  "landlord-home": { label: "מסך הבית", audience: "בעל הדירה" },
  "property-details": { label: "פרטי הנכס", audience: "בעל הדירה" },
  onboarding: { label: "הוספת נכס", audience: "בעל הדירה" },
  invitation: { label: "הזמנת שוכר", audience: "בעל הדירה" },
  "tenant-join": { label: "הצטרפות עם קוד", audience: "השוכר" },
  "tenant-home": { label: "הדירה שלי", audience: "השוכר" },
  "report-issue": { label: "דיווח על תקלה", audience: "השוכר" },
};

/** A screen after resolution: `src` is null while only the placeholder exists. */
export type Screen = ScreenMeta & {
  key: ScreenKey;
  src: string | null;
};

export type Screens = Record<ScreenKey, Screen>;
