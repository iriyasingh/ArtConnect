# ArtConnect Design Guide

## Color Palette

### Primary Colors
```
--accent-primary: #D9A574     (Golden Brown - Primary action color)
--accent-hover: #C99564        (Darker Gold - Hover state)
--accent-light: #F0E4D6        (Light Gold - Background accents)
--accent-dark: #8B6F47         (Dark Gold - Secondary actions)
```

### Backgrounds
```
--bg-primary: #FEFDF9          (Off-white - Main background)
--bg-secondary: #F5F1EA        (Light Beige - Card backgrounds)
--bg-tertiary: #1F1F1F         (Dark - Overlays)
--bg-accent: #E8D4C0           (Soft Gold)
```

### Text Colors
```
--text-primary: #1A1A1A        (Main text)
--text-secondary: #5D5D5D      (Secondary text)
--text-tertiary: #888888       (Disabled/hint text)
--text-inverse: #FFFFFF        (Light text on dark)
```

### Status Colors
```
--success: #10b981             (Green - Success messages)
--error: #ef4444               (Red - Error messages)
```

## Typography

### Font Family
- **Headings (h1-h6):** Playfair Display (serif)
- **Body Text:** Inter (sans-serif)

### Font Weights
- 400: Regular text
- 500: Medium emphasis
- 600: Strong emphasis
- 700: Bold/headings
- 800: Extra bold (hero text)

### Font Sizes
- **h1:** 3.5rem - 5rem (hero)
- **h2:** 2.8rem - 3.2rem (section headers)
- **h3:** 1.3rem - 1.5rem (card titles)
- **h4:** 1.1rem (subsections)
- **Body:** 0.95rem - 1rem
- **Small:** 0.85rem - 0.9rem
- **Tiny:** 0.7rem - 0.75rem

## Spacing System

### Margin & Padding
```
0.5rem, 0.8rem, 1rem, 1.2rem, 1.5rem, 2rem
2.5rem, 3rem, 4rem, 5rem, 6rem, 8rem
```

### Gap Scales
- Card grid gaps: 2rem - 3rem
- Form field gaps: 1.5rem - 1.8rem
- Section padding: 4rem - 8rem
- Component gaps: 1rem - 2rem

## Components

### Card Styles
All cards feature:
- Border radius: 8px (default), 12px (form cards)
- Box shadow: var(--shadow-subtle) to var(--shadow-medium)
- Border: 1px solid var(--border-light)
- Hover effect: translateY(-8px)
- Transition: var(--transition-smooth)

### Product Cards (.product-card)
```css
- Image height: 320px
- Padding: 2rem
- Category badge: top-right corner
- Price & action: bottom section
```

### Artist Cards (.artist-card)
```css
- Image height: 350px
- Text centered
- Padding: 2rem
- View Portfolio button: full width
```

### Feature Cards (.feature-card)
```css
- Background: var(--bg-secondary)
- Padding: 2.5rem
- Text centered
- Hover: background changes to var(--accent-light)
```

### Form Cards (.form-card)
```css
- Padding: 3rem
- Border radius: 12px
- Shadow: var(--shadow-light)
```

## Button Styles

### Primary Button (className="primary")
```css
- Background: var(--accent-primary)
- Color: white
- Padding: 0.95rem 2.2rem
- Border radius: 6px
- Font size: 0.8rem - 0.9rem
- Font weight: 700
- Hover: darker background, elevated shadow
```

### Secondary Button (default)
```css
- Background: transparent
- Color: var(--text-primary)
- Border: 1.5px solid var(--text-primary)
- Padding: 0.95rem 2.2rem
- Border radius: 6px
- Hover: filled background with white text
```

## Forms

### Input Fields
```css
- Padding: 1.1rem
- Border: 1.5px solid var(--border-light)
- Border radius: 6px
- Font size: 0.95rem
- Focus: accent border color with background tint
```

### Form Labels
```css
- Font size: 0.75rem
- Text transform: uppercase
- Letter spacing: 0.1em
- Font weight: 700
- Margin bottom: 0.7rem
```

## Grid Layouts

### Grid Classes
```css
.grid-2      /* 2 columns, min 300px */
.grid-3      /* 3 columns, min 280px */
.grid-4      /* 4 columns, min 260px */
.grid        /* Auto-fill, min 290px */
```

### Responsive Breakpoints
- **Desktop:** Full featured layouts
- **Tablet (1024px):** 2-column grids
- **Mobile (768px):** 1-column stacked layouts

## Shadows

```css
--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.04)
--shadow-light: 0 4px 16px rgba(0, 0, 0, 0.08)
--shadow-medium: 0 12px 32px rgba(0, 0, 0, 0.12)
--shadow-heavy: 0 20px 48px rgba(0, 0, 0, 0.16)
```

## Transitions

```css
--transition-smooth: all 0.35s cubic-bezier(0.4, 0, 0.2, 1)
--transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
```

## Borders

```css
--border-light: #E5E5E5    (Light dividers)
--border-medium: #D8D8D8   (Standard borders)
--border-dark: #A8A8A8     (Emphasis borders)
```

## Icons
- Icon library: Font Awesome (react-icons/fa)
- Icon sizes: 12px (small), 16px (default), 20px, 24px (large)
- Icon color: Usually --text-secondary or --accent-primary

## Animation

### Reveal Animation
```css
@keyframes reveal {
  from: opacity 0, translateY(24px)
  to: opacity 1, translateY(0)
}
Duration: 0.6s
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

## Best Practices

1. **Consistency:** Always use defined variables for colors, spacing, and shadows
2. **Spacing:** Maintain consistent padding/margin patterns within sections
3. **Typography:** Use defined font sizes for visual hierarchy
4. **Cards:** All cards should have consistent styling and hover effects
5. **Forms:** Input fields should have clear labels and error states
6. **Responsive:** Test all pages at 768px and 1024px breakpoints
7. **Accessibility:** Maintain sufficient color contrast (WCAG AA)
8. **Performance:** Use CSS transitions, avoid unnecessary animations

## Page-Specific Guidelines

### Home Page
- Hero: Full viewport height with gradient background
- Sections: Alternating white/beige backgrounds
- CTA buttons: Prominent placement with secondary options

### Explore/Collections
- Filters: Sticky top, clear visual feedback
- Cards: Consistent product card styling
- Pagination: Clear navigation

### Artists
- Cards: Professional profile layout
- Images: Consistent aspect ratio
- Spacing: Centered content

### Auth Pages (Login/Register)
- Split layout: 50/50 left/right
- Left: Branding and benefits
- Right: Form inputs
- Gradient backgrounds for visual appeal

### Cart
- Sticky sidebar: Fixed position for summary
- Item cards: Clear pricing and actions
- Responsive: Full width on mobile
