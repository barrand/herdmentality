# Flock Together -- Design Guide for Google Stitch

This document contains everything you need to generate the UI designs in Google Stitch and bring them back into the codebase. Work through the screens in order.

---

## Setup

1. Go to [stitch.withgoogle.com](https://stitch.withgoogle.com)
2. Sign in with your Google account
3. Switch to **Experimental mode** (top of page) -- this uses Gemini 2.5 Pro and lets you upload reference images
4. Click the **mobile tab** before generating -- this is a phone-first game

## How to Work Through This

1. **Start with Screen 1 (Home)** -- this establishes the chicken-coop color palette, typography, and visual identity
2. Paste the prompt, generate, and iterate in Stitch's chat until you love it
3. Once happy, click **"Code"** and copy the HTML/Tailwind output
4. Save it to `stitch-exports/home.html` in the project (create the file, paste the HTML)
5. Move to Screen 2, and add to your prompt: *"Use the same chicken-coop style, colors, and typography as my previous Flock Together home screen design."*
6. Repeat for all 9 screens

**Iteration tips:**
- Follow-up prompts in Stitch chat: "more coop texture", "warmer wood tones", "make the chicken bigger", "add feather decoration"
- If you find a chicken-themed game or app you like visually, paste its URL into Stitch and say "use this style"
- You get 50 experimental generations per month -- plenty for iteration
- Upload reference images of chicken illustrations, henhouse interiors, or egg artwork for extra inspiration

---

## Chicken Theme Bible

Every screen should feel like you've stepped into a **fun, illustrated chicken coop world**. This isn't a realistic farming sim -- it's a playful, cartoonish, party-game take on the henhouse. Think Stardew Valley meets Jackbox Games, but in a chicken coop.

### Color Palette
- **Primary yellow-gold:** Warm sunshine yellow (#FFD54F range) for buttons, accents, and highlights -- like egg yolks and golden straw
- **Warm cream/egg-shell:** (#FFF8E7 range) for cards and content areas -- like a fresh eggshell
- **Barn red:** (#C62828 range) as a secondary accent -- for the coop walls, headers, alerts
- **Warm wood brown:** (#8D6E63 range) for borders, frames, and coop textures
- **Sky blue:** (#87CEEB range) for backgrounds and gradients
- **Grass green:** (#4CAF50 range) for success states, confirm buttons, and pasture accents
- **Sickly green:** Distinctive yellow-green for everything related to the Rotten Egg

### Typography
- **Headlines:** Chunky, rounded, playful serif or slab-serif (think Fredoka, Boogaloo, or Lilita One) -- feels like a painted coop sign
- **Body text:** Friendly rounded sans-serif (Nunito, Baloo 2, Quicksand)
- **Numbers (scores, timers):** Bold, oversized, easy to read at a glance

### Textures and Patterns
- **Wood grain:** Subtle wood texture on headers, cards, or borders (henhouse walls)
- **Chicken wire:** Used as decorative borders, card backgrounds, or section dividers
- **Straw/hay:** Bottom edges of screens, decorative accents, subtle background pattern
- **Feathers:** Floating feathers as decoration, transitions, and celebratory confetti
- **Eggshell:** Crackled eggshell texture used sparingly for personality (borders, badges, card backgrounds)

### Chicken UI Elements
- **Buttons:** Rounded, slightly 3D, wooden-sign or coop-door inspired. Primary buttons are warm gold/green. Big and satisfying to tap.
- **Cards:** Cream/egg-shell with subtle wood-frame borders. Question cards could feel like a henhouse notice board or a wooden sign hanging on the coop wall.
- **Inputs:** Warm, rounded, with wood or cream backgrounds. Not cold/corporate.
- **Timer:** An egg timer (hourglass with sand) that empties as time runs down. Or an egg with a cracking shell. Classic and instantly recognizable.
- **Egg score icons:** Small illustrated egg icons in a row (not just "x 5" text). Eggs sitting in little nests or baskets.
- **Rotten Egg:** A big, funny, distinctive illustrated rotten egg character. Cracked shell, sickly green color, stink lines, little flies buzzing around. Gross but hilarious. She's the villain of the game!
- **Player avatars:** Chicken leg-band icons, different colored feathers, or numbered egg icons.
- **Loading/waiting states:** A chicken pecking at the ground, a chick hatching from an egg, or feathers floating down.
- **Backgrounds:** Soft sky-to-grass gradients, or coop-interior wood textures depending on the screen.

### Chicken Vocabulary in the UI
- Points are represented by **egg icons** (you're collecting eggs for your basket)
- The lobby feels like a **henhouse** where players gather before the game starts
- The question card is a **coop notice board** or hanging sign
- The reveal is the **flock check** -- seeing who stayed with the flock
- Outliers have **flown the coop** -- they wandered off from the group
- The scoreboard is **the pecking order**

---

## Screen 1: Home

### What it does
The landing page. Players enter their name, then either create a new game or join an existing one with a word-based room code. This screen establishes the entire visual world.

### Wireframe

```
+----------------------------------+
|          [sky gradient]          |
|                                  |
|         FLOCK TOGETHER           |
|     [big illustrated chicken]   |
|                                  |
|   +----------------------------+ |
|   |  Your Name                 | |
|   +----------------------------+ |
|                                  |
|   +----------------------------+ |
|   |       CREATE GAME          | |
|   +----------------------------+ |
|                                  |
|      ----[chicken wire]----      |
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
Design a mobile party game home screen for "Flock Together" -- a fun multiplayer
party game with a charming CHICKEN COOP THEME. The whole UI should feel like a
playful, illustrated chicken world -- think Stardew Valley meets Jackbox Games,
but in a henhouse.

Visual style:
- Background: soft sky-blue gradient, with illustrated grass and scattered straw
  at the bottom of the screen
- Colors: sunshine yellows, warm egg-shell cream, barn red accents, wood browns,
  golden straw highlights, grass greens
- Typography: chunky, playful, rounded fonts that look like painted coop signs
- Textures: subtle wood grain on borders, chicken-wire dividers

Include:
- "FLOCK TOGETHER" title in big, playful, coop-sign style lettering at the top
- A large, cute, cartoon chicken mascot/illustration below the title (expressive,
  funny, not realistic -- party game energy, maybe wearing a little party hat)
- A text input for "Your Name" with warm, rounded styling (cream background, wood border)
- A large "CREATE GAME" button -- golden-yellow or green, rounded, wooden-sign feel,
  satisfying to tap
- A chicken-wire or straw-bale divider with "or" in the middle (not a plain line!)
- A text input for "Room code (e.g. MANGO)"
- A "JOIN GAME" button (secondary, less prominent than Create)
- Illustrated grass or scattered straw along the bottom edge
- All buttons and inputs must be large and thumb-friendly (44px+ touch targets)
- The overall vibe: warm, fun, inviting -- like opening a board game box on game night
```

### Key Design Notes
- This screen sets the visual world for the entire game -- spend extra time here
- The chicken mascot is the hero of the screen -- make it big, fun, and memorable
- The chicken-wire divider instead of a plain "or" line establishes the coop vocabulary
- Name input should feel welcoming, like writing your name on the coop guest book
- Room code placeholder "e.g. MANGO" hints that codes are words
- CREATE GAME is the primary action (bigger, bolder); JOIN GAME is secondary
- The grass/straw at the bottom ground the screen in the chicken world

---

## Screen 2: Lobby (Host View)

### What it does
The host waits here while players join. They can configure settings, add bonus categories for AI question generation, submit custom questions, and start the game. This feels like gathering everyone in the henhouse before the game starts.

### Wireframe

```
+----------------------------------+
|  [coop-wood header]              |
|  FLOCK TOGETHER     Room: MANGO |
|                     [share icon] |
|----------------------------------|
|                                  |
|  THE HENHOUSE - Players (4)     |
|  +----------------------------+  |
|  | [leg-band] Ben (host)     |  |
|  | [leg-band] Sarah          |  |
|  | [leg-band] Mike           |  |
|  | [leg-band] Jess           |  |
|  |   ...waiting for others   |  |
|  +----------------------------+  |
|                                  |
|  SETTINGS                        |
|  Rounds:  [ - ] 15 [ + ]        |
|  Timer:   [ - ] 45s [ + ]       |
|                                  |
|  [chicken wire divider]          |
|                                  |
|  BONUS CATEGORIES (optional)     |
|  +----------------------------+  |
|  | [Disney x] [Utah x] [+ ]  |  |
|  +----------------------------+  |
|  Adds themed questions on top    |
|  of the general question pool    |
|                                  |
|  SUBMIT A QUESTION (optional)    |
|  +----------------------------+  |
|  | Type a question...     [+] |  |
|  +----------------------------+  |
|  "What's the best ice cream?"   |
|  "Name a famous Utah landmark"   |
|                                  |
|  +----------------------------+  |
|  | [coop door] START GAME    |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the lobby screen for a mobile party game called "Flock Together" with
a playful CHICKEN COOP THEME. This is the HOST's view while waiting for players
to join. It should feel like gathering everyone in a cozy henhouse before the
game starts.

Same chicken-coop visual style as the home screen: sunshine yellows, egg-shell
cream, wood browns, barn red accents, subtle wood-grain textures, playful
rounded fonts.

Include:
- A coop-wood textured header with "FLOCK TOGETHER" and the room code "MANGO"
  displayed large and prominently with a share/copy icon next to it
- Player list titled "THE HENHOUSE" showing 4 players with small chicken leg-band
  or feather icons as avatars: "Ben (host)", "Sarah", "Mike", "Jess", and a
  "waiting for others..." placeholder with a subtle animation (chicken pecking?)
- Settings section with coop-styled -/+ steppers: "Rounds: 15", "Timer: 45s"
- A chicken-wire divider between sections
- "BONUS CATEGORIES (optional)" with tag/chip inputs showing [Disney] [Utah]
  as egg-carton or nest-box styled chips with X buttons, plus a + button.
  Helper text: "Adds themed questions on top of the general pool"
- "SUBMIT A QUESTION (optional)" with a text input and + button, 2 submitted
  questions shown below in a notice-board style
- A large "START GAME" button at the bottom -- should feel like opening the coop
  door at dawn. Golden-yellow or green, bold, exciting. Show disabled state
  "Need 3+ players" when not enough.
- Scrollable, everything fits vertically on a phone
```

### Key Design Notes
- Room code "MANGO" should be BIG -- people need to read it aloud across the room
- Player list should feel like a henhouse roll call -- leg-bands or feather icons as avatars
- Category chips with egg-carton or nest-box styling stay on-theme
- "START GAME" should feel like opening the coop door at dawn -- the moment of launch
- Chicken-wire dividers between sections instead of plain lines
- The copy/share icon is important -- people will text the room code to friends

---

## Screen 3: Lobby (Player View)

### What it does
What non-host players see while waiting. Simplified version of the host lobby -- they can see who's joined and submit questions, but can't change settings or start the game.

### Wireframe

```
+----------------------------------+
|  [coop-wood header]              |
|  FLOCK TOGETHER     Room: MANGO |
|----------------------------------|
|                                  |
|  THE HENHOUSE - Players (4)     |
|  +----------------------------+  |
|  | [leg-band] Ben (host)     |  |
|  | [leg-band] Sarah  <-- you |  |
|  | [leg-band] Mike           |  |
|  | [leg-band] Jess           |  |
|  +----------------------------+  |
|                                  |
|  BONUS CATEGORIES                |
|  [Disney] [Utah]                 |
|                                  |
|  SUBMIT A QUESTION (optional)    |
|  +----------------------------+  |
|  | Type a question...     [+] |  |
|  +----------------------------+  |
|                                  |
|  [chicken pecking animation]     |
|  Waiting for host to start...    |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the lobby screen for a non-host PLAYER in "Flock Together" chicken-themed
party game. Same chicken-coop style as the host lobby but simplified and calmer.

Same visual style: coop-wood header, sunshine yellows, egg-shell cream cards,
wood textures, playful fonts.

Include:
- Same coop-wood header with room code "MANGO"
- Player list titled "THE HENHOUSE" (read-only) with leg-band avatars, a "you"
  indicator highlighting your name
- "BONUS CATEGORIES" shown as read-only coop-styled chips (no edit/delete buttons)
- "SUBMIT A QUESTION (optional)" input -- players CAN submit questions
- "Waiting for host to start..." message at the bottom with a charming chicken
  animation -- maybe a chicken slowly pecking at the ground, or a chick hatching
- No settings section, no start button (those are host-only)
- Calm, patient feel -- you're hanging out in the henhouse waiting
```

### Key Design Notes
- "Waiting for host to start..." should feel patient, not boring -- the chicken animation helps
- Make it very clear which player is "you" (highlighted row, star, or accent)
- Categories are read-only (no X buttons on chips)
- Calmer energy than the host view since you're just waiting

---

## Screen 4: Answering Phase

### What it does
The core gameplay screen. A question is displayed with a countdown timer. Players type their answer and tap "CLUCK IN". The host also sees a subtle "Skip Question" button.

### Wireframe (Player)

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  [egg] x 2            [POrder]  |
|----------------------------------|
|                                  |
|           0:32                   |
|      [egg timer graphic]        |
|                                  |
|  +----------------------------+  |
|  | [coop notice board / sign] |  |
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
|  |     CLUCK IN [chicken]    |  |
|  +----------------------------+  |
|                                  |
|  4 of 6 players answered         |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the answering screen for "Flock Together" mobile chicken-themed party game.
This is the core gameplay moment -- a question appears and players race to answer.

Same chicken-coop visual style. Sky-blue or egg-shell gradient background.

Include:
- Compact coop-wood header: "Round 3 of 15" on left, room code "MANGO" on right
- Status bar below header: small egg icons showing your score (2 eggs) on the left,
  a "Pecking Order" button styled as a small coop-sign on the right
- A prominent countdown timer showing "0:32" -- style it as a classic egg timer
  (hourglass shape with sand draining). Should feel urgent!
- Large question card in the center styled as a coop notice board, wooden sign,
  or chalkboard hanging in the henhouse: "What is the best Disney villain of all time?"
  The question should be the visual focus -- elevated, prominent, easy to read
- Text input below with cream/wood styling: "Your answer..."
- A big golden-yellow or green "CLUCK IN" button -- bold, satisfying, maybe with
  a chicken icon or feather accent
- Small text at bottom: "4 of 6 players answered"
- Subtle grass/straw decoration at the bottom edge
- The energy should feel focused and slightly urgent -- the egg timer is running out!
```

### Key Design Notes
- The egg timer is the key themed opportunity -- an actual hourglass/egg-timer shape is classic and on-theme
- Question card as a coop notice board or wooden sign feels like a henhouse posting
- "CLUCK IN" should feel decisive and fun -- a satisfying commitment
- The egg score icons in the status bar are small but always visible
- For the **host variant**: add a subtle "SKIP TO NEXT NEST" text link below the "4 of 6" text
- If you **hold the Rotten Egg**, the status bar shows a sickly green egg icon alongside your regular eggs -- unmissable

---

## Screen 5: Answer Locked In (Waiting)

### What it does
After clucking in, the player sees their confirmed answer and waits for others. Shows who has answered vs. who hasn't.

### Wireframe

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  [egg] x 2            [POrder]  |
|----------------------------------|
|                                  |
|           0:18                   |
|      [egg timer graphic]        |
|                                  |
|  +----------------------------+  |
|  |  What is the best Disney   |  |
|  |  villain of all time?      |  |
|  +----------------------------+  |
|                                  |
|     [nested/stamped look]        |
|       You answered:              |
|         "Scar"  [checkmark]      |
|                                  |
|  Waiting for the flock...        |
|                                  |
|   Ben      [egg check]          |
|   Sarah    [egg check]          |
|   Mike     [egg check]          |
|   Jess     [pecking dots]       |
|   Tom      [pecking dots]       |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the "waiting for others" screen after clucking in an answer in
"Flock Together" chicken-themed party game. Same chicken-coop visual style.

Include:
- Same coop-wood header with round info, egg score icons, pecking order button
- Timer still counting down (egg timer still draining): "0:18"
- Question card (same coop-notice-board style as the answering screen)
- Your locked-in answer shown with a stamped or nested-egg style:
  "Scar" with a green checkmark. Should feel confirmed and sealed -- like
  an egg safely tucked into the nest, no taking it back
- "Waiting for the flock..." text (chicken language!)
- Player status list showing who has answered and who hasn't:
  Ben [egg/check], Sarah [egg/check], Mike [egg/check],
  Jess [chicken pecking dots...], Tom [chicken pecking dots...]
- Calmer, more relaxed feel than the answering screen -- you're done, just
  watching the henhouse, waiting for the slowpokes
```

### Key Design Notes
- Mood shifts from urgent to calm -- the egg timer is still draining but you're relaxed
- Your answer should feel "nested" or "stamped" -- safely laid, no going back
- "Waiting for the flock..." is better chicken language than "Waiting for others..."
- Answered players get an egg-check; unanswered players have a gentle pecking animation
- Still builds anticipation ("come on Jess, the sand is running out!")

---

## Screen 6: Reveal Phase

### What it does
The most exciting screen! Answers are revealed, grouped by fuzzy matching, and scores are awarded. Shows who was in the flock, who flew the coop, and who got the Rotten Egg.

### Wireframe

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  [egg] x 3 (+1)      [POrder]  |
|----------------------------------|
|                                  |
|  What is the best Disney         |
|  villain of all time?            |
|                                  |
|  THE FLOCK:                      |
|  +----------------------------+  |
|  | [warm golden card]         |  |
|  |    "Scar"  [egg icon]      |  |
|  |                            |  |
|  |  Ben: "Scar"               |  |
|  |  Sarah: "Scar"             |  |
|  |  Mike: "scar"              |  |
|  |  Tom: "Scar from LK"      |  |
|  +----------------------------+  |
|                                  |
|  FLOWN THE COOP:                 |
|  +----------------------------+  |
|  |  Jess: "Ursula"            |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |  Alex: "Maleficent"        |  |
|  |       [ROTTEN EGG!]        |  |
|  +----------------------------+  |
|                                  |
|  Strutting to next round in 8s.. |
|  +----------------------------+  |
|  |     NEXT ROUND (host)      |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the answer reveal screen for "Flock Together" chicken-themed party game.
This is the MOST EXCITING MOMENT -- the flock check! Answers are revealed and the
flock is counted. Same chicken-coop visual style but with extra energy and celebration.

Include:
- Coop-wood header with round info, egg score showing "+1" gain, pecking order button
- Question repeated at top in coop-sign style
- "THE FLOCK:" section -- a warm golden/cream card showing the winning answer
  "Scar" with an egg icon. Below, list each player who matched with their exact
  wording: Ben: "Scar", Sarah: "Scar", Mike: "scar", Tom: "Scar from LK"
  (showing exact wording demonstrates the fuzzy matching -- different words, same flock!)
  This section should feel CELEBRATORY -- warm, golden, winning
- "FLOWN THE COOP:" section below with smaller, more muted cards for the outliers:
  - Jess: "Ursula" (neutral, not punishing -- she just flew the coop)
  - Alex: "Maleficent" with a big, funny, distinctive ROTTEN EGG icon/badge --
    this player got the Rotten Egg! Make the rotten egg character look gross but
    hilarious -- cracked shell, sickly green, stink lines, little flies.
    The rotten egg should be visually memorable and a bit funny.
- Auto-advance text: "Strutting to next round in 8s..." (chicken language!)
- "NEXT ROUND" button for the host to advance early
- The flock section should feel like coming home to roost -- warm, celebratory
- The flown-the-coop section should feel playful, NOT shameful -- they just wandered off!
- Subtle straw/grass background, maybe with illustrated chickens in the distance
```

### Key Design Notes
- This is the emotional peak of every round -- pump up the celebration!
- "THE FLOCK" vs "FLOWN THE COOP" is fun chicken language
- The warm golden card for the flock should feel rewarding
- Each player's exact wording shown side by side is key for fuzzy matching transparency
- The Rotten Egg character needs PERSONALITY -- gross, stinky, funny. It's the game's villain!
- "Strutting to next round in 8s..." is more fun than "Auto-advancing in 8s..."
- Status bar immediately shows "+1" so you see you gained an egg

---

## Screen 7: Leaderboard Modal

### What it does
A bottom sheet overlay accessible from any gameplay screen. Shows the full ranked player list. Doesn't interrupt gameplay.

### Wireframe

```
+----------------------------------+
|  (dimmed coop screen behind)     |
|                                  |
|  +----------------------------+  |
|  | [coop-wood frame]          |  |
|  |   PECKING ORDER      [X]  |  |
|  |                            |  |
|  |  1. Ben    [egg egg egg    |  |
|  |             egg egg]       |  |
|  |  2. Sarah  [egg egg egg]<- |  |
|  |  3. Mike   [egg egg egg]   |  |
|  |  4. Tom    [egg egg]       |  |
|  |  5. Jess   [egg]           |  |
|  |  6. Alex   [egg] [ROTTEN!]|  |
|  |                            |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design a bottom sheet / modal overlay for the leaderboard in "Flock Together"
chicken-themed party game. It's called "THE PECKING ORDER." It overlays on top of
the gameplay screen with a darkened background.

Same chicken-coop visual style: wood-frame border, egg-shell cream background,
playful fonts.

Include:
- "THE PECKING ORDER" title in coop-sign style lettering with an X close button
- Ranked list of 6 players where scores are shown as ROWS OF SMALL EGG ICONS
  (not just numbers). Each egg is a tiny illustrated egg. More eggs = bigger score:
  1. Ben [5 egg icons in a row]
  2. Sarah [3 egg icons] <-- highlighted as "you" with a golden accent
  3. Mike [3 egg icons]
  4. Tom [2 egg icons]
  5. Jess [1 egg icon]
  6. Alex [1 egg icon] + a distinctive rotten egg icon (holds the Rotten Egg)
- Clean, easy to scan at a glance
- Bottom sheet style that slides up from the bottom (natural mobile gesture)
- Coop-wood frame around the whole modal
```

### Key Design Notes
- "THE PECKING ORDER" is a real chicken term AND means ranking -- perfect leaderboard name
- Showing actual egg icons in a row (not just "x 5") is more visual and more on-theme
- Your row highlighted with a golden accent so you find yourself instantly
- The Rotten Egg holder has a distinctive sickly-green rotten egg next to their regular eggs
- Should feel like peeking at the scoreboard in the coop -- quick glance, then back to the game

---

## Screen 8: Scoreboard (Between Rounds)

### What it does
Full-screen scoreboard shown between rounds. Auto-advances after ~10 seconds.

### Wireframe

```
+----------------------------------+
|  [coop interior background]      |
|  THE PECKING ORDER       MANGO   |
|----------------------------------|
|                                  |
|  1.  Ben      [egg egg egg      |
|                egg egg]          |
|  2.  Sarah    [egg egg egg egg] |
|  3.  Mike     [egg egg egg]     |
|  4.  Tom      [egg egg egg]     |
|  5.  Jess     [egg egg]         |
|  6.  Alex     [egg]             |
|      [rotten egg] Alex has       |
|      the Rotten Egg!             |
|                                  |
|  Round 3 of 15 complete          |
|                                  |
|  Strutting along in 8s...        |
|  +----------------------------+  |
|  |  NEXT ROUND (host)         |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the between-rounds scoreboard for "Flock Together" chicken-themed party game.
Full-screen view called "THE PECKING ORDER." Same chicken-coop style.

Background: coop interior feel -- warm wood tones, maybe a subtle henhouse-wall
texture with straw accents.

Include:
- "THE PECKING ORDER" title in coop-sign lettering with room code "MANGO"
- Ranked list of 6 players with egg icons representing their scores (tiny egg
  illustrations in a row, not just numbers):
  1. Ben [5 eggs], 2. Sarah [4 eggs], 3. Mike [3 eggs], etc.
- Alex marked with a big funny rotten egg icon and "Alex has the Rotten Egg!" text.
  The rotten egg character should look gross but hilarious -- cracked, green, stinky.
- "Round 3 of 15 complete" text
- Auto-advance countdown: "Strutting along in 8s..."
- Green "NEXT ROUND" button for the host
- Brief pause feel -- like perching on a roost between rounds, catching your breath
```

### Key Design Notes
- Coop interior background gives it a cozy "between the action" feel
- Egg icon rows make the scores immediately visual and scannable
- The Rotten Egg callout should be prominent and funny -- it's a key game moment
- "Strutting along in 8s..." keeps the chicken language consistent

---

## Screen 9: Game Over

### What it does
The final screen. Celebrates the winner, shows final scores, offers "Another Clutch" or "Back to the Coop".

### Wireframe

```
+----------------------------------+
|                                  |
|      GAME OVER!                  |
|                                  |
|   [big trophy chicken / winner  |
|    chicken wearing a crown]      |
|                                  |
|     BEN RULES THE ROOST!         |
|       with 8 eggs                |
|                                  |
|  FINAL PECKING ORDER             |
|  1.  Ben       [8 egg icons]    |
|  2.  Sarah     [6 egg icons]    |
|  3.  Mike      [5 egg icons]    |
|  4.  Tom       [4 egg icons]    |
|  5.  Jess      [3 egg icons]    |
|  6.  Alex      [2 egg icons]    |
|      [rotten egg] stuck with     |
|      the Rotten Egg!             |
|                                  |
|  +----------------------------+  |
|  |     ANOTHER CLUTCH         |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |     BACK TO THE COOP       |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the game over / winner screen for "Flock Together" chicken-themed party game.
This should be the most CELEBRATORY and FUN screen in the whole game!

Same chicken-coop visual style but extra festive -- think county fair, egg festival,
chicken parade celebration.

Include:
- Big "GAME OVER!" text at top in golden-yellow or barn-red, festive lettering
- A large illustrated winner chicken wearing a golden crown or blue ribbon (county fair
  winner vibes!) -- this should be big, funny, and celebratory
- Winner announcement: "BEN RULES THE ROOST!" with "with 8 eggs" subtitle
- "FINAL PECKING ORDER" section showing all 6 players ranked with egg icon rows:
  each score displayed as tiny egg illustrations in a row
- Alex noted as "stuck with the Rotten Egg!" with the gross/funny rotten egg
  character -- a playful callout, not punishing
- Two buttons at bottom:
  "ANOTHER CLUTCH" (primary golden/green button -- play again)
  "BACK TO THE COOP" (secondary, less prominent -- go home)
- Festive atmosphere -- feather confetti, bunting, county-fair ribbons,
  maybe illustrated streamers or floating feathers
- This screen should make everyone laugh and want to play again immediately!
```

### Key Design Notes
- This should be the MOST visually exciting screen -- county fair champion energy!
- The crowned chicken is the hero moment -- big and funny
- "BEN RULES THE ROOST!" is more fun than "BEN WINS!"
- "FINAL PECKING ORDER" is better than "FINAL SCORES"
- "ANOTHER CLUTCH" and "BACK TO THE COOP" keep the language on-theme
- "stuck with the Rotten Egg!" is a funny last dig -- the rotten egg looks even grosser here
- Feather confetti or bunting decorations give it a celebration vibe

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
| Score / Points | Eggs (egg icons) |
| Outliers | Flown the Coop |
| Waiting for others | Waiting for the flock |
| Next round | Strutting to next round |
| Play again | Another Clutch |
| Go home | Back to the Coop |
| Lock in answer | Cluck In |
| Timer | Egg Timer |
| Game over | Final Pecking Order |
| Winner | Rules the Roost |
| Skip question | Skip to next nest |
| Rotten Egg penalty | Stuck with the Rotten Egg |
