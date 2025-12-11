import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function GeradorNumeroAleatorio() {
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');
    const [numero, setNumero] = useState('');
    const [showResult, setShowResult] = useState(false);

    function gerar() {
        const minimoNum = parseInt(minimo) || 0;
        const maximoNum = parseInt(maximo) || 100;

        if (minimoNum >= maximoNum) {
            alert('Mínimo deve ser menor que máximo');
            return;
        }

        const numeroGerado = Math.floor(Math.random() * (maximoNum - minimoNum + 1)) + minimoNum;
        setNumero(numeroGerado.toString());
        setShowResult(true);
    }

    function gerar10() {
        const minimoNum = parseInt(minimo) || 0;
        const maximoNum = parseInt(maximo) || 100;

        if (minimoNum >= maximoNum) {
            alert('Mínimo deve ser menor que máximo');
            return;
        }

        const numeros = [];
        for (let i = 0; i < 10; i++) {
            numeros.push(Math.floor(Math.random() * (maximoNum - minimoNum + 1)) + minimoNum);
        }
        setNumero(numeros.join(', '));
        setShowResult(true);
    }

    function copiar() {
        copyToClipboard(numero).then(() => {
            alert('Copiado!');
        });
    }

    function limpar() {
        setMinimo('');
        setMaximo('');
        setNumero('');
        setShowResult(false);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🎲 Gerador de Número Aleatório</h1>
                <p className="description">Gere números aleatórios ou sorteios</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="minimo">Mínimo:</label>
                        <input
                            id="minimo"
                            type="number"
                            placeholder="0"
                            value={minimo}
                            onChange={(e) => setMinimo(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="maximo">Máximo:</label>
                        <input
                            id="maximo"
                            type="number"
                            placeholder="100"
                            value={maximo}
                            onChange={(e) => setMaximo(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        <button
                            onClick={gerar}
                            style={{
                                padding: '10px 20px',
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Gerar Número
                        </button>
                        <button
                            onClick={gerar10}
                            style={{
                                padding: '10px 20px',
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Gerar 10 Números
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

                    {showResult && numero && (
                        <div className="result">
                            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff', textAlign: 'center', marginBottom: '10px' }}>
                                {numero}
                            </div>
                            <button
                                onClick={copiar}
                                style={{
                                    width: '100%',
                                    padding: '8px 16px',
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                Copiar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
