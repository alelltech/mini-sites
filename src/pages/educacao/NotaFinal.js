import React, { useState } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>📊 Calculadora de Nota Final</h1>
                <p className="description">Calcule a média ponderada das suas avaliações</p>
            </div>
            <div className="tool-container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                    {notas.map((nota, index) => (
                        <div key={nota.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1 }}>
                                <label>Nota {index + 1}:</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="0 a 10"
                                    value={nota.valor}
                                    onChange={(e) => atualizarNota(nota.id, 'valor', e.target.value)}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ width: '100px' }}>
                                <label>Peso:</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={nota.peso}
                                    onChange={(e) => atualizarNota(nota.id, 'peso', e.target.value)}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            {notas.length > 1 && (
                                <button
                                    onClick={() => removerNota(nota.id)}
                                    style={{
                                        padding: '10px 15px',
                                        background: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={adicionarNota}
                        style={{
                            padding: '10px 20px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        + Adicionar Nota
                    </button>
                    <button
                        onClick={calcular}
                        style={{
                            padding: '10px 20px',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Calcular Média
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

                {resultado && (
                    <div className="result">
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '10px' }}>
                            {resultado.media.toFixed(1)}
                        </div>
                        <p style={{ fontSize: '1.2rem', margin: 0 }}>
                            Situação: <strong>{resultado.situacao}</strong>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
