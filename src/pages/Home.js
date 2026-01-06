import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const categoryColors = {
    'utilitarios': '#E67E22',      // Orange (darker for better contrast)
    'conversores': '#2980B9',      // Blue (darker)
    'educacao': '#27AE60',         // Green (darker)
    'financas': '#C0392B',         // Red (darker)
    'desenvolvimento': '#8E44AD',  // Purple (darker)
    'texto': '#16A085'             // Teal (darker)
  };

  const categories = [
    {
      id: 'utilitarios',
      name: 'Utilitários',
      icon: 'icon-wrench',
      tools: [
        { name: 'Comparador de Carros', icon: 'icon-speedometer', path: '/utilitarios/comparador-carros' },
        { name: 'IMC', icon: 'icon-user', path: '/utilitarios/imc' },
        { name: 'Avaliação Corporal', icon: 'icon-chart', path: '/utilitarios/avaliacao-corporal' },
        { name: 'Porcentagem', icon: 'icon-calculator', path: '/utilitarios/porcentagem' },
        { name: 'Idade', icon: 'icon-calendar', path: '/utilitarios/idade' },
        { name: 'Validador CPF', icon: 'icon-badge', path: '/utilitarios/cpf-validador' },
        { name: 'Calorias', icon: 'icon-fire', path: '/utilitarios/calorias' },
        { name: 'Validador CNPJ', icon: 'icon-briefcase', path: '/utilitarios/cnpj-validador' },
        { name: 'Dias Restantes', icon: 'icon-hourglass', path: '/utilitarios/dias-restantes' },
        { name: 'Energia', icon: 'icon-energy', path: '/utilitarios/energia' },
        { name: 'Número Aleatório', icon: 'icon-shuffle', path: '/utilitarios/numero-aleatorio' },
        { name: 'Gerador de Senha', icon: 'icon-lock', path: '/utilitarios/senha' },
      ]
    },
    {
      id: 'conversores',
      name: 'Conversores',
      icon: 'icon-refresh',
      tools: [
        { name: 'Moedas', icon: 'icon-wallet', path: '/conversores/moedas' },
        { name: 'Temperatura', icon: 'icon-fire', path: '/conversores/temperatura' },
        { name: 'Comprimento', icon: 'icon-size-fullscreen', path: '/conversores/comprimento' },
        { name: 'Peso', icon: 'icon-chart', path: '/conversores/peso' },
        { name: 'Área', icon: 'icon-grid', path: '/conversores/area' },
        { name: 'Velocidade', icon: 'icon-speedometer', path: '/conversores/velocidade' },
        { name: 'Volume', icon: 'icon-chemistry', path: '/conversores/volume' },
        { name: 'Pressão', icon: 'icon-direction', path: '/conversores/pressao' },
        { name: 'Tempo', icon: 'icon-clock', path: '/conversores/tempo' },
      ]
    },
    {
      id: 'educacao',
      name: 'Educação',
      icon: 'icon-graduation',
      tools: [
        { name: 'Nota Final', icon: 'icon-notebook', path: '/educacao/nota-final' },
        { name: 'Densidade', icon: 'icon-chemistry', path: '/educacao/densidade' },
        { name: 'Calculadora Científica', icon: 'icon-calculator', path: '/educacao/cientifica' },
        { name: 'Cronograma de Estudos', icon: 'icon-calendar', path: '/educacao/cronograma-estudos' },
        { name: 'Notação Científica', icon: 'icon-bulb', path: '/educacao/notacao-cientifica' },
      ]
    },
    {
      id: 'financas',
      name: 'Finanças',
      icon: 'icon-wallet',
      tools: [
        { name: 'Desconto', icon: 'icon-tag', path: '/financas/desconto' },
        { name: 'Juros Compostos', icon: 'icon-graph', path: '/financas/juros-compostos' },
        { name: 'INSS', icon: 'icon-doc', path: '/financas/inss' },
        { name: 'Empréstimo', icon: 'icon-credit-card', path: '/financas/emprestimo' },
        { name: 'FGTS', icon: 'icon-briefcase', path: '/financas/fgts' },
        { name: 'Hipoteca', icon: 'icon-home', path: '/financas/hipoteca' },
        { name: 'Horas Extras', icon: 'icon-clock', path: '/financas/horas-extras' },
        { name: 'Impostos', icon: 'icon-wallet', path: '/financas/impostos' },
        { name: 'Margem de Lucro', icon: 'icon-pie-chart', path: '/financas/margem-lucro' },
      ]
    },
    {
      id: 'desenvolvimento',
      name: 'Desenvolvimento',
      icon: 'icon-screen-desktop',
      tools: [
        { name: 'UUID', icon: 'icon-key', path: '/desenvolvimento/uuid' },
        { name: 'Gerador CPF', icon: 'icon-user', path: '/desenvolvimento/cpf' },
        { name: 'Hash', icon: 'icon-lock', path: '/desenvolvimento/hash' },
        { name: 'Base64', icon: 'icon-shield', path: '/desenvolvimento/base64' },
        { name: 'Base Numérica', icon: 'icon-calculator', path: '/desenvolvimento/base-numerica' },
        { name: 'Gerador CNPJ', icon: 'icon-briefcase', path: '/desenvolvimento/cnpj' },
        { name: 'Hex ↔ Decimal', icon: 'icon-refresh', path: '/desenvolvimento/hex-decimal' },
        { name: 'Hex ↔ RGB', icon: 'icon-eyeglass', path: '/desenvolvimento/hex-rgb' },
        { name: 'Formatador JSON', icon: 'icon-docs', path: '/desenvolvimento/json' },
        { name: 'MD5', icon: 'icon-lock', path: '/desenvolvimento/md5' },
        { name: 'Paleta de Cores', icon: 'icon-drop', path: '/desenvolvimento/paleta-cores' },
        { name: 'SHA256', icon: 'icon-shield', path: '/desenvolvimento/sha256' },
        { name: 'URL Encoder', icon: 'icon-link', path: '/desenvolvimento/url-encoder' },
      ]
    },
    {
      id: 'texto',
      name: 'Texto',
      icon: 'icon-note',
      tools: [
        { name: 'Maiúscula/Minúscula', icon: 'icon-pencil', path: '/texto/maiuscula-minuscula' },
        { name: 'Removedor de Acentos', icon: 'icon-eraser', path: '/texto/removedor-acentos' },
        { name: 'Palavras e Caracteres', icon: 'icon-doc', path: '/texto/palavras-caracteres' },
      ]
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '700', margin: '0 0 8px 0' }}>CalcZone BR</h1>
        <p style={{ fontSize: '18px', color: 'var(--tertiary-label)', margin: '0' }}>50+ Ferramentas Organizadas</p>
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {categories.map((category) => (
          <div key={category.id} className="p-shadow-2" style={{
            backgroundColor: categoryColors[category.id],
            borderRadius: '28px',
            padding: '24px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: `linear-gradient(145deg, ${categoryColors[category.id]}f0 0%, ${categoryColors[category.id]}e0 100%)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.classList.remove('p-shadow-2');
            e.currentTarget.classList.add('p-shadow-4');
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove('p-shadow-4');
            e.currentTarget.classList.add('p-shadow-2');
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '12px', borderBottom: `2px solid rgba(255,255,255,0.3)` }}>
              <i className={category.icon} style={{ fontSize: '28px', color: 'white' }}></i>
              <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: 'white' }}>{category.name}</h2>
            </div>

            {/* Tools Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))', gap: '16px' }}>
              {category.tools.map((tool, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <Link
                    to={tool.path}
                    className="p-shadow-1"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '22px',
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      border: 'none',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.remove('p-shadow-1');
                      e.currentTarget.classList.add('p-shadow-3');
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove('p-shadow-3');
                      e.currentTarget.classList.add('p-shadow-1');
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                    }}
                  >
                    <i className={tool.icon} style={{ fontSize: '36px', color: 'white' }}></i>
                  </Link>
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: '500', 
                    textAlign: 'center', 
                    lineHeight: '1.2', 
                    color: 'white', 
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    maxWidth: '85px'
                  }}>
                    {tool.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
