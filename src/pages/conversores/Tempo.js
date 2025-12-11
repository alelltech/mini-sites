import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function ConvertorTempo() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('s');
    const [para, setPara] = useState('m');
    const [resultado, setResultado] = useState('');

    const em_s = { 's': 1, 'm': 60, 'h': 3600, 'd': 86400 };

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
            const res = (val * em_s[de]) / em_s[para];
            setResultado(formatNumber(res, 2));
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>⏱️ Conversor de Tempo</h1>
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
                            <option value="s">Segundo (s)</option>
                            <option value="m">Minuto (m)</option>
                            <option value="h">Hora (h)</option>
                            <option value="d">Dia (d)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para</label>
                        <select 
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="s">Segundo (s)</option>
                            <option value="m">Minuto (m)</option>
                            <option value="h">Hora (h)</option>
                            <option value="d">Dia (d)</option>
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
