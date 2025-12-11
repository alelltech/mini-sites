# Setup Projeto React - CalcZone BR

## O que foi criado:

### Estrutura de Pastas
```
src/
├── components/          # Componentes React
│   ├── Header.js
│   └── Footer.js
├── pages/              # Páginas
│   └── Home.js
├── styles/             # Estilos CSS
│   ├── index.css
│   ├── App.css
│   ├── Header.css
│   ├── Footer.css
│   └── Home.css
├── utils/              # Funções utilitárias
│   └── calculations.js
├── App.js              # Componente principal
└── index.js            # Ponto de entrada
```

### Arquivos de Configuração
- `package.json` - Dependências e scripts
- `webpack.config.js` - Configuração do Webpack
- `.babelrc` - Configuração do Babel
- `public/index.html` - HTML raiz com AdSense

## Instalação

### 1. Instalar Node Modules
```bash
npm install
```

Isso instalará todas as dependências:
- **React 18** - Framework
- **React Router v6** - Navegação
- **Webpack 5** - Bundler
- **Babel 7** - Transpilador
- **CSS Loader** - Para importar CSS

### 2. Iniciar Desenvolvimento
```bash
npm run dev
# ou
npm start
```

A aplicação abrirá em `http://localhost:3000`

### 3. Build para Produção
```bash
npm run build
```

Isso criará uma pasta `dist/` com os arquivos otimizados para produção.

## Funcionalidades da Aplicação

- ✅ Header com navegação
- ✅ Footer com links
- ✅ Página inicial com categorias
- ✅ Roteamento com React Router
- ✅ Responsivo (mobile-friendly)
- ✅ Google AdSense integrado
- ✅ Funções utilitárias (cálculos, validações)

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run start    # Alias para dev
npm run build    # Build para produção
```

## Estrutura de Componentes

### App.js
Componente raiz que:
- Configura React Router
- Renderiza Header, páginas e Footer
- Carrega estilos globais

### Header.js
Navbar com:
- Logo/Home link
- Links de navegação

### Footer.js
Rodapé com:
- Copyright dinâmico
- Links de política/termos

### Home.js
Página inicial com:
- Hero section
- Grid de categorias
- Cards de ferramentas

## Utilitários (src/utils/calculations.js)

Funções prontas para:
- ✅ Formatação de moeda
- ✅ Cálculos de porcentagem
- ✅ Juros compostos
- ✅ Validação de CPF
- ✅ Validação de CNPJ

## Próximos Passos

1. Instale as dependências: `npm install`
2. Inicie o dev: `npm run dev`
3. Comece a adicionar mais páginas em `src/pages/`
4. Crie componentes reutilizáveis em `src/components/`
5. Adicione estilos em `src/styles/`
