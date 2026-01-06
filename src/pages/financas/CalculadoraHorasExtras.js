import React, { useEffect, useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

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
                        <i className="icon-clock" style={{ marginRight: '10px' }}></i>
                        Calculadora de Horas Extras
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Calcule o valor de horas extras com diferentes percentuais</p>
                </div>

                <form style={{ marginBottom: '20px' }}>
                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="salario" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Salário Mensal (R$):</label>
                        <input
                            className="p-input p-form-text"
                            id="salario"
                            type="number"
                            placeholder="3000"
                            min="0"
                            step="0.01"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        />
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="jornada" className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Selecione a Jornada Semanal:</label>
                        <select
                            className="p-select p-form-select"
                            id="jornada"
                            value={horasNormais}
                            onChange={(e) => setHorasNormais(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', transition: 'all 0.3s ease' }}
                        >
                            <option value="">-- Escolha uma jornada --</option>
                            {JORNADAS.map((jornada) => (
                                <option key={jornada.mensal} value={String(jornada.mensal)}>
                                    {jornada.texto}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-form-group" style={{ marginBottom: '20px' }}>
                        <label className="p-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Distribuição de Horas Extras:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label htmlFor="horas50" style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: '#666' }}>Horas 50%</label>
                                <input
                                    className="p-input p-form-text"
                                    id="horas50"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.5"
                                    value={horas50}
                                    onChange={(e) => setHoras50(e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', fontSize: '14px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.9)' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="horas100" style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: '#666' }}>Horas 100%</label>
                                <input
                                    className="p-input p-form-text"
                                    id="horas100"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.5"
                                    value={horas100}
                                    onChange={(e) => setHoras100(e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', fontSize: '14px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.9)' }}
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {showResult && resultado && (
                    <div className="p-card p-shadow-1" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '15px', padding: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Resultado</h3>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Valor Hora Normal</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.valorHora}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Horas Normais ({resultado.horasNormais}h)</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.valorNormal}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Horas 50% ({resultado.horas50}h)</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.valor50}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '14px', color: '#666' }}>Horas 100% ({resultado.horas100}h)</td>
                                    <td style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>R$ {resultado.valor100}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Total Extras</td>
                                    <td style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#28a745', textAlign: 'right' }}>R$ {resultado.totalExtras}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#666', fontWeight: '600' }}>Total com Normal</td>
                                    <td style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', fontSize: '18px', fontWeight: '700', color: '#667eea', textAlign: 'right' }}>R$ {resultado.totalComNormal}</td>
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
