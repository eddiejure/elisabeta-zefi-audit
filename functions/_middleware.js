const PASSWORD = 'zefi';
const AUTH_COOKIE = 'audit_auth';
const AUTH_TOKEN = 'zefi-audit-granted';

function isAuthenticated(request) {
  const cookie = request.headers.get('Cookie') || '';
  return cookie.split(';').some((part) => {
    const [name, value] = part.trim().split('=');
    return name === AUTH_COOKIE && value === AUTH_TOKEN;
  });
}

function loginPage(error = false) {
  const errorHtml = error
    ? '<p class="error">Falsches Passwort. Bitte erneut versuchen.</p>'
    : '';

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Zugang – Website Audit</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: Inter, system-ui, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      padding: 1.5rem;
    }
    .card {
      width: 100%;
      max-width: 24rem;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 1rem;
      padding: 2rem;
      backdrop-filter: blur(8px);
    }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem; }
    label { display: block; font-size: 0.85rem; margin-bottom: 0.5rem; color: #cbd5e1; }
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(15,23,42,0.8);
      color: #fff;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    input:focus { outline: 2px solid #6366f1; border-color: transparent; }
    button {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background: #6366f1;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    button:hover { background: #4f46e5; }
    .error { color: #fca5a5; margin-bottom: 1rem; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Geschützter Bereich</h1>
    <p>Bitte Passwort eingeben, um die Präsentation zu öffnen.</p>
    ${errorHtml}
    <form method="POST" action="/">
      <label for="password">Passwort</label>
      <input id="password" name="password" type="password" autofocus required />
      <button type="submit">Öffnen</button>
    </form>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: error ? 401 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Crawlern erlauben, robots.txt ohne Login zu lesen
  if (url.pathname === '/robots.txt') {
    return next();
  }

  if (isAuthenticated(request)) {
    return next();
  }

  if (request.method === 'POST') {
    const contentType = request.headers.get('Content-Type') || '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const password = formData.get('password');

      if (password === PASSWORD) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/',
            'Set-Cookie': `${AUTH_COOKIE}=${AUTH_TOKEN}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000`,
            'X-Robots-Tag': 'noindex, nofollow',
          },
        });
      }

      return loginPage(true);
    }
  }

  return loginPage(false);
}
