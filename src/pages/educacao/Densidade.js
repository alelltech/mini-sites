import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-flask"></i> Conversor de Densidade
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Converta entre diferentes unidades de densidade</p>
                
                <form style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
                    <div className="p-form-group">
                        <label htmlFor="valor" className="p-form-label">Valor:</label>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            id="valor"
                            placeholder="Digite o valor..."
                            step="0.0001"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        />
                    </div>
                    <div className="p-form-group">
                        <label htmlFor="de" className="p-form-label">De:</label>
                        <select
                            className="p-select p-form-select"
                            id="de"
                            value={de}
                            onChange={(e) => setDe(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        >
                            <option value="kg_m3">kg/m³</option>
                            <option value="g_cm3">g/cm³</option>
                            <option value="lb_ft3">lb/ft³</option>
                            <option value="g_ml">g/mL</option>
                        </select>
                    </div>
                    <div className="p-form-group">
                        <label htmlFor="para" className="p-form-label">Para:</label>
                        <select
                            className="p-select p-form-select"
                            id="para"
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        >
                            <option value="kg_m3">kg/m³</option>
                            <option value="g_cm3">g/cm³</option>
                            <option value="lb_ft3">lb/ft³</option>
                            <option value="g_ml">g/mL</option>
                        </select>
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={limpar}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {resultado && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontWeight: '700' }}>Origem</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>{resultado.origem}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: '700' }}>Resultado</td>
                                    <td style={{ padding: '12px', fontWeight: '700', color: '#667eea' }}>{resultado.resultado}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
