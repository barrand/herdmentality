# Flock Together -- TODO

## Custom Questions (submit in lobby)

**Status:** Complete.

- [x] Backend: `submitCustomQuestion` Cloud Function
- [x] Frontend: `gameService.ts` wrapper + real-time listener (`onCustomQuestionsUpdate`)
- [x] Frontend: Wire `QuestionSubmission` into `Lobby.tsx` -- both host and players can submit
- [x] Frontend: Show submitted questions to all players via Firestore listener

---

## Bonus Category Themes (host adds in lobby)

**Status:** Complete.

- [x] Frontend: `CategoryInput.tsx` chip component -- host editable, players read-only
- [x] Backend: `updateCategories` Cloud Function (host-only, lobby status)
- [x] Frontend: `gameService.ts` wrapper
- [x] Frontend: Wired into `Lobby.tsx` -- host adds/removes chips, players see read-only
- [x] Frontend: Helper text -- "Adds themed questions on top of the general pool"

---

## Host Skip Question

**Status:** Complete.

- [x] Backend: `skipQuestion` Cloud Function
- [x] Frontend: Skip button in `QuestionDisplay.tsx`
- [x] Frontend: `gameService.ts` wrapper

---

## Shorten AI Commentary

**Status:** Complete.

- [x] Backend: Tightened Gemini prompt to "ONE short sentence, max 12 words"

---

## Rotten Egg Visualization

**Status:** Complete.

- [x] Create Rotten Egg SVG component (`RottenEgg.tsx`)
- [x] Use across all components (GameHeader, LeaderboardModal, Scoreboard, RevealBoard)
- [x] Rotten Egg badge animation (wobble on reveal screen)

---

## Future Ideas

- [ ] Adjustable settings in lobby (rounds, timer)
- [ ] Sound effects / haptics
- [ ] Player avatars (chicken characters)
- [ ] Spectator mode
