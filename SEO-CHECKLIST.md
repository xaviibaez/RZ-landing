# SEO Implementation Checklist - RZ Power House

## ✅ Completado

### Meta Tags y SEO Básico
- [x] Meta description optimizada (160 caracteres)
- [x] Meta keywords con términos relevantes
- [x] Canonical URL configurada
- [x] Meta robots configurada
- [x] Title optimizado con ubicación

### Open Graph y Social Media
- [x] Open Graph tags completos (Facebook, WhatsApp, LinkedIn)
- [x] Twitter Cards configuradas
- [x] URLs sociales en Schema.org

### Structured Data
- [x] Schema.org JSON-LD implementado
- [x] Tipo: SportsActivityLocation
- [x] Información de contacto completa
- [x] Horarios de apertura (24h)
- [x] Coordenadas geográficas
- [x] Enlaces a redes sociales

### Optimización de Imágenes
- [x] Alt tags descriptivos en todas las imágenes
- [x] Lazy loading implementado
- [x] Preload para recursos críticos
- [x] DNS-prefetch para FormSubmit

### Archivos SEO
- [x] robots.txt creado
- [x] sitemap.xml creado

## 📋 Pendiente (Acción Manual Requerida)

### 1. Crear Imagen Open Graph
**Especificaciones:**
- Tamaño: 1200x630 píxeles
- Formato: JPG (optimizado) o PNG
- Ubicación: `/assets/images/og-image.jpg`

**Contenido sugerido:**
```
- Fondo: Negro sólido o imagen del gym (oscurecida)
- Logo RZ Power House (centrado, grande)
- Texto: "RZ POWER HOUSE"
- Subtítulo: "EL TEMPLO DEL POWERLIFTING"
- Ubicación: "Sabadell"
- Icono: Barra olímpica o similar
```

**Herramientas para crear:**
- Canva (plantilla 1200x630)
- Photoshop
- Figma
- Online: og-image-generator

### 2. Reemplazar URL temporal
**En index.html**, buscar y reemplazar:
```
https://rzpowerhouse.com
```
Por tu dominio real cuando lo tengas.

### 3. Google Search Console
Una vez en producción:
1. Ir a: https://search.google.com/search-console
2. Añadir propiedad (tu dominio)
3. Verificar propiedad (meta tag o DNS)
4. Enviar sitemap: `https://tudominio.com/sitemap.xml`

### 4. Google Analytics (Opcional pero Recomendado)
1. Crear cuenta en: https://analytics.google.com
2. Obtener ID de medición (G-XXXXXXXXXX)
3. Añadir antes de `</head>` en index.html:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. Google Business Profile
Si no lo tienes, créalo:
1. Ir a: https://business.google.com
2. Crear perfil para "RZ Power House"
3. Verificar ubicación (postal o teléfono)
4. Añadir:
   - Fotos del gimnasio
   - Horarios (24h)
   - Servicios
   - URL del sitio web
   - Descripción

### 6. Favicon Real
Actualmente tienes `favicon.png` genérico. Crea uno personalizado:
- 32x32 y 16x16 píxeles
- Logo simplificado de RZ Power House
- Fondo transparente o negro

### 7. Optimizar Imágenes Existentes
Las imágenes actuales deberían:
- Convertirse a WebP (mejor compresión)
- Comprimirse (TinyPNG, Squoosh)
- Tener versiones responsive

**Comando para convertir (con ImageMagick):**
```bash
for img in assets/images/*.jpg; do
  cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done
```

### 8. Configurar redirects HTTPS (en servidor)
Cuando esté en producción, configurar:
- HTTP → HTTPS redirect
- www → non-www (o viceversa)

## 🎯 Prioridades

**Crítico (hacer antes de publicar):**
1. Crear imagen OG (og-image.jpg)
2. Reemplazar URLs placeholder por dominio real
3. Optimizar y comprimir todas las imágenes

**Importante (primera semana):**
4. Configurar Google Search Console
5. Crear/Optimizar Google Business Profile
6. Añadir Google Analytics

**Recomendado (primer mes):**
7. Crear favicon personalizado
8. Convertir imágenes a WebP
9. Configurar redirects en servidor

## 📊 Herramientas de Validación

Antes de publicar, verificar con:
1. **Meta Tags**: https://metatags.io/
2. **Structured Data**: https://search.google.com/test/rich-results
3. **Open Graph**: https://www.opengraph.xyz/
4. **PageSpeed**: https://pagespeed.web.dev/
5. **Mobile-Friendly**: https://search.google.com/test/mobile-friendly

## 📝 Notas Adicionales

### Coordenadas Actuales
Las coordenadas en Schema.org son aproximadas para Sabadell:
- Latitude: 41.5488
- Longitude: 2.1081

Verifica las coordenadas exactas de "Carrer de Permanyer, 316" en Google Maps y actualiza en el Schema.org.

### URLs de Redes Sociales
Actualmente configuradas:
- Instagram: https://www.instagram.com/rzpowerhouse/
- TikTok: https://www.tiktok.com/@antonirzpower
- YouTube: https://www.youtube.com/channel/UCJrHJodMPMHErA3_szj_UMQ

Verifica que estas URLs sean correctas y estén activas.

---

**Última actualización**: 2 de diciembre de 2025
**Implementado por**: GitHub Copilot
**Branch**: feature/SEO
