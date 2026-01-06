import React, { useState, useEffect } from 'react';

export default function PalavrasCaracteres() {
    const [texto, setTexto] = useState('');
    const [resultado, setResultado] = useState(null);

    function countWords(str) {
        return str.trim() === '' ? 0 : str.trim().split(/\s+/).length;
    }

    function countCharacters(str) {
        return str.length;
    }

    function countCharactersWithoutSpaces(str) {
        return str.replace(/\s/g, '').length;
    }

    function countLines(str) {
        return str === '' ? 0 : str.split('\n').length;
    }

    useEffect(() => {
        if (texto.trim() === '') {
            setResultado(null);
            return;
        }

        try {
            setResultado({
                palavras: countWords(texto),
                caracteres: countCharacters(texto),
                semEspacos: countCharactersWithoutSpaces(texto),
                linhas: countLines(texto)
            });
        } catch (e) {
            setResultado(null);
        }
    }, [texto]);

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-document"></i> Contador de Palavras e Caracteres
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Conte palavras, caracteres e linhas do seu texto</p>
                
                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="texto" className="p-form-label">Digite seu texto:</label>
                    <textarea
                        id="texto"
                        placeholder="Digite seu texto aqui..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        className="p-form-text"
                        style={{ width: '100%', minHeight: '150px', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                </div>

                {resultado && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px', marginTop: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: 0, marginBottom: '20px' }}>Resultado</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '15px'
                        }}>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(102, 126, 234, 0.1) 100%)',
                                borderRadius: '10px',
                                border: '1px solid rgba(102, 126, 234, 0.3)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>Palavras</div>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>{resultado.palavras}</div>
                            </div>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, rgba(242, 93, 108, 0.2) 0%, rgba(242, 93, 108, 0.1) 100%)',
                                borderRadius: '10px',
                                border: '1px solid rgba(242, 93, 108, 0.3)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>Caracteres (com espaços)</div>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: '#f5576c' }}>{resultado.caracteres}</div>
                            </div>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.2) 0%, rgba(40, 167, 69, 0.1) 100%)',
                                borderRadius: '10px',
                                border: '1px solid rgba(40, 167, 69, 0.3)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>Caracteres (sem espaços)</div>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: '#28a745' }}>{resultado.semEspacos}</div>
                            </div>
                            <div style={{
                                padding: '15px',
                                background: 'linear-gradient(135deg, rgba(108, 117, 125, 0.2) 0%, rgba(108, 117, 125, 0.1) 100%)',
                                borderRadius: '10px',
                                border: '1px solid rgba(108, 117, 125, 0.3)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>Linhas</div>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: '#6c757d' }}>{resultado.linhas}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
