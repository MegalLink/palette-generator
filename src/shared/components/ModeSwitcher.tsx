import { Link, useLocation } from '@tanstack/react-router'

export function ModeSwitcher() {
  const location = useLocation()
  const path = location.pathname
  return (
    <div className="flex items-center gap-2">
      <Link to="/examples" className={`button ${path === '/examples' ? 'button-primary' : 'button-ghost'}`}>Normal</Link>
      <Link to="/neomorphism" className={`button ${path === '/neomorphism' ? 'button-primary' : 'button-ghost'}`}>Neomorphism</Link>
      <Link to="/glassmorphism" className={`button ${path === '/glassmorphism' ? 'button-primary' : 'button-ghost'}`}>Glass</Link>
    </div>
  )
}
