import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const API_URL = "http://localhost:5000";

export const categorias = [
  {
    id: 1,
    nombre: "Entradas",
    imagenes:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    nombre: "Sopas",
    imagenes:
      "https://images.unsplash.com/photo-1749456256459-bff908a319f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    nombre: "Ensaladas",
    imagenes:
      "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    nombre: "Pastas",
    imagenes:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    nombre: "Carnes",
    imagenes:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    nombre: "Pescados y mariscos",
    imagenes:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    nombre: "Postres",
    imagenes:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    nombre: "Bebidas",
    imagenes:
      "https://plus.unsplash.com/premium_photo-1721227932255-175db3ae7f88?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    nombre: "Snacks",
    imagenes:
      "https://images.unsplash.com/photo-1551024709-8f23befc6ebc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 10,
    nombre: "Vegano / Vegetariano",
    imagenes:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
];
export type Recipe = {
  category_id: number;
  creator_id: string;
  id: string;
  steps: string;
  title: string;
  username: string;
};
