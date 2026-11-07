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
      'La infraestructura se diseñó primero para AWS: S3 privado, CloudFront con Origin Access Control, roles IAM con OIDC y AWS Budgets. Sigue en `infra/aws/`, validada con `terraform validate` pero sin desplegar, porque la cuenta nueva se quedó bloqueada en la verificación. La pasé a Azure, donde la arquitectura es la misma idea con otras piezas: Storage en lugar de S3, Entra ID en lugar de IAM y Log Analytics en lugar de los logs de CloudFront.',
    notCoveredTitle: 'Qué no cubre',
    notCoveredText:
      'No hay Kubernetes ni alta disponibilidad real: es un sitio estático en una sola suscripción. Tampoco hay CDN: en Azure costaría una cuota fija mensual (Front Door) y, para un portfolio, la web estática de Storage basta. En producción separaría entornos en suscripciones distintas, pondría Front Door con dominio propio y cabeceras de seguridad, y movería el `terraform apply` al pipeline con aprobación manual.',
  },
}

export type Messages = typeof es
