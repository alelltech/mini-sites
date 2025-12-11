import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function ConvertorPressao() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('pa');
    const [para, setPara] = useState('bar');
    const [resultado, setResultado] = useState('');

    const em_pa = { 'pa': 1, 'bar': 100000, 'psi': 6894.76, 'atm': 101325 };

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
            const res = (val * em_pa[de]) / em_pa[para];
            setResultado(formatNumber(res, 2));
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🌪️ Conversor de Pressão</h1>
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
                            <option value="pa">Pascal (Pa)</option>
                            <option value="bar">Bar</option>
                            <option value="psi">PSI</option>
                            <option value="atm">Atm</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para</label>
                        <select 
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="pa">Pascal (Pa)</option>
                            <option value="bar">Bar</option>
                            <option value="psi">PSI</option>
                            <option value="atm">Atm</option>
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
