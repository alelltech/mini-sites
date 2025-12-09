# Prompts para Automação de Mini-Sites com AdSense

Este arquivo reúne **todos os prompts organizados** para usar no **GitHub Copilot**, divididos por:

* Criação de mini-sites
* Automação
* SEO
* Templates reutilizáveis
* Geração em escala
* Lógica avançada para ferramentas

Você pode copiar e colar no Copilot ou adaptar.

---

## 🔵 1. Prompt — Criar um Mini-Site Completo

```
Quero que você gere um mini-site completo em HTML, CSS e JavaScript, usando a arquitetura:
index.html, style.css e script.js.

Ferramenta: {NOME DA FERRAMENTA}

Objetivo:
Criar uma página extremamente leve, rápida, mobile-first, com layout simples e limpo.

Requisitos:
- Incluir um título otimizado (H1)
- Criar um subtítulo explicando a função da ferramenta
- Criar a ferramenta funcional usando JavaScript puro
- Criar uma seção FAQ com 4 perguntas
- Incluir meta description otimizada
- Incluir schema JSON-LD para WebApplication
- Incluir comentários no código
- Não usar frameworks externos

Entregue:
1. index.html
2. style.css
3. script.js
```

---

## 🔵 2. Prompt — Criar apenas a lógica da Ferramenta (JS)

```
Quero que você gere um código JavaScript puro para a seguinte ferramenta:

Ferramenta: {DESCREVA A FERRAMENTA}

Requisitos:
- usar apenas JavaScript nativo
- criar funções puras e reutilizáveis
- incluir validação de entradas
- incluir comentários explicando cada função
- retornar o valor final formatado
- preparar a função para ser utilizada por botões HTML
```

---

## 🔵 3. Prompt — Criar Texto SEO completo

```
Gere o texto SEO desta ferramenta: {NOME DA FERRAMENTA}

Requisitos:
- introdução com 2 parágrafos
- seção "Como funciona"
- seção "Quando usar"
- seção "Vantagens"
- seção "Perguntas Frequentes (FAQ)" com 5 perguntas
- linguagem simples, direta e profissional
- evitar repetições
- incluir palavras-chave relacionadas
```

---

## 🔵 4. Prompt — Criar 10 Mini-Sites de Uma Vez

```
Quero que você gere a estrutura base de 10 mini-sites diferentes com:
index.html, style.css e script.js.

Ferramentas:
1. Calculadora de FGTS
2. Conversor de moedas
3. Calculadora de margem e lucro
4. Calculadora de horas extras
5. Conversor de PDF para JPG
6. Conversor de temperatura
7. Gerador de QR Code
8. Contador de palavras e caracteres
9. Calculadora de INSS
10. Simulador de juros compostos

Para cada ferramenta entregue:
- um arquivo index.html com título, descrição e a ferramenta
- style.css simples e responsivo
- script.js com a lógica funcional
```

---

## 🔵 5. Prompt — Criar 50 Mini-Sites (escala máxima)

```
Preciso de uma lista de 50 mini-sites de utilidades fáceis de implementar para monetizar com AdSense.

Para cada item gere:
- Título recomendado
- Palavra-chave principal
- Descrição curta (160 caracteres)
- Estrutura HTML composta por: título (H1), breve descrição e contêiner da ferramenta
- Especificação da função JavaScript necessária

A lista deve ser focada em calculadoras, conversores e ferramentas simples.
```

---

## 🔵 6. Prompt — Mini-Site Pronto para Publicação

```
Gere um mini-site completo, pronto para publicação, para a ferramenta:
{NOME DA FERRAMENTA}

O pacote deve incluir:
- index.html com SEO e layout pronto
- style.css minimalista
- script.js funcional
- robots.txt liberando indexação
- sitemap.xml com a URL / index
- arquivo schema.json

O site deve ser:
- mobile-first
- carregamento rápido
- sem frameworks
- com código limpo e comentado
```

---

## 🔵 7. Prompt — Geração de Múltiplos Subdomínios

```
Preciso que você gere automaticamente a estrutura de múltiplos subdomínios, um mini-site por subdomínio.

Subdomínios:
{LISTA DE SUBDOMÍNIOS}

Para cada subdomínio, gere:
- index.html com o nome da ferramenta correspondente
- style.css
- script.js funcional
- robots.txt
- sitemap.xml

Não use frameworks externos.
Código limpo, organizado e comentado.
```

---

## 🔵 8. Prompt — Ferramentas Avançadas (exemplo: cálculo com faixas)

```
Quero que você desenvolva uma ferramenta avançada em JavaScript puro:

Ferramenta: {DESCRIÇÃO COMPLETA}

Requisitos:
- incluir cálculo de faixas
- tabelas dinâmicas
- sliders ou inputs
- modo claro/escuro
- exportar PDF com resultado
- código modular
- lógica bem documentada
```

---

## 🔵 9. Prompt — Criar Template Reutilizável Baseado em JSON

```
Crie um template completo e genérico de mini-site de ferramenta, separado em:
index.html, style.css e script.js.

O template deve permitir:
- alterar apenas um JSON
- mudar nome da ferramenta
- mudar ícones
- mudar textos
- carregar lógica JS automaticamente

Crie também um exemplo de JSON para:
"calculadora de juros compostos"
```

---

## 🔵 10. Prompt — Criar Página Central com Todas as Ferramentas

```
Crie uma página principal chamada "Ferramentas Online" listando todos os mini-sites.

Requisitos:
- grid com cartões
- link para cada mini-site
- buscas por nome e categoria
- tags (Finanças, Conversores, Negócios)
- design leve e responsivo
```

---

## 🔵 11. Prompt — Script de Automação (Node.js) para Gerar Todos os Sites

```
Crie um script em Node.js chamado generate.js que:
- leia um arquivo sites.json
- carregue templates HTML, CSS e JS
- substitua variáveis como {{TITLE}}, {{DESCRIPTION}}, {{SLUG}}, {{TOOL_HTML}}
- crie uma pasta por mini-site
- gere index.html, style.css, script.js, sitemap.xml e robots.txt
- inclua logs de criação
- garanta que tudo seja leve e sem dependências
```

---

## 🔵 12. Prompt — Workflow GitHub Actions para Deploy Automático

```
Crie um arquivo .github/workflows/deploy.yml que:
- rode `npm install`
- execute `npm run generate`
- faça deploy automático para GitHub Pages
- mantenha cache de dependências
```

---

## 🔵 13. Prompt — Criar Função de Ferramenta a partir de Especificação Natural

```
Quero que você gere o código da ferramenta baseado na seguinte descrição natural:

"{DESCRIÇÃO EM LINGUAGEM HUMANA}"

Entregue:
- HTML do componente
- CSS minimalista
- JS funcional

Não utilize bibliotecas externas.
```

---

## 🔵 14. Prompt — Gerar Variações da Mesma Ferramenta (A/B Testing)

```
Crie 3 variações desta ferramenta para testes A/B:
Ferramenta: {NOME}

Cada variação deve alterar:
- layout
- posição do botão
- formato do input
- forma de exibir o resultado

Entregue 3 estruturas completas HTML/CSS/JS.
```

---

**Pronto!**

Este arquivo contém **todos os prompts importantes** para construir, escalar e automatizar sua rede de mini-sites monetizados com AdSense.

Se quiser agora, posso:

* gerar o `sites.json`
* gerar os templates reais
* gerar o script `generate.js`
* montar o repositório inteiro aqui no canvas

É só me pedir.
