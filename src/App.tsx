import { useState } from 'react'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-brand">
            My<span>Dev</span>
          </a>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <ul className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#inicio" className="active">Inicio</a></li>
            <li><a href="#sobre">Sobre Mí</a></li>
            <li><a href="#experiencia">Experiencia</a></li>
            <li><a href="#tecnologias">Tecnologías</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#certificaciones">Certificaciones</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1>Bienvenido</h1>
        <p>Sección de prueba... iremos construyendo sección por sección</p>
      </section>
    </>
  )
}
