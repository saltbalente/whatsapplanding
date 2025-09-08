# 🔮 WhatsApp Landing Page - Servicios Esotéricos

Una landing page moderna y elegante que simula una interfaz de WhatsApp para promocionar servicios esotéricos. Incluye chat interactivo, modales informativos, testimonios de clientes y integración completa con WhatsApp y llamadas telefónicas.

## ✨ Características Principales

- **Chat Simulado**: Interfaz que replica la experiencia de WhatsApp con mensajes predefinidos
- **Servicios Interactivos**: Modales detallados para cada servicio esotérico ofrecido
- **Galería de Testimonios**: Carrusel con testimonios reales de clientes
- **Integración WhatsApp**: Botones directos para contactar vía WhatsApp
- **Llamadas Directas**: Funcionalidad de llamadas telefónicas integrada
- **Google Tag Manager**: Seguimiento de conversiones implementado
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Animaciones Suaves**: Transiciones y efectos visuales atractivos

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos y elegantes
- **Zustand** - Gestión de estado ligera
- **React Router DOM** - Enrutamiento de aplicaciones

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/saltbalente/whatsapplanding.git

# Navegar al directorio
cd whatsapplanding

# Instalar dependencias
npm install
# o
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev

# El servidor estará disponible en http://localhost:5173
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter ESLint
- `npm run check` - Verifica tipos de TypeScript

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ChatHeader.tsx   # Cabecera del chat (con rutas de conversión)
│   ├── ChatInput.tsx    # Input de mensajes (con rutas de conversión)
│   ├── ConversionPage.tsx # Páginas de conversión con GTM tracking
│   ├── MessageBubble.tsx # Burbujas de mensajes
│   ├── ServiceDetail.tsx # Modales de servicios (con rutas de conversión)
│   ├── TestimoniosModal.tsx # Modal de testimonios
│   └── WhatsAppChat.tsx # Componente principal del chat (con rutas de conversión)
├── contexts/            # Contextos de React
├── data/               # Datos estáticos
├── hooks/              # Hooks personalizados
├── pages/              # Páginas de la aplicación
├── types/              # Definiciones de TypeScript
├── lib/                # Utilidades y helpers
├── gtm-conversion-config.json # Configuración GTM completa
├── gtm-conversion-config-corregido.json # Configuración GTM corregida
└── para-corregir.json  # Configuración GTM base
```

## 🎯 Funcionalidades Implementadas

### Chat Interactivo
- Simulación realista de conversación de WhatsApp
- Mensajes predefinidos con respuestas automáticas
- Indicadores de estado (enviado, entregado, leído)
- Scroll automático y animaciones suaves

### Servicios Esotéricos
- **Limpias Espirituales**: Información detallada y precios
- **Ayuda en el Amor**: Servicios de consultoría amorosa
- **Trabajos Especiales**: Rituales y ceremonias personalizadas
- Modales informativos con imágenes y descripciones

### Testimonios
- Galería interactiva de testimonios reales
- Navegación por carrusel
- Imágenes y textos de clientes satisfechos

### Integración de Contacto
- **WhatsApp**: +1 839-298-8226
- **Teléfono**: +1 (321)300-9113
- Botones con clase `conversionmarcada` para tracking

## 🎯 Sistema de Páginas de Conversión

### Funcionalidad Implementada

El proyecto incluye un sistema completo de páginas de conversión que permite el tracking preciso de todas las interacciones de contacto:

#### Rutas de Conversión
- `/conversion/whatsapp` - Página intermedia para contactos de WhatsApp
- `/conversion/call` - Página intermedia para llamadas telefónicas

#### Características del Sistema
- **Loading Profesional**: Spinner de 3 segundos con countdown
- **Redirección Automática**: A WhatsApp o teléfono después del tracking
- **Botón Manual**: Opción de "Continuar" como backup
- **UI Consistente**: Diseño esotérico con gradientes y efectos
- **Parámetros URL**: Captura número, mensaje y servicio

#### Flujo de Conversión
```
Usuario hace clic → Página Conversión (3s + GTM event) → Redirección → WhatsApp/Teléfono
```

## 📊 Google Tag Manager

El proyecto incluye Google Tag Manager integrado con ID: `GTM-PBT4LZRD`

### Eventos Implementados
- `conversion_whatsapp_click` - Disparado en páginas de conversión WhatsApp
- `conversion_call_click` - Disparado en páginas de conversión llamadas
- Datos capturados: timestamp, servicio, número, tipo de conversión

### Archivos GTM Incluidos
- `gtm-conversion-config.json` - Configuración completa para importar
- `gtm-conversion-config-corregido.json` - Versión corregida compatible
- `para-corregir.json` - Configuración base existente

### Configuración GTM
1. Importar `gtm-conversion-config-corregido.json` en Google Tag Manager
2. Configurar Google Ads ID (AW-730448291) si es necesario
3. Publicar la configuración
4. Las conversiones se trackearán automáticamente

- Seguimiento de conversiones en todos los botones de contacto
- Eventos personalizados para análisis de comportamiento
- Configuración lista para campañas de marketing digital

## 🌐 Despliegue en Vercel

### Despliegue Automático

1. Conecta tu repositorio de GitHub con Vercel
2. Vercel detectará automáticamente la configuración de Vite
3. El despliegue se realizará automáticamente en cada push

### Configuración Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

### Variables de Entorno

No se requieren variables de entorno adicionales para el funcionamiento básico.

## 📱 Optimizaciones

- **Performance**: Lazy loading de componentes
- **SEO**: Meta tags optimizados
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Mobile First**: Diseño responsivo desde móvil
- **Core Web Vitals**: Optimizado para métricas de Google

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Maestro Gabriel** - Servicios Esotéricos Profesionales

- 📱 WhatsApp: [+1 839-298-8226](https://wa.me/18392988226)
- ☎️ Teléfono: [+1 (321)300-9113](tel:+13213009113)
- 🌐 Web: [traeau4406oi-saludablebela-gmailcoms-projects.vercel.app](https://traeau4406oi-saludablebela-gmailcoms-projects.vercel.app)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!** ⭐
