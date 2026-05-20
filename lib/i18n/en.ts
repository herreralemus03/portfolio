export const en = {
  meta: {
    title: "hlstudios — Component Showcase",
    description: "Software development & UI component portfolio by Fernando Herrera",
  },
  topBar: { brand: "hlstudios" },
  langSwitch: "Español",
  langTarget: "es",
  hero: {
    tagline: "Software development & UI components",
    github: "GitHub",
    contact: "Contact",
  },
  sections: {
    stack: "Stack",
    demos: "Component Demos",
    about: "About the Author",
    experience: "Experience",
    technicalSkills: "Technical Skills",
    otherSkills: "Other Skills",
    personalSkills: "Personal Skills",
    certifications: "Certifications",
  },
  demos: [
    {
      slug: "debit-card",
      title: "Debit Card Generator",
      description:
        "Interactive 3D credit/debit card with real-time glare, automatic brand detection, Luhn validation, and image export.",
      tags: ["Canvas", "3D CSS", "Animation", "TypeScript"],
    },
    {
      slug: "skeleton-search",
      title: "Skeleton Search UI",
      description:
        "Neumorphic search interface with animated shimmer skeleton loaders and simulated async data fetching.",
      tags: ["Neumorphism", "Skeleton", "UX Pattern"],
    },
  ],
  demoBack: "back",
  viewDemo: "View demo",
  debitCard: {
    title: "Debit Card Generator",
    description: "Automatic brand detection, Luhn validation and image export.",
    formTitle: "Card data",
    number: "Card number",
    cardName: "Cardholder name",
    from: "From",
    to: "To",
    download: "Download image",
    preview: "Preview",
    luhnValid: "Valid number (Luhn)",
    luhnInvalid: "Invalid number (Luhn)",
  },
  skeletonSearch: { title: "Skeleton Search UI" },
  about: {
    name: "Fernando Herrera",
    title: "Full Stack Developer",
    degree: "B.Sc. in Information Management",
    location: "San Salvador, El Salvador",
    profile:
      "Results-driven Full Stack Developer with solid experience designing, building, and maintaining scalable software solutions across banking, retail, and enterprise environments. Strong focus on backend development using Java/Spring, complemented with hands-on expertise in modern frontend frameworks such as Angular, React, and Flutter. Skilled in microservices architecture, cloud platforms (AWS, GCP), CI/CD pipelines, and database technologies including MongoDB, PostgreSQL, and Oracle PL/SQL. Known for delivering clean, efficient, and maintainable code while optimizing system performance and ensuring high standards of security and reliability.",
    contact: {
      phone: "+503 6015 9986",
      email: "herreralemus.03@gmail.com",
      github: "herreralemus03",
      linkedin: "fernando-herrera-b7a79b14b",
    },
    yearsLabel: "yrs",
    experience: [
      {
        company: "Banco Davivienda",
        role: "Backend Developer",
        period: "Mar 2025 – Dec 2025",
        description:
          "Participate in the collector payment project, developing and maintaining backend services using Java (Spring Boot), deployed on WildFly and integrated with DB2. Contribute to the optimization of query and transactional processes, ensuring system stability, scalability, and security.",
      },
      {
        company: "Banco Cuscatlán",
        role: "Backend Developer",
        period: "May 2024 – Dec 2024",
        description:
          "Collaborated on the launch of the 3.0 app for Honduras, focusing on backend development. Performed exhaustive code analysis using SonarQube and applied optimizations to reduce response times between AS/400 database queries and each service, significantly improving user experience.",
      },
      {
        company: "Freund",
        role: "Backend Developer",
        period: "Sep 2023 – Jan 2024",
        description:
          "Worked as a Java Faces developer, implementing the Facade pattern to deploy a human resources module on Oracle WebLogic. Used Oracle Database and developed stored procedures to query and retrieve personnel information. Additionally worked with .NET Core and Entity Framework Core for data management in other modules.",
      },
      {
        company: "Siman",
        role: "Full Stack Developer",
        period: "May 2022 – Jul 2023",
        description:
          "Led the development of a microservices infrastructure for process automation using Spring Boot, JMS queues, JPA, and JWT authentication with Spring Security, running in continuous integration with Kubernetes/Docker deployed on GCP.",
      },
      {
        company: "In2Clouds",
        role: "Cloud Architect",
        period: "Aug 2021 – Feb 2022",
        description:
          "Actively participated in designing, developing, and deploying a cloud-based Contact Center using AWS services, including API implementation.",
      },
      {
        company: "Equifax",
        role: "Full Stack Developer",
        period: "Jul 2021 – May 2022",
        description:
          "Managed maintenance, migration, and feature implementation, collaborating on incident mitigation in microservices built with Spring Boot, Angular, and Jenkins, ensuring code quality standards with SonarQube.",
      },
      {
        company: "Digestyc",
        role: "Full Stack Developer",
        period: "Mar 2021 – Jun 2021",
        description:
          "Contributed to a survey system for the national healthcare platform using Java, Spring Boot, and Flutter for a mobile application. Created features to capture responses and migrate survey results efficiently.",
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
    personalSkills: ["Leadership", "Communication", "Responsibility"],
    certifications: [
      { name: "MOS",     year: 2010, issuer: "Supérate" },
      { name: "TOEIC",   year: 2010, issuer: "Supérate" },
      { name: "Flutter", year: 2019, issuer: "Udemy" },
      { name: "Angular", year: 2021, issuer: "Udemy" },
      { name: "React",   year: 2024, issuer: "Udemy" },
      { name: "Git",     year: 2024, issuer: "Academia Desafío Latam" },
    ],
  },
  footer: { by: "by Fernando Herrera" },
};

export type Dict = typeof en;
