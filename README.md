# HRMS Lite Frontend

A modern, **TypeScript-powered** React frontend with premium animations for the HRMS Lite application.

## ✨ Latest Updates

- Full **TypeScript migration** (100% type coverage)
- Premium **animations library** (12+ animation types)
- **Glassmorphism** and gradient effects
- **Performance optimized** with React.memo
- **Timezone-aware** date handling (IST)
- **Bug-free** Dashboard statistics

## 🚀 Features

### Core Functionality
- ✅ **Dashboard**: Real-time stats with staggered animations
- ✅ **Employee Management**: CRUD with custom departments
- ✅ **Attendance Tracking**: Timezone-aware marking and viewing
- ✅ **Responsive Design**: Mobile, tablet, desktop support

### UI/UX Excellence
- ✨ **Modern Animations**: Fade, slide, scale, float, ripple
- 🎨 **Glassmorphism**: Backdrop blur on cards
- 💫 **Micro-interactions**: Hover glows, button ripples
- 📱 **Fully Responsive**: Adaptive layouts
- ⚡ **60fps Animations**: GPU-accelerated
- 🌗 **Enhanced Scrollbars**: Gradient styling

## 🛠️ Tech Stack

- **Language**: TypeScript 5.2+
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.1.0
- **Routing**: React Router DOM 6.21.3
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Axios 1.6.7
- **Forms**: React Hook Form 7.50.1
- **Icons**: Lucide React
- **Date**: date-fns 3.3.1

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components (TSX)
│   │   ├── Layout.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorAlert.tsx
│   │   ├── SuccessMessage.tsx
│   │   ├── EmptyState.tsx
│   │   ├── EmployeeForm.tsx      # Custom dept support
│   │   ├── EmployeeList.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── AttendanceForm.tsx    # Timezone fixes
│   │   └── AttendanceTable.tsx
│   ├── pages/               # Page components (TSX)
│   │   ├── Dashboard.tsx         # Animated stats
│   │   ├── EmployeesPage.tsx
│   │   └── AttendancePage.tsx
│   ├── services/            # API clients (TS)
│   │   ├── api.ts
│   │   ├── employeeApi.ts
│   │   └── attendanceApi.ts
│   ├── types/               # TypeScript definitions
│   │   └── index.ts              # Centralized types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Enhanced animations
├── tsconfig.json                 # TypeScript config
├── tsconfig.node.json
├── vercel.json                   # Deployment config
├── vite.config.ts
└── package.json
```

## 🚀 Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

Update `.env`:
```env
VITE_API_URL=http://localhost:8000
```

### Development

```bash
npm run dev
```

Runs at: `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

Build output: `dist/` (~90KB gzipped)

## 🎨 Animation Library

### Available Animations
- `fade-in` - Smooth fade with slide-up
- `slide-in-left` - Enter from left
- `slide-in-right` - Enter from right
- `scale-in` - Pop-in effect
- `animate-float` - Gentle bobbing
- `animate-spin` - Loading spinner
- `animate-pulse` - Attention pulser
- `animate-bounce` - Playful bounce
- `hover-glow` - Hover glow effect
- `ripple` - Click ripple
- `skeleton` - Loading placeholder
- `stagger-{1-4}` - Sequential delays

### Usage Examples

```tsx
// Fade in component
<div className="fade-in">Content</div>

// Staggered list
{items.map((item, i) => (
  <div className="fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
    {item}
  </div>
))}

// Ripple button
<button className="btn btn-primary ripple">Click</button>
```

## 🎯 TypeScript Features

- **Strict Mode**: Maximum type safety
- **Centralized Types**: All in `types/index.ts`
- **IntelliSense**: Full autocomplete
- **Type-Safe APIs**: All API calls typed
- **Component Props**: All components have interfaces

## 🚢 Deployment (Vercel)

1. **Import GitHub repo** to Vercel
2. **Root directory**: `frontend`
3. **Framework**: Vite (auto-detected)
4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
5. **Deploy**: Automatic on push

Build settings (auto-detected):
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## ✅ Features Implemented

### TypeScript Migration
✅ 20 files converted to TypeScript  
✅ Centralized type definitions  
✅ Strict mode enabled  
✅ Zero type errors  

### UI Enhancements
✅ 12+ animation types  
✅ Glassmorphism effects  
✅ Gradient backgrounds  
✅ Enhanced scrollbars  
✅ Hover & click effects  

### Performance
✅ React.memo on utility components  
✅ useCallback for event handlers  
✅ GPU-accelerated animations  
✅ Optimized bundle size  

### Bug Fixes
✅ Dashboard stats update correctly  
✅ Timezone issues fixed (IST)  
✅ Custom department typing works  
✅ No page reloads (React Router)  

## 🎨 Design System

### Colors
- **Primary**: Indigo gradient
- **Background**: Gray → Blue → Purple gradient
- **Cards**: White/80 with backdrop blur
- **Text**: Gray-900 with gradient accents

### Spacing
- Cards: p-6
- Sections: space-y-6
- Buttons: px-4 py-2

### Animations
- Duration: 200-500ms (feels instant)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- GPU Props: transform, opacity

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

Showcase project for modern React + TypeScript development.

---

**Built with** ❤️ **using TypeScript, React, and Tailwind CSS**
