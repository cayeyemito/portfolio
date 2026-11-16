// Cloudflare Worker delante de la web estática de Azure Storage.
//
// Azure Storage solo responde a peticiones con su propio Host, y el plan
// gratuito de Cloudflare no permite reescribir el Host. El Worker recibe la
// petición de cayeyeste.com y la pide a Azure con su nombre, por HTTPS
// verificado. Rutas: cayeyeste.com/* y www.cayeyeste.com/*.

const ORIGIN = 'stportfolio9766eb04.z43.web.core.windows.net'
const CANONICAL = 'cayeyeste.com'

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
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      })
    }

    // Solo se reenvían las cabeceras que sirven a una web estática.
    const headers = new Headers()
    for (const name of [
      'Accept',
      'Accept-Encoding',
      'If-None-Match',
      'If-Modified-Since',
      'Range',
    ]) {
      const value = request.headers.get(name)
      if (value) headers.set(name, value)
    }

    const upstream = new URL(url.pathname + url.search, `https://${ORIGIN}`)
    const response = await fetch(upstream, {
      method: request.method,
      headers,
      redirect: 'manual',
    })

    // Si Azure redirige, que la redirección no enseñe su dominio.
    const location = response.headers.get('Location')
    if (location) {
      const fixed = new Headers(response.headers)
      fixed.set('Location', location.replace(`https://${ORIGIN}`, `https://${CANONICAL}`))
      return new Response(response.body, { status: response.status, headers: fixed })
    }

    return response
  },
}
