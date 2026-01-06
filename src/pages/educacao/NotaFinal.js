import React, { useState } from 'react';

export default function NotaFinal() {
    const [notas, setNotas] = useState([
        { id: 0, valor: '', peso: 1 },
        { id: 1, valor: '', peso: 1 }
    ]);
    const [contador, setContador] = useState(2);
    const [resultado, setResultado] = useState(null);

    function adicionarNota() {
        setNotas([...notas, { id: contador, valor: '', peso: 1 }]);
        setContador(contador + 1);
    }

    function removerNota(id) {
        setNotas(notas.filter(nota => nota.id !== id));
    }

    function atualizarNota(id, campo, valor) {
        setNotas(notas.map(nota =>
            nota.id === id ? { ...nota, [campo]: valor } : nota
        ));
        calcular()
    }

    function calcular() {
        if (notas.length === 0) {
            alert('Adicione pelo menos uma nota');
            return;
        }

        let somaNotas = 0;
        let somaPesos = 0;

        notas.forEach(nota => {
            const valor = parseFloat(nota.valor) || 0;
            const peso = parseFloat(nota.peso) || 1;
            somaNotas += valor * peso;
            somaPesos += peso;
        });

        const media = somaPesos > 0 ? somaNotas / somaPesos : 0;
        const situacao = media >= 7 ? 'Aprovado' : media >= 5 ? 'Recuperação' : 'Reprovado';

        setResultado({ media, situacao });
    }

    function limpar() {
        setNotas([
            { id: 0, valor: '', peso: 1 },
            { id: 1, valor: '', peso: 1 }
        ]);
        setContador(2);
        setResultado(null);
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-graph"></i> Calculadora de Nota Final
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Calcule a média ponderada das suas avaliações</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                    {notas.map((nota, index) => (
                        <div key={nota.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1 }}>
                                <label className="p-form-label" style={{ marginBottom: '8px', display: 'block' }}>Nota {index + 1}:</label>
                                <input
                                    className="p-input p-form-text"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="0 a 10"
                                    value={nota.valor}
                                    onChange={(e) => atualizarNota(nota.id, 'valor', e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                                />
                            </div>
                            <div style={{ width: '120px' }}>
                                <label className="p-form-label" style={{ marginBottom: '8px', display: 'block' }}>Peso:</label>
                                <input
                                    className="p-input p-form-text"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={nota.peso}
                                    onChange={(e) => atualizarNota(nota.id, 'peso', e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                                />
                            </div>
                            {notas.length > 1 && (
                                <button
                                    onClick={() => removerNota(nota.id)}
                                    className="p-btn"
                                    style={{
                                        padding: '10px 15px',
                                        background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <button
                        onClick={adicionarNota}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        + Adicionar Nota
                    </button>
                    <button
                        onClick={calcular}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Calcular Média
                    </button>
                    <button
                        onClick={limpar}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Limpar
                    </button>
                </div>

                {resultado && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '42px', fontWeight: '700', color: '#667eea', marginBottom: '12px' }}>
                            {resultado.media.toFixed(1)}
                        </div>
                        <p style={{ fontSize: '16px', margin: 0, fontWeight: '600' }}>
                            Situação: <span style={{ color: resultado.situacao === 'Aprovado' ? '#28a745' : resultado.situacao === 'Recuperação' ? '#ffc107' : '#dc3545' }}>{resultado.situacao}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
