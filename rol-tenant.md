---
layout: default
title: Rol Tenant - FactuIO
---

# 🏢 Rol Tenant

El **Tenant** es la entidad principal en FactuIO. Representa una organización o empresa que utiliza la plataforma para gestionar su facturación verificada.

<div class="callout info">
    <strong>Definición</strong><br>
    Un Tenant es el administrador principal que tiene control total sobre la configuración, 
    los signers (firmantes) y el acceso a la API.
</div>

---

## Responsabilidades del Tenant

| Área | Descripción |
|------|-------------|
| **Gestión de Signers** | Crear, modificar y desactivar firmantes autorizados |
| **API Keys** | Generar y revocar claves de API para acceso programático |
| **Configuración** | Definir parámetros globales del tenant |
| **Empresas** | Gestionar las empresas asociadas al tenant |
| **Webhooks** | Configurar notificaciones de eventos |

---

## Onboarding (Registro Inicial)

El proceso de registro de un nuevo Tenant incluye:

1. **Registro de cuenta** con email corporativo
2. **Verificación de identidad** de la empresa
3. **Configuración del certificado digital** para firma
4. **Alta en Verifactu** con la AEAT

```json
// Datos requeridos para el registro
{
  "company_name": "Mi Empresa S.L.",
  "nif": "B12345678",
  "email": "admin@miempresa.com",
  "address": {
    "street": "Calle Mayor 123",
    "city": "Madrid",
    "postal_code": "28001",
    "province": "Madrid"
  }
}
```

---

## Gestión de Signers

Los **Signers** son los usuarios autorizados para crear y firmar facturas. El Tenant es responsable de:

### Crear un Signer

<div class="endpoint">
    <span class="method post">POST</span> /api/signers
</div>

```json
{
  "email": "contable@miempresa.com",
  "first_name": "Juan",
  "last_name": "García",
  "phone": "+34612345678"
}
```

### Respuesta

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "contable@miempresa.com",
  "first_name": "Juan",
  "last_name": "García",
  "status": "PENDING_ACTIVATION",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Listar Signers

<div class="endpoint">
    <span class="method get">GET</span> /api/signers
</div>

---

## Gestión de API Keys

Para permitir el acceso programático, el Tenant debe crear API keys para cada Signer:

### Crear API Key

<div class="endpoint">
    <span class="method post">POST</span> /api/signers/{signer-id}/api-keys
</div>

```json
{
  "name": "Integración ERP"
}
```

### Respuesta (¡IMPORTANTE!)

<div class="callout warning">
    <strong>⚠️ Atención</strong><br>
    La API key completa solo se muestra UNA VEZ en la creación. 
    Guárdala de forma segura.
</div>

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Integración ERP",
  "fullKey": "factuio_sk_live_51H8m...a3B9",
  "keyPrefix": "factuio_sk_live_51H8m",
  "created_at": "2024-01-15T10:35:00Z"
}
```

### Formato de API Keys

| Prefijo | Entorno | Descripción |
|---------|---------|-------------|
| `factuio_sk_live_` | Producción | Para facturas reales |
| `factuio_sk_test_` | Pruebas | Para desarrollo y testing |

---

## Configuración del Tenant

### Webhooks

Configura URLs para recibir notificaciones de eventos:

```json
{
  "url": "https://miempresa.com/webhooks/factuio",
  "events": [
    "invoice.created",
    "invoice.signed",
    "invoice.submitted",
    "invoice.error"
  ],
  "secret": "whsec_tu_secreto_para_verificar"
}
```

### Eventos disponibles

| Evento | Descripción |
|--------|-------------|
| `invoice.created` | Se ha creado una nueva factura |
| `invoice.signed` | La factura ha sido firmada |
| `invoice.submitted` | La factura se ha enviado a la AEAT |
| `invoice.error` | Error en el proceso de facturación |
| `signer.activated` | Un signer ha activado su cuenta |

---

## Límites y Cuotas

| Concepto | Límite por defecto | Notas |
|----------|-------------------|-------|
| Signers activos | 10 | Ampliables contactando soporte |
| API keys por signer | 5 | - |
| Facturas/mes | 1,000 | Según plan contratado |
| Requests API/minuto | 100 | Rate limiting aplicado |

---

## Seguridad Recomendada

<div class="callout danger">
    <strong>🔒 Buenas prácticas</strong>
    <ul>
        <li>Rota las API keys periódicamente (cada 90 días recomendado)</li>
        <li>Usa API keys diferentes para cada integración/sistema</li>
        <li>Revoca inmediatamente las keys comprometidas</li>
        <li>Activa la verificación en dos pasos para acceso al portal</li>
        <li>Monitorea los logs de acceso regularmente</li>
    </ul>
</div>

---

## Flujo de Trabajo del Tenant

```
┌─────────────────────────────────────────────────────────────┐
│                      TENANT (Admin)                          │
├─────────────────────────────────────────────────────────────┤
│  1. Registro en FactuIO                                      │
│         │                                                    │
│         ▼                                                    │
│  2. Configurar empresa y certificado                        │
│         │                                                    │
│         ▼                                                    │
│  3. Crear Signers (firmantes)                               │
│         │                                                    │
│         ▼                                                    │
│  4. Generar API Keys para cada Signer                       │
│         │                                                    │
│         ▼                                                    │
│  5. Configurar webhooks (opcional)                          │
│         │                                                    │
│         ▼                                                    │
│  6. Los Signers pueden empezar a crear facturas             │
└─────────────────────────────────────────────────────────────┘
```

---

## Preguntas Frecuentes

**¿Puede un Tenant también ser Signer?**
No, los roles son excluyentes. El Tenant administra, los Signers operan.

**¿Cuántos Signers puedo crear?**
Depende de tu plan. El límite por defecto es 10, pero es ampliable.

**¿Puedo revocar una API key?**
Sí, desde el portal de administración o vía API.

**¿Qué pasa si pierdo una API key?**
Debes revocarla y crear una nueva. No podemos recuperarla por seguridad.
