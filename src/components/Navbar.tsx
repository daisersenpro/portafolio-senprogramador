import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand">
          <span className="navbar-brand-code">&lt;SenPro/&gt;</span>
          <span className="navbar-brand-dev">Dev</span>
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir o cerrar menú"
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
  )
}