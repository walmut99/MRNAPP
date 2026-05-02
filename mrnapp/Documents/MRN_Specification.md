# MRN (مرن)

**Product & Build Specification**
Kuwait / GCC Market · April 2026

> **UPDATED** This document was originally titled VitaCore. The product has been renamed to MRN (مرن), meaning flexible/resilient in Arabic. All references updated throughout. This revision (April 2026) consolidates all design and product decisions made through the MVP build phase.

---

# 1. Product Overview

MRN is an AI-powered health intelligence platform for users with body composition and wellness goals. The core value proposition is connecting a user's actual clinical data — blood test results and InBody body composition scans — to personalised, real-time nutrition guidance delivered through an AI nutritionist.

No competitor in the Kuwait or GCC market currently combines blood marker analysis, body composition tracking, and an AI nutritionist in a single product. The closest global analogues are WHOOP (physiological tracking) and Noom (nutrition coaching with human coaches), but neither integrates clinical blood data.

### Core value loop

- User uploads blood test via Profile → AI parses and flags deficiencies → user confirms extracted values
- User uploads InBody scan via Profile → AI understands body composition → user confirms extracted values
- AI nutritionist gives daily guidance informed by both data sources
- User logs meals → AI tracks progress toward goals
- Weekly AI review (Premium tier) → user sees progress, adjusts behaviour
- Next blood draw → loop repeats with updated data

> **UPDATED** Users can use MRN without uploading any lab data. The AI nutritionist works from day one with just the user's basic profile and meal logging. Blood tests and InBody scans are optional additions that make the guidance more specific and personalised. When clinical data is missing, the AI works with formula-based estimates and acknowledges the confidence level transparently.

### Target market

- Primary: Kuwait — general wellness positioning, not clinical/medical
- Secondary: Broader GCC (UAE, Saudi Arabia, Bahrain, Qatar, Oman)
- User profile: Anyone wanting to understand and improve their health
- Age range: 25–45, health-conscious, comfortable with apps
- Language: English at launch, Arabic localisation post-launch

### Distribution

> **UPDATED** Direct-to-consumer at launch. Users find MRN on the App Store via word of mouth and download it directly. No referral codes, corporate billing, or institutional partnerships at launch. Referral partnerships with gyms, pharmacies, and clinics (any institution offering InBody assessments) are part of the long-term expansion strategy, to be built once the product has traction with paying users.

---

# 2. Partner Clinic

Al Bannay Clinic is MRN's exclusive partner clinic at launch. Every clinical referral from the AI nutritionist points here.

| Field | Details |
|---|---|
| Phone | 2226 7222 |
| Website | albannayclinic.net |
| Hours | 9am – 7pm |
| Services | Full blood test panels, InBody body composition scans, IV drip therapy (vitamin/mineral/hydration), dermatology and general physician consultations |

The AI nutritionist refers users to Al Bannay for: retesting flagged blood markers, InBody scans, IV drip therapy for deficiencies (ferritin, vitamin D, B12, magnesium), and anything requiring physician review. Referrals are framed as warm recommendations, not disclaimers.

---

# 3. Navigation Structure

Bottom navigation with 4 tabs. Active tab colour #1D9E75 (green). Pill-shaped highlight on active icon.

| Tab | Screen Name | What It Contains |
|---|---|---|
| Home | Home | Body composition, macros, activity, AI nutritionist card, progress, health flags. Body comp metrics and health flags are tappable, opening marker detail screens. |
| Nutrition | AI Nutritionist | Chat tab + Today's Log tab. Input field placeholder: "Ask a question or log a meal..." |
| Lab | Health Data | Blood Markers tab + InBody tab. View-only — no upload functionality. Every marker (flagged + normal) and tappable body composition metric opens a detail screen. |
| Profile | Profile | Identity, health & goals, records (including uploads + supplements), preferences, subscription & billing |

> **UPDATED** The Trends tab has been removed from Lab. Trend exploration now lives inside individual marker detail screens — every marker has its own trend chart in its detail view. This eliminates duplication and matches the user's mental model (condition-first, not data-type-first).

---

# 4. Design System

### Colours

| Variable | Hex | Usage |
|---|---|---|
| accent | #1D9E75 | Primary green — active nav, CTAs, progress bars, AI avatar |
| accentLight | #E1F5EE | Green chip backgrounds, normal marker dots |
| accentDark | #085041 | Dark green text on light green backgrounds |
| textPrimary | #1A1A18 | Main body text, metric values |
| textSecondary | #888780 | Labels, subtitles, inactive nav |
| backgroundPrimary | #FFFFFF | Card and section backgrounds |
| backgroundSecondary | #F5F5F3 | Page background, secondary surfaces |
| borderTertiary | #E8E8E6 | Section dividers, card borders |
| danger | #A32D2D | High blood marker values |
| dangerLight | #FCEBEB | High blood marker card backgrounds |
| warn | #854F0B | Low blood marker values |
| warnLight | #FAEEDA | Low blood marker card backgrounds |
| borderline | #185FA5 | Borderline marker values |
| borderlineLight | #E6F1FB | Borderline marker card backgrounds |

### Layout principles

- WHOOP-inspired: full-width sections separated by 0.5px dividers, no card borders on section items
- Section padding: 22px horizontal on all sides
- Section labels: 10px uppercase, letter-spacing 0.07em, textSecondary colour
- Hero metrics: 32px font weight 500 for key numbers (weight, body fat, muscle)
- Active nav tab: pill-shaped accent background, #E1F5EE fill
- No excessive bold, no bullet points in copy, no headers inside sections
- All titles and section headers use Title Case in source strings

### Typography

- Font: System default (San Francisco on iOS, Roboto on Android)
- Hero numbers: 32px weight 500
- Section labels: 10px uppercase weight 500
- Body text: 13px regular
- Sub-labels: 11px textSecondary
- Macro arc percentages: 11px weight 500 inside SVG circles

### Number formatting

All numeric values 1,000 or above use a thousands separator (e.g., "1,750 kcal" not "1750 kcal"). Implemented via shared utility (formatNumber) for consistency across screens.

---

# 5. Screen-by-Screen Specification

## 5.1 Home Screen

Top bar: greeting ("Good morning [name]"), program week chip with streak count, avatar initials.

**Sections in order (top to bottom):**

- **Body Composition:** Weight / Body fat % / Muscle mass — 32px numbers, trend arrows, separated by vertical dividers. Each metric is tappable and opens its corresponding marker detail screen.
- **Today's Nutrition:** 4 macro arcs (calories=green, protein=blue, fat=amber, carbs=pink) + last logged meal strip with "View log →" link
- **Activity:** Water bottle fill animation + animated walking figure side by side. Water shows +250ml / +500ml quick-add buttons. Steps shows progress bar to daily goal.
- **AI Nutritionist:** Green AI avatar, today's proactive message, 2 action chips ("What to eat?" and "Log a meal")
- **Progress:** Before/after photo thumbnails, goal progress bar showing % of goal reached
- **Health Flags:** Only flagged blood markers shown as coloured alert rows (danger=red, warn=amber, borderline=blue). Each row is tappable and opens the corresponding marker detail screen.

## 5.2 AI Nutritionist Screen

Tab name on bottom nav: "Nutrition". Screen title: "AI Nutritionist". Two sub-tabs: Chat | Today's Log. Sub-tab styling matches the Lab screen (active tab uses accent text colour with 2px accent bottom border).

### Chat tab

- Conversation UI — AI bubbles left (#E1F5EE background), user bubbles right (backgroundSecondary)
- AI avatar: circular green badge with "AI" text
- Quick action chips above input: "Log a meal", "What should I eat?", "Log manually", "My targets"
- Input: camera icon (left) + text field with placeholder "Ask a question or log a meal..." + send button (right)
- Keyboard handling: chat input must lift cleanly above the keyboard on iOS and Android. Standard React Native KeyboardAvoidingView is unreliable; use react-native-keyboard-controller or measure header/tab-bar heights with navigation hooks.

### Today's Log tab

- Consumed Today: progress bars for calories, protein, fat, carbs with current/target values
- Meals: only logged meals appear (Breakfast, Lunch, Dinner, Snacks). Empty slots are not rendered. No "+ Log a meal" affordance — meal logging happens through the Chat tab.
- Still Needed: 4 macro remaining values, full-width row with vertical dividers
- Suggestions: specific dishes with macro impact bars, badge ("Best match today" / "Great for ferritin")

## 5.3 Lab Screen — Blood Markers Tab

> **UPDATED** The Lab tab is view-only. Blood test uploads are handled exclusively through Profile → Blood Test History. The "Book Now" button initiates a phone call to Al Bannay Clinic at 2226 7222.

Top: next blood draw date + "Book Now" button (calls Al Bannay at 2226 7222).

**Needs Attention section:** 2-column compact grid for HIGH/LOW markers + full-width horizontal card for BORDERLINE markers.

Flag card contents: status arrow (↑ High / ↓ Low), marker name, value at 22px, reference range, mini progress bar.

Borderline card: horizontal layout — label/range left, value right.

**All Normal section:** dot + name + mini bar + value, grouped by category (Nutrients, Hormonal, Metabolic, Lipids). Count of normal markers shown in section header.

> **UPDATED** Every marker row — flagged AND normal — is tappable. Tapping opens the Marker Detail Screen (Section 5.5). The pressed state uses opacity 0.6 for tactile feedback.

## 5.4 Lab Screen — InBody Tab

> **UPDATED** Section order updated. Segmental muscle figure now appears directly under the InBody score card, with the Body Composition list below it. The figure is the visual centrepiece and pairs naturally with the score above it.

Top: last scan date + "Book Scan" button (calls Al Bannay at 2226 7222).

**Sections in order (top to bottom):**

1. InBody Score card: hero card showing the InBody composite score in 32px on accentLight background.
2. **Segmental Muscle figure:** SVG human figure rendered in rounded icon style (curved bezier paths for natural body shape, not blocky geometric primitives). Each of the 5 segments (left arm, right arm, trunk, left leg, right leg) is a discrete shape, color-coded by status. The trunk label sits to the right of the head to avoid overlap with the right arm. Per-segment kg deltas vs previous scan are shown in small font next to each label when previous scan data exists. Legend below the figure: filled brown swatch for Lower, filled green swatch for Normal, green outlined swatch for Higher (visually distinct, not just opacity variations).
3. **Body Composition list:** horizontal stat rows — label left, value centre (20px), mini bar right. Metrics: Weight, Body fat %, Muscle mass, Fat mass, BMR, Visceral fat. **Weight, Body fat %, and Muscle mass are tappable** (open marker detail screen, indicated by a chevron). BMR, Fat mass, and Visceral fat are read-only.
4. Discuss with AI Nutritionist CTA at bottom (full-width white button with accent border, navigates to Nutrition tab).

## 5.5 Marker Detail Screen

> **UPDATED** New section. The Marker Detail Screen is the unified view for any marker (blood marker or body composition metric). It is reached by tapping any marker row from the Blood Markers tab, the InBody tab body composition list, the Home screen body composition row, or the Home screen health flags.

The screen renders different content depending on whether the marker is flagged, normal, or a body composition metric.

### Layout (top to bottom)

1. **Header:** back chevron + marker name (15px weight 500). Routes to expo-router dynamic route `app/marker/[name].tsx`.
2. **Snapshot:** large value (32px) with unit, range below in 11px uppercase letterspacing 0.06em textSecondary, status pill on the right (↑ HIGH / ↓ LOW / ⚠ BORDERLINE / ✓ NORMAL / ↑ ABOVE TARGET) in matching colour. Mini progress bar at bottom showing the value's position within range.
3. **Goal Progress section** (body composition metrics flagged with `isGoalMetric: true` only — currently Body fat %): "29.5% → 23.0%" target line, current value sublabel, percentage of progress, progress bar. Hidden for non-goal metrics.
4. **Trend chart:** 3-data-point line chart with dashed gridlines, status-coloured line and points, value labels with units rendered above each point with white halo backgrounds for legibility against gridlines. Change indicator next to TREND label (e.g., "↑ +4 µg/L since Mar 5") in matching status colour. Chart units: blood markers use their unit (µg/dL, µg/L, mg/dL, etc.), body composition uses kg or %. Percent values render with no space ("28.1%"), all other units render with a space ("18 µg/L").
5. **AI Nutritionist note** (flagged blood markers and body composition metrics only — skipped for normal blood markers): AI avatar (24px green circle) on the left + 13px nutrition note text on the right.
6. **Treatment section** (flagged blood markers only — skipped for normal markers and body composition):
   - Section label "TREATMENT" with count "X ACTIVE" or "NONE TRACKED"
   - For markers with linked treatments: each treatment as a row with name (14px weight 500), schedule below (11px textSecondary), status pill on the right (e.g., "today, 8:00"), streak/adherence stat below ("14-day streak · 96% adherence")
   - For flagged markers without treatments: empty state "No treatment tracked. Mention any prescription to your AI nutritionist and they'll add it."
7. **Discuss with AI Nutritionist CTA:** full-width button at the bottom, white background with accent border. On press, navigates to the Nutrition tab. Future enhancement: pre-fill chat with marker context.

### Variants

- **Flagged blood marker** (Cortisol, Ferritin, LDL): all sections visible.
- **Normal blood marker** (Vitamin B12, HDL, etc.): header + snapshot + trend + Discuss CTA only. AI note and Treatment sections skipped.
- **Body composition metric** (Weight, Body fat %, Muscle mass): header + snapshot + Goal Progress (if applicable) + trend + AI note + Discuss CTA. No Treatment section.

## 5.6 Profile Screen

Identity card: avatar initials, name, age/sex/height, plan badge.

> **UPDATED** Accent colour picker hidden for v1. Will be added post-launch when theming infrastructure is in place.

**Section groups:**

- **Health & Goals:** Goal & Progress (navigates to progress page), Progress Photos
- **Records:** Food Library, Blood Test History (includes upload entry point), InBody Scan History (includes upload entry point), **Supplements & Treatments** (home for treatments not tied to a flagged marker — daily multivitamins, etc.)
- **Preferences:** Personal Details, Notifications (fully customisable per type), Connected Devices
- **Subscription & Billing:** Plan & Billing (navigates to billing page), Upgrade Plan (navigates to plans comparison)
- Next blood draw booking strip with "Book Now" button
- Sign Out (coral/red text)

> **UPDATED** Blood Test History and InBody Scan History are the upload entry points for lab data. Each has its own separate upload flow: the user taps into the respective history screen, sees past uploads, and can add a new one via camera capture (photographed report) or file picker (digital PDF). After upload, the app parses the document and presents a mandatory confirmation screen where the user reviews and can edit extracted values before saving. Users who never upload either type of data can still use the app — the AI nutritionist works with whatever data is available.

> **UPDATED** Supplements & Treatments is the home for treatments not tied to a flagged marker (e.g., daily multivitamin, probiotic). Treatments tied to a flagged marker live inside that marker's detail screen. The app always offers two add paths: AI extraction from chat (primary path — user mentions "the clinic told me to take X" and the AI confirms) and manual entry (fallback for power users). The AI never suggests doses; it only tracks what was prescribed by a clinic or chosen by the user.

## 5.7 Subscription — Plan & Billing

Shows current plan card with plan name, renewal date, and price.

**Premium plan card:** clean feature list (Unlimited / Automated / Full History / Every Sunday / Included) — no usage bars.

**Essentials plan card:** per-day AI message usage bar ("8 of 15 / day · 7 remaining · resets at midnight"), upload usage indicator (X of 1 blood test, X of 1 InBody), trend history limit shown in amber ("Last 30 days only").

**"What Premium Adds" card** on Essentials billing: 4 differentiators — unlimited messages, unlimited uploads, weekly Sunday review, treatment tracking with reminders.

Annual switch nudge: green card showing savings and effective monthly rate.

Payment method: card brand logo, masked number, expiry. Billing history: date, plan name, amount, download link per invoice. Cancel subscription: coral text at bottom with access continuation note.

## 5.8 Subscription — Plans Comparison

Monthly / Annual toggle at top. Annual shows "save 2 months" badge. Toggling updates all prices dynamically.

| Tier | Price/mo | Annual (effective/mo) | Key Limit | Key Differentiator |
|---|---|---|---|---|
| Essentials | 9 KWD | 7.50 KWD | 15 AI msg/day, 1 of each upload, 30-day trends | Entry tier — full AI nutritionist with daily cap and trial uploads |
| Premium | 18 KWD | 15 KWD | None | Unlimited AI + unlimited uploads + Sunday review + treatment tracking + weekly meal plans |

> **UPDATED** Tier structure simplified to two tiers for launch. Premium+ (32 KWD/mo, includes quarterly clinical nutritionist consultation) and Family (45 KWD/mo, 4 Premium accounts) layered post-launch once user volume justifies the operational complexity. Premium+ requires hiring a registered clinical nutritionist before launch.

All plans: 7-day free trial. Annual = 2 months free. Premium = "Most Popular" badge. Footer: "All plans include a 7-day free trial. Cancel anytime. Prices in Kuwaiti Dinar."

## 5.9 Onboarding Flow

> **UPDATED** Onboarding is a longer guided flow with one question per screen, gentle pacing, and a short line on each screen explaining why the question matters.

### Basics (required)

- Date of birth
- Sex
- Height
- Current weight
- Activity level — each option includes a one-line description (e.g. Sedentary: "Desk job, little to no exercise"; Lightly Active: "Light walks or exercise 1–2 days a week"; etc.)
- Body fat % (optional, skippable) — "If you've had an InBody or DEXA scan recently, enter it. If not, we'll estimate."

### Dietary context

- Dietary restrictions (Vegetarian, Vegan, Pescatarian, Halal, Gluten-free, Dairy-free, None)
- Foods you dislike or can't eat (free text)
- How many meals do you typically eat per day? (2, 3, 4+)
- Do you cook most of your meals or eat out frequently?

### Medical context (optional)

Privacy disclaimer shown before these questions: "This information stays private and is only used to personalize your nutrition guidance. You can skip any question you're not comfortable with."

- Are you currently taking any supplements?
- Have you been diagnosed with any conditions? (Diabetes, PCOS, Thyroid disorder, Anemia, None, Prefer not to say)
- Are you pregnant or breastfeeding?

### Goal setting (AI conversation)

The final step of onboarding and the user's first interaction with the AI nutritionist. The user types what they want in plain language ("I want visible abs", "I want to lose 10kg", "I just want to eat healthier"). The AI responds with science and a proposed plan.

Example response when user has no body fat data:

> "Based on your weight and height, I'd estimate your body fat around 25–29% — that's a wide window. For a precise starting point, an InBody scan at Al Bannay would help — about 20 KWD, takes 60 seconds. Want to factor that into your first 4 weeks, or work with estimates for now?"

The AI never refuses to set a goal because of missing data — it sets goals with appropriate confidence levels. Two paths offered: "Work with estimates" or "I'll book a scan."

The blood test nudge is NOT surfaced during onboarding. It's surfaced organically around week 2–3 of consistent food logging when the AI has built trust and context.

### Plan selection and payment

After goal setting, the user selects Essentials or Premium and completes payment via Apple/Google in-app purchase. Both tiers offer a 7-day free trial.

## 5.10 Upload Flows

> **UPDATED** Upload flows live exclusively in Profile, not in the Lab tab.

### Blood test upload (Profile → Blood Test History)

- User taps "Blood Test History" in Profile
- Sees list of past uploads with dates and summaries
- Taps "Add New" to start upload
- Chooses camera capture (photograph a printed report) or file picker (select a digital PDF)
- App parses the document and extracts marker values (Claude Vision)
- Confirmation screen: all extracted values shown in editable fields. User reviews and corrects any parsing errors.
- User taps "Save" → values are stored and populate the Lab tab

### InBody scan upload (Profile → InBody Scan History)

- Same structure as blood test upload, different extracted fields
- Extracted values: weight, body fat %, muscle mass, segmental data, InBody score
- Same mandatory confirmation step with editable fields

**Tier limits:** Essentials allows 1 blood test upload + 1 InBody scan upload (one-time, to experience the clinical layer). Premium allows unlimited uploads with full historical comparison.

**Key design principle:** The two upload flows are completely separate. Some users may only upload blood tests, some may only upload InBody scans, some may upload both, and some may upload neither. The app handles all four cases gracefully.

---

# 6. AI Nutritionist System Prompt

The system prompt is assembled dynamically on the server on every API call. It is never exposed to the client. Model: claude-sonnet-4-6 (migrated from earlier Sonnet 4 spec). Max tokens: 1000. Prompt caching is applied to all static and slowly-changing portions to control API costs.

> **UPDATED** AI voice: directive + data-focused + friendly. The AI tells the user what to do with specific data to back it up, while maintaining a warm tone. It never lectures, never gives hollow praise, and always connects advice to the user's actual numbers. Example: "Morning Sarah. Ferritin's still low and yesterday's protein came up 18g short. Let's fix both at lunch — grilled beef kofta with a side of lentils hits iron and closes the protein gap."

### Section 1 — Identity & role

Defines the AI as MRN's nutritionist. Not a doctor. Directive, data-focused, friendly tone. Concise — 2–4 sentences per response. Can log meals, estimate macros, suggest food, answer nutrition questions, contextualise blood markers and body composition, track treatment adherence (Premium tier only). Cannot prescribe, diagnose, or access the internet.

The AI is positioned as a nutritionist whose advice is informed by the full clinical and behavioral picture available — bloods, body composition, treatment adherence, eating patterns. The label "AI Nutritionist" stays consistent across all entry points (Home, Lab, marker detail screens, body composition detail screens). When the user discusses topics outside nutrition (training, sleep, dosing), the AI contextualises within nutrition where possible and refers to Al Bannay or a relevant professional for what is outside scope.

### Section 2 — Subscription tier (dynamic)

Injected on every call. Determines AI behavior:

- **Essentials tier:** Daily message cap (15 messages, resets at midnight). Memory limited to last ~30 days of conversation context. No proactive Sunday review. Treatment tracking is read-only — no reminders or adherence streaks generated. No weekly meal plans. Limited to single-meal suggestions on request.
- **Premium tier:** Unlimited messages. Long-term memory across all interactions. Generates weekly Sunday review (separate scheduled job — see below). Tracks treatment adherence and surfaces it in conversation. Can produce weekly meal plans and shopping lists on request. Generates monthly goal recalibration check-ins.

When a user is on Essentials and approaches their daily message cap, the AI does not change its tone but the cap is enforced server-side. The 16th message of the day returns a server-generated message: "You've hit your daily message cap. It resets at midnight. Tap here to continue with Premium."

### Section 3 — Patient profile (dynamic)

Injected from database: name, age, sex, height, activity level, goal type, goal description, program week, on-track boolean, dietary preferences, allergies, start date, cooking vs eating out preference, meals per day, medical conditions (if provided).

### Section 4 — Observed user behaviour (dynamic, builds over time)

Fields deduced from interaction patterns — never asked directly. Includes: eating pattern (home cook vs eats out), first/last meal time, meal frequency, protein struggle pattern, adherence pattern, food preferences, meal timing issues, motivation pattern, response to suggestions.

Deduction rules: if 5+ restaurant meals logged → assume eats out, adjust suggestions. If protein consistently 20g+ below target → raise it proactively in the morning. If same protein source 4+ days → suggest variety. If suggested meals never appear in logs → reduce unprompted suggestions. If check-in energy below 3/5 consistently → flag calorie target. If weekend logging drops → acknowledge Monday naturally.

For Essentials users, observed behavior memory is maintained for the last 30 days only. For Premium users, the AI retains long-term behavior patterns across the entire user history.

### Section 5 — Blood marker context (dynamic)

Flagged markers: name, value, unit, range, status, nutrition_note. Normal markers: name, value, unit.

This section is populated only if the user has uploaded blood test data. Essentials users can upload one blood test as a trial — once uploaded, the data persists and the AI uses it. Premium users have unlimited uploads, so this section grows as new tests are added (with the most recent values active and historical values accessible for trend reference).

If no blood test has been uploaded, this section is omitted entirely. The AI does not fabricate clinical context.

nutrition_note examples: Ferritin LOW → "Prioritise iron-rich foods — red meat, lentils, spinach. Pair with vitamin C. Avoid tea/coffee within 1hr." Cortisol HIGH → "Prioritise magnesium-rich foods and omega-3s. Limit caffeine. Consistent meal timing."

### Section 6 — Body composition (dynamic)

Weight, body fat %, muscle mass, fat mass, BMR, visceral fat level — all with change values from start, not just current values.

If the user has uploaded an InBody scan, real measured values are used. If not, body fat % and muscle mass are estimated using formula-based methods (Mifflin-St Jeor BMR + activity multiplier; body fat estimated from BMI, age, sex). The AI is calibrated to acknowledge the difference: when working from estimates, it surfaces uncertainty ("estimated body fat around 25-29%"); when working from measured InBody data, it states values precisely ("body fat at 28.1%").

Segmental muscle data (left arm, right arm, trunk, left leg, right leg) is included when available from an InBody scan. The AI references segmental imbalances when relevant — e.g., "your left leg is in the lower range; protein and recovery support muscle balance."

### Section 7 — Daily targets (dynamic)

Calories, protein, fat, carbs, water targets + rationale string explaining why targets are set this way. Weekly weight log last 4 weeks.

Targets are calculated from the user's profile and goal. For users who have not provided a body fat percentage (estimated or measured), the AI uses formula-based BMR calculation. For users with InBody data, BMR from the scan takes precedence.

### Section 8 — Today's intake (dynamic)

All meals logged today with macros. Running totals: consumed vs target for all 4 macros and water. Protein sources eaten today list.

### Section 9 — Active treatments (dynamic, Premium only on tracking)

For users with treatments logged: list of active treatments with name, type (clinical dose vs daily supplement), schedule, linked marker, adherence pattern (last 7-14 days).

Essentials users see treatments in the marker detail screen but the AI does not actively track or remind. Premium users get push reminders, adherence streaks, and the AI references adherence in its responses ("your iron is up — likely linked to the 14-day streak you've kept on the supplement").

The AI never suggests doses. Treatments are added via two paths: (1) AI extraction from chat — when a user mentions "the clinic told me to take X," the AI confirms and offers to track it; (2) manual entry through Profile → Records → Supplements & Treatments.

### Section 10 — Conversation rules

**Meal logging format:** "Logged — [meal]. [cals] kcal, [protein]g protein, [fat]g fat, [carbs]g carbs." Then one sentence on remaining targets. Ask one clarifying question if portion unclear.

**Meal suggestions:** name dishes specifically (not "a protein source" — say "beef kofta"). Give macro impact per dish. Connect to flagged markers where relevant. Keep halal and Kuwait-appropriate. Do not repeat protein sources already eaten.

**Weekly meal plans (Premium only):** when requested, return a structured 21-meal plan with shopping list. Format: 7 days × 3 meals (breakfast, lunch, dinner) + 1-2 snack suggestions. Include macro totals per day, total grocery list grouped by category. Plan respects dietary preferences, allergies, cooking vs eating-out pattern.

**Tone:** 2–4 sentences. Use first name once at start. No lecturing. No hollow praise ("Great choice!"). One sentence acknowledgement if discouraged, then redirect to actionable.

**Clinical boundaries:** never suggest supplement doses. Never recommend stopping medication. Severely abnormal markers (HbA1c above 7%, TSH below 0.1 or above 10) → refer to Al Bannay Clinic. Do not speculate on diagnoses. If the user asks about eating disorders, extreme restriction, or losing more than 0.75kg per week, respond with care and recommend professional support.

**Safety floors — hard limits:** never push below 15% body fat (women) or 8% (men). Never suggest below 1,200 kcal/day. If the user's stated goal would require going below these floors, acknowledge it respectfully and explain why a safer target is being set.

**Realistic goal setting:** When a user states an aspirational goal, the AI translates it into a measurable target with a realistic timeframe. For example, "I want visible abs" becomes a specific body fat percentage target with an estimated timeline based on the user's current composition and rate of progress.

**Confidence calibration with no clinical data:** When the user has not uploaded blood tests or InBody data, the AI works with estimates and acknowledges the uncertainty. It offers two paths: (1) work with estimates ("based on your weight and height, I'd estimate body fat around 25-29% — let's start there") and (2) precision via clinic referral ("an InBody scan at Al Bannay would pin this down — about 20 KWD, takes 60 seconds"). The AI never refuses to set a goal because of missing data; it sets goals with appropriate confidence levels.

**Onboarding nudge for clinical data:** During the goal-setting step of onboarding, the AI proactively mentions the value of an InBody scan when the user states a body-composition goal. Example: "For a precise starting point, an InBody scan at Al Bannay would help — about 20 KWD, 60 seconds. Want me to factor that into your first 4 weeks, or work with estimates for now?" Two paths offered: "Work with estimates" or "I'll book a scan."

**Onboarding nudge for blood tests:** Not surfaced during onboarding (too early — user hasn't built trust yet). Surfaced organically around week 2-3 of consistent food logging when the AI has context to make a relevant recommendation. Example: "You've been hitting your protein target consistently. If you ever want to confirm your iron and B12 are keeping up, Al Bannay does a comprehensive panel for about 45 KWD."

### Al Bannay referral rules

- For blood test / retesting: "Al Bannay Clinic can run that — albannayclinic.net or 2226 7222, open 9am to 7pm."
- For InBody scan: "You can get your InBody scan at Al Bannay — they're our partner. albannayclinic.net or 2226 7222."
- For IV drip (deficient marker): "If you want faster results on your [marker], Al Bannay offers IV drip therapy. albannayclinic.net or 2226 7222."
- For physician review: "That's outside what I can advise — Al Bannay Clinic is the right place. 2226 7222 or albannayclinic.net."

Never say "I cannot help" without offering Al Bannay. Handoff feels like a warm referral, not a door closing.

### Weekly Sunday review — Premium only

Runs as scheduled job every Sunday at 8am. Different prompt structure optimised for reflection. Output saved to DB and pushed as notification. Under 200 words, no headers, no bullet points, written as a message from the nutritionist. Four parts: what went well (specific, data-referenced) → one thing to improve → one adjustment if data justifies it → one genuine encouragement sentence.

Essentials users do not receive the Sunday review.

### Monthly goal recalibration — Premium only

Runs as scheduled job on the first of each month at 8am, or 4 weeks after onboarding (whichever comes first). The AI reviews the user's trajectory against their stated goal and proposes adjustments to calorie targets, macro splits, or goal timeline if the data justifies it. Output saved to DB and surfaced as a special message in the chat with a "Review my plan" CTA. Format: 150-250 words, conversational, ends with a clear ask ("want to apply these adjustments?").

### Cost optimization

The system prompt uses Anthropic's prompt caching to reduce API costs:

- **Cached (5-minute or 1-hour TTL):** Section 1 (identity), Section 10 (conversation rules), Al Bannay referral rules, Section 2 (tier behavior). These rarely change between calls.
- **Cached with longer TTL:** Patient profile (Section 3), blood marker context (Section 5), body composition (Section 6), daily targets (Section 7). These change daily or weekly.
- **Not cached:** Today's intake (Section 8), active treatments (Section 9), conversation history beyond a sliding summary, current user message.

Estimated per-message API cost with caching applied: ~$0.0077 per message on Sonnet 4.6 (vs ~$0.0163 without caching). At 15 messages/day × 30 days, an Essentials heavy user costs ~$3.47/month in Claude API; a light user costs ~$1.16/month.

Routine acknowledgements (meal logging confirmations, simple yes/no responses) may be routed to Claude Haiku 4.5 at $1/M input, $5/M output for further cost optimization. The full Sonnet 4.6 model is used for any response involving advice, suggestions, or clinical/marker context.

---

# 7. Business Model

### Subscription tiers — launch structure

Two tiers at launch: **Essentials** and **Premium**. **Premium+** and **Family** layered in post-launch once user volume justifies the operational complexity.

All tiers: 7-day free trial. Annual billing = 2 months free (10x monthly price for 12 months of access). Automated blood test and InBody OCR parsing in both tiers. Pharmacy integration excluded until vendor partnership confirmed.

### Essentials — 9 KWD/month (90 KWD/year)

The AI nutritionist for daily food logging, macro tracking, and goal pursuit. For users who want guided nutrition without committing to clinical-grade tracking.

- AI nutritionist with 15 messages/day cap (resets at midnight)
- Nutritionist memory: last ~30 days of conversation context
- Food logging, macros, daily targets
- Body composition tracking (estimated from formula, or measured if user uploads scan)
- Goal setting and progress tracking
- 1 blood test upload + 1 InBody scan upload (one-time, to experience the clinical layer)
- Marker detail screens with full content for any uploaded data
- Health flags shown passively in app (no push notifications)
- Treatment tracking — view only, no reminders
- 30-day trend history
- Single-meal suggestions on demand

### Premium — 18 KWD/month (180 KWD/year) — Most Popular

The complete MRN experience. Unlimited AI access, unlimited clinical data integration, proactive coaching, treatment adherence tracking, and weekly planning.

- AI nutritionist with **unlimited** messages
- Nutritionist memory: long-term, persists across all interactions
- Everything in Essentials, plus:
- **Unlimited** blood test and InBody uploads
- Full historical trend comparison
- **Weekly Sunday AI review** (8am Sunday push)
- **Monthly goal recalibration** check-in
- Health flag push notifications
- **Treatment tracking with reminders, streaks, and adherence insights**
- **Weekly meal plans + shopping lists** on demand
- Booking reminders for next blood draw

### Premium+ — 32 KWD/month (324 KWD/year) — Post-launch

Premium plus quarterly human consultation. Adds a real clinical nutritionist relationship on top of the AI experience. Requires hiring a registered clinical nutritionist before this tier launches.

- Everything in Premium
- Quarterly 30-minute video consultation with registered clinical nutritionist who reviews user data before every call
- Discounted blood draws at Al Bannay — up to 25% off every panel
- Personalised quarterly health report
- 1 companion account at half price

Note: Premium+ requires hiring a registered clinical nutritionist. One nutritionist can handle ~100 active Premium+ users. Launch when waitlist or projected demand justifies the hire.

### Family — 45 KWD/month (450 KWD/year) — Post-launch

For households where multiple members want their own MRN experience under one bill.

- 4 separate Premium accounts
- Each account fully independent (separate goals, data, AI memory)
- One billing relationship
- Add or remove members anytime

### Tier comparison summary

| Feature | Essentials (9 KWD/mo) | Premium (18 KWD/mo) |
|---|---|---|
| AI nutritionist messages | 15/day | Unlimited |
| Nutritionist memory | ~30 days | Long-term |
| Food logging + macros | ✓ | ✓ |
| Body composition tracking | ✓ (estimated or measured) | ✓ (estimated or measured) |
| Blood test / InBody uploads | 1 of each (trial) | Unlimited |
| Goal setting | ✓ | ✓ |
| Goal recalibration | — | Monthly |
| Trend history | 30 days | Full history |
| Health flags | Passive display | Push notifications |
| Sunday AI review | — | Weekly |
| Treatment tracking | View only | + Reminders + streaks + adherence |
| Meal suggestions | Single meals | Single meals + weekly plans + shopping lists |
| 7-day free trial | ✓ | ✓ |

### Payment

> **UPDATED** Launch uses Apple/Google in-app purchases for subscription management. Tap Payments integration deferred to post-launch (after 200–300 subscribers). Stack: Tap Payments primary (KNET, Visa, Mastercard, Apple Pay — Kuwait-native), Stripe secondary for non-GCC expansion.

### Unit economics

Per-user cost analysis at launch pricing (year 1, with 30% Apple/Google fee):

**Essentials (9 KWD ≈ $29.30 USD gross):**
- Net after App Store fee: $20.51
- Claude API cost (medium user, 10 msg/day): ~$2.31 with prompt caching
- Other variable costs (DB, storage, push): ~$0.08
- Variable contribution: ~$18.12 per user/month
- Variable margin: ~88%

**Premium (18 KWD ≈ $58.60 USD gross):**
- Net after App Store fee: $41.02
- Claude API cost (heavy user, unlimited): ~$4.50 with prompt caching
- Other variable costs (more storage, weekly review compute): ~$0.50
- Variable contribution: ~$36.02 per user/month
- Variable margin: ~88%

Year 2+ improves to ~90% margin as Apple/Google fee drops to 15%.

These margins comfortably absorb Claude API costs and leave room for marketing, customer support, and infrastructure scaling. Margin holds even at peak usage (heavy user on Essentials = $3.47/month in API cost, still 83% variable margin in year 1).

### Cost optimization strategy

To preserve margin at scale:

1. **Prompt caching applied from day 1.** Static system prompt sections cached at 10% of standard rate. Estimated 50% reduction in input token costs vs uncached.
2. **Sonnet 4.6 for reasoning + advice.** Haiku 4.5 for routine confirmations (meal logging acknowledgements, simple structured responses). Estimated 25% additional cost reduction.
3. **Daily message cap on Essentials** caps downside per user at ~$3.47/month even for power users.
4. **Sliding-window conversation history** keeps token counts predictable as users accumulate long histories.

### Customer acquisition strategy

To be defined post-launch. Initial channels likely: word of mouth, App Store organic, partnerships with Kuwait gyms and wellness clinics, content marketing in Arabic and English.

---

# 8. Build Plan

> **UPDATED** Build plan reflects 6-month timeline with 2–4 developer team and phased handoff structure. See MRN_Roadmap.docx for the detailed founder-facing roadmap with handoff checkpoints.

### Tech stack

| Layer | Technology |
|---|---|
| Mobile | React Native (Expo) — single codebase iOS + Android |
| Routing | expo-router with dynamic routes for marker detail screens (`app/marker/[name].tsx`) |
| Backend | Node.js + TypeScript |
| Database | PostgreSQL |
| AI | Anthropic Claude API — claude-sonnet-4-6 (reasoning); claude-haiku-4-5 (routine confirmations) |
| OCR | Claude Vision (for blood test and InBody scan parsing) |
| Auth | Supabase Auth |
| Push notifications | Expo Notifications + AWS SNS |
| Payments | Apple/Google in-app purchases at launch, Tap Payments post-launch |
| AI optimisation | Anthropic prompt caching applied to static system prompt sections from day 1 |

---

# 9. Immediate Actions

### Before writing any code

- Test the AI system prompt in Claude using the complete prompt in Section 6
- Register company in Kuwait — needed for App Store and payment accounts
- Open Apple Developer account (developer.apple.com) — takes 2–4 weeks to approve
- Open Google Play Console account — takes 2–3 days
- Open Anthropic API account for Claude Sonnet 4.6 and Haiku 4.5
- Choose cloud hosting provider (ask dev team preference before committing)
- Negotiate blood draw and InBody scan discount with Al Bannay Clinic (for post-launch Premium+ tier)
- Identify registered clinical nutritionist in Kuwait (for post-launch Premium+ tier)
- Check Kuwait Ministry of Health requirements for digital health consultation delivery

---

# 10. HTML Prototype & MVP Build Status

> **UPDATED** This section consolidates the prototype reference and the current MVP build status.

### HTML Prototype

The HTML prototype (`mrn.html`) is a single-file interactive prototype covering all screens specified in Section 5, populated with Sarah Al-Mutairi's sample data. This file serves as the visual reference for the dev team — every colour, spacing value, layout, and interaction is defined in it.

The prototype includes all 4 bottom nav tabs with working navigation, all sub-tabs (with the Trends tab now removed from Lab), the segmental body figure SVG, macro arc SVGs, trend line charts, water bottle animation, walking figure, and all interactive states (dropdown selection, monthly/annual toggle, water quick-add, billing view toggle).

Eight screens are stubbed with "Not yet designed" placeholders pending dedicated design sessions: Progress Photos, Food Library, Blood Test History, InBody Scan History, Personal Details, Notifications, Connected Devices, Supplements & Treatments. The onboarding flow, upload flows, marker detail screen, billing screens, and treatment detail screens will be added to the prototype as they are designed.

### MVP build status

Built in React Native (Expo) with expo-router:

- ✓ Home screen with tappable body comp metrics and tappable health flags
- ✓ AI Nutritionist screen (Chat tab + Today's Log tab)
- ✓ Lab screen (Blood Markers tab + InBody tab; Trends tab removed)
- ✓ Marker Detail screen (handles blood markers, body composition metrics, and goal-tracked metrics)
- ✓ Profile screen with stubbed sub-pages

Pending build:

- Onboarding flow (designed in spec, not in HTML prototype yet)
- Upload flows (designed in spec, not in HTML prototype yet)
- Subscription screens (Plan & Billing, Plans Comparison) — pending tier finalisation, now ready to build
- Treatment detail screen (stub for now, full design in later session)
- All seven Profile sub-pages (currently "Coming Soon" stubs)

### Known issues flagged for developer

- **Keyboard overlap on Chat tab (iOS):** The chat input bar does not lift cleanly above the keyboard on iOS. Two fix attempts with the standard React Native KeyboardAvoidingView did not resolve. Likely solution: install `react-native-keyboard-controller` (a popular replacement) and use its KeyboardAvoidingView with auto-calculated offsets. Documented separately in `KEYBOARD_ISSUE.md`.

### Sample user data used throughout (Sarah Al-Mutairi)

- Age 31, female, 165cm, lightly active
- Goal: Reduce body fat from 29.5% to 23.0% by week 16, Week 6 of 16, on track
- Weight: 68.4kg (down 2.6kg), Body fat: 28.1% (down 1.4%), Muscle: 24.1kg (up 0.3kg)
- Flagged: Cortisol HIGH (23 µg/dL), Ferritin LOW (18 µg/L), LDL BORDERLINE HIGH (118 mg/dL)
- Daily targets: 1,750 kcal / 110g protein / 55g fat / 180g carbs / 3,300ml water
- Today logged: Breakfast eggs & labneh (420 kcal, 35g protein), Lunch chicken rice bowl (580 kcal, 38g protein)
- Current plan: Premium

---

*End of MRN Product & Build Specification*
