import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

function calcularPrestacao(valor, taxaAnual, anos) {
    const taxa = (taxaAnual / 100) / 12;
    const meses = anos * 12;
    const numerador = valor * taxa * Math.pow(1 + taxa, meses);
    const denominador = Math.pow(1 + taxa, meses) - 1;
    return numerador / denominador;
}

export default function CalculadoraHipoteca() {
    const [valor, setValor] = useState('');
    const [taxa, setTaxa] = useState('');
    const [anos, setAnos] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => calcular(), 100);
        return () => clearTimeout(timeOutId);
    }, [valor, taxa, anos]);

    function calcular() {
        const valorNum = parseFloat(valor);
        const taxaNum = parseFloat(taxa);
        const anosNum = parseInt(anos);

        if (!valorNum || !taxaNum || !anosNum) {
            return;
        }

        const prestacao = calcularPrestacao(valorNum, taxaNum, anosNum);
        const totalMeses = anosNum * 12;
        const totalPago = prestacao * totalMeses;
        const totalJuros = totalPago - valorNum;

        setResultado({
            prestacao: prestacao.toFixed(2),
            totalMeses: totalMeses,
            totalPago: totalPago.toFixed(2),
            totalJuros: totalJuros.toFixed(2),
            valor: valorNum.toFixed(2),
            taxa: taxaNum.toFixed(2),
            anos: anosNum
        });
        setShowResult(true);
    }

    function limpar() {
        setValor('');
        setTaxa('');
        setAnos('');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Valor do Imóvel: R$ ${resultado.valor}\nTaxa de Juros: ${resultado.taxa}% ao ano\nPrazo: ${resultado.anos} anos\n\nPrestação Mensal: R$ ${resultado.prestacao}\nTotal Meses: ${resultado.totalMeses}\nTotal a Pagar: R$ ${resultado.totalPago}\nTotal de Juros: R$ ${resultado.totalJuros}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                        <i className="icon-home" style={{ marginRight: '10px' }}></i>
                        Calculadora de Hipoteca
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Simule pagamentos de hipoteca e financiamento imobiliário</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="valor" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Valor do Imóvel (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="valor"
                            type="number"
                            placeholder="300000"
                            min="0"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="taxa" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Taxa de Juros (% ao ano):</label>
                        <input
                            className="p-input p-form-text"
                            id="taxa"
                            type="number"
                            placeholder="5.5"
                            min="0"
                            step="0.01"
                            value={taxa}
                            onChange={(e) => setTaxa(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="anos" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Prazo (anos):</label>
                        <input
                            className="p-input p-form-text"
                            id="anos"
                            type="number"
                            placeholder="30"
                            min="1"
                            step="1"
                            value={anos}
                            onChange={(e) => setAnos(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                </form>

                {showResult && resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Resultado</h3>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Prestação Mensal</td>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#667eea', textAlign: 'right' }}>R$ {resultado.prestacao}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Total de Meses</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{resultado.totalMeses}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Total a Pagar</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.totalPago}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Total de Juros</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#dc3545', textAlign: 'right' }}>R$ {resultado.totalJuros}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={copyResult}
                            className="p-btn"
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '15px',
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Copiar Resultado
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
