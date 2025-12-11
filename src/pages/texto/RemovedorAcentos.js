import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

export default function RemovedorAcentos() {
    const [texto, setTexto] = useState('');
    const [resultado, setResultado] = useState('');

    useEffect(() => {
        remover();
    }, [texto]);

    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function remover() {
        if (texto.trim() === '') {
            setResultado('');
            return;
        }

        try {
            const semAcentos = removeAccents(texto);
            setResultado(semAcentos);
        } catch (e) {
            setResultado('');
        }
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>✏️ Removedor de Acentos</h1>
                <p className="description">Remova acentos de qualquer texto</p>
            </div>
            <div className="tool-container">
                <form className="tool-form">
                    <div className="form-group">
                        <label htmlFor="texto">Digite seu texto:</label>
                        <textarea
                            id="texto"
                            placeholder="Digite seu texto com acentos..."
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            style={{ width: '100%', minHeight: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
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
