import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>Aa Conversor de Maiúscula/Minúscula</h1>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="texto">Digite seu texto:</label>
                        <textarea
                            id="texto"
                            placeholder="Digite seu texto..."
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            style={{ width: '100%', minHeight: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipo">Converter para:</label>
                        <select
                            id="tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="upper">MAIÚSCULA</option>
                            <option value="lower">minúscula</option>
                            <option value="capitalize">Primeira Letra</option>
                        </select>
                    </div>
                </form>

                {resultado && (
                    <div className="result">
                        <strong>Resultado:</strong>
                        <textarea
                            readOnly
                            value={resultado}
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                marginTop: '10px',
                                background: 'white'
                            }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
