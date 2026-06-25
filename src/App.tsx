import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#inicio">Saltar al contenido</a>
      <Navbar />
      <Hero />
      <About />
    </>
  )
}
