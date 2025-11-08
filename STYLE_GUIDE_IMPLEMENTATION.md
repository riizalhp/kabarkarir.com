# Style Guide Implementation

## 🎨 KabarKarir.com Official Design System

Dokumen ini menjelaskan implementasi design system yang konsisten di semua frontend KabarKarir.com.

---

## Color Palette

### Primary Colors

```css
primary: #3BADEF   /* Biru cerah - untuk CTAs, links, brand elements */
secondary: #1F2937 /* Abu-abu gelap - untuk text headings, navigation */
accent: #F9812A    /* Orange - untuk highlights, special elements */
light: #f8fafc     /* Background terang */
```

### Usage Guidelines

- **Primary (#3BADEF)**: Digunakan untuk tombol CTA utama, links saat hover, ikon brand
- **Secondary (#1F2937)**: Digunakan untuk headers, navigation, footer background
- **Accent (#F9812A)**: Digunakan untuk notifications, special badges, highlight elements
- **Light (#f8fafc)**: Background color untuk page sections

---

## Typography

### Font Family

**Poppins** (Google Fonts)

- Weights: 300, 400, 500, 600, 700
- Fallback: sans-serif

### Font Usage

```css
body {
  font-family: "Poppins", "sans-serif";
  color: #333;
}

h1,
h2,
h3 {
  font-weight: 600-700;
}
p,
span {
  font-weight: 400;
}
button {
  font-weight: 500-600;
}
```

---

## Component Styles

### Buttons

#### Primary Button

```tsx
<button className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:bg-opacity-90 transition shadow-md">
  <i className="fas fa-icon mr-2"></i>
  Button Text
</button>
```

#### Secondary Button

```tsx
<button className="bg-transparent border-2 border-white text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white hover:text-primary transition">
  Button Text
</button>
```

#### Accent Button

```tsx
<button className="bg-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition">
  Button Text
</button>
```

### Cards

#### Basic Card

```tsx
<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
  <h3 className="font-semibold text-secondary mb-3">Card Title</h3>
  <p className="text-gray-600">Card content...</p>
</div>
```

#### Icon Card with Border Top

```tsx
<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-primary">
  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
    <i className="fas fa-icon text-2xl text-primary"></i>
  </div>
  <h3 className="font-semibold text-secondary">Card Title</h3>
</div>
```

### Navigation

#### Header Style

```tsx
<header className="bg-white shadow-md sticky top-0 z-50">
  {/* Top bar with secondary background */}
  <div className="bg-secondary text-white py-2">
    {/* Cross-site navigation */}
  </div>

  {/* Main header with white background */}
  <div className="container mx-auto px-4 py-4">{/* Logo, nav, CTA */}</div>
</header>
```

#### Navigation Links

```tsx
<Link
  to="/"
  className="text-secondary hover:text-primary font-medium transition"
>
  <i className="fas fa-icon mr-1"></i> Link Text
</Link>
```

### Footer Style

```tsx
<footer className="bg-secondary text-white pt-12 pb-6">
  {/* 4-column grid layout */}
  {/* Social icons with hover:bg-primary */}
  {/* Links with hover:text-primary */}
</footer>
```

---

## Gradients

### Hero Sections

```css
background: linear-gradient(to right, #3BADEF, #60A5FA);
/* or */
bg-gradient-to-r from-primary to-blue-500
```

### Button Gradients (deprecated - use solid colors)

❌ **Old style**: `from-blue-600 to-purple-600`
✅ **New style**: `bg-primary`

---

## Icons

### Font Awesome 6.4.0

Always include icon with margin:

```tsx
<i className="fas fa-icon mr-2"></i> Text
```

### Icon Badges

```tsx
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
  <i className="fas fa-icon text-primary"></i>
</div>
```

---

## Spacing & Layout

### Container

```tsx
<div className="container mx-auto px-4">{/* Content */}</div>
```

### Section Padding

```tsx
<section className="py-16">  {/* Standard section */}
<section className="py-12">  {/* Compact section */}
<section className="py-20">  {/* Large section (hero, CTA) */}
```

---

## Hover Effects

### Standard Transitions

```css
transition-all duration-300
/* or simply */
transition
```

### Shadow Effects

```tsx
shadow-md hover:shadow-xl    {/* Cards */}
shadow-lg hover:shadow-2xl   {/* Buttons */}
```

### Scale Effects

```tsx
group-hover:scale-110 transition  {/* Icons in cards */}
hover:scale-105 transition        {/* Stat numbers */}
```

---

## Implementation Checklist

### ✅ Frontend-Mahasiswa

- [x] index.html - Tailwind config + Poppins font
- [x] HomePage - Hero gradient, category cards, CTA
- [x] Header - Navigation with primary hover colors
- [x] Footer - Secondary background, primary hover

### ✅ Frontend-Pelatihan

- [x] index.html - Tailwind config + Poppins font
- [x] HomePage - Hero gradient, category cards, features
- [x] Header - Logo hover animation, primary CTA
- [x] Footer - Social icons with primary/accent hover

### ✅ Frontend-Admin (Reference)

- [x] Already using correct color scheme
- [x] Primary: #3BADEF
- [x] Secondary: #1F2937
- [x] Accent: #F9812A

---

## Before & After

### Old Color Scheme ❌

```css
primary: #0066CC   /* Too dark blue */
secondary: #1a202c /* Inconsistent */
/* No accent color */
/* No Poppins font */
```

### New Color Scheme ✅

```css
primary: #3BADEF   /* Bright blue - matches brand */
secondary: #1F2937 /* Consistent across all frontends */
accent: #F9812A    /* Orange for highlights */
font: 'Poppins'    /* Modern, clean typography */
```

---

## Browser Compatibility

### Custom Scrollbar

```css
/* Webkit (Chrome, Safari, Edge) */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #1f2937;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #4b5563;
}

/* Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}
```

---

## Notes

1. **Consistency is Key**: Semua frontend (user, mahasiswa, pelatihan, admin) harus menggunakan color scheme yang sama
2. **Poppins Font**: Wajib di-load dari Google Fonts di semua project
3. **Transition Effects**: Selalu tambahkan `transition` untuk hover effects
4. **Icon + Text**: Selalu combine icon dengan text untuk better UX
5. **Rounded Corners**: Gunakan `rounded-full` untuk buttons, `rounded-xl` untuk cards
6. **Shadow Hierarchy**:
   - `shadow-md` - Default cards
   - `shadow-lg` - Buttons, elevated elements
   - `shadow-xl` - Hover states
   - `shadow-2xl` - Active/focus states

---

## References

- **Main Admin**: `d:\kabarkarir.com\frontend-admin\index.html`
- **Color Definitions**: Tailwind config in all `index.html` files
- **Component Examples**: Check HomePage, Header, Footer in each frontend

---

**Last Updated**: November 8, 2025
**Status**: ✅ Fully Implemented across all frontends
