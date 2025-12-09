# CalcZone BR - Plataforma de Ferramentas Online Gratuitas

## 📋 Visão Geral

**CalcZone BR** é uma plataforma de código aberto que oferece mais de 50 ferramentas online gratuitas, incluindo calculadoras, conversores, geradores e utilitários. O site é otimizado para SEO, funciona offline e é monetizado com AdSense.

- **URL**: calc-br.zone
- **Domínio**: calc-br.zone
- **Hosting**: GitHub Pages (grátis)
- **Automação**: Node.js + GitHub Actions
- **Tecnologia**: HTML, CSS, JavaScript vanilla (sem frameworks)

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js >= 14.0.0
- Git
- Conta GitHub

### Instalação

```bash
# Clonar repositório
git clone https://github.com/alelltech/ferramentas-com-br
cd ferramentas-com-br

# Instalar dependências
npm install

# Gerar sites estáticos
npm run generate

# Resultado em ./dist/
```

### Estrutura de Pastas

```
.
├── config/
│   └── sites.json              # Configuração das 50 ferramentas
├── public/
│   ├── index.html              # Homepage principal
│   ├── styles.css              # CSS global
│   └── script.js               # JavaScript global
├── templates/
│   └── tool-template.html      # Template para cada ferramenta
├── scripts/
│   └── generate.js             # Script gerador (Node.js)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions - Deploy automático
├── package.json                # Dependências Node.js
├── CNAME                       # Domínio customizado
└── dist/                       # Saída gerada (criada por generate.js)
```

---

## 📚 Documentação

### Como Adicionar uma Nova Ferramenta

#### 1. Adicione em `config/sites.json`:

```json
{
  "id": 51,
  "slug": "nova-ferramenta",
  "title": "Título da Ferramenta",
  "description": "Descrição breve da ferramenta",
  "keywords": "palavra1, palavra2, palavra3",
  "category": "Finanças",
  "icon": "📊"
}
```

#### 2. Implemente em `scripts/generate.js` (objeto `toolImplementations`):

```javascript
'nova-ferramenta': {
    html: `<div class="form-group">
                <label>Input</label>
                <input type="number" id="input">
            </div>
            <button class="btn btn-primary" onclick="calcularNovaFerramenta()">Calcular</button>
            <div id="result" class="result hidden">
                <div class="result-label">Resultado</div>
                <div class="result-value">0</div>
            </div>`,
    script: `function calcularNovaFerramenta() {
                const valor = parseFloat(document.getElementById('input').value);
                // Implementar lógica aqui
                const resultado = valor * 2; // Exemplo
                showResult(document.getElementById('result'), resultado);
                trackToolUsage('nova-ferramenta');
            }`
}
```

#### 3. Gere os sites:

```bash
npm run generate
```

### Estrutura de uma Ferramenta

Cada ferramenta gerada segue esta estrutura:

```
/nova-ferramenta/
├── index.html          # Página renderizada
└── (CSS e JS compartilhados em /styles.css e /script.js)
```

### Utilitários JavaScript Disponíveis

No arquivo `public/script.js`, você pode usar:

- `copyToClipboard(text, buttonElement)` - Copiar para área de transferência
- `formatNumber(num, decimals)` - Formatar número com locales
- `formatCurrency(value)` - Formatar como moeda BRL
- `isValidNumber(value)` - Validar número
- `isPositive(value)` - Verificar se positivo
- `isNonNegative(value)` - Verificar se >= 0
- `removeAccents(str)` - Remover acentos
- `calculateDaysBetween(date1, date2)` - Dias entre datas
- `generateRandomNumber(min, max)` - Número aleatório
- `showResult(element, value, label)` - Mostrar resultado
- `trackToolUsage(toolName)` - Rastrear uso (Analytics)

---

## 🔧 Configuração

### Domínio Customizado

O arquivo `CNAME` contém o domínio customizado. Para mudar:

```bash
echo "seu-dominio.com" > CNAME
```

Depois configure o DNS conforme documentado em `docs/DNS_CONFIG.md`.

### GitHub Pages

As configurações estão em `.github/workflows/deploy.yml`:

1. **Build**: npm install → npm run generate
2. **Deploy**: Automático para GitHub Pages
3. **HTTPS**: Ativado automaticamente

---

## 📊 Estatísticas

- **Total de Ferramentas**: 50+
- **Categorias**: 6 (Finanças, Conversores, Texto, Desenvolvimento, Utilitários, Educação)
- **Tamanho Médio por Site**: ~15-20KB
- **Tempo de Geração**: < 2 segundos para 50 sites
- **Performance**: Lighthouse 90+

---

## 🎯 Roadmap

- [ ] Implementar API de câmbio real (CoinGecko/OpenExchangeRates)
- [ ] Adicionar histórico de cálculos (localStorage)
- [ ] Suporte para múltiplos idiomas
- [ ] Modo dark/light tema
- [ ] Aplicativo mobile (PWA)
- [ ] Mais 50+ ferramentas
- [ ] Sistema de feedback de usuários

---

## 💰 Monetização

### Google AdSense

1. Gere e teste o site localmente
2. Deploy no GitHub Pages com domínio customizado
3. Aguarde 15-30 dias de tráfego orgânico
4. Aplique para AdSense em `https://adsense.google.com`
5. Google aprovará em 7-30 dias
6. Insira o código de anúncio na seção `.ads-container`

### Localização de Anúncios

Locais recomendados para anúncios:

- Entre o título e o formulário da ferramenta
- Após os resultados do cálculo
- No rodapé (horizontal ou vertical)
- Na barra lateral (se mobile responsivo permitir)

---

## 📈 SEO

### Checklist de Otimização

- ✅ Meta tags configuradas
- ✅ Schema JSON-LD estruturado
- ✅ sitemap.xml gerado automaticamente
- ✅ robots.txt configurado
- ✅ Palavras-chave em URLs (slugs)
- ✅ Descrições únicas por página
- ✅ Hierarquia de títulos (H1, H2, H3)
- ✅ Performance Lighthouse 90+
- ✅ Mobile-first responsivo

### Submeter ao Google

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione propriedade: `calc-br.zone`
3. Adicione sitemap: `https://calc-br.zone/sitemap.xml`
4. Aguarde indexação (1-2 semanas)

---

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
npm run generate    # Gera todos os 50+ sites em ./dist/
npm run dev        # Gera e sirve localmente (necesita http-server)
npm run build      # Alias para generate
npm run clean      # Remove pasta ./dist/
```

### Testando Localmente

```bash
# Gerar
npm run generate

# Servir (precisa de http-server instalado globalmente)
npx http-server dist -p 8080

# Acessar: http://localhost:8080
```

### Adicionar Dependências

Este projeto **não usa dependências externas**. Tudo é JavaScript vanilla.

Se precisar adicionar bibliotecas no futuro:

```bash
npm install nome-da-lib
```

E atualize `scripts/generate.js` para incluir a lib nos assets.

---

## 🔐 Segurança

- ✅ Sem backend - cálculos rodamno navegador
- ✅ Sem armazenamento de dados
- ✅ HTTPS obrigatório (GitHub Pages)
- ✅ Sem dependências externas perigosas
- ✅ Sem tracking de usuários
- ✅ Privacy-friendly

---

## 📝 Licença

MIT License - Use livremente em projetos pessoais e comerciais

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-ferramenta`)
3. Commit suas mudanças (`git commit -am 'Add nova-ferramenta'`)
4. Push para a branch (`git push origin feature/nova-ferramenta`)
5. Abra um Pull Request

---

## 📧 Suporte

- **Email**: contato@calc-br.zone
- **GitHub Issues**: https://github.com/alelltech/ferramentas-com-br/issues

---

## 🎉 Agradecimentos

Obrigado por usar CalcZone BR! Compartilhe com amigos e aproveite as ferramentas.

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0.0
