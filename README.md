# amarbiradar.me

<p align="left">
	<a href="https://nextjs.org/">
		<img src="https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
	</a>
	<a href="https://www.typescriptlang.org/">
		<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
	</a>
	<a href="https://react.dev/">
		<img src="https://img.shields.io/badge/React-19.2.4-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React" />
	</a>
	<a href="./LICENSE">
		<img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
	</a>
	<a href="./CONTRIBUTING.md">
		<img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge" alt="Contributions welcome" />
	</a>
</p>

A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and reusable UI components. The project includes a landing page, GitHub activity visualizations, and a resume experience.

## Project Overview

- Modern portfolio layout with reusable sections and shared UI primitives
- GitHub activity and contribution display components
- Resume page and PDF preview experience
- Responsive design with theme support

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI and shadcn-style components
- React Day Picker
- Recharts

## Project Structure

```text
.
├── public/
│   └── assets/
│       └── brand/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── resume/
│   ├── components/
│   │   ├── github/
│   │   ├── landing/
│   │   ├── providers/
│   │   ├── resume/
│   │   ├── svg/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   └── lib/
├── CONTRIBUTING.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint checks

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Deployment

This project is ready to deploy on Vercel or any platform that supports Next.js applications.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
