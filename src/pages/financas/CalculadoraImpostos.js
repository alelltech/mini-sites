import React, { useEffect, useState } from 'react';
import useUrlParams from '../../utils/useUrlParams.js';
import { copyToClipboard } from '../../utils/globalFunctions.js';

const IMPOSTOS = {
    icms: 18,
    ipi: 10,
    iss: 5,
    pis: 1.65,
    cofins: 7.6
};

export default function CalculadoraImpostos() {
    const [valor, setValor] = useState('');
    const [impostosSelecionados, setImpostosSelecionados] = useState({});
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Ler parâmetros da URL
    useUrlParams({
        rendaMensal: setValor
    });

    useEffect(() => {
        const timeOutId = setTimeout(() => calcular(), 100);
        return () => clearTimeout(timeOutId);
    }, [valor, impostosSelecionados]);
    
    function handleCheckboxChange(imposto) {
        setImpostosSelecionados(prev => ({
            ...prev,
            [imposto]: !prev[imposto]
        }));
    }

    function calcular() {
        const valorNum = parseFloat(valor);
        if (!valorNum || Object.values(impostosSelecionados).every(v => !v)) {
            return;
        }

        const impostos = {};
        let totalImpostos = 0;

        Object.entries(impostosSelecionados).forEach(([key, selecionado]) => {
            if (selecionado) {
                const aliquota = IMPOSTOS[key];
                const valor_imposto = (valorNum * aliquota) / 100;
                impostos[key] = {
                    aliquota,
                    valor: valor_imposto.toFixed(2)
                };
                totalImpostos += valor_imposto;
            }
        });

        setResultado({
            valor: valorNum.toFixed(2),
            impostos,
            totalImpostos: totalImpostos.toFixed(2),
            valorFinal: (valorNum + totalImpostos).toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setValor('');
        setImpostosSelecionados({});
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        let text = `Valor Base: R$ ${resultado.valor}\n\nImpostos:\n`;
        Object.entries(resultado.impostos).forEach(([key, data]) => {
            text += `${key.toUpperCase()} (${data.aliquota}%): R$ ${data.valor}\n`;
        });
        text += `\nTotal de Impostos: R$ ${resultado.totalImpostos}\nValor Final: R$ ${resultado.valorFinal}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
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
                        <i className="icon-doc" style={{ marginRight: '10px' }}></i>
                        Calculadora de Impostos
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule ICMS, IPI, ISS, PIS, COFINS e outros impostos brasileiros</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="valor" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Valor Base (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="valor"
                            type="number"
                            placeholder="1000"
                            min="0"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label className="p-form-label" style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Selecione os Impostos:</label>
                        <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '10px', padding: '15px' }}>
                            {Object.entries(IMPOSTOS).map(([key, aliquota]) => (
                                <div key={key} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '6px', background: impostosSelecionados[key] ? 'rgba(102, 126, 234, 0.1)' : 'transparent', transition: 'all 0.2s ease' }}>
                                    <input
                                        type="checkbox"
                                        id={key}
                                        checked={impostosSelecionados[key] || false}
                                        onChange={() => handleCheckboxChange(key)}
                                        style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                                    />
                                    <label htmlFor={key} style={{ cursor: 'pointer', fontSize: '14px', color: '#333', fontWeight: impostosSelecionados[key] ? '600' : '400' }}>
                                        {key.toUpperCase()} ({aliquota}%)
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>

                {showResult && resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Resultado</h3>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Valor Base</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.valor}</td>
                                </tr>
                                {Object.entries(resultado.impostos).map(([key, data]) => (
                                    <tr key={key}>
                                        <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>
                                            {key.toUpperCase()} ({data.aliquota}%)
                                        </td>
                                        <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#333', textAlign: 'right' }}>
                                            R$ {data.valor}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>
                                        Total de Impostos
                                    </td>
                                    <td style={{ padding: '12px', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#dc3545', textAlign: 'right' }}>
                                        R$ {resultado.totalImpostos}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>
                                        Valor Final
                                    </td>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#667eea', textAlign: 'right' }}>
                                        R$ {resultado.valorFinal}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={copyResult}
                            className="p-btn"
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '15px',
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
                            Copiar Resultado
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
