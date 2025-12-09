# 🚀 Configuração SEO - CalcZone BR

Guia completo de configuração SEO para melhorar ranking nos motores de busca.

## 1. Meta Tags Essenciais

### 1.1 Meta Tags Básicas
Todas as páginas devem conter:

```html
<!-- Codificação e Viewport -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Descrição (máx 160 caracteres) -->
<meta name="description" content="Descrição única e atrativa da ferramenta">

<!-- Palavras-chave -->
<meta name="keywords" content="palavra1, palavra2, palavra3">

<!-- Autor -->
<meta name="author" content="CalcZone BR">

<!-- Copyright -->
<meta name="copyright" content="© 2024 CalcZone BR">

<!-- Idioma -->
<meta http-equiv="content-language" content="pt-br">
```

### 1.2 Open Graph (Redes Sociais)
```html
<meta property="og:title" content="Título da Página">
<meta property="og:description" content="Descrição para compartilhamento">
<meta property="og:type" content="website">
<meta property="og:url" content="https://calczone.com.br/calczone/financas/impostos/">
<meta property="og:image" content="https://calczone.com.br/og-image.png">
<meta property="og:site_name" content="CalcZone BR">
<meta property="og:locale" content="pt_BR">
```

### 1.3 Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título da Página">
<meta name="twitter:description" content="Descrição concisa">
<meta name="twitter:image" content="https://calczone.com.br/twitter-image.png">
```

### 1.4 Canonical Tag
```html
<!-- Evita conteúdo duplicado -->
<link rel="canonical" href="https://calczone.com.br/calczone/financas/impostos/">
```

### 1.5 Robots Meta
```html
<!-- Controle de indexação -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
```

## 2. Estrutura HTML Semântica

### 2.1 Heading Tags
```html
<!-- Uma H1 por página -->
<h1>Calculadora de Impostos - CalcZone BR</h1>

<!-- Estrutura hierárquica -->
<h2>Sobre Impostos</h2>
<h3>ICMS</h3>
```

### 2.2 Tags Semânticas
```html
<main>
    <section>
        <article>Conteúdo principal</article>
    </section>
</main>
```

## 3. Schema Markup (JSON-LD)

### 3.1 Schema para Ferramenta Web
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculadora de Impostos",
  "description": "Calcule ICMS, IPI, ISS e outros impostos brasileiros",
  "url": "https://calczone.com.br/calczone/financas/impostos/",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
}
</script>
```

### 3.2 Schema para Organization
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CalcZone BR",
  "url": "https://calczone.com.br",
  "logo": "https://calczone.com.br/logo.png",
  "description": "Plataforma com 50 ferramentas educacionais e utilitários",
  "sameAs": [
    "https://www.facebook.com/calczonebr",
    "https://twitter.com/calczonebr",
    "https://instagram.com/calczonebr"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "contato@calczone.com.br"
  }
}
</script>
```

## 4. URLs Amigáveis para SEO

### 4.1 Estrutura de URLs
```
✅ Bom:
https://calczone.com.br/calczone/financas/impostos/

❌ Ruim:
https://calczone.com.br/calc.php?id=5&tipo=impostos
```

### 4.2 Recomendações
- URLs em minúsculas
- Separar palavras com hífen (-)
- Incluir palavras-chave relevantes
- Evitar números e caracteres especiais
- Manter URLs curtas

## 5. Performance e Core Web Vitals

### 5.1 Otimizações Implementadas
- ✅ CSS crítico inline
- ✅ Lazy loading de imagens
- ✅ Minificação de assets
- ✅ Cache browser

### 5.2 Métrica de LCP (Largest Contentful Paint)
- Meta: < 2.5 segundos
- Otimizar imagens
- Usar fontes Web seguindo melhor prática

### 5.3 Métrica de FID (First Input Delay)
- Meta: < 100ms
- JavaScript otimizado
- Sem scripts bloqueadores

## 6. Sitemap e Robots.txt

### 6.1 Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://calczone.com.br/</loc>
    <lastmod>2024-12-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://calczone.com.br/calczone/financas/impostos/</loc>
    <lastmod>2024-12-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 6.2 Robots.txt
```
User-agent: *
Allow: /
Disallow: /dev/
Disallow: /temp/
Disallow: /*.json$

Sitemap: https://calczone.com.br/sitemap.xml
```

## 7. Content Marketing

### 7.1 Boas Práticas
- Conteúdo único e relevante
- Palavras-chave naturais (3-5 por página)
- Texto com densidade de 1-3%
- Parágrafos curtos (3-5 linhas)
- Listas com bullet points

### 7.2 Palavras-chave por Categoria

#### Finanças
- calculadora impostos
- cálculo icms
- desconto pagar
- juros compostos
- empréstimo taxa

#### Conversores
- conversor temperatura
- conversor moeda
- conversor peso
- conversor comprimento

#### Desenvolvimento
- base64 encoder
- uuid generator
- json validator
- hex decimal converter

## 8. Link Building Interno

### 8.1 Estratégia
- Links contextuais no texto
- Anchor text descritivo
- 2-5 links internos por página
- Distribuição natural

### 8.2 Exemplo
```html
<p>Confira nossa <a href="/calczone/financas/desconto/">calculadora de desconto</a> para mais detalhes.</p>
```

## 9. Mobile Optimization

### 9.1 Verificações
- ✅ Viewport corretamente configurado
- ✅ Texto legível sem zoom
- ✅ Botões clicáveis (48px mínimo)
- ✅ Sem interstitials intrusivos

## 10. Monitoramento e Ferramentas

### 10.1 Ferramentas Essenciais
- **Google Search Console**: Monitorar presença nos resultados
- **Google Analytics 4**: Comportamento dos usuários
- **Lighthouse**: Verificar performance e SEO
- **Screaming Frog**: Auditoria técnica

### 10.2 KPIs para Acompanhar
- Rankings de palavras-chave
- Cliques orgânicos
- Impressões
- CTR (Click-Through Rate)
- Taxa de rejeição
- Tempo de permanência

## 11. Checklist SEO

- [ ] Meta title (50-60 caracteres)
- [ ] Meta description (150-160 caracteres)
- [ ] H1 único por página
- [ ] Headings hierárquicos (H2, H3)
- [ ] URLs amigáveis
- [ ] Images com alt text
- [ ] Links internos relevantes
- [ ] Mobile responsivo
- [ ] Schema markup
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Página 404 personalizada
- [ ] SSL certificate (HTTPS)
- [ ] Core Web Vitals otimizados
- [ ] Analytics configurado

## 12. Próximos Passos

1. ✅ Implementar meta tags em todas as páginas
2. ✅ Criar sitemap.xml dinâmico
3. ✅ Configurar robots.txt
4. ✅ Adicionar schema markup
5. ✅ Otimizar imagens
6. ✅ Configurar Search Console
7. ✅ Configurar Analytics 4
8. ✅ Criar blog com conteúdo
9. ✅ Estratégia de link building
10. ✅ Monitorar e iterar

---

**Última atualização:** 9 de Dezembro de 2024
