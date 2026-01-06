import React, { useState, useEffect } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { formatCurrency, safeParseFloat } from '../../utils/globalFunctions.js';

export default function Desconto() {
    const [preco, setPreco] = useState('');
    const [desconto, setDesconto] = useState('');
    const [resultado, setResultado] = useState(null);

    // Ler parâmetros da URL
    useUrlParams({
        valorOriginal: setPreco,
        percentualDesconto: setDesconto
    });

    useEffect(() => {
        calcular();
    }, [preco, desconto]);

    function calcular() {
        const precoVal = safeParseFloat(preco);
        const descontoVal = safeParseFloat(desconto);

        if (precoVal === 0) {
            setResultado(null);
            return;
        }

        if (descontoVal > 100) {
            setResultado(null);
            return;
        }

        const valorDesconto = precoVal * (descontoVal / 100);
        const precoFinal = precoVal - valorDesconto;

        setResultado({
            precoOriginal: precoVal,
            valorDesconto,
            precoFinal
        });
    }

    return (
        <div style={{ 
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#333'
                    }}>
                        <i className="icon-tag" style={{ marginRight: '10px' }}></i>
                        Calculadora de Desconto
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule descontos percentuais e preço final de produtos</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="preco" className="p-form-label" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Preço Original (R$):
                        </label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="preco"
                            placeholder="100"
                            min="0"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.9)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="desconto" className="p-form-label" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Desconto (%):
                        </label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="desconto"
                            placeholder="10"
                            min="0"
                            max="100"
                            step="0.01"
                            value={desconto}
                            onChange={(e) => setDesconto(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.9)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                </form>

                {resultado && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        marginBottom: '20px'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Preço Original
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        color: '#333'
                                    }}>
                                        {formatCurrency(resultado.precoOriginal)}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(40, 167, 69, 0.1)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Valor do Desconto
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(40, 167, 69, 0.1)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        color: '#28a745',
                                        fontWeight: 'bold'
                                    }}>
                                        -{formatCurrency(resultado.valorDesconto)}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        borderRadius: '8px 0 0 8px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        Preço Final
                                    </td>
                                    <td style={{ 
                                        padding: '12px 16px',
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        borderRadius: '0 8px 8px 0',
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        color: '#667eea'
                                    }}>
                                        {formatCurrency(resultado.precoFinal)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="p-card p-shadow-1" style={{ 
                    background: 'rgba(255,255,255,0.5)', 
                    borderRadius: '15px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    marginBottom: '15px'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>💡 Sobre Descontos</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                        O desconto reduz o preço original do produto. É comum em promoções, liquidações e programas de fidelidade.
                    </p>
                </div>
                <div className="p-card p-shadow-1" style={{ 
                    background: 'rgba(255,255,255,0.5)', 
                    borderRadius: '15px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>📐 Fórmula Utilizada</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                        <strong>Valor Desconto = Preço × (Desconto % / 100)</strong><br />
                        <strong>Preço Final = Preço - Valor Desconto</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
