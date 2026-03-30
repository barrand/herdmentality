# Herd Mentality -- Design Guide for Google Stitch

This document contains everything you need to generate the UI designs in Google Stitch and bring them back into the codebase. Work through the screens in order.

---

## Setup

1. Go to [stitch.withgoogle.com](https://stitch.withgoogle.com)
2. Sign in with your Google account
3. Switch to **Experimental mode** (top of page) -- this uses Gemini 2.5 Pro and lets you upload reference images
4. Click the **mobile tab** before generating -- this is a phone-first game

## How to Work Through This

1. **Start with Screen 1 (Home)** -- this establishes the farm color palette, typography, and visual identity
2. Paste the prompt, generate, and iterate in Stitch's chat until you love it
3. Once happy, click **"Code"** and copy the HTML/Tailwind output
4. Save it to `stitch-exports/home.html` in the project (create the file, paste the HTML)
5. Move to Screen 2, and add to your prompt: *"Use the same farm style, colors, and typography as my previous Herd Mentality home screen design."*
6. Repeat for all 9 screens

**Iteration tips:**
- Follow-up prompts in Stitch chat: "more barn texture", "warmer wood tones", "make the cow bigger", "add hay bale decoration"
- If you find a farm-themed game or app you like visually, paste its URL into Stitch and say "use this style"
- You get 50 experimental generations per month -- plenty for iteration
- Upload reference images of farm illustrations, barn interiors, or cow artwork for extra inspiration

---

## Farm Theme Bible

Every screen should feel like you've stepped into a **fun, illustrated farm world**. This isn't a realistic farm sim -- it's a playful, cartoonish, party-game take on farm life. Think Stardew Valley meets Jackbox Games.

### Color Palette
- **Primary green:** Rich pasture green (#4CAF50 range) for buttons, accents, and backgrounds
- **Warm cream/off-white:** (#FFF8E7 range) for cards and content areas -- like fresh milk or parchment
- **Barn red:** (#C62828 range) as a secondary accent -- for headers, alerts, or emphasis
- **Warm wood brown:** (#8D6E63 range) for borders, frames, and textures
- **Sky blue:** (#87CEEB range) for backgrounds and gradients
- **Hay gold/yellow:** (#FFD54F range) for highlights, badges, and star moments
- **Pink:** Bright, distinctive pink for everything related to the Pink Cow

### Typography
- **Headlines:** Chunky, rounded, playful serif or slab-serif (think Fredoka, Boogaloo, or Lilita One) -- feels like a painted barn sign
- **Body text:** Friendly rounded sans-serif (Nunito, Baloo 2, Quicksand)
- **Numbers (scores, timers):** Bold, oversized, easy to read at a glance

### Textures and Patterns
- **Wood grain:** Subtle wood texture on headers, cards, or borders (barn wood feel)
- **Grass/pasture:** Bottom edges of screens can have illustrated grass or rolling green hills
- **Fence rails:** Used as dividers between sections
- **Hay/straw:** Decorative accents, subtle background pattern
- **Cow spots:** Black-and-white cow spot pattern used sparingly for personality (borders, badges, backgrounds)

### Farm UI Elements
- **Buttons:** Rounded, slightly 3D, wood-sign or barn-door inspired. Primary buttons are green. Big and satisfying to tap.
- **Cards:** Cream/off-white with subtle wood-frame borders. Question cards could feel like a hanging barn chalkboard or a wooden sign.
- **Inputs:** Warm, rounded, with wood or cream backgrounds. Not cold/corporate.
- **Timer:** A milk pail or bucket that empties as time runs down. Or a sun moving across the sky. Or a classic timer with farm decoration.
- **Cow score icons:** Small illustrated cow icons in a row (not just "x 5" text). Cows grazing in your "pasture."
- **Pink Cow:** A big, funny, distinctive illustrated pink cow character. She should have personality -- maybe she looks mischievous or grumpy. She's the villain of the game!
- **Player avatars:** Cow-bell icons, different colored cow spots, or numbered cow ear-tags.
- **Loading/waiting states:** A cow chewing grass, a chicken wandering, or a tumbleweed rolling.
- **Backgrounds:** Soft sky-to-pasture gradients, or barn-interior wood textures depending on the screen.

### Farm Vocabulary in the UI
- Points are represented by **cow icons** (you're collecting cows for your herd)
- The lobby feels like a **barn** where players gather before heading out
- The question card is a **barn notice board** or hanging sign
- The reveal is the **roundup** -- seeing which cows came to which pasture
- Outliers are the **strays** who wandered off from the herd
- The scoreboard is the **ranch ledger**

---

## Screen 1: Home

### What it does
The landing page. Players enter their name, then either create a new game or join an existing one with a word-based room code. This screen establishes the entire visual world.

### Wireframe

```
+----------------------------------+
|          [sky gradient]          |
|                                  |
|         HERD MENTALITY           |
|      [big illustrated cow]      |
|                                  |
|   +----------------------------+ |
|   |  Your Name                 | |
|   +----------------------------+ |
|                                  |
|   +----------------------------+ |
|   |       CREATE GAME          | |
|   +----------------------------+ |
|                                  |
|       ----[fence rail]----       |
|                                  |
|   +----------------------------+ |
|   |  Room code (e.g. MANGO)   | |
|   +----------------------------+ |
|   +----------------------------+ |
|   |        JOIN GAME           | |
|   +----------------------------+ |
|                                  |
|    [illustrated grass / hills]   |
+----------------------------------+
```

### Stitch Prompt (copy and paste this)

```
Design a mobile party game home screen for "Herd Mentality" -- a fun multiplayer
party game with a charming FARM THEME. The whole UI should feel like a playful,
illustrated farm world -- think Stardew Valley meets Jackbox Games.

Visual style:
- Background: soft sky-blue to pasture-green gradient, with illustrated rolling
  green hills or grass at the bottom of the screen
- Colors: pasture greens, warm cream/off-white, barn red accents, wood browns,
  hay gold highlights
- Typography: chunky, playful, rounded fonts that look like painted barn signs
- Textures: subtle wood grain on borders, farm-fence dividers

Include:
- "HERD MENTALITY" title in big, playful, barn-sign style lettering at the top
- A large, cute, cartoon cow mascot/illustration below the title (friendly, funny,
  not realistic -- party game energy)
- A text input for "Your Name" with warm, rounded styling (cream background, wood border)
- A large "CREATE GAME" button -- green, rounded, wooden-sign feel, satisfying to tap
- A fence-rail or hay-bale divider with "or" in the middle (not a plain line!)
- A text input for "Room code (e.g. MANGO)"
- A "JOIN GAME" button (secondary, less prominent than Create)
- Illustrated grass or rolling green pasture hills along the bottom edge
- All buttons and inputs must be large and thumb-friendly (44px+ touch targets)
- The overall vibe: warm, fun, inviting -- like opening a board game box on game night
```

### Key Design Notes
- This screen sets the visual world for the entire game -- spend extra time here
- The cow mascot is the hero of the screen -- make it big, fun, and memorable
- The fence-rail divider instead of a plain "or" line establishes the farm vocabulary
- Name input should feel welcoming, like writing your name on a barn guest book
- Room code placeholder "e.g. MANGO" hints that codes are words
- CREATE GAME is the primary action (bigger, bolder); JOIN GAME is secondary
- The grass/hills at the bottom ground the screen in the farm world

---

## Screen 2: Lobby (Host View)

### What it does
The host waits here while players join. They can configure settings, add bonus categories for AI question generation, submit custom questions, and start the game. This feels like gathering everyone in the barn before heading out.

### Wireframe

```
+----------------------------------+
|  [barn-wood header]              |
|  HERD MENTALITY     Room: MANGO |
|                     [share icon] |
|----------------------------------|
|                                  |
|  THE BARN - Players (4)         |
|  +----------------------------+  |
|  | [cow-tag] Ben (host)       |  |
|  | [cow-tag] Sarah            |  |
|  | [cow-tag] Mike             |  |
|  | [cow-tag] Jess             |  |
|  |   ...waiting for others    |  |
|  +----------------------------+  |
|                                  |
|  SETTINGS                        |
|  Rounds:  [ - ] 15 [ + ]        |
|  Timer:   [ - ] 45s [ + ]       |
|                                  |
|  [fence divider]                 |
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
|  | [barn door] START GAME     |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the lobby screen for a mobile party game called "Herd Mentality" with
a playful FARM THEME. This is the HOST's view while waiting for players to join.
It should feel like gathering everyone in a cozy barn before the game starts.

Same farm visual style as the home screen: pasture greens, cream/off-white,
wood browns, barn red accents, subtle wood-grain textures, playful rounded fonts.

Include:
- A barn-wood textured header with "HERD MENTALITY" and the room code "MANGO"
  displayed large and prominently with a share/copy icon next to it
- Player list titled "THE BARN" showing 4 players with small cow-tag or cow-bell
  icons as avatars: "Ben (host)", "Sarah", "Mike", "Jess", and a
  "waiting for others..." placeholder with a subtle animation (cow chewing?)
- Settings section with farm-styled -/+ steppers: "Rounds: 15", "Timer: 45s"
- A fence-rail divider between sections
- "BONUS CATEGORIES (optional)" with tag/chip inputs showing [Disney] [Utah]
  as hay-bale or barn-sign styled chips with X buttons, plus a + button.
  Helper text: "Adds themed questions on top of the general pool"
- "SUBMIT A QUESTION (optional)" with a text input and + button, 2 submitted
  questions shown below in a notice-board style
- A large "START GAME" button at the bottom -- should feel like opening the barn
  doors. Green, bold, exciting. Show disabled state "Need 3+ players" when not enough.
- Scrollable, everything fits vertically on a phone
```

### Key Design Notes
- Room code "MANGO" should be BIG -- people need to read it aloud across the room
- Player list should feel like a barn roll call -- cow-tags or cow-bells as avatars
- Category chips with the hay-bale or wooden-sign styling stay on-theme
- "START GAME" should feel like opening the barn doors -- the moment of launch
- Fence-rail dividers between sections instead of plain lines
- The copy/share icon is important -- people will text the room code to friends

---

## Screen 3: Lobby (Player View)

### What it does
What non-host players see while waiting. Simplified version of the host lobby -- they can see who's joined and submit questions, but can't change settings or start the game.

### Wireframe

```
+----------------------------------+
|  [barn-wood header]              |
|  HERD MENTALITY     Room: MANGO |
|----------------------------------|
|                                  |
|  THE BARN - Players (4)         |
|  +----------------------------+  |
|  | [cow-tag] Ben (host)       |  |
|  | [cow-tag] Sarah  <-- you   |  |
|  | [cow-tag] Mike             |  |
|  | [cow-tag] Jess             |  |
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
|  [cow chewing animation]         |
|  Waiting for host to start...    |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the lobby screen for a non-host PLAYER in "Herd Mentality" farm-themed
party game. Same farm style as the host lobby but simplified and calmer.

Same visual style: barn-wood header, pasture greens, cream cards, wood textures,
playful fonts.

Include:
- Same barn-wood header with room code "MANGO"
- Player list titled "THE BARN" (read-only) with cow-tag avatars, a "you"
  indicator highlighting your name
- "BONUS CATEGORIES" shown as read-only farm-styled chips (no edit/delete buttons)
- "SUBMIT A QUESTION (optional)" input -- players CAN submit questions
- "Waiting for host to start..." message at the bottom with a charming farm
  animation -- maybe a cow slowly chewing grass, or a chicken pecking around
- No settings section, no start button (those are host-only)
- Calm, patient feel -- you're hanging out in the barn waiting
```

### Key Design Notes
- "Waiting for host to start..." should feel patient, not boring -- the farm animation helps
- Make it very clear which player is "you" (highlighted row, star, or accent)
- Categories are read-only (no X buttons on chips)
- Calmer energy than the host view since you're just waiting

---

## Screen 4: Answering Phase

### What it does
The core gameplay screen. A question is displayed with a countdown timer. Players type their answer and tap "LOCK IN". The host also sees a subtle "Skip Question" button.

### Wireframe (Player)

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  [cow] x 2            [LBoard]  |
|----------------------------------|
|                                  |
|           0:32                   |
|      [milk pail timer]          |
|                                  |
|  +----------------------------+  |
|  | [barn chalkboard / sign]   |  |
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
|  |     LOCK IN [cowbell]      |  |
|  +----------------------------+  |
|                                  |
|  4 of 6 players answered         |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the answering screen for "Herd Mentality" mobile farm-themed party game.
This is the core gameplay moment -- a question appears and players race to answer.

Same farm visual style. Pasture green background or soft sky gradient.

Include:
- Compact barn-wood header: "Round 3 of 15" on left, room code "MANGO" on right
- Status bar below header: small cow icons showing your score (2 cows) on the left,
  a "Leaderboard" button styled as a small barn-sign on the right
- A prominent countdown timer showing "0:32" -- style it as a milk pail that empties
  as time runs down, or a progress bar with farm decoration. Should feel urgent!
- Large question card in the center styled as a barn chalkboard, wooden notice board,
  or hanging barn sign: "What is the best Disney villain of all time?"
  The question should be the visual focus -- elevated, prominent, easy to read
- Text input below with cream/wood styling: "Your answer..."
- A big green "LOCK IN" button -- bold, satisfying, maybe with a cowbell icon
- Small text at bottom: "4 of 6 players answered"  
- Subtle pasture/grass decoration at the bottom edge
- The energy should feel focused and slightly urgent -- the milk is draining!
```

### Key Design Notes
- The timer is the key farm-themed opportunity -- a milk pail emptying is memorable and on-theme
- Question card as a chalkboard or wooden sign feels like a barn notice
- "LOCK IN" should feel decisive -- like ringing a cowbell
- The cow score icons in the status bar are small but always visible
- For the **host variant**: add a subtle "SKIP QUESTION" text link below the "4 of 6" text
- If you **hold the Pink Cow**, the status bar shows a pink cow icon alongside your regular cows -- unmissable

---

## Screen 5: Answer Locked In (Waiting)

### What it does
After locking in, the player sees their confirmed answer and waits for others. Shows who has answered vs. who hasn't.

### Wireframe

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  [cow] x 2            [LBoard]  |
|----------------------------------|
|                                  |
|           0:18                   |
|      [milk pail timer]          |
|                                  |
|  +----------------------------+  |
|  |  What is the best Disney   |  |
|  |  villain of all time?      |  |
|  +----------------------------+  |
|                                  |
|     [branded/stamped look]       |
|       You answered:              |
|         "Scar"  [checkmark]      |
|                                  |
|  Waiting for the herd...         |
|                                  |
|   Ben      [cow-bell check]     |
|   Sarah    [cow-bell check]     |
|   Mike     [cow-bell check]     |
|   Jess     [grazing dots]       |
|   Tom      [grazing dots]       |
|                                  |
+----------------------------------+
```

### Stitch Prompt

```
Design the "waiting for others" screen after locking in an answer in
"Herd Mentality" farm-themed party game. Same farm visual style.

Include:
- Same barn-wood header with round info, cow score icons, leaderboard button
- Timer still counting down (milk pail still draining): "0:18"
- Question card (same barn-chalkboard style as the answering screen)
- Your locked-in answer shown with a farm-style stamp or brand mark: 
  "Scar" with a green checkmark. Should feel confirmed and sealed -- like
  a cattle brand or a wax seal on a letter
- "Waiting for the herd..." text (farm language!)
- Player status list showing who has answered and who hasn't:
  Ben [cowbell/check], Sarah [cowbell/check], Mike [cowbell/check], 
  Jess [cow grazing dots...], Tom [cow grazing dots...]
- Calmer, more relaxed feel than the answering screen -- you're done, just
  watching the barn, waiting for the slowpokes
```

### Key Design Notes
- Mood shifts from urgent to calm -- the milk pail is still draining but you're relaxed
- Your answer should feel "branded" or "stamped" -- locked in, no going back
- "Waiting for the herd..." is better farm language than "Waiting for others..."
- Answered players get a cowbell-check; unanswered players have a gentle grazing animation
- Still builds anticipation ("come on Jess, the milk is running out!")

---

## Screen 6: Reveal Phase

### What it does
The most exciting screen! Answers are revealed, grouped by fuzzy matching, and scores are awarded. Shows who was in the herd, who were outliers (strays), and who got the Pink Cow.

### Wireframe

```
+----------------------------------+
|  Round 3 of 15          MANGO    |
|  [cow] x 3 (+1)       [LBoard]  |
|----------------------------------|
|                                  |
|  What is the best Disney         |
|  villain of all time?            |
|                                  |
|  THE HERD:                       |
|  +----------------------------+  |
|  | [green pasture card]       |  |
|  |    "Scar"  [cow icon]      |  |
|  |                            |  |
|  |  Ben: "Scar"               |  |
|  |  Sarah: "Scar"             |  |
|  |  Mike: "scar"              |  |
|  |  Tom: "Scar from LK"      |  |
|  +----------------------------+  |
|                                  |
|  THE STRAYS:                     |
|  +----------------------------+  |
|  |  Jess: "Ursula"            |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |  Alex: "Maleficent"        |  |
|  |       [PINK COW!]          |  |
|  +----------------------------+  |
|                                  |
|  Moseying to next round in 8s.. |
|  +----------------------------+  |
|  |     NEXT ROUND (host)      |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the answer reveal screen for "Herd Mentality" farm-themed party game.
This is the MOST EXCITING MOMENT -- the roundup! Answers are revealed and the
herd is counted. Same farm visual style but with extra energy and celebration.

Include:
- Barn-wood header with round info, cow score showing "+1" gain, leaderboard button
- Question repeated at top in barn-sign style
- "THE HERD:" section -- a lush green pasture-themed card showing the winning answer
  "Scar" with a happy cow icon. Below, list each player who matched with their exact
  wording: Ben: "Scar", Sarah: "Scar", Mike: "scar", Tom: "Scar from LK"
  (showing exact wording demonstrates the fuzzy matching -- different words, same herd!)
  This section should feel CELEBRATORY -- green, lush, winning
- "THE STRAYS:" section below with smaller, more muted cards for the outliers:
  - Jess: "Ursula" (neutral, not punishing -- just a stray cow)
  - Alex: "Maleficent" with a big, funny, distinctive PINK COW icon/badge --
    this player got the Pink Cow! Make the pink cow character look mischievous
    or grumpy. The pink cow should be visually memorable and a bit funny.
- Auto-advance text: "Moseying to next round in 8s..." (farm language!)
- "NEXT ROUND" button for the host to advance early
- The herd section should feel like coming home to the barn -- warm, celebratory
- The stray section should feel playful, NOT shameful -- they just wandered off!
- Subtle pasture background, maybe with illustrated cows in the distance
```

### Key Design Notes
- This is the emotional peak of every round -- pump up the farm celebration!
- "THE HERD" vs "THE STRAYS" is better farm language than "Herd" vs "Outliers"
- The green pasture card for the herd should feel lush and rewarding
- Each player's exact wording shown side by side is key for fuzzy matching transparency
- The Pink Cow character needs PERSONALITY -- mischievous, grumpy, funny. She's the game's villain!
- "Moseying to next round in 8s..." is more fun than "Auto-advancing in 8s..."
- Status bar immediately shows "+1" so you see you gained a cow

---

## Screen 7: Leaderboard Modal

### What it does
A bottom sheet overlay accessible from any gameplay screen. Shows the full ranked player list. Doesn't interrupt gameplay.

### Wireframe

```
+----------------------------------+
|  (dimmed farm screen behind)     |
|                                  |
|  +----------------------------+  |
|  | [barn-wood frame]          |  |
|  |   RANCH LEDGER       [X]  |  |
|  |                            |  |
|  |  1. Ben    [cow cow cow    |  |
|  |             cow cow]       |  |
|  |  2. Sarah  [cow cow cow]<- |  |
|  |  3. Mike   [cow cow cow]   |  |
|  |  4. Tom    [cow cow]       |  |
|  |  5. Jess   [cow]           |  |
|  |  6. Alex   [cow] [PINK!]  |  |
|  |                            |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design a bottom sheet / modal overlay for the leaderboard in "Herd Mentality"
farm-themed party game. It's called "THE RANCH LEDGER." It overlays on top of
the gameplay screen with a darkened background.

Same farm visual style: wood-frame border, cream background, playful fonts.

Include:
- "THE RANCH LEDGER" title in barn-sign style lettering with an X close button
- Ranked list of 6 players where scores are shown as ROWS OF SMALL COW ICONS
  (not just numbers). Each cow is a tiny illustrated cow. More cows = bigger herd:
  1. Ben [5 cow icons in a row]
  2. Sarah [3 cow icons] <-- highlighted as "you" with a hay-gold accent
  3. Mike [3 cow icons]
  4. Tom [2 cow icons]
  5. Jess [1 cow icon]
  6. Alex [1 cow icon] + a distinctive pink cow icon (holds the Pink Cow)
- Clean, easy to scan at a glance
- Bottom sheet style that slides up from the bottom (natural mobile gesture)
- Barn-wood frame around the whole modal
```

### Key Design Notes
- "THE RANCH LEDGER" is more fun than "LEADERBOARD"
- Showing actual cow icons in a row (not just "x 5") is more visual and more farm
- Your row highlighted with a hay-gold accent so you find yourself instantly
- The Pink Cow holder has a distinctive pink cow next to their regular cows
- Should feel like peeking at the scoreboard in the barn -- quick glance, then back to the game

---

## Screen 8: Scoreboard (Between Rounds)

### What it does
Full-screen scoreboard shown between rounds. Auto-advances after ~10 seconds.

### Wireframe

```
+----------------------------------+
|  [barn interior background]      |
|  THE RANCH LEDGER        MANGO   |
|----------------------------------|
|                                  |
|  1.  Ben      [cow cow cow      |
|                cow cow]          |
|  2.  Sarah    [cow cow cow cow] |
|  3.  Mike     [cow cow cow]     |
|  4.  Tom      [cow cow cow]     |
|  5.  Jess     [cow cow]         |
|  6.  Alex     [cow]             |
|      [pink cow] Alex has        |
|      the Pink Cow!               |
|                                  |
|  Round 3 of 15 complete          |
|                                  |
|  Moseying along in 8s...        |
|  +----------------------------+  |
|  |  NEXT ROUND (host)         |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the between-rounds scoreboard for "Herd Mentality" farm-themed party game.
Full-screen view called "THE RANCH LEDGER." Same farm style.

Background: barn interior feel -- warm wood tones, maybe a subtle barn-wall texture.

Include:
- "THE RANCH LEDGER" title in barn-sign lettering with room code "MANGO"
- Ranked list of 6 players with cow icons representing their scores (tiny cow
  illustrations in a row, not just numbers):
  1. Ben [5 cows], 2. Sarah [4 cows], 3. Mike [3 cows], etc.
- Alex marked with a big funny pink cow icon and "Alex has the Pink Cow!" text.
  The pink cow character should look mischievous.
- "Round 3 of 15 complete" text
- Auto-advance countdown: "Moseying along in 8s..."
- Green "NEXT ROUND" button for the host
- Brief pause feel -- like sitting on a hay bale between rounds, catching your breath
```

### Key Design Notes
- Barn interior background gives it a cozy "between the action" feel
- Cow icon rows make the scores immediately visual and scannable
- The Pink Cow callout should be prominent and funny -- it's a key game moment
- "Moseying along in 8s..." keeps the farm language consistent

---

## Screen 9: Game Over

### What it does
The final screen. Celebrates the winner, shows final scores, offers "Play Again" or "Back to Home".

### Wireframe

```
+----------------------------------+
|                                  |
|      GAME OVER!                  |
|                                  |
|   [big trophy cow / winner      |
|    cow wearing a crown]          |
|                                  |
|     BEN WINS THE RANCH!          |
|       with 8 cows                |
|                                  |
|  FINAL ROUNDUP                   |
|  1.  Ben       [8 cow icons]    |
|  2.  Sarah     [6 cow icons]    |
|  3.  Mike      [5 cow icons]    |
|  4.  Tom       [4 cow icons]    |
|  5.  Jess      [3 cow icons]    |
|  6.  Alex      [2 cow icons]    |
|      [pink cow] stuck with      |
|      the Pink Cow!               |
|                                  |
|  +----------------------------+  |
|  |     ROUND 'EM UP AGAIN    |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |     BACK TO THE FARM      |  |
|  +----------------------------+  |
+----------------------------------+
```

### Stitch Prompt

```
Design the game over / winner screen for "Herd Mentality" farm-themed party game.
This should be the most CELEBRATORY and FUN screen in the whole game!

Same farm visual style but extra festive -- think barn dance, county fair, celebration.

Include:
- Big "GAME OVER!" text at top in hay-gold or barn-red, festive lettering
- A large illustrated winner cow wearing a golden crown or blue ribbon (county fair
  winner vibes!) -- this should be big, funny, and celebratory
- Winner announcement: "BEN WINS THE RANCH!" with "with 8 cows" subtitle
- "FINAL ROUNDUP" section showing all 6 players ranked with cow icon rows:
  each score displayed as tiny cow illustrations in a row
- Alex noted as "stuck with the Pink Cow!" with the grumpy/mischievous pink cow
  character -- a playful callout, not punishing
- Two buttons at bottom:
  "ROUND 'EM UP AGAIN" (primary green button -- play again)
  "BACK TO THE FARM" (secondary, less prominent -- go home)
- Festive farm atmosphere -- hay confetti, bunting, county-fair ribbons,
  maybe illustrated fireworks or streamers
- This screen should make everyone laugh and want to play again immediately!
```

### Key Design Notes
- This should be the MOST visually exciting screen -- county fair winner energy!
- The crowned cow is the hero moment -- big and funny
- "BEN WINS THE RANCH!" is more fun than "BEN WINS!"
- "FINAL ROUNDUP" is better than "FINAL SCORES"
- "ROUND 'EM UP AGAIN" and "BACK TO THE FARM" keep the language on-theme
- "stuck with the Pink Cow!" is a funny last dig -- the pink cow looks grumpy/smug
- Hay confetti or bunting decorations give it a county-fair celebration vibe

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

## Quick Reference: Farm Language Cheat Sheet

Use these in Stitch follow-up prompts to keep the theme consistent:

| Generic Term | Farm Version |
|---|---|
| Leaderboard | The Ranch Ledger |
| Players | The Barn / The Herd |
| Score / Points | Cows (cow icons) |
| Outliers | The Strays |
| Waiting for others | Waiting for the herd |
| Next round | Moseying to next round |
| Play again | Round 'em up again |
| Go home | Back to the farm |
| Lock in answer | Brand your answer / Lock it in |
| Timer | Milk pail draining |
| Game over | Final Roundup |
| Winner | Wins the Ranch |
| Skip question | Skip to next pasture |
| Pink Cow penalty | Stuck with the Pink Cow |
