import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Terminal, Server, Database, Code2, LayoutTemplate, Cpu, Users, 
  Briefcase, GraduationCap, Mail, Linkedin, Github, ExternalLink, 
  CheckCircle2, Building2, MapPin, Calendar, Award, BookOpen, Target,
  Phone, Sparkles, Cloud, BarChart3, Layers, LineChart, ShieldCheck,
  Lock, Globe2, Rocket
} from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import totvsLogo from "@/assets/totvs-logo.png";
import awsLogo from "@/assets/aws-logo.png";
import oracleLogo from "@/assets/oracle-logo.png";
import sqlserverLogo from "@/assets/sqlserver-logo.png";
import { motion } from "framer-motion";

interface HomeProps {
  targetSection?: string;
  language: "pt" | "en";
}

export default function Home({ targetSection, language }: HomeProps) {
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const content = {
    pt: {
      heroBadge: "Desenvolvedor Python | Coordenador de TI",
      heroTitlePrefix: "Soluções",
      heroTitleHighlight: "Escaláveis",
      heroTitleSuffix: "e Inovação",
      heroSubtitle:
        "Mais de 13 anos combinando desenvolvimento fullstack, APIs REST e gestão estratégica para entregar resultados concretos para os negócios.",
      heroCtaPrimary: "Entrar em Contato",
      heroCtaSecondary: "Ver Experiência",
      heroFloatLeft: "Cloud Native",
      heroFloatRight: "APIs & Integrações",
      aboutTitle: "Apresentação Profissional",
      aboutFloat: "Fullstack & APIs",
      aboutParagraphs: [
        "Desenvolvedor Python com mais de 13 anos de experiência na área de TI, atuo como Coordenador de TI e desenvolvedor fullstack, combinando habilidades técnicas avançadas com sólida experiência em gerenciamento de projetos e equipes. Especialista em APIs REST, Django, Django REST Framework, FastAPI e Flask para desenvolvimento de soluções escaláveis e robustas.",
        "Minha expertise abrange desde o desenvolvimento de sistemas web e mobile até a gestão de infraestrutura, segurança da informação e administração do ERP TOTVS RM. Trabalho com ambientes Cloud Native, Docker e Git Flow, sempre aplicando práticas DevOps para automação e alta disponibilidade. Tenho conhecimento em machine learning e visão computacional (TensorFlow, PyTorch, OpenCV), ampliando o leque de soluções que posso oferecer.",
      ],
      profileTitle: "Perfil Profissional",
      profileParagraphs: [
        "Profissional com sólida formação técnica e acadêmica, especialista em desenvolvimento Python, APIs REST, DevOps, Cloud e gestão de infraestrutura. Experiência comprovada na liderança de equipes multidisciplinares, coordenação de projetos de TIC e negociação com fornecedores.",
        "Reconhecido pela capacidade de resolver problemas complexos, estruturar ambientes críticos, otimizar processos e promover inovação tecnológica com responsabilidade e governança.",
        "Possui habilidades em liderança técnica, gestão de projetos, comunicação eficaz e resolução de problemas complexos. É um profissional proativo, com forte ética de trabalho e compromisso com a entrega de resultados de alta qualidade.",
      ],
      qualitiesTitle: "Principais Qualidades",
      qualitiesFloat: "Liderança & Impacto",
      qualitiesList: [
        "Liderança técnica e gestão de equipes de TI",
        "Pensamento analítico e resolução de problemas",
        "Visão estratégica de tecnologia aplicada ao negócio",
        "Comunicação clara entre áreas técnicas e não técnicas",
        "Capacidade de tomada de decisão em ambientes críticos",
        "Organização, responsabilidade e foco em resultados",
        "Facilidade em aprendizagem e adaptação tecnológica",
      ],
      areasTitle: "Áreas de Atuação",
      skillsTitle: "Habilidades Técnicas",
      skillsFloat: "DevOps",
      experienceTitle: "Experiência Profissional",
      experienceSubtitle: "Liderança técnica e gestão de TI em ambientes industriais e educacionais.",
      experienceFloat: "13+ anos",
      projectsTag: "Projetos Estratégicos",
      projectsTitle: "Projetos de Alto Impacto",
      projectsSubtitle:
        "Atuação estratégica na criação de soluções SaaS, integrações corporativas e modernização de ambientes críticos com foco em escala, segurança e governança.",
      projectsFloat: "SaaS & Integrações",
      projectsPositioningTitle: "Posicionamento",
      projectsPositioningText:
        "Especialista em criação de soluções SaaS, integração de sistemas corporativos e modernização de ambientes críticos, unindo visão estratégica e execução técnica de alto nível.",
      academicTitle: "Docência e Projetos Acadêmicos",
      academicRole: "Professor de Programação e Coordenador de Projetos",
      academicLocation: "SENAI – Caxias/MA",
      academicPeriod: "Maio 2014 – Maio 2022",
      academicDescription:
        "Ministrei aulas de programação do nível básico ao avançado. Coordenei projetos de inovação tecnológica no evento INOVA, com 18 projetos apresentados e 9 premiados, envolvendo automação, segurança da informação e soluções inteligentes.",
      academicHighlightsTitle: "Atuação Acadêmica Complementar",
      academicHighlightsSubtitle: "Docência, capacitação e mentoria em ambientes educacionais.",
      academicMetricsTitle: "Conquistas Acadêmicas",
      academicMetricsSubtitle: "Resultados e impacto na formação técnica.",
      publicationsTitle: "Publicações e Artigos",
      publicationsSubtitle: "Produções técnicas voltadas à integração e segurança de serviços.",
      educationTitle: "Formação Acadêmica",
      educationFloat: "Pós-graduação",
      coursesTitle: "Cursos e Aperfeiçoamentos",
      coursesSubtitle: "Trilhas técnicas que reforçam domínio em backend, APIs, banco de dados e desenvolvimento mobile.",
      coursesBadgeLeft: "Formação técnica",
      coursesBadgeRight: "Aprendizado contínuo",
      certificationsTitle: "Certificações Premium",
      certificationsSubtitle: "AWS, DevOps, Segurança e Arquitetura de Software.",
      languagesTitle: "Idiomas",
      languages: ["Português: Nativo", "Inglês: Intermediário"],
      objectiveTitle: "Objetivo Profissional",
      objectiveFloat: "Visão Estratégica",
      objectiveText:
        "Atuar de forma estratégica como Desenvolvedor Python e Gestor de TI, aplicando conhecimento técnico e visão de negócio para criar soluções escaláveis, seguras e de alto impacto, promovendo eficiência operacional, inovação e crescimento sustentável das organizações.",
      contactTitle: "Contato",
      contactTag: "Disponível para projetos estratégicos",
      contactSubtitle:
        "Vamos conversar sobre liderança, arquitetura e soluções de alto impacto.",
      contactFloat: "Canal direto",
      contactAvailability: "Disponível para projetos",
      contactLocation: "Caxias, Maranhão, Brasil",
    },
    en: {
      heroBadge: "Python Developer | IT Coordinator",
      heroTitlePrefix: "Scalable",
      heroTitleHighlight: "Solutions",
      heroTitleSuffix: "and Innovation",
      heroSubtitle:
        "Over 13 years combining fullstack development, REST APIs, and strategic IT leadership to deliver measurable business impact.",
      heroCtaPrimary: "Get in Touch",
      heroCtaSecondary: "View Experience",
      heroFloatLeft: "Cloud Native",
      heroFloatRight: "APIs & Integrations",
      aboutTitle: "Professional Overview",
      aboutFloat: "Fullstack & APIs",
      aboutParagraphs: [
        "Python developer with 13+ years in IT, serving as IT Coordinator and fullstack developer, combining advanced technical skills with solid experience in project and team management. Specialist in REST APIs, Django, Django REST Framework, FastAPI, and Flask for scalable, resilient solutions.",
        "My expertise spans web and mobile systems, infrastructure management, information security, and ERP TOTVS RM administration. I work with Cloud Native environments, Docker, and Git Flow, applying DevOps practices for automation and high availability. I also bring knowledge in machine learning and computer vision (TensorFlow, PyTorch, OpenCV).",
      ],
      profileTitle: "Professional Profile",
      profileParagraphs: [
        "Solid technical and academic background, specializing in Python development, REST APIs, DevOps, Cloud, and infrastructure management. Proven experience leading multidisciplinary teams, coordinating ICT projects, and negotiating with vendors.",
        "Recognized for solving complex problems, structuring mission-critical environments, optimizing processes, and driving responsible innovation with strong governance.",
        "Strong skills in technical leadership, project management, effective communication, and complex problem solving. Proactive professional with high standards and commitment to quality delivery.",
      ],
      qualitiesTitle: "Key Strengths",
      qualitiesFloat: "Leadership & Impact",
      qualitiesList: [
        "Technical leadership and IT team management",
        "Analytical mindset and problem-solving",
        "Strategic view of technology applied to business",
        "Clear communication between technical and non-technical teams",
        "Decision-making in critical environments",
        "Organization, accountability, and results focus",
        "Fast learning and technology adaptability",
      ],
      areasTitle: "Areas of Expertise",
      skillsTitle: "Technical Skills",
      skillsFloat: "DevOps",
      experienceTitle: "Professional Experience",
      experienceSubtitle: "Technical leadership and IT management across industrial and educational environments.",
      experienceFloat: "13+ years",
      projectsTag: "Strategic Projects",
      projectsTitle: "High-Impact Project Portfolio",
      projectsSubtitle:
        "Strategic delivery across SaaS platforms, corporate integrations, and modernization of critical environments with scale, security, and governance.",
      projectsFloat: "SaaS & Integrations",
      projectsPositioningTitle: "Positioning",
      projectsPositioningText:
        "Specialist in SaaS solutions, enterprise integrations, and modernization of critical environments, combining strategic vision with high-level execution.",
      academicTitle: "Teaching & Academic Projects",
      academicRole: "Programming Instructor & Project Coordinator",
      academicLocation: "SENAI – Caxias/MA",
      academicPeriod: "May 2014 – May 2022",
      academicDescription:
        "Taught programming from basic to advanced levels. Coordinated innovation projects at the INOVA event, with 18 projects presented and 9 awarded, covering automation, information security, and intelligent solutions.",
      academicHighlightsTitle: "Additional Academic Work",
      academicHighlightsSubtitle: "Teaching, training, and mentoring across educational settings.",
      academicMetricsTitle: "Academic Achievements",
      academicMetricsSubtitle: "Results and impact in technical education.",
      publicationsTitle: "Publications & Papers",
      publicationsSubtitle: "Technical work focused on service integration and security.",
      educationTitle: "Education",
      educationFloat: "Postgraduate",
      coursesTitle: "Courses & Training",
      coursesSubtitle: "Technical tracks reinforcing expertise in backend, APIs, databases, and mobile development.",
      coursesBadgeLeft: "Technical training",
      coursesBadgeRight: "Continuous learning",
      certificationsTitle: "Premium Certifications",
      certificationsSubtitle: "AWS, DevOps, Security, and Software Architecture.",
      languagesTitle: "Languages",
      languages: ["Portuguese: Native", "English: Intermediate"],
      objectiveTitle: "Professional Objective",
      objectiveFloat: "Strategic Vision",
      objectiveText:
        "Operate strategically as a Python Developer and IT Manager, applying technical expertise and business vision to build scalable, secure, high-impact solutions that drive operational efficiency, innovation, and sustainable growth.",
      contactTitle: "Contact",
      contactTag: "Available for strategic projects",
      contactSubtitle: "Let’s talk about leadership, architecture, and high-impact solutions.",
      contactFloat: "Direct channel",
      contactAvailability: "Available for projects",
      contactLocation: "Caxias, Maranhão, Brazil",
    },
  };

  const t = content[language];

  const areas = [
    {
      icon: Code2,
      title: { pt: "Desenvolvimento", en: "Development" },
      desc: { pt: "Sistemas web e APIs", en: "Web systems and APIs" },
    },
    {
      icon: Server,
      title: { pt: "Infraestrutura", en: "Infrastructure" },
      desc: { pt: "Gestão e Segurança da Informação", en: "Management and InfoSec" },
    },
    {
      icon: Database,
      title: { pt: "ERP TOTVS RM", en: "ERP TOTVS RM" },
      desc: { pt: "Admin, suporte e customizações", en: "Administration and customization" },
    },
    {
      icon: Cpu,
      title: { pt: "Cloud & DevOps", en: "Cloud & DevOps" },
      desc: { pt: "Computing e automação", en: "Compute and automation" },
    },
    {
      icon: Database,
      title: { pt: "Bancos de Dados", en: "Databases" },
      desc: { pt: "Integração de sistemas", en: "System integration" },
    },
    {
      icon: Briefcase,
      title: { pt: "Gestão de Projetos", en: "Project Management" },
      desc: { pt: "Projetos de TI", en: "IT delivery" },
    },
    {
      icon: GraduationCap,
      title: { pt: "Docência", en: "Teaching" },
      desc: { pt: "Capacitação técnica", en: "Technical training" },
    },
  ];

  const premiumCertifications = [
    { icon: Cloud, label: { pt: "AWS Cloud", en: "AWS Cloud" } },
    { icon: Cpu, label: { pt: "DevOps & SRE", en: "DevOps & SRE" } },
    { icon: ShieldCheck, label: { pt: "Segurança da Informação", en: "Information Security" } },
    { icon: LayoutTemplate, label: { pt: "Arquitetura de Software", en: "Software Architecture" } },
  ];

  const projects = [
    {
      icon: BarChart3,
      title: {
        pt: "Plataformas SaaS e Business Intelligence",
        en: "SaaS & Business Intelligence Platforms",
      },
      description: {
        pt: "Arquitetura e desenvolvimento de soluções SaaS multi-tenant com governança de performance e distribuição segura de inteligência de negócio.",
        en: "Architecture and delivery of multi-tenant SaaS solutions with performance governance and secure BI distribution.",
      },
      highlights: {
        pt: [
          "Power BI Embedded com controle de SLA",
          "Arquitetura multi-tenant com segregação lógica",
          "APIs para orquestração de relatórios",
          "Controle de consumo e capacidade",
        ],
        en: [
          "Power BI Embedded with SLA control",
          "Multi-tenant architecture with logical isolation",
          "APIs for report orchestration",
          "Consumption and capacity monitoring",
        ],
      },
      tech: "Power BI Embedded | Azure | Python | Django | APIs REST",
      result: {
        pt: "Distribuição escalável de inteligência de negócio com segurança e alta disponibilidade.",
        en: "Scalable BI distribution with security and high availability.",
      },
    },
    {
      icon: Layers,
      title: {
        pt: "Sistemas Corporativos e Integrações ERP",
        en: "Enterprise Systems & ERP Integrations",
      },
      description: {
        pt: "Desenvolvimento e modernização de sistemas integrados ao ERP TOTVS RM com automação de processos acadêmicos e financeiros.",
        en: "Development and modernization of systems integrated with TOTVS RM ERP, automating academic and financial processes.",
      },
      highlights: {
        pt: [
          "Integração financeira com Nexxera",
          "APIs para integração com sistemas externos",
          "Automação de processos acadêmicos e financeiros",
          "Gestão de atualização e otimização do ERP",
        ],
        en: [
          "Financial integration with Nexxera",
          "APIs for external system integrations",
          "Automation of academic and financial workflows",
          "ERP upgrade and optimization management",
        ],
      },
      tech: "TOTVS RM | SQL Server | Oracle | MySQL | APIs REST",
      result: {
        pt: "Automação, confiabilidade de dados e integração entre áreas críticas.",
        en: "Automation, data reliability, and integration across critical areas.",
      },
    },
    {
      icon: LineChart,
      title: {
        pt: "Dashboard Estratégico Industrial (Realtime)",
        en: "Industrial Strategy Dashboard (Realtime)",
      },
      description: {
        pt: "Sistema web para monitoramento de indicadores operacionais críticos com atualização em tempo real.",
        en: "Web system for monitoring critical operational KPIs with real-time updates.",
      },
      highlights: {
        pt: [
          "Indicadores consolidados por safra",
          "Filtros avançados por período",
          "Views analíticas otimizadas",
          "Django Channels para realtime",
        ],
        en: [
          "KPIs consolidated by harvest",
          "Advanced period filters",
          "Optimized analytical views",
          "Django Channels for realtime",
        ],
      },
      tech: "Django | Oracle | SQL Avançado",
      result: {
        pt: "Tomada de decisão orientada por dados em operação de alta responsabilidade.",
        en: "Data-driven decision-making for high-responsibility operations.",
      },
    },
    {
      icon: ShieldCheck,
      title: {
        pt: "Arquitetura de APIs e Integrações Seguras",
        en: "Secure API Architecture & Integrations",
      },
      description: {
        pt: "Estruturação de APIs corporativas com foco em autenticação, controle de acesso e integração entre sistemas.",
        en: "Corporate API architecture focusing on authentication, access control, and system integration.",
      },
      highlights: {
        pt: [
          "APIs REST seguras com controle de permissões",
          "Integração com bancos Oracle, SQL Server e MySQL",
          "Integração com sistemas governamentais",
          "Padronização de comunicação entre sistemas legados",
        ],
        en: [
          "Secure REST APIs with permission control",
          "Integration with Oracle, SQL Server, and MySQL",
          "Integration with government systems",
          "Standardized communication across legacy systems",
        ],
      },
      tech: "OAuth2 | JWT | APIs REST | Oracle | SQL Server",
      result: {
        pt: "Ambiente integrado, seguro e escalável.",
        en: "Integrated, secure, and scalable environment.",
      },
    },
    {
      icon: Database,
      title: {
        pt: "Migração e Modernização de Bancos de Dados",
        en: "Database Migration & Modernization",
      },
      description: {
        pt: "Projetos de reestruturação e migração entre SQL Server, Oracle e MySQL.",
        en: "Restructuring and migration projects across SQL Server, Oracle, and MySQL.",
      },
      highlights: {
        pt: [
          "Otimização de consultas e procedures",
          "Reestruturação de modelagem",
          "Validação de integridade e performance",
        ],
        en: [
          "Query and procedure optimization",
          "Data model restructuring",
          "Integrity and performance validation",
        ],
      },
      tech: "SQL Server | Oracle | MySQL | Performance Tuning",
      result: {
        pt: "Ambientes mais estáveis e preparados para crescimento.",
        en: "More stable environments ready for growth.",
      },
    },
    {
      icon: Cloud,
      title: {
        pt: "Infraestrutura, Cloud e DevOps",
        en: "Infrastructure, Cloud & DevOps",
      },
      description: {
        pt: "Implantação e sustentação de ambientes produtivos com foco em estabilidade e segurança.",
        en: "Deployment and support of production environments with stability and security focus.",
      },
      highlights: {
        pt: [
          "Administração de servidores Linux (Ubuntu Server)",
          "Deploy de aplicações Django",
          "Configuração de Nginx e Apache",
          "Ambientes AWS e Azure",
          "Estruturação de ambientes (dev, homologação e produção)",
          "Implantação de ITSM (GLPI)",
        ],
        en: [
          "Linux server administration (Ubuntu Server)",
          "Django application deployments",
          "Nginx and Apache configuration",
          "AWS and Azure environments",
          "Environment structuring (dev, staging, production)",
          "ITSM deployment (GLPI)",
        ],
      },
      tech: "Linux | Django | AWS | Azure | Nginx | Docker",
      result: {
        pt: "Alta disponibilidade e governança operacional.",
        en: "High availability and operational governance.",
      },
    },
    {
      icon: Lock,
      title: {
        pt: "Automação, Segurança e Ambientes Críticos",
        en: "Automation, Security & Critical Environments",
      },
      description: {
        pt: "Projetos voltados à integração entre sistemas físicos e digitais com foco em segurança operacional.",
        en: "Projects integrating physical and digital systems with operational security focus.",
      },
      highlights: {
        pt: [
          "API para controle de catracas",
          "Integração com reconhecimento facial",
          "Implantação de 17 câmeras IP em ambiente industrial",
          "Monitoramento e rastreabilidade operacional",
        ],
        en: [
          "API for access gate control",
          "Facial recognition integration",
          "Deployment of 17 IP cameras in industrial environment",
          "Operational monitoring and traceability",
        ],
      },
      tech: "APIs REST | IoT | Computer Vision | Security",
      result: {
        pt: "Segurança ampliada e padronização de processos.",
        en: "Expanded security and standardized processes.",
      },
    },
    {
      icon: Rocket,
      title: {
        pt: "Liderança Técnica e Governança de TI",
        en: "Technical Leadership & IT Governance",
      },
      description: {
        pt: "Coordenação de equipe técnica e estruturação de processos internos para governança e estabilidade.",
        en: "Technical team leadership and internal process structuring for governance and stability.",
      },
      highlights: {
        pt: [
          "Definição de padrões de desenvolvimento",
          "Gestão de infraestrutura e segurança",
          "Troubleshooting e estabilização de ambientes críticos",
          "Organização de chamados e governança de TI",
        ],
        en: [
          "Definition of development standards",
          "Infrastructure and security management",
          "Troubleshooting and stabilization of critical environments",
          "Ticketing organization and IT governance",
        ],
      },
      tech: "Governance | ITSM | Leadership | Security",
      result: {
        pt: "Ambiente tecnológico estruturado, estável e alinhado à estratégia do negócio.",
        en: "Structured, stable, and business-aligned technology environment.",
      },
    },
  ];

  const experiences = [
    {
      role: { pt: "Coordenador de TI", en: "IT Coordinator" },
      company: "Itapecuru Bioenergia – Aldeias Altas/MA",
      period: "Outubro 2024 – Atual",
      desc: {
        pt: [
          "Responsável pela Gestão de Infraestrutura e Sistemas de TI, liderando equipe de suporte e desenvolvimento com foco em excelência operacional e treinamento contínuo.",
          "Gerenciamento de infraestrutura de servidores, implementação de protocolos de segurança e especialista em ERP TOTVS RM para otimização de processos empresariais.",
          "Desenvolvimento de soluções web e mobile com Python, implementando sistemas dinâmicos e escaláveis. Expertise em automações e otimizações usando bancos de dados.",
          "Elaboração e gestão de projetos TIC, monitoramento proativo de sistemas e negociação com fornecedores, garantindo alinhamento estratégico e eficiência operacional."
        ],
        en: [
          "Infrastructure and IT Systems Management, leading support and development team with focus on operational excellence and continuous training.",
          "Server infrastructure management, security protocols implementation, and TOTVS RM ERP specialist for business process optimization.",
          "Web and mobile solutions development with Python, implementing dynamic and scalable systems. Expertise in automation and optimization using databases.",
          "ICT project management, proactive system monitoring, and vendor negotiations, ensuring strategic alignment and operational efficiency."
        ],
      },
    },
    {
      role: { pt: "Gestor de TI", en: "IT Manager" },
      company: "UniFacema – Caxias/MA",
      period: "Julho 2022 – Outubro 2024",
      desc: {
        pt: [
          "Desenvolvimento de soluções com Python e Django REST Framework (DRF), integrando sistemas com TOTVS RM.",
          "Gerenciamento de equipe de 4 profissionais entre desenvolvimento e infraestrutura, trabalhando com SQL Server e consultas complexas.",
          "Criação de relatórios, fórmulas visuais e automações para áreas de educação, financeiro e atendimentos."
        ],
        en: [
          "Solution development with Python and Django REST Framework (DRF), integrating systems with TOTVS RM.",
          "Team management of 4 professionals across development and infrastructure, working with SQL Server and complex queries.",
          "Creation of reports, visual formulas, and automations for education, financial, and service areas."
        ],
      },
    },
    {
      role: { pt: "Desenvolvedor de Software Autônomo", en: "Freelance Software Developer" },
      company: "Autônomo – Caxias/MA",
      period: "Janeiro 2016 – Junho 2024",
      desc: {
        pt: [
          "Desenvolvimento web e mobile como freelancer, atuando em projetos diversos com tecnologias modernas.",
          "Docência em programação e informática, ministrando cursos e treinamentos personalizados."
        ],
        en: [
          "Web and mobile development as a freelancer, working on various projects with modern technologies.",
          "Programming and IT teaching, delivering customized courses and training."
        ],
      },
    },
    {
      role: { pt: "Professor de Informática", en: "IT Professor" },
      company: "SESI/SENAI – Caxias/MA",
      period: "Abril 2015 – Outubro 2015",
      desc: {
        pt: [
          "Ministração de aulas de programação e informática básica, desenvolvendo material didático e projetos práticos."
        ],
        en: [
          "Teaching programming and basic computer skills, developing educational materials and practical projects."
        ],
      },
    },
    {
      role: { pt: "Desenvolvedor de Software", en: "Software Developer" },
      company: "Mega Empreendimentos – Caxias/MA",
      period: "Agosto 2013 – Novembro 2014",
      desc: {
        pt: [
          "Desenvolvimento web e mobile com Java e Python, trabalhando com bancos de dados relacionais."
        ],
        en: [
          "Web and mobile development with Java and Python, working with relational databases."
        ],
      },
    },
    {
      role: { pt: "Supervisor de TI", en: "IT Supervisor" },
      company: "UniFacema – Caxias/MA",
      period: "Julho 2023 – Setembro 2024",
      desc: {
        pt: [
          "Responsável por coordenar a tecnologia, segurança da informação, desenvolvimento de software, infraestrutura e redes nas unidades da matriz, campus em Codó e Presidente Dutra, Clínica Escola e Escola de Ensino Infantil. Lidero equipes de TI, supervisionando a implementação de soluções tecnológicas e a eficiência dos processos. Administro o sistema TOTVS RM, assegurando seu bom funcionamento em todos os ambientes.",
        ],
        en: [
          "Coordinated technology, information security, software development, infrastructure, and networks across headquarters, campuses, clinic, and early education units. Led IT teams, supervised solution delivery, and administered TOTVS RM across all environments.",
        ],
      },
    },
    {
      role: { pt: "Analista de TI", en: "IT Analyst" },
      company: "UniFacema – Caxias/MA",
      period: "Agosto 2022 – Julho 2023",
      desc: {
        pt: [
          "Experiência no suporte ao ERP TOTVS RM, atuando com banco de dados SQL Server para garantir a integridade e o desempenho dos sistemas. Realização de integração e implantação de novos módulos, criação de reports dinâmicos, suporte aos usuários em módulos financeiros, gestão de compras, estoque e faturamento. Desenvolvimento de fórmulas visuais e personalizações para otimizar processos.",
        ],
        en: [
          "Supported ERP TOTVS RM with SQL Server, ensuring data integrity and performance. Delivered module integrations, dynamic reports, and user support for finance, procurement, inventory, and invoicing. Built visual formulas and customizations to optimize workflows.",
        ],
      },
    },
    {
      role: { pt: "Supervisor de Desenvolvimento de Sistemas", en: "Systems Development Supervisor" },
      company: "Infatec – Teresina/PI",
      period: "Março 2020 – Maio 2022",
      desc: {
        pt: [
          "Responsável por desenvolver soluções web e mobile com Python, Django, Django Rest Framework e Bootstrap, utilizando PostgreSQL como banco de dados. Implementação de soluções de hospedagem e infraestrutura na Digital Ocean e AWS, sendo responsável pelo deploy e pela segurança da informação. Organização e distribuição de tarefas da equipe de desenvolvimento usando metodologias ágeis, além de oferecer treinamentos sobre as tecnologias e práticas adotadas.",
        ],
        en: [
          "Led web and mobile solutions with Python, Django, DRF, and Bootstrap using PostgreSQL. Implemented hosting and infrastructure on DigitalOcean and AWS, ensuring deployments and information security. Organized agile development workflows and delivered technical training.",
        ],
      },
    },
    {
      role: { pt: "Coordenador de Desenvolvimento Web", en: "Web Development Coordinator" },
      company: "Mega Empreendimentos – Caxias/MA",
      period: "Janeiro 2012 – Abril 2014",
      desc: {
        pt: [
          "Programador principal e líder técnico, responsável pelo desenvolvimento de código e preparação dos bancos de dados das aplicações, além de gerenciar a equipe que supervisionava as ferramentas. Atuação garantiu a implementação eficaz das soluções, alinhadas às necessidades da empresa.",
        ],
        en: [
          "Lead developer and technical coordinator, responsible for application code, database preparation, and managing the team overseeing development tools, ensuring solutions aligned with business needs.",
        ],
      },
    },
    {
      role: { pt: "Suporte Técnico", en: "Technical Support" },
      company: "K1 Tech Informática – Caxias/MA",
      period: "Agosto 2009 – Outubro 2012",
      desc: {
        pt: [
          "Responsável pela instalação e manutenção de hardware e software, configuração de redes e suporte técnico. Atuação na reparação de equipamentos e otimização de sistemas, garantindo o pleno funcionamento e a segurança dos ambientes tecnológicos dos clientes.",
        ],
        en: [
          "Handled hardware/software installation and maintenance, network configuration, and technical support. Repaired equipment and optimized systems to ensure reliable and secure client environments.",
        ],
      },
    },
  ];

  const educationItems = {
    pt: [
      "Graduação em Análise e Desenvolvimento de Sistemas – UniFacema",
      "Pós-graduação em Engenharia de Sistemas Web – UniFacema",
      "Pós-graduação em Engenharia de Sistemas Mobile – UniFacema",
    ],
    en: [
      "B.Sc. in Systems Analysis and Development – UniFacema",
      "Postgraduate in Web Systems Engineering – UniFacema",
      "Postgraduate in Mobile Systems Engineering – UniFacema",
    ],
  };

  const coursesItems = [
    {
      icon: Code2,
      title: { pt: "Python Avançado", en: "Advanced Python" },
      provider: "Alura",
      focus: {
        pt: "Arquitetura, automação e boas práticas para APIs escaláveis.",
        en: "Architecture, automation, and best practices for scalable APIs.",
      },
    },
    {
      icon: Layers,
      title: { pt: "Django Avançado", en: "Advanced Django" },
      provider: "Alura",
      focus: {
        pt: "Aplicações robustas com segurança, performance e organização de domínio.",
        en: "Robust applications with security, performance, and domain structure.",
      },
    },
    {
      icon: Globe2,
      title: { pt: "Django REST Framework", en: "Django REST Framework" },
      provider: "Alura",
      focus: {
        pt: "APIs REST, autenticação, serialização e versionamento.",
        en: "REST APIs, authentication, serialization, and versioning.",
      },
    },
    {
      icon: Phone,
      title: { pt: "Android Intermediário", en: "Intermediate Android" },
      provider: "TreinaWeb",
      focus: {
        pt: "Apps nativos integrados a serviços e APIs corporativas.",
        en: "Native apps integrated with services and corporate APIs.",
      },
    },
    {
      icon: Database,
      title: { pt: "Hibernate ORM", en: "Hibernate ORM" },
      provider: "RLSYSTEM",
      focus: {
        pt: "Mapeamento objeto-relacional e persistência consistente de dados.",
        en: "Object-relational mapping and consistent data persistence.",
      },
    },
    {
      icon: BarChart3,
      title: { pt: "MySQL", en: "MySQL" },
      provider: "RLSYSTEM",
      focus: {
        pt: "Modelagem relacional, índices e otimização de consultas.",
        en: "Relational modeling, indexing, and query optimization.",
      },
    },
    {
      icon: LineChart,
      title: { pt: "PostgreSQL", en: "PostgreSQL" },
      provider: "RLSYSTEM",
      focus: {
        pt: "Consultas avançadas, performance e relatórios estratégicos.",
        en: "Advanced queries, performance, and strategic reporting.",
      },
    },
    {
      icon: Cloud,
      title: { pt: "Cloud Native & DevOps", en: "Cloud Native & DevOps" },
      provider: "Docker, Git Flow, AWS, DigitalOcean",
      focus: {
        pt: "Deploy automatizado, observabilidade e gestão de ambientes escaláveis.",
        en: "Automated deployments, observability, and scalable environments.",
      },
    },
    {
      icon: Cpu,
      title: { pt: "Machine Learning & Visão Computacional", en: "Machine Learning & Computer Vision" },
      provider: "TensorFlow, PyTorch, OpenCV",
      focus: {
        pt: "Modelos preditivos, visão computacional e prototipagem aplicada.",
        en: "Predictive models, computer vision, and applied prototyping.",
      },
    },
    {
      icon: LayoutTemplate,
      title: { pt: "ERP TOTVS RM", en: "ERP TOTVS RM" },
      provider: "Administração e integrações",
      focus: {
        pt: "Implantação de módulos, relatórios e customizações estratégicas.",
        en: "Module rollouts, reporting, and strategic customizations.",
      },
    },
    {
      icon: BarChart3,
      title: { pt: "Dashboards & BI", en: "Dashboards & BI" },
      provider: "Reports, cubos e SQL avançado",
      focus: {
        pt: "Painéis executivos e insights para tomada de decisão.",
        en: "Executive dashboards and decision-making insights.",
      },
    },
  ];

  const academicHighlights = [
    {
      icon: GraduationCap,
      title: { pt: "Ministrante do Curso de Fundamentos de Informática", en: "Fundamentals of Computing Instructor" },
      org: { pt: "Colégio Santo Antonio", en: "Colégio Santo Antonio" },
      period: { pt: "Abr 2016 – Set 2016", en: "Apr 2016 – Sep 2016" },
    },
    {
      icon: BookOpen,
      title: { pt: "Professor de Informática", en: "Computer Science Instructor" },
      org: { pt: "SESI/SENAI", en: "SESI/SENAI" },
      period: { pt: "Abr 2015 – Out 2015", en: "Apr 2015 – Oct 2015" },
    },
    {
      icon: Users,
      title: { pt: "Treinamentos para equipes internas", en: "Internal team training" },
      org: { pt: "Python, APIs, DevOps e boas práticas", en: "Python, APIs, DevOps, and best practices" },
      period: { pt: "Programas recorrentes", en: "Recurring programs" },
    },
  ];

  const publications = [
    {
      title: {
        pt: "Integração do Serviço Bluetooth ao Honeypotlabsac",
        en: "Integration of the Bluetooth Service into Honeypotlabsac",
      },
      area: { pt: "Segurança IoT", en: "IoT Security" },
    },
    {
      title: {
        pt: "Integração do Serviço FTP ao Honeypotlabsac",
        en: "Integration of the FTP Service into Honeypotlabsac",
      },
      area: { pt: "Segurança de Rede", en: "Network Security" },
    },
  ];

  const academicMetrics = [
    {
      icon: Rocket,
      value: "18",
      label: { pt: "Projetos Coordenados", en: "Projects Coordinated" },
      desc: { pt: "Automação, segurança e IoT", en: "Automation, security, and IoT" },
    },
    {
      icon: Target,
      value: "9",
      label: { pt: "Projetos Premiados", en: "Award-winning Projects" },
      desc: { pt: "Reconhecimento INOVA", en: "INOVA Recognition" },
    },
    {
      icon: Users,
      value: "4+",
      label: { pt: "Anos de Docência", en: "Years Teaching" },
      desc: { pt: "Programação e TI", en: "Programming & IT" },
    },
    {
      icon: BookOpen,
      value: "2",
      label: { pt: "Artigos Publicados", en: "Published Papers" },
      desc: { pt: "Segurança e Integração", en: "Security & Integration" },
    },
  ];

  const skillsContent = {
    pt: {
      developmentTitle: "Desenvolvimento",
      developmentList: [
        "Python (Avançado)",
        "Django / Django REST Framework",
        "FastAPI e Flask",
        "APIs RESTful e integração de sistemas",
        "ORMs e boas práticas de arquitetura",
      ],
      devopsTitle: "DevOps e Cloud",
      devopsList: [
        "Docker",
        "Git / Git Flow",
        "Ambientes Cloud Native",
        "Deploy em AWS e DigitalOcean",
        "Automação de processos",
        "Monitoramento e alta disponibilidade",
      ],
      databaseTitle: "Bancos de Dados",
      databaseList: [
        "PostgreSQL",
        "MySQL",
        "SQL Server",
        "Oracle",
        "Consultas SQL avançadas",
        "Views, relatórios e otimização de performance",
      ],
      totvsTitle: "ERP TOTVS RM",
      totvsList: [
        "Administração completa do ambiente",
        "Módulo Financeiro (contas a pagar/receber)",
        "Compras, Estoque e Faturamento",
        "Gestão de usuários e permissões",
        "Reports dinâmicos e Cubos",
        "Fórmulas visuais e customizações",
        "Integrações e implantação de módulos",
      ],
    },
    en: {
      developmentTitle: "Development",
      developmentList: [
        "Python (Advanced)",
        "Django / Django REST Framework",
        "FastAPI and Flask",
        "REST APIs and systems integration",
        "ORMs and architecture best practices",
      ],
      devopsTitle: "DevOps & Cloud",
      devopsList: [
        "Docker",
        "Git / Git Flow",
        "Cloud-native environments",
        "Deployments on AWS and DigitalOcean",
        "Process automation",
        "Monitoring and high availability",
      ],
      databaseTitle: "Databases",
      databaseList: [
        "PostgreSQL",
        "MySQL",
        "SQL Server",
        "Oracle",
        "Advanced SQL queries",
        "Views, reporting, and performance tuning",
      ],
      totvsTitle: "ERP TOTVS RM",
      totvsList: [
        "Full environment administration",
        "Financial module (AP/AR)",
        "Purchasing, inventory, and billing",
        "User and permission management",
        "Dynamic reports and OLAP cubes",
        "Visual formulas and customization",
        "Module integrations and rollouts",
      ],
    },
  };

  const skillText = skillsContent[language];

  const profileHighlights = [
    { icon: Users, label: { pt: "Liderança de Equipes", en: "Team Leadership" } },
    { icon: Code2, label: { pt: "Dev Full Stack", en: "Full Stack" } },
    { icon: Server, label: { pt: "Infraestrutura", en: "Infrastructure" } },
    { icon: Target, label: { pt: "Gestão Estratégica", en: "Strategic Management" } },
  ];

  const contactItems = [
    {
      icon: Linkedin,
      label: { pt: "LinkedIn", en: "LinkedIn" },
      value: "linkedin.com/in/antonio-jose...",
      href: "https://www.linkedin.com/in/antonio-jos%C3%A9-b-a-c-filho-78332b183/",
      accent: "from-blue-500/20 via-blue-500/10",
    },
    {
      icon: Github,
      label: { pt: "GitHub", en: "GitHub" },
      value: "github.com/AJCOSTA",
      href: "https://github.com/AJCOSTA",
      accent: "from-slate-500/20 via-slate-500/10",
    },
    {
      icon: Mail,
      label: { pt: "Email", en: "Email" },
      value: "ajjb@live.com",
      href: "mailto:ajjb@live.com",
      accent: "from-emerald-500/20 via-emerald-500/10",
    },
    {
      icon: Phone,
      label: { pt: "Telefone", en: "Phone" },
      value: "+55 (99) 98130-4000",
      href: "tel:+5599981304000",
      accent: "from-sky-500/20 via-sky-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-secondary/30 relative overflow-hidden">
        <div className="pointer-events-none absolute left-6 top-16 flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold text-primary shadow-lg backdrop-blur z-50">
          <Sparkles className="h-4 w-4" /> {t.heroFloatLeft}
        </div>
        <div className="pointer-events-none absolute right-6 top-24 flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold text-primary shadow-lg backdrop-blur z-50">
          <Globe2 className="h-4 w-4" /> {t.heroFloatRight}
        </div>
        <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Terminal className="mr-2 h-4 w-4" />
              {t.heroBadge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              {t.heroTitlePrefix} <span className="text-primary">{t.heroTitleHighlight}</span> {t.heroTitleSuffix}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-md px-8 font-semibold" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                {t.heroCtaPrimary}
              </Button>
              <Button size="lg" variant="outline" className="rounded-md px-8" onClick={() => document.getElementById('experience')?.scrollIntoView({behavior: 'smooth'})}>
                {t.heroCtaSecondary}
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img 
                src={profilePhoto} 
                alt="AJ Assunção Costa" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Tech Float Card */}
            <div className="absolute top-10 right-10 md:right-0 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-border animate-bounce duration-[3000ms]">
              <img src="https://cdn.simpleicons.org/python/3776AB" className="w-8 h-8" alt="Python" />
            </div>
            <div className="absolute bottom-10 left-10 md:left-20 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-border animate-bounce duration-[4000ms]">
               {/* Replaced failing Oracle icon with AWS for hero animation, or just local Oracle */}
               <img src={oracleLogo} className="w-16 h-auto" alt="Oracle" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. APRESENTAÇÃO PROFISSIONAL (Sobre) */}
      <section id="about" className="py-20 bg-background relative overflow-hidden">
        <div className="absolute -left-10 top-10 hidden h-36 w-36 rounded-full bg-primary/10 blur-3xl md:block" />
        <div className="absolute right-6 bottom-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary z-50">
          <Code2 className="h-4 w-4" /> {t.aboutFloat}
        </div>
        <div className="container px-6 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.aboutTitle}</h2>
            <Separator className="w-20 mx-auto bg-primary h-1 rounded-full" />
          </div>
          <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground leading-relaxed text-justify">
            {t.aboutParagraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "mb-6" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-background/70 p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Award className="h-5 w-5" /> {t.certificationsTitle}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t.certificationsSubtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {premiumCertifications.map((cert) => (
                <div key={cert.label.pt} className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                  <cert.icon className="h-4 w-4" /> {cert.label[language]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PERFIL PROFISSIONAL */}
      <section id="profile" className="py-20 bg-secondary/20 relative overflow-hidden">
        <div className="absolute right-0 top-10 hidden h-40 w-40 rounded-full bg-primary/10 blur-3xl md:block" />
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.profileTitle}</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                {t.profileParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {profileHighlights.map((item) => (
                <Card key={item.label.pt} className="bg-card hover:shadow-md transition-all">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <item.icon className="w-10 h-10 text-primary" />
                    <span className="font-semibold">{item.label[language]}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPAIS QUALIDADES */}
      <section id="qualities" className="py-20 bg-primary/5 relative">
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary z-50">
          <Users className="h-4 w-4" /> {t.qualitiesFloat}
        </div>
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.qualitiesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.qualitiesList.map((quality, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="font-medium">{quality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ÁREAS DE ATUAÇÃO */}
      <section id="areas" className="py-20 relative">
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.areasTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area, idx) => (
              <Card key={idx} className="hover:border-primary transition-colors">
                <CardHeader>
                  <area.icon className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{area.title[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{area.desc[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HABILIDADES TÉCNICAS (Com Logos) */}
      <section id="skills" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 z-50">
          <Cloud className="h-4 w-4" /> {t.skillsFloat}
        </div>
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">{t.skillsTitle}</h2>
          
          {/* Grid de Cards por Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Desenvolvimento */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <Code2 className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold">{skillText.developmentTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-6 mb-6">
                 {/* CDN Icons that worked */}
                 <img src="https://cdn.simpleicons.org/python/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="Python" />
                 <img src="https://cdn.simpleicons.org/django/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="Django" />
                 <img src="https://cdn.simpleicons.org/fastapi/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="FastAPI" />
                 <img src="https://cdn.simpleicons.org/flask/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="Flask" />
              </div>
              <ul className="space-y-2 text-gray-300">
                {skillText.developmentList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* DevOps & Cloud */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <Cpu className="w-8 h-8 text-orange-400" />
                <h3 className="text-2xl font-bold">{skillText.devopsTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-6 mb-6 items-center">
                 <img src="https://cdn.simpleicons.org/docker/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="Docker" />
                 <img src="https://cdn.simpleicons.org/git/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="Git" />
                 {/* Replaced failing AWS CDN with local image + filter */}
                 <img src={awsLogo} className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity brightness-0 invert" title="AWS" alt="AWS" />
                 <img src="https://cdn.simpleicons.org/digitalocean/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="DigitalOcean" />
              </div>
              <ul className="space-y-2 text-gray-300">
                {skillText.devopsList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Bancos de Dados */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <Database className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">{skillText.databaseTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-6 mb-6 items-center">
                 <img src="https://cdn.simpleicons.org/postgresql/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="PostgreSQL" />
                 <img src="https://cdn.simpleicons.org/mysql/white" className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity" title="MySQL" />
                 {/* Replaced failing SQL Server CDN with local image + blend mode */}
                 <img src={sqlserverLogo} className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity mix-blend-screen" title="SQL Server" alt="SQL Server" />
                 {/* Replaced failing Oracle CDN with local image + filter */}
                 <img src={oracleLogo} className="h-5 w-auto opacity-90 hover:opacity-100 transition-opacity brightness-0 invert" title="Oracle" alt="Oracle" />
              </div>
              <ul className="space-y-2 text-gray-300">
                {skillText.databaseList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* ERP TOTVS RM */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-white p-2 rounded">
                    <img src={totvsLogo} className="h-6 w-auto" alt="TOTVS" />
                </div>
                <h3 className="text-2xl font-bold">{skillText.totvsTitle}</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {skillText.totvsList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PROJETOS */}
      <section id="projects" className="py-20 bg-secondary/10 relative overflow-hidden">
        <div className="absolute left-6 top-10 flex z-50">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
            <Rocket className="h-4 w-4" /> {t.projectsFloat}
          </div>
        </div>
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> {t.projectsTag}
            </span>
            <h2 className="text-3xl font-bold mt-4">{t.projectsTitle}</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">{t.projectsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <Card key={idx} className="bg-background/80 border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <project.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{project.title[language]}</CardTitle>
                      <CardDescription className="mt-2 text-base text-muted-foreground">
                        {project.description[language]}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    {project.highlights[language].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-muted-foreground">
                    <strong>{language === "pt" ? "Tecnologias" : "Tech"}:</strong> {project.tech}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>{language === "pt" ? "Resultado" : "Outcome"}:</strong> {project.result[language]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">{t.projectsPositioningTitle}</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">{t.projectsPositioningText}</p>
          </div>
        </div>
      </section>

      {/* 8. EXPERIÊNCIA PROFISSIONAL */}
      <section id="experience" className="py-20 bg-background relative">
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary z-50">
          <Briefcase className="h-4 w-4" /> {t.experienceFloat}
        </div>
        <div className="container px-6 mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-2 text-center">{t.experienceTitle}</h2>
          <p className="text-muted-foreground text-center mb-12">{t.experienceSubtitle}</p>
          
          <div className="space-y-12">
            {experiences.map((job, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-border pb-8 last:pb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-2xl font-bold text-foreground">{job.role[language]}</h3>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                    {job.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground mb-4">
                  <Building2 className="w-5 h-5" />
                  {job.company}
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
                  {job.desc[language].map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DOCÊNCIA E PROJETOS ACADÊMICOS */}
      <section id="academic-projects" className="py-20 bg-secondary/30">
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.academicTitle}</h2>
          <Card className="max-w-4xl mx-auto border-l-4 border-l-primary shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{t.academicRole}</h3>
                  <p className="text-lg text-muted-foreground flex items-center gap-2 mt-2">
                    <MapPin className="w-5 h-5" /> {t.academicLocation}
                  </p>
                </div>
                <Badge variant="outline" className="h-fit mt-2 md:mt-0 text-base py-1">{t.academicPeriod}</Badge>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.academicDescription}
              </p>
            </CardContent>
          </Card>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="bg-background/80 border border-border/60">
                <CardHeader>
                  <CardTitle>{t.academicMetricsTitle}</CardTitle>
                  <CardDescription>{t.academicMetricsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {academicMetrics.map((metric) => (
                      <div key={metric.label.pt} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <metric.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-2xl font-bold text-primary">{metric.value}</span>
                        </div>
                        <p className="font-medium text-sm">{metric.label[language]}</p>
                        <p className="text-xs text-muted-foreground mt-1">{metric.desc[language]}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background/80 border border-border/60">
                <CardHeader>
                  <CardTitle>{t.academicHighlightsTitle}</CardTitle>
                  <CardDescription>{t.academicHighlightsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {academicHighlights.map((item) => (
                    <div key={item.title.pt} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title[language]}</p>
                        <p className="text-sm text-muted-foreground">{item.org[language]}</p>
                        <span className="text-xs text-primary/70">{item.period[language]}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <Card className="bg-background/80 border border-border/60">
              <CardHeader>
                <CardTitle>{t.publicationsTitle}</CardTitle>
                <CardDescription>{t.publicationsSubtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {publications.map((publication) => (
                  <div key={publication.title.pt} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{publication.title[language]}</p>
                      <span className="text-xs text-primary/70">{publication.area[language]}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 10. FORMAÇÃO ACADÊMICA */}
      <section id="education" className="py-20 relative overflow-hidden">
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary z-50">
          <GraduationCap className="h-4 w-4" /> {t.educationFloat}
        </div>
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.educationTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationItems[language].map((edu, idx) => (
              <Card key={idx} className="bg-card text-center hover:border-primary transition-colors group">
                <CardContent className="p-8 flex flex-col items-center gap-4 h-full justify-center">
                  <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-lg">{edu}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CURSOS E APERFEIÇOAMENTOS */}
      <section id="courses" className="py-20 bg-secondary/20 relative overflow-hidden">
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary z-50">
          <Award className="h-4 w-4" /> {t.coursesBadgeLeft}
        </div>
        <div className="absolute right-6 bottom-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary z-50">
          <Sparkles className="h-4 w-4" /> {t.coursesBadgeRight}
        </div>
        <div className="container px-6 mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t.coursesTitle}</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t.coursesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesItems.map((course) => (
              <Card key={course.title.pt} className="bg-background/80 backdrop-blur-sm border border-border/60 hover:border-primary/40 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <course.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{course.title[language]}</h3>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{course.focus[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-primary/10 rounded-xl border border-primary/20 text-center">
             <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
               <BookOpen className="w-6 h-6" /> {t.languagesTitle}
             </h3>
             <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-lg">
                {t.languages.map((lang) => (
                  <span key={lang}>{lang}</span>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 12. OBJETIVO PROFISSIONAL */}
      <section id="objective" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 z-50">
          <Target className="h-4 w-4" /> {t.objectiveFloat}
        </div>
        <div className="container px-6 mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">{t.objectiveTitle}</h2>
          <p className="text-xl md:text-2xl leading-relaxed font-medium">
            “{t.objectiveText}”
          </p>
        </div>
      </section>

      {/* 13. CONTATO */}
      <section id="contact" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 z-50">
          <Mail className="h-4 w-4" /> {t.contactFloat}
        </div>
        <div className="container px-6 mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
            <Sparkles className="h-4 w-4" /> {t.contactTag}
          </span>
          <h2 className="text-3xl font-bold mt-4">{t.contactTitle}</h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">{t.contactSubtitle}</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactItems.map((item) => (
              <button
                key={item.label.pt}
                type="button"
                onClick={() => window.open(item.href, "_blank")}
                className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${item.accent} to-transparent p-4 text-left transition hover:-translate-y-1 hover:border-white/30`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">{item.label[language]}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {t.contactLocation}
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" /> {t.contactAvailability}
            </div>
          </div>
          <p className="mt-10 text-white/40 text-sm">
            © {new Date().getFullYear()} AJ Assunção Costa. {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
        </div>
      </section>
    </div>
  );
}
