**MRN (****مرن****)**

Product & Build Specification

Kuwait / GCC Market  ·  April 2026

| **UPDATED** This document was originally titled VitaCore. The product has been renamed to MRN (مرن), meaning flexible/resilient in Arabic. All references updated throughout. |
| --- |

# **1. Product Overview**

MRN is an AI-powered health intelligence platform for patients with body composition and wellness goals. The core value proposition is connecting a patient’s actual clinical data — blood test results and InBody body composition scans — to personalised, real-time nutrition guidance delivered through an AI nutritionist.

No competitor in the Kuwait or GCC market currently combines blood marker analysis, body composition tracking, and an AI nutritionist in a single product. The closest global analogues are WHOOP (physiological tracking) and Noom (nutrition coaching with human coaches), but neither integrates clinical blood data.

### **Core value loop**

- Patient uploads blood test via Profile → AI parses and flags deficiencies → patient confirms extracted values

- Patient uploads InBody scan via Profile → AI understands body composition → patient confirms extracted values

- AI nutritionist gives daily guidance informed by both data sources

- Patient logs meals → AI tracks progress toward clinical goals

- Weekly AI review → patient sees progress, adjusts behaviour

- Next blood draw → loop repeats with updated data

| **UPDATED** Users can use MRN without uploading any lab data. The AI nutritionist works from day one with just the user’s basic profile and meal logging. Blood tests and InBody scans are optional additions that make the guidance more specific and personalised. |
| --- |

### **Target market**

- Primary: Kuwait — general wellness positioning, not clinical/medical

- Secondary: Broader GCC (UAE, Saudi Arabia, Bahrain, Qatar, Oman)

- Patient profile: Anyone wanting to understand and improve their health

- Age range: 25–45, health-conscious, comfortable with apps

- Language: English at launch, Arabic localisation post-launch

### **Distribution**

| **UPDATED** Direct-to-consumer at launch. Users find MRN on the App Store via word of mouth and download it directly. No referral codes, corporate billing, or institutional partnerships at launch. Referral partnerships with gyms, pharmacies, and clinics (any institution offering InBody assessments) are part of the long-term expansion strategy, to be built once the product has traction with paying users. |
| --- |

# **2. Partner Clinic**

Al Bannay Clinic is MRN’s exclusive partner clinic at launch. Every clinical referral from the AI nutritionist points here.

| **Field** | **Details** |
| --- | --- |
| Phone | 2226 7222 |
| Website | albannayclinic.net |
| Hours | 9am – 7pm |
| Services | Full blood test panels, InBody body composition scans, IV drip therapy (vitamin/mineral/hydration), dermatology and general physician consultations |

The AI nutritionist refers patients to Al Bannay for: retesting flagged blood markers, InBody scans, IV drip therapy for deficiencies (ferritin, vitamin D, B12, magnesium), and anything requiring physician review. Referrals are framed as warm recommendations, not disclaimers.

# **3. Navigation Structure**

Bottom navigation with 4 tabs. Active tab colour #1D9E75 (green). Pill-shaped highlight on active icon.

| **Tab** | **Screen name** | **What it contains** |
| --- | --- | --- |
| Home | Home | Body composition, macros, activity, AI nutritionist card, progress, health flags |
| Nutrition | AI Nutritionist | Chat tab + Today’s log tab. Input field placeholder: “Ask a question or log a meal...” |
| Lab | Health data | Blood markers tab + InBody tab + Trends tab. View-only — no upload functionality. |
| Profile | Profile | Identity, accent colour, health & goals, records (including uploads), preferences, subscription & billing |

# **4. Design System**

### **Colours**

| **Variable** | **Hex** | **Usage** |
| --- | --- | --- |
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

### **Layout principles**

- WHOOP-inspired: full-width sections separated by 0.5px dividers, no card borders on section items

- Section padding: 22px horizontal on all sides

- Section labels: 10px uppercase, letter-spacing 0.07em, textSecondary colour

- Hero metrics: 32px font weight 500 for key numbers (weight, body fat, muscle)

- Active nav tab: pill-shaped accent background, #E1F5EE fill

- No excessive bold, no bullet points in copy, no headers inside sections

### **Typography**

- Font: System default (San Francisco on iOS, Roboto on Android)

- Hero numbers: 32px weight 500

- Section labels: 10px uppercase weight 500

- Body text: 13px regular

- Sub-labels: 11px textSecondary

- Macro arc percentages: 11px weight 500 inside SVG circles

# **5. Screen-by-Screen Specification**

## **5.1 Home Screen**

Top bar: greeting (“Good morning [name]”), program week chip with streak count, avatar initials.

**Sections in order (top to bottom):**

- **Body composition: **Weight / Body fat % / Muscle mass — 32px numbers, trend arrows, separated by vertical dividers

- **Today’s nutrition: **4 macro arcs (calories=green, protein=blue, fat=amber, carbs=pink) + last logged meal strip with “View log →” link

- **Activity: **Water bottle fill animation + animated walking figure side by side. Water shows +250ml / +500ml quick-add buttons. Steps shows progress bar to daily goal.

- **AI nutritionist: **Green AI avatar, today’s proactive message, 2 action chips (“What to eat?” and “Log a meal”)

- **Progress: **Before/after photo thumbnails, goal progress bar showing % of goal reached

- **Health flags: **Only flagged blood markers shown as coloured alert rows (danger=red, warn=amber). Tap navigates to Lab tab.

## **5.2 AI Nutritionist Screen**

Tab name on bottom nav: “Nutrition”. Screen title: “AI Nutritionist”. Two sub-tabs: Chat | Today’s log.

### **Chat tab**

- Conversation UI — AI bubbles left (#E1F5EE background), user bubbles right (backgroundSecondary)

- AI avatar: circular green badge with “AI” text

- Quick action chips above input: “Log a meal”, “What should I eat?”, “Log manually”, “My targets”

- Input: camera icon (left) + text field with placeholder “Ask a question or log a meal...” + send button (right)

### **Today’s log tab**

- Consumed today: progress bars for calories, protein, fat, carbs with current/target values

- Meal slots: Breakfast, Lunch, Dinner, Snacks — each shows macros and source badge (AI / Saved)

- Still needed strip: 4 macro remaining values

- Suggestion cards: specific dishes with macro impact bars, badge (“Best match today” / “Great for ferritin”)

## **5.3 Lab Screen — Blood Markers Tab**

| **UPDATED** The Lab tab is view-only. There is no upload functionality on this tab. Blood test uploads are handled exclusively through Profile → Blood test history. The “Book now” button initiates a phone call to Al Bannay Clinic at 2226 7222. |
| --- |

Top: next blood draw date + “Book now” button (calls Al Bannay at 2226 7222).

“Needs attention” section: 2-column compact grid for HIGH/LOW markers + full-width horizontal card for BORDERLINE markers.

Flag card contents: status arrow (↑ High / ↓ Low), marker name, value at 22px, reference range, mini progress bar.

Borderline card: horizontal layout — label/range left, value right.

“All normal” section: dot + name + mini bar + value, grouped by category (Nutrients, Hormonal, Metabolic, Lipids). Count of normal markers shown in section header.

## **5.4 Lab Screen — InBody Tab**

Top: last scan date + InBody score + “Book scan” button (calls Al Bannay at 2226 7222).

Body composition: horizontal stat rows — label left, value centre (20px), mini bar right. Metrics: Weight, Body fat %, Muscle mass, Fat mass, BMR, Visceral fat.

Segmental muscle figure: SVG human figure with arms spread outward at angle. Arms rendered as diagonal paths, legs as rounded rectangles. Opacity fill per segment shows % of normal range. Side labels (left arm, right arm, trunk, left leg, right leg) with kg and % values. Trunk labelled on right side inline. Legend: Lower / Normal / Higher.

## **5.5 Lab Screen — Trends Tab**

Dropdown picker at top. Default selection: first flagged marker (Cortisol). Dropdown sections in order: ⚠ Needs attention (flagged markers, warm tint background) → Body composition → Normal blood markers.

Each option shows: coloured dot, marker name, current value, status badge.

Chart: line chart with 3 data points, reference grid lines, labelled data points, month labels on x-axis.

Below chart: data table (Date | Value | Change) + AI observation sentence. Selecting a different metric updates chart, table, and observation dynamically.

## **5.6 Profile Screen**

Identity card: avatar initials, name, age/sex/height, plan badge.

Accent colour picker: 7 colour swatches (teal, blue, purple, pink, coral, amber, charcoal). Active swatch has ring border.

**Section groups:**

- **Health ****&**** goals: **Goal & progress (navigates to progress page), Progress photos

- **Records: **Food library, Blood test history (includes upload entry point), InBody scan history (includes upload entry point)

- **Preferences: **Personal details, Notifications (fully customisable per type), Connected devices

- **Subscription ****&**** billing: **Plan & billing (navigates to billing page), Upgrade plan (navigates to plans comparison)

- Next blood draw booking strip with “Book now” button

- Sign out (coral/red text)

| **UPDATED** Blood test history and InBody scan history are the upload entry points for lab data. Each has its own separate upload flow: the user taps into the respective history screen, sees past uploads, and can add a new one via camera capture (photographed report) or file picker (digital PDF). After upload, the app parses the document and presents a mandatory confirmation screen where the user reviews and can edit extracted values before saving. Users who never upload either type of data can still use the app — the AI nutritionist works with whatever data is available. |
| --- |

## **5.7 Subscription — Plan ****&**** Billing**

Shows current plan card with plan name, renewal date, and price.

Premium plan card: clean feature list (Unlimited / Automated / Full history / Every Sunday / Included) — no usage bars.

Core plan card: per-day AI message usage bar (“14 of 20 / day · 6 remaining · resets at midnight”), blood test upload bar (x of 3), trend history limit shown in amber (“Last 30 days only”).

“What Premium adds” card on Core billing: 3 differentiators — unlimited messages, weekly Sunday review, full trend history.

Annual switch nudge: green card showing savings and effective monthly rate.

Payment method: card brand logo, masked number, expiry. Billing history: date, plan name, amount, download link per invoice. Cancel subscription: coral text at bottom with access continuation note.

## **5.8 Subscription — Plans Comparison**

Monthly / Annual toggle at top. Annual shows “save 2 months” badge. Toggling updates all prices dynamically.

| **Tier** | **Price/mo** | **Annual** | **Key limit** | **Key differentiator** |
| --- | --- | --- | --- | --- |
| Core | 9 KWD | 6.75 KWD | 20 AI msg/day, 30-day trends | Entry tier |
| Premium | 19 KWD | 14.25 KWD | None | Unlimited AI + Sunday review + full trends |
| Premium+ | 32 KWD | 27 KWD | None | Quarterly nutritionist + blood draw discount + companion |
| Family | 45 KWD | 37.50 KWD | None | 4 separate Premium accounts, one billing |

All plans: 7-day free trial. Annual = 2 months free. Premium = “Most popular” badge. Premium+ has amber border and amber CTA. Footer: “All plans include a 7-day free trial. Cancel anytime. Prices in Kuwaiti Dinar.”

## **5.9 Onboarding Flow**

| **UPDATED** New section. This flow did not exist in the original specification. All decisions below were made during product design sessions. |
| --- |

Onboarding is a longer guided flow. Each screen has a short line explaining why the question matters, so the length feels purposeful. Tone is gentle throughout.

### **Basics (required)**

- Date of birth

- Sex

- Height

- Current weight

- Activity level — each option includes a one-line description explaining what it means (e.g. Sedentary: “Desk job, little to no exercise”, Lightly active: “Light walks or exercise 1–2 days a week”, etc.)

### **Dietary context**

- Dietary restrictions (Vegetarian, Vegan, Pescatarian, Halal, Gluten-free, Dairy-free, None)

- Foods you dislike or can’t eat (free text)

- How many meals do you typically eat per day? (2, 3, 4+)

- Do you cook most of your meals or eat out frequently?

### **Medical context (optional)**

Privacy disclaimer shown before these questions: “This information stays private and is only used to personalize your nutrition guidance. You can skip any question you’re not comfortable with.”

- Are you currently taking any supplements?

- Have you been diagnosed with any conditions? (Diabetes, PCOS, Thyroid disorder, Anemia, None, Prefer not to say)

- Are you pregnant or breastfeeding?

### **Goal setting (AI conversation)**

This is the final step of onboarding and the user’s first interaction with the AI nutritionist. The user types what they want in plain language (e.g. “I want visible abs”, “I want to lose 10kg”, “I just want to eat healthier”). The AI responds with the science and a proposed plan:

*“For most women, visible abs start showing around 18–20% body fat. You’re currently at 29.5%. A realistic timeline to get there would be around 9–12 months with consistent nutrition. Want to start with a 16-week phase targeting 23%?”*

The AI translates aspirational goals into measurable targets with realistic timeframes. This sets the tone for the entire product.

### **Plan selection and payment**

After goal setting, the user selects a plan and completes payment via Apple/Google in-app purchase.

## **5.10 Upload Flows**

| **UPDATED** New section. Upload flows live exclusively in Profile, not in the Lab tab. |
| --- |

### **Blood test upload (Profile → Blood test history)**

- User taps “Blood test history” in Profile

- Sees list of past uploads with dates and summaries

- Taps “Add new” to start upload

- Chooses camera capture (photograph a printed report) or file picker (select a digital PDF)

- App parses the document and extracts marker values

- Confirmation screen: all extracted values shown in editable fields. User reviews and corrects any parsing errors.

- User taps “Save” → values are stored and populate the Lab tab

### **InBody scan upload (Profile → InBody scan history)**

- Same structure as blood test upload, different extracted fields

- Extracted values: weight, body fat %, muscle mass, segmental data, InBody score

- Same mandatory confirmation step with editable fields

**Key design principle: **The two upload flows are completely separate. Some users may only upload blood tests, some may only upload InBody scans, some may upload both, and some may upload neither. The app handles all four cases gracefully.

# **6. AI Nutritionist System Prompt**

The system prompt is assembled dynamically on the server on every API call. It is never exposed to the client. Model: claude-sonnet-4-20250514. Max tokens: 1000.

| **UPDATED** AI voice: directive + data-focused + friendly. The AI tells the user what to do with specific data to back it up, while maintaining a warm tone. It never lectures, never gives hollow praise, and always connects advice to the user’s actual numbers. Example: “Morning Sarah. Ferritin’s still low and yesterday’s protein came up 18g short. Let’s fix both at lunch — grilled beef kofta with a side of lentils hits iron and closes the protein gap.” |
| --- |

### **Section 1 — Identity ****&**** role**

Defines the AI as MRN’s nutritionist. Not a doctor. Directive, data-focused, friendly tone. Concise — 2–4 sentences per response. Can log meals, estimate macros, suggest food, answer nutrition questions. Cannot prescribe, diagnose, or access the internet.

### **Section 2 — Patient profile (dynamic)**

Injected from database: name, age, sex, height, activity level, goal type, goal description, program week, on-track boolean, dietary preferences, allergies, start date, cooking vs eating out preference, meals per day, medical conditions (if provided).

### **Section 3 — Observed patient behaviour (dynamic, builds over time)**

Fields deduced from interaction patterns — never asked directly. Includes: eating pattern (home cook vs eats out), first/last meal time, meal frequency, protein struggle pattern, adherence pattern, food preferences, meal timing issues, motivation pattern, response to suggestions.

Deduction rules: if 5+ restaurant meals logged → assume eats out, adjust suggestions. If protein consistently 20g+ below target → raise it proactively in the morning. If same protein source 4+ days → suggest variety. If suggested meals never appear in logs → reduce unprompted suggestions. If check-in energy below 3/5 consistently → flag calorie target. If weekend logging drops → acknowledge Monday naturally.

### **Section 4 — Blood marker context (dynamic)**

Flagged markers: name, value, unit, range, status, nutrition_note. Normal markers: name, value, unit.

nutrition_note examples: Ferritin LOW → “Prioritise iron-rich foods — red meat, lentils, spinach. Pair with vitamin C. Avoid tea/coffee within 1hr.” Cortisol HIGH → “Prioritise magnesium-rich foods and omega-3s. Limit caffeine. Consistent meal timing.”

### **Section 5 — Body composition (dynamic)**

Weight, body fat %, muscle mass, fat mass, BMR, visceral fat level — all with change values from start, not just current values.

### **Section 6 — Daily targets (dynamic)**

Calories, protein, fat, carbs, water targets + rationale string explaining why targets are set this way. Weekly weight log last 4 weeks.

### **Section 7 — Today’s intake (dynamic)**

All meals logged today with macros. Running totals: consumed vs target for all 4 macros and water. Protein sources eaten today list.

### **Section 8 — Conversation rules**

Meal logging format: “Logged — [meal]. [cals] kcal, [protein]g protein, [fat]g fat, [carbs]g carbs.” Then one sentence on remaining targets. Ask one clarifying question if portion unclear.

Meal suggestions: name dishes specifically (not “a protein source” — say “beef kofta”). Give macro impact per dish. Connect to flagged markers where relevant. Keep halal and Kuwait-appropriate. Do not repeat protein sources already eaten.

Tone: 2–4 sentences. Use first name once at start. No lecturing. No hollow praise (“Great choice!”). One sentence acknowledgement if discouraged, then redirect to actionable.

Clinical boundaries: never suggest supplement doses. Never recommend stopping medication. Severely abnormal markers → refer to Al Bannay Clinic. Do not speculate on diagnoses.

Safety floors: never push below 15% body fat (women) or 8% (men). Never suggest below 1,200 kcal/day.

**Realistic goal setting: **When a user states an aspirational goal, the AI translates it into a measurable target with a realistic timeframe. For example, “I want visible abs” becomes a specific body fat percentage target with an estimated timeline based on the user’s current composition and rate of progress.

### **Al Bannay referral rules**

- For blood test / retesting: “Al Bannay Clinic can run that — albannayclinic.net or 2226 7222, open 9am to 7pm.”

- For InBody scan: “You can get your InBody scan at Al Bannay — they’re our partner. albannayclinic.net or 2226 7222.”

- For IV drip (deficient marker): “If you want faster results on your [marker], Al Bannay offers IV drip therapy. albannayclinic.net or 2226 7222.”

- For physician review: “That’s outside what I can advise — Al Bannay Clinic is the right place. 2226 7222 or albannayclinic.net.”

Never say “I cannot help” without offering Al Bannay. Handoff feels like a warm referral, not a door closing.

### **Weekly Sunday review — separate prompt**

Runs as scheduled job every Sunday at 8am. Different prompt structure optimised for reflection. Output saved to DB and pushed as notification. Under 200 words, no headers, no bullet points, written as a message from the nutritionist. Four parts: what went well (specific, data-referenced) → one thing to improve → one adjustment if data justifies it → one genuine encouragement sentence.

### **AI Nutritionist — Tone ****&**** Rules**

| **UPDATED** New section. These rules consolidate and extend the conversation rules above into a standalone reference for prompt engineering and QA testing. |
| --- |

**Meal logging**

When a patient describes a meal, respond in this exact format: “Logged — [meal]. [cals] kcal, [protein]g protein, [fat]g fat, [carbs]g carbs.” Then one sentence on how it affects remaining targets. If unsure about portion size, ask one specific clarifying question — not multiple. Always use the patient’s saved dishes from their food library if the description matches.

**Meal suggestions**

When asked what to eat, suggest 2–3 specific dishes. For each:

- Name it concretely — “beef kofta” not “a protein source”

- Give macro impact in one line: “+32g protein, +420 kcal”

- Connect to blood markers where relevant: “good for your ferritin” or “supports cortisol regulation”

**Tone and length**

- Be concise. Most replies should be 2–4 sentences.

- Use the patient’s first name once at the start of a conversation, not repeatedly.

- Do not lecture. If a patient logs a high-calorie meal, note the impact factually and move on.

- Do not say “Great choice!” or “Amazing!” — be genuinely useful instead.

- If the patient seems frustrated or discouraged, acknowledge it in one sentence then redirect to what is actionable today.

**Clinical boundaries and referrals**

- Never suggest specific supplement doses.

- Never tell a patient to stop a medication.

- If a blood marker is severely abnormal (HbA1c above 7%, TSH below 0.1 or above 10), recommend Al Bannay Clinic or a partner clinic for physician review.

- Do not speculate about diagnoses.

- If the patient asks about eating disorders, extreme restriction, or losing more than 0.75kg per week, respond with care and recommend professional support.

- For any question outside your scope, always refer to Al Bannay Clinic with their contact details or to seek professional advice. Never close a door without opening another.

**Safety floors — hard limits**

Never suggest below 1,200 kcal per day. If the patient’s stated goal would require going below this floor, acknowledge it respectfully and explain why you are setting a safer target.

# **7. Business Model**

### **Subscription tiers**

All tiers: 7-day free trial. Annual billing = 2 months free across all tiers. Automated blood test and InBody OCR parsing in ALL tiers — not a differentiator. Pharmacy integration excluded until vendor partnership confirmed.

### **Core — 9 KWD/month (81 KWD/year)**

- AI nutritionist — 20 messages per day (resets at midnight)

- Automated blood test and InBody parsing

- Food logging and meal suggestions

- Progress tracking and photos

- Trend history — last 30 days only

### **Premium — 19 KWD/month (171 KWD/year) — Most popular**

- AI nutritionist — unlimited messages

- Automated blood test and InBody parsing

- Full trend history — no time limit

- Weekly AI nutrition review every Sunday

- Blood draw booking reminders

### **Premium+ — 32 KWD/month (324 KWD/year)**

- Everything in Premium

- Quarterly 30-minute video consultation with registered clinical nutritionist who reviews patient data before every call

- Discounted blood draws at partner clinics — up to 25% off every panel at Al Bannay

- Personalised quarterly health report

- 1 companion account at half price

Note: Premium+ requires hiring a registered clinical nutritionist before launch. One nutritionist can handle ~100 active Premium+ patients at a time.

### **Family — 45 KWD/month (450 KWD/year)**

- 4 separate Premium accounts

- Each account fully independent

- One billing relationship

- Add or remove members anytime

### **Payment**

| **UPDATED** Launch uses Apple/Google in-app purchases for subscription management. Tap Payments integration deferred to post-launch (after 200–300 subscribers). Stack: Tap Payments primary (KNET, Visa, Mastercard, Apple Pay — Kuwait-native), Stripe secondary for non-GCC expansion. |
| --- |

# **8. Build Plan**

| **UPDATED** Build plan updated to reflect 6-month timeline with 2–4 developer team and phased handoff structure. See MRN_Roadmap.docx for the detailed founder-facing roadmap with handoff checkpoints. |
| --- |

### **Tech stack**

| **Layer** | **Technology** |
| --- | --- |
| Mobile | React Native (Expo) — single codebase iOS + Android |
| Backend | Node.js + TypeScript |
| Database | PostgreSQL |
| AI | Anthropic Claude API — claude-sonnet-4-20250514 |
| OCR | Claude Vision (for blood test and InBody scan parsing) |
| Auth | Supabase Auth |
| Push notifications | Expo Notifications + AWS SNS |
| Payments | Apple/Google in-app purchases at launch, Tap Payments post-launch |

# **9. Immediate Actions**

### **Before writing any code**

- Test the AI system prompt in Claude using the complete prompt in Section 6

- Register company in Kuwait — needed for App Store and payment accounts

- Open Apple Developer account (developer.apple.com) — takes 2–4 weeks to approve

- Open Google Play Console account — takes 2–3 days

- Open Anthropic API account for Claude Sonnet

- Choose cloud hosting provider (ask dev team preference before committing)

- Negotiate blood draw and InBody scan discount with Al Bannay Clinic for Premium+ tier

- Identify registered clinical nutritionist in Kuwait for Premium+ consultations

- Check Kuwait Ministry of Health requirements for digital health consultation delivery

# **10. HTML Prototype**

| **UPDATED** The HTML prototype has been completed. File: mrn.html. It is a single-file interactive prototype covering all screens specified in Section 5, populated with Sarah Al-Mutairi’s sample data. This file serves as the visual reference for the dev team — every colour, spacing value, layout, and interaction is defined in it. |
| --- |

The prototype includes all 4 bottom nav tabs with working navigation, all sub-tabs, the segmental body figure SVG, macro arc SVGs, trend line charts, water bottle animation, walking figure, and all interactive states (dropdown selection, monthly/annual toggle, water quick-add, billing Core/Premium view toggle).

Seven screens are stubbed with “Not yet designed” placeholders pending dedicated design sessions: Progress photos, Food library, Blood test history, InBody scan history, Personal details, Notifications, Connected devices. The onboarding flow and upload flows are also not yet in the prototype and will be added as they are designed.

### **Sample patient data used throughout (Sarah Al-Mutairi)**

- Age 31, female, 165cm, lightly active

- Goal: Reduce body fat from 29.5% to 23.0% by week 16, Week 6 of 16, on track

- Weight: 68.4kg (down 2.6kg), Body fat: 28.1% (down 1.4%), Muscle: 24.1kg (up 0.3kg)

- Flagged: Cortisol HIGH (23 µg/dL), Ferritin LOW (18 µg/L), LDL BORDERLINE HIGH (118 mg/dL)

- Daily targets: 1,750 kcal / 110g protein / 55g fat / 180g carbs / 3,300ml water

- Today logged: Breakfast eggs & labneh (420 kcal, 35g protein), Lunch chicken rice bowl (580 kcal, 38g protein)

- Current plan: Premium

*End of MRN Product **&** Build Specification*