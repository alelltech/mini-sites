import React, { useState, useEffect } from 'react';

export default function Idade() {
    const [dataNascimento, setDataNascimento] = useState('');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        calcular();
    }, [dataNascimento]);

    function calcular() {
        if (!dataNascimento) {
            setResultado(null);
            return;
        }

        const dataNasc = new Date(dataNascimento);
        const hoje = new Date();

        if (dataNasc > hoje) {
            setResultado(null);
            return;
        }

        let anos = hoje.getFullYear() - dataNasc.getFullYear();
        let meses = hoje.getMonth() - dataNasc.getMonth();
        let dias = hoje.getDate() - dataNasc.getDate();

        if (dias < 0) {
            meses--;
            dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        }

        if (meses < 0) {
            anos--;
            meses += 12;
        }

        setResultado({
            anos,
            meses,
            dias
        });
    }

    function limpar() {
        setDataNascimento('');
        setResultado(null);
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
                        <i className="icon-calendar" style={{ marginRight: '10px' }}></i>
                        Calculadora de Idade
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule sua idade exata em anos, meses e dias</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group">
                        <label htmlFor="dataNascimento" className="p-form-label">
                            Data de Nascimento:
                        </label>
                        <input
                            className="p-input p-form-text"
                            type="date"
                            id="dataNascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
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
                </form>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
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

                {resultado && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: '#667eea',
                            marginBottom: '15px'
                        }}>
                            {resultado.anos} anos
                        </div>
                        <p style={{
                            fontSize: '1.2rem',
                            margin: 0,
                            color: '#666'
                        }}>
                            {resultado.meses} meses e {resultado.dias} dias
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
