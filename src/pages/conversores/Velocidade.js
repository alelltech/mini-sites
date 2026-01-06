import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';

export default function ConvertorVelocidade() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('kmh');
    const [para, setPara] = useState('ms');
    const [resultado, setResultado] = useState('');

    const em_kmh = { 'kmh': 1, 'ms': 3.6, 'mph': 1.60934, 'nos': 1.852 };

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
            const res = (val * em_kmh[de]) / em_kmh[para];
            setResultado(formatNumber(res, 2));
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                        <i className="icon-speedometer" style={{ marginRight: '10px' }}></i>
                        Conversor de Velocidade
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Converta entre diferentes unidades de velocidade</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="valor" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Valor:</label>
                        <input 
                            className="p-input p-form-text"
                            type="number" 
                            id="valor" 
                            placeholder="100"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="de" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>De:</label>
                        <select 
                            className="p-select p-form-select"
                            id="de" 
                            value={de}
                            onChange={(e) => setDe(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        >
                            <option value="kmh">km/h</option>
                            <option value="ms">m/s</option>
                            <option value="mph">mph</option>
                            <option value="nos">nós</option>
                        </select>
                    </div>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="para" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Para:</label>
                        <select 
                            className="p-select p-form-select"
                            id="para" 
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        >
                            <option value="kmh">km/h</option>
                            <option value="ms">m/s</option>
                            <option value="mph">mph</option>
                        </select>
                    </div>
                </form>
                {resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{de} → {para}</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' }}>{resultado}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
