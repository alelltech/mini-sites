import React, { useState, useEffect } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';

export default function IMC() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState(null);

    // Ler parâmetros da URL (altura vem em metros, converter para cm)
    useUrlParams({
        peso: setPeso,
        altura: (value) => setAltura((parseFloat(value) * 100).toString())
    });

    useEffect(() => {
        calcular();
    }, [peso, altura]);

    function calcular() {
        const pesoVal = parseFloat(peso);
        const alturaVal = parseFloat(altura);

        if (!pesoVal || pesoVal <= 0 || !alturaVal || alturaVal <= 0) {
            setResultado(null);
            return;
        }

        const alturaMetros = alturaVal / 100;
        const imc = (pesoVal / (alturaMetros * alturaMetros)).toFixed(1);

        let categoria = '';
        let cor = '';
        if (imc < 18.5) {
            categoria = 'Abaixo do peso';
            cor = '#ffc107';
        } else if (imc < 25) {
            categoria = 'Peso normal';
            cor = '#28a745';
        } else if (imc < 30) {
            categoria = 'Sobrepeso';
            cor = '#fd7e14';
        } else if (imc < 35) {
            categoria = 'Obesidade Grau I';
            cor = '#dc3545';
        } else if (imc < 40) {
            categoria = 'Obesidade Grau II';
            cor = '#bd2130';
        } else {
            categoria = 'Obesidade Grau III';
            cor = '#721c24';
        }

        setResultado({ imc, categoria, cor });
    }

    function limpar() {
        setPeso('');
        setAltura('');
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
                        <i className="icon-heart" style={{ marginRight: '10px' }}></i>
                        Calculadora de IMC
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule seu Índice de Massa Corporal</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="peso" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Peso (kg):
                        </label>
                        <input
                            className="p-input"
                            type="number"
                            id="peso"
                            placeholder="Ex: 75"
                            step="0.1"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
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
                        <label htmlFor="altura" style={{ 
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Altura (cm):
                        </label>
                        <input
                            className="p-input"
                            type="number"
                            id="altura"
                            placeholder="Ex: 180"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
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
                            color: resultado.cor,
                            marginBottom: '10px'
                        }}>
                            {resultado.imc}
                        </div>
                        <p style={{
                            fontSize: '1.3rem',
                            margin: 0,
                            fontWeight: 'bold',
                            color: resultado.cor
                        }}>
                            {resultado.categoria}
                        </p>
                    </div>
                )}

                <div className="p-card p-shadow-1" style={{ 
                    marginTop: '30px', 
                    background: 'rgba(255,255,255,0.5)', 
                    borderRadius: '15px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>
                    <h3 style={{ marginTop: 0, color: '#333', fontSize: '18px', fontWeight: '600' }}>📊 Classificação do IMC</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8', color: '#555' }}>
                        <li>Abaixo de 18,5: Abaixo do peso</li>
                        <li>18,5 - 24,9: Peso normal</li>
                        <li>25,0 - 29,9: Sobrepeso</li>
                        <li>30,0 - 34,9: Obesidade Grau I</li>
                        <li>35,0 - 39,9: Obesidade Grau II</li>
                        <li>Acima de 40: Obesidade Grau III</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
