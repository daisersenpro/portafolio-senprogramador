export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg hero-bg-one" aria-hidden="true" />
      <div className="hero-bg hero-bg-two" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-kicker">Desarrollo web a medida</p>
        <h1>Construyo soluciones que funcionan, se entienden y se ven bien.</h1>
        <p className="hero-description">
          Puedo trabajar con un estilo moderno o clásico según lo que necesites.
          Lo importante para mí es resolver problemas con una interfaz clara, útil y bien hecha.
        </p>
      </div>

      <div className="hero-visual" aria-label="Imagen principal del hero">
        <div className="hero-image-frame">
          <img src="/images/imagen-hero.png" alt="Escena de programación para el hero" />
        </div>
      </div>
    </section>
  )
}