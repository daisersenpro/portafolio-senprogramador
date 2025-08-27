# 🚀 Portafolio Personal - Anyelo Bustos

Portafolio web moderno y responsivo para mostrar mi experiencia como **Analista Programador Full Stack Developer**. Desarrollado con tecnologías modernas y diseño profesional.

![Portafolio Preview](https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🌟 Características

- ✨ **Diseño Moderno**: Interfaz limpia con gradientes y efectos visuales
- 📱 **Totalmente Responsivo**: Optimizado para móviles, tablets y desktop
- 🎨 **Animaciones Suaves**: Efectos de hover, transiciones y micro-interacciones
- 🚀 **Rendimiento Optimizado**: Carga rápida y experiencia fluida
- 🎯 **SEO Optimizado**: Meta tags y estructura semántica
- 🌙 **Navegación Intuitiva**: Scroll suave entre secciones
- 📧 **Formulario de Contacto**: Integración con redes sociales y WhatsApp

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript 5.5.3** - Superset de JavaScript con tipado estático
- **Tailwind CSS 3.4.1** - Framework de CSS utilitario
- **Lucide React 0.344.0** - Biblioteca de iconos moderna y ligera

### Herramientas de Desarrollo
- **Vite 5.4.2** - Build tool y dev server ultra rápido
- **ESLint 9.9.1** - Linter para mantener código limpio
- **PostCSS 8.4.35** - Procesador de CSS
- **Autoprefixer 10.4.18** - Añade prefijos CSS automáticamente

### Configuración y Build
- **@vitejs/plugin-react 4.3.1** - Plugin oficial de React para Vite
- **typescript-eslint 8.3.0** - Reglas de ESLint para TypeScript

## 📁 Estructura del Proyecto

```
portafolio-anyelo/
├── public/                 # Archivos estáticos
│   └── vite.svg           # Favicon
├── src/                   # Código fuente
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   ├── index.css         # Estilos globales (Tailwind)
│   └── vite-env.d.ts     # Tipos de Vite
├── index.html            # Template HTML principal
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind
├── postcss.config.js     # Configuración de PostCSS
├── vite.config.ts        # Configuración de Vite
├── tsconfig.json         # Configuración de TypeScript
├── tsconfig.app.json     # Config TS para la app
├── tsconfig.node.json    # Config TS para Node
├── eslint.config.js      # Configuración de ESLint
└── README.md            # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/daisersenpro/portafolio-anyelo.git
cd portafolio-anyelo
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 📜 Scripts Disponibles

```bash
# Desarrollo - Inicia servidor de desarrollo
npm run dev

# Build - Construye la aplicación para producción
npm run build

# Preview - Previsualiza el build de producción
npm run preview

# Lint - Ejecuta ESLint para revisar el código
npm run lint
```

## 🎨 Personalización

### Colores y Tema
Los colores principales se definen en `tailwind.config.js` y se pueden personalizar:

```javascript
// Colores principales utilizados
- Azul: from-blue-600 to-purple-600
- Gradientes: bg-gradient-to-r, bg-gradient-to-br
- Grises: gray-50, gray-100, gray-900
```

### Contenido
El contenido principal se encuentra en `src/App.tsx`:

- **Información personal**: Variables al inicio del componente
- **Experiencia laboral**: Array `experiences`
- **Proyectos**: Array `projects`
- **Tecnologías**: Array `technologies`

### Imágenes
Las imágenes utilizan URLs de Pexels para optimizar el rendimiento:
- Cambiar URLs en el array `projects`
- Mantener dimensiones consistentes (800x600px recomendado)

## 🌐 Despliegue

### Netlify (Recomendado)

1. **Build del proyecto**
```bash
npm run build
```

2. **Configuración de Netlify**
- Build command: `npm run build`
- Publish directory: `dist`

3. **Deploy automático**
- Conectar repositorio de GitHub
- Netlify detectará automáticamente la configuración

### Otras Plataformas

**Vercel:**
```bash
npm run build
# Subir carpeta dist/
```

**GitHub Pages:**
```bash
npm run build
# Configurar GitHub Actions para deploy automático
```

## 📱 Secciones del Portafolio

### 🏠 Hero Section
- Presentación principal con gradiente animado
- Enlaces a redes sociales
- Call-to-action buttons

### 👨‍💻 Sobre Mí
- Información profesional
- Objetivos y experiencia
- Datos de contacto visual

### 🛠️ Tecnologías
- Grid responsivo de tecnologías
- Categorización por tipo (Frontend, Backend, Database, Tools)
- Efectos hover animados

### 💼 Experiencia
- Timeline vertical interactivo
- Detalles de cada posición laboral
- Tags de tecnologías utilizadas

### 🚀 Proyectos
- Grid de proyectos destacados
- Imágenes, descripciones y tecnologías
- Enlaces a GitHub y demos

### 📞 Contacto
- Formulario de contacto funcional
- Información de contacto directa
- Enlaces a redes sociales y WhatsApp

## 🔧 Configuración Avanzada

### Variables de Entorno
Crear archivo `.env` para configuraciones:

```env
VITE_EMAIL_SERVICE_ID=tu_service_id
VITE_EMAIL_TEMPLATE_ID=tu_template_id
VITE_EMAIL_PUBLIC_KEY=tu_public_key
```

### Optimizaciones de Rendimiento
- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Code Splitting**: Componentes divididos automáticamente
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: CSS y JS optimizados para producción

## 🐛 Solución de Problemas

### Problemas Comunes

**Error de dependencias:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problemas de TypeScript:**
```bash
npm run lint
# Revisar errores en consola
```

**Build fallido:**
```bash
npm run build -- --verbose
# Ver detalles del error
```

## 📈 Métricas y Analytics

Para añadir Google Analytics:

1. Instalar gtag
```bash
npm install gtag
```

2. Configurar en `main.tsx`
```typescript
import { gtag } from 'gtag'
gtag('config', 'GA_MEASUREMENT_ID')
```

## 🤝 Contribuciones

Si encuentras algún bug o tienes sugerencias:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Anyelo Bustos Galdames**
- 📧 Email: sen.programador@gmail.com
- 📱 WhatsApp: (+56) 949728928
- 💼 LinkedIn: [anyelo-b-84ab65147](https://linkedin.com/in/anyelo-b-84ab65147)
- 🐙 GitHub: [daisersenpro](https://github.com/daisersenpro)
- 📍 Ubicación: Santiago, La Reina, Chile

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐

*Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS*