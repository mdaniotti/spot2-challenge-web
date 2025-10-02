# Spot2 URL Shortener Frontend

Interfaz de usuario moderna para el acortador de URLs construida con React 18, TypeScript y TailwindCSS. Proporciona una experiencia de usuario intuitiva para crear, gestionar y monitorear URLs cortas.

## 📋 Características

- ✅ **Interfaz moderna** con TailwindCSS
- ✅ **TypeScript** para type safety
- ✅ **Responsive design** móvil-first
- ✅ **Formulario inteligente** con validación
- ✅ **Lista de URLs** con estadísticas
- ✅ **Notificaciones toast** con notistack
- ✅ **Manejo de errores** robusto
- ✅ **Loading states** y feedback visual
- ✅ **Iconos Lucide** consistentes
- ✅ **Routing** con React Router

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework CSS
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Notistack** - Notificaciones
- **Lucide React** - Iconos

## 🚀 Instalación Rápida

### Pre-requisitos

- Node.js 18+
- npm o yarn
- API backend ejecutándose

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_ENV=development
VITE_APP_DEBUG=true
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

### 4. Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:8000 (debe estar ejecutándose)

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ErrorBoundary.tsx # Manejo de errores
│   ├── Header.tsx        # Header de la aplicación
│   ├── Loader.tsx        # Componente de carga
│   ├── Logo.tsx          # Logo de la marca
│   ├── UrlForm.tsx       # Formulario de creación
│   └── UrlList.tsx       # Lista de URLs
├── pages/                # Páginas de la aplicación
│   ├── CreateUrlPage.tsx # Página de creación
│   ├── LayoutPage.tsx    # Layout principal
│   ├── RedirectPage.tsx  # Página de redirección
│   ├── UrlDetailsPage.tsx# Detalles de URL
│   └── UrlListPage.tsx   # Lista de URLs
├── hooks/                # Custom hooks
│   └── useApi.ts         # Hook para llamadas API
├── types/                # Definiciones TypeScript
│   └── Url.ts            # Tipos de URL
├── utils/                # Utilidades
│   └── index.ts          # Funciones helper
├── constants/            # Constantes
│   └── index.ts          # Configuraciones
├── App.tsx               # Componente principal
├── routes.tsx            # Configuración de rutas
└── index.css             # Estilos globales
```

## 🎯 Funcionalidades Detalladas

### 📝 Formulario de Creación

- **Validación en tiempo real** de URLs
- **Feedback visual** inmediato
- **Manejo de errores** específicos
- **Loading state** durante creación
- **Notificaciones** de éxito/error

### 📊 Lista de URLs

- **Vista de tabla** responsive
- **Estadísticas de clics** en tiempo real
- **Indicadores de expiración**
- **Acciones rápidas** (copiar, eliminar, ver)

## 🔧 Comandos Útiles

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

### Calidad de Código

```bash
# Linter
npm run lint

# Linter con fix automático
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

## 🎨 Estilos y Theming

### TailwindCSS Configuración

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

### Clases CSS Personalizadas

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }

  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Build y Despliegue

### Variables de Entorno

```env
# Desarrollo
VITE_API_URL=http://localhost:8000/api
VITE_APP_ENV=development

# Producción
VITE_API_URL=https://api.tu-dominio.com/api
VITE_APP_ENV=production
```

### Build para Producción

```bash
# Build optimizado
npm run build

# El build se genera en /dist
# Contenido estático listo para servir
```

### Despliegue en AWS

???

## 🔒 Seguridad

### Medidas Implementadas

- **Sanitización** de inputs
- **Validación** client-side
- **HTTPS** en producción
- **CSP headers** configurados
- **XSS protection** habilitado

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. API no responde

```bash
# Verificar que la API esté ejecutándose
curl http://localhost:8000/api/urls

# Verificar variables de entorno
echo $VITE_API_URL
```

#### 2. Build falla

```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install

# Verificar TypeScript
npx tsc --noEmit
```

#### 3. Estilos no cargan

```bash
# Verificar TailwindCSS
npm run build
# Revisar que no haya errores en la consola
```

#### 4. Routing no funciona

```bash
# Verificar configuración de servidor
# Asegurar que todas las rutas redirijan a index.html
```

## 🔄 CI/CD

### GitHub Actions

```yaml
name: Frontend CI/CD
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Build
        run: npm run build
```

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Guías de Contribución

- **Código**: Sigue las convenciones de TypeScript
- **Estilos**: Usa TailwindCSS consistentemente
- **Testing**: Agrega tests para nuevas funcionalidades
- **Commits**: Usa conventional commits

## 📄 Licencia

MIT License - Ver archivo `LICENSE` para detalles.

## 🆘 Soporte

- **Issues**: GitHub Issues
- **Documentación**: Este README
- **API Docs**: http://localhost:8000/api/documentation
