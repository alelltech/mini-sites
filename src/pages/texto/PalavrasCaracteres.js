import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>📝 Contador de Palavras e Caracteres</h1>
                <p className="description">Conte palavras, caracteres e linhas do seu texto</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="texto">Digite seu texto:</label>
                    <textarea
                        id="texto"
                        placeholder="Digite seu texto aqui..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        style={{ width: '100%', minHeight: '150px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                {resultado && (
                    <div className="result">
                        <h2>Resultado</h2>
                        <div className="result-content">
                            <div className="result-item">
                                <label>Palavras</label>
                                <value>{resultado.palavras}</value>
                            </div>
                            <div className="result-item">
                                <label>Caracteres (com espaços)</label>
                                <value>{resultado.caracteres}</value>
                            </div>
                            <div className="result-item">
                                <label>Caracteres (sem espaços)</label>
                                <value>{resultado.semEspacos}</value>
                            </div>
                            <div className="result-item">
                                <label>Linhas</label>
                                <value>{resultado.linhas}</value>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
