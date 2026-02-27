# Project Context for Claude

Welcome to the DeportyApp project! This document outlines key technical tenets and application context to help you write accurate, bug-free, and idiomatic code for this repository.

## The Deporty Concept
Deporty is a SaaS/Platform targeting Latin America to organize sport leagues, manage teams, and track real-time results. 
Language: The UI and content are predominantly in Spanish (`es`).

## Technical Stack
- **Framework:** SvelteKit (App Router, Vite-based)
- **UI & Architecture:** Svelte 5 ⚠️ *(Critical: Use Runes `$state`, `$derived`, `$props`, `$effect` instead of legacy reactivity)*
- **Styling:** Tailwind CSS v4, custom UI constructs.
- **Database & Authentication:** Supabase (using `@supabase/ssr` & `@supabase/supabase-js`)
- **Language:** TypeScript strictly enabled.

## Code Standards and Lessons Learned
When making modifications, be mindful of the following established patterns:

1. **Svelte 5 Exclusivity:** Do not write Svelte 4 code (e.g. `export let`, `$:`, `onMount` if `$effect` suffices, `<svelte:component>` etc). Stick exclusively to the Rune paradigms.
2. **SSR Safety and Third-parties:** SvelteKit does Node-side Server Side Rendering by default. Accessing `window`, `document`, or initializing DOM-dependent libraries (like `intl-tel-input`) directly inside `<script>` blocks across pages WILL crash the routing during pre-loads. Wrap DOM code inside `$effect` or explicit browser checks.
3. **Known Custom Components:** 
   - `PhoneInput`: When needing a phone number input, use `src/lib/components/PhoneInput.svelte`. Do NOT install or import third-party Svelte wrappers for this, as they broke compatibility in the past.
   - Intenationalization (`$lib/i18n`): Always use `import { t } from '$lib/i18n';` and `{$t('key')}` for text.
4. **Auth Flow:** 
   - Server-side auth is secured via `hooks.server.ts` storing a safe Supabase client in `event.locals`.
   - Use `locals.safeGetSession()` inside `+page.server.ts` loaders to block unhandled users.

Please refer to this document every time a new feature or architectural problem arises before changing the established baseline!
