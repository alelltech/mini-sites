import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const categories = [
    {
      title: 'Conversores',
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
      ]
    },
    {
      title: 'Finanças',
      tools: [
        { name: 'Desconto', icon: '🏷️', path: '/financas/desconto' },
        { name: 'Juros Compostos', icon: '📈', path: '/financas/juros-compostos' },
        { name: 'INSS', icon: '📋', path: '/financas/inss' },
      ]
    },
    {
      title: 'Desenvolvimento',
      tools: [
        { name: 'UUID', icon: '🆔', path: '/desenvolvimento/uuid' },
        { name: 'Gerador CPF', icon: '🏷️', path: '/desenvolvimento/cpf' },
        { name: 'Hash', icon: '#️⃣', path: '/desenvolvimento/hash' },
      ]
    },
    {
      title: 'Texto',
      tools: [
        { name: 'Maiúscula/Minúscula', icon: '🔤', path: '/texto/maiuscula-minuscula' },
        { name: 'Removedor de Acentos', icon: 'ã', path: '/texto/removedor-acentos' },
        { name: 'Palavras e Caracteres', icon: '📝', path: '/texto/palavras-caracteres' },
      ]
    },
    {
      title: 'Utilitários',
      tools: [
        { name: 'IMC', icon: '⚖️', path: '/utilitarios/imc' },
        { name: 'Porcentagem', icon: '%', path: '/utilitarios/porcentagem' },
        { name: 'Idade', icon: '🎂', path: '/utilitarios/idade' },
        { name: 'Validador CPF', icon: '✅', path: '/utilitarios/cpf-validador' },
      ]
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>CalcZone BR</h1>
        <p className="subtitle">24+ Calculadoras e Ferramentas Online Grátis</p>
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
