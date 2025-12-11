import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🍎 Calculadora de Calorias</h1>
                <p className="description">Calcule o gasto calórico de alimentos</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="alimento">Alimento/Bebida:</label>
                        <select
                            id="alimento"
                            value={alimento}
                            onChange={(e) => setAlimento(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        >
                            <option value="">Selecione um alimento...</option>
                            {Object.entries(ALIMENTOS).map(([key, data]) => (
                                <option key={key} value={key}>
                                    {data.nome} - {data.calorias} kcal
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantidade">Quantidade (gramas ou unidades):</label>
                        <input
                            id="quantidade"
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            step="0.1"
                            min="0"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

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
        </section>
    );
}
