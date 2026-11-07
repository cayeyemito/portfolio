// Spanish strings. en.ts must have exactly the same shape (type Messages).
// Strings rendered with <RichText> may contain `code`, [links](/url) and *emphasis*.
export const es = {
  nav: {
    label: 'Secciones',
    projects: 'Proyectos',
    build: 'Cómo está hecha',
    experience: 'Experiencia',
    stack: 'Stack',
    contact: 'Contacto',
    switchLanguage: 'Read in English',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    close: 'Cerrar',
    closeMenu: 'Cerrar menú',
  },
  // A toggle with a fixed name: aria-pressed says whether light is on.
  theme: {
    light: 'Tema claro',
  },
  profile: {
    focus: 'Backend y DevOps',
    // The *starred* parts are highlighted.
    intro:
      'Desarrollador full stack junior en Barcelona. He trabajado a los dos lados del deploy: *las máquinas que compilan y despliegan*, y *el código que llega a producción*.',
    tags: ['Java', 'Spring Boot', 'TypeScript', 'Next.js', 'Azure', 'Terraform', 'Docker'],
    available: 'Abierto a ofertas',
    languages: [
      { name: 'Castellano · Catalán', level: 'Nativo' },
      { name: 'Inglés', level: 'Avanzado' },
    ],
  },
  // In the hero, the contact list and the mobile menu; the first one is highlighted.
  cvs: [
    {
      label: 'Full Stack / Backend',
      short: 'CV Full Stack',
      href: '/cv/Cayetano_Yeste_CV_FullStack.pdf',
    },
    {
      label: 'DevOps / Operaciones IT',
      short: 'CV DevOps',
      href: '/cv/Cayetano_Yeste_CV_DevOps.pdf',
    },
  ],
  // Newest first. The first job is drawn as the current one.
  experience: [
    {
      company: 'EY',
      role: 'Consultor de Tecnología Junior',
      period: 'oct 2025 — jun 2026',
      kind: 'Contrato de formación',
      points: [
        'Funcionalidades para la aplicación de NH Hoteles con Spring Boot (API REST, JPA/Hibernate) y Vue, en un equipo Scrum',
        'Introduje los primeros tests unitarios (JUnit y frontend) en un proyecto que no tenía',
        'Despliegue en el entorno de pruebas con Jenkins; flujo Git con pull requests y sprints en Jira',
      ],
    },
    {
      company: 'Itequia',
      role: 'DevOps Engineer · prácticas',
      period: 'mar 2021 — jun 2022',
      kind: 'Prácticas',
      points: [
        'Mantenimiento de los agentes de build de Azure DevOps Pipelines: VM Windows en Azure y on-premise',
        'Diagnóstico de fallos revisando logs, y scripts en PowerShell y Bash',
        'Copias de seguridad diarias y bases de datos SQL',
        'Incidencias en Jira Service Management',
      ],
    },
    {
      company: 'Little Suite',
      role: 'Analista de datos',
      period: 'feb 2019 — ago 2020',
      kind: 'Jornada parcial',
      points: [
        'Gestión de bases de datos MySQL, cuidando su integridad y seguridad',
        'Informes técnicos para la dirección y los clientes',
      ],
    },
  ],
  education: {
    title: 'Formación',
    items: [
      { period: '2024 — 2026', name: 'DAW · Desarrollo de Aplicaciones Web · IFP' },
      {
        period: '2019 — 2022',
        name: "DAM · Desarrollo de Aplicaciones Multiplataforma · IES Joan d'Àustria",
      },
    ],
  },
  projects: {
    title: 'Proyectos',
    path: '~/work',
    part: 'Mi parte',
    caseStudy: 'Leer el caso',
    repo: 'Ver el repositorio',
    // The portfolio card's figure: what runs, and when.
    workflows: {
      caption: 'GitHub Actions · workflows',
      rows: [
        { label: 'Pull request', steps: ['lint', 'test', 'build', 'terraform plan'] },
        { label: 'Push a main', steps: ['build', 'deploy · OIDC → Azure', 'smoke test'] },
      ],
      scheduled: 'Programado',
      scheduledNote: 'revisión diaria del sitio',
    },
  },
  home: {
    experienceTitle: 'Experiencia',
    experiencePath: 'CHANGELOG.md',
    stackTitle: 'Stack',
    stackNote: 'Tecnología → dónde la he usado',
    // "01" and "02" are the projects above. *Starred* items are the strongest ones.
    stack: [
      {
        title: 'Backend y datos',
        items: [
          { name: '*Java · Spring Boot*', where: 'EY' },
          { name: 'Supabase', where: '01' },
          { name: 'Python', where: '02' },
          { name: 'SQL', where: 'Itequia' },
          { name: 'MySQL', where: 'Little Suite' },
        ],
      },
      {
        title: 'Frontend y móvil',
        items: [
          { name: 'Vue', where: 'EY · 02' },
          { name: 'React · Next.js', where: '01' },
          { name: 'TypeScript', where: '01 · 02' },
          { name: 'Capacitor', where: '01' },
          { name: 'LiveKit', where: '01' },
        ],
      },
      {
        title: 'DevOps y cloud',
        items: [
          { name: '*GitHub Actions*', where: '02' },
          { name: 'Azure', where: 'Itequia · 02' },
          { name: 'Terraform · OIDC', where: '02' },
          { name: 'Azure DevOps · Jenkins', where: 'Itequia · EY' },
          { name: 'Docker · Linux', where: '01 · DAW' },
        ],
      },
    ],
    stackAlso: 'También: PowerShell y Bash (Itequia) · Git y Jira (EY, Itequia)',
    contactLabel: 'Contacto',
    contactTitle: '¿Hablamos?',
    email: 'Email',
    copy: 'Copiar',
    copied: 'Copiado',
    copiedMessage: 'Email copiado al portapapeles',
  },
  status: {
    allOk: 'Todo operativo',
    failed: 'Hay comprobaciones fallidas',
    lastDeploy: 'último despliegue',
    justNow: 'ahora mismo',
    loading: 'Cargando el último informe…',
    missing: 'Todavía no hay informe: se genera una vez al día.',
    error: 'No se ha podido leer el informe de estado.',
    summaryOk: 'Todo en orden',
    checks: 'comprobaciones',
    check: 'Comprobación',
    result: 'Resultado',
    pass: 'OK',
    fail: 'Fallo',
    fullReport: 'Ver el informe completo →',
  },
  footer: {
    madeWith: 'Vue · Azure · Terraform · GitHub Actions',
    status: 'Estado',
    source: 'Código fuente',
  },
  diagram: {
    title: 'Arquitectura del portfolio',
    desc: 'Un push a GitHub lanza GitHub Actions, que obtiene un acceso temporal de Entra ID con OIDC y sube la web con azcopy a una cuenta de Azure Storage con web estática. Los visitantes entran por HTTPS y cada lectura queda registrada en Log Analytics.',
    caption: 'Despliegue arriba, tráfico abajo. Ningún secreto de Azure se guarda en GitHub.',
    you: 'Tú',
    repository: 'repositorio',
    temporary: 'OIDC, temporal',
    visitor: 'Visitante',
    browser: 'navegador',
    site: 'web estática + /status',
  },
  // Case page of Frimee. Title, status, summary, "my part" and design credit come from
  // projects.json. Every technical fact here was checked against the Frimee repository.
  frimee: {
    toc: 'Contenido del caso',
    open: 'Abrir frimee.es',
    facts: [
      { label: 'Web', value: 'frimee.es' },
      { label: 'Despliegue', value: 'Hostinger' },
      { label: 'Equipo', value: '2 personas' },
      { label: 'Stack', value: 'Next.js · Supabase · Firebase · Capacitor · LiveKit' },
      { label: 'Servicios', value: 'Google Maps · OpenAI · Claude · Sentry' },
    ],
    imageCaption: 'Un plan de viaje en Frimee: actividades por día y la ruta en el mapa.',
    video: {
      label:
        'Recorrido por Frimee: inicio de sesión, planes, itinerario, mapa con la ruta, gastos compartidos, chat con el asistente y la misma app en Android.',
      caption:
        'Recorrido de 21 segundos por la web y la app de Android, montado con capturas reales.',
      pause: 'Pausar el vídeo',
      play: 'Reproducir el vídeo',
    },
    capturesTitle: 'Capturas',
    captures: {
      web: 'Web',
      mobile: 'App de Android',
      mobileNote: 'La misma interfaz, empaquetada con Capacitor.',
      webShots: [
        {
          src: '/projects/frimee/web-itinerario.webp',
          width: 1552,
          height: 986,
          alt: 'Itinerario de un viaje a Nueva York: actividades del día con horarios, desplazamientos y la ruta en el mapa',
        },
        {
          src: '/projects/frimee/web-chat.webp',
          width: 1286,
          height: 947,
          alt: 'Chat del plan de Tokio: el asistente propone tres restaurantes y crea una encuesta para votar',
        },
      ],
      mobileShots: [
        {
          src: '/projects/frimee/movil-itinerario.webp',
          alt: 'App de Android: itinerario de un día en Tokio con dos actividades y el mapa',
        },
        {
          src: '/projects/frimee/movil-mapa.webp',
          alt: 'App de Android: mapa a pantalla completa con la ruta del día',
        },
        {
          src: '/projects/frimee/movil-chat.webp',
          alt: 'App de Android: encuesta creada por el asistente en el chat del plan',
        },
      ],
    },
    contextTitle: 'Contexto',
    context: [
      'Cuando un grupo prepara un viaje, la información acaba repartida entre mensajes, notas y pagos sueltos. Frimee junta en un solo plan las actividades, el mapa, el calendario, los gastos compartidos y el chat.',
      'Es una web y una app para Android e iOS que salen del mismo código. La hicimos entre dos: Vicky se encargó del diseño, de parte de la interfaz y de piezas como las notificaciones push, y yo hice la mayor parte del backend y del frontend.',
    ],
    featuresTitle: 'Funcionalidades clave',
    features: [
      {
        name: 'Chat y llamadas',
        text: 'Chat en tiempo real con Supabase Realtime; llamadas y videollamadas con LiveKit.',
      },
      {
        name: 'Asistente en el chat',
        text: 'Con Claude Haiku, desde una función de Supabase: responde preguntas y ofrece atajos, como crear planes.',
      },
      {
        name: 'Tickets y entradas',
        text: 'Se leen con OCR (OpenAI) para añadir los gastos o las entradas del plan sin teclearlos.',
      },
      {
        name: 'Mapa y avisos',
        text: 'Google Maps para los lugares y las rutas, y notificaciones push con Firebase.',
      },
    ],
    architectureTitle: 'Arquitectura',
    architecture: {
      caption: 'Vista de sistema · tres caminos',
      clients: 'Clientes',
      web: 'Web',
      browser: 'navegador',
      app: 'App móvil',
      direct: 'A · Directo',
      directNote: 'con claves públicas',
      server: 'B · Vía servidor',
      serverNote: 'solo lo que necesita secretos',
      functions: 'C · Funciones de Supabase',
      functionsNote: 'tareas de fondo',
      boxes: {
        supabase: 'datos · login · tiempo real',
        firebase: 'feed · fotos · archivos',
        maps: 'mapas',
        livekit: 'llamadas · vídeo',
        api: 'token de llamada · OCR · rutas · borrar cuenta',
        token: 'emite el token',
        serviceKey: 'clave de servicio',
        ocr: 'OCR de tickets',
        assistant: 'asistente',
        push: 'notificaciones push',
        sync: 'copia los planes publicados a Firestore',
      },
      sentry: 'errores en el cliente, el servidor y el edge',
      hosting: 'la web de Next.js y sus rutas /api, en frimee.es',
    },
    architectureNote:
      'Los clientes hablan directamente con los servicios usando claves públicas. El servidor solo interviene en lo que necesita privilegios, y la clave de servicio de Supabase nunca llega al cliente.',
    decisionsTitle: 'Decisiones',
    why: 'Por qué',
    decisions: [
      {
        name: 'Next.js',
        note: 'un código, tres salidas',
        what: 'El mismo proyecto genera la web con servidor y rutas `/api`, una exportación estática que Capacitor empaqueta como app (`BUILD_TARGET=capacitor`) y una imagen Docker standalone (`BUILD_TARGET=docker`).',
        why: 'Queríamos que la web y la app salieran del mismo código, y con Next.js eso era fácil: la app es la propia web exportada y metida en Capacitor. Además, las pocas cosas que necesitan claves secretas las pusimos en rutas `/api` del mismo proyecto, así que no tuvimos que montar un backend aparte.',
      },
      {
        name: 'Supabase',
        note: 'lo relacional, el login y el tiempo real',
        what: 'PostgreSQL con políticas RLS para planes, miembros, chats y gastos, más la autenticación y Realtime para el chat. Lo que necesita privilegios (OCR, borrar cuenta, tokens de llamada) va en rutas `/api` con la clave de servicio; el asistente y las notificaciones push, en funciones de Supabase.',
        why: 'Para todo lo que tiene relaciones queríamos una base de datos SQL de verdad, y Supabase nos la daba ya montada, con el login y el tiempo real incluidos. Como el cliente habla directamente con la base de datos, protegimos los datos con políticas RLS, que era lo que más me preocupaba.',
      },
      {
        name: 'Firebase',
        note: 'lo social y los archivos',
        what: 'Firestore guarda el feed (publicaciones, likes, comentarios y fotos) y Firebase Storage los archivos que se suben, convertidos a WebP si son imágenes. Las notificaciones push salen por Firebase Cloud Messaging.',
        why: 'Las publicaciones, los comentarios y las fotos son documentos sueltos que se leen mucho y no necesitan relaciones, así que Firestore y su Storage encajaban mejor ahí que en la base de datos relacional.',
      },
      {
        name: 'Capacitor',
        note: 'la misma interfaz en Android e iOS',
        what: 'La app es la web exportada dentro de un WebView. Los plugins dan acceso a lo nativo: cámara, ubicación, notificaciones push y widgets de Android (PlanWidget y CountdownWidget, con un plugin propio).',
        why: '',
      },
      {
        name: 'LiveKit',
        note: 'llamadas y videollamadas',
        what: 'WebRTC gestionado con LiveKit Cloud. El token lo emite `/api/livekit/token` solo si el usuario es miembro del chat (si no, 403), caduca en 1 hora y la ruta tiene límite de peticiones. El estado de cada llamada vive en la tabla `llamadas`, y un script SQL marca como terminadas las que llevan más de 2 horas abiertas.',
        why: 'Hacer videollamadas en grupo nosotros mismos suponía montar y mantener un servidor de vídeo, y eso se nos iba de las manos. Con LiveKit Cloud solo tuvimos que generar el token desde nuestra API, y así seguimos decidiendo quién entra en cada llamada: si no estás en el chat, no hay token.',
      },
    ],
    challengeTitle: 'Reto',
    challenge: {
      title: 'La sesión no llegaba desde la app móvil',
      text: [
        'En la web, las rutas `/api` leían la sesión de la cookie. Pero la app es una exportación estática dentro de un WebView: el cliente de Supabase guarda la sesión en localStorage y las peticiones no llevan esa cookie, así que todo lo que pasaba por el servidor devolvía 401 desde el móvil (rutas, OCR de tickets, borrar cuenta…).',
        'La solución: los clientes envían el access token en la cabecera `Authorization: Bearer` y cada ruta lo valida contra Supabase. En la web sigue funcionando la cookie.',
      ],
      codeNote:
        'La línea resaltada valida el token contra Supabase en lugar de decodificarlo en local: un token caducado o revocado no pasa.',
    },
    learningsTitle: 'Aprendizajes',
    learnings: [
      {
        name: 'Lo que haría distinto',
        text: 'El mismo bloque de autenticación está copiado en cinco rutas. Hoy lo sacaría a una única función `getRequestUser(req)` con su test, para que un cambio en la autenticación no haya que hacerlo cinco veces.',
      },
      {
        name: 'Web y WebView desde el primer día',
        text: 'Las cookies frente a los tokens y el historial del WebView (hubo que cambiar el «volver atrás» en ajustes porque en móvil se comportaba de forma imprevisible) salieron tarde y costaron arreglos en muchas pantallas.',
      },
    ],
    other: 'Siguiente',
  },
  build: {
    // Case page of the portfolio project: its title and status come from projects.json.
    toc: 'Contenido del caso',
    status: 'Estado',
    facts: [
      { label: 'Web', value: 'Azure Storage · web estática' },
      { label: 'Región', value: 'Spain Central' },
      { label: 'Equipo', value: 'Proyecto individual' },
      { label: 'Stack', value: 'Vue 3 · Vite · Terraform · GitHub Actions · Python' },
    ],
    repo: 'Ver el repositorio',
    other: 'Otro proyecto',
    lead: 'Esta web es estática: Vue 3 compilado con Vite y servida con HTTPS desde Azure Storage. Toda la infraestructura está en Terraform, GitHub Actions la despliega sin guardar ningún secreto y un script en Python la revisa cada día. [El código está en GitHub.](https://github.com/cayeyemito/portfolio)',
    architecture: 'Arquitectura',
    pipeline: 'Pipeline',
    pipelineText:
      'Hay tres workflows de GitHub Actions. Se autentican en Azure con OIDC: Entra ID cambia el token de cada ejecución por un acceso temporal, solo si viene de este repositorio y de la rama o la pull request esperadas, y con permisos limitados a esta cuenta de Storage.',
    workflows: [
      {
        file: 'ci.yml',
        trigger: 'en cada pull request',
        steps: [
          { name: 'npm ci' },
          { name: 'lint', detail: 'oxlint, ESLint y Prettier' },
          { name: 'tests', detail: 'Vitest' },
          { name: 'build' },
          { name: 'pytest · shellcheck', detail: 'script de operación' },
          { name: 'terraform fmt · validate · plan', detail: 'plan comentado en la PR' },
        ],
      },
      {
        file: 'deploy.yml',
        trigger: 'en cada push a main',
        steps: [
          { name: 'build' },
          { name: 'azure/login', detail: 'OIDC con Entra ID, sin secretos' },
          { name: 'azcopy copy · sync', detail: 'caché larga para assets, corta para HTML' },
          { name: 'smoke test', detail: 'la web responde 200' },
        ],
      },
      {
        file: 'health.yml',
        trigger: 'cada día a las 06:00 UTC',
        steps: [
          { name: 'site_health.py', detail: 'HTTP, TLS, ficheros y logs con KQL' },
          { name: 'publish /status', detail: 'report.html y report.json' },
        ],
      },
    ] as { file: string; trigger: string; steps: { name: string; detail?: string }[] }[],
    iacTitle: 'Infraestructura como código',
    iacText:
      'Todo vive en `infra/azure/`, con el estado de Terraform en una cuenta de Storage con versionado. Solo se crearon a mano esa cuenta y el presupuesto general.',
    iacItems: [
      'Cuenta de Storage con web estática (`index.html` en cada carpeta y `404.html`), solo HTTPS y TLS 1.2, y sin claves de acceso: todo entra con identidad.',
      'Dos identidades de Entra ID con *federated credentials* para GitHub: la de despliegue solo puede escribir en esa cuenta; la del plan, solo leer.',
      'Logs de acceso en Log Analytics durante 30 días, con una cuota diaria como freno.',
      'Presupuesto con avisos al 50 %, al 100 % y por previsión.',
    ],
    opsTitle: 'Operación',
    opsText:
      'Un workflow programado ejecuta `ops/site_health.py` una vez al día. Comprueba que las páginas y los enlaces de los proyectos responden, cuántos días le quedan al certificado TLS, que la web tiene los ficheros esperados y qué errores 4xx y 5xx aparecen en los logs, con una consulta KQL a Log Analytics. El informe se publica en [/status](/status/); si algo falla, el job termina en rojo y GitHub avisa por email.',
    fromAwsTitle: 'De AWS a Azure',
    fromAwsText:
      'La infraestructura se diseñó primero para AWS: S3 privado, CloudFront con Origin Access Control, roles IAM con OIDC y AWS Budgets. Está en `infra/aws/`, validada con `terraform validate` y sin desplegar. La desplegué en Azure, donde la arquitectura es la misma con otras piezas: Storage en lugar de S3, Entra ID en lugar de IAM y Log Analytics en lugar de los logs de CloudFront.',
    notCoveredTitle: 'Qué no cubre',
    notCoveredText:
      'No hay Kubernetes ni alta disponibilidad real: es un sitio estático en una sola suscripción. Tampoco hay CDN: en Azure costaría una cuota fija mensual (Front Door) y, para un portfolio, la web estática de Storage basta. En producción separaría entornos en suscripciones distintas, pondría Front Door con dominio propio y cabeceras de seguridad, y movería el `terraform apply` al pipeline con aprobación manual.',
  },
}

export type Messages = typeof es
