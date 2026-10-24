// CloudFront viewer-request function.
// S3 behind OAC has no "index document", so /como-esta-hecha/ must be
// rewritten to /como-esta-hecha/index.html, and /como-esta-hecha to its slash form.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }

  var last = uri.split('/').pop();
  if (last.indexOf('.') === -1) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: uri + '/' } },
    };
  }

  return request;
}
