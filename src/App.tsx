import { RouterProvider, createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router'
import { HomePage } from './pages/home/HomePage'
import { ExamplesPage } from './pages/examples/ExamplesPage'
import { NeomorphismPage } from './pages/neomorphism/NeomorphismPage'
import { GlassmorphismPage } from './pages/glassmorphism/GlassmorphismPage'
import { ModernPage } from './pages/modern/ModernPage'
// ThemeToggle is now inside QuickSettings
import { QuickSettings } from './shared/components/QuickSettings'
import { Settings } from 'lucide-react'
import './index.css'

const rootRoute = createRootRoute({
  component: () => (
  <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="container mx-auto flex items-center gap-4 p-4">
          <Link to="/" className="button button-ghost">Home</Link>
          <Link to="/examples" className="button button-ghost">Examples</Link>
          <Link to="/neomorphism" className="button button-ghost">Neomorphism</Link>
          <Link to="/glassmorphism" className="button button-ghost">Glassmorphism</Link>
          <Link to="/modern" className="button button-ghost">Modern</Link>
          <div className="ml-auto">
            <button
              className="button"
              aria-label="Abrir configuración"
              title="Configuración"
              onClick={() => window.dispatchEvent(new Event('quicksettings:toggle'))}
            >
              <Settings size={16} />
            </button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <QuickSettings mode="header" />
    </div>
  )
})

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
const examplesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/examples', component: ExamplesPage })
const neoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/neomorphism', component: NeomorphismPage })
const glassRoute = createRoute({ getParentRoute: () => rootRoute, path: '/glassmorphism', component: GlassmorphismPage })
const modernRoute = createRoute({ getParentRoute: () => rootRoute, path: '/modern', component: ModernPage })

const routeTree = rootRoute.addChildren([indexRoute, examplesRoute, neoRoute, glassRoute, modernRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}
