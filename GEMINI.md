# Project Guidelines

## Layouts
When creating new Astro pages, **always** use `Base.astro` (located at `src/layouts/Base.astro`) as the main layout, rather than the default `Layout.astro`.

Example:
```astro
---
import Layout from '../layouts/Base.astro';
---

<Layout title="Your Title">
  <!-- content -->
</Layout>
```

## Component Structure
When creating new UI blocks or complex components, use the **"feature folder" pattern**. 
- Each component/block should have its own dedicated directory (e.g., `src/components/blocks/MyBlock/`).
- The directory should contain the main `.astro` component, its associated `.tsx` files (if any), and its `.template.ts` TinaCMS schema.

## Agent Behavior
- **Reporting Findings:** When asked to investigate an issue or bug, report the findings first and ask for permission before applying a fix. Do not automatically fix it unless explicitly asked to do so.
