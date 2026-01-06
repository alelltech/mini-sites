import React, { useState, useEffect } from 'react';
import { formatNumber, safeParseFloat } from '../../utils/globalFunctions.js';

export default function ConvertorArea() {
    const [valor, setValor] = useState('');
    const [de, setDe] = useState('m2');
    const [para, setPara] = useState('ha');
    const [resultado, setResultado] = useState('');

    const em_m2 = { 'm2': 1, 'km2': 1000000, 'cm2': 0.0001, 'acre': 4046.86, 'ha': 10000 };

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
            const res = (val * em_m2[de]) / em_m2[para];
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
                        <i className="icon-grid" style={{ marginRight: '10px' }}></i>
                        Conversor de Área
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Converta entre diferentes unidades de área</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="valor" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Valor:</label>
                        <input 
                            className="p-input p-form-text"
                            type="number" 
                            id="valor" 
                            placeholder="1"
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
                            <option value="m2">m²</option>
                            <option value="km2">km²</option>
                            <option value="cm2">cm²</option>
                            <option value="acre">acre</option>
                            <option value="ha">hectare</option>
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
                            <option value="m2">m²</option>
                            <option value="km2">km²</option>
                            <option value="acre">acre</option>
                            <option value="ha">hectare</option>
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
