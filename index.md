---
layout: default
title: FactuIO - Documentación
---

<div class="hero">
    <h1>📄 FactuIO</h1>
    <p class="lead">
        Sistema de facturación verificada conforme al Registro de Facturación 
        de la AEAT (Verifactu). Gestiona tus facturas de forma segura y cumpliendo 
        con la normativa vigente.
    </p>
</div>

## ¿Qué es FactuIO?

**FactuIO** es una plataforma completa para la gestión de facturas verificadas según la normativa **Verifactu** de la Agencia Estatal de Administración Tributaria (AEAT).

La plataforma permite:

- **Crear y gestionar facturas** con firma electrónica garantizada
- **Enviar automáticamente** los registros a la AEAT
- **Gestionar múltiples empresas** bajo una misma cuenta
- **Integrar vía API** con tus sistemas existentes
- **Cumplir con la normativa** sin complicaciones técnicas

---

## Arquitectura de Roles

FactuIO utiliza un modelo de roles jerárquico que permite separar las responsabilidades de administración y operación:

<div class="cards-grid">
    <div class="feature-card">
        <div class="icon">🏢</div>
        <h3>Rol Tenant</h3>
        <p>Administrador principal que gestiona signers, API keys y la configuración global del tenant.</p>
        <a href="{{ '/rol-tenant/' | relative_url }}">Ver documentación →</a>
    </div>
    <div class="feature-card">
        <div class="icon">✍️</div>
        <h3>Rol Signer</h3>
        <p>Firmante autorizado para crear y firmar facturas en nombre de una empresa específica.</p>
        <a href="{{ '/rol-signer/' | relative_url }}">Ver documentación →</a>
    </div>
    <div class="feature-card">
        <div class="icon">🔌</div>
        <h3>API REST</h3>
        <p>Integra FactuIO con tus sistemas mediante nuestra API completa con autenticación por API key.</p>
        <a href="{{ '/api-uso/' | relative_url }}">Ver documentación →</a>
    </div>
</div>

---

## Flujo de Trabajo Típico

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Tenant    │────▶│   Signer    │────▶│   Factura   │
│  (Admin)    │     │  (Creador)  │     │  (Firmada)  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │     AEAT    │
                                        │  (Verifactu)│
                                        └─────────────┘
```

1. **El Tenant** se registra y configura su cuenta
2. **El Tenant** crea Signers (firmantes autorizados)
3. **Cada Signer** puede crear y firmar facturas
4. **Las facturas firmadas** se envían automáticamente a la AEAT

---

## Recursos Adicionales

- [Especificación Verifactu - AEAT](https://www.agenciatributaria.gob.es/)
- [Repositorio GitHub](https://github.com/bcntec/factuio)
- [Soporte técnico](mailto:soporte@bcntec.es)

---

<div class="callout info">
    <strong>💡 ¿Necesitas ayuda?</strong><br>
    Si tienes alguna duda sobre la implementación o necesitas soporte técnico, 
    contacta con nosotros en <a href="mailto:soporte@bcntec.es">soporte@bcntec.es</a>
</div>
