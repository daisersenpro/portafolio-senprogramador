import { useEffect, useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shrink, setShrink] = useState(false)
  const [activeId, setActiveId] = useState('inicio')

  useEffect(() => {
    function onScroll() {
      setShrink(window.scrollY > 64)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['inicio', 'sobre', 'experiencia', 'tecnologias', 'proyectos', 'certificaciones', 'contacto']
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(id)
        })
      }, { threshold: 0.45 })
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  function handleLinkClick() {
    setMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${shrink ? 'navbar--shrink' : ''}`}>
      <div className="navbar-container">
        <a href="#inicio" className="navbar-brand">
          <span className="navbar-brand-code">&lt;SenPro/&gt;</span>
          <span className="navbar-brand-dev">Dev</span>
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir o cerrar menú"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
        >
          ☰
        </button>

        <ul id="primary-navigation" className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#inicio" className={activeId === 'inicio' ? 'active' : ''} onClick={handleLinkClick}>Inicio</a></li>
          <li><a href="#sobre" className={activeId === 'sobre' ? 'active' : ''} onClick={handleLinkClick}>Sobre Mí</a></li>
          <li><a href="#experiencia" className={activeId === 'experiencia' ? 'active' : ''} onClick={handleLinkClick}>Experiencia</a></li>
          <li><a href="#tecnologias" className={activeId === 'tecnologias' ? 'active' : ''} onClick={handleLinkClick}>Tecnologías</a></li>
          <li><a href="#proyectos" className={activeId === 'proyectos' ? 'active' : ''} onClick={handleLinkClick}>Proyectos</a></li>
          <li><a href="#certificaciones" className={activeId === 'certificaciones' ? 'active' : ''} onClick={handleLinkClick}>Certificaciones</a></li>
          <li><a href="#contacto" className={activeId === 'contacto' ? 'active' : ''} onClick={handleLinkClick}>Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}