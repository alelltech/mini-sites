import React, { useState, useEffect } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { copyToClipboard, formatCurrency } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

function calcularPrestacao(valor, taxa, meses) {
  const i = taxa / 100;
  const numerador = valor * i * Math.pow(1 + i, meses);
  const denominador = Math.pow(1 + i, meses) - 1;
  return numerador / denominador;
}

export default function SimuladorEmprestimo() {
  const [valor, setValor] = useState('');
  const [taxa, setTaxa] = useState('');
  const [meses, setMeses] = useState('');
  const [taxas, setTaxas] = useState({});
  const [resultado, setResultado] = useState(null);
  
  // Ler parâmetros da URL para financiamento
  useUrlParams({
    valorTotal: (valorTotal) => {
      const searchParams = new URLSearchParams(window.location.search);
      const entrada = parseFloat(searchParams.get('entrada')) || 0;
      const valorFinanciar = parseFloat(valorTotal) - entrada;
      if (valorFinanciar > 0) {
        setValor(valorFinanciar.toString());
      }
    },
    numeroParcelas: setMeses,
    taxaJuros: setTaxa
  });

  // Carrega as taxas de crédito ao montar o componente
  useEffect(() => {
    carregarTaxas();
  }, []);
  
  // Calcula em tempo real sempre que algum campo muda
  useEffect(() => {
    calcularEmTempoReal();
  }, [valor, taxa, meses]);
  
  async function carregarTaxas() {
    try {
      const response = await fetch('/data/taxascredito.json');
      const data = await response.json();
      
      // Filtra apenas itens válidos e agrupa por modalidade
      const items = data.filter(item => {
        return item.TaxaJurosAoMes && 
               item.InstituicaoFinanceira && 
               item.InstituicaoFinanceira.trim() &&
               typeof item.TaxaJurosAoMes === 'number' &&
               typeof item.TaxaJurosAoAno === 'number';
      });
      
      // Agrupa por modalidade
      const agrupadoPorModalidade = {};
      items.forEach(item => {
        const chaveModalidade = item.Modalidade || 'Outros';
        if (!agrupadoPorModalidade[chaveModalidade]) {
          agrupadoPorModalidade[chaveModalidade] = [];
        }
        agrupadoPorModalidade[chaveModalidade].push(item);
      });
      
      // Ordena cada grupo por taxa
      Object.keys(agrupadoPorModalidade).forEach(modalidade => {
        agrupadoPorModalidade[modalidade].sort((a, b) => 
          a.TaxaJurosAoMes - b.TaxaJurosAoMes
        );
      });
      
      // Ordena as modalidades pela taxa mais barata (primeira instituição)
      const modalidadesOrdenadas = {};
      Object.keys(agrupadoPorModalidade)
        .sort((a, b) => {
          const taxaMaisBarataA = agrupadoPorModalidade[a][0].TaxaJurosAoMes;
          const taxaMaisBarataB = agrupadoPorModalidade[b][0].TaxaJurosAoMes;
          return taxaMaisBarataA - taxaMaisBarataB;
        })
        .forEach(modalidade => {
          modalidadesOrdenadas[modalidade] = agrupadoPorModalidade[modalidade];
        });
      
      setTaxas(modalidadesOrdenadas);
    } catch (e) {
      console.error('Erro ao carregar taxas:', e);
    }
  }
  
  function calcularEmTempoReal() {
    const valorNum = parseFloat(valor) || 0;
    const taxaNum = parseFloat(taxa) || 0;
    const mesesNum = parseInt(meses) || 0;
    
    // Se algum campo está vazio, esconde resultado
    if (valorNum === 0 || taxaNum === 0 || mesesNum === 0) {
      setResultado(null);
      return;
    }
    
    try {
      const prestacao = calcularPrestacao(valorNum, taxaNum, mesesNum);
      const totalPagar = prestacao * mesesNum;
      const totalJuros = totalPagar - valorNum;
      
      setResultado({
        prestacao: prestacao.toFixed(2),
        totalPago: totalPagar.toFixed(2),
        totalJuros: totalJuros.toFixed(2),
        valor: valorNum.toFixed(2),
        taxa: taxaNum.toFixed(2),
        meses: mesesNum
      });
    } catch (e) {
      setResultado(null);
    }
  }
  
  function selecionarTaxa(taxaValue) {
    setTaxa(taxaValue.toString());
  }
  
  function limpar() {
    setValor('');
    setTaxa('');
    setMeses('');
    setResultado(null);
  }
  
  function copyResult() {
    const text = `Valor do Empréstimo: R$ ${resultado.valor}\nTaxa de Juros: ${resultado.taxa}% ao mês\nPrazo: ${resultado.meses} meses\n\nPrestação Mensal: R$ ${resultado.prestacao}\nTotal a Pagar: R$ ${resultado.totalPago}\nTotal de Juros: R$ ${resultado.totalJuros}`;
    copyToClipboard(text).then(() => {
      alert('Copiado!');
    });
  }
  
  return (
    <section className="tool-section">
    <div className="tool-header">
    <h1>🏧 Simulador de Empréstimo</h1>
    <p className="description">Simule pagamentos de empréstimo com diferentes taxas e prazos</p>
    </div>
    <div className="tool-container">
    <div style={{ maxWidth: '600px' }}>
    <div className="form-group">
    <label htmlFor="valor">Valor do Empréstimo (R$)</label>
    <input
    id="valor"
    type="number"
    placeholder="10000"
    min="0"
    step="0.01"
    value={valor}
    onChange={(e) => setValor(e.target.value)}
    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
    />
    </div>
    
    <div className="form-group">
    <label htmlFor="taxa">Taxa de Juros (% ao mês)</label>
    <div style={{ marginBottom: '10px' }}>
    <select
    id="taxaSelect"
    onChange={(e) => {
      if (e.target.value) {
        selecionarTaxa(e.target.value);
      }
    }}
    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px' }}
    >
    <option value="">Selecionar taxa de instituição...</option>
    {Object.keys(taxas).map(modalidade => (
      <optgroup key={modalidade} label={modalidade}>
        {taxas[modalidade].map((item, idx) => {
          const emoji = item.Segmento === 'Pessoa Física' ? '👤' : '🏢';
          return (
            <option key={`${modalidade}-${idx}`} value={item.TaxaJurosAoMes.toFixed(2)}>
              {emoji} {item.TaxaJurosAoMes.toFixed(2)}%am ({item.TaxaJurosAoAno.toFixed(2)}%aa) - {item.InstituicaoFinanceira}
            </option>
          );
        })}
      </optgroup>
    ))}
    </select>
    </div>
    </div>
      
      <div className="form-group">
      <label htmlFor="meses">Prazo (meses)</label>
      <input
      id="meses"
      type="number"
      placeholder="12"
      min="1"
      step="1"
      value={meses}
      onChange={(e) => setMeses(e.target.value)}
      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
      />
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
      <button
      onClick={limpar}
      style={{
        padding: '10px 20px',
        background: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      >
      Limpar
      </button>
      </div>
      
      {resultado && (
        <div className="result">
        <h3>Resultado</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Valor Emprestado</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
        R$ {resultado.valor}
        </div>
        </div>
        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Prestação Mensal</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
        R$ {resultado.prestacao}
        </div>
        </div>
        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Total de Juros</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#dc3545' }}>
        R$ {resultado.totalJuros}
        </div>
        </div>
        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Total a Pagar</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
        R$ {resultado.totalPago}
        </div>
        </div>
        </div>
        <button
        onClick={copyResult}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '15px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        >
        📋 Copiar Resultado
        </button>
        </div>
      )}
      </div>
      </div>
      
      <section className="info-section" style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <h2 style={{ marginTop: '0', marginBottom: '20px' }}>📋 O que é PF e PJ?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      <div style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '2px solid #007bff' }}>
      <h3 style={{ color: '#007bff', marginTop: '0' }}>👤 Pessoa Física (PF)</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Indivíduos ou consumidores que tomam crédito para uso pessoal.</p>
      <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
      <p><strong>Características:</strong></p>
      <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
      <li>Taxas geralmente mais baixas</li>
      <li>Menor risco para instituições financeiras</li>
      <li>Requer comprovação de renda pessoal</li>
      <li>Processo de aprovação mais ágil</li>
      </ul>
      <p><strong>Exemplos:</strong> Empréstimos pessoais, financiamentos de carros para uso próprio, crédito pessoal direto.</p>
      </div>
      </div>
      <div style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '2px solid #28a745' }}>
      <h3 style={{ color: '#28a745', marginTop: '0' }}>🏢 Pessoa Jurídica (PJ)</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Empresas e sociedades que tomam crédito para financiar operações comerciais.</p>
      <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
      <p><strong>Características:</strong></p>
      <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
      <li>Taxas geralmente mais altas</li>
      <li>Maior risco percebido pelas instituições</li>
      <li>Requer documentação empresarial completa</li>
      <li>Análise mais rigorosa do risco</li>
      </ul>
      <p><strong>Exemplos:</strong> Crédito para negócios, capital de giro, financiamento de máquinas e equipamentos, empréstimos comerciais.</p>
      </div>
      </div>
      </div>
      </section>
      </section>
    );
  }
  