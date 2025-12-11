import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function ConvertorTemperatura() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('C');
    const [para, setPara] = useState('F');
    const [resultado, setResultado] = useState('');

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
            let celsius = de === 'C' ? val : de === 'F' ? (val - 32) * 5/9 : val - 273.15;
            let res = para === 'C' ? celsius : para === 'F' ? celsius * 9/5 + 32 : celsius + 273.15;
            setResultado(`${formatNumber(res, 2)}°`);
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🌡️ Conversor de Temperatura</h1>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="valor">Valor</label>
                        <input 
                            type="number" 
                            id="valor" 
                            placeholder="20" 
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
                            <option value="C">Celsius (°C)</option>
                            <option value="F">Fahrenheit (°F)</option>
                            <option value="K">Kelvin (K)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para</label>
                        <select 
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="F">Fahrenheit (°F)</option>
                            <option value="C">Celsius (°C)</option>
                            <option value="K">Kelvin (K)</option>
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
