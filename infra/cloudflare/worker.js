// Cloudflare Worker delante de la web estática de Azure Storage.
//
// Azure Storage admite un dominio propio, pero sin HTTPS si no pagas Front Door. Cloudflare
// termina el TLS de cayeyeste.com y este Worker pide cada página a Azure con su propio
// nombre, porque el plan gratuito no deja reescribir la cabecera Host. De paso añade las
// cabeceras de seguridad y quita las que delatan Azure. Se despliega con wrangler desde
// deploy.yml (wrangler.toml tiene las rutas).

export const ORIGIN = 'stportfolio9766eb04.z43.web.core.windows.net'
export const CANONICAL = 'cayeyeste.com'

// Solo se reenvían las cabeceras que sirven a una web estática.
const FORWARDED = ['Accept', 'Accept-Encoding', 'If-None-Match', 'If-Modified-Since', 'Range']

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy': "frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
}

export default {
  async fetch(request) {
    const url = new URL(request.url)

    // www y cualquier otro alias van al dominio principal.
    if (url.hostname !== CANONICAL) {
      url.hostname = CANONICAL
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
    }

    const headers = new Headers()
    for (const name of FORWARDED) {
      const value = request.headers.get(name)
      if (value) headers.set(name, value)
    }

    const upstream = new URL(url.pathname + url.search, `https://${ORIGIN}`)
    const origin = await fetch(upstream, { method: request.method, headers, redirect: 'manual' })

    // Las cabeceras de una respuesta de fetch no se pueden cambiar: se copia.
    const response = new Response(origin.body, origin)
    for (const name of [...response.headers.keys()]) {
      if (name.startsWith('x-ms-')) response.headers.delete(name)
    }
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(name, value)
    }

    // Si Azure redirige, que la redirección no enseñe su dominio.
    const location = response.headers.get('Location')
    if (location) {
      response.headers.set(
        'Location',
        location.replace(`https://${ORIGIN}`, `https://${CANONICAL}`),
      )
    }

    return response
  },
}
