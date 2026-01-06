import React, { useState } from 'react';

export default function ValidadorCNPJ() {
    const [cnpj, setCNPJ] = useState('');
    const [resultado, setResultado] = useState(null);
    const [isValid, setIsValid] = useState(null);
    const [showResult, setShowResult] = useState(false);

    function validar() {
        const cnpjLimpo = cnpj.replace(/\D/g, '');

        if (cnpjLimpo.length !== 14) {
            setResultado('CNPJ inválido (deve ter 14 dígitos)');
            setIsValid(false);
            setShowResult(true);
            return;
        }

        if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
            setResultado('CNPJ inválido (sequência repetida)');
            setIsValid(false);
            setShowResult(true);
            return;
        }

        let d1 = cnpjLimpo.substring(0, 12).split('').reduce((acc, val, i) =>
            acc + (parseInt(val) * ((i % 8) + 2)), 0) % 11;
        d1 = d1 % 10;

        let d2 = (cnpjLimpo.substring(0, 12) + d1).split('').reduce((acc, val, i) =>
            acc + (parseInt(val) * ((i % 8) + 2)), 0) % 11;
        d2 = d2 % 10;

        if (cnpjLimpo[12] == d1 && cnpjLimpo[13] == d2) {
            setResultado('✓ CNPJ Válido');
            setIsValid(true);
        } else {
            setResultado('✗ CNPJ Inválido');
            setIsValid(false);
        }
        setShowResult(true);
    }

    function limpar() {
        setCNPJ('');
        setResultado(null);
        setIsValid(null);
        setShowResult(false);
    }

    return (
        <div style={{ 
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <div className="p-card p-shadow-2" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '30px'
            }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#333'
                    }}>
                        <i className="icon-check" style={{ marginRight: '10px' }}></i>
                        Validador de CNPJ
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Valide CNPJ online</p>
                </div>

                <div className="p-form-group">
                    <label htmlFor="cnpj" className="p-form-label">
                        CNPJ:
                    </label>
                    <input
                        className="p-input p-form-text"
                        id="cnpj"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={cnpj}
                        onChange={(e) => setCNPJ(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '16px',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        className="p-btn p-shadow-1"
                        onClick={validar}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(145deg, rgba(0, 123, 255, 0.9), rgba(0, 123, 255, 0.7))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        Validar CNPJ
                    </button>
                    <button
                        className="p-btn p-shadow-1"
                        onClick={limpar}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(145deg, rgba(108, 117, 125, 0.9), rgba(108, 117, 125, 0.7))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {showResult && (
                    <div className="p-card p-shadow-1" style={{
                        background: isValid ? 'rgba(212, 237, 218, 0.7)' : 'rgba(248, 215, 218, 0.7)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${isValid ? 'rgba(40, 167, 69, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`,
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0', color: isValid ? '#155724' : '#721c24' }}>
                            {resultado}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
