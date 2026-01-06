import React, { useState, useEffect } from 'react';

export default function ContadorDiasRestantes() {
    const [dataAlvo, setDataAlvo] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (dataAlvo) {
            calcular();
        }
    }, [dataAlvo]);

    function calcular() {
        if (!dataAlvo) {
            setShowResult(false);
            return;
        }

        const dataAlvoObj = new Date(dataAlvo);
        const hoje = new Date();

        if (dataAlvoObj <= hoje) {
            setShowResult(false);
            return;
        }

        const diff = dataAlvoObj.getTime() - hoje.getTime();
        const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const semanas = Math.floor(dias / 7);
        const diasRestantes = dias % 7;

        setResultado({
            dias,
            semanas,
            diasRestantes
        });
        setShowResult(true);
    }

    function limpar() {
        setDataAlvo('');
        setResultado(null);
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
                        <i className="icon-calendar" style={{ marginRight: '10px' }}></i>
                        Contador de Dias Restantes
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule dias restantes até uma data</p>
                </div>

                <div className="p-form-group">
                    <label htmlFor="dataAlvo" className="p-form-label">
                        Data Alvo:
                    </label>
                    <input
                        className="p-input p-form-text"
                        id="dataAlvo"
                        type="date"
                        value={dataAlvo}
                        onChange={(e) => setDataAlvo(e.target.value)}
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

                {showResult && resultado && (
                    <div className="p-card p-shadow-1" style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '15px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                            {resultado.dias} dias
                        </div>
                        <p style={{ fontSize: '1.2rem', margin: 0, color: '#666' }}>
                            {resultado.semanas} semanas e {resultado.diasRestantes} dias
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
