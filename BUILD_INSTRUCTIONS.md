# Conversión a Bootstrap 5.3 - Portafolio Anyelo Bustos

## Estado Actual
- ✅ Bootstrap 5.3.3 instalado
- ✅ Sass instalado
- ✅ Tema corporativo personalizado creado (`bootstrap-custom.scss`)
-  ✅ archivo `main.tsx` actualizado para usar Bootstrap

## Pasos de Conversión

### 1. Estructura General (Bootstrap Grid System)
- Tailwind: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Bootstrap: `container` o `container-fluid`

### 2. Clases de Espaciado
- Tailwind: `py-20`, `px-4`, `mb-6`
- Bootstrap: `py-5`, `px-3`, `mb-4`

### 3. Sistema de Grid
- Tailwind: `grid md:grid-cols-2 gap-8`
- Bootstrap: `row g-4` + `col-md-6`

### 4. Botones
- Tailwind: clases personalizadas `btn-hero-primary`
- Bootstrap: `btn btn-primary`, `btn btn-outline-primary`

### 5. Cards
- Tailwind: `rounded-xl shadow-lg`
- Bootstrap: `card`, `card-body`, `shadow-lg`

### 6. Navbar
- Tailwind: `fixed top-0 w-full z-50`
- Bootstrap: `navbar navbar-expand-lg fixed-top`

### 7. Utilidades de Texto
- Tailwind: `text-4xl`, `text-center`, `font-bold`
- Bootstrap: `display-4`, `text-center`, `fw-bold`

### 8. Colores y Temas
- Todos los colores personalizados están en `bootstrap-custom.scss`
- Variables CSS para modo oscuro: `[data-theme="dark"]`

## Próximos Pasos
1. Convertir secciones del App.tsx una por una
2. Probar cada sección en el navegador
3. Ajustar estilos según sea necesario
4. Optimizar imágenes (migrar de postimg.cc a local)
