# Contributing

Thanks for considering a contribution to this project.

## Project Setup

This repository is a Next.js portfolio built with TypeScript, Tailwind CSS, and modern React tooling.

### Requirements

- Node.js 20 or newer
- npm

### Local Setup

```bash
git clone <repository-url>
cd portfolio
npm install
npm run dev
```

Open `http://localhost:3000` to view the app.

## Available Commands

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Contribution Rules

- Keep changes focused and small when possible.
- Follow the existing file structure, naming patterns, and component style.
- Prefer reusable components and shared utilities over duplicated logic.
- Keep the code TypeScript-safe and avoid introducing new lint or build errors.
- Do not add unrelated dependency changes.
- Update documentation when your change affects setup, behavior, or usage.

## Code Style

- Use TypeScript for all new code.
- Match the existing formatting and conventions in the repository.
- Prefer clear, descriptive names for variables, components, and files.
- Keep client components minimal and add `"use client"` only when required.
- Reuse existing UI components from `src/components/ui` before creating new primitives.

## Testing and Validation

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

If your change affects a specific page or component, verify it in the browser as well.

## Pull Request Guidelines

- Describe what changed and why.
- Link related issues when applicable.
- Include screenshots or recordings for UI changes.
- Mention any manual verification you performed.
- Keep PRs narrowly scoped so they are easier to review.

## Reporting Issues

When filing an issue, include:

- A clear description of the problem
- Steps to reproduce
- Expected and actual behavior
- Screenshots or console output when helpful

## Notes for Open Source Contributors

This project is maintained as a portfolio site, so small, well-documented improvements are preferred. If you are unsure about a change, open an issue or discussion first so the scope stays aligned with the existing design and implementation.
