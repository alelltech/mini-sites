import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function CalculadoraMargemLucro() {
    const [custo, setCusto] = useState('');
    const [preco, setPreco] = useState('');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => calcular(), 100);
        return () => clearTimeout(timeOutId);
    }, [custo, preco]);

    function calcular() {
        const custoNum = parseFloat(custo);
        const precoNum = parseFloat(preco);

        if (!custoNum || !precoNum) {
            return;
        }

        if (precoNum < custoNum) {
            return;
        }

        const lucro = precoNum - custoNum;
        const margemLucro = (lucro / precoNum) * 100;
        const markup = ((precoNum / custoNum) - 1) * 100;

        setResultado({
            custo: custoNum.toFixed(2),
            preco: precoNum.toFixed(2),
            lucro: lucro.toFixed(2),
            margemLucro: margemLucro.toFixed(2),
            markup: markup.toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setCusto('');
        setPreco('');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Custo do Produto: R$ ${resultado.custo}\nPreço de Venda: R$ ${resultado.preco}\n\nLucro: R$ ${resultado.lucro}\nMargem de Lucro: ${resultado.margemLucro}%\nMarkup: ${resultado.markup}%`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>💰 Calculadora de Margem e Lucro</h1>
                <p className="description">Calcule margem de lucro, markup e preço final para seu negócio</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="custo">Custo do Produto (R$)</label>
                        <input
                            id="custo"
                            type="number"
                            placeholder="100"
                            min="0"
                            step="0.01"
                            value={custo}
                            onChange={(e) => setCusto(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="preco">Preço de Venda (R$)</label>
                        <input
                            id="preco"
                            type="number"
                            placeholder="150"
                            min="0"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
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
                            <h3>Resultado</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Custo</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ {resultado.custo}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Preço de Venda</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ {resultado.preco}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>Lucro</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#28a745' }}>
                                            R$ {resultado.lucro}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Margem de Lucro</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {resultado.margemLucro}%
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Markup</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {resultado.markup}%
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                onClick={copyResult}
                                style={{
                                    padding: '8px 16px',
                                    marginTop: '15px',
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Copiar Resultado
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
