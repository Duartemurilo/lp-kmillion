# Site da Kmillion (www.kmillion.com.br)

Next.js (App Router) + Tailwind, publicado na Vercel a cada push na `main`.

## Blog

Para criar, editar ou publicar post no blog, siga
[docs/blog-como-publicar.md](docs/blog-como-publicar.md).

Resumo: cada post é uma pasta `public/blog/<slug>/` com `index.html`, `img/` e
`video/`. A lista em `/blog`, o sitemap e o `llms.txt` saem das tags `<meta>`
do `index.html` (código em `lib/blog.ts`). Ao trabalhar em post, mexa só na
pasta dele, rode `npm run build` antes do commit e entregue por Pull Request
(a Vercel gera a prévia no PR).
