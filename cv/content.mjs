// Contenido de los CV en PDF que enlaza la web. `npm run cv` los genera en public/cv/.
// Un CV por objeto; los textos admiten **negrita**.

const contact = {
  es: {
    place: 'Barcelona, España',
    links: ['linkedin.com/in/cayetano-yeste-morant-a4b5231b3', 'github.com/cayeyemito'],
  },
  en: {
    place: 'Barcelona, Spain',
    links: ['linkedin.com/in/cayetano-yeste-morant-a4b5231b3', 'github.com/cayeyemito'],
  },
}

const site = 'cayeyeste.com'
const email = 'cayetanoym@gmail.com'

const languages = {
  es: 'Español (nativo) · Catalán (nativo) · Inglés (avanzado)',
  en: 'Spanish (native) · Catalan (native) · English (advanced)',
}

const education = {
  es: [
    {
      title: 'Técnico Superior en Desarrollo de Aplicaciones Web (DAW)',
      org: 'IFP',
      period: '2024 – 2026',
      sub: 'Barcelona · Despliegue de aplicaciones web con Docker en servidores Linux',
    },
    {
      title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
      org: "IES Joan d'Àustria",
      period: '2020 – 2022',
      sub: 'Barcelona',
    },
  ],
  en: [
    {
      title: 'Higher Vocational Diploma (CFGS, EQF 5) in Web Application Development',
      org: 'IFP',
      period: '2024 – 2026',
      sub: 'Barcelona · Deployed web applications with Docker on Linux servers',
    },
    {
      title: 'Higher Vocational Diploma (CFGS, EQF 5) in Multiplatform Application Development',
      org: "IES Joan d'Àustria",
      period: '2020 – 2022',
      sub: 'Barcelona',
    },
  ],
}

const projects = {
  frimee: {
    es: {
      name: 'Frimee',
      link: 'frimee.es',
      text: 'App de viajes en grupo, web y Android: itinerario, gastos, chat con llamadas y asistente con IA. Next.js, Supabase (PostgreSQL, RLS), Capacitor y LiveKit. Hice la mayor parte del frontend y todo el backend.',
    },
    en: {
      name: 'Frimee',
      link: 'frimee.es',
      text: 'Group trip app, web and Android: itinerary, expenses, chat with calls and an AI assistant. Next.js, Supabase (PostgreSQL, RLS), Capacitor and LiveKit. I built most of the frontend and all of the backend.',
    },
  },
  portfolio: {
    es: {
      name: 'Portfolio',
      link: site,
      text: 'Vue 3 sobre Azure con la infraestructura en Terraform, despliegue con GitHub Actions y OIDC (sin secretos), Cloudflare delante y revisión diaria en Python.',
    },
    en: {
      name: 'Portfolio',
      link: site,
      text: 'Vue 3 on Azure with the infrastructure in Terraform, deployment with GitHub Actions and OIDC (no secrets), Cloudflare in front and a daily Python health check.',
    },
  },
}

const fullStackJobs = {
  es: [
    {
      role: 'Consultor de Tecnología de la Información Junior',
      org: 'EY',
      period: 'Octubre 2025 – Junio 2026',
      sub: 'Technology Consulting · Barcelona (híbrido) · Contrato de formación',
      points: [
        'Desarrollo de nuevas funcionalidades y corrección de incidencias en la aplicación web de NH Hoteles (Spring Boot + Vue) en todo el ciclo: análisis de requisitos, implementación, pruebas y despliegue.',
        'Backend (Spring Boot): endpoints de API REST, lógica de negocio y capa de acceso a datos con JPA/Hibernate y consultas SQL escritas a mano.',
        'Frontend (Vue): ampliación de componentes existentes y conexión con la API REST del backend; desarrollo puntual de componentes y maquetación nuevos.',
        'Integración en la aplicación del contenido gestionado en el CMS Tridion.',
        'Introducción de los primeros tests unitarios automatizados en un proyecto sin cobertura (JUnit en backend y tests de frontend) para mi propio código, usando IA generativa para acelerar su escritura y reduciendo el tiempo de validación manual.',
        'Despliegue en el entorno de pruebas mediante jobs de CI/CD en Jenkins, actualizando su configuración tras los cambios.',
        'Git (ramas y pull requests) y Scrum con sprints en Jira; documentación técnica y seguimiento de tareas y plazos.',
      ],
    },
    {
      role: 'DevOps Engineer (prácticas)',
      org: 'Itequia',
      period: 'Marzo 2021 – Junio 2022',
      sub: 'Barcelona · Consultora TI de unas 35 personas',
      points: [
        'Co-mantenimiento de la infraestructura de CI/CD: agentes de build de Azure DevOps Pipelines en máquinas virtuales Windows (Azure y on-premise), garantizando que builds y despliegues funcionaran correctamente.',
        'Automatización de tareas de mantenimiento con scripts en PowerShell y Bash: copias de seguridad diarias, limpieza de ficheros antiguos y mantenimiento de la base de datos SQL.',
        'Gestión de incidencias en Jira Service Management y seguimiento en reuniones diarias con la dirección y los project managers.',
      ],
    },
    {
      role: 'Analista de Datos',
      org: 'Little Suite',
      period: 'Febrero 2019 – Agosto 2020',
      sub: 'Barcelona · Jornada parcial',
      points: [
        'Informes en Excel y presentaciones para la dirección y para clientes; gestión y mantenimiento de bases de datos MySQL, garantizando su integridad y seguridad.',
      ],
    },
  ],
  en: [
    {
      role: 'Junior IT Consultant',
      org: 'EY',
      period: 'October 2025 – June 2026',
      sub: 'Technology Consulting · Barcelona (hybrid) · Trainee contract',
      points: [
        'Developed new features and fixed issues in the NH Hotels web application (Spring Boot + Vue) across the full lifecycle: requirements analysis, implementation, testing and deployment.',
        'Backend (Spring Boot): built REST API endpoints, business logic and the data access layer with JPA/Hibernate and hand-written SQL queries.',
        'Frontend (Vue): extended existing components and connected them to the backend REST API; occasionally built new components and layouts.',
        'Integrated content managed in the Tridion CMS into the application.',
        'Introduced the first automated unit tests on a project with no test coverage (JUnit on the backend, frontend tests) for my own code, using generative AI to speed up test writing and reducing manual validation time.',
        'Deployed to the test environment through Jenkins CI/CD jobs, updating the job configuration after changes.',
        'Git (branches and pull requests) and Scrum sprints in Jira; technical documentation and tracking of tasks and deadlines.',
      ],
    },
    {
      role: 'DevOps Engineer Intern',
      org: 'Itequia',
      period: 'March 2021 – June 2022',
      sub: 'Barcelona · IT consultancy of around 35 people',
      points: [
        'Co-maintained the CI/CD infrastructure: Azure DevOps Pipelines build agents on Windows virtual machines (Azure and on-premise), keeping builds and deployments running correctly.',
        'Automated maintenance tasks with PowerShell and Bash scripts: daily backups, clean-up of old files and SQL database maintenance.',
        'Handled incidents in Jira Service Management and reported in daily status meetings with management and project managers.',
      ],
    },
    {
      role: 'Data Analyst',
      org: 'Little Suite',
      period: 'February 2019 – August 2020',
      sub: 'Barcelona · Part-time',
      points: [
        'Prepared Excel reports and presentations for management and clients; managed and maintained MySQL databases, ensuring data integrity and security.',
      ],
    },
  ],
}

const devOpsJobs = {
  es: [
    {
      role: 'Consultor de Tecnología de la Información Junior',
      org: 'EY',
      period: 'Octubre 2025 – Junio 2026',
      sub: 'Technology Consulting · Barcelona (híbrido) · Contrato de formación',
      points: [
        'Despliegue de la aplicación de NH Hoteles (Vue, Java Spring Boot) en el entorno de pruebas mediante Jenkins, ajustando la configuración de los jobs cuando los cambios lo requerían.',
        'Primeros tests automatizados de mi propio código en un proyecto sin tests, escritos con ayuda de IA, reduciendo el tiempo de validación manual.',
        'Git con ramas y pull requests, Scrum con sprints en Jira y documentación técnica del proyecto.',
      ],
    },
    {
      role: 'DevOps Engineer (prácticas)',
      org: 'Itequia',
      period: 'Marzo 2021 – Junio 2022',
      sub: 'Barcelona · Consultora TI de unas 35 personas',
      points: [
        'Mantenimiento, junto a otro compañero, de las máquinas virtuales Windows (en Azure y on-premise) que actuaban como agentes de build de Azure DevOps Pipelines, garantizando que cada push se construyera y desplegara.',
        'Diagnóstico de fallos en agentes y pipelines revisando logs hasta identificar la causa raíz, usando el reinicio solo como medida de contención.',
        'Copias de seguridad diarias y limpieza de ficheros antiguos para liberar espacio en disco de forma segura; mantenimiento de la base de datos SQL.',
        'Automatización de tareas de mantenimiento con scripts en PowerShell y Bash.',
        'Gestión de incidencias en Jira Service Management y reunión diaria de seguimiento con la dirección y los project managers.',
      ],
    },
    {
      role: 'Analista de Datos',
      org: 'Little Suite',
      period: 'Febrero 2019 – Agosto 2020',
      sub: 'Barcelona · Jornada parcial',
      points: [
        'Gestión y mantenimiento de bases de datos MySQL, garantizando su integridad y seguridad.',
        'Informes técnicos en Excel y presentaciones para la dirección y para clientes.',
      ],
    },
  ],
  en: [
    {
      role: 'Junior IT Consultant',
      org: 'EY',
      period: 'October 2025 – June 2026',
      sub: 'Technology Consulting · Barcelona (hybrid) · Trainee contract',
      points: [
        'Deployed the NH Hotels application (Vue, Java Spring Boot) to the test environment through Jenkins, adjusting the job configuration when changes required it.',
        'First automated tests for my own code on a project with no tests, written with the help of AI, reducing manual validation time.',
        'Git with branches and pull requests, Scrum sprints in Jira and technical documentation of the project.',
      ],
    },
    {
      role: 'DevOps Engineer Intern',
      org: 'Itequia',
      period: 'March 2021 – June 2022',
      sub: 'Barcelona · IT consultancy of around 35 people',
      points: [
        'Maintained, with one colleague, the Windows virtual machines (on Azure and on-premise) that ran as Azure DevOps Pipelines build agents, making sure every push was built and deployed.',
        'Troubleshot agent and pipeline failures by reading the logs down to the root cause, using restarts only as containment.',
        'Daily backups and clean-up of old files to free disk space safely; SQL database maintenance.',
        'Automated maintenance tasks with PowerShell and Bash scripts.',
        'Handled incidents in Jira Service Management and a daily follow-up meeting with management and project managers.',
      ],
    },
    {
      role: 'Data Analyst',
      org: 'Little Suite',
      period: 'February 2019 – August 2020',
      sub: 'Barcelona · Part-time',
      points: [
        'Managed and maintained MySQL databases, ensuring their integrity and security.',
        'Technical reports in Excel and presentations for management and clients.',
      ],
    },
  ],
}

export const cvs = [
  {
    file: 'Cayetano_Yeste_CV_FullStack.pdf',
    lang: 'es',
    headline: 'Desarrollador Full Stack Junior · Java, Spring Boot · Vue, React · CI/CD',
    labels: {
      profile: 'Perfil profesional',
      skills: 'Habilidades técnicas',
      experience: 'Experiencia profesional',
      projects: 'Proyectos',
      education: 'Formación',
      languages: 'Idiomas',
    },
    profile:
      'Desarrollador full stack junior con más peso en el backend y experiencia práctica en todo el ciclo de vida del software en un entorno de consultoría. En EY desarrollé funcionalidades para la aplicación web de NH Hoteles desde el análisis de requisitos hasta el despliegue: endpoints de API REST, lógica de negocio y acceso a datos con Spring Boot y JPA, componentes Vue e integración con el CMS Tridion, dentro de un equipo Scrum. En Itequia co-mantuve la infraestructura de CI/CD en Azure DevOps Pipelines. Uso IA generativa a diario para programar, depurar, refactorizar, escribir tests y documentar.',
    skills: [
      ['Lenguajes', 'Java, TypeScript, JavaScript, Python, SQL, C#, PHP'],
      ['Frontend', 'Vue, React, Next.js, HTML, CSS'],
      ['Backend', 'Spring Boot, JPA/Hibernate, APIs REST, JUnit, Supabase'],
      [
        'CI/CD y cloud',
        'Jenkins, Azure DevOps Pipelines, GitHub Actions, Azure, Terraform, Docker, Linux, Git, PowerShell, Bash',
      ],
      ['Bases de datos', 'PostgreSQL, MySQL'],
      ['IA', 'Claude, ChatGPT para programar, depurar, refactorizar, testear y documentar'],
      ['Metodologías', 'Scrum, Agile, Jira'],
    ],
    jobs: fullStackJobs.es,
    projects: [projects.frimee.es, projects.portfolio.es],
    order: ['profile', 'skills', 'experience', 'projects', 'education', 'languages'],
  },
  {
    file: 'Cayetano_Yeste_CV_FullStack_EN.pdf',
    lang: 'en',
    headline: 'Junior Full Stack Developer · Java, Spring Boot · Vue, React · CI/CD',
    labels: {
      profile: 'Profile',
      skills: 'Technical skills',
      experience: 'Professional experience',
      projects: 'Projects',
      education: 'Education',
      languages: 'Languages',
    },
    profile:
      'Junior full stack developer with a stronger focus on the backend and hands-on experience across the full software development lifecycle in a consulting environment. At EY I developed features for the NH Hotels web application from requirements analysis to deployment: REST API endpoints, business logic and data access with Spring Boot and JPA, Vue components and Tridion CMS integration, as part of a Scrum team. At Itequia I co-maintained the CI/CD infrastructure on Azure DevOps Pipelines. I use generative AI daily for coding, debugging, refactoring, test writing and documentation.',
    skills: [
      ['Languages', 'Java, TypeScript, JavaScript, Python, SQL, C#, PHP'],
      ['Frontend', 'Vue, React, Next.js, HTML, CSS'],
      ['Backend', 'Spring Boot, JPA/Hibernate, REST APIs, JUnit, Supabase'],
      [
        'CI/CD and cloud',
        'Jenkins, Azure DevOps Pipelines, GitHub Actions, Azure, Terraform, Docker, Linux, Git, PowerShell, Bash',
      ],
      ['Databases', 'PostgreSQL, MySQL'],
      ['AI', 'Claude, ChatGPT for coding, debugging, refactoring, testing and documentation'],
      ['Methodologies', 'Scrum, Agile, Jira'],
    ],
    jobs: fullStackJobs.en,
    projects: [projects.frimee.en, projects.portfolio.en],
    order: ['profile', 'skills', 'experience', 'projects', 'education', 'languages'],
  },
  {
    file: 'Cayetano_Yeste_CV_DevOps.pdf',
    lang: 'es',
    headline: 'DevOps Junior · CI/CD · Azure DevOps, Jenkins, GitHub Actions · Terraform',
    labels: {
      profile: 'Perfil profesional',
      skills: 'Habilidades técnicas',
      experience: 'Experiencia profesional',
      projects: 'Proyectos',
      education: 'Formación',
      languages: 'Idiomas',
    },
    profile:
      'Perfil técnico junior orientado a DevOps y operaciones IT, con experiencia en pipelines CI/CD con Azure DevOps y Jenkins, mantenimiento de agentes de build en entornos Azure y on-premise, scripting en PowerShell y Bash y gestión de incidencias en Jira. En mis proyectos, infraestructura como código con Terraform en Azure y despliegue con GitHub Actions y OIDC. Formación en DAW y DAM.',
    skills: [
      ['CI/CD', 'Azure DevOps Pipelines, Jenkins, GitHub Actions (OIDC), Git, pull requests'],
      [
        'Cloud e IaC',
        'Azure, Terraform, Cloudflare, Docker, máquinas virtuales, entornos on-premise',
      ],
      ['Sistemas', 'Linux, Windows'],
      ['Scripting y datos', 'PowerShell, Bash, Python, SQL, MySQL, PostgreSQL'],
      [
        'Operaciones',
        'Jira Service Management, resolución de incidencias, copias de seguridad, monitorización, documentación técnica, Scrum',
      ],
      ['Desarrollo', 'Java, Spring Boot, TypeScript, Vue, Next.js, C#'],
      ['IA aplicada', 'Automatización de pruebas y flujos de trabajo, código asistido por IA'],
    ],
    jobs: devOpsJobs.es,
    projects: [projects.portfolio.es, projects.frimee.es],
    order: ['profile', 'experience', 'projects', 'skills', 'education', 'languages'],
  },
  {
    file: 'Cayetano_Yeste_CV_DevOps_EN.pdf',
    lang: 'en',
    headline: 'Junior DevOps · CI/CD · Azure DevOps, Jenkins, GitHub Actions · Terraform',
    labels: {
      profile: 'Profile',
      skills: 'Technical skills',
      experience: 'Professional experience',
      projects: 'Projects',
      education: 'Education',
      languages: 'Languages',
    },
    profile:
      'Junior technical profile focused on DevOps and IT operations, with experience in CI/CD pipelines on Azure DevOps and Jenkins, build agent maintenance on Azure and on-premise, PowerShell and Bash scripting and incident management in Jira. In my own projects, infrastructure as code with Terraform on Azure and deployment with GitHub Actions and OIDC. Vocational diplomas in web and multiplatform development.',
    skills: [
      ['CI/CD', 'Azure DevOps Pipelines, Jenkins, GitHub Actions (OIDC), Git, pull requests'],
      ['Cloud and IaC', 'Azure, Terraform, Cloudflare, Docker, virtual machines, on-premise'],
      ['Systems', 'Linux, Windows'],
      ['Scripting', 'PowerShell, Bash, Python, SQL, MySQL, PostgreSQL'],
      [
        'Operations',
        'Jira Service Management, incident handling, backups, monitoring, technical documentation, Scrum',
      ],
      ['Development', 'Java, Spring Boot, TypeScript, Vue, Next.js, C#'],
      ['Applied AI', 'Test and workflow automation, AI-assisted coding'],
    ],
    jobs: devOpsJobs.en,
    projects: [projects.portfolio.en, projects.frimee.en],
    order: ['profile', 'experience', 'projects', 'skills', 'education', 'languages'],
  },
].map((cv) => ({
  ...cv,
  name: 'Cayetano Yeste Morant',
  contactLine: [contact[cv.lang].place, site, email],
  links: contact[cv.lang].links,
  education: education[cv.lang],
  languages: languages[cv.lang],
}))
