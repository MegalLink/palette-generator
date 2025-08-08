---
applyTo: '**'
---

# 🎨 Palette Generator - Especificaciones Técnicas

## � Resumen del Proyecto

Crear una aplicación web en **React + TypeScript + Tailwind CSS v4** que genere y visualize paletas de colores con múltiples estilos visuales y verificación de accesibilidad.

## 🎯 Objetivos Principales

1. **Generación de Paletas**: Sistema para generar paletas de 5-6 colores con opciones de bloqueo individual
2. **Visualización Multi-Estilo**: Soporte para Normal, Neomorphism y Glassmorphism
3. **Accesibilidad**: Verificador de contraste WCAG AA/AAA integrado
4. **Tema Dinámico**: Variables CSS editables en tiempo real con soporte dark/light mode
5. **Configuración Avanzada**: Panel de configuración de Tailwind CSS

## 🛠️ Stack Tecnológico

### Dependencias Principales
- **React 19+** con TypeScript
- **Tailwind CSS v4** (nueva sintaxis @theme) https://tailwindcss.com/docs/theme
- **Zustand** (state management): https://zustand.docs.pmnd.rs/
- **TanStack Router**: https://tanstack.com/router/latest/
- **Vite** (build tool)

### Dependencias Adicionales Requeridas
```json
{
  "dependencies": {
    "chroma-js": "^2.4.2",
    "lucide-react": "^0.263.1",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/chroma-js": "^2.4.0"
  }
}
```

## 🏗️ Arquitectura del Proyecto (Screaming Architecture)

```
src/
├── app/                    # Configuración de la aplicación
│   ├── router.tsx         # Configuración de TanStack Router
│   └── store.ts           # Store de Zustand
├── features/              # Características principales
│   ├── palette/           # Generación y gestión de paletas
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── utils/
│   ├── theme/             # Gestión de temas y variables CSS
│   │   ├── components/
│   │   ├── hooks/
│   │   └── stores/
│   ├── accessibility/     # Verificación de contraste WCAG
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── styles/            # Estilos visuales (Neo/Glass)
│       ├── components/
│       ├── hooks/
│       └── stores/
├── shared/                # Componentes y utilidades compartidas aqui crea los componentes reutilizables en las diferentes paginas , el diseño de las 3 paginas en cuanto a componentes es el mismo solo cambia el estilo
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── pages/                 # Páginas de la aplicación
│   ├── home/              # Generador de paletas principal
│   ├── examples/          # Página de ejemplos normales
│   ├── neomorphism/       # Página con estilo neomorphism
│   └── glassmorphism/     # Página con estilo glassmorphism
└── styles/                # Estilos globales
    ├── globals.css
    └── components.css
```

## 📐 Especificaciones Técnicas Detalladas

### 🎨 Sistema de Variables CSS (Tailwind v4)

**Archivo**: `src/styles/globals.css`

```css
@theme {
  /* Tipografía */
  --font-sans: 'Poppins', 'Inter', system-ui, sans-serif;
  
  /* Colores de sistema (modificables por la paleta generada) */
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f1f5f9;
  --color-secondary-foreground: #0f172a;
  --color-destructive: #ef4444;
  --color-destructive-foreground: #ffffff;
  --color-accent: #f59e0b;
  --color-accent-foreground: #ffffff;
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-border: #e2e8f0;
  --color-muted: #f8fafc;
  --color-muted-foreground: #64748b;
  
  /* Sombras para Neomorphism */
  --shadow-neu-light: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  --shadow-neu-inset: inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff;
  
  /* Variables para Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-backdrop: blur(20px);
}

.dark {
  --color-primary: #60a5fa;
  --color-primary-foreground: #030712;
  --color-secondary: #1e293b;
  --color-secondary-foreground: #f8fafc;
  --color-destructive: #f87171;
  --color-destructive-foreground: #030712;
  --color-accent: #fbbf24;
  --color-accent-foreground: #030712;
  --color-background: #020617;
  --color-foreground: #f8fafc;
  --color-border: #334155;
  --color-muted: #0f172a;
  --color-muted-foreground: #94a3b8;
  
  /* Sombras para Neomorphism en dark mode */
  --shadow-neu-light: 20px 20px 60px #000000, -20px -20px 60px #1e293b;
  --shadow-neu-inset: inset 20px 20px 60px #000000, inset -20px -20px 60px #1e293b;
  
  /* Variables para Glassmorphism en dark mode */
  --glass-bg: rgba(30, 41, 59, 0.4);
  --glass-border: rgba(148, 163, 184, 0.18);
}
```

**Importante**: La paleta generada modifica directamente estas variables del sistema usando `document.documentElement.style.setProperty()`. No se crean variables adicionales como `--color-palette-*`.

### 🎨 Generador de Paletas (Home Page)

**Componente Principal**: `src/pages/home/HomePage.tsx`

**Funcionalidades requeridas**:
1. **Generación**: Botón que genera 5-6 colores usando algoritmos de armonía cromática
2. **Display**: Grid de tarjetas mostrando cada color con:
   - Vista previa del color (círculo o cuadrado)
   - Código HEX y RGB
   - Nombre del color (opcional)
   - Botón copiar al clipboard
   - Toggle para bloquear/desbloquear el color
3. **Regeneración**: Los colores bloqueados se mantienen, solo se regeneran los desbloqueados
4. **Exportación**: Botones para exportar como CSS, JSON, o imagen
5. **Navegación**: Enlaces a las páginas de ejemplos de estilos
6. **Aplicación Global**: Los colores generados se aplican automáticamente a las variables CSS globales

**Store de Zustand**:
```typescript
interface PaletteStore {
  colors: Color[];
  lockedColors: boolean[];
  generatePalette: () => void;
  lockColor: (index: number) => void;
  unlockColor: (index: number) => void;
  exportPalette: (format: 'css' | 'json' | 'image') => void;
  applyPaletteToTheme: () => void; // Aplica los colores a las variables CSS del sistema
}

// Mapeo de colores generados a variables CSS del sistema
interface ColorMapping {
  '--color-primary': string;
  '--color-secondary': string;
  '--color-accent': string;
  '--color-destructive': string;
  '--color-background': string;
  '--color-muted': string;
  // Los foreground se calculan automáticamente para mantener contraste
}
```

### 📄 Páginas de Demostración de Estilos

#### 🎯 Examples Page (`src/pages/examples/ExamplesPage.tsx`)
**Propósito**: Mostrar componentes con estilo normal/flat usando la paleta generada
**Componentes de ejemplo**:
- Cards con diferentes layouts
- Botones con variaciones
- Forms y inputs
- Navigation bars
- Alerts y notificaciones
- Data tables
- Charts básicos

#### 🌊 Neomorphism Page (`src/pages/neomorphism/NeomorphismPage.tsx`)
**Propósito**: Demostrar el estilo neomorphism con la paleta actual
**Características**:
- Aplicación automática de clases `.style-neomorphism`
- Sombras suaves internas y externas
- Efectos de profundidad y relieve
- Componentes como: botones flotantes, cards elevadas, controles de audio/video

#### ✨ Glassmorphism Page (`src/pages/glassmorphism/GlassmorphismPage.tsx`)
**Propósito**: Demostrar el estilo glassmorphism con la paleta actual
**Características**:
- Aplicación automática de clases `.style-glassmorphism`
- Efectos de transparencia y blur
- Bordes translúcidos
- Componentes como: modals, overlays, hero sections, dashboards

### 🌗 Sistema de Temas (Dark/Light Mode)

**Componente**: `src/features/theme/components/ThemeToggle.tsx`

**Funcionalidades**:
- Toggle visual (luna/sol) para cambiar entre modes
- Persistencia en localStorage
- Aplicación automática de clase `.dark` en el `<html>`
- Sincronización con preferencias del sistema

**Store de Zustand**:
```typescript
interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  currentTheme: 'light' | 'dark' | 'system';
}
```

### 🎭 Sistema de Estilos Visuales

**Nota importante**: Los estilos NO se cambian dinámicamente. Cada página aplica su estilo específico automáticamente.

**Páginas con estilos fijos**:
1. **Examples Page**: Estilo normal/flat por defecto
2. **Neomorphism Page**: Estilo neomorphism aplicado a todos los componentes
3. **Glassmorphism Page**: Estilo glassmorphism aplicado a todos los componentes

**Clases CSS por página**:
```css
/* Estilo Normal (Examples Page) */
.page-examples .component {
  @apply bg-background border border-border rounded-lg shadow-sm;
}

/* Estilo Neomorphism (Neomorphism Page) */
.page-neomorphism .component {
  background: var(--color-background);
  box-shadow: var(--shadow-neu-light);
  border: none;
  border-radius: 16px;
}

/* Estilo Glassmorphism (Glassmorphism Page) */
.page-glassmorphism .component {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
```

**Implementación**:
- Cada página aplica una clase CSS específica al contenedor principal
- Los componentes dentro heredan automáticamente el estilo de su página
- La paleta generada en Home se aplica globalmente a todas las páginas

### ♿ Verificador de Accesibilidad WCAG

**Componente**: `src/features/accessibility/components/ContrastChecker.tsx`

**Funcionalidades**:
- Cálculo automático de ratio de contraste entre colores
- Verificación WCAG AA (4.5:1) y AAA (7:1)
- Sugerencias de mejora automática
- Simulación de diferentes tipos de daltonismo

**Utilidades requeridas**:
```typescript
// src/features/accessibility/utils/contrast.ts
export function calculateContrast(color1: string, color2: string): number
export function meetsWCAG(ratio: number, level: 'AA' | 'AAA'): boolean
export function suggestBetterContrast(baseColor: string, targetRatio: number): string
```

### 🛠️ Editor de Variables CSS

**Componente**: `src/features/theme/components/ThemeEditor.tsx`

**Funcionalidades**:
- Panel lateral con inputs para cada variable CSS
- Color pickers para variables de color
- Sliders para transparencias y blur
- Preview en tiempo real
- Botones de reset y export de tema

### 📱 Routing con TanStack Router

**Rutas requeridas**:
```typescript
// src/app/router.tsx
const routes = [
  { path: '/', component: HomePage },                    // Generador principal con toda la lógica
  { path: '/examples', component: ExamplesPage },        // Ejemplos con estilo normal
  { path: '/neomorphism', component: NeomorphismPage },  // Ejemplos con estilo neomorphism
  { path: '/glassmorphism', component: GlassmorphismPage } // Ejemplos con estilo glassmorphism
]
```

**Navegación**:
- Header con enlaces a las 4 páginas principales
- La paleta generada en Home se mantiene y aplica en todas las páginas
- Cada página de ejemplos muestra los mismos componentes pero con estilos diferentes

## 🎯 Criterios de Aceptación

### Funcionales
- [ ] **Home Page**: Generar paletas de 5-6 colores con algoritmos de armonía cromática
- [ ] **Home Page**: Bloquear/desbloquear colores individuales durante regeneración
- [ ] **Home Page**: Copiar valores de color al clipboard
- [ ] **Home Page**: Exportar paletas en múltiples formatos (CSS, JSON, imagen)
- [ ] **Home Page**: Aplicar automáticamente la paleta a las variables CSS globales
- [ ] **Examples Page**: Mostrar componentes con estilo normal usando la paleta generada
- [ ] **Neomorphism Page**: Mostrar los mismos componentes con estilo neomorphism
- [ ] **Glassmorphism Page**: Mostrar los mismos componentes con estilo glassmorphism
- [ ] **Global**: Toggle dark/light mode con persistencia
- [ ] **Global**: Verificar contraste WCAG AA/AAA automáticamente
- [ ] **Global**: Navegación entre páginas manteniendo la paleta generada

### Técnicos
- [ ] Usar Tailwind CSS v4 con sintaxis @theme
- [ ] Variables CSS modificables dinámicamente
- [ ] State management con Zustand
- [ ] Routing con TanStack Router
- [ ] TypeScript strict mode
- [ ] Componentes reutilizables y modulares
- [ ] Responsive design (mobile-first)
- [ ] Accesibilidad (aria-labels, keyboard navigation)

### Performance
- [ ] Lazy loading de componentes pesados
- [ ] Debounce en generación de colores
- [ ] Memoización de cálculos de contraste
- [ ] Bundle size < 500KB

## 🧪 Testing

**Casos de prueba mínimos**:
- Generación de paletas produce colores válidos
- Bloqueo de colores funciona correctamente
- Cálculo de contraste WCAG es preciso
- Variables CSS se actualizan en tiempo real
- Dark mode persiste entre sesiones
- Routing funciona sin errores

## 📦 Comandos de Desarrollo

```bash
# Instalación
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Testing
npm run test

# Linting
npm run lint
```

## 🔧 Configuración de Tailwind CSS v4

**Archivo**: `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: []
} satisfies Config
```

**Nota**: En Tailwind v4, las variables se definen en CSS usando `@theme`, no en el config.

## 🎨 Paleta de Colores de Ejemplo

**Sistema de mapeo de colores generados**:
```typescript
// Cuando se genera una paleta de 5-6 colores, se mapean así:
const colorMapping = {
  color1: '--color-primary',      // Color principal de la UI
  color2: '--color-secondary',    // Color secundario 
  color3: '--color-accent',       // Color de acento/destacado
  color4: '--color-destructive',  // Color para errores/warnings
  color5: '--color-background',   // Color de fondo
  color6: '--color-muted'         // Color silenciado/deshabilitado
};

// Los colores foreground se calculan automáticamente para mantener contraste WCAG
```

**Colores base para testing**:
```css
:root {
  --color-primary: #6366f1;      /* Indigo - color1 */
  --color-secondary: #8b5cf6;    /* Purple - color2 */
  --color-accent: #06b6d4;       /* Cyan - color3 */
  --color-destructive: #ef4444;  /* Red - color4 */
  --color-background: #ffffff;   /* White - color5 */
  --color-muted: #f8fafc;       /* Light Gray - color6 */
}
```

Funcionalidades Detalladas
🎨 Generador de Paleta
Botón “Generar Paleta” que crea entre 5 y 6 colores aleatorios.

Cada color se representa como una tarjeta con:

Muestra visual

Código Hex / RGB

Botón "Copiar"

Bloquear para no regenerar

Las tarjetas se mostrarán en una columna lateral a la derecha.

🌗 Dark Mode
Activado usando darkMode: 'class' en tailwind.config.js.

Agregar botón/toggle para cambiar entre claro y oscuro.

Afecta variables de @theme.

🧊 Estilos de Visualización
Conmutador <ModeSwitcher /> que cambia entre los siguientes modos:

Normal: Diseño base.

Neomorphism: Bordes suaves y sombras internas.

Glassmorphism: Transparencia + blur (backdrop-blur).

Cada tarjeta aplicará clases condicionales según el modo activo.

🧪 Contraste y WCAG
Usar un componente <ContrastChecker /> para:

Calcular contraste entre colores primarios y fondo.

Mostrar cumplimiento AA o AAA.


Crea una aplicación en React + Tailwind + TypeScript que genere paletas de colores y permita:
- Visualizar en estilos: Normal, Neomorphism y Glassmorphism.
- Soporte para dark mode.
- Revisión de contraste y cumplimiento WCAG.
- Modificar dinámicamente variables CSS definidas en un bloque @theme.
- Mostrar página de configuración de Tailwind con dark mode y colores extendidos.
- Todas las variables como --color-primary, --background, etc., deben estar en la paleta generada.
