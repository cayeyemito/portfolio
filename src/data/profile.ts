// Personal details and experience. Projects live in projects.json.
export const profile = {
  name: 'Cayetano Yeste',
  headline: 'DevOps y desarrollo junior',
  intro:
    'Perfil junior entre DevOps y desarrollo. En EY desarrollé con Vue y Java Spring la aplicación de NH Hoteles y la desplegaba con Jenkins; en Itequia mantuve los agentes de build de Azure DevOps Pipelines. Me interesa la parte que va del código a producción.',
  location: 'Barcelona · abierto a remoto',
  email: 'cayetanoym@gmail.com',
  links: {
    github: 'https://github.com/cayeyemito',
    linkedin: 'https://www.linkedin.com/in/cayetano-yeste-morant-a4b5231b3',
  },
}

// The first CV is the main download button.
export const cvs = [
  { label: 'CV DevOps', href: '/cv/Cayetano_Yeste_CV_DevOps.pdf' },
  { label: 'CV Full Stack', href: '/cv/Cayetano_Yeste_CV_FullStack.pdf' },
]

export type Job = {
  role: string
  company: string
  period: string
  summary: string
}

export const experience: Job[] = [
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
]
