import React, { useState, useEffect } from 'react';

export default function MaiusculaMinuscula() {
    const [texto, setTexto] = useState('');
    const [tipo, setTipo] = useState('upper');
    const [resultado, setResultado] = useState('');

    useEffect(() => {
        converter();
    }, [texto, tipo]);

    function converter() {
        if (texto.trim() === '') {
            setResultado('');
            return;
        }

        let res = '';
        if (tipo === 'upper') {
            res = texto.toUpperCase();
        } else if (tipo === 'lower') {
            res = texto.toLowerCase();
        } else {
            // Capitalize (primeira letra de cada palavra)
            res = texto.split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
        }
        setResultado(res);
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-text"></i> Conversor de Maiúscula/Minúscula
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Converta seu texto entre MAIÚSCULAS, minúsculas ou Primeira Letra</p>
                
                <div className="p-form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="texto" className="p-form-label">Digite seu texto:</label>
                    <textarea
                        id="texto"
                        placeholder="Digite seu texto..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        className="p-form-text"
                        style={{ width: '100%', minHeight: '120px', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                </div>

                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="tipo" className="p-form-label">Converter para:</label>
                    <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="p-form-select"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'rgba(255,255,255,0.9)',
                            fontFamily: 'inherit',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="upper">MAIÚSCULA</option>
                        <option value="lower">minúscula</option>
                        <option value="capitalize">Primeira Letra</option>
                    </select>
                </div>

                {resultado && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: 0 }}>Resultado:</h3>
                        <textarea
                            readOnly
                            value={resultado}
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.3)',
                                fontFamily: 'monospace',
                                fontSize: '14px',
                                resize: 'vertical'
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
