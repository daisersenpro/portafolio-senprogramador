export default function About() {
  return (
    <section id="sobre" className="about">
      <div className="about-inner">
        <h2 className="section-title">Sobre Mí</h2>

        <div className="about-grid">
          <article className="about-card about-card--text">
            <div className="about-header">
              <p className="lead">
                Analista Programador con más de 3 años de experiencia en desarrollo
                y mantención de aplicaciones web y de escritorio.
              </p>
            </div>

            <p>
              Trabajo en backend, frontend, integración con bases de datos y
              mantención de sistemas productivos, entregando soluciones adaptadas a
              las necesidades del negocio. He colaborado con San Jorge Packaging,
              Calper, ITPS y WOM, además de proyectos de consultoría.
            </p>

            <p>
              También tengo experiencia en administración y soporte de ServiceNow
              para gestión de servicios TI y automatización de procesos. Mi enfoque
              está en código mantenible, pruebas y despliegues confiables.
            </p>

            
          </article>

          <aside className="about-card about-card--tech" aria-label="Tecnologías principales">
            <h3>Tecnologías principales</h3>
            <div className="tech-list">
              {['C#', 'VB.NET', 'PHP', 'Laravel', 'JavaScript', 'Angular', 'Node.js', 'React', 'Java (Spring Boot)', 'SQL Server', 'MySQL', 'PostgreSQL', 'Git', 'ServiceNow'].map((t) => (
                <span key={t} className="tech-chip">
                  <svg className="chip-icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path fill="currentColor" d="M12 2L4 7v10l8 5 8-5V7l-8-5zM7.5 9.5L12 12l4.5-2.5L12 7 7.5 9.5z" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
