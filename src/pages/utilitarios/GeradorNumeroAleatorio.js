import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

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
                        <i className="icon-shuffle" style={{ marginRight: '10px' }}></i>
                        Gerador de Número Aleatório
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gere números aleatórios ou sorteios</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="minimo" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Mínimo:</label>
                        <input
                            className="p-input p-form-text"
                            id="minimo"
                            type="number"
                            placeholder="0"
                            value={minimo}
                            onChange={(e) => setMinimo(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="maximo" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Máximo:</label>
                        <input
                            className="p-input p-form-text"
                            id="maximo"
                            type="number"
                            placeholder="100"
                            value={maximo}
                            onChange={(e) => setMaximo(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={gerar}
                            className="p-btn"
                            style={{
                                flex: '1',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Gerar Número
                        </button>
                        <button
                            type="button"
                            onClick={gerar10}
                            className="p-btn"
                            style={{
                                flex: '1',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Gerar 10 Números
                        </button>
                    </div>
                </form>

                {showResult && numero && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#667eea', marginBottom: '15px', letterSpacing: '2px' }}>
                            {numero}
                        </div>
                        <button
                            onClick={copiar}
                            className="p-btn"
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Copiar Número(s)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
