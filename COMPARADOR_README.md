# Comparador de Carros

## Visão Geral

O **Comparador de Carros** é uma ferramenta interativa que permite aos usuários comparar até 4 modelos de carros diferentes. A ferramenta utiliza os dados completos armazenados em `meta_data.json` para exibir especificações detalhadas de cada veículo.

## Características

### ✨ Funcionalidades Principais

1. **Busca e Filtro de Modelos**
   - Busca por nome do modelo em tempo real
   - Filtro por marca/fabricante
   - Lista de até 20 resultados recomendados

2. **Seleção de Carros**
   - Adicionar até 4 modelos para comparação
   - Remover carros selecionados a qualquer momento
   - Visualização clara dos carros escolhidos

3. **Modos de Visualização**
   - **Por Categoria**: Agrupa informações por categorias (Dimensões, Motor, Desempenho)
   - **Visão Detalhada**: Tabela completa com todas as características

4. **Organização de Dados**
   - Dimensões (comprimento, largura, altura, peso, espaço no porta-malas, etc.)
   - Motor (tipo, potência, torque, deslocamento, combustível, etc.)
   - Desempenho (velocidade máxima, aceleração, consumo, suspensão, freios, etc.)
   - Informações gerais (marca, modelo, anos disponíveis)

## Estrutura de Arquivos

```
/src
├── pages/
│   └── Comparador.js              # Componente principal
└── styles/
    └── Comparador.css             # Estilos da página
```

## Como Usar

### Para o Usuário

1. **Acessar a página**: Clique em "Comparador de Carros" na página inicial
2. **Buscar modelos**:
   - Digite o nome do modelo no campo de busca
   - Ou selecione uma marca no dropdown para filtrar
3. **Selecionar carros**:
   - Clique no botão "+" ao lado do modelo desejado
   - Repetir até 4 modelos (máximo)
4. **Visualizar comparação**:
   - Alternar entre "Por Categoria" e "Visão Detalhada"
   - Analisar as diferenças entre os modelos
5. **Remover carros**:
   - Clicar no "✕" do modelo para removê-lo da comparação

### Para o Desenvolvedor

#### Importar o Componente

```javascript
import Comparador from './pages/Comparador.js';
```

#### Adicionar a Rota

```javascript
<Route path="/comparador" element={<Comparador />} />
```

## Estrutura de Dados

O componente utiliza `meta_data.json` que contém:

```json
{
  "models": [
    {
      "fabricante": "AUDI",
      "nome_do_modelo": "A1 1.4 TFSi 16v A/T",
      "anos_disponiveis": "2010 - 2011",
      "dimensoes_comprimento": "3954 mm",
      "dimensoes_largura": "1746 mm",
      "motor_potencia_cv": "122",
      "motor_torque_kgfm": "20,4",
      "desempenho_velocidade_maxima_kmph": "203",
      ...
    }
  ],
  "meta_data_views": {
    "fabricante": ["AUDI", "BMW", ...],
    "nome_do_modelo": ["A1 1.4 TFSi...", ...]
  }
}
```

## Estilos

### Cores Utilizadas
- **Gradiente Principal**: #667eea → #764ba2 (Roxo/Azul)
- **Fundo**: Branco (#ffffff)
- **Texto Primário**: #333333
- **Texto Secundário**: #666666
- **Bordas**: #e0e0e0

### Responsividade
- **Desktop**: Layout com sidebar e conteúdo lado a lado
- **Tablet (max-width: 1024px)**: Sidebar em coluna única
- **Mobile (max-width: 768px)**: Layout em coluna única com fonte reduzida
- **Pequenos (max-width: 480px)**: Otimizado para telas pequenas

## Performance

- **Limite de Modelos**: 20 resultados por página de busca (otimização de performance)
- **Máximo de Comparações**: 4 carros simultâneos
- **Carregamento**: Instantâneo (dados pré-carregados do JSON)

## Melhorias Futuras

- [ ] Adicionar fotos dos modelos a partir das pastas `/public/data/cars/[MARCA]/`
- [ ] Implementar destacar diferenças automáticas
- [ ] Adicionar gráficos comparativos (velocidade, consumo, etc.)
- [ ] Exportar comparação em PDF
- [ ] Adicionar histórico de comparações
- [ ] Compartilhar comparação via URL
- [ ] Filtros avançados (faixa de preço, ano mínimo, etc.)
- [ ] Integração com preços de mercado

## Requisitos

- React 17+
- React Router v6+
- CSS Grid e Flexbox

## Compatibilidade

- Chrome/Edge (versões recentes)
- Firefox (versões recentes)
- Safari (versões recentes)
- Mobile browsers

## Notas Técnicas

- O componente é **funcional** (usa Hooks)
- Utiliza `useState` e `useEffect` para gerenciar estado
- Sem dependências externas além do React
- CSS puro (sem bibliotecas CSS)

## Troubleshooting

### Problema: Modelos não aparecem na busca
**Solução**: Verifique se o `meta_data.json` está corretamente importado e se o nome do modelo foi digitado corretamente.

### Problema: Estilos não carregam
**Solução**: Certifique-se de que o arquivo `Comparador.css` está no diretório `src/styles/`.

### Problema: Rota não funciona
**Solução**: Verifique se a rota foi adicionada corretamente no `App.js` e se o componente foi importado.

## Autor

Desenvolvido para o projeto CalcZone BR

## Licença

Mesmo projeto
