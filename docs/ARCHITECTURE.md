# Architecture & Technical Documentation

This document provides a detailed breakdown of the frontend and backend architecture, component design, database schema, and interactive CLI systems powering this portfolio.

---

## 🏗️ System Architecture & Directory Map

```text
AbhiralJain/
├── public/                               # Static distribution assets
│   ├── Abhiral_Jain_Resume.pdf           # Primary resume document
│   ├── favicon.ico                       # Platform icon
│   └── projects/                         # Project media and preview assets
├── src/
│   ├── app/                              # Next.js App Router root
│   │   ├── admin/                        # CMS authentication & management
│   │   │   ├── dashboard/                # Protected CMS workspace (CRUD operations)
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx                  # Admin login interface
│   │   ├── projects/
│   │   │   └── [id]/                     # Dynamic project case study routes
│   │   │       └── page.tsx
│   │   ├── globals.css                   # Global styles, variables, and animations
│   │   ├── layout.tsx                    # Root layout with fonts, HUD, cursor, and CLI
│   │   ├── page.tsx                      # Main single-page portfolio view
│   │   └── template.tsx                  # Page transition container
│   ├── components/                       # UI components and interactive systems
│   │   ├── ui/                           # Reusable UI primitives
│   │   │   ├── card.tsx                  # Standardized container component
│   │   │   ├── scroll-expansion-hero.tsx # Scroll-driven hero media expansion
│   │   │   ├── splite.tsx                # Spline 3D scene wrapper
│   │   │   └── spotlight.tsx             # Radial cursor spotlight gradient
│   │   ├── AnalyticsHUD.tsx              # Interaction telemetry and archetype classification
│   │   ├── CustomCursor.tsx              # Dual-element magnetic cursor follower
│   │   ├── HeroParallax.tsx              # 3D parallax tilt card and layered reveal
│   │   ├── Icons.tsx                     # SVG brand and navigation icons
│   │   ├── Magnetic.tsx                  # Spring pull wrapper for interactive buttons
│   │   ├── ParticleSphere.tsx            # Three.js / R3F particle globe
│   │   ├── SmoothScroll.tsx              # Lenis smooth scrolling with GSAP ScrollTrigger proxy
│   │   └── TerminalCLI.tsx               # In-browser interactive shell with canvas visualizer
│   └── lib/                              # Core utilities and data services
│       ├── supabase.ts                   # Supabase client, schema interfaces, and storage fallback
│       └── utils.ts                      # Class merging utility (clsx / tailwind-merge)
├── components.json                       # shadcn/ui configuration
├── next.config.mjs                       # Next.js configuration and image domains
├── package.json                          # Dependencies and script definitions
├── tailwind.config.ts                    # Theme tokens and font configurations
└── tsconfig.json                         # TypeScript configuration and path aliases
```

---

## 🧩 Component Deep-Dive

### 1. `AnalyticsHUD.tsx` — Interaction Telemetry & Archetype Classification
A telemetry component docked to the interface that records client-side engagement metrics and categorizes interaction styles into archetypes:
- **Telemetry Inputs**:
  - **Cursor Velocity**: Evaluates $dx/dt$ and $dy/dt$ in pixels per second to measure user pace.
  - **Scroll Dynamics**: Tracks scroll depth percentage and velocity changes.
  - **Interaction Density**: Tracks hover duration across visual media, technical documentation, and navigation elements.
  - **Dwell Time**: Monitors active focus against idle durations.
- **Archetype Classification**:
  - `EXPLORER`: Balanced navigation across multiple page sections.
  - `RECRUITER`: Fast navigation focused primarily on resume, experience, and contact links.
  - `DESIGNER`: High interaction with visual media, 3D canvases, and animation components.
  - `ENGINEER`: High dwell time on technical stack tags, case studies, and architecture documentation.
- **State Synchronization**: Dispatches custom window events on classification updates to coordinate theme accents and cursor highlights.

### 2. `TerminalCLI.tsx` — In-Browser Interactive Terminal (`AJ_OS`)
An interactive shell providing an alternate keyboard-driven interface to explore projects, technical skills, and background information:
- **Toggle Binding**: Accessible via the backtick key (`` ` ``) or via the navigation bar.
- **Audio Feedback**: Utilizes the Web Audio API to synthesize subtle keystroke sound frequencies.
- **Matrix Visualizer**: HTML5 2D Canvas rendering an animated digital rain visualizer.
- **Command Set**: Listed in the command reference table below.

### 3. `HeroParallax.tsx` — Multi-Layered 3D Perspective Card
A perspective hero visual utilizing GSAP interpolation:
- **Depth Layers**:
  - Background grid and radial illumination layers.
  - Center typography and subject cutout with hover transparency adjustments.
  - Foreground technical badges positioned with depth offsets.

### 4. `scroll-expansion-hero.tsx` — Scroll-Driven Media Expander
A media container that expands smoothly as the user scrolls, transitioning from a contained card into a full-width viewport element.

### 5. `ParticleSphere.tsx` — Three.js / React Three Fiber Particle Globe
A WebGL-based spherical visualization:
- Uses a Fibonacci sphere distribution algorithm to place 1,500 points uniformly across a 3D sphere.
- Integrates continuous rotation with cursor-responsive tilt adjustments.

### 6. `CustomCursor.tsx` — Magnetic Cursor Follower
- Implements a dual-layer follower: an instantaneous center point paired with an interpolated outer ring.
- Expands and changes state when hovering over clickable elements or project cards.
- Matches accent colors based on the active archetype state.

### 7. `SmoothScroll.tsx` — Lenis Smooth Scrolling Engine
- Couples the Lenis scrolling engine with GSAP `ScrollTrigger.scrollerProxy`.
- Disables momentum effects when `prefers-reduced-motion` is detected in user system settings.

### 8. Admin CMS & Dashboard (`/admin` and `/admin/dashboard`)
- **Dual Data Mode**:
  - Connects to Supabase PostgreSQL database when environment credentials are present.
  - Falls back to browser `localStorage` when offline or when running in local development mode without database configuration.
- **Capabilities**: Project creation, editing, deletion, display order sorting, biography text updates, and availability status toggle.

---

## 📊 Database Schema (PostgreSQL / Supabase)

Execute the following migration in your PostgreSQL database or Supabase SQL Editor:

```sql
-- 1. Create Projects Table
create table public.projects (
  id text primary key default concat('project-', replace(gen_random_uuid()::text, '-', '')),
  title text not null,
  description text not null,
  long_description text not null,
  technologies text[] not null default '{}',
  image_url text default '',
  project_url text default '',
  github_url text default '',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Profile Table
create table public.profile (
  id uuid primary key default gen_random_uuid(),
  bio_text text not null,
  availability_status boolean default true not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.profile enable row level security;

-- 4. Public Read Policies
create policy "Allow Public Read Projects" on public.projects for select using (true);
create policy "Allow Public Read Profile" on public.profile for select using (true);

-- 5. Authenticated Admin Policies
create policy "Allow Admin Manage Projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow Admin Manage Profile" on public.profile for all using (auth.role() = 'authenticated');
```

---

## ⌨️ Terminal Command Reference (`AJ_OS`)

| Command | Arguments | Function |
|---|---|---|
| `help` | — | Lists all available shell commands |
| `about` | — | Displays background, education, and focus areas |
| `resume` / `cv` | — | Opens the resume document |
| `skills` | — | Displays categorized technical skills |
| `projects` | — | Lists all showcased projects |
| `project` | `<index>` | Displays detailed case study for the specified project index |
| `hud` | — | Displays current telemetry diagnostics and archetype classification |
| `matrix` | — | Toggles the background Matrix canvas animation |
| `clear` | — | Clears terminal history buffer |
| `exit` / `close` | — | Closes the terminal drawer |
