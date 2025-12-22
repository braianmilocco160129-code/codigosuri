# Configuración del Servicio de Email

El formulario de contacto está listo para enviar datos. Ahora necesitas configurar un servicio para recibir y procesar los emails.

## Opciones de Configuración

### Opción 1: FormSubmit.co (Gratis y sin backend)

La forma más simple sin necesidad de código backend:

1. Ve a [https://formsubmit.co](https://formsubmit.co)
2. Reemplaza en `main.js` línea 142-148:

```javascript
const response = await fetch('https://formsubmit.co/ajax/TU-EMAIL@ejemplo.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(formData)
});

if (!response.ok) {
  throw new Error('Error al enviar el mensaje');
}
```

3. La primera vez que uses el formulario, recibirás un email de confirmación
4. Opciones adicionales de FormSubmit (agregar campos ocultos en HTML):
   - `_subject`: Personalizar asunto del email
   - `_cc`: Enviar copia a otros emails
   - `_next`: Página de redirección después del envío
   - `_template`: Usar plantilla personalizada

### Opción 2: EmailJS (Gratis hasta 200 emails/mes)

1. Crea una cuenta en [https://www.emailjs.com](https://www.emailjs.com)
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Instala EmailJS:

```html
<!-- Agregar en index.html antes de main.js -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

5. Inicializa EmailJS en `main.js` (al inicio del archivo):

```javascript
// Inicializar EmailJS
emailjs.init('TU_PUBLIC_KEY'); // Obtener de tu cuenta EmailJS
```

6. Reemplaza el código de envío en `initContactForm()`:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  name: formData.name,
  phone: formData.phone,
  email: formData.email,
  message: formData.message
})
.then(() => {
  formMessage.className = 'form-message success';
  formMessage.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
  form.reset();
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
})
.catch((error) => {
  console.error('Error:', error);
  formMessage.className = 'form-message error';
  formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
})
.finally(() => {
  btnEnviar.textContent = 'Enviar Consulta';
  btnEnviar.disabled = false;
});
```

### Opción 3: Backend Propio con Node.js + Nodemailer

Si quieres tener control total, crea un backend:

1. Crea un archivo `server.js`:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // o tu servicio de email
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-app-password' // Usar App Password de Gmail
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'tu-email@gmail.com',
    subject: `Nuevo mensaje de ${name}`,
    html: `
      <h3>Nuevo mensaje del formulario de contacto</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

2. Instala las dependencias:

```bash
npm init -y
npm install express nodemailer cors
```

3. Ejecuta el servidor:

```bash
node server.js
```

4. Actualiza la URL en `main.js` línea 141:

```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

### Opción 4: Vercel + Serverless Function

Si despliega en Vercel, crea una función serverless:

1. Crea la carpeta `api` en la raíz del proyecto
2. Crea el archivo `api/contact.js`:

```javascript
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: `Nuevo mensaje de ${name}`,
    html: `
      <h3>Nuevo mensaje del formulario de contacto</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

3. Configura las variables de entorno en Vercel
4. En `main.js`, usa la ruta `/api/contact`

## Recomendación

Para comenzar rápido: **Usa FormSubmit.co** (Opción 1) - no requiere backend ni configuración compleja.

Para más control y profesionalismo: **EmailJS** (Opción 2) - fácil de configurar y con panel de control.

Para producción con escala: **Backend propio** (Opción 3 o 4) - control total.

## Datos que se envían

El formulario envía:
- `name`: Nombre completo
- `phone`: Teléfono
- `email`: Email del contacto
- `message`: Mensaje del contacto
