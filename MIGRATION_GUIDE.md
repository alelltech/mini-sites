# Guia de Migração: HTML Estático → React

## ✅ Migração Concluída

Esta documentação descreve a migração manual de páginas HTML estáticas para componentes React no projeto CalcZone BR.

## 📁 Estrutura de Pastas Criada

```
src/
├── pages/
│   ├── conversores/           (9 componentes)
│   ├── educacao/              (2 componentes)
│   ├── financas/              (3 componentes)
│   ├── desenvolvimento/       (3 componentes)
│   ├── texto/                 (3 componentes)
│   └── utilitarios/           (4 componentes)
├── utils/
│   └── globalFunctions.js     (funções globais convertidas)
└── styles/
    └── conversor.css          (estilos para conversores)
```

## 📊 Componentes React Criados (24 total)

### Conversores (9)
- ✅ Temperatura → `/conversores/temperatura`
- ✅ Moedas → `/conversores/moedas`
- ✅ Comprimento → `/conversores/comprimento`
- ✅ Peso → `/conversores/peso`
- ✅ Área → `/conversores/area`
- ✅ Velocidade → `/conversores/velocidade`
- ✅ Volume → `/conversores/volume`
- ✅ Pressão → `/conversores/pressao`
- ✅ Tempo → `/conversores/tempo`

### Educação (2)
- ✅ Nota Final → `/educacao/nota-final`
- ✅ Densidade → `/educacao/densidade`

### Finanças (3)
- ✅ Desconto → `/financas/desconto`
- ✅ Juros Compostos → `/financas/juros-compostos`
- ✅ INSS → `/financas/inss`

### Desenvolvimento (3)
- ✅ UUID → `/desenvolvimento/uuid`
- ✅ Gerador de CPF → `/desenvolvimento/cpf`
- ✅ Hash → `/desenvolvimento/hash`

### Texto (3)
- ✅ Maiúscula/Minúscula → `/texto/maiuscula-minuscula`
- ✅ Removedor de Acentos → `/texto/removedor-acentos`
- ✅ Palavras e Caracteres → `/texto/palavras-caracteres`

### Utilitários (4)
- ✅ IMC → `/utilitarios/imc`
- ✅ Porcentagem → `/utilitarios/porcentagem`
- ✅ Idade → `/utilitarios/idade`
- ✅ Validador de CPF → `/utilitarios/cpf-validador`

## 🔄 Como Foram Convertidos

### 1. Estrutura Base de um Conversor

**HTML Original:**
```html
<form id="toolForm">
    <input id="valor" type="number">
    <select id="de">...</select>
    <select id="para">...</select>
    <button>Converter</button>
</form>
<div id="result" style="display:none;">
    <div id="resultContent"></div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        setupRealTimeCalculation(...);
    });
</script>
```

**React Component:**
```jsx
const [valor, setValor] = useState('');
const [de, setDe] = useState('unidade1');
const [para, setPara] = useState('unidade2');
const [resultado, setResultado] = useState('');

useEffect(() => {
    converter();
}, [valor, de, para]);

function converter() {
    const val = safeParseFloat(valor);
    if (val === 0) {
        setResultado('');
        return;
    }
    // lógica de conversão
    setResultado(formatNumber(res, 2));
}

return (
    <section className="tool-section">
        {/* formulário */}
        {resultado && <div className="result">{resultado}</div>}
    </section>
);
```

### 2. Funções Globais Movidas

O arquivo `src/utils/globalFunctions.js` contém:
- `formatNumber()` - formata números para pt-BR
- `formatCurrency()` - formata valores monetários
- `isValidCPF()` - valida CPF
- `isValidCNPJ()` - valida CNPJ
- `safeParseFloat()` - parse seguro de floats
- E outras validações e utilitários

### 3. Estilos CSS Centralizados

O arquivo `src/styles/conversor.css` contém estilos reutilizáveis:
- `.tool-section` - container principal
- `.tool-header` - cabeçalho
- `.tool-form` - formulário
- `.result` - resultado
- `.result-item` - item do resultado

## 🚀 Como Adicionar Mais Componentes

### Passo 1: Criar o componente
```bash
# Criar arquivo em: src/pages/[categoria]/NomeComponente.js
```

### Passo 2: Implementar o componente
```jsx
import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions';
import '../../styles/conversor.css';

export default function MeuComponente() {
    // estado e lógica
    return (
        <section className="tool-section">
            {/* conteúdo */}
        </section>
    );
}
```

### Passo 3: Adicionar rota em App.js
```jsx
// Importar
import MeuComponente from './pages/categoria/MeuComponente.js';

// Adicionar rota
<Route path="/categoria/meu-componente" element={<MeuComponente />} />
```

## 📝 Notas Importantes

### Diferenças React vs JavaScript Vanilla

| Feature | Vanilla | React |
|---------|---------|-------|
| Estado | Variáveis globais | `useState()` |
| Efeito colateral | `addEventListener` | `useEffect()` |
| Cálculo em tempo real | setTimeout com debounce | `useEffect()` com dependências |
| DOM | `document.getElementById()` | Ref ou state |
| Condicionais | `if (condition) { elem.display = 'none'; }` | `{condition && <Element />}` |

### Estilos

- **CSS Modules**: Use imports de `.css` normais
- **Inline Styles**: Para estilos dinâmicos complexos, use objects
- **Classes**: Use `className` em vez de `class`

### Validações

Utilize as funções em `globalFunctions.js`:
```jsx
import { isValidCPF, isValidEmail, formatCurrency } from '../../utils/globalFunctions';
```

## 🔗 URLs de Acesso

```
http://localhost:3000/conversores/temperatura
http://localhost:3000/educacao/nota-final
http://localhost:3000/financas/desconto
http://localhost:3000/desenvolvimento/uuid
http://localhost:3000/texto/maiuscula-minuscula
http://localhost:3000/utilitarios/imc
```

## 📋 Páginas Ainda Não Convertidas

As páginas ainda na pasta `public/` que não foram convertidas:
- Alguns conversores e utilitários específicos
- Validadores de CNPJ
- Calculadoras científicas
- Outras ferramentas especializadas

### Próximos Passos (Opcional)

Para completar a migração de todas as páginas:

1. Converter os componentes restantes seguindo o padrão acima
2. Testar cada rota no navegador
3. Remover arquivos HTML de `public/` que foram convertidos
4. Atualizar sitemap e links internos

## 🎯 Benefícios da Migração

✅ Componentes reutilizáveis
✅ Estado gerenciado com React
✅ Hot reload durante desenvolvimento
✅ Melhor organização de código
✅ Facilita testes unitários
✅ Melhor performance com otimizações React
✅ Single Page Application (SPA) fluida

## 🐛 Troubleshooting

**Componente não renderiza:**
- Verificar import
- Verificar se a rota está em App.js
- Verificar console para erros

**Função de conversão não funciona:**
- Verificar import de `globalFunctions.js`
- Verificar se `useEffect` está configurado corretamente
- Verificar estado inicial das variáveis

**Estilos não aplicados:**
- Verificar import de CSS
- Verificar se className está correto
- Usar DevTools para inspecionar CSS aplicado

