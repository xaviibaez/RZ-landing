import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Formato de datos inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { nombre, correo, telefono, interes, mensaje } = body;

  // Validation
  if (!nombre?.trim() || !correo?.trim() || !interes?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'Faltan campos obligatorios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^[0-9]{9}$/.test(telefono?.trim() ?? '')) {
    return new Response(JSON.stringify({ ok: false, error: 'Teléfono inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Configuración del servidor incompleta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'contacto@rzpowerhouse.com',
      to: 'antoni-10-23@hotmail.com',
      subject: `Nuevo contacto web: ${nombre.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 2rem; border-radius: 4px;">
          <h2 style="color: #c41e3a; letter-spacing: 0.05em; margin-bottom: 1.5rem;">Nuevo mensaje desde rzpowerhouse.com</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a; color: #d4af37; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; width: 35%;">Nombre</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a;">${escapeHtml(nombre.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a; color: #d4af37; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">Email</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a;"><a href="mailto:${escapeHtml(correo.trim())}" style="color: #c41e3a;">${escapeHtml(correo.trim())}</a></td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a; color: #d4af37; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">Teléfono</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a;"><a href="tel:+34${escapeHtml(telefono.trim())}" style="color: #c41e3a;">${escapeHtml(telefono.trim())}</a></td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a; color: #d4af37; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">Interesado en</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3a3a3a;">${escapeHtml(interes.trim())}</td>
            </tr>
            ${mensaje?.trim() ? `
            <tr>
              <td style="padding: 0.75rem 0; color: #d4af37; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Mensaje</td>
              <td style="padding: 0.75rem 0; white-space: pre-wrap;">${escapeHtml(mensaje.trim())}</td>
            </tr>
            ` : ''}
          </table>
          <p style="margin-top: 2rem; font-size: 0.75rem; color: rgba(255,255,255,0.3);">Enviado desde www.rzpowerhouse.com</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ ok: false, error: 'Error al enviar el email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
