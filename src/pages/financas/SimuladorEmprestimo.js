import React, { useState, useEffect } from 'react';
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
    const [taxas, setTaxas] = useState([]);
    const [resultado, setResultado] = useState(null);

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
            const items = [
                ...data['PF-TaxasDiarias'].map(item => ({ ...item, pessoa: 'PF' })),
                ...data['PF-TaxasMensais'].map(item => ({ ...item, pessoa: 'PF' })),
                ...data['PJ-TaxasDiarias'].map(item => ({ ...item, pessoa: 'PJ' })),
            ].filter(item => 
                item.taxas_medias_a_m && item.taxas_medias_a_a && item.instituicao_financeira
            );

            items.sort((a, b) => {
                return parseFloat(a.taxas_medias_a_m) - parseFloat(b.taxas_medias_a_m);
            });

            setTaxas(items);
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
                                {taxas.map((item, idx) => (
                                    <option key={idx} value={item.taxas_medias_a_m.toFixed(2)}>
                                        {item.pessoa} {item.taxas_medias_a_m.toFixed(2)}%am {item.taxas_medias_a_a.toFixed(2)}%aa - {item.instituicao_financeira}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <input
                            id="taxa"
                            type="number"
                            placeholder="1.5"
                            min="0"
                            step="0.01"
                            value={taxa}
                            onChange={(e) => setTaxa(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        /> */}
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                        <h3>💡 Sobre Empréstimos</h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>Os empréstimos são financiamentos que cobram juros sobre o valor emprestado. Esta calculadora mostra o valor da parcela e total a pagar.</p>
                    </div>
                    <div>
                        <h3>📐 Fórmula Utilizada</h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>Usa a tabela Price para cálculo das prestações, o sistema de amortização mais comum em financiamentos.</p>
                    </div>
                    <div>
                        <h3>🔒 Privacidade</h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>Todos os cálculos são feitos no seu navegador. Nenhum dado é enviado para servidores.</p>
                    </div>
                </div>
            </section>
        </section>
    );
}
