# FactuIO Portal - Documentación

Sitio de documentación para FactuIO, el sistema de facturación verificada conforme a la normativa Verifactu de la AEAT.

## 📚 Contenido

- **Rol Tenant** - Guía para administradores del sistema
- **Rol Signer** - Documentación para firmantes de facturas
- **Uso de la API** - Referencia completa de la API REST

## 🚀 Configuración en GitHub Pages

### 1. Activar GitHub Pages

1. Ve a **Settings** > **Pages** en el repositorio
2. En **Source**, selecciona **Deploy from a branch**
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Haz clic en **Save**

### 2. Configurar el dominio (opcional)

Si quieres usar un dominio personalizado:

1. Ve a **Settings** > **Pages**
2. En **Custom domain**, introduce tu dominio
3. Añade el archivo `CNAME` con tu dominio:

```
docs.factuo.io
```

### 3. Verificar la publicación

La URL será: `https://bcntec.github.io/factuio-portal`

## 🛠️ Desarrollo Local

### Requisitos

- Ruby 2.7 o superior
- Bundler

### Instalación

```bash
# Instalar dependencias
gem install bundler jekyll

# Servir localmente
jekyll serve
```

### Ver en local

Abre: http://localhost:4000/factuio-portal/

## 📁 Estructura

```
factuio-portal/
├── _config.yml          # Configuración de Jekyll
├── _layouts/
│   └── default.html     # Layout principal
├── assets/
│   └── css/
│       └── style.scss   # Estilos personalizados
├── index.md             # Página de inicio
├── rol-tenant.md        # Doc: Rol Tenant
├── rol-signer.md        # Doc: Rol Signer
├── api-uso.md           # Doc: Uso de API
└── README.md            # Este archivo
```

## 📝 Actualizar documentación

1. Edita los archivos `.md` correspondientes
2. Commit y push a la rama main
3. GitHub Pages se actualizará automáticamente (puede tardar 1-2 minutos)

## 🔧 Personalización

### Cambiar colores

Edita las variables CSS en `assets/css/style.scss`:

```scss
:root {
    --primary-color: #2563eb;      // Azul principal
    --accent-color: #10b981;       // Verde éxito
    --bg-color: #ffffff;           // Fondo
    --text-color: #1e293b;         // Texto
}
```

### Añadir nuevas páginas

1. Crea un archivo `.md` nuevo
2. Añade el front matter:

```yaml
---
layout: default
title: Título de la página
---
```

3. Actualiza `_config.yml` para añadir a la navegación

## 📞 Soporte

- Email: soporte@bcntec.es
- Web: https://factuo.io
