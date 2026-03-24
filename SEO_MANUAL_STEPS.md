# Pasos manuales de SEO - RZ Power House

Estos pasos no se pueden hacer en el código — requieren acciones externas.

---

## 1. Google Search Console (GSC) — PRIORITARIO

GSC es la herramienta gratuita de Google para ver cómo indexa tu web, qué palabras trae tráfico y si hay errores.

### Cómo configurarlo:

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Haz clic en **Añadir propiedad** > elige **Dominio** e introduce `rzpowerhouse.com`
3. Google te dará un registro TXT para verificar que eres el dueño. Añádelo en el DNS de tu proveedor de dominio.
4. Una vez verificado, ve a **Sitemaps** en el menú lateral y envía:
   ```
   https://www.rzpowerhouse.com/sitemap-index.xml
   ```
5. Espera 24-48h. Google empezará a indexar y te mostrará datos.

### Qué revisar en GSC cada semana:
- **Cobertura** — páginas indexadas y errores
- **Rendimiento** — clics, impresiones y posición media
- **Core Web Vitals** — velocidad y experiencia del usuario

---

## 2. Google My Business (GMB) — PRIORITARIO

Para un gimnasio local, Google My Business es igual o más importante que la web. Es lo que aparece en el mapa cuando alguien busca "gimnasio powerlifting sabadell".

### Pasos:
1. Ve a [business.google.com](https://business.google.com)
2. Busca "RZ Power House" — si ya existe un perfil, reclamalo; si no, créalo.
3. Rellena **todo** con exactamente los mismos datos que en la web:
   - Nombre: `RZ Power House`
   - Dirección: `Carrer de Permanyer, 316, Sabadell, 08205`
   - Teléfono: `+34 677 624 775`
   - Web: `https://www.rzpowerhouse.com`
   - Horario: Abierto 24h / 7 días
   - Categoría principal: **Gimnasio** (y añade secundaria: Centro de Hipertrofia / Gym de powerlifting)
4. Sube al menos 10 fotos del interior, exterior y equipamiento.
5. Activa los mensajes para que los clientes puedan escribirte desde Google.

> La coherencia entre los datos del perfil de Google y los de la web (Schema.org) mejora el posicionamiento local.

---

## 3. Registrar el sitio en Bing Webmaster Tools

Bing tiene ~10% de cuota de búsqueda en España. Vale la pena y es gratuito.

1. Ve a [bing.com/webmasters](https://www.bing.com/webmasters)
2. Añade la web `https://www.rzpowerhouse.com`
3. Verifica con el método de archivo HTML o meta tag.
   > Atajo: si ya tienes GSC verificado, Bing permite importar el sitio directamente desde Google Search Console con un clic, sin pasos extra.
4. Envía el sitemap: `https://www.rzpowerhouse.com/sitemap-index.xml`

---

## 4. Conseguir enlaces externos (Link Building)

Google posiciona mejor las webs que otros sitios enlazan. Para un gimnasio local:

- **Directorios locales:** Añade el negocio en [Páginas Amarillas](https://www.paginasamarillas.es), [Yelp España](https://www.yelp.es), [Foursquare](https://foursquare.com) y [Infobel](https://www.infobel.com/es).
- **Clubs y federaciones:** Si el gimnasio está asociado a la AEP u otras federaciones, pide que enlacen la web desde sus páginas de clubs afiliados.
- **Prensa local:** Una nota de prensa en medios de Sabadell (Diari de Sabadell, etc.) con un enlace a la web tiene mucho valor.
- **Colaboradores:** La web ya enlaza a Olympus Sport Nutrición, Maniak Fitness y Hammer Strength. Pídeles que ellos también enlacen a `rzpowerhouse.com` desde su web o bio de Instagram — ese enlace de vuelta tiene valor SEO.

---

## 5. Reseñas en Google

Las reseñas afectan directamente al posicionamiento local. Cuantas más y mejores, más arriba apareces en el mapa.

- Pide a los socios actuales que dejen una reseña en Google My Business.
- Puedes crear un enlace directo a la página de reseñas desde el perfil de GMB (hay una opción en el dashboard que genera el link).
- Responde siempre a las reseñas, tanto positivas como negativas.

### Mantener el codigo sincronizado con las reseñas

El Schema.org de la web tiene este campo en `src/layouts/Layout.astro`:

```json
"aggregateRating": {
  "ratingValue": "5.0",
  "reviewCount": "5"   ← actualiza este número cuando crezcan las reseñas
}
```

Actualízalo cada vez que el número de reseñas en Google cambie de forma significativa. Esto permite que Google muestre las estrellas directamente en los resultados de búsqueda (rich snippet).

---

## 6. Valorar si el H1 debería incluir la keyword principal

Actualmente el H1 de la web es:

> "ENAMÓRATE DEL PROCESO"

Es un H1 de marca muy efectivo, pero no contiene la keyword "powerlifting Sabadell". Google le da mucho peso al H1 para entender el tema de la página.

**Opciones:**
- Mantenerlo así (apuesta por la marca — Google lo compensa con el `<title>` y el Schema.org).
- Cambiar el subtítulo visible "EL TEMPLO DEL POWERLIFTING" a un H2 debajo del H1 e incluir "Sabadell" de forma natural.
- Añadir un texto alternativo invisible para crawlers (no recomendado, puede penalizar).

No hay una respuesta única — depende de si priorizas reconocimiento de marca o búsquedas orgánicas.

---

## 7. Monitorizar velocidad y Core Web Vitals

Google penaliza webs lentas. Una vez desplegada en producción:

1. Pasa la web por [PageSpeed Insights](https://pagespeed.web.dev/) con la URL de producción.
2. El objetivo es **verde en móvil** (>90 en Performance).
3. Si da rojo, los problemas más comunes en este proyecto serían:
   - El video del hero (fichero pesado) — valorar reducir calidad o tamaño.
   - Imágenes sin `loading="lazy"` o sin formato moderno (ya están en avif/webp, bien).

---

## 8. Conectar Google Analytics con Search Console

GA4 ya está instalado en la web (ID: `G-6WDQTLBXQ1`). Conectarlo con GSC permite ver en Analytics qué búsquedas de Google traen visitas, combinando los datos de los dos.

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Entra en tu propiedad > **Administrar** > **Vínculos de Search Console**
3. Haz clic en **Vincular** y selecciona la propiedad de GSC que verificaste en el paso 1.

A partir de ahí, en GA4 tendrás el informe **Adquisición > Search Console** con las keywords reales que usan los usuarios para llegar a la web.
