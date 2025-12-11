import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function ConvertorVolume() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('l');
    const [para, setPara] = useState('ml');
    const [resultado, setResultado] = useState('');

    const em_l = { 'l': 1, 'ml': 0.001, 'gal': 3.78541, 'pt': 0.473176 };

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
            const res = (val * em_l[de]) / em_l[para];
            setResultado(formatNumber(res, 2));
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🧃 Conversor de Volume</h1>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="valor">Valor</label>
                        <input 
                            type="number" 
                            id="valor" 
                            placeholder="1"
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
                            <option value="l">Litro (L)</option>
                            <option value="ml">Mililitro (mL)</option>
                            <option value="gal">Galão (gal)</option>
                            <option value="pt">Pinta (pt)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para</label>
                        <select 
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="l">Litro (L)</option>
                            <option value="ml">Mililitro (mL)</option>
                            <option value="gal">Galão (gal)</option>
                        </select>
                    </div>
                </form>
                {resultado && (
                    <div className="result">
                        <div className="result-item">
                            <label>{de} → {para}</label>
                            <value>{resultado}</value>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
