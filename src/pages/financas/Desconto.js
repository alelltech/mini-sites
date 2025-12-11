import React, { useState, useEffect } from 'react';
import { formatCurrency, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function Desconto() {
    const [preco, setPreco] = useState('');
    const [desconto, setDesconto] = useState('');
    const [resultado, setResultado] = useState(null);

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🏷️ Calculadora de Desconto</h1>
                <p className="description">Calcule descontos percentuais e preço final de produtos.</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="preco">Preço Original (R$)</label>
                        <input
                            type="number"
                            id="preco"
                            placeholder="100"
                            min="0"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desconto">Desconto (%)</label>
                        <input
                            type="number"
                            id="desconto"
                            placeholder="10"
                            min="0"
                            max="100"
                            step="0.01"
                            value={desconto}
                            onChange={(e) => setDesconto(e.target.value)}
                        />
                    </div>
                </form>

                {resultado && (
                    <div className="result">
                        <h2>Resultado</h2>
                        <div className="result-content">
                            <div className="result-item">
                                <label>Preço Original</label>
                                <value>{formatCurrency(resultado.precoOriginal)}</value>
                            </div>
                            <div className="result-item">
                                <label>Valor do Desconto</label>
                                <value style={{ color: '#28a745' }}>-{formatCurrency(resultado.valorDesconto)}</value>
                            </div>
                            <div className="result-item">
                                <label>Preço Final</label>
                                <value>{formatCurrency(resultado.precoFinal)}</value>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '40px' }}>
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>💡 Sobre Descontos</h3>
                        <p style={{ margin: 0, color: '#666' }}>
                            O desconto reduz o preço original do produto. É comum em promoções, liquidações e programas de fidelidade.
                        </p>
                    </div>
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>📐 Fórmula Utilizada</h3>
                        <p style={{ margin: 0, color: '#666' }}>
                            <strong>Valor Desconto = Preço × (Desconto % / 100)</strong><br />
                            <strong>Preço Final = Preço - Valor Desconto</strong>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
