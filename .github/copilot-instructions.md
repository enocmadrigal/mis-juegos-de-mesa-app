Cua# Copilot Instructions for Ludoteca App

## Project Overview
- **Type:** React Native app for managing and displaying a collection of board games.
- **Main entry:** `App.tsx`
- **Data:** Game data is stored in `data/games.ts` as a static array of objects, each representing a game with metadata (name, publisher, categories, images, etc.).
- **Models:** TypeScript interfaces/models are in `models/` (e.g., `Game.ts`).
- **UI Components:** Reusable UI elements are in `componentes/`.
- **Screens:** App screens are in `screens/`, each screen is a React component (e.g., `HomeScreen.tsx`, `DetailScreen.tsx`).
- **Assets:** Images and videos are in `assets/` (organized by type and game).

## Key Patterns & Conventions
- **Game Data:** All game-related data is centralized in `data/games.ts`. Each game object follows the `Game` interface from `models/Game.ts`.
- **Image/Video References:** Use relative paths (e.g., `assets/img/gameName/image.jpg`) in data objects. Do not hardcode absolute paths.
- **Component Naming:** Components and screens use PascalCase and are suffixed with `Button`, `Screen`, etc., to clarify their role.
- **Navigation:** (If present) Navigation logic is typically handled in `App.tsx` or a dedicated navigation file (not shown here).
- **Global Styles:** Shared styles are in `GlobalStyles.ts`.

## Developer Workflows
- **Install dependencies:** `npm install` or `yarn`
- **Start app (Expo):** `npx expo start` (or `expo start`)
- **Build for web:** `npx expo build:web`
- **Assets:** Add new images/videos to the appropriate subfolder in `assets/` and reference them in `games.ts`.
- **Add a new game:**
  1. Add images/videos to `assets/`.
  2. Add a new object to the `games` array in `data/games.ts`.
  3. Ensure the object matches the `Game` interface.

## Integration & External Dependencies
- **Expo:** Project uses Expo for development and builds.
- **No backend:** All data is local/static; no API calls or server integration.
- **TypeScript:** All code is TypeScript; type safety is enforced.

## Examples
- **Referencing an image:** `mainImage: "assets/img/ajedrez/ajedrez.jpg"`
- **Game object structure:** See `data/games.ts` and `models/Game.ts` for required fields.

## Special Notes
- **Dates:** Some games use `aproxDate: true` to indicate approximate acquisition dates.
- **Rankings:** `rankValue` is used for sorting or ranking games.
- **Video URLs:** Can be local (in `assets/video/`) or external (YouTube links).

---

For questions about project structure or conventions, review `App.tsx`, `data/games.ts`, and `models/Game.ts` first.
