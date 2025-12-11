import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function ConvertorComprimento() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('m');
    const [para, setPara] = useState('km');
    const [resultado, setResultado] = useState('');

    const em_metros = { 'm': 1, 'km': 1000, 'cm': 0.01, 'mm': 0.001, 'mi': 1609.34, 'pol': 0.0254 };

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
            const res = (val * em_metros[de]) / em_metros[para];
            setResultado(formatNumber(res, 2));
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>📏 Conversor de Comprimento</h1>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="valor">Valor</label>
                        <input 
                            type="number" 
                            id="valor" 
                            placeholder="100"
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
                            <option value="m">Metro (m)</option>
                            <option value="km">Quilômetro (km)</option>
                            <option value="cm">Centímetro (cm)</option>
                            <option value="mm">Milímetro (mm)</option>
                            <option value="mi">Milha (mi)</option>
                            <option value="pol">Polegada (pol)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para</label>
                        <select 
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="m">Metro (m)</option>
                            <option value="km">Quilômetro (km)</option>
                            <option value="cm">Centímetro (cm)</option>
                            <option value="mm">Milímetro (mm)</option>
                            <option value="mi">Milha (mi)</option>
                            <option value="pol">Polegada (pol)</option>
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
