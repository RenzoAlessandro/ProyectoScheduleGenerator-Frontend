const professorList = {
  professors: [
    {
      id: 1,
      nombres: 'Barney Thea',
      email: 'barney@correo.com',
      contacto: 983720158,
      edad: 34,
      ciudad: 'Lima',
      status: 'Laborando',
      especialidad: [
        'Gestión de Proyectos',
        'Análisis Financiero',
        'Gestión de Operaciones',
        'Derecho Empresarial',
        'Economía Empresarial'
      ],
      genero: 'Hombre',
      jornada: 'parcial',
      horasSemanales: 20,
      prioridad: 1,
      disponibilidad: [
        {
          "dia": "lunes",
          "horaInicio": "08:00",
          "horaFin": "09:00"
        },
        {
          "dia": "lunes",
          "horaInicio": "12:00",
          "horaFin": "14:00"
        },
        {
          "dia": "jueves",
          "horaInicio": "12:00",
          "horaFin": "14:00"
        },
      ]
    },
    {
      id: 2,
      nombres: 'Alice Smith',
      email: 'alice@correo.com',
      contacto: 987654321,
      edad: 29,
      ciudad: 'Arequipa',
      status: 'Laborando',
      especialidad: [
        'Marketing Estratégico',
        'Gestión de Recursos Humanos',
        'Comportamiento Organizacional',
        'Responsabilidad Social Empresarial'
      ],
      genero: 'Mujer',
      jornada: 'parcial',
      horasSemanales: 25,
      prioridad: 2,
      disponibilidad: []
    },
    {
      id: 3,
      nombres: 'Carlos López',
      email: 'carlos@correo.com',
      contacto: 984512367,
      edad: 45,
      ciudad: 'Cusco',
      status: 'Licencia',
      especialidad: ['Dirección de Empresas', 'Planeamiento Estratégico', 'Toma de Decisiones Gerenciales', 'Habilidades Gerenciales'],
      genero: 'Hombre',
      jornada: 'completo',
      horasSemanales: 15,
      prioridad: 3,
      disponibilidad: []
    },
    {
      id: 4,
      nombres: 'Diana Ross',
      email: 'diana@correo.com',
      contacto: 982147563,
      edad: 39,
      ciudad: 'Lima',
      status: 'Laborando',
      especialidad: [
        'Estadística para Negocios',
        'Logística y Supply Chain Management',
        'Gestión de la Innovación',
        'Desarrollo Emprendedor'
      ],
      genero: 'Mujer',
      jornada: 'parcial',
      horasSemanales: 30,
      prioridad: 4,
      disponibilidad: []
    },
    {
      id: 5,
      nombres: 'Eduardo Pérez',
      email: 'eduardo@correo.com',
      contacto: 981236547,
      edad: 50,
      ciudad: 'Trujillo',
      status: 'Laborando',
      especialidad: ['Inteligencia de Negocios', 'Contabilidad Gerencial', 'Negociación Empresarial', 'Gestión de Proyectos'],
      genero: 'Hombre',
      jornada: 'parcial',
      horasSemanales: 0,
      prioridad: 5,
      disponibilidad: []
    },
    {
      id: 6,
      nombres: 'Fernanda Ruiz',
      email: 'fernanda@correo.com',
      contacto: 980125478,
      edad: 32,
      ciudad: 'Piura',
      status: 'Licencia',
      especialidad: [
        'Gestión de Recursos Humanos',
        'Dirección de Empresas',
        'Economía Empresarial',
        'Toma de Decisiones Gerenciales',
        'Análisis Financiero'
      ],
      genero: 'Mujer',
      jornada: 'completo',
      horasSemanales: 22,
      prioridad: 6,
      disponibilidad: []
    },
    {
      id: 7,
      nombres: 'Gabriel Ramos',
      email: 'gabriel@correo.com',
      contacto: 986321547,
      edad: 40,
      ciudad: 'Chiclayo',
      status: 'Laborando',
      especialidad: ['Planeamiento Estratégico', 'Marketing Estratégico', 'Gestión de Operaciones', 'Habilidades Gerenciales'],
      genero: 'Hombre',
      jornada: 'parcial',
      horasSemanales: 18,
      prioridad: 7,
      disponibilidad: []
    },
    {
      id: 8,
      nombres: 'Helena Gómez',
      email: 'helena@correo.com',
      contacto: 983254178,
      edad: 36,
      ciudad: 'Tacna',
      status: 'Licencia',
      especialidad: ['Responsabilidad Social Empresarial', 'Gestión de Proyectos', 'Comportamiento Organizacional'],
      genero: 'Mujer',
      jornada: 'parcial',
      horasSemanales: 28,
      prioridad: 8,
      disponibilidad: []
    },
    {
      id: 9,
      nombres: 'Isaac Torres',
      email: 'isaac@correo.com',
      contacto: 984215378,
      edad: 28,
      ciudad: 'Iquitos',
      status: 'Laborando',
      especialidad: [
        'Dirección de Empresas',
        'Logística y Supply Chain Management',
        'Estadística para Negocios',
        'Inteligencia de Negocios',
        'Negociación Empresarial'
      ],
      genero: 'Hombre',
      jornada: 'completo',
      horasSemanales: 24,
      prioridad: 9,
      disponibilidad: []
    },
    {
      id: 10,
      nombres: 'Julia Mendoza',
      email: 'julia@correo.com',
      contacto: 982354167,
      edad: 33,
      ciudad: 'Huancayo',
      status: 'Laborando',
      especialidad: ['Derecho Empresarial', 'Gestión de la Innovación', 'Análisis Financiero', 'Contabilidad Gerencial'],
      genero: 'Mujer',
      jornada: 'parcial',
      horasSemanales: 12,
      prioridad: 10,
      disponibilidad: []
    }
  ],
  professorsEmpty: false,
  professorsError: undefined,
  professorsLoading: false,
  professorsValidating: false
};

export default professorList;
