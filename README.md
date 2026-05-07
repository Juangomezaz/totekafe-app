# ☕ ToteKafe — Tienda de café online

E-commerce de café con recomendaciones de productos por IA · Next.js · Firebase · Genkit

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Genkit](https://img.shields.io/badge/Genkit_AI-4285F4?style=flat&logo=google&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## Descripción

Tienda de café online desarrollada en equipo como proyecto académico. Permite explorar y comprar productos, gestionar un carrito de compras y recibir recomendaciones personalizadas generadas con inteligencia artificial a través de Genkit.

---

## Funcionalidades

- 🛒 **Carrito de compras** — Gestión completa de productos, cantidades y checkout
- 🤖 **Recomendaciones con IA** — Sugerencias de productos generadas con Genkit AI
- 🔐 **Autenticación** — Registro y login con Firebase Auth
- 📦 **Catálogo de productos** — Páginas individuales con detalle y precio
- 🗄️ **Firestore** — Base de datos en tiempo real con reglas de seguridad
- 📱 **Responsive** — Diseño adaptado a móvil y escritorio

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Backend / DB | Firebase, Firestore |
| IA | Genkit AI (recomendaciones de productos) |

---

## Variables de entorno

Crea un archivo `.env.local` con tus claves de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_dominio
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto
```

---

## Instalación

```bash
npm install
npm run dev
```

---

*Proyecto académico en equipo · Ingeniería de Sistemas · Universidad Católica Luis Amigó · 2025*
