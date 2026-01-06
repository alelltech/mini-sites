import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

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
                        <i className="icon-lock" style={{ marginRight: '10px' }}></i>
                        Gerador de Senha Segura
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gere senhas seguras e aleatórias</p>
                </div>

                <div className="p-form-group">
                    <label htmlFor="comprimento" className="p-form-label">
                        Comprimento da Senha:
                    </label>
                    <input
                        className="p-input p-form-text"
                        id="comprimento"
                        type="number"
                        value={comprimento}
                        onChange={(e) => setComprimento(e.target.value)}
                        min="8"
                        max="32"
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

                <div style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            id="maiusculas"
                            checked={maiusculas}
                            onChange={(e) => setMaiusculas(e.target.checked)}
                            style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                        <label htmlFor="maiusculas" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
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
                        <label htmlFor="minusculas" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
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
                        <label htmlFor="numeros" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
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
                        <label htmlFor="especiais" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
                            Caracteres Especiais (!@#$%)
                        </label>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        className="p-btn p-shadow-1"
                        onClick={gerar}
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
                        Gerar Senha
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

                {showResult && senha && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <div style={{
                            fontSize: '20px',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            padding: '15px',
                            background: 'rgba(255,255,255,0.9)',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: '10px',
                            margin: '0 0 15px 0',
                            wordBreak: 'break-all',
                            color: '#333'
                        }}>
                            {senha}
                        </div>
                        <button
                            className="p-btn p-shadow-1"
                            onClick={copiar}
                            style={{
                                width: '100%',
                                padding: '12px 24px',
                                background: 'linear-gradient(145deg, rgba(40, 167, 69, 0.9), rgba(40, 167, 69, 0.7))',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            Copiar Senha
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
