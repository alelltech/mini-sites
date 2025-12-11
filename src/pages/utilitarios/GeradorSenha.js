import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function GeradorSenha() {
    const [comprimento, setComprimento] = useState('16');
    const [maiusculas, setMaiusculas] = useState(true);
    const [minusculas, setMinusculas] = useState(true);
    const [numeros, setNumeros] = useState(true);
    const [especiais, setEspeciais] = useState(true);
    const [senha, setSenha] = useState('');
    const [showResult, setShowResult] = useState(false);

    function gerar() {
        const comprimentoNum = parseInt(comprimento);
        let charset = '';

        if (maiusculas) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (minusculas) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numeros) charset += '0123456789';
        if (especiais) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!charset) {
            alert('Selecione pelo menos um tipo de caractere');
            return;
        }

        let senhaGerada = '';
        for (let i = 0; i < comprimentoNum; i++) {
            senhaGerada += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setSenha(senhaGerada);
        setShowResult(true);
    }

    function copiar() {
        copyToClipboard(senha).then(() => {
            alert('Senha copiada!');
        });
    }

    function limpar() {
        setSenha('');
        setShowResult(false);
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🔐 Gerador de Senha Segura</h1>
                <p className="description">Gere senhas seguras e aleatórias</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="comprimento">Comprimento da Senha:</label>
                        <input
                            id="comprimento"
                            type="number"
                            value={comprimento}
                            onChange={(e) => setComprimento(e.target.value)}
                            min="8"
                            max="32"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="maiusculas"
                                checked={maiusculas}
                                onChange={(e) => setMaiusculas(e.target.checked)}
                                style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                            />
                            <label htmlFor="maiusculas" style={{ cursor: 'pointer' }}>
                                Maiúsculas (A-Z)
                            </label>
                        </div>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="minusculas"
                                checked={minusculas}
                                onChange={(e) => setMinusculas(e.target.checked)}
                                style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                            />
                            <label htmlFor="minusculas" style={{ cursor: 'pointer' }}>
                                Minúsculas (a-z)
                            </label>
                        </div>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="numeros"
                                checked={numeros}
                                onChange={(e) => setNumeros(e.target.checked)}
                                style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                            />
                            <label htmlFor="numeros" style={{ cursor: 'pointer' }}>
                                Números (0-9)
                            </label>
                        </div>
                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="especiais"
                                checked={especiais}
                                onChange={(e) => setEspeciais(e.target.checked)}
                                style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                            />
                            <label htmlFor="especiais" style={{ cursor: 'pointer' }}>
                                Caracteres Especiais (!@#$%)
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
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
                            Gerar Senha
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

                    {showResult && senha && (
                        <div className="result">
                            <div style={{
                                fontSize: '20px',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                padding: '10px',
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                margin: '10px 0',
                                wordBreak: 'break-all'
                            }}>
                                {senha}
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
                                    cursor: 'pointer'
                                }}
                            >
                                Copiar Senha
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
