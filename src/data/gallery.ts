export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: Record<string, GalleryImage[]> = {
  powerlifting: [
    { src: '/assets/images/gallery/powerlifting/bench-press-1.jpg', alt: 'Press de banca en zona de powerlifting con equipamiento profesional' },
    { src: '/assets/images/gallery/powerlifting/bench-press-2.jpg', alt: 'Press de banca con barra olímpica para entrenamiento de powerlifting' },
    { src: '/assets/images/gallery/powerlifting/bench-press-3.jpg', alt: 'Press de banca pesado en plataforma de powerlifting' },
    { src: '/assets/images/gallery/powerlifting/bench-press-4.jpg', alt: 'Atleta realizando press de banca en rack de competición' },
    { src: '/assets/images/gallery/powerlifting/bench-press-5.jpg', alt: 'Press de banca con técnica de powerlifting en gimnasio especializado' },
    { src: '/assets/images/gallery/powerlifting/bench-press-6.jpg', alt: 'Entrenamiento de press de banca con material homologado de powerlifting' },
    { src: '/assets/images/gallery/powerlifting/bench-press-7.jpg', alt: 'Sesión de press de banca enfocada a fuerza máxima' },
    { src: '/assets/images/gallery/powerlifting/deadlift-1.jpg', alt: 'Peso muerto en plataforma de powerlifting con barra olímpica' },
    { src: '/assets/images/gallery/powerlifting/deadlift-2.jpg', alt: 'Levantamiento de peso muerto en entrenamiento de fuerza' },
    { src: '/assets/images/gallery/powerlifting/deadlift-3.jpg', alt: 'Peso muerto convencional en zona de powerlifting' },
    { src: '/assets/images/gallery/powerlifting/squat-1.jpg', alt: 'Sentadilla trasera en rack profesional de powerlifting' },
    { src: '/assets/images/gallery/powerlifting/squat-2.jpg', alt: 'Entrenamiento de sentadilla con cargas altas' },
    { src: '/assets/images/gallery/powerlifting/competition-racks.jpg', alt: 'Racks de competición oficiales para powerlifting' },
  ],
  lowerBody: [
    { src: '/assets/images/gallery/lower-body/abductor-outer-thigh-1.jpg', alt: 'Máquina de abductores para trabajo de glúteo y cadera' },
    { src: '/assets/images/gallery/lower-body/abductor-outer-thigh-2.jpg', alt: 'Entrenamiento de abductores en máquina profesional' },
    { src: '/assets/images/gallery/lower-body/abductor-outer-thigh-3.jpg', alt: 'Trabajo específico de musculatura externa del muslo' },
    { src: '/assets/images/gallery/lower-body/belt-squat-1.jpg', alt: 'Belt squat para entrenamiento de piernas sin carga axial' },
    { src: '/assets/images/gallery/lower-body/belt-squat-2.jpg', alt: 'Sentadilla con cinturón en máquina belt squat' },
    { src: '/assets/images/gallery/lower-body/hack-squat-1.jpg', alt: 'Hack squat para desarrollo de cuádriceps' },
    { src: '/assets/images/gallery/lower-body/hack-squat-2.jpg', alt: 'Entrenamiento de piernas en máquina hack squat' },
    { src: '/assets/images/gallery/lower-body/seated-leg-curl.jpg', alt: 'Curl femoral sentado para isquiotibiales' },
    { src: '/assets/images/gallery/lower-body/unilateral-standing-leg-curl.jpg', alt: 'Curl femoral unilateral de pie' },
    { src: '/assets/images/gallery/lower-body/leg-extension.jpg', alt: 'Extensión de piernas en máquina para cuádriceps' },
    { src: '/assets/images/gallery/lower-body/hip-thrust.jpg', alt: 'Hip thrust para fortalecimiento de glúteos' },
  ],
  upperBody: [
    { src: '/assets/images/gallery/upper-body/standing-vertical-chest-press-1.jpg', alt: 'Press vertical de pecho de pie en máquina' },
    { src: '/assets/images/gallery/upper-body/standing-vertical-chest-press-2.jpg', alt: 'Entrenamiento de pecho en press vertical' },
    { src: '/assets/images/gallery/upper-body/standing-lateral-raise-machine.jpg', alt: 'Elevaciones laterales en máquina para hombro' },
    { src: '/assets/images/gallery/upper-body/adjustable-double-pulley.jpg', alt: 'Poleas dobles ajustables para entrenamiento funcional' },
    { src: '/assets/images/gallery/upper-body/high-and-low-pulley.jpg', alt: 'Sistema de poleas altas y bajas para tren superior' },
    { src: '/assets/images/gallery/upper-body/multipower.jpg', alt: 'Multipower para entrenamiento guiado de fuerza' },
    { src: '/assets/images/gallery/upper-body/multipress.jpg', alt: 'Máquina multipress para pecho y hombro' },
    { src: '/assets/images/gallery/upper-body/decline-press.jpg', alt: 'Press declinado para trabajo de pecho inferior' },
    { src: '/assets/images/gallery/upper-body/t-bar-row.jpg', alt: 'Remo en barra T para espalda' },
    { src: '/assets/images/gallery/upper-body/biceps-curl.jpg', alt: 'Curl de bíceps en máquina para aislamiento muscular' },
  ],
  gym: [
    { src: '/assets/images/gallery/gym/gym-1.jpg', alt: 'Vista general de las instalaciones de RZ Power House' },
    { src: '/assets/images/gallery/gym/gym-2.jpg', alt: 'Zona de entrenamiento funcional y racks de potencia' },
    { src: '/assets/images/gallery/gym/gym-3.jpg', alt: 'Área de peso libre con plataformas de competición' },
    { src: '/assets/images/gallery/gym/gym-4.jpg', alt: 'Equipamiento de alta gama para entrenamiento de fuerza' },
    { src: '/assets/images/gallery/gym/gym-5.jpg', alt: 'Detalle de la zona de racks y barras olímpicas' },
    { src: '/assets/images/gallery/gym/gym-6.jpg', alt: 'Instalaciones optimizadas para powerlifting de alto rendimiento' },
    { src: '/assets/images/gallery/gym/gym-7.jpg', alt: 'Vista panorámica de la sala principal de entrenamiento' },
    { src: '/assets/images/gallery/gym/rz-power-house.jpg', alt: 'Logotipo y entrada principal de RZ Power House' },
    { src: '/assets/images/gallery/gym/fall-in-love-with-the-process.jpg', alt: 'Mural motivacional: Fall in love with the process' },
    { src: '/assets/images/gallery/gym/corner-cafe.jpg', alt: 'Zona de descanso y Corner Café para atletas' },
  ],
  material: [
    { src: '/assets/images/gallery/material/swiss-bar.jpg', alt: 'Barra suiza multi-agarre para entrenamiento de empuje' },
    { src: '/assets/images/gallery/material/bars.jpg', alt: 'Colección de barras olímpicas y especiales para levantamiento' },
    { src: '/assets/images/gallery/material/bow-bar-1.jpg', alt: 'Barra curvada especial para sentadillas y comodidad de hombros' },
    { src: '/assets/images/gallery/material/bow-bar-2.jpg', alt: 'Detalle de bow bar para sentadilla técnica' },
    { src: '/assets/images/gallery/material/barbell-set.jpg', alt: 'Set completo de barras profesionales para competición' },
    { src: '/assets/images/gallery/material/calibrated-discs.jpg', alt: 'Discos de competición calibrados de alta precisión' },
    { src: '/assets/images/gallery/material/power-bar.jpg', alt: 'Barra rígida específica para powerlifting' },
    { src: '/assets/images/gallery/material/rack.jpg', alt: 'Rack de potencia robusto con sistemas de seguridad' },
    { src: '/assets/images/gallery/material/pulleys.jpg', alt: 'Sistema de poleas profesionales para trabajo accesorio' },
    { src: '/assets/images/gallery/material/dumbbells-rack.jpg', alt: 'Mancuernas de caucho organizadas en rack profesional' },
    { src: '/assets/images/gallery/material/metal-discs.jpg', alt: 'Discos de hierro fundido clásicos para entrenamiento pesado' },
  ],
};

export const gallerySections = [
  {
    key: 'gym',
    label: 'Gimnasio',
    thumbnail: { src: '/assets/images/gallery/gym/gym-1.jpg', srcAvif: '/assets/images/gallery/gym/gym-1.avif', srcWebp: '/assets/images/gallery/gym/gym-1.webp', alt: 'Más de 30 máquinas de musculación!' },
  },
  {
    key: 'material',
    label: 'Material',
    thumbnail: { src: '/assets/images/gallery/material/calibrated-discs.jpg', srcAvif: '/assets/images/gallery/material/calibrated-discs.avif', srcWebp: '/assets/images/gallery/material/calibrated-discs.webp', alt: 'Equipamiento homologado de powerlifting' },
  },
  {
    key: 'upperBody',
    label: 'Tren superior',
    thumbnail: { src: '/assets/images/gallery/upper-body/standing-vertical-chest-press-1.jpg', srcAvif: '/assets/images/gallery/upper-body/standing-vertical-chest-press-1.avif', srcWebp: '/assets/images/gallery/upper-body/standing-vertical-chest-press-1.webp', alt: 'Todo tipo de máquinas para trabajar el tren superior' },
  },
  {
    key: 'lowerBody',
    label: 'Tren inferior',
    thumbnail: { src: '/assets/images/gallery/lower-body/belt-squat-1.jpg', srcAvif: '/assets/images/gallery/lower-body/belt-squat-1.avif', srcWebp: '/assets/images/gallery/lower-body/belt-squat-1.webp', alt: 'Equipamiento elite Eleiko para competición de powerlifting' },
  },
  {
    key: 'powerlifting',
    label: 'Powerlifting',
    thumbnail: { src: '/assets/images/gallery/powerlifting/bench-press-2.jpg', srcAvif: '/assets/images/gallery/powerlifting/bench-press-2.avif', srcWebp: '/assets/images/gallery/powerlifting/bench-press-2.webp', alt: 'Comunidad de powerlifters entrenando juntos' },
  },
];
