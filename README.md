# JVSEOAGENCY - Sitio Web

Sitio web profesional para JVSEOAGENCY, desarrollado con Next.js 14 y Supabase.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos modernos
- **Supabase** para backend y base de datos
- **Panel de Administración** completo con autenticación
- **Gestión de Proyectos** (CRUD)
- **Sistema de Contactos** integrado
- Diseño responsive y moderno
- Componentes reutilizables

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Configuración de Supabase

### Paso 1: Ejecutar Script SQL

1. Ve al panel de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Ejecuta el contenido del archivo `supabase-setup.sql`

Este script creará:
- Tabla `contacts` para el formulario de contacto
- Tabla `projects` para gestionar proyectos
- Políticas de seguridad (RLS)
- Índices para optimización

### Paso 2: Crear Usuario Administrador

1. En el panel de Supabase, ve a **Authentication > Users**
2. Haz clic en **Add User** o **Invite User**
3. Crea un usuario con:
   - Email: tu email de administrador
   - Password: una contraseña segura
4. Guarda las credenciales para iniciar sesión en el panel admin

### Paso 3: Acceder al Panel de Administración

1. Ve a `http://localhost:3000/admin/login`
2. Inicia sesión con las credenciales creadas
3. Accede al dashboard en `/admin/dashboard`

## 🔐 Panel de Administración

El panel de administración incluye:

### Gestión de Contactos
- Ver todos los mensajes recibidos del formulario de contacto
- Información completa: nombre, email, teléfono, mensaje y fecha
- Tabla ordenada por fecha (más recientes primero)

### Gestión de Proyectos
- **Crear proyectos**: Agrega nuevos proyectos con título, descripción, imagen, tecnologías, URLs, etc.
- **Editar proyectos**: Modifica proyectos existentes
- **Eliminar proyectos**: Borra proyectos que ya no necesites
- **Proyectos destacados**: Marca proyectos como destacados para mostrarlos primero
- Los proyectos se muestran automáticamente en la sección pública del sitio

### Características del Panel
- Interfaz intuitiva y moderna
- Autenticación segura con Supabase Auth
- Protección de rutas (solo usuarios autenticados)
- Diseño responsive

## 📝 Estructura del Proyecto

```
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx      # Página de login
│   │   └── dashboard/
│   │       ├── layout.tsx    # Layout protegido
│   │       └── page.tsx       # Dashboard principal
│   ├── layout.tsx             # Layout principal con AuthProvider
│   ├── page.tsx               # Página de inicio
│   └── globals.css            # Estilos globales
├── components/
│   ├── Header.tsx             # Navegación
│   ├── Hero.tsx               # Sección hero
│   ├── Services.tsx           # Servicios
│   ├── About.tsx              # Sobre nosotros
│   ├── Projects.tsx           # Sección de proyectos (pública)
│   ├── Contact.tsx             # Formulario de contacto
│   └── Footer.tsx             # Pie de página
├── contexts/
│   └── AuthContext.tsx        # Contexto de autenticación
├── lib/
│   ├── supabase.ts            # Cliente Supabase (servidor)
│   ├── supabase-client.ts     # Cliente Supabase (cliente)
│   └── supabase-server.ts     # Cliente Supabase SSR
└── supabase-setup.sql          # Script SQL de configuración
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📝 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página de inicio
│   └── globals.css     # Estilos globales
├── components/
│   ├── Header.tsx      # Navegación
│   ├── Hero.tsx        # Sección hero
│   ├── Services.tsx    # Servicios
│   ├── About.tsx       # Sobre nosotros
│   ├── Contact.tsx     # Formulario de contacto
│   └── Footer.tsx      # Pie de página
└── lib/
    └── supabase.ts     # Cliente de Supabase
```

## 🎨 Personalización

Puedes personalizar los colores en `tailwind.config.js` y modificar el contenido en los componentes correspondientes.

## 🔧 Variables de Entorno

El proyecto está configurado con valores por defecto, pero puedes crear un archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tonuvghrtfiihwslcpze.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_aqui
```

## 📋 Funcionalidades del Panel Admin

### Ver Contactos
- Accede a la pestaña "Contactos" en el dashboard
- Visualiza todos los mensajes recibidos
- Información completa de cada contacto

### Gestionar Proyectos
1. **Crear**: Haz clic en "Nuevo Proyecto"
2. **Completar formulario**:
   - Título (requerido)
   - Descripción (requerida)
   - URL de imagen (opcional)
   - Tecnologías (separadas por comas)
   - URL del proyecto (opcional)
   - URL de GitHub (opcional)
   - Marcar como destacado (opcional)
3. **Editar**: Haz clic en "Editar" en cualquier proyecto
4. **Eliminar**: Haz clic en el icono de eliminar (con confirmación)

Los proyectos se muestran automáticamente en la sección "Proyectos" del sitio web público.

## 🚨 Solución de Problemas

### Error: "No se puede conectar a Supabase"
- Verifica que las credenciales en `lib/supabase.ts` sean correctas
- Asegúrate de que las tablas estén creadas ejecutando `supabase-setup.sql`

### Error al iniciar sesión
- Verifica que el usuario esté creado en Supabase Authentication
- Asegúrate de que el email y contraseña sean correctos

### Los proyectos no se muestran
- Verifica que la tabla `projects` exista en Supabase
- Comprueba las políticas RLS en Supabase
- Revisa la consola del navegador para errores

## 📄 Licencia

© 2024 JVSEOAGENCY. Todos los derechos reservados.

