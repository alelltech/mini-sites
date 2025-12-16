import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const categories = [
    {
      title: 'Utilitários',
      tools: [
        { name: 'Comparador de Carros', icon: '🚗', path: '/utilitarios/comparador-carros' },
        { name: 'IMC', icon: '⚖️', path: '/utilitarios/imc' },
        { name: 'Porcentagem', icon: '%', path: '/utilitarios/porcentagem' },
        { name: 'Idade', icon: '🎂', path: '/utilitarios/idade' },
        { name: 'Validador CPF', icon: '✅', path: '/utilitarios/cpf-validador' },
        { name: 'Calorias', icon: '🍎', path: '/utilitarios/calorias' },
        { name: 'Validador CNPJ', icon: '🏢', path: '/utilitarios/cnpj-validador' },
        { name: 'Dias Restantes', icon: '📆', path: '/utilitarios/dias-restantes' },
        { name: 'Energia', icon: '⚡', path: '/utilitarios/energia' },
        { name: 'Número Aleatório', icon: '🎲', path: '/utilitarios/numero-aleatorio' },
        { name: 'Gerador de Senha', icon: '🔑', path: '/utilitarios/senha' },
      ]
    },
    {
      tools: [
        { name: 'Moedas', icon: '💱', path: '/conversores/moedas' },
        { name: 'Temperatura', icon: '🌡️', path: '/conversores/temperatura' },
        { name: 'Comprimento', icon: '📏', path: '/conversores/comprimento' },
        { name: 'Peso', icon: '⚖️', path: '/conversores/peso' },
        { name: 'Área', icon: '📐', path: '/conversores/area' },
        { name: 'Velocidade', icon: '🚀', path: '/conversores/velocidade' },
        { name: 'Volume', icon: '🥤', path: '/conversores/volume' },
        { name: 'Pressão', icon: '💨', path: '/conversores/pressao' },
        { name: 'Tempo', icon: '⏱️', path: '/conversores/tempo' },
      ]
    },
    {
      title: 'Educação',
      tools: [
        { name: 'Nota Final', icon: '📊', path: '/educacao/nota-final' },
        { name: 'Densidade', icon: '⚗️', path: '/educacao/densidade' },
        { name: 'Calculadora Científica', icon: '🔬', path: '/educacao/cientifica' },
        { name: 'Cronograma de Estudos', icon: '📅', path: '/educacao/cronograma-estudos' },
        { name: 'Notação Científica', icon: '10ⁿ', path: '/educacao/notacao-cientifica' },
      ]
    },
    {
      title: 'Finanças',
      tools: [
        { name: 'Desconto', icon: '🏷️', path: '/financas/desconto' },
        { name: 'Juros Compostos', icon: '📈', path: '/financas/juros-compostos' },
        { name: 'INSS', icon: '📋', path: '/financas/inss' },
        { name: 'Empréstimo', icon: '🏦', path: '/financas/emprestimo' },
        { name: 'FGTS', icon: '💼', path: '/financas/fgts' },
        { name: 'Hipoteca', icon: '🏠', path: '/financas/hipoteca' },
        { name: 'Horas Extras', icon: '⏰', path: '/financas/horas-extras' },
        { name: 'Impostos', icon: '🏛️', path: '/financas/impostos' },
        { name: 'Margem de Lucro', icon: '💰', path: '/financas/margem-lucro' },
      ]
    },
    {
      title: 'Desenvolvimento',
      tools: [
        { name: 'UUID', icon: '🆔', path: '/desenvolvimento/uuid' },
        { name: 'Gerador CPF', icon: '🏷️', path: '/desenvolvimento/cpf' },
        { name: 'Hash', icon: '#️⃣', path: '/desenvolvimento/hash' },
        { name: 'Base64', icon: '🔐', path: '/desenvolvimento/base64' },
        { name: 'Base Numérica', icon: '🔢', path: '/desenvolvimento/base-numerica' },
        { name: 'Gerador CNPJ', icon: '📊', path: '/desenvolvimento/cnpj' },
        { name: 'Hex ↔ Decimal', icon: '🔄', path: '/desenvolvimento/hex-decimal' },
        { name: 'Hex ↔ RGB', icon: '🎨', path: '/desenvolvimento/hex-rgb' },
        { name: 'Formatador JSON', icon: '{}', path: '/desenvolvimento/json' },
        { name: 'MD5', icon: '🔒', path: '/desenvolvimento/md5' },
        { name: 'Paleta de Cores', icon: '🎭', path: '/desenvolvimento/paleta-cores' },
        { name: 'SHA256', icon: '🔐', path: '/desenvolvimento/sha256' },
        { name: 'URL Encoder', icon: '📍', path: '/desenvolvimento/url-encoder' },
      ]
    },
    {
      title: 'Processamento de Texto',
      tools: [
        { name: 'Maiúscula/Minúscula', icon: '🔤', path: '/texto/maiuscula-minuscula' },
        { name: 'Removedor de Acentos', icon: 'ã', path: '/texto/removedor-acentos' },
        { name: 'Palavras e Caracteres', icon: '📝', path: '/texto/palavras-caracteres' },
      ]
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>CalcZone BR</h1>
        <p className="subtitle">50+ Calculadoras e Ferramentas Online Grátis</p>
        <p className="description">Sem instalação, rápido e preciso. Calcule impostos, conversões, e muito mais!</p>
      </section>

      <div className="categories">
        {categories.map((category, idx) => (
          <section key={idx} className="category">
            <h2 className="category-title">{category.title}</h2>
            <div className="tools-grid">
              {category.tools.map((tool, toolIdx) => (
                <Link key={toolIdx} to={tool.path} className="tool-card">
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-name">{tool.name}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
