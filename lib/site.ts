/**
 * Site-wide configuration for the דירתי marketing site.
 * Everything a non-developer might need to change lives here.
 */

export const site = {
  name: "דירתי",
  /** Production URL. Set NEXT_PUBLIC_SITE_URL in the hosting environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "דירתי | ניהול דירה להשכרה, לבעלי דירות ולשוכרים",
  description:
    "דירתי היא אפליקציה לניהול דירה להשכרה. בעל הדירה מוסיף את הנכס ומזמין את השוכר, ומשם פרטי השכירות, התשלומים ודיווחי התקלות נשארים מסודרים במקום אחד.",
  keywords: [
    "ניהול דירה להשכרה",
    "ניהול נכסים",
    "אפליקציה למשכיר",
    "אפליקציה לבעלי דירות",
    "ניהול שוכרים",
    "דיווח תקלות בדירה",
    "ניהול שכירות",
  ],

  /**
   * Where "הצטרפו לדירתי" leads.
   * TODO: replace with the App Store / Google Play / sign-up link once it exists.
   * Until then every CTA scrolls to the closing section.
   */
  joinHref: "#join",

  /**
   * The closing "מתחילים עם דירתי" button.
   * TODO: set to the App Store / Google Play / sign-up URL.
   */
  downloadHref: "#",

  /**
   * Footer links. TODO: point these at the real pages once they exist.
   * No legal text is written here on purpose.
   */
  footerLinks: [
    { label: "תנאי שימוש", href: "#" },
    { label: "מדיניות פרטיות", href: "#" },
    { label: "יצירת קשר", href: "#" },
  ],

  /**
   * While real screenshots are missing, placeholders show the file name they
   * expect (e.g. "landlord-home.png"). Set to false to hide the file names.
   */
  showScreenshotHints: true,
} as const;

export const navLinks = [
  { id: "top", label: "ראשי" },
  { id: "how", label: "איך זה עובד" },
  { id: "landlords", label: "לבעלי דירות" },
  { id: "tenants", label: "לשוכרים" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;
