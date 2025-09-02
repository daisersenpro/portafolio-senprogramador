import React, { useState, useEffect } from 'react';
import { Code, ChevronRight, Github, Linkedin, MessageSquare, ArrowUp } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // ========================================
  // ESTADOS PARA CARRUSEL DE CERTIFICACIONES
  // ========================================
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const projects = [
    // ========================================
    // 🥇 PROYECTOS PRIORITARIOS (PRIMEROS 5)
    // ========================================
    {
      title: "App web Full Stack RH - React & Spring Boot",
      description: "Desarrollé un sistema de Recursos Humanos, integrando componentes React, estilos Bootstrap, peticiones HTTP con AXIOS. En el backend, configuré controladores REST, probé con Postman, y usé JPA y Hibernate para la base de datos MySQL.",
      technologies: ["React JS", "Spring Boot", "Bootstrap", "Axios", "JPA", "Hibernate", "MySQL", "Postman"],
      image: "https://i.postimg.cc/HkxBsQr1/Ssitema-RRHH-1.png",
      github: "https://github.com/daisersenpro/proyectofullstackreact-springboot",
      demo: "",
      category: 'fullstack'
    },
    {
      title: "SenTagram - Clon de Instagram con Laravel 11",
      description: "Proyecto realizado con Laravel 11: un clon funcional de Instagram llamado SenTagram. Utiliza Tailwind CSS y Livewire para una interfaz moderna y dinámica.",
      technologies: ["Laravel 11", "Tailwind CSS", "Livewire"],
      image: "https://i.postimg.cc/8Czs6zzz/1728562485107.jpg",
      github: "https://github.com/daisersenpro/Sentagram",
      demo: "https://tigluzi.nyc.dom.my.id/login",
      category: 'backend'
    },
    {
      title: "Tarjeta de Crédito - Angular + .NET Core",
      description: "Aplicación para gestión de tarjetas de crédito creada con Angular, .NET Core, Entity Framework Core y SQL Server.",
      technologies: ["Angular", ".NET Core", "Entity Framework Core", "SQL Server"],
      image: "https://i.postimg.cc/tCZvKnDd/Angular-Tarjeta-Credito1.png",
      github: "https://github.com/daisersenpro/TarjetaCreditoAngNetcore",
      demo: "",
      category: 'fullstack'
    },
    {
      title: "Bienes Raíces CRUD - PHP + MySQL + Node.js",
      description: "Sistema completo de gestión de propiedades inmobiliarias desarrollado con PHP puro y MySQL en el backend. El frontend utiliza Node.js, Gulp y Sass para automatización y estilos modernos. Incluye CRUD completo de propiedades, autenticación de usuarios y panel administrativo.",
      technologies: ["PHP", "MySQL", "Node.js", "Gulp", "Sass", "JavaScript", "CRUD", "Authentication"],
      image: "https://i.postimg.cc/wMYdr84C/Bienes-Raices-Adomistrador-Crude.png",
      github: "",
      demo: "",
      category: 'fullstack'
    },
    {
      title: "Web para Restaurantes",
      description: "Web administrable y responsiva. Permite gestionar banners, menús, colaboradores, usuarios y testimonios. Los administradores acceden mediante un login seguro. Desarrollada con Bootstrap, PHP, MySQL, JavaScript y jQuery.",
      technologies: ["Bootstrap", "PHP", "MySQL", "JavaScript", "jQuery"],
      image: "https://i.postimg.cc/kgTTL1jT/web-restaurant-front-1.png",
      github: "https://github.com/daisersenpro/WebRestaurante",
      demo: "",
      category: 'backend'
    },
    
    // ========================================
    // 🎨 PROYECTOS FRONTEND/LANDING PAGES
    // ========================================
    {
      title: "Blog de Café - Web Estática",
      description: "El Blog de Café es un sitio web estático creado por Anyelo Bustos, un freelancer experimentado en diseño web. Utilizando HTML5 y CSS, se ha desarrollado un diseño receptivo y atractivo que se adapta a diferentes dispositivos. Incluye secciones de nosotros, cursos y contacto.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: "https://i.postimg.cc/0QpXs7ny/cafe1.png",
      github: "https://github.com/daisersenpro/blogCafe",
      demo: "https://magenta-longma-a77e91.netlify.app",
      category: 'frontend'
    },
    {
      title: "App de Presupuesto - Gestión Financiera",
      description: "Aplicación web para contabilidad de ingresos y egresos de presupuesto. Desarrollada con HTML, CSS y JavaScript vanilla, demuestra habilidades en desarrollo frontend puro, manejo de estado local y diseño responsivo.",
      technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Responsive Design"],
      image: "https://i.postimg.cc/Cx7CK9Dr/App-Presupuesto-1.png",
      github: "https://github.com/daisersenpro/AppPresupuesto",
      demo: "",
      category: 'frontend'
    },
    {
      title: "Festival de Música - Landing Page",
      description: "La Página Festival de Música fue creada por Anyelo Bustos, un freelancer experimentado. Utilicé SASS, Gulp, Node.js y JavaScript para lograr un diseño atractivo y eficiente. Es una web estática enfocada en estilos modernos.",
      technologies: ["SASS", "Gulp", "Node.js", "JavaScript"],
      image: "https://i.postimg.cc/xdQfvVCx/festival1.png",
      github: "https://github.com/daisersenpro/Web-FestivalMusica",
      demo: "https://dynamic-profiterole-e32f66.netlify.app",
      category: 'frontend'
    },
    {
      title: "FrontEndStore - Tienda de Camisetas Tecnológicas",
      description: "FrontEndStore es un sitio web estático para una tienda de camisetas con temática tecnológica. Desarrollado con HTML5 y CSS, presenta un diseño receptivo y atractivo que se adapta a diferentes dispositivos. Incluye páginas de productos, nosotros y un catálogo completo de camisetas con logos de tecnologías web.",
      technologies: ["HTML5", "CSS3", "Responsive Design", "Static Website", "E-commerce Design"],
      image: "https://i.postimg.cc/sgrK6JB3/Front-Store-4.png",
      github: "https://github.com/daisersenpro/FrontStoreSenPro",
      demo: "https://frontstoresenpro.netlify.app/",
      category: 'frontend'
    }
  ];

  // ========================================
  // DATOS DE CERTIFICACIONES
  // ========================================
  const certifications = [
    // ========================================
    // 🚀 BOOTCAMPS & DIPLOMADOS (MÁS IMPORTANTES)
    // ========================================
    {
      id: 1,
      title: "Bootcamp Full Stack Java",
      issuer: "Bootcamp",
      date: "2024",
      hours: 225,
      description: "Técnicas de desarrollo de aplicaciones Full Stack en Java",
      image: "https://i.postimg.cc/wTHYQLvT/18-T-cnicas-De-Desarrollo-De-Aplicaciones-Full-Stack-En-Java.jpg",
      category: "bootcamp"
    },
    {
      id: 2,
      title: "Diplomado en Programación de Software",
      issuer: "Diplomado",
      date: "2024",
      hours: 360,
      description: "Programación avanzada de software empresarial",
      image: "https://i.postimg.cc/fyVDnhGW/13-DIPLOMADO-EN-PROGRAMACI-N-DE-SOFTWARE.jpg",
      category: "diplomado"
    },
    {
      id: 3,
      title: "Diplomado en Programación y Desarrollo Web",
      issuer: "Diplomado",
      date: "2024",
      hours: 216,
      description: "Desarrollo de aplicaciones empresariales web y móvil",
      image: "https://i.postimg.cc/CKnG1Zbb/10-DIPLOMADO-EN-PROGRAMACI-N-Y-DESARROLLO-DE-APLICACIONES-EMPRESARIALES-WEB-Y-MOVIL.jpg",
      category: "diplomado"
    },
    {
      id: 4,
      title: "Diplomado en Análisis y Programación de BD",
      issuer: "Diplomado",
      date: "2024",
      hours: 144,
      description: "SQL Server, MySQL, Oracle, PL/SQL - Análisis completo de bases de datos",
      image: "https://i.postimg.cc/C1Lw78Jq/12-DIPLOMADO-EN-AN-LISIS-Y-PROGRAMACI-N-DE-BASE-DE-DATOS.jpg",
      category: "diplomado"
    },
    {
      id: 5,
      title: "Diplomado en Soporte Hardware y Redes",
      issuer: "Diplomado",
      date: "2024",
      hours: 162,
      description: "Soporte técnico en hardware y redes de datos corporativas",
      image: "https://i.postimg.cc/7P3N0TdV/8-DIPLOMADO-EN-SOPORTE-EN-HARDWARE-Y-REDES-DE-DATOS.jpg",
      category: "diplomado"
    },
    
    // ========================================
    // 💻 DESARROLLO WEB
    // ========================================
    {
      id: 6,
      title: "Desarrollo Web Full Stack para Restaurantes",
      issuer: "Udemy - Prof. Oscar Uh",
      date: "2024",
      hours: 9,
      description: "PHP puro, MySQL, Bootstrap y jQuery - Sistema completo para restaurantes",
      image: "https://i.postimg.cc/9Mc6Vj75/3-PHP-Sitio-web.jpg",
      category: "web"
    },
    {
      id: 7,
      title: "Desarrollo Web Front-End",
      issuer: "Universidad Desarrollo Web",
      date: "2024",
      hours: 30.5,
      description: "HTML, CSS, JavaScript avanzado - DOM, Flexbox, aplicaciones prácticas",
      image: "https://i.postimg.cc/gjJ1Xqsg/4-Frontend-Web.jpg",
      category: "web"
    },
    {
      id: 8,
      title: "jQuery desde Cero (Aprende Ajax)",
      issuer: "Udemy",
      date: "2024",
      hours: 6.5,
      description: "jQuery, AJAX, plugins y integración con PHP",
      image: "https://i.postimg.cc/9FPNmkcc/5-JQuery-Ajax.jpg",
      category: "web"
    },
    
    // ========================================
    // 🗄️ BASES DE DATOS
    // ========================================
    {
      id: 9,
      title: "Máster de SQL Server de Cero a Profesional",
      issuer: "Udemy",
      date: "2025",
      hours: 16,
      description: "T-SQL, funciones, procedimientos almacenados, diseño de BD, seguridad",
      image: "https://i.postimg.cc/QxMj1cVG/1-Master-SQL-Server.jpg",
      category: "database"
    },
    
    // ========================================
    // 🛠️ HERRAMIENTAS Y TECNOLOGÍAS
    // ========================================
    {
      id: 10,
      title: "Git y GitHub",
      issuer: "Udemy",
      date: "2025",
      hours: 12,
      description: "Control de versiones, repositorios, GitHub Pages, Wikis, Proyectos",
      image: "https://i.postimg.cc/QtbrWM3d/2-Git-Git-Hub.jpg",
      category: "tools"
    },
    {
      id: 11,
      title: "Linux Unhatched",
      issuer: "Linux Foundation",
      date: "2025",
      hours: 20,
      description: "Fundamentos de Linux y administración de sistemas",
      image: "https://i.postimg.cc/8PhP1TFs/15-linux-unhatched.png",
      category: "tools"
    },
    {
      id: 12,
      title: "Python Essentials",
      issuer: "Python Institute",
      date: "2024",
      hours: 25,
      description: "Fundamentos de Python y programación básica",
      image: "https://i.postimg.cc/wMDHTkjn/16-python-essentials.png",
      category: "tools"
    },
    
    // ========================================
    // 🖥️ DESARROLLO DE ESCRITORIO
    // ========================================
    {
      id: 13,
      title: "Sistema de Asistencias en C# y SQL Server",
      issuer: "Udemy",
      date: "2024",
      hours: 12.5,
      description: "Aplicación de escritorio en C# con base de datos SQL Server",
      image: "https://i.postimg.cc/d0g9mRJW/7-C-App-Escritorio.jpg",
      category: "desktop"
    },
    
    // ========================================
    // 💬 HABILIDADES BLANDAS
    // ========================================
    {
      id: 14,
      title: "Soporte Técnico en Entornos Corporativos",
      issuer: "Udemy",
      date: "2024",
      hours: 10.5,
      description: "Gestión de tecnología en PYMES, redes y soporte técnico",
      image: "https://i.postimg.cc/ZKLVtyLR/6-Soporte-Tecnico.jpg",
      category: "soft-skills"
    },
    {
      id: 15,
      title: "Desarrollo de Habilidades de Comunicación Efectiva",
      issuer: "Udemy",
      date: "2024",
      hours: 8,
      description: "Comunicación efectiva en entornos profesionales",
      image: "https://i.postimg.cc/DydF95DX/17-Desarrollo-de-Habilidades-de-Comunicaci-n-Efectiva.jpg",
      category: "soft-skills"
    },
    
    // ========================================
    // 📚 PROGRAMACIÓN Y ANÁLISIS
    // ========================================
    {
      id: 16,
      title: "Diplomado en Programación y Análisis de Software",
      issuer: "Diplomado",
      date: "2024",
      hours: 216,
      description: "Análisis y programación avanzada de software",
      image: "https://i.postimg.cc/sXNCJNvk/14-DIPLOMADO-EN-PROGRAMACI-N-Y-AN-LISIS-DE-SOFTWARE.jpg",
      category: "programming"
    }
  ];

  // ========================================
  // EFECTOS (Código que se ejecuta automáticamente)
  // ========================================
  useEffect(() => {
    // Función que se ejecuta cada vez que el usuario hace scroll
    const handleScroll = () => {
      setScrollY(window.scrollY); // Guarda la posición del scroll
      setShowScrollTop(window.scrollY > 400); // Muestra botón "arriba" después de 400px
    };

    // Agregamos el "escuchador" de scroll a la ventana
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar EmailJS (para el formulario de contacto)
    emailjs.init('BEYaZz0Xdj3ql8OHW');
    
    // Limpiamos el escuchador cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ========================================
  // EFECTO PARA ROTACIÓN AUTOMÁTICA DEL CARRUSEL
  // ========================================
  useEffect(() => {
    // Timer para rotación automática cada 7 segundos
    const interval = setInterval(() => {
      const maxIndex = Math.ceil(certifications.length / 4) - 1;
      setCurrentCertIndex((prev) => 
        prev >= maxIndex ? 0 : prev + 1
      );
    }, 7000);

    // Limpiamos el timer cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [certifications.length]);

  // ========================================
  // FUNCIONES DE NAVEGACIÓN
  // ========================================
  
  // Función para ir a una sección específica de la página
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Scroll suave
    }
  };

  // Función para volver al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ========================================
  // FUNCIONES DEL FORMULARIO
  // ========================================
  
  // Función que se ejecuta cada vez que el usuario escribe en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Crear mensaje para WhatsApp
      const whatsappMessage = `Hola Anyelo! 

Tienes un nuevo mensaje de contacto desde tu portafolio:

👤 *Nombre:* ${formData.name}
📧 *Email:* ${formData.email}
💬 *Mensaje:* ${formData.message}

---
Enviado desde tu portafolio web`;

      // Codificar el mensaje para la URL de WhatsApp
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/56949728928?text=${encodedMessage}`;

      // Abrir WhatsApp Web
      window.open(whatsappUrl, '_blank');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error al procesar formulario:', error);
      setSubmitStatus('error');
      
      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // FUNCIONES PARA CARRUSEL DE CERTIFICACIONES
  // ========================================

  // Función para ir a la siguiente página de certificaciones
  const nextCert = () => {
    const maxIndex = Math.ceil(certifications.length / 4) - 1;
    setCurrentCertIndex((prev) => 
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  // Función para ir a la página anterior de certificaciones
  const prevCert = () => {
    const maxIndex = Math.ceil(certifications.length / 4) - 1;
    setCurrentCertIndex((prev) => 
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  // Función para ir a una página específica
  const goToCert = (index: number) => {
    setCurrentCertIndex(index);
  };

  // Función para abrir el modal de certificación
  const openCertModal = (cert: any) => {
    setSelectedCert(cert);
    setShowCertModal(true);
  };

  // Función para cerrar el modal
  const closeCertModal = () => {
    setShowCertModal(false);
    setSelectedCert(null);
  };

  // ========================================
  // INTERFAZ VISUAL (JSX) - LO QUE VE EL USUARIO
  // ========================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======================================== */}
      {/* NAVEGACIÓN PRINCIPAL */}
      {/* ======================================== */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Nombre */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Anyelo Bustos
            </div>
            
            {/* Menú de Navegación - Solo visible en pantallas medianas y grandes */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('inicio')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('sobre-mi')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Sobre Mí
              </button>
              <button
                onClick={() => scrollToSection('experiencia')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Experiencia
              </button>
              <button
                onClick={() => scrollToSection('tecnologias')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Tecnologías
              </button>
              <button
                onClick={() => scrollToSection('proyectos')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Proyectos
              </button>
              <button
                onClick={() => scrollToSection('certificaciones')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Certificaciones
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className={`transition-colors font-medium ${
                  scrollY > 50 ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'
                }`}
              >
                Contacto
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2 p-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => { scrollToSection('inicio'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Inicio
                </button>
                <button
                  onClick={() => { scrollToSection('sobre-mi'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Sobre Mí
                </button>
                <button
                  onClick={() => { scrollToSection('experiencia'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Experiencia
                </button>
                <button
                  onClick={() => { scrollToSection('tecnologias'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Tecnologías
                </button>
                <button
                  onClick={() => { scrollToSection('proyectos'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Proyectos
                </button>
                <button
                  onClick={() => { scrollToSection('certificaciones'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Certificaciones
                </button>
                <button
                  onClick={() => { scrollToSection('contacto'); setShowMobileMenu(false); }}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  Contacto
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-200 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <Code size={48} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Anyelo Bustos</span>
            <span className="text-3xl md:text-4xl font-normal text-blue-200">Galdames</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Analista Programador | Full-Stack Developer
          </p>
          <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
            Desarrollador full stack con experiencia en aplicaciones web y de escritorio, 
            especializado en crear soluciones eficientes y escalables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('proyectos')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              Ver Proyectos
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre Mí</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Analista Programador con experiencia en desarrollo de aplicaciones de escritorio (VB.NET, C#, .NET Core), aplicaciones web modernas con React y Angular (SPA) y creación de landing pages. Conocimiento en SQL Server, PostgreSQL, Git y entornos con PHP y MySQL/MariaDB (XAMPP, Workbench).<br/>
              Experiencia en Laravel, Java (Spring Boot), Node.js y pruebas de integración en Tomcat. Manejo de consumo y creación de APIs RESTful. Conocimientos en pruebas de automatización con Maven, CI/CD y entornos de despliegue. Me mantengo en constante aprendizaje y crecimiento profesional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mi Enfoque</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Busco consolidarme como un desarrollador full stack sólido y versátil, aportando soluciones eficientes, 
                escalables y de calidad. Me mantengo en constante aprendizaje, perfeccionando mis habilidades técnicas 
                y adaptándome a nuevas tecnologías para entregar siempre lo mejor.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Desarrollo Frontend con React, Angular y tecnologías web modernas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Backend con Java, PHP, C#, Python y frameworks como Spring Boot, .NET Framework, .NET Core y Laravel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Bases de datos SQL Server, MySQL, Oracle y MariaDB</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Control de versiones con Git, GitHub y Git Server</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">Información Personal</h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-900">Título:</span>
                  <p className="text-gray-600">Analista Programador (2022)</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Ubicación:</span>
                  <p className="text-gray-600">Santiago, La Reina, Chile</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Email:</span>
                  <p className="text-gray-600">sen.programador@gmail.com</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Teléfono:</span>
                  <p className="text-gray-600">(+56) 949728928</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experiencia Laboral</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mi trayectoria profesional en desarrollo de software
            </p>
          </div>
          
          <div className="space-y-8">
            {/* San Jorge Packaging */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Programador Full Stack</h3>
                  <p className="text-lg text-blue-600 font-semibold">San Jorge Packaging</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Agosto 2024 – Junio 2025
                </div>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Desarrollo de aplicaciones de escritorio en .NET Framework 4.8 con VB.NET, siguiendo requerimientos específicos del negocio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Creación de FFReport, un sistema para la medición de gases que incluyó módulos de reportes, gestión de rutas, rendición de gastos, calendario de planificación y consumo de API Key de Google Maps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Diseño y desarrollo de procedimientos almacenados y creación de tablas en SQL Server.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Implementación de control de versiones mediante Bonobo con Git Server, ya que la empresa no contaba con un sistema de gestión de código.</span>
                </li>
              </ul>
            </div>

            {/* Freelancer */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Desarrollador Web - Freelancer</h3>
                  <p className="text-lg text-blue-600 font-semibold">Independiente</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Noviembre 2023 – Junio 2024
                </div>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Desarrollo de sitios web personalizados para clientes: Alcanza tu Estrella (ONG), Urbanos Delux (eventos artísticos), Gourmet Restaurant (restaurantes), pymes y emprendedores. Creación de landing pages con HTML, CSS, Bootstrap y Tailwind CSS. Backend en PHP puro y Laravel. Gestión de bases de datos MySQL/MariaDB y uso de entornos locales con XAMPP.</span>
                </li>
                <li className="flex items-start gap-2">
                </li>
              </ul>
            </div>

            {/* ITPS Gestión */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Programador de Aplicaciones</h3>
                  <p className="text-lg text-blue-600 font-semibold">ITPS Gestión</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Enero 2023 – Junio 2023
                </div>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Desarrollo de componentes en Angular, SQL Server y C# para el cliente Certhia, enfocado en la actualización y mejora del sistema según nuevos requerimientos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Implementación de mejoras funcionales y optimización de rendimiento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Documentación de procedimientos almacenados, estilos y flujos de trabajo para asegurar la trazabilidad y mantenimiento del sistema.</span>
                </li>
              </ul>
            </div>

            {/* WOM Chile */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Analista Programador Trainer</h3>
                  <p className="text-lg text-blue-600 font-semibold">WOM Chile</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Enero 2022 – Marzo 2022
                </div>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Participación en la elaboración de informes con Power BI y gestión de datos en Oracle para el área de Customer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Mejora de interfaces de usuario en el programa CCWON empleando PHP, Bootstrap, MySQL y entornos locales con XAMPP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Colaboración en la optimización de la experiencia de usuario y en la integración de datos para facilitar la toma de decisiones.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tecnologías</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utilizo las tecnologías más modernas y eficientes para crear aplicaciones de alta calidad
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform cursor-pointer group relative z-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Frontend</h3>
              <div className="space-y-2">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">React</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">Angular</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">HTML</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">CSS</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">TypeScript</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">Tailwind CSS</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-blue-200 transition-colors">Bootstrap</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform cursor-pointer group relative z-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">Backend</h3>
              <div className="space-y-2">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">Java</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">Spring Boot</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">PHP</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">Laravel</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">C#</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">.NET Framework</span>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">.NET Core</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">VB.NET</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">Python</span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-green-200 transition-colors">Node.js</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform cursor-pointer group relative z-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">Base de Datos</h3>
              <div className="space-y-2">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-purple-200 transition-colors">MySQL</span>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-purple-200 transition-colors">PostgreSQL</span>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-purple-200 transition-colors">SQL Server</span>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 group-hover:bg-purple-200 transition-colors">Oracle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mis Proyectos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aquí puedes ver algunos de los proyectos más destacados en los que he trabajado
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform cursor-pointer group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs group-hover:bg-blue-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors group-hover:scale-105 transform"
                    >
                      GitHub
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors group-hover:scale-105 transform"
                      >
                        Demo
                    </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* SECCIÓN DE CERTIFICACIONES */}
      {/* ======================================== */}
      <section id="certificaciones" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 Mis Certificaciones</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 1,500 horas de formación profesional en desarrollo web, bases de datos y tecnologías modernas
            </p>
          </div>

          {/* ======================================== */}
          {/* CARRUSEL DE CERTIFICACIONES */}
          {/* ======================================== */}
          <div className="relative">
            {/* Botones de navegación */}
            <button
              onClick={prevCert}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextCert}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contenedor del carrusel */}
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentCertIndex * 100}%)` }}>
                {/* Generar páginas de 4 certificaciones cada una */}
                {Array.from({ length: Math.ceil(certifications.length / 4) }, (_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {certifications.slice(pageIndex * 4, (pageIndex + 1) * 4).map((cert) => (
                        <div key={cert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group" onClick={() => openCertModal(cert)}>
                          {/* Imagen de la certificación */}
                          <div className="relative h-40 bg-gradient-to-br from-blue-50 to-indigo-100">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Overlay con información */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-2 left-2 right-2 text-white">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="bg-blue-600 text-white px-1 py-0.5 rounded-full text-xs font-medium">
                                    {cert.hours}h
                                  </span>
                                  <span className="bg-white/20 backdrop-blur-sm text-white px-1 py-0.5 rounded-full text-xs">
                                    {cert.date}
                                  </span>
                                </div>
                                <h3 className="text-xs font-bold mb-1 line-clamp-2">{cert.title}</h3>
                                <p className="text-xs text-blue-200">{cert.issuer}</p>
                              </div>
                            </div>
                          </div>

                          {/* Contenido de la tarjeta */}
                          <div className="p-4">
                            {/* Categoría */}
                            <div className="mb-2">
                              <span className={`inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium ${
                                cert.category === 'bootcamp' ? 'bg-purple-100 text-purple-800' :
                                cert.category === 'diplomado' ? 'bg-green-100 text-green-800' :
                                cert.category === 'web' ? 'bg-blue-100 text-blue-800' :
                                cert.category === 'database' ? 'bg-orange-100 text-orange-800' :
                                cert.category === 'tools' ? 'bg-indigo-100 text-indigo-800' :
                                cert.category === 'desktop' ? 'bg-red-100 text-red-800' :
                                cert.category === 'soft-skills' ? 'bg-pink-100 text-pink-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {cert.category === 'bootcamp' ? '🚀' :
                                 cert.category === 'diplomado' ? '🎓' :
                                 cert.category === 'web' ? '💻' :
                                 cert.category === 'database' ? '🗄️' :
                                 cert.category === 'tools' ? '🛠️' :
                                 cert.category === 'desktop' ? '🖥️' :
                                 cert.category === 'soft-skills' ? '💬' :
                                 '📚'}
                              </span>
                            </div>

                            {/* Título */}
                            <h3 className="text-sm font-semibold mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {cert.title}
                            </h3>

                            {/* Descripción */}
                            <p className="text-xs text-gray-600 line-clamp-3 mb-3">{cert.description}</p>

                            {/* Información adicional */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="truncate">{cert.issuer}</span>
                              <span className="text-blue-600 font-medium">+</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores de posición */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(certifications.length / 4) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToCert(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCertIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ======================================== */}
          {/* RESUMEN ESTADÍSTICAS */}
          {/* ======================================== */}
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{certifications.length}</div>
              <div className="text-gray-600">Certificaciones</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {certifications.reduce((total, cert) => total + cert.hours, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Horas Totales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {certifications.filter(cert => cert.category === 'bootcamp' || cert.category === 'diplomado').length}
              </div>
              <div className="text-gray-600">Diplomados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {certifications.filter(cert => cert.category === 'web' || cert.category === 'database').length}
              </div>
              <div className="text-gray-600">Tecnologías</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ¿Te gustaría trabajar juntos? ¡No dudes en contactarme!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Información de Contacto</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ubicación</h4>
                  <p className="text-gray-600">Santiago, La Reina, Chile</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <a href="mailto:sen.programador@gmail.com" className="text-blue-600 hover:text-blue-800">
                    sen.programador@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Teléfono</h4>
                  <a href="tel:+56949728928" className="text-blue-600 hover:text-blue-800">
                    (+56) 949728928
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Sígueme en:</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/daisersenpro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/anyelo-b-84ab65147" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://wa.me/56949728928" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageSquare size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu mensaje..."
                  ></textarea>
                </div>
                
                {/* Estado del envío */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ¡Mensaje procesado! Se abrirá WhatsApp con tu mensaje. Solo presiona enviar.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Procesando...' : 'Enviar por WhatsApp'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Anyelo Bustos
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Analista Programador Full Stack Developer especializado en crear soluciones 
                web innovadoras y eficientes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2">
                {[
                  { name: 'Sobre Mí', id: 'sobre-mi' },
                  { name: 'Experiencia', id: 'experiencia' },
                  { name: 'Tecnologías', id: 'tecnologias' },
                  { name: 'Proyectos', id: 'proyectos' },
                  { name: 'Certificaciones', id: 'certificaciones' },
                  { name: 'Contacto', id: 'contacto' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <p>Santiago, La Reina, Chile</p>
                <a href="mailto:sen.programador@gmail.com" className="block hover:text-white transition-colors">
                  sen.programador@gmail.com
                </a>
                <a href="tel:+56949728928" className="block hover:text-white transition-colors">
                  (+56) 949728928
                </a>
              </div>

              <div className="flex gap-4 mt-6">
                <a 
                  href="https://github.com/daisersenpro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/anyelo-b-84ab65147" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://wa.me/56949728928" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Anyelo Bustos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* ======================================== */}
      {/* MODAL DE CERTIFICACIÓN */}
      {/* ======================================== */}
      {showCertModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeCertModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header del modal */}
            <div className="relative">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeCertModal}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 hover:text-red-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {selectedCert.hours}h
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {selectedCert.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
                  <p className="text-lg text-blue-200">{selectedCert.issuer}</p>
                </div>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Categoría */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCert.category === 'bootcamp' ? 'bg-purple-100 text-purple-800' :
                  selectedCert.category === 'diplomado' ? 'bg-green-100 text-green-800' :
                  selectedCert.category === 'web' ? 'bg-blue-100 text-blue-800' :
                  selectedCert.category === 'database' ? 'bg-orange-100 text-orange-800' :
                  selectedCert.category === 'tools' ? 'bg-indigo-100 text-indigo-800' :
                  selectedCert.category === 'desktop' ? 'bg-red-100 text-red-800' :
                  selectedCert.category === 'soft-skills' ? 'bg-pink-100 text-pink-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedCert.category === 'bootcamp' ? '🚀 Bootcamp' :
                   selectedCert.category === 'diplomado' ? '🎓 Diplomado' :
                   selectedCert.category === 'web' ? '💻 Desarrollo Web' :
                   selectedCert.category === 'database' ? '🗄️ Base de Datos' :
                   selectedCert.category === 'tools' ? '🛠️ Herramientas' :
                   selectedCert.category === 'desktop' ? '🖥️ Escritorio' :
                   selectedCert.category === 'soft-skills' ? '💬 Habilidades Blandas' :
                   '📚 Programación'}
                </span>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h4>
                <p className="text-gray-600 leading-relaxed">{selectedCert.description}</p>
              </div>

              {/* Detalles */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Institución</h5>
                  <p className="text-gray-900">{selectedCert.issuer}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Duración</h5>
                  <p className="text-gray-900">{selectedCert.hours} horas</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Año</h5>
                  <p className="text-gray-900">{selectedCert.date}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">ID</h5>
                  <p className="text-gray-900">#{selectedCert.id}</p>
                </div>
              </div>

              {/* Botón de cerrar */}
              <div className="flex justify-end">
                <button
                  onClick={closeCertModal}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-40"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;