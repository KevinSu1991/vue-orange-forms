# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 template project for exploring frontend technologies. It's built with Vue CLI (not Vite), despite the README mentioning vite4. The project uses Vue 3, TypeScript, Element Plus, Vant, Pinia, and Vue Router.

## Common Commands

- `npm run dev` - Start development server (runs on http://localhost:8085)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint with auto-fix and Prettier formatting on TypeScript and Vue files

## Tech Stack & Architecture

### Build Tool
- Vue CLI Service (webpack-based), configured in `vue.config.js`
- Port: 8085, allows external IP access
- Node polyfills enabled via `node-polyfill-webpack-plugin`

### State Management
- Pinia with persistence plugin (`pinia-plugin-persist`)
- Stores (`src/store/`):
  - `login` - Authentication state
  - `layout` - UI layout & caching
  - `message` - Application messages
  - `other` - Miscellaneous state
  - `staticDict` - Static dictionary data

### Static Dictionaries
The app has an extensive static dictionary system (`src/common/staticDict/`) that defines various enums and constants:
- System dictionaries: user status, operation types, menu types, etc.
- Form dictionaries: widget types, operation types, form types
- Feature dictionaries: data permission types, filter types
- Available in components via global properties: `app.config.globalProperties.StaticDict`

### HTTP Layer
- Centralized request handling in `src/common/http/`
- Functions: `get`, `post`, `put`, `patch`, `del`, `upload`, `download`, `downloadBlob`
- Auto-imported in `src/main.ts`
- Features:
  - Loading mask management with reference counting
  - Request throttling option
  - Unified error handling via `ElMessage`
  - Support for mock URLs

### Auto-Imports
- Vue, Vue Router, and Pinia are auto-imported via `unplugin-auto-import`
- Element Plus components are auto-imported via `unplugin-vue-components`
- Generated types in `src/types/auto-import.d.ts` and `src/types/components.d.ts`

### Component Libraries
- Element Plus (primary desktop UI) - auto-imported
- Vant (mobile UI)
- Layui Vue
- VXE Table (data tables)

### Routing
- Hash-based routing (`createWebHashHistory`)
- Token-based authentication guard in `src/router/index.ts`
- System routes in `src/router/systemRouters.ts`
- Page caching support via layout store

### TypeScript
- Path aliases: `@` maps to `src`
- `noImplicitAny` is set to `false` in tsconfig.json
- Strict mode enabled except for `noImplicitAny`

## Development Notes

### ResizeObserver Patch
The app patches `window.ResizeObserver` with a debounced version to fix webpack-related errors (see `src/main.ts` lines 52-59).

### Third-Party Integration
Includes support for third-party integrations via URL routes (`/thirdParty/`), with token-based auth in the router guard.

### SCSS
Global SCSS from `src/assets/skin/orange/index.scss` is automatically imported in all SCSS files via webpack config.
