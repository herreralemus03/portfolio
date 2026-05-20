import type { Dict } from "./en";

export const es: Dict = {
  meta: {
    title: "hlstudios — Component Showcase",
    description: "Portfolio de desarrollo de software y componentes UI por Fernando Herrera",
  },
  topBar: { brand: "hlstudios" },
  langSwitch: "English",
  langTarget: "en",
  hero: {
    tagline: "Desarrollo de software y componentes UI",
    github: "GitHub",
    contact: "Contacto",
  },
  sections: {
    stack: "Stack",
    demos: "Component Demos",
    about: "Sobre el Autor",
    experience: "Experiencia",
    technicalSkills: "Habilidades Técnicas",
    otherSkills: "Otras Habilidades",
    personalSkills: "Habilidades Personales",
    certifications: "Certificaciones",
  },
  demos: [
    {
      slug: "debit-card",
      title: "Generador de Tarjeta",
      description:
        "Tarjeta de crédito/débito interactiva con efecto 3D, glare en tiempo real, detección automática de marca, validación Luhn y exportación como imagen.",
      tags: ["Canvas", "3D CSS", "Animación", "TypeScript"],
    },
    {
      slug: "skeleton-search",
      title: "Skeleton Search UI",
      description:
        "Interfaz de búsqueda con diseño neumórfico, skeleton loaders con shimmer animado y simulación de fetch asíncrono.",
      tags: ["Neumorfismo", "Skeleton", "UX Pattern"],
    },
  ],
  demoBack: "volver",
  viewDemo: "Ver demo",
  debitCard: {
    title: "Generador de Tarjeta",
    description: "Detección de marca automática, validación Luhn y exportación como imagen.",
    formTitle: "Datos de la tarjeta",
    number: "Número",
    cardName: "Nombre del titular",
    from: "Desde",
    to: "Hasta",
    download: "Descargar imagen",
    preview: "Vista previa",
    luhnValid: "Número válido (Luhn)",
    luhnInvalid: "Número inválido (Luhn)",
  },
  skeletonSearch: { title: "Skeleton Search UI" },
  about: {
    name: "Fernando Herrera",
    title: "Full Stack Developer",
    degree: "Lic. en Gerencia Informática",
    location: "San Salvador, El Salvador",
    profile:
      "Desarrollador Full Stack orientado a resultados, con sólida experiencia en el diseño, construcción y mantenimiento de soluciones de software escalables en sectores bancarios, retail y entornos empresariales. Fuerte enfoque en desarrollo backend con Java/Spring, complementado con experiencia práctica en frameworks modernos como Angular, React y Flutter. Especializado en arquitectura de microservicios, plataformas cloud (AWS, GCP), pipelines CI/CD y tecnologías de bases de datos como MongoDB, PostgreSQL y Oracle PL/SQL. Reconocido por entregar código limpio, eficiente y mantenible, optimizando el rendimiento del sistema y garantizando altos estándares de seguridad y confiabilidad.",
    contact: {
      phone: "+503 6015 9986",
      email: "herreralemus.03@gmail.com",
      github: "herreralemus03",
      linkedin: "fernando-herrera-b7a79b14b",
    },
    yearsLabel: "años",
    experience: [
      {
        company: "Banco Davivienda",
        role: "Backend Developer",
        period: "Mar 2025 – Dic 2025",
        description:
          "Participo en el proyecto de pago de colectores, desarrollando y manteniendo servicios backend con Java (Spring Boot), desplegados en WildFly e integrados con DB2. Contribuyo a optimizar procesos de consulta y transacciones, asegurando estabilidad, escalabilidad y seguridad del sistema.",
      },
      {
        company: "Banco Cuscatlán",
        role: "Backend Developer",
        period: "May 2024 – Dic 2024",
        description:
          "Colaboré en el lanzamiento de la aplicación 3.0 de Honduras, enfocado en el lado backend. Realicé un análisis exhaustivo del código utilizando SonarQube y apliqué optimizaciones para reducir tiempos de respuesta entre las consultas a la base de datos AS/400 y los servicios, mejorando significativamente la experiencia del usuario.",
      },
      {
        company: "Freund",
        role: "Backend Developer",
        period: "Sep 2023 – Ene 2024",
        description:
          "Me desempeñé como desarrollador Java Faces, implementando el patrón Facade para desplegar un módulo de recursos humanos en Oracle WebLogic. Utilicé Oracle Database y desarrollé procedimientos almacenados para consultar y recuperar información de personal y procesos. Además, trabajé con .NET Core y Entity Framework Core para la gestión de datos en otros módulos.",
      },
      {
        company: "Siman",
        role: "Full Stack Developer",
        period: "May 2022 – Jul 2023",
        description:
          "Lideré el desarrollo de infraestructura de microservicios para automatización de procesos con Spring Boot, colas JMS, JPA y autenticación JWT con Spring Security, en integración continua sobre Kubernetes/Docker desplegado en GCP.",
      },
      {
        company: "In2Clouds",
        role: "Cloud Architect",
        period: "Ago 2021 – Feb 2022",
        description:
          "Participé activamente en el diseño, desarrollo y despliegue de un Contact Center basado en la nube utilizando servicios de AWS, incluyendo la implementación de su API.",
      },
      {
        company: "Equifax",
        role: "Full Stack Developer",
        period: "Jul 2021 – May 2022",
        description:
          "Gestioné mantenimiento, migración e implementación de nuevas funcionalidades, colaborando en la mitigación de incidencias en microservicios desarrollados con Spring Boot, Angular y Jenkins, manteniendo estándares de calidad mediante SonarQube.",
      },
      {
        company: "Digestyc",
        role: "Full Stack Developer",
        period: "Mar 2021 – Jun 2021",
        description:
          "Contribuí al desarrollo de un sistema de encuestas para el sistema nacional de salud, utilizando Java y Spring Boot en el backend y Flutter para la creación de una aplicación móvil. Implementé funcionalidades para la captura de respuestas y la migración de resultados.",
      },
    ],
    technicalSkills: [
      { name: "Spring Boot", years: 5 },
      { name: "PL/SQL",      years: 5 },
      { name: "Flutter",     years: 5 },
      { name: "PHP",         years: 4 },
      { name: "Angular v12+",years: 4 },
      { name: "NodeJS",      years: 4 },
      { name: "Python",      years: 4 },
      { name: "AWS",         years: 3 },
      { name: "ExpressJS",   years: 3 },
      { name: "React",       years: 2 },
      { name: "Go",          years: 2 },
    ],
    otherSkills: [
      "Spring Batch","Spring Cloud","Spring Security","Eureka","Config Server",
      "JPA","Apache Kafka","RabbitMQ","JMS","JSP","Primefaces","Hibernate","Maven",
      "CI/CD","SonarQube","Fortify","Docker","Kubernetes","Flask","Django",
      "Vue","GraphQL","MongoDB","Oracle Database","WebLogic","GCP","Cloud Build",
      "Terraform","Jenkins","Hashicorp Vault","Git","Bitbucket",
      "DTO","DAO","MVC","BLoC","SOLID",
    ],
    personalSkills: ["Liderazgo", "Comunicación", "Responsabilidad"],
    certifications: [
      { name: "MOS",     year: 2010, issuer: "Supérate" },
      { name: "TOEIC",   year: 2010, issuer: "Supérate" },
      { name: "Flutter", year: 2019, issuer: "Udemy" },
      { name: "Angular", year: 2021, issuer: "Udemy" },
      { name: "React",   year: 2024, issuer: "Udemy" },
      { name: "Git",     year: 2024, issuer: "Academia Desafío Latam" },
    ],
  },
  footer: { by: "por Fernando Herrera" },
};
