# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive Vue 3 admin dashboard application built with TypeScript, Element Plus UI components, and Vite. The project is called "综合管理平台" (Comprehensive Management Platform) and includes features like data visualization, low-code modules, AI assistant integration, and various reusable components.

## Development Commands

- `npm run dev` - Start development server with hot reload (opens browser automatically)
- `npm run build` - Build for production (runs TypeScript checks first via vue-tsc)
- `npm run preview` - Preview production build locally

## Architecture Overview

### Core Technologies
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** with strict type checking
- **Element Plus** UI component library with Chinese locale
- **Pinia** for state management
- **Vue Router 4** for routing
- **Vite** for build tooling and development server
- **SCSS** for styling with theme support (light/dark modes)

### Key Directories Structure
- `src/views/` - Main application pages and features
- `src/globalComponent/` - Reusable components (auto-registered globally)
- `src/layout/` - Layout components (main layout, navigation, headers)
- `src/store/` - Pinia store modules
- `src/router/` - Vue Router configuration
- `src/config/` - Application configuration and constants
- `src/utils/` - Utility functions and helpers
- `src/request/` - HTTP client and API configuration
- `src/mock/` - Mock data for development

### Global Component System
Components in `src/globalComponent/` are automatically registered globally through the install system (`src/install/index.ts`). This includes:
- Form components (FormTable, Search, form items)
- UI components (Table, Tree, Dialog, SvgIcon, WangEditor)
- Layout components (loading, operationList)

### Plugin System
The application uses a plugin-based architecture in `src/install/plugins/`:
- `router.ts` - Router configuration
- `pinia.ts` - State management setup
- `axios.ts` - HTTP client configuration
- `golbalVaible.ts` - Global variables and utilities

### Routing Architecture
Static routes are defined in `src/router/staticRouter.ts` with a custom route structure that extends Vue Router:
- Routes include `isMenu` property for navigation visibility
- Icon support through custom icon fonts
- Nested layout system with main Layout component
- Error pages (403, 404, 500) are pre-configured

### Development Server Configuration
- Proxy configured for `/api` requests to `localhost:3000`
- Mock server integration via `vite-plugin-mock`
- SVG icon system with auto-registration
- Auto-import for Vue, Vue Router, and Pinia

### Styling System
- Global SCSS variables and mixins
- Element Plus theme customization
- Light/dark theme support with CSS variables
- Icon fonts and SVG icon system

### Key Features
- AI Assistant integration (`src/views/components/AiAssistant.vue`)
- Data visualization with ECharts, Three.js, and Cesium
- Low-code module system
- Virtual list implementation for performance
- Rich text editor integration
- File upload components
- WebRTC capabilities

## Configuration Files
- Main config: `src/config/index.ts` (system name, colors, API settings)
- Request prefix: `/api`
- Default login redirect: `/workspace/index`
- Path aliases: `@` points to `src/`

## Development Notes
- TypeScript strict mode enabled with unused variable checking
- Auto-imports configured for Vue 3, Vue Router, and Pinia
- Element Plus components auto-imported
- JSX support enabled for Vue components
- Development server opens browser automatically on startup




