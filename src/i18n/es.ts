// Spanish strings. en.ts must have exactly the same shape (type Messages).
// Strings rendered with <RichText> may contain `code`, [links](/url) and *emphasis*.
export const es = {
  nav: {
    label: 'Principal',
    projects: 'Proyectos',
    build: 'Cómo está hecha',
    experience: 'Experiencia',
    contact: 'Contacto',
    switchLanguage: 'Read in English',
  },
  theme: {
    toDark: 'Activar el modo oscuro',
    toLight: 'Activar el modo claro',
  },
  profile: {
    location: 'Barcelona · abierto a remoto',
    headline: 'DevOps y desarrollo junior',
    intro:
      'Perfil junior entre DevOps y desarrollo. En EY desarrollé con Vue y Java Spring la aplicación de NH Hoteles y la desplegaba con Jenkins; en Itequia mantuve los agentes de build de Azure DevOps Pipelines. Me interesa la parte que va del código a producción.',
    cvButton: 'CV en PDF',
  },
  // The first CV is the main download button.
  cvs: [
    { label: 'CV DevOps', href: '/cv/Cayetano_Yeste_CV_DevOps.pdf' },
    { label: 'CV Full Stack', href: '/cv/Cayetano_Yeste_CV_FullStack.pdf' },
  ],
  experience: [
    {
      role: 'Consultor de Tecnología de la Información Junior',
      company: 'EY',
      period: 'Oct 2025 – Jun 2026',
      summary:
        'Desarrollo full stack de la aplicación de NH Hoteles con Vue y Java Spring en un equipo Scrum, y despliegue en el entorno de pruebas con Jenkins. Automaticé con IA las pruebas de mi código en un proyecto sin tests.',
    },
    {
      role: 'DevOps Engineer (prácticas)',
      company: 'Itequia',
      period: 'Mar 2021 – Jun 2022',
      summary:
        'Mantenimiento de los agentes de build de Azure DevOps Pipelines (VM Windows en Azure y on-premise), diagnóstico de fallos revisando logs, scripts en PowerShell y Bash, y copias de seguridad diarias.',
    },
    {
      role: 'Analista de Datos',
      company: 'Little Suite',
      period: 'Feb 2019 – Ago 2020',
      summary:
        'Gestión de bases de datos MySQL, cuidando su integridad y seguridad, e informes técnicos para la dirección y los clientes.',
    },
  ],
  projects: {
    title: 'Proyectos',
    demo: 'Ver demo',
    repo: 'Repositorio',
  },
  home: {
    buildTitle: 'Cómo está hecha esta web',
    buildIntro:
      'Esta web es estática y vive en Azure Storage, servida con HTTPS como web estática. La infraestructura está definida en Terraform, cada push a `main` la despliega GitHub Actions y un script en Python la revisa cada día.',
    pipelineLabel: 'Pasos del pipeline',
    buildMore: 'Ver el pipeline, la infraestructura y la operación →',
    experienceTitle: 'Experiencia',
    cvsLabel: 'CV completo en PDF:',
    contactTitle: 'Contacto',
    contactBefore: 'Escríbeme a',
    contactOr: 'o por',
  },
  status: {
    allOk: 'Todos los sistemas operativos',
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
    madeWith: 'Hecha con Vue, desplegada en Azure con Terraform y GitHub Actions',
    status: 'Estado',
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
    eyebrow: 'Proyecto DevOps',
    title: 'Cómo está hecha esta web',
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
      'La infraestructura se diseñó primero para AWS: S3 privado, CloudFront con Origin Access Control, roles IAM con OIDC y AWS Budgets. Sigue en `infra/aws/`, validada pero sin desplegar, porque la cuenta nueva se quedó bloqueada en la verificación. La pasé a Azure, donde la arquitectura es la misma idea con otras piezas: Storage en lugar de S3, Entra ID en lugar de IAM y Log Analytics en lugar de los logs de CloudFront.',
    notCoveredTitle: 'Qué no cubre',
    notCoveredText:
      'No hay Kubernetes ni alta disponibilidad real: es un sitio estático en una sola suscripción. Tampoco hay CDN: en Azure costaría una cuota fija mensual (Front Door) y, para un portfolio, la web estática de Storage basta. En producción separaría entornos en suscripciones distintas, pondría Front Door con dominio propio y cabeceras de seguridad, y movería el `terraform apply` al pipeline con aprobación manual.',
  },
}

export type Messages = typeof es
