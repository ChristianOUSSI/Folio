export const articles = [
  {
    id: '1',
    slug: 'introduction-typescript',
    title: 'Introduction à TypeScript: Types et Interfaces',
    excerpt: 'Découvrez comment TypeScript améliore la fiabilité de votre code JavaScript avec des types statiques.',
    date: '2026-03-15',
    readTime: 8,
    category: 'TypeScript',
    image: '/blog/typescript.jpg',
    content: `
    # Introduction à TypeScript

    TypeScript est un sur-ensemble typé de JavaScript qui offre une meilleure sécurité au moment de la compilation.

    ## Avantages

    - **Type Safety**: Détectez les erreurs avant le runtime
    - **Meilleure IDE Support**: Autocomplétion et refactoring
    - **Scalabilité**: Idéal pour les projets de grande taille

    ## Types de base

    \`\`\`typescript
    let name: string = "Jean";
    let age: number = 25;
    let active: boolean = true;
    \`\`\`

    ## Interfaces

    \`\`\`typescript
    interface User {
      name: string;
      age: number;
      email?: string; // optionnel
    }

    const user: User = {
      name: "Jean",
      age: 25
    };
    \`\`\`
    `,
  },
  {
    id: '2',
    slug: 'react-performance-optimization',
    title: 'Optimisation des Performances React',
    excerpt: 'Techniques avancées pour optimiser vos composants React et améliorer les performances.',
    date: '2026-03-10',
    readTime: 12,
    category: 'React',
    image: '/blog/react.jpg',
    content: `
    # Optimisation des Performances React

    Voici comment optimiser vos composants React pour des performances maximales.

    ## Memo et useMemo

    \`\`\`typescript
    const MemoComponent = memo(({ data }: Props) => {
      return <div>{data}</div>;
    });

    const ExpensiveComponent = () => {
      const result = useMemo(() => expensiveCalculation(), [deps]);
      return <div>{result}</div>;
    };
    \`\`\`

    ## useCallback

    Utilisez useCallback pour éviter les re-rendus inutiles des enfants.

    ## Virtual Scrolling

    Pour les listes longues, implémentez le virtual scrolling avec des librairies comme react-window.
    `,
  },
  {
    id: '3',
    slug: 'next-js-13-app-router',
    title: 'Next.js 13+: Migration vers l\'App Router',
    excerpt: 'Guide complet pour migrer votre application Next.js vers le nouvel App Router.',
    date: '2026-03-05',
    readTime: 10,
    category: 'Next.js',
    image: '/blog/nextjs.jpg',
    content: `
    # Next.js 13+: App Router

    Le nouvel App Router offre une meilleure structure et des performances améliorées.

    ## Structure de répertoires

    \`\`\`
    app/
    ├── layout.tsx
    ├── page.tsx
    ├── blog/
    │   ├── [slug]/
    │   │   └── page.tsx
    │   └── layout.tsx
    \`\`\`

    ## Server Components

    Par défaut, les composants sont des Server Components, ce qui améliore les performances.

    ## Streaming et Suspense

    Utilisez Suspense pour améliorer l'expérience utilisateur avec le streaming.
    `,
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getAllArticles() {
  return articles;
}
