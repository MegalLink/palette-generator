export function ColorRolesSection() {
  return (
    <section aria-labelledby="color-roles">
      <h3 id="color-roles" className="text-lg font-semibold mb-3">Uso de colores (Primary / Secondary / Accent)</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Primary: CTA claro (Visibilidad del estado, Consistencia) */}
        <div className="component p-4 rounded-lg">
          <h4 className="mb-2">Primary (CTA)</h4>
          <p className="text-sm mb-3 text-[color:var(--color-foreground)] opacity-80">Acciones principales y foco de atención.</p>
          <button className="button bg-primary text-primary-foreground" aria-label="Acción principal">Llamado a la acción</button>
        </div>

        {/* Secondary: Contenido informativo (Estética minimalista) */}
        <div className="component p-4 rounded-lg">
          <h4 className="mb-2">Secondary (Superficies)</h4>
          <p className="text-sm mb-3 text-[color:var(--color-foreground)] opacity-80">Superficies neutrales o alternativas.</p>
          <span className="button bg-secondary text-secondary-foreground" aria-label="Etiqueta informativa">Etiqueta</span>
        </div>

        {/* Accent: Realces/contexto (Visibilidad, Reconocimiento) */}
        <div className="component p-4 rounded-lg">
          <h4 className="mb-2">Accent (Realce)</h4>
          <p className="text-sm mb-3 text-[color:var(--color-foreground)] opacity-80">Resaltar estados o enlaces importantes.</p>
          <a className="button bg-accent text-accent-foreground" href="#" aria-label="Ir a detalle">Ver detalle</a>
        </div>
      </div>
    </section>
  )
}
