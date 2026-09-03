# FITstore Admin — Non-Functional Requirements

*A plain-language guide to the qualities of this app — no coding
knowledge needed to read this.*

Functional requirements describe **what** the app does (log in, add a
product, approve an order...). This document describes **how well** it's
expected to do those things — how fast, how safe, how easy to use, and how
dependable.

---

## 1. Ease of Use

- Anyone who can use a normal website should be able to use this app
  without training — buttons and forms are labeled in plain terms
  ("Approve", "Reject", "Delete Category"), not technical codes.
- Before anything is permanently deleted (a category, a product, a
  category type), the app asks *"Are you sure?"* first, so nothing is
  removed by accident.
- After every action — saving, creating, deleting — the app shows a clear
  message confirming what happened, or explaining what went wrong.
- The app works on a phone, tablet, or desktop computer, adjusting its
  layout to fit the screen automatically.

## 2. Speed

- Screens are designed to load only the information needed for that
  screen (for example, opening one category's products doesn't reload
  every product in the store).
- Images load progressively as the staff member scrolls, instead of
  making the whole page wait for every picture to appear.
- The count of orders waiting for approval, shown at the top of the
  screen, refreshes on its own roughly every 30 seconds — staff don't
  need to manually refresh the page to see new orders come in.

## 3. Security

- Access requires a valid email and password; nothing can be created,
  edited, or deleted without being signed in.
- Once signed in, the app keeps proving who you are on every action
  automatically, using a secure token issued at login — you don't
  re-enter your password for every click.
- If that token stops being valid (for example, because too much time has
  passed), the app signs the user out immediately and shows a clear
  message — *"Your session has expired. Please log in again."* — instead
  of failing silently or showing confusing errors.

  **Known limitation:** right now, simply knowing the web address of an
  admin screen is enough to *view* it, even while signed out — only the
  actions on that screen (saving, deleting, approving) are actually
  blocked without a valid login. This is a gap the team is aware of, not
  a security guarantee.

## 4. Reliability

- If the app can't reach the server (for example, due to a network
  problem), it shows an on-screen error message rather than freezing or
  showing a blank page.
- Saving a form (a product, a category, an order decision) either
  completes successfully or shows exactly why it didn't — there is no
  silent failure.

## 5. Availability

- The app itself is a set of files that load in the browser; it depends
  on its companion server (the "engine") being online to actually load or
  save any data. When that server is deployed, the app is reachable
  anywhere with an internet connection — not just from one office or
  computer.

## 6. Compatibility

- The app runs inside any modern web browser (Chrome, Edge, Firefox,
  Safari) — nothing needs to be installed on the staff member's computer.

## 7. Data Integrity

- Fields the system needs to function correctly (like a product's name or
  a category's type) must be filled in before a form can be submitted —
  the app won't silently accept incomplete data.
- Rejecting an order always requires a written reason, so there's a
  record of why an order was turned down.

## 8. Maintainability

- The app is organized so a developer can add a brand-new feature (like
  the Hero Banner editor) by writing one new, self-contained piece,
  without having to rewrite the features that already exist.
