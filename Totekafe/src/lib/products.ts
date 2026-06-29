import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'edicion-especial-cafe',
    name: 'Café Edición Especial - 250g',
    description: 'Nuestra primera edición. Un café de origen único con notas de chocolate y frutos rojos, cultivado en las montañas de Antioquia.',
    price: 30000,
    imageId: 'edicion-especial-cafe-img',
    isCourse: false,
  },
  {
    id: 'totebag-grano-a-grano',
    name: "Totebag de Lienzo 'Grano a Grano'",
    description: 'Lleva tu amor por el buen café a todas partes. Fabricada con lienzo resistente y un diseño exclusivo de Totekafe.',
    price: 50000,
    imageId: 'merch-tote',
    isCourse: false,
  },
  {
    id: 'curso-asesoria-cafe',
    name: 'Curso de Asesoría de Café',
    description: 'Aprende sobre métodos de preparación, tipos de grano y secretos de baristas profesionales en nuestro curso exclusivo.',
    price: 75000,
    imageId: 'curso-asesoria-cafe-img',
    isCourse: true,
  },
];
