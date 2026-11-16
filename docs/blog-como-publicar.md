# Como publicar um post no blog da Kmillion

Guia para a agência (e para o Claude dela). O blog fica em
`https://www.kmillion.com.br/blog`. Cada post é a mesma página HTML que vocês
já geram hoje para a Vercel, só que dentro deste repositório.

## Resumo em 5 passos

1. Crie a pasta `public/blog/<endereco-do-post>/` com o `index.html`, a pasta
   `img/` e, se houver, a pasta `video/`.
2. Confira as tags obrigatórias no `<head>` (lista abaixo).
3. Rode `npm run build`. Se der erro com `[blog]`, a mensagem diz o que falta.
4. Crie uma branch `post/<endereco-do-post>`, faça o commit e abra um Pull
   Request para a `main`.
5. A Vercel comenta no PR um link de prévia. Abra `<link>/blog` e
   `<link>/blog/<endereco-do-post>`, confira e faça o merge. Em 1 a 2 minutos
   o post está no ar.

O post entra sozinho na lista de `/blog`, no sitemap e no `llms.txt`. Não há
nenhum outro arquivo para editar.

## A pasta do post

```
public/blog/estoque-parado/
├── index.html
├── img/
│   ├── capa-960.webp
│   └── ...
└── video/
    ├── exemplo.mp4
    └── exemplo-poster.jpg
```

- **Nome da pasta = endereço do post.** Só letras minúsculas, números e hífen,
  sem acento: `estoque-parado` vira `kmillion.com.br/blog/estoque-parado`.
  Pasta com outro formato é ignorada.
- **Caminhos relativos**, como hoje: `img/foto.webp`, `video/clip.mp4`. O site
  ajusta os caminhos para o endereço final. Não use `/estoque-parado/img/...`.
- **Peso:** imagens em `.webp`, até ~400 KB cada. Vídeos em `.mp4`, até ~10 MB
  cada. O repositório guarda tudo para sempre, então arquivo grande pesa para
  sempre.

## Tags obrigatórias no `<head>`

```html
<title>Título do post | Kmillion</title>
<meta name="description" content="Resumo de 1 a 2 frases. Aparece no card do blog e no Google.">
<meta property="og:image" content="img/capa-960.webp">
<meta property="article:published_time" content="2026-11-16">
```

Opcionais:

```html
<!-- Etiqueta no card do blog (uma palavra ou duas): Estoque, Cashback, Influenciadores... -->
<meta property="article:section" content="Estoque">
<!-- Quando o post for revisado depois de publicado -->
<meta property="article:modified_time" content="2026-12-01">
```

Como cada tag aparece no blog:

| Tag | Onde aparece |
|---|---|
| `<title>` (sem o "\| Kmillion") | título do card |
| `description` | texto do card e resumo no Google |
| `og:image` | capa do card e imagem ao compartilhar o link. Use uma foto que funcione cortada em 4:3 |
| `article:published_time` | data do card e ordem da lista (mais novo primeiro) |
| `article:section` | etiqueta do card |

O `canonical` e o `og:url` podem ficar como estiverem: o site troca pelos
endereços certos (`https://www.kmillion.com.br/blog/<pasta>`).

## Rascunho

Para subir um post sem divulgar, deixe no `<head>`:

```html
<meta name="robots" content="noindex, nofollow">
```

Ele abre pelo endereço direto (bom para mandar para aprovação), mas fica fora
da lista do blog, do sitemap e do Google. Para publicar, apague a linha.

## Cabeçalho e rodapé do post

Mantenham o cabeçalho e o rodapé que vocês já usam (espelham o site) e incluam
o link **Blog** apontando para `/blog`, ao lado de IMS. O post
`public/blog/estoque-parado/index.html` é a referência.

## O que não fazer

- Não edite nada fora de `public/blog/<pasta-do-post>/`. Mudança no resto do
  site é com o time de desenvolvimento.
- Não suba para a `main` direto: o PR é o que gera a prévia.
- O script que força a barra no fim da URL (`location.pathname + '/'`) não é
  necessário aqui. Se vier junto, o site o remove sozinho.

## Se algo der errado

Se o build falhar, a Vercel **não publica** e o site continua como estava.
A mensagem com `[blog]` no log diz qual arquivo e qual tag faltam.
