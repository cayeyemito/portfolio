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
      'Soy desarrollador full stack junior y vivo en Barcelona. He estado a los dos lados del despliegue: primero cuidando *las máquinas que compilan y publican el código*, y después escribiendo *el código que llega a producción*.',
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
      role: 'Consultor de Tecnología de la Información Junior',
      period: 'oct 2025 — jun 2026',
      kind: 'Contrato de formación · Barcelona, híbrido',
      points: [
        'Desarrollé funcionalidades nuevas y corregí incidencias en la web de NH Hoteles, desde el análisis de los requisitos hasta el despliegue con Jenkins, en sprints de Scrum.',
        'En el backend, con Spring Boot, hice endpoints de la API REST, lógica de negocio y acceso a datos con JPA/Hibernate, y escribí a mano las consultas SQL que hacían falta.',
        'En el frontend, con Vue, amplié componentes, los conecté a la API e integré el contenido del CMS Tridion.',
        'El proyecto no tenía tests, así que escribí los míos, con JUnit y en el frontend, con ayuda de IA generativa.',
      ],
    },
    {
      company: 'Itequia',
      role: 'DevOps Engineer · prácticas',
      period: 'mar 2021 — jun 2022',
      kind: 'Prácticas · consultora TI de unas 35 personas',
      points: [
        'Con otro compañero, mantenía los agentes de build de Azure DevOps Pipelines, en máquinas Windows tanto en Azure como en servidores propios, para que cada push se construyera y se desplegara.',
        'Cuando fallaba un agente o un pipeline, buscaba la causa en los logs.',
        'Escribí scripts de PowerShell y Bash para el mantenimiento, como las copias de seguridad diarias, la limpieza de ficheros antiguos o las tareas de la base de datos SQL.',
      ],
    },
    {
      company: 'Little Suite',
      role: 'Analista de datos',
      period: 'feb 2019 — ago 2020',
      kind: 'Jornada parcial',
      points: [
        'Me encargaba de mantener las bases de datos MySQL y de cuidar su integridad y su seguridad.',
        'Preparaba informes en Excel y presentaciones para la dirección y para los clientes.',
      ],
    },
  ],
  education: {
    title: 'Formación',
    items: [
      { period: '2024 — 2026', name: 'DAW · Desarrollo de Aplicaciones Web · IFP' },
      {
        period: '2020 — 2022',
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
    // The booking API card's figure (the SQL itself is in BookingFigure.vue).
    booking: {
      caption: 'PostgreSQL · restricción de exclusión',
      note: 'Dos reservas confirmadas de la misma habitación no pueden solaparse, y no lo comprueba el código sino la propia base de datos.',
    },
    // Frimee's card: the short clip of the itinerary and the map.
    frimeeVideo: {
      src: '/projects/frimee/frimee-anuncio-es.mp4',
      poster: '/projects/frimee/frimee-anuncio-es-poster.webp',
      label:
        'Anuncio de Frimee: el itinerario de un viaje, la ruta del día en el mapa y la app en el móvil.',
    },
  },
  home: {
    experienceTitle: 'Experiencia',
    experiencePath: 'CHANGELOG.md',
    stackTitle: 'Stack',
    stackNote: 'Tecnología → dónde la he usado',
    // "01" to "03" are the projects above. *Starred* items are the strongest ones.
    stack: [
      {
        title: 'Backend y datos',
        items: [
          { name: '*Java · Spring Boot*', where: 'EY · 03' },
          { name: 'Supabase', where: '01' },
          { name: 'LiveKit', where: '01' },
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
    desc: 'Un push a GitHub lanza GitHub Actions, que obtiene un acceso temporal de Entra ID con OIDC y sube la web con azcopy a una cuenta de Azure Storage con web estática. Los visitantes entran por HTTPS a cayeyeste.com, que está en Cloudflare, y allí un Worker pide cada página a Azure. Cada lectura queda registrada en Log Analytics.',
    caption:
      'El despliegue y las visitas acaban en el mismo sitio, la cuenta de Azure Storage. GitHub no guarda ninguna credencial de Azure.',
    you: 'Tú',
    repository: 'repositorio',
    temporary: 'OIDC, temporal',
    visitor: 'Visitante',
    browser: 'navegador',
    site: 'web estática + /status',
    deployLabel: 'Despliegue',
    trafficLabel: 'Tráfico',
  },
  // Case page of Frimee. Title, status, summary, "my part" and design credit come from
  // projects.json. Every technical fact here was checked against the Frimee repository.
  frimee: {
    open: 'frimee.es',
    guestCta: 'Probarlo como invitado',
    guestHref: 'https://frimee.es/invitado',
    landing: 'landing.frimee.es',
    lead: 'Un viaje en grupo acaba repartido entre un chat, una hoja de gastos, un mapa, una carpeta de fotos y capturas de billetes. Frimee lo junta todo en un solo plan.',
    guest:
      'Sin registro ni correo. Entras con un viaje a Lisboa en marcha, un cumpleaños a la vista y un viaje a Roma ya terminado con su álbum, todos con amigos ficticios, chats, gastos, encuestas y billetes de ejemplo. La cuenta de invitado se borra a los siete días y se puede convertir en una de verdad sin perder nada.',
    facts: [
      { label: 'Web', value: 'En producción' },
      { label: 'Android', value: 'APK de prueba' },
      { label: 'iOS', value: 'Preparado, sin publicar' },
      { label: 'Despliegue', value: 'Vercel · cada merge a main' },
      { label: 'Equipo · inicio', value: '2 personas · 2026' },
    ],
    code: 'Código',
    video: {
      caption:
        'Anuncio de 11 segundos: el itinerario de un viaje, la ruta del día en el mapa y la app en el móvil.',
      pause: 'Pausar el vídeo',
      play: 'Reproducir el vídeo',
    },
    piecesTitle: 'Qué te encuentras',
    piecesNote: 'Un itinerario de 8 paradas',
    board: {
      label: 'Piezas de Frimee',
      title: 'Salidas',
      subtitle: '',
      terminal: 'Frimee · terminal 2',
      flight: 'Vuelo',
      destination: 'Destino',
      gate: 'Puerta',
      stop: 'Parada',
    },
    see: 'Lo que ves',
    hood: 'Bajo el capó',
    viewLabel: 'Ver en',
    views: { web: 'Web', mobile: 'Móvil' },
    pieces: [
      {
        id: 'planes',
        name: 'Planes e itinerario',
        gate: 'Google Maps',
        see: [
          'Un plan es un viaje o una quedada con fechas, destino y miembros. El itinerario va por días, con actividades, restaurantes, alojamientos y transportes; un hotel de varias noches aparece en cada día que cubre, y lo que no tiene hora no se la inventa.',
          'Entre dos actividades seguidas aparece el tramo, con el medio, el tiempo y la distancia, y cada día tiene su mapa con las paradas numeradas. Todo se puede revisar en un calendario de año, mes, semana y día.',
        ],
        hood: [
          'Las rutas de Google Maps se calculan una sola vez y se guardan',
          'Crear un plan es un asistente de tres pasos que avisa si ya hay otro parecido en esas fechas',
          'El inicio resume lo que está en curso y lo que le toca decidir a cada persona',
        ],
        shots: {
          web: {
            src: '/projects/frimee/plan-web.webp',
            width: 976,
            height: 900,
            alt: 'Itinerario de la escapada a Lisboa: las actividades del día con horarios, los desplazamientos entre ellas y la ruta en el mapa',
          },
          mobile: {
            src: '/projects/frimee/movil-plan.webp',
            width: 350,
            height: 720,
            alt: 'Itinerario de la escapada a Lisboa en el móvil: el vuelo y el check-in del primer día, con sus desplazamientos',
          },
        },
      },
      {
        id: 'gastos',
        name: 'Gastos y pagos',
        gate: 'Lectura de tickets',
        see: [
          'Quién pagó y cómo se reparte: a partes iguales, por porcentajes, por cantidades o por las líneas del ticket. Las deudas se simplifican para que haya el mínimo de pagos, los pagos pueden ser parciales y los confirma quien cobra.',
          'Cada plan admite un presupuesto y cada persona un tope propio. «Mis gastos» reúne lo que debes y te deben en todos tus viajes, con recordatorios para no reclamar a mano.',
        ],
        hood: [
          'Los tickets se leen con la cámara para no teclear el importe',
          'El resumen del plan se puede exportar a PDF',
        ],
        shots: {
          web: {
            src: '/projects/frimee/web-gastos.webp',
            width: 1240,
            height: 600,
            alt: 'Pantalla «Mis gastos» de la cuenta de invitado: lo que te deben, lo que debes y los pagos por resolver de dos planes',
          },
          mobile: {
            src: '/projects/frimee/movil-gastos.webp',
            width: 350,
            height: 625,
            alt: '«Mis gastos» en el móvil: lo que te deben, lo que debes y el pago pendiente a Sara',
          },
        },
      },
      {
        id: 'album',
        name: 'Álbum y recorrido',
        gate: 'MapLibre',
        see: [
          'Las fotos y los vídeos se colocan solos en la actividad o el tramo en el que se hicieron. Lo que no se puede ubicar con seguridad queda en «Sin clasificar», y cada foto indica si se colocó sola o a mano.',
          'Con eso, el álbum se convierte en un recorrido sobre el mapa, día a día, con cada foto en el punto del viaje donde se hizo.',
        ],
        hood: [
          'La hora sale de los metadatos de la foto y, si faltan, de otros datos del archivo',
          '41 pruebas automatizadas sobre la hora, la colocación y la agrupación',
          'El mapa usa MapLibre y los vídeos pueden llegar a 100 MB',
        ],
        shots: {
          web: {
            src: '/projects/frimee/web-album.webp',
            width: 1440,
            height: 900,
            alt: 'Álbum del viaje a Roma: el recorrido del viaje dibujado sobre el mapa, con el título, los días y las fotos',
          },
          mobile: {
            src: '/projects/frimee/movil-album.webp',
            width: 350,
            height: 760,
            alt: 'Álbum del viaje a Roma en el móvil: el recorrido sobre el mapa con el título y los datos del viaje',
          },
        },
      },
      {
        id: 'chat',
        name: 'Chat de viaje',
        gate: 'Realtime',
        see: [
          'Más cuaderno de viaje que lista de burbujas: los días aparecen como capítulos del viaje y las decisiones importantes quedan como hitos que se recorren con una regla lateral.',
          'Se puede mandar de todo: texto, fotos, vídeo, documentos, notas de voz y ubicaciones. Las encuestas tienen desempate: se reabren para quien no votó o se sortea. Cada chat guarda en un panel las fotos, los enlaces, los sitios y las decisiones.',
        ],
        hood: [
          'Los mensajes llegan en tiempo real con Supabase Realtime',
          'Un proceso marca con un rombo los mensajes que parecen un plan, un lugar o un gasto, para convertirlos en actividad con un toque',
          'Desde un chat sin plan se crea uno llevándose la conversación',
        ],
        shots: {
          web: {
            src: '/projects/frimee/chat-web.webp',
            width: 960,
            height: 540,
            alt: 'Chat del plan en el escritorio: la conversación del grupo con una respuesta citada y la regla lateral para recorrerla',
          },
          mobile: {
            src: '/projects/frimee/chat-movil.webp',
            width: 360,
            height: 800,
            alt: 'Chat del plan en el móvil: el día 1 como capítulo, una reacción y la regla lateral para recorrer la conversación',
          },
        },
      },
      {
        id: 'asistente',
        name: '@frimee',
        gate: 'Claude Haiku',
        see: [
          'Un asistente al que se menciona en cualquier chat de plan. Responde preguntas sobre el viaje, recomienda sitios y propone cambios, como añadir una actividad, registrar un gasto o abrir una encuesta.',
          'Nada se aplica solo: el grupo acepta o descarta cada propuesta.',
        ],
        hood: [
          'Funciona con Claude Haiku, llamado desde una función de Supabase',
          'Tiene un límite de peticiones y un cupo diario, por persona y para todo el servicio',
        ],
        shots: {
          web: {
            src: '/projects/frimee/asistente-web.webp',
            width: 960,
            height: 540,
            alt: 'Chat del plan de Lisboa: el asistente propone cuatro sitios para cenar fado y una encuesta que el grupo puede crear o descartar',
          },
          mobile: {
            src: '/projects/frimee/movil-asistente.webp',
            width: 350,
            height: 800,
            alt: 'Respuesta del asistente en el chat del móvil: cuatro sitios para cenar fado y la propuesta de encuesta',
          },
        },
      },
      {
        id: 'llamadas',
        name: 'Llamadas',
        gate: 'LiveKit',
        see: [
          'Llamadas y videollamadas de pareja y de grupo, con pantalla compartida en escritorio.',
          'En Android suenan como una llamada de verdad: aviso a pantalla completa aunque la app esté cerrada, tono propio y una notificación mientras dura.',
        ],
        hood: [
          'LiveKit, con el token emitido por `/api/livekit/token` solo si estás en el chat',
          'Plugins de Capacitor escritos a medida para lo nativo',
        ],
        shots: {
          web: null,
          mobile: null,
        },
      },
      {
        id: 'cartera',
        name: 'Cartera y vuelos',
        gate: 'Vault + zxing',
        see: [
          'Billetes y entradas con un papel y unas tintas que recuerdan a los reales, agrupados por plan y separados en próximos y usados. Al subir la foto o el PDF se rellenan solos el tipo, las fechas, el trayecto, el localizador, el asiento y el titular.',
          'Si lo permites, tus amistades ven en vuestro chat el vuelo que tienes en curso, con la ruta y cuánto lleva recorrido, pero nunca el localizador, el asiento ni el titular.',
        ],
        hood: [
          'Lectura con un modelo de visión de OpenAI, que no almacena las peticiones',
          'Los códigos QR, Aztec y PDF417 se leen en el propio dispositivo con zxing-wasm',
          'El código se guarda cifrado en Supabase Vault; los archivos, en privado y con enlaces que caducan a los cinco minutos',
          'En Android, al enseñarlo, la pantalla sube el brillo y no se puede capturar',
        ],
        shots: {
          web: {
            src: '/projects/frimee/web-cartera.webp',
            width: 1240,
            height: 690,
            alt: 'Cartera de la cuenta de invitado: una entrada y un vuelo próximos, con el billete en papel y su localizador',
          },
          mobile: {
            src: '/projects/frimee/movil-cartera.webp',
            width: 350,
            height: 594,
            alt: 'Cartera en el móvil: la entrada de la noche de fado con su localizador y los billetes del plan',
          },
        },
      },
      {
        id: 'pasaporte',
        name: 'Pasaporte',
        gate: 'PostGIS',
        see: [
          'Una libreta con páginas por año. Cada viaje terminado deja un sello por país, y hay sellos de hito: el primer viaje, el país diez, veinticinco o cincuenta, volver a un país o una ruta por tres países o más.',
          'Los sellos llegan al día siguiente de acabar el viaje, con aviso. El pasaporte se enseña a todos, solo a las amistades o a nadie.',
        ],
        hood: [
          'El país de cada parada se decide con fronteras propias en PostGIS',
          'El geocodificador de Google solo entra cuando un sitio no tiene coordenadas',
          'Los sellos los crea una tarea programada en la base de datos',
        ],
        shots: {
          web: {
            src: '/projects/frimee/web-pasaporte.webp',
            width: 1010,
            height: 690,
            alt: 'Pasaporte abierto en el escritorio: la página de 2026 con los sellos de Roma, el Vaticano, Italia y el primer viaje',
          },
          mobile: {
            src: '/projects/frimee/movil-pasaporte.webp',
            width: 350,
            height: 770,
            alt: 'Pasaporte en el móvil: la página de 2026 con los sellos de Roma, el Vaticano, Italia y el primer viaje',
          },
        },
      },
    ],
    extraLabel: 'Y además',
    extra:
      'Invitaciones con código corto y QR, con límite de intentos por hora; bloqueo de personas; borrar la cuenta anonimiza los datos en vez de dejar huecos en los planes de los demás.',
    howTitle: 'Cómo funciona',
    howNote: 'Next.js 16 · Supabase · Capacitor 8',
    architecture: {
      caption: 'Por dónde habla cada parte · tres caminos',
      clients: 'Clientes',
      web: 'Web',
      browser: 'navegador',
      app: 'App Android',
      appNote: 'Capacitor · mismo código',
      onDevice: 'En el dispositivo: lectura de códigos de billete con zxing-wasm',
      direct: 'A · Directo',
      directNote: 'claves públicas; la seguridad está en la base de datos',
      server: 'B · Vía /api',
      serverNote: 'solo lo que necesita un secreto',
      background: 'C · En segundo plano',
      backgroundNote: 'funciones de Supabase y tareas programadas: no dependen de nadie mirando',
      directBoxes: [
        { name: 'Supabase', note: 'datos · auth · realtime', strong: true },
        { name: 'Firebase', note: 'archivos · push', strong: false },
        { name: 'LiveKit', note: 'sala de llamada', strong: false },
        { name: 'Google Maps', note: 'mapas · lugares', strong: false },
        { name: 'MapLibre', note: 'mapa del álbum', strong: false },
      ],
      serverBoxes: [
        { name: 'Token LiveKit', note: 'livekit/token', strong: true },
        { name: 'Lectura de billetes', note: 'OpenAI visión', strong: true },
        { name: 'Rutas', note: 'Google · clave de servidor', strong: true },
        { name: 'Tokens Firebase', note: 'firmados en el servidor', strong: true },
        { name: 'Borrar cuenta', note: 'clave de servicio', strong: true },
      ],
      backgroundBoxes: [
        { name: '@frimee', note: 'Claude Haiku', strong: false },
        { name: 'Avisos push', note: 'Cloud Messaging', strong: false },
        { name: 'Sellos', note: 'pasaporte', strong: false },
        { name: 'Invitados', note: 'limpieza a 7 días', strong: false },
        { name: 'Billetes', note: 'pasan a usados', strong: false },
      ],
      sentry: 'errores en el cliente, el servidor y el edge',
      hosting: 'despliega con cada merge a main; dominio frimee.es en IONOS',
    },
    principles: [
      {
        name: 'Un código, tres salidas',
        text: 'Según `BUILD_TARGET`, el mismo proyecto da la web con su API, la exportación estática que Capacitor empaqueta para Android e iOS, o una imagen Docker.',
      },
      {
        name: 'La seguridad, en la base de datos',
        text: 'No se esconde ninguna ruta: lo que protege los datos son las políticas por filas, y las funciones que se las saltan comprueban antes quién llama.',
      },
      {
        name: 'Lo que no necesita a nadie delante, en el servidor',
        text: 'El asistente, los avisos, los sellos y las limpiezas viven en funciones de Supabase y tareas de la base de datos, no en el cliente.',
      },
    ],
    workTitle: 'Cómo se ha trabajado',
    workNote: 'Cifras enlazadas al repo',
    stats: [
      {
        value: '126',
        label: 'pull requests fusionadas a main',
        note: 'github · pulls',
        href: 'https://github.com/FrimeeApp/Frimee/pulls?q=is%3Apr+is%3Amerged',
      },
      {
        value: '49',
        label: 'pruebas automatizadas de la lógica pura',
        note: 'fremee/tests',
        href: 'https://github.com/FrimeeApp/Frimee/tree/main/fremee/tests',
      },
      {
        value: '2',
        label: 'proyectos de Supabase: pruebas y producción',
        note: 'cada migración pasa por los dos',
        href: '',
      },
    ],
    work: [
      'Trabajo con cambios pequeños, uno por rama, y no doy nada por bueno hasta verlo con datos reales, en el móvil y con varias cuentas. Las pantallas se diseñan antes de programarlas, y cada cambio deja sus pruebas.',
      'Lo que toca la base de datos pasa primero por el proyecto de pruebas y después por producción, con una consulta que confirma cada paso. Le doy la misma importancia a la seguridad que al coste: seguridad por filas, billetes cifrados y un cupo diario en todo lo que se paga por uso. Y prefiero cerrar un bloque entero antes de abrir otro.',
      'Uso la IA para escribir y revisar código y para acelerar el diseño, pero las decisiones técnicas y de diseño son mías, y soy yo quien prueba, revisa y despliega.',
    ],
    flowTitle: 'El orden de cada cambio',
    flow: [
      'Rama pequeña',
      'Migración en el proyecto de pruebas',
      'Consulta que comprueba el paso',
      'Migración en producción',
      'Merge a main',
      'Vercel despliega',
    ],
    flowNote:
      'Primero la base de datos y luego el código, porque hacer merge a main ya es desplegar. Lo que no se puede probar con código se comprueba a mano en un tablero de varios cientos de comprobaciones, en local y en producción, empezando por lo que necesita una cuenta real, un móvil o una notificación.',
    story: 'Historia',
    stories: [
      {
        tag: 'seguridad · nov 2026',
        title: 'Revisar la base de datos tabla por tabla',
        text: [
          'En noviembre revisé todas las políticas y funciones. Encontré funciones que cualquiera podía lanzar sin sesión y reglas de Firebase que dejaban listar y descargar archivos. Las cerré, y desde entonces Firebase solo acepta tokens que firma el servidor a partir de la sesión de Supabase.',
          'Por eso el esquema, las políticas y las funciones viven en un repositorio privado: describen con detalle qué hay y cómo se protege.',
        ],
        code: false,
      },
      {
        tag: 'autenticación',
        title: 'La sesión no llegaba desde la app móvil',
        text: [
          'En la web, las rutas `/api` leían la sesión de la cookie. Pero la app es una exportación estática dentro de un WebView: el cliente de Supabase guarda la sesión en localStorage y las peticiones no llevan esa cookie, así que todo lo que pasaba por el servidor devolvía 401 desde el móvil.',
          'Lo resolví haciendo que los clientes envíen el access token en la cabecera `Authorization: Bearer`, y cada ruta lo valida contra Supabase. En la web la cookie sigue funcionando como antes.',
        ],
        code: true,
      },
      {
        tag: 'costes',
        title: 'Lo que cuesta dinero cada vez que se usa',
        text: [
          'El asistente, la lectura de billetes, las rutas y las llamadas se pagan por uso. Las rutas que los llaman tienen un límite de peticiones y un cupo diario por persona y para el servicio en conjunto, más pequeño para los invitados, y los tramos de ruta se calculan una vez y se guardan en lugar de recalcularse cada vez que alguien abre una pantalla.',
        ],
        code: false,
      },
    ],
    codeNote:
      'La línea resaltada valida el token preguntando a Supabase en vez de decodificarlo en local, así que un token caducado o revocado no pasa.',
    statusTitle: 'Lo que no hace aún',
    statusNote: 'Proyecto en marcha, no terminado',
    todayTitle: 'Límites de hoy',
    today: [
      'No está en ninguna tienda: Android se instala como APK de prueba y iOS está preparado pero sin publicar.',
      'Los vuelos de amistades todavía no avisan de retrasos, cancelaciones, despegues ni aterrizajes.',
      'Las actividades dan por hecho que va todo el grupo; aún no tienen participantes propios.',
      'La capa social (feed, likes, comentarios, seguidores) está escrita pero cerrada de forma temporal: al ser una red social hay que adaptarla a las condiciones de seguridad necesarias, y está aparcada mientras se pule lo más importante de la app.',
      'La sincronización con Google Calendar está desactivada: Google exige verificar la app para usar el permiso de calendario, y hasta que lo haga no se puede abrir a cualquier persona.',
    ],
    nextTitle: 'Lo que viene',
    next: [
      'Vuelos con retrasos, cancelaciones y avisos cuando un amigo despega o aterriza.',
      'Propuestas al grupo que se sellan en el plan cuando la mayoría las acepta.',
      'Buscar sitios con Google Places desde el propio chat.',
      'Participantes por actividad.',
      'Publicar la app de Android de forma estable.',
    ],
    other: 'Siguiente',
  },
  build: {
    // Case page of the portfolio project: its title and status come from projects.json.
    toc: 'Contenido del caso',
    status: 'Estado',
    lastDeploy: 'Último despliegue',
    runs: 'Ver sus ejecuciones en GitHub Actions',
    facts: [
      { label: 'Alojamiento', value: 'Azure Storage y Cloudflare' },
      { label: 'Región', value: 'Spain Central' },
      { label: 'Equipo', value: 'Proyecto individual' },
      { label: 'Stack', value: 'Vue 3 · Vite · Terraform · GitHub Actions · Python' },
    ],
    repo: 'Ver el repositorio',
    other: 'Otro proyecto',
    lead: 'Esta web es estática. Está hecha con Vue 3 y Vite, se sirve desde Azure Storage y tiene Cloudflare delante para el dominio y el HTTPS. La parte de Azure está descrita en Terraform, GitHub Actions la despliega sin guardar ninguna credencial de Azure y un script en Python la revisa una vez al día. [El código está en GitHub.](https://github.com/cayeyemito/portfolio)',
    architecture: 'Arquitectura',
    pipeline: 'Pipeline',
    pipelineText:
      'Son tres workflows de GitHub Actions, y el nombre de cada uno lleva a sus ejecuciones reales, así que los ticks se pueden comprobar. Para entrar en Azure usan OIDC: en cada ejecución, Entra ID cambia el token de GitHub por un acceso temporal, y solo si viene de este repositorio y de la rama o la pull request que espera. El único secreto guardado es el token de Cloudflare, que solo sirve para publicar el Worker.',
    workflows: [
      {
        file: 'ci.yml',
        trigger: 'en cada pull request',
        steps: [
          { name: 'npm ci' },
          { name: 'lint', detail: 'oxlint, ESLint y Prettier' },
          { name: 'tests', detail: 'Vitest, también los del Worker' },
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
          { name: 'wrangler deploy', detail: 'Worker de Cloudflare' },
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
      'Lo de Azure vive en `infra/azure/`, y el estado de Terraform se guarda en una cuenta de Storage con versionado. A mano solo hice tres cosas: esa cuenta, que tiene que existir antes de que Terraform arranque, el presupuesto general de la suscripción y la configuración de Cloudflare.',
    iacItems: [
      'Una cuenta de Storage con la web estática, que sirve el `index.html` de cada carpeta y el `404.html` cuando una ruta no existe. Solo acepta HTTPS con TLS 1.2 y no tiene claves de acceso, así que todo lo que entra lo hace con una identidad.',
      'Dos identidades de Entra ID con *federated credentials* para GitHub. La de despliegue solo puede escribir en esa cuenta, y la que usa el plan de las pull requests solo puede leer.',
      'Los logs de acceso, que se guardan en Log Analytics durante 30 días con una cuota diaria para que el coste no se dispare.',
      'Un presupuesto que avisa al 50 % y al 100 %, y también cuando la previsión del mes pasa del límite.',
      'Delante está Cloudflare, en el plan gratuito, con el DNS de `cayeyeste.com` y el certificado. Azure Storage admite un dominio propio, pero no le pone HTTPS si no pagas Front Door, así que Cloudflare termina el TLS y un Worker (`infra/cloudflare/worker.js`) pide cada página a Azure con su propio nombre, porque el plan gratuito no deja cambiar la cabecera Host. De paso, el Worker añade las cabeceras de seguridad y quita las que delatan que detrás hay Azure.',
    ],
    opsTitle: 'Operación',
    opsText:
      'Una vez al día, un workflow programado lanza `ops/site_health.py`. Comprueba que las páginas y los enlaces de los proyectos responden, cuántos días le quedan al certificado, que en la cuenta están los ficheros que tienen que estar y qué errores 4xx y 5xx han aparecido en los logs, esto último con una consulta KQL a Log Analytics. El informe se publica en [/status](/status/), y si algo falla el job acaba en rojo y GitHub me avisa por email.',
    fromAwsTitle: 'De AWS a Azure',
    fromAwsText:
      'Al principio lo diseñé para AWS. Esa versión está en `infra/aws/` y pasa `terraform validate`, pero nunca llegó a desplegarse, porque la verificación de la cuenta de AWS se alargó y acabé montándolo en Azure. La arquitectura es la misma y lo que cambian son las piezas:',
    fromAwsHead: ['AWS', 'Azure'],
    fromAwsRows: [
      ['S3 privado', 'Storage con web estática'],
      ['CloudFront y una CloudFront Function', 'Cloudflare y un Worker'],
      ['Roles de IAM con OIDC', 'Entra ID con federated credentials'],
      ['Logs de CloudFront', 'Log Analytics'],
      ['AWS Budgets', 'Presupuestos de Azure'],
    ],
    notCoveredTitle: 'Qué no cubre',
    notHaveTitle: 'Lo que no tiene',
    notHave: [
      'Kubernetes, que para una web estática no tendría sentido.',
      'Alta disponibilidad de verdad, porque todo está en una sola suscripción y una sola región.',
      'Un entorno de staging; cada pull request se revisa con el build y el plan de Terraform.',
    ],
    wouldDoTitle: 'Lo que haría en producción',
    wouldDo: [
      'Separar los entornos en suscripciones distintas.',
      'Llevar Cloudflare también a Terraform, que ahora se configura en su panel.',
      'Lanzar el `terraform apply` desde el pipeline, con aprobación manual, en lugar de en local.',
      'Poner alertas de Azure Monitor sobre los errores 5xx en vez de depender del email de GitHub.',
    ],
  },
}

export type Messages = typeof es
