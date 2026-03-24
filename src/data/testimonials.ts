export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    text: '"Gimnasio de Powerlifting increíble. Además un gran ambiente, familiar y profesional. Discos calibrados, barras de competición y máquinas para hipertrofia de todo tipo"',
    author: 'Xavi Rmr',
    role: 'Competidor Nacional',
  },
  {
    text: '"Gran club deportivo especializado en Powerlifting! Dispone de material calibrado para competir así como de multitud de máquinas para completar los entrenamientos, mancuernas de pesos elevados y distintas máquinas para hacer cardio! Además realizan planificación nutricional y de entrenamiento. Es super completo! Y se respira un muy buen ambiente! Super contenta!"',
    author: 'Lydia León',
    role: 'Powerlifter Amateur',
  },
  {
    text: '"Nunca había encontrado un gimnasio tan bueno como este, material de diez, un ambiente y compañerismo perfecto, un trato familiar y perfecto para desfogar todo entre los hierros. Realmente el mejor gimnasio de Powerlifting que he estado y estaré."',
    author: 'Javier López',
    role: 'Powerlifter',
  },
];
