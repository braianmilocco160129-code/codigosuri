# Guía de Configuración para Marketing Digital - CódigoSuri

## 📊 Lo que ya está preparado en tu sitio

Tu página ya tiene todo el código necesario para activar campañas de publicidad. Solo necesitás reemplazar los IDs placeholder cuando estés listo.

---

## 🔵 Meta Ads (Facebook/Instagram)

### Paso 1: Crear el Pixel de Meta
1. Ir a [Meta Business Suite](https://business.facebook.com/)
2. Ir a **Eventos** > **Administrador de eventos**
3. Clic en **Conectar orígenes de datos** > **Web** > **Pixel de Meta**
4. Copiar tu **Pixel ID** (es un número de 15-16 dígitos)

### Paso 2: Activar en tu sitio
En `index.html`, buscar la sección comentada del Meta Pixel y:
1. Descomentar el bloque de código (quitar `<!--` y `-->`)
2. Reemplazar `TU_PIXEL_ID` con tu ID real

### Eventos que podés trackear
```javascript
// Ya tenés PageView automático. Podés agregar:
fbq('track', 'Lead');           // Cuando alguien envía el formulario
fbq('track', 'Contact');        // Cuando hacen clic en WhatsApp
fbq('track', 'ViewContent');    // Cuando ven sección de servicios
```

---

## 🟢 Google Ads y Analytics

### Paso 1: Crear cuenta de Google Analytics 4
1. Ir a [Google Analytics](https://analytics.google.com/)
2. Crear una propiedad nueva
3. Copiar tu **ID de medición** (formato: G-XXXXXXXXXX)

### Paso 2: Activar en tu sitio
En `index.html`, buscar las líneas de Google tag y:
1. Descomentar el bloque
2. Reemplazar `G-XXXXXXXXXX` con tu ID

### Paso 3: Vincular con Google Ads (cuando quieras)
1. En Google Ads, ir a **Herramientas** > **Vinculaciones**
2. Vincular con tu propiedad de Analytics
3. Esto te permite usar audiencias de remarketing

---

## 🖼️ Imagen para redes sociales (og-image.jpg)

Necesitás crear una imagen llamada `og-image.jpg` para cuando compartan tu sitio:

### Especificaciones:
- **Tamaño**: 1200 x 630 píxeles
- **Formato**: JPG
- **Contenido sugerido**: Logo de CódigoSuri + texto "Desarrollo de Software a Medida" + algún elemento visual

### Herramientas gratuitas para crearla:
- [Canva](https://canva.com) - Buscar plantilla "Facebook Post" o "OG Image"
- [Figma](https://figma.com) - Para más control

---

## 📈 Conversiones recomendadas para trackear

Cuando actives los pixels, estos son los eventos importantes:

| Evento | Cuándo trackearlo | Para qué sirve |
|--------|------------------|----------------|
| `Lead` | Formulario enviado | Medir consultas |
| `Contact` | Clic en WhatsApp | Medir contactos directos |
| `ViewContent` | Scroll a servicios | Remarketing |

---

## 🎯 Audiencias sugeridas para campañas

### Meta Ads
- **Lookalike**: Personas similares a quienes visitaron tu web
- **Intereses**: Emprendedores, Dueños de negocio, Tecnología, Startups
- **Ubicación**: Argentina (o más específico según tu foco)

### Google Ads
- **Search**: Palabras clave como "desarrollo de apps", "software a medida", "crear aplicación móvil"
- **Display**: Remarketing a visitantes del sitio

---

## ✅ Checklist antes de activar

- [ ] Crear imagen og-image.jpg (1200x630)
- [ ] Crear Pixel de Meta y agregar ID
- [ ] Crear cuenta Google Analytics 4 y agregar ID
- [ ] Probar que el sitio carga bien
- [ ] Verificar formulario de contacto funciona
- [ ] (Opcional) Agregar política de privacidad

---

## 🔗 URLs importantes

- Meta Business Suite: https://business.facebook.com/
- Google Analytics: https://analytics.google.com/
- Google Ads: https://ads.google.com/
- Google Search Console (SEO): https://search.google.com/search-console/
- PageSpeed Insights (rendimiento): https://pagespeed.web.dev/

---

## 💡 Tips

1. **No actives ads hasta tener bien configurados los pixels** - Si no, perdés datos valiosos
2. **Empezá con presupuesto bajo** - $5-10 USD/día para probar
3. **Usá el formulario como conversión principal** - Es más fácil de medir que WhatsApp
4. **Google Search Console es gratis** - Registrá tu sitio ahí para mejorar SEO

¿Dudas? El código ya está listo, solo necesitás los IDs cuando quieras activarlo.
