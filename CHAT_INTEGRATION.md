# Integração Chat + Calculadoras

## ✅ Implementado

### Hook `useUrlParams`
Localização: `/src/utils/useUrlParams.js`

Hook personalizado que lê parâmetros da URL e preenche os campos das calculadoras automaticamente.

### Calculadoras Atualizadas

1. **Calculadora de Desconto** (`/financas/desconto`)
   - Parâmetros: `valorOriginal`, `percentualDesconto`
   - Exemplo: `/financas/desconto?valorOriginal=250&percentualDesconto=15`

2. **Calculadora de IMC** (`/utilitarios/imc`)
   - Parâmetros: `peso`, `altura` (em metros, convertido para cm)
   - Exemplo: `/utilitarios/imc?peso=75&altura=1.75`

3. **Calculadora de Juros Compostos** (`/financas/juros-compostos`)
   - Parâmetros: `valorInicial`, `periodo` (meses), `taxaJuros`
   - Exemplo: `/financas/juros-compostos?valorInicial=5000&periodo=12&taxaJuros=0.8`

4. **Simulador de Empréstimo** (`/financas/emprestimo`)
   - Parâmetros: `valorTotal`, `entrada`, `numeroParcelas`, `taxaJuros`
   - Exemplo: `/financas/emprestimo?valorTotal=40000&entrada=10000&numeroParcelas=48&taxaJuros=1.5`
   - Observação: Calcula automaticamente o valor a financiar (total - entrada)

5. **Calculadora de INSS** (`/financas/inss`)
   - Parâmetros: `salario`
   - Exemplo: `/financas/inss?salario=3500`

6. **Calculadora de FGTS** (`/financas/fgts`)
   - Parâmetros: `salario`, `meses`
   - Exemplo: `/financas/fgts?salario=3500&meses=12`

7. **Calculadora de Impostos** (`/financas/impostos`)
   - Parâmetros: `rendaMensal`
   - Exemplo: `/financas/impostos?rendaMensal=5000`

## Como Funciona

1. **Usuário digita no chat**: "Simule um financiamento de 40 mil com 10 mil de entrada em 48 parcelas"

2. **Bot extrai entidades**:
   - valor: 40000
   - entrada: 10000
   - parcelas: 48

3. **Bot constrói URL**: `/financas/emprestimo?valorTotal=40000&entrada=10000&numeroParcelas=48&taxaJuros=1.5`

4. **Navegação**: React Router redireciona

5. **Hook `useUrlParams`**: Lê os parâmetros e preenche os campos

6. **useEffect**: Dispara o cálculo automaticamente

## Comandos de Teste

```
"Financiamento de 30 mil"
"Quanto rende 10 mil em 12 meses"
"Desconto de 20% em 150 reais"
"IMC com 70kg e 1.70m"
"Qual meu INSS com salário de 3500"
```

## Para Adicionar em Novas Calculadoras

```javascript
import useUrlParams from '../../utils/useUrlParams.js';

export default function MinhaCalculadora() {
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  
  // Adicione isso após os useState
  useUrlParams({
    nomeParametro1: setCampo1,
    nomeParametro2: setCampo2
  });
  
  // Resto do código...
}
```
