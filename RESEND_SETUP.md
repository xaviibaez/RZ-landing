# Configuración de Resend para el formulario de contacto

El formulario de contacto usa [Resend](https://resend.com) para enviar emails desde `contacto@rzpowerhouse.com` al correo del negocio.

---

## 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta.
2. Accede al dashboard.

---

## 2. Verificar el dominio `rzpowerhouse.com`

Para enviar desde `contacto@rzpowerhouse.com` el dominio debe estar verificado.

1. En el dashboard ve a **Domains** > **Add Domain**.
2. Introduce `rzpowerhouse.com`.
3. Resend mostrará varios registros DNS que hay que añadir en el panel del proveedor de dominio (ej. Cloudflare, Namecheap, etc.):

| Tipo  | Nombre / Host                        | Valor                                       |
|-------|--------------------------------------|---------------------------------------------|
| TXT   | `resend._domainkey.rzpowerhouse.com` | (clave DKIM que genera Resend)              |
| MX    | `send.rzpowerhouse.com`              | `feedback-smtp.us-east-1.amazonses.com`     |
| TXT   | `send.rzpowerhouse.com`              | `v=spf1 include:amazonses.com ~all`         |

> Los valores exactos los genera Resend al añadir el dominio. Copia los que aparezcan en el dashboard, no los de esta tabla.

4. Haz clic en **Verify DNS Records** una vez propagados (puede tardar unos minutos).

---

## 3. Obtener la API Key

1. En el dashboard ve a **API Keys** > **Create API Key**.
2. Dale un nombre (ej. `rz-landing-production`).
3. Permisos: **Sending access** es suficiente.
4. Copia la clave generada (solo se muestra una vez).

---

## 4. Variable de entorno local

Crea un archivo `.env` en la raiz del proyecto (ya existe `.env.example` como referencia):

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> El archivo `.env` no se commitea al repo. El `.env.example` sirve de plantilla.

---

## 5. Variable de entorno en Vercel (produccion)

1. Ve al proyecto en [vercel.com](https://vercel.com).
2. **Settings** > **Environment Variables**.
3. Añade:
   - **Name:** `RESEND_API_KEY`
   - **Value:** la API key de Resend
   - **Environments:** Production (y Preview si quieres probar en staging)
4. Guarda y vuelve a hacer deploy (o redeploy desde la pestaña **Deployments**).

---

## 6. Como funciona en el proyecto

- **API route:** `src/pages/api/contact.ts`
- **From:** `contacto@rzpowerhouse.com` (requiere dominio verificado)
- **To:** `antoni-10-23@hotmail.com`
- El endpoint esta marcado con `export const prerender = false` para que Vercel lo sirva como funcion serverless incluso con `output: 'static'`.

---

## 7. Probar en local

```bash
pnpm dev
```

Rellena el formulario de contacto en `http://localhost:4321` y comprueba que llega el email. Si hay error, revisa la consola del servidor para ver el log de Resend.

---

## Resolucion de problemas

| Problema | Causa probable | Solucion |
|---|---|---|
| `Configuración del servidor incompleta` | `RESEND_API_KEY` no definida | Añade la variable en `.env` o en Vercel |
| `Error al enviar el email` | Dominio no verificado o API key invalida | Verifica el dominio en Resend y comprueba la key |
| Email llega a spam | Falta registro DKIM/SPF | Completa la verificacion del dominio |
