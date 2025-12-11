import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function Densidade() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('kg_m3');
    const [para, setPara] = useState('g_cm3');
    const [resultado, setResultado] = useState(null);

    const conversoes = {
        'kg_m3_g_cm3': 0.001,
        'kg_m3_lb_ft3': 0.062428,
        'kg_m3_g_ml': 0.001,
        'g_cm3_kg_m3': 1000,
        'g_cm3_lb_ft3': 62.428,
        'g_cm3_g_ml': 1,
        'lb_ft3_kg_m3': 16.01846,
        'lb_ft3_g_cm3': 0.01601846,
        'lb_ft3_g_ml': 0.01601846,
        'g_ml_kg_m3': 1000,
        'g_ml_g_cm3': 1,
        'g_ml_lb_ft3': 62.428
    };

    useEffect(() => {
        converter();
    }, [valor, de, para]);

    function converter() {
        const val = safeParseFloat(valor);

        if (val === 0) {
            setResultado(null);
            return;
        }

        try {
            const chave = `${de}_${para}`;
            const fator = conversoes[chave] || 1;
            const res = val * fator;
            setResultado({
                origem: `${val} ${de}`,
                resultado: formatNumber(res, 4) + ` ${para}`
            });
        } catch (e) {
            setResultado(null);
        }
    }

    function limpar() {
        setValor('');
        setResultado(null);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>⚗️ Conversor de Densidade</h1>
                <p className="description">Converta entre diferentes unidades de densidade</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="valor">Valor:</label>
                        <input
                            type="number"
                            id="valor"
                            placeholder="Digite o valor..."
                            step="0.0001"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="de">De:</label>
                        <select
                            id="de"
                            value={de}
                            onChange={(e) => setDe(e.target.value)}
                        >
                            <option value="kg_m3">kg/m³</option>
                            <option value="g_cm3">g/cm³</option>
                            <option value="lb_ft3">lb/ft³</option>
                            <option value="g_ml">g/mL</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="para">Para:</label>
                        <select
                            id="para"
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        >
                            <option value="kg_m3">kg/m³</option>
                            <option value="g_cm3">g/cm³</option>
                            <option value="lb_ft3">lb/ft³</option>
                            <option value="g_ml">g/mL</option>
                        </select>
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                        onClick={limpar}
                        style={{
                            padding: '10px 20px',
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {resultado && (
                    <div className="result">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Origem</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        {resultado.origem}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        <strong>Resultado</strong>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#667eea' }}>
                                        {resultado.resultado}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
