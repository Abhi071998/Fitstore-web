# FITstore Admin — Functional Requirements

This document lists what FITstore Admin actually does: every feature, screen,
and action available in the app today. Each requirement is written as
"the system shall..." so it can be checked directly against the running app.

FITstore Admin is the **back-office** tool store staff use to manage a
fitness-apparel catalog and approve customer orders. It is not the
customer-facing storefront.

---

## 1. Authentication

1.1. The system shall let a user log in with an email and password.

1.2. The system shall keep the user signed in across page reloads and
browser restarts, until they explicitly log out.

1.3. The system shall attach the logged-in user's credentials to every
request that needs them, automatically.

1.4. The system shall detect an expired or invalid session, sign the user
out, and display the message *"Your session has expired. Please log in
again."*

1.5. The system shall let a signed-in user log out at any time.

> **Out of scope today:** creating a brand-new admin account (sign-up) is
> not available in the app. Accounts must be provisioned another way.

## 2. Home Screen

2.1. The system shall display a welcome message when the user visits the
home page.

2.2. The system shall, only when the user is signed in and there is at
least one order awaiting approval, display a reminder showing how many
orders are pending (e.g. *"You have 3 pending tasks"*) linking directly to
the approvals screen.

## 3. Category Management

3.1. The system shall display all categories as a grid, each showing an
image (if set), its name, and how many products it contains.

3.2. The system shall let a user create a new category by selecting a
Category Type and, optionally, an image URL.

3.3. The system shall let a user edit an existing category's type and
image.

3.4. The system shall let a user delete a category, after asking for
confirmation.

3.5. The system shall navigate to that category's product list when the
user selects a category card.

## 4. Category Type Management

4.1. The system shall display all category types in a list.

4.2. The system shall let a user create a new category type by name.

4.3. The system shall let a user rename an existing category type.

4.4. The system shall let a user delete a category type, after asking for
confirmation.

## 5. Product Management

5.1. The system shall display all products within a chosen category as a
grid, each showing an image (if set), name, brand, selling price, and — if
discounted — the original price and discount percentage.

5.2. The system shall let a user create a new product with: name, product
code, SKU, brand, description, MRP, selling price, one or more image URLs,
free-form specifications (e.g. "Fabric: 100% Cotton"), and stock counts for
sizes S, M, L, XL, and XXL.

5.3. The system shall let a user edit any of the above fields on an
existing product.

5.4. The system shall let a user delete a product, after asking for
confirmation.

## 6. Order Approval

6.1. The system shall display all pending orders, grouped by the customer
who placed them.

6.2. The system shall display, for each order: its items (with size,
quantity, unit price), computed total, shipping address, and current
status.

6.3. The system shall let a user approve a single order.

6.4. The system shall let a user reject a single order, and shall require a
comment explaining why before the rejection can be submitted.

6.5. The system shall let a user select multiple orders and approve them
all in one action.

6.6. The system shall show a live count of pending orders in the
navigation bar at all times while signed in, refreshing automatically
roughly every 30 seconds.

## 7. Storefront Content — About Us

7.1. The system shall let a user view and edit the About Us content shown
to customers: image, title, description, four taglines, established year,
visit-us address, and contact email.

7.2. The system shall create the About Us content the first time it is
saved, and update it on every save afterward.

## 8. Storefront Content — Hero Banner

8.1. The system shall let a user view and edit the homepage hero banner
shown to customers: a tag line, a two-line heading with an optional
highlighted phrase, a description, a background image, and a primary and
secondary call-to-action button (each with its own text and link).

8.2. The system shall create the hero banner content the first time it is
saved, and update it (overwriting all fields) on every save afterward.

## 9. Admin Console

9.1. The system shall provide a central Admin Console screen listing every
manageable content section (Hero Banner, About Us, Category Types) as
cards.

9.2. The system shall let a user navigate from any section back to the
Admin Console via a persistent back link.

## 10. Navigation

10.1. The system shall show a navigation bar with links to Home and
Categories at all times.

10.2. The system shall show links to Pending Approvals and Admin Console
only while the user is signed in.

10.3. The system shall collapse navigation into a hamburger menu on
narrow (mobile) screens.
