import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

export default function CalculadoraMargemLucro() {
    const [custo, setCusto] = useState('');
    const [preco, setPreco] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => calcular(), 100);
        return () => clearTimeout(timeOutId);
    }, [custo, preco]);

    function calcular() {
        const custoNum = parseFloat(custo);
        const precoNum = parseFloat(preco);

        if (!custoNum || !precoNum) {
            return;
        }

        if (precoNum < custoNum) {
            return;
        }

        const lucro = precoNum - custoNum;
        const margemLucro = (lucro / precoNum) * 100;
        const markup = ((precoNum / custoNum) - 1) * 100;

        setResultado({
            custo: custoNum.toFixed(2),
            preco: precoNum.toFixed(2),
            lucro: lucro.toFixed(2),
            margemLucro: margemLucro.toFixed(2),
            markup: markup.toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setCusto('');
        setPreco('');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Custo do Produto: R$ ${resultado.custo}\nPreço de Venda: R$ ${resultado.preco}\n\nLucro: R$ ${resultado.lucro}\nMargem de Lucro: ${resultado.margemLucro}%\nMarkup: ${resultado.markup}%`;
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
                        <i className="icon-graph" style={{ marginRight: '10px' }}></i>
                        Calculadora de Margem e Lucro
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule margem de lucro, markup e preço final para seu negócio</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="custo" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Custo do Produto (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="custo"
                            type="number"
                            placeholder="100"
                            min="0"
                            step="0.01"
                            value={custo}
                            onChange={(e) => setCusto(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="preco" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Preço de Venda (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="preco"
                            type="number"
                            placeholder="150"
                            min="0"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
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
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Custo do Produto</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.custo}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Preço de Venda</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.preco}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Lucro</td>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#28a745', textAlign: 'right' }}>R$ {resultado.lucro}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Margem de Lucro</td>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#667eea', textAlign: 'right' }}>{resultado.margemLucro}%</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Markup</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>{resultado.markup}%</td>
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
