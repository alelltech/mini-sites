import React, { useState, useEffect } from 'react';

const ALIMENTOS = {
    arroz: { nome: 'Arroz (100g)', calorias: 100 },
    banana: { nome: 'Banana (médio)', calorias: 165 },
    maca: { nome: 'Maçã (médio)', calorias: 52 },
    pao: { nome: 'Pão integral (1 fatia)', calorias: 155 },
    frango: { nome: 'Frango grelhado (100g)', calorias: 165 },
    bife: { nome: 'Bife (100g)', calorias: 271 },
    leite: { nome: 'Leite integral (200ml)', calorias: 88 },
    ovo: { nome: 'Ovos (1 unidade)', calorias: 140 },
    azeite: { nome: 'Azeite (1 colher)', calorias: 386 },
    agua: { nome: 'Água (1 copo)', calorias: 0 }
};

export default function CalculadoraCalorias() {
    const [alimento, setAlimento] = useState('');
    const [quantidade, setQuantidade] = useState('100');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (alimento && quantidade) {
            calcular();
        }
    }, [alimento, quantidade]);

    function calcular() {
        if (!alimento || !quantidade) {
            setShowResult(false);
            return;
        }

        const alimentoData = ALIMENTOS[alimento];
        const quantidadeNum = parseFloat(quantidade);

        if (!alimentoData || quantidadeNum <= 0) {
            setShowResult(false);
            return;
        }

        const calorias = (alimentoData.calorias * quantidadeNum) / 100;
        setResultado({
            calorias: calorias.toFixed(1),
            alimento: alimentoData.nome,
            quantidade: quantidadeNum
        });
        setShowResult(true);
    }

    function limpar() {
        setAlimento('');
        setQuantidade('100');
        setResultado(null);
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
                        <i className="icon-energy" style={{ marginRight: '10px' }}></i>
                        Calculadora de Calorias
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule o gasto calórico de alimentos</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="alimento" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Alimento/Bebida:</label>
                        <select
                            className="p-form-select"
                            id="alimento"
                            value={alimento}
                            onChange={(e) => setAlimento(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        >
                            <option value="">Selecione um alimento...</option>
                            {Object.entries(ALIMENTOS).map(([key, data]) => (
                                <option key={key} value={key}>
                                    {data.nome} - {data.calorias} kcal
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="quantidade" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Quantidade (gramas ou unidades):</label>
                        <input
                            className="p-input p-form-text"
                            id="quantidade"
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            step="0.1"
                            min="0"
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>
                </form>
                <div style={{ display: 'flex', gap: '10px' }}>
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

                {showResult && resultado && (
                    <div className="result">
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                            {resultado.calorias} kcal
                        </div>
                        <p>{resultado.quantidade}g de {resultado.alimento}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
