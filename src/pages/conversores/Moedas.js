import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function ConvertorMoedas() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('BRL');
    const [para, setPara] = useState('USD');
    const [resultado, setResultado] = useState('');

    const taxas = { 'BRL': 1, 'USD': 5.0, 'EUR': 5.5, 'GBP': 6.3 };

    useEffect(() => {
        converter();
    }, [valor, de, para]);

    function converter() {
        const val = safeParseFloat(valor);
        
        if (val === 0) {
            setResultado('');
            return;
        }

        try {
            const res = (val * taxas[de]) / taxas[para];
            setResultado(formatNumber(res, 2));
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>💱 Conversor de Moedas</h1>
                <p className="description">Converta entre diferentes moedas com cotação atualizada.</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="valor">Valor</label>
                        <input 
                            type="number" 
                            id="valor" 
                            placeholder="100" 
                            min="0" 
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="de">De</label>
                        <select 
                            id="de" 
                            value={de}
                            onChange={(e) => setDe(e.target.value)}
                        >
                            <option value="BRL">Real (R$)</option>
                            <option value="USD">Dólar (US$)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">Libra (£)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para</label>
                        <select 
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="USD">Dólar (US$)</option>
                            <option value="BRL">Real (R$)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">Libra (£)</option>
                        </select>
                    </div>
                </form>
                {resultado && (
                    <div className="result">
                        <h2>Resultado</h2>
                        <div className="result-content">
                            <div className="result-item">
                                <label>{de} → {para}</label>
                                <value>{resultado}</value>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
