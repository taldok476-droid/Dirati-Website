# App screenshots

Every phone on the site shows one of the screens below. Until a file exists,
the phone shows an intentional placeholder with the screen's name.

**To add a real screenshot:** save it here with the exact file name below
(`.webp`, `.png`, `.jpg`, `.jpeg` or `.avif`), then rebuild (`npm run build`).
The placeholder is replaced automatically. No code changes needed.

Recommended: full-resolution iPhone captures, portrait, 1179 × 2556
(any tall phone ratio works; other ratios are cropped from the top).
Keep the status bar in the capture; the phone frame draws the dynamic island on top.

| File name | Screen | Who sees it | Where it appears on the site |
| --- | --- | --- | --- |
| `landlord-home` | Landlord home / property overview | Landlord | Hero (center phone), How it works step 3, Landlords section (front phone), closing section |
| `property-details` | A single property | Landlord | Landlords section (phone behind) |
| `onboarding` | Adding a property | Landlord | How it works step 1 |
| `invitation` | Creating the tenant invitation / code | Landlord | How it works step 2 (landlord phone) |
| `tenant-join` | Tenant entering the invitation code | Tenant | How it works step 2 (tenant phone) |
| `tenant-home` | Tenant home ("my apartment") | Tenant | Hero (side phone), Tenants section |
| `report-issue` | Reporting a fault | Tenant | Hero (side phone), fault reporting section |

The Hebrew labels and alt text for each screen live in `lib/screens.ts`.
To add a new screen, add its key there and use `<PhoneMockup screen="your-key" />`.
