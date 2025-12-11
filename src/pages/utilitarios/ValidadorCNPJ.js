import React, { useState } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🏢 Validador de CNPJ</h1>
                <p className="description">Valide CNPJ online</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input
                            id="cnpj"
                            type="text"
                            placeholder="00.000.000/0000-00"
                            value={cnpj}
                            onChange={(e) => setCNPJ(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={validar}
                            style={{
                                padding: '10px 20px',
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Validar CNPJ
                        </button>
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

                    {showResult && (
                        <div
                            style={{
                                marginTop: '20px',
                                padding: '15px',
                                borderRadius: '4px',
                                borderLeft: '4px solid',
                                background: isValid ? '#d4edda' : '#f8d7da',
                                borderLeftColor: isValid ? '#28a745' : '#dc3545',
                                color: isValid ? '#155724' : '#721c24'
                            }}
                        >
                            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>
                                {resultado}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
