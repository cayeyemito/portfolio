// Personal details and experience. Projects live in projects.json.
export const profile = {
  name: 'Cayetano Yeste',
  headline: 'DevOps y desarrollo junior',
  intro:
    'Desarrollador en Barcelona con experiencia en consultoría tecnológica en EY y en sistemas en Itequia. Me interesa la parte que va del código a producción: infraestructura, despliegues y operación.',
  location: 'Barcelona · abierto a remoto',
  email: 'cayetanoym@gmail.com',
  cv: '/cv/Cayetano_Yeste_CV_ES.pdf',
  links: {
    github: 'https://github.com/cayeyemito',
    linkedin: 'https://www.linkedin.com/in/cayetano-yeste-morant',
  },
}

export type Job = {
  role: string
  company: string
  summary: string
}

export const experience: Job[] = [
  {
    role: 'Technology Consulting',
    company: 'EY',
    summary:
      'Consultoría para NH Hoteles: análisis de requisitos, desarrollo con Vue y TypeScript e implantación de soluciones con equipos multidisciplinares. Automatización con IA para reducir tiempos de desarrollo.',
  },
  {
    role: 'DevOps',
    company: 'Itequia',
    summary:
      'Resolución de incidencias y soporte de sistemas en el equipo técnico. Planificación de tareas y mantenimiento de bases de datos y registros.',
  },
  {
    role: 'Analista informático',
    company: 'Little Suite',
    summary:
      'Informes técnicos para dirección y clientes. Administración de bases de datos, cuidando su integridad y seguridad.',
  },
]
