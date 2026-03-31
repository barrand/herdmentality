# Flock Together -- Design Guide for Google Stitch

This document contains everything you need to generate the UI designs in Google Stitch and bring them back into the codebase. Work through the screens in order.

---

## Setup

1. Go to [stitch.withgoogle.com](https://stitch.withgoogle.com)
2. Sign in with your Google account
3. Switch to **Experimental mode** (top of page) -- this uses Gemini 2.5 Pro and lets you upload reference images
4. Click the **mobile tab** before generating -- this is a phone-first game

## How to Work Through This

1. **Start with Screen 1 (Home)** -- this establishes the midnight hearth palette, typography, and visual identity
2. Paste the prompt, generate, and iterate in Stitch's chat until you love it
3. Once happy, click **"Code"** and copy the HTML/Tailwind output
4. Save it to `stitch-exports/home.html` in the project (create the file, paste the HTML)
5. Move to Screen 2, and add to your prompt: *"Use the same midnight hearth style, colors, and typography as my previous Flock Together home screen design."*
6. Repeat for all 9 screens

**Iteration tips:**
- Follow-up prompts in Stitch chat: "more shiplap texture", "warmer linen tones", "more white space", "add botanical line art", "make it feel more midnight hearth"
- If you find a midnight hearth style design you like, paste its URL into Stitch and say "use this style"
- You get 50 experimental generations per month -- plenty for iteration
- Upload reference images of midnight hearth branding, rustic-elegant interiors, vintage seed packets, or botanical illustrations for inspiration

---

## Theme Bible: Midnight Hearth

Every screen should feel like you've settled into a **beautifully curated midnight hearth** -- warm, inviting, and effortlessly stylish. Shiplap and linen, hand-lettered signs, vintage botanical prints, and copper accents. It's rustic, but it's *elevated rustic*. Colorful, warm, intimate -- never kitschy or cartoonish.

### Color Palette
- **Warm white / linen:** (#FAF8F5 range) for backgrounds -- like fresh linen or whitewashed shiplap. The dominant color. Clean but warm, never cold or stark.
- **Rich sage green:** (#5B7F5E range) for primary buttons, headers, and key accents -- like rosemary and eucalyptus. Earthy and elegant.
- **Soft gold / wheat:** (#D4A853 range) for highlights, scores, badges, and warm accents -- like morning light on a wheat field. Not neon yellow -- muted, rich gold.
- **Dusty terracotta:** (#C0735E range) for secondary accents, alerts, and the Rotten Egg -- like aged clay pots and barn brick. Warm but sophisticated.
- **Dark charcoal:** (#3A3A3A range) for primary text -- warm dark, not pure black. Like wrought iron or aged wood.
- **Warm taupe/greige:** (#A89F91 range) for secondary text, borders, and subtle details -- like natural rope, burlap, or weathered wood.
- **Cream/parchment:** (#F5F0E8 range) for cards and content areas -- like aged cotton paper or a hearth-side tablecloth.
- **Muted olive-green:** (#7A8B4A range) for the Rotten Egg -- earthy, not neon. Feels like something that grew in the garden and went bad.

### Typography
- **Headlines:** Elegant serif with character (think Playfair Display, Lora, or Freight) -- feels like a hand-painted hearth sign or vintage seed packet. Not chunky or cartoonish -- refined with warmth.
- **Body text:** Clean, warm sans-serif (Inter, Source Sans Pro, or DM Sans) -- readable and modern but not sterile. The contrast between serif headlines and clean body text creates that midnight hearth editorial feel.
- **Accent text:** A handwritten or script font used sparingly for labels, callouts, or fun moments (Caveat, Kalam, or similar). Like handwritten tags on mason jars.
- **Numbers (scores, timers):** Clean, bold, tabular -- easy to read at a glance. Serif or monospaced for timers.

### Textures and Patterns
- **Shiplap:** Subtle white wood-plank texture for backgrounds or card surfaces. Horizontal lines, painted-over-wood warmth. The signature midnight hearth element.
- **Linen/burlap:** Light woven texture for cards, modals, or sections. Adds tactile warmth without being busy.
- **Botanical line art:** Delicate hand-drawn sprigs, branches, laurel wreaths, and leaves used as decorative accents. Think vintage botanical illustration -- elegant, not clip-art.
- **Aged paper:** Very subtle parchment or cotton-paper texture on question cards for a vintage feel.
- **Copper/brass accents:** Warm metallic tones on icons, dividers, or small details -- like hearth-side fixtures.
- **Avoid:** Cartoon textures, heavy chicken-wire patterns, straw piles, or anything that feels like a county fair. This is the hearth, not the barn.

### UI Elements
- **Buttons:** Softly rounded with generous padding. Primary buttons use sage green with cream text -- solid, confident, inviting. Secondary buttons are outlined in taupe with warm text. They should feel like hand-lettered signs: approachable but refined. Subtle shadow or depth, not flat.
- **Cards:** Cream or parchment background with fine taupe borders. Gentle rounded corners. Occasionally a very subtle linen texture. Question cards feel like a beautiful card pulled from a vintage game box.
- **Inputs:** Cream background with taupe borders. Warm placeholder text. Rounded but not bubbly -- elegant. Focus state uses sage green.
- **Timer:** Clean and bold, not a novelty shape. A beautiful progress bar that empties smoothly -- sage green fading to taupe or terracotta as time runs out. Simple, elegant, urgent.
- **Egg score icons:** Egg emojis (🥚) in a row -- simple and immediately readable. The count is the focus, not elaborate illustration.
- **Rotten Egg:** The game's villain, but rendered with personality, not gross-out humor. Sickly olive-green tones, a cracked shell, subtle stink lines. Funny and memorable but fits the refined aesthetic -- like a spoiled garden vegetable, not a cartoon character.
- **Player indicators:** Small colored dots (sage, gold, terracotta) for connection status. Simple botanical or initial-based avatars, not cartoon chickens.
- **Loading/waiting states:** Subtle animations -- a gentle pulse, a slowly rotating laurel wreath, or a soft fade. Calm and unhurried, like waiting on a porch.
- **Backgrounds:** Warm white (#FAF8F5) with very subtle shiplap texture. Muted sage or cream gradients for depth. Clean and airy -- lots of white space.
- **Dividers:** Thin taupe lines, occasionally with a small botanical sprig centered. Understated.

### Vocabulary and Tone
The language stays playful and farm-themed, but the delivery is warm and clever, not loud or cartoonish:
- Points are **eggs** -- shown as clean emoji rows, collected in your basket
- The lobby is **the henhouse** -- a cozy gathering place
- The question card feels like a **beautifully letterpressed prompt** from a vintage game
- The reveal is the **flock check** -- who stayed together?
- Outliers have **flown the coop** -- a wry, knowing phrase
- The scoreboard is **the pecking order** -- cheeky but classy
- The overall tone: **witty, warm, and inviting** -- like a dinner party game by the hearth, not a loud arcade

---

## Screen 1: Home

### What it does
The landing page. Players enter their name, then either create a new game or join an existing one with a word-based room code. This screen establishes the entire visual world.

### Current UI Text
- Title: **FLOCK TOGETHER**
- Mascot: chicken emoji (🐔)
- Input placeholder: **"Your Name"**
- Primary button: **"CREATE GAME"** (loading: "Creating...")
- Divider: **"or"** (plain line with text)
- Input placeholder: **"Room code (e.g. MANGO)"**
- Secondary button: **"JOIN GAME"** (loading: "Joining...")

### Wireframe

```
+----------------------------------+
|          [sky gradient]          |
|                                  |
|         FLOCK TOGETHER           |
|       [big chicken emoji 🐔]    |
|                                  |
|   +----------------------------+ |
|   |  Your Name                 | |
|   +----------------------------+ |
|                                  |
|   +----------------------------+ |
|   |       CREATE GAME          | |
|   +----------------------------+ |
|                                  |
|      ──────── or ────────       |
|                                  |
|   +----------------------------+ |
|   |  Room code (e.g. MANGO)   | |
|   +----------------------------+ |
|   +----------------------------+ |
|   |        JOIN GAME           | |
|   +----------------------------+ |
|                                  |
|   [illustrated grass / straw]    |
+----------------------------------+
```

### Stitch Prompt (copy and paste this)

```
Design a mobile party game home screen for "Flock Together" -- a multiplayer party
game with a MIDNIGHT HEARTH aesthetic -- warm, inviting, stylish, never cartoonish.
Elevated rustic meets premium card game.

Visual style:
- Background: warm white/linen (#FAF8F5) with a very subtle shiplap or linen texture
- Colors: rich sage greens, soft golds, cream/parchment, warm taupe, dark charcoal text
- Typography: elegant serif headlines (Playfair Display, Lora) that feel hand-lettered,
  clean sans-serif body text (Inter, DM Sans). Warm, editorial, refined.
- Accents: delicate botanical line art (sprigs, branches, small laurel elements),
  copper/brass metallic touches

Include:
- "FLOCK TOGETHER" title in elegant serif lettering -- large, warm, hand-sign feel
  but refined, not cartoonish
- A tasteful chicken or rooster illustration below the title -- stylish, warm, could be
  a vintage botanical-style line drawing or a classy illustrated mascot. NOT a cartoon.
  Think vintage farm logo or seed-packet illustration.
- A text input for "Your Name" with cream background and taupe border, softly rounded
- A large "CREATE GAME" button in sage green with cream text -- solid, confident, inviting
- A clean divider with "or" text centered between thin taupe lines
- A text input for "Room code (e.g. MANGO)"
- A "JOIN GAME" button (secondary -- cream/white with sage green border)
- Subtle botanical sprigs or a delicate laurel element as decoration
- All buttons and inputs must be large and thumb-friendly (44px+ touch targets)
- The overall vibe: opening a beautiful board game by the hearth at a dinner party
```

### Key Design Notes
- This screen sets the visual world for the entire game -- spend extra time here
- The chicken/rooster illustration should be classy, not cartoonish -- think vintage farm logo or botanical print
- The divider is a clean "or" with thin taupe lines
- Name input should feel welcoming and warm -- cream and soft edges
- Room code placeholder "e.g. MANGO" hints that codes are words
- CREATE GAME is sage green (primary); JOIN GAME is outlined/secondary
- Lots of white space -- airy and uncluttered, warm and inviting

---

## Screen 2: Lobby (Host View)

### What it does
The host waits here while players join. They can see settings, add bonus categories for AI question generation, submit custom questions, and start the game. This feels like gathering everyone in the henhouse before the game starts.

### Current UI Text
- Title: **FLOCK TOGETHER**
- Room label: **"Room:"** with room code large
- Copy button: 📋
- Player list header: **"The Henhouse ({count})"**
- Player labels: **"(host)"** and **"← you"**
- Waiting placeholder: **"Waiting for others..."**
- Settings header: **"Settings"**
- Settings rows: **"Rounds"** / **"Timer"** (with values)
- Divider: clean `<hr>` line
- Category header: **"Bonus Categories"** with **(optional)** tag
- Category helper: **"Adds themed questions on top of the general pool"**
- Question header: **"Submit a Question (optional)"**
- Question input placeholder: **"Type a question..."**
- Start button: **"START GAME"** (loading: "Starting...", disabled: "Need {n} more players")

### Wireframe

```
+----------------------------------+
|  FLOCK TOGETHER                  |
|        Room: MANGO  [📋]        |
|----------------------------------|
|                                  |
|  THE HENHOUSE (4)                |
|  +----------------------------+  |
|  | ● Ben (host) ← you       |  |
|  | ● Sarah                   |  |
|  | ● Mike                    |  |
|  | ● Jess                    |  |
|  |   Waiting for others...   |  |
|  +----------------------------+  |
|                                  |
|  SETTINGS                        |
|  Rounds:               15       |
|  Timer:                45s      |
|                                  |
|  ─────────────────────────────  |
|                                  |
|  BONUS CATEGORIES (optional)     |
|  [Disney ×] [Utah ×] [Add.. +] |
|  Adds themed questions on top    |
|  of the general pool             |
|                                  |
|  SUBMIT A QUESTION (optional)    |
|  [Type a question...         +]  |
|  "What's the best ice cream?"   |
|  "Name a famous Utah landmark"   |
|                                  |
|  +----------------------------+  |
|  |       START GAME           |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the lobby screen for a mobile party game called "Flock Together" with
a MIDNIGHT HEARTH aesthetic. This is the HOST's view while waiting for
players to join. Same midnight hearth visual language as the home screen.

Same style: warm white/linen background, sage greens, soft golds, cream cards,
serif headlines, clean sans-serif body, botanical accents.

Include:
- Header with "FLOCK TOGETHER" in elegant serif and the room code "MANGO"
  displayed large and prominently with a clipboard copy icon
- Player list titled "THE HENHOUSE (4)" in a cream card with fine taupe borders.
  Players shown with small colored connection dots: "Ben (host) ← you",
  "Sarah", "Mike", "Jess", and "Waiting for others..." in italic taupe text
- Settings section showing "Rounds: 15" and "Timer: 45s" in clean card rows
- A thin taupe divider line
- "BONUS CATEGORIES (optional)" with warm gold chips showing [Disney] [Utah]
  with × remove buttons, plus a text input with + add button.
  Helper text: "Adds themed questions on top of the general pool"
- "SUBMIT A QUESTION (optional)" with a cream-background text input and + button,
  submitted questions shown below as italic quoted text
- A large sage green "START GAME" button at the bottom -- confident, inviting.
  Show disabled state when not enough players.
- Clean, scrollable layout with generous white space
```

### Key Design Notes
- Room code "MANGO" should be BIG -- people need to read it aloud across the room
- Player list feels like a refined guest list, not a cartoon roll call
- Category chips are warm gold with clean typography
- The divider is a thin taupe line -- clean and minimal
- "START GAME" is sage green, confident and inviting
- The clipboard copy icon is important -- people will text the room code to friends
- Lots of breathing room between sections

---

## Screen 3: Lobby (Player View)

### What it does
What non-host players see while waiting. Simplified version of the host lobby -- they can see who's joined, see categories (read-only), and submit questions, but can't change settings or start the game.

### Current UI Text
- Same header as host view
- Player list: same, with **"← you"** on your name
- Categories: shown as read-only chips (no × buttons, no add input)
- "No bonus categories" shown if empty
- Question submission: same as host
- Waiting text: **"Waiting for host to start..."** (with pulse animation)

### Wireframe

```
+----------------------------------+
|  FLOCK TOGETHER                  |
|        Room: MANGO  [📋]        |
|----------------------------------|
|                                  |
|  THE HENHOUSE (4)                |
|  +----------------------------+  |
|  | ● Ben (host)              |  |
|  | ● Sarah ← you            |  |
|  | ● Mike                    |  |
|  | ● Jess                    |  |
|  |   Waiting for others...   |  |
|  +----------------------------+  |
|                                  |
|  ─────────────────────────────  |
|                                  |
|  BONUS CATEGORIES                |
|  [Disney] [Utah]                 |
|                                  |
|  SUBMIT A QUESTION (optional)    |
|  [Type a question...         +]  |
|  "What's the best ice cream?"   |
|                                  |
|  Waiting for host to start...    |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the lobby screen for a non-host PLAYER in "Flock Together" party game.
Same midnight hearth style as the host lobby but simplified and calmer.

Same style: warm white/linen background, sage greens, soft golds, cream
cards, serif headlines, clean sans-serif body.

Include:
- Same header with room code "MANGO" and clipboard copy icon
- Player list titled "THE HENHOUSE (4)" (read-only) in cream card with
  connection dots, a "← you" indicator next to your name
- A thin taupe divider line
- "BONUS CATEGORIES" shown as read-only warm gold chips (no × buttons, no input)
- "SUBMIT A QUESTION (optional)" input -- players CAN submit questions
- "Waiting for host to start..." message at the bottom with a gentle pulse animation
- No settings section, no start button (those are host-only)
- Calm, patient feel -- like sitting by the hearth waiting for everyone
```

### Key Design Notes
- No settings section visible to players
- Categories are read-only (no × buttons, no add input)
- "Waiting for host to start..." should feel patient and warm -- the pulse animation helps
- Make it very clear which player is "you" with the "← you" indicator
- Calmer, more serene energy than the host view

---

## Screen 4: Answering Phase

### What it does
The core gameplay screen. A question is displayed with a countdown timer. Players type their answer and tap "CLUCK IN". The host also sees a subtle "Skip question" link directly below the question card.

### Current UI Text
- Header: **"Round {n} of {total}"** / room code / **"🥚 x {score}"** / **"Pecking Order"** link
- Rotten Egg badge (if holder): **"ROTTEN EGG"** with RottenEgg icon
- Timer: **"0:{seconds}"** (expired: **"TIME'S UP!"**)
- Question: displayed in white card
- Host skip link: **"Skip question"** (directly below the question card)
- Input placeholder: **"Your answer..."**
- Submit button: **"CLUCK IN"** (loading: "Clucking in...")
- Submitted state: **"You answered:"** / **"{answer}"** / **"Clucked in"**
- Expired state: **"Too slow!"** / **"You didn't answer in time."**
- Bottom text: **"{n} of {total} players answered"**

### Wireframe (Player)

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  🥚 x 2             Pecking Order|
|----------------------------------|
|                                  |
|           0:32                   |
|      [progress bar]              |
|                                  |
|  +----------------------------+  |
|  |                            |  |
|  |  What is the best Disney   |  |
|  |  villain of all time?      |  |
|  |                            |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  | Your answer...             |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |        CLUCK IN            |  |
|  +----------------------------+  |
|                                  |
|  4 of 6 players answered         |
|                                  |
+----------------------------------+
```

### Wireframe (Host -- adds skip link)

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  🥚 x 2             Pecking Order|
|----------------------------------|
|                                  |
|           0:32                   |
|      [progress bar]              |
|                                  |
|  +----------------------------+  |
|  |                            |  |
|  |  What is the best Disney   |  |
|  |  villain of all time?      |  |
|  |                            |  |
|  +----------------------------+  |
|       Skip question              |
|                                  |
|  +----------------------------+  |
|  | Your answer...             |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |        CLUCK IN            |  |
|  +----------------------------+  |
|                                  |
|  4 of 6 players answered         |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the answering screen for "Flock Together" mobile party game. This is the
core gameplay moment -- a question appears and players race to answer. Same midnight
hearth style.

Warm white/linen background. Sage green header. Cream question card.

Include:
- Compact sage green header bar: "Round 3 of 15" on left, room code "MANGO" on right.
  Second row: "🥚 x 2" (egg emoji score) on left, "Pecking Order" underlined
  link on the right
- A prominent countdown timer showing "0:32" in large bold serif text, with a sage
  green progress bar below it that drains as time runs out (turns terracotta/red
  when expired)
- Large question card in the center: cream/parchment rounded card with fine taupe
  border showing "What is the best Disney villain of all time?" in elegant serif --
  big, readable, the visual focus. Should feel like a beautifully letterpressed prompt.
- For host only: a subtle "Skip question" underlined text link directly below the
  question card (small, taupe, understated)
- Text input below: "Your answer..." with cream background, taupe border
- A big sage green "CLUCK IN" button -- confident, satisfying to tap
- Small taupe text at bottom: "4 of 6 players answered"
- The energy should feel focused but elegant -- the timer creates urgency
```

### Key Design Notes
- Timer progress bar drains left-to-right and turns terracotta/red on expiry
- "Skip question" is directly below the question card, small and understated -- NOT at the bottom of the screen
- "CLUCK IN" should feel decisive -- a confident commitment in sage green
- The egg score and Pecking Order link are in the header, always visible
- If you hold the Rotten Egg, a muted olive "ROTTEN EGG" badge appears in the header next to your score
- After submitting: shows "You answered:" with your answer in quotes, then "Clucked in"
- After expiry: shows "Too slow!" / "You didn't answer in time."

---

## Screen 5: Answer Locked In (Waiting)

### What it does
After clucking in, the player sees their confirmed answer and waits for others. Same screen structure but the input/button area is replaced with the confirmed answer.

### Current UI Text
- Confirmed answer: **"You answered:"** / **""{answer}""** / **"Clucked in"**
- Bottom: **"{n} of {total} players answered"**

### Wireframe

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  🥚 x 2             Pecking Order|
|----------------------------------|
|                                  |
|           0:18                   |
|      [progress bar]              |
|                                  |
|  +----------------------------+  |
|  |  What is the best Disney   |  |
|  |  villain of all time?      |  |
|  +----------------------------+  |
|                                  |
|        You answered:             |
|          "Scar"                  |
|         Clucked in               |
|                                  |
|  4 of 6 players answered         |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the "waiting for others" screen after clucking in an answer in
"Flock Together" party game. Same midnight hearth style.

Include:
- Same sage green header bar with round info, egg score, pecking order link
- Timer still counting down: "0:18" with draining progress bar
- Question card (same cream/parchment style as the answering screen)
- Your locked-in answer shown centered: "You answered:" in medium sage text,
  then your answer "Scar" in large bold serif quotes, then "Clucked in" in
  small taupe text. Should feel confirmed and sealed -- like sealing a letter.
- Small taupe text at bottom: "4 of 6 players answered"
- Calmer, more relaxed feel -- you're done, quietly waiting
```

### Key Design Notes
- Mood shifts from urgent to calm -- the timer is still draining but you're at ease
- Your answer should feel confirmed and sealed -- "Clucked in" is the reassurance
- Same screen layout, just the input/button area is replaced with the answer display
- Still builds anticipation while waiting for others

---

## Screen 6: Reveal Phase

### What it does
The most exciting screen! Answers are revealed, grouped by fuzzy matching, and scores are awarded. Shows who was in the flock, who flew the coop, who got the Rotten Egg, and highlights your own row with a "you" badge.

### Current UI Text
- Loading state: 🐔 **"Checking all answers..."** / **"The flock is being counted"**
- Flock answer card: **"The Flock Said"** / **""{answer}""**
- No flock card: **"No Flock!"** / **"No eggs awarded this round."**
- AI commentary: shown in amber card, italic with quotes
- Result badges: **"FLOCK"** (green) / **"ROTTEN EGG"** (lime with RottenEgg icon, animated wobble) / **"FLOWN THE COOP"** (gray) / **"NO ANSWER"** (light gray)
- Flock players get: **"+1"** next to badge
- Your row: yellow ring highlight + **"you"** pill badge next to name
- Host button: **"NEXT ROUND"** (last round: **"SEE FINAL PECKING ORDER"**)
- Player text: **"Waiting for host to continue..."**

### Wireframe

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  🥚 x 3             Pecking Order|
|----------------------------------|
|                                  |
|  What is the best Disney         |
|  villain of all time?            |
|                                  |
|  +----------------------------+  |
|  | THE FLOCK SAID              |  |
|  |       "Scar"                |  |
|  +----------------------------+  |
|                                  |
|  "Everyone's a Scar stan today"  |
|                                  |
|  +----------------------------+  |
|  | Ben       "Scar"  FLOCK +1|  |
|  +----------------------------+  |
|  +============================+  |
|  | Sarah [you]               |  |
|  | "scar"          FLOCK +1  |  |
|  +============================+  |
|  +----------------------------+  |
|  | Mike      "Scar"  FLOCK +1|  |
|  +----------------------------+  |
|  +----------------------------+  |
|  | Jess "Ursula" FLOWN THE COOP| |
|  +----------------------------+  |
|  +----------------------------+  |
|  | Alex "Maleficent"         |  |
|  |    [🥚💀] ROTTEN EGG      |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  |     NEXT ROUND (host)      |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the answer reveal screen for "Flock Together" party game. This is the
MOST EXCITING MOMENT -- the flock check! Same midnight hearth style but with
extra warmth and celebration.

Include:
- Sage green header bar with round info, egg score, pecking order link
- Question repeated at top in bold serif
- "THE FLOCK SAID" section -- a warm sage/cream card showing the winning answer
  "Scar" in large bold serif quotes. This section should feel WARM and WINNING --
  like a golden ribbon -- warm, winning, elegant.
- AI commentary in a soft gold/wheat card, italic with quotes:
  "Everyone's a Scar stan today"
- Individual player result rows as rounded cream cards with fine borders:
  Each card shows player name, their exact answer in quotes, and a result badge.
  - FLOCK badge (sage green pill) with "+1" for players who matched
  - FLOWN THE COOP badge (taupe pill) for outliers
  - ROTTEN EGG badge (olive/muted green pill with rotten egg icon, subtle wobble
    animation) for the penalty holder
  - Your own row highlighted with a soft gold ring border and a small "you" pill
    badge next to your name (warm gold background, bold)
- If no flock: show "No Flock!" / "No eggs awarded this round." in a gold card
- Sage green "NEXT ROUND" button for the host (last round: "SEE FINAL PECKING ORDER")
- Non-host players see "Waiting for host to continue..." in taupe
- The flock section should feel warmly celebratory, the outlier sections gentle not shameful
```

### Key Design Notes
- This is the emotional peak of every round -- warm celebration, not loud
- "THE FLOCK SAID" in a warm sage card feels like a ribbon announcement
- Each player's exact wording shown side by side is key for fuzzy matching transparency
- The "you" pill badge (warm gold) makes your row instantly findable
- The Rotten Egg badge has a subtle wobble animation when it appears
- AI commentary adds humor -- shown in a gold card between the flock answer and individual results
- Status bar shows updated egg count

---

## Screen 7: Leaderboard Modal

### What it does
A bottom sheet overlay accessible from any gameplay screen via the "Pecking Order" link. Shows the full ranked player list. Doesn't interrupt gameplay.

### Current UI Text
- Title: **"THE PECKING ORDER"**
- Close button: **×**
- Your row: highlighted with yellow background/border and **"←"** arrow
- Scores: egg emojis 🥚 in a row (capped at 8, then "x{n}" for higher)
- Rotten Egg holder: RottenEgg icon next to their eggs
- Empty state: **"No players yet"**

### Wireframe

```
+----------------------------------+
|  (dimmed screen behind)          |
|                                  |
|  +----------------------------+  |
|  | THE PECKING ORDER     [×] |  |
|  |                            |  |
|  |  1. Ben    🥚🥚🥚🥚🥚      |
|  |  2. Sarah  🥚🥚🥚 ←       |  |
|  |  3. Mike   🥚🥚🥚         |  |
|  |  4. Tom    🥚🥚            |  |
|  |  5. Jess   🥚              |  |
|  |  6. Alex   🥚 [RottenEgg] |  |
|  |                            |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design a bottom sheet / modal overlay for the leaderboard in "Flock Together"
party game. It's called "THE PECKING ORDER." Same midnight hearth style. It
overlays on top of the gameplay screen with a darkened background.

Cream/parchment background, serif title, clean sans-serif body.

Include:
- "THE PECKING ORDER" title in elegant serif with an × close button on the right
- Ranked list of 6 players where scores are shown as ROWS OF EGG EMOJIS (🥚).
  More eggs = bigger score. Cap at 8 visible emojis, then show "x{n}" for higher:
  1. Ben [5 egg emojis]
  2. Sarah [3 egg emojis] ← highlighted with soft gold background as "you"
  3. Mike [3 egg emojis]
  4. Tom [2 egg emojis]
  5. Jess [1 egg emoji]
  6. Alex [1 egg emoji] + a distinctive rotten egg icon (holds the Rotten Egg)
- Your row highlighted with a soft gold background and gold border, with "←" arrow
- Clean, easy to scan at a glance -- like a hand-lettered standings board
- Bottom sheet style that slides up from the bottom with max-height 80vh and scroll
- Rounded top corners on the modal
```

### Key Design Notes
- "THE PECKING ORDER" in elegant serif -- refined but with personality
- Egg emojis in a row are more visual than just "x 5"
- Your row highlighted with soft gold so you find yourself instantly
- The Rotten Egg holder has a distinctive olive-green rotten egg icon next to their regular eggs
- Should feel like a quick glance at a beautifully formatted standings board
- Scrollable with max height to handle many players

---

## Screen 8: Scoreboard (Between Rounds)

### What it does
Full-screen scoreboard shown between rounds. Shows rankings and Rotten Egg holder.

### Current UI Text
- Title: **"THE PECKING ORDER"**
- Subtitle: **"Round {n} of {total}"**
- Scores: egg emojis 🥚 in a row (capped at 10, then "x{n}")
- Rotten Egg callout: **"{name} has the Rotten Egg!"** with RottenEgg icon

### Wireframe

```
+----------------------------------+
|                                  |
|     THE PECKING ORDER            |
|     Round 3 of 15                |
|                                  |
|  +----------------------------+  |
|  |  1. Ben    🥚🥚🥚🥚🥚      |  |
|  |  2. Sarah  🥚🥚🥚🥚       |  |
|  |  3. Mike   🥚🥚🥚         |  |
|  |  4. Tom    🥚🥚🥚         |  |
|  |  5. Jess   🥚🥚            |  |
|  |  6. Alex   🥚 [RottenEgg] |  |
|  +----------------------------+  |
|                                  |
|  [RottenEgg] Alex has the        |
|  Rotten Egg!                     |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the between-rounds scoreboard for "Flock Together" party game. Full-screen
view called "THE PECKING ORDER." Same midnight hearth style.

Background: warm linen white, clean and airy.

Include:
- "THE PECKING ORDER" title in large elegant serif, centered
- "Round 3 of 15" subtitle in clean sans-serif below
- Ranked list of 6 players in a cream rounded card with egg emojis representing
  their scores (rows of 🥚, capped at 10):
  1. Ben [5 eggs], 2. Sarah [4 eggs], 3. Mike [3 eggs], etc.
- Alex marked with a Rotten Egg icon next to their score
- Below the player list: "[RottenEgg icon] Alex has the Rotten Egg!" callout
  in muted olive text, centered
- Clean, readable, brief pause feel -- like a halftime moment by the hearth
```

### Key Design Notes
- This is a quick pause screen -- keep it clean, airy, and scannable
- Egg emoji rows make scores immediately visual
- The Rotten Egg callout with the icon is prominent but tasteful
- No action buttons on this screen -- it transitions automatically or via host action from the reveal

---

## Screen 9: Game Over

### What it does
The final screen. Celebrates the winner, shows final scores, offers "PLAY AGAIN" or "BACK TO HOME".

### Current UI Text
- Title: **"GAME OVER!"**
- Winner icon: **🏆🐔**
- Winner text: **"{name} RULES THE ROOST!"** / **"with {n} eggs"**
- Score list: same as between-rounds scoreboard
- Rotten Egg callout: **"{name} has the Rotten Egg!"**
- Primary button: **"PLAY AGAIN"**
- Secondary button: **"BACK TO HOME"**

### Wireframe

```
+----------------------------------+
|                                  |
|         GAME OVER!               |
|           🏆🐔                   |
|                                  |
|     BEN RULES THE ROOST!         |
|       with 8 eggs                |
|                                  |
|  +----------------------------+  |
|  |  1. Ben    🥚🥚🥚🥚🥚🥚🥚🥚 |  |
|  |  2. Sarah  🥚🥚🥚🥚🥚🥚    |  |
|  |  3. Mike   🥚🥚🥚🥚🥚      |  |
|  |  4. Tom    🥚🥚🥚🥚       |  |
|  |  5. Jess   🥚🥚🥚         |  |
|  |  6. Alex   🥚🥚 [Rotten]  |  |
|  +----------------------------+  |
|                                  |
|  [RottenEgg] Alex has the        |
|  Rotten Egg!                     |
|                                  |
|  +----------------------------+  |
|  |       PLAY AGAIN           |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |      BACK TO HOME          |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the game over / winner screen for "Flock Together" party game. This should
be the most CELEBRATORY screen in the whole game! Same midnight hearth style
but with extra warmth and festivity.

Think garden party celebration, harvest dinner, hearth-side winner moment.
Warm, golden, elegant -- not loud or garish.

Include:
- "GAME OVER!" in large elegant serif at top, centered
- Trophy and chicken emojis (🏆🐔) large and centered
- Winner announcement: "BEN RULES THE ROOST!" in large bold serif text with
  "with 8 eggs" subtitle in warm taupe below
- Ranked list of 6 players in a cream rounded card with egg emoji rows:
  each score displayed as 🥚 emojis in a row (capped at 10)
- Alex noted with a Rotten Egg icon next to their score, and
  "[RottenEgg icon] Alex has the Rotten Egg!" callout below the list
- Two buttons at bottom:
  "PLAY AGAIN" (primary sage green button -- confident, inviting)
  "BACK TO HOME" (secondary cream/white button with sage green border)
- Festive but elegant atmosphere -- delicate botanical confetti, gold accents,
  laurel wreath around the winner, maybe subtle floating leaves or petals
- This screen should feel warm and satisfying -- everyone wants to play again
```

### Key Design Notes
- This should be the most visually warm screen -- harvest dinner winner energy, not arcade
- "BEN RULES THE ROOST!" in elegant serif is charming and fun
- "PLAY AGAIN" is sage green (primary); "BACK TO HOME" is outlined/secondary
- The Rotten Egg callout is a playful last dig
- Botanical confetti or laurel accents give it an elevated celebration vibe
- The winner moment should feel like raising a glass, not ringing a bell

---

## Saving Your Designs

After generating each screen in Stitch:

1. Click **"Code"** in Stitch to see the HTML/Tailwind output
2. Copy the full HTML
3. Save it to the matching file in the project:

```
stitch-exports/
  home.html
  lobby-host.html
  lobby-player.html
  answering.html
  locked-in.html
  reveal.html
  leaderboard-modal.html
  scoreboard.html
  game-over.html
```

Then let Cursor know the design is ready -- it will convert the HTML to a React component and wire up the real game data.

---

## Quick Reference: Chicken Language Cheat Sheet

Use these in Stitch follow-up prompts to keep the theme consistent:

| Generic Term | Chicken Version |
|---|---|
| Leaderboard | The Pecking Order |
| Players | The Henhouse / The Flock |
| Score / Points | Eggs (🥚 emoji) |
| Majority group | The Flock Said |
| Outliers | Flown the Coop |
| No majority | No Flock! |
| Waiting for others | Waiting for the flock |
| Play again | Play Again |
| Go home | Back to Home |
| Lock in answer | Cluck In |
| After locking in | Clucked in |
| Timer expired | Time's Up! / Too slow! |
| Game over | Final Pecking Order |
| Winner | Rules the Roost |
| Skip question (host) | Skip question |
| Rotten Egg penalty | has the Rotten Egg! |
| Bonus categories | Bonus Categories (optional) |
| Custom questions | Submit a Question (optional) |
| Host waiting | Waiting for host to start... |
| Player waiting | Waiting for host to continue... |
| Reveal loading | Checking all answers... / The flock is being counted |
