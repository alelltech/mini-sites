import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

const JORNADAS = [
    { mensal: 168, texto: '40h/semana 8h/dia 168h/mes'},
    { mensal: 220, texto: '44h/semana 8h/dia 220h/mes'},
    { mensal: 200, texto: '40h/semana 8h/dia 200h/mes'},
    { mensal: 180, texto: '36h/semana 6h/dia 180h/mes'},
    { mensal: 150, texto: '30h/semana 6h/dia 150h/mes'}
];

export default function CalculadoraHorasExtras() {
    const [salario, setSalario] = useState('');
    const [horasNormais, setHorasNormais] = useState('0');
    const [horas50, setHoras50] = useState('0');
    const [horas100, setHoras100] = useState('0');
    const [resultado, setResultado] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => calcular(), 100);
        return () => clearTimeout(timeOutId);
    }, [salario, horasNormais, horas50, horas100]);

    function calcular() {
        const salarioNum = parseFloat(salario);
        const horasNormaisNum = parseFloat(horasNormais);
        const horas50Num = parseFloat(horas50);
        const horas100Num = parseFloat(horas100);

        if (!salarioNum) {
            return;
        }

        const valorHora = salarioNum / horasNormaisNum;
        const valorNormal = valorHora * horasNormaisNum;
        const valor50 = valorHora * 1.5 * horas50Num;
        const valor100 = valorHora * 2 * horas100Num;
        const totalExtras = valor50 + valor100;
        const totalComNormal = valorNormal + totalExtras;

        setResultado({
            valorHora: valorHora.toFixed(2),
            valorNormal: valorNormal.toFixed(2),
            valor50: valor50.toFixed(2),
            valor100: valor100.toFixed(2),
            totalExtras: totalExtras.toFixed(2),
            totalComNormal: totalComNormal.toFixed(2),
            horasNormais: horasNormaisNum.toFixed(2),
            horas50: horas50Num.toFixed(2),
            horas100: horas100Num.toFixed(2)
        });
        setShowResult(true);
    }

    function limpar() {
        setSalario('');
        setHorasNormais('0');
        setHoras50('0');
        setHoras100('0');
        setResultado(null);
        setShowResult(false);
    }

    function copyResult() {
        const text = `Salário: R$ ${salario}\nValor Hora Normal: R$ ${resultado.valorHora}\n\nHoras Normais (${resultado.horasNormais}h): R$ ${resultado.valorNormal}\nHoras 50% (${resultado.horas50}h): R$ ${resultado.valor50}\nHoras 100% (${resultado.horas100}h): R$ ${resultado.valor100}\n\nTotal Extras: R$ ${resultado.totalExtras}\nTotal com Normal: R$ ${resultado.totalComNormal}`;
        copyToClipboard(text).then(() => {
            alert('Copiado!');
        });
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>⏰ Calculadora de Horas Extras</h1>
                <p className="description">Calcule o valor de horas extras com diferentes percentuais</p>
            </div>
            <div className="tool-container">
                <div style={{ maxWidth: '600px' }}>
                    <div className="form-group">
                        <label htmlFor="salario">Salário Mensal (R$)</label>
                        <input
                            id="salario"
                            type="number"
                            placeholder="3000"
                            min="0"
                            step="0.01"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="jornada">Selecione a Jornada Semanal</label>
                        <select
                            id="jornada"
                            value={horasNormais}
                            onChange={(e) => setHorasNormais(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' }}
                        >
                            <option value="">-- Escolha uma jornada --</option>
                            {JORNADAS.map((jornada) => (
                                <option key={jornada.mensal} value={String(jornada.mensal)}>
                                    {jornada.texto}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Distribuição de Horas Extras</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                            <div>
                                <label htmlFor="horas50" style={{ fontSize: '12px' }}>Horas 50%</label>
                                <input
                                    id="horas50"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.5"
                                    value={horas50}
                                    onChange={(e) => setHoras50(e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="horas100" style={{ fontSize: '12px' }}>Horas 100%</label>
                                <input
                                    id="horas100"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.5"
                                    value={horas100}
                                    onChange={(e) => setHoras100(e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={calcular}
                            style={{
                                padding: '10px 20px',
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Calcular
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

                    {showResult && resultado && (
                        <div className="result">
                            <h3>Resultado</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Valor Hora Normal</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.valorHora}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Horas Normais ({resultado.horasNormais}h)</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ {resultado.valorNormal}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Horas 50% ({resultado.horas50}h)</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ {resultado.valor50}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Horas 100% ({resultado.horas100}h)</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>R$ {resultado.valor100}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>Total Extras</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', color: '#28a745' }}>
                                            R$ {resultado.totalExtras}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>Total com Normal</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            R$ {resultado.totalComNormal}
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
