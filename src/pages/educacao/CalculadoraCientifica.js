import React, { useState } from 'react';
import '../../styles/conversor.css';

export default function CalculadoraCientifica() {
    const [display, setDisplay] = useState('0');

    function handleAddChar(char) {
        if (display === '0' && char !== '.') {
            setDisplay(char);
        } else {
            setDisplay(display + char);
        }
    }

    function handleCalculate() {
        try {
            const result = eval(display.replace(/×/g, '*').replace(/−/g, '-'));
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handleClear() {
        setDisplay('0');
    }

    function handleSquareRoot() {
        try {
            const result = Math.sqrt(eval(display));
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handleSquare() {
        try {
            const result = eval(display) ** 2;
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handleLogarithm() {
        try {
            const result = Math.log10(eval(display));
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handleSine() {
        try {
            const result = Math.sin(eval(display) * Math.PI / 180);
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handleCosine() {
        try {
            const result = Math.cos(eval(display) * Math.PI / 180);
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handleTangent() {
        try {
            const result = Math.tan(eval(display) * Math.PI / 180);
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    function handlePi() {
        setDisplay(display + Math.PI.toString().substring(0, 5));
    }

    function handleE() {
        setDisplay(display + Math.E.toString().substring(0, 5));
    }

    const buttonStyle = {
        padding: '15px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const numberButtonStyle = { ...buttonStyle, background: '#555', color: '#fff' };
    const operatorButtonStyle = { ...buttonStyle, background: '#ff9500', color: '#fff' };
    const equalsButtonStyle = { ...buttonStyle, background: '#28a745', color: '#fff', gridColumn: 'span 2' };
    const clearButtonStyle = { ...buttonStyle, background: '#dc3545', color: '#fff', gridColumn: 'span 2' };
    const funcButtonStyle = { ...buttonStyle, background: '#2196f3', color: '#fff' };

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🧮 Calculadora Científica</h1>
                <p className="description">Realize operações avançadas com funções científicas</p>
            </div>
            <div className="tool-container" style={{ maxWidth: '500px' }}>
                <div style={{ background: '#333', padding: '20px', borderRadius: '8px' }}>
                    <div style={{
                        background: '#000',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '4px',
                        textAlign: 'right',
                        fontSize: '24px',
                        marginBottom: '10px',
                        fontFamily: 'monospace',
                        wordWrap: 'break-word',
                        minHeight: '30px'
                    }}>
                        {display}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '5px'
                    }}>
                        <button style={clearButtonStyle} onClick={handleClear}>C</button>
                        <button style={operatorButtonStyle} onClick={() => handleAddChar('(')}>( </button>
                        <button style={operatorButtonStyle} onClick={() => handleAddChar(')')}>)</button>
                        <button style={operatorButtonStyle} onClick={() => handleAddChar('/')}>/</button>

                        <button style={numberButtonStyle} onClick={() => handleAddChar('7')}>7</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('8')}>8</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('9')}>9</button>
                        <button style={operatorButtonStyle} onClick={() => handleAddChar('×')}>×</button>

                        <button style={numberButtonStyle} onClick={() => handleAddChar('4')}>4</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('5')}>5</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('6')}>6</button>
                        <button style={operatorButtonStyle} onClick={() => handleAddChar('−')}>−</button>

                        <button style={numberButtonStyle} onClick={() => handleAddChar('1')}>1</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('2')}>2</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('3')}>3</button>
                        <button style={operatorButtonStyle} onClick={() => handleAddChar('+')}>+</button>

                        <button style={numberButtonStyle} onClick={() => handleAddChar('0')}>0</button>
                        <button style={numberButtonStyle} onClick={() => handleAddChar('.')}>.</button>
                        <button style={equalsButtonStyle} onClick={handleCalculate}>=</button>

                        <button style={funcButtonStyle} onClick={handleSquareRoot}>√</button>
                        <button style={funcButtonStyle} onClick={handleSquare}>x²</button>
                        <button style={funcButtonStyle} onClick={handleLogarithm}>log</button>
                        <button style={funcButtonStyle} onClick={handleSine}>sin</button>
                        <button style={funcButtonStyle} onClick={handleCosine}>cos</button>
                        <button style={funcButtonStyle} onClick={handleTangent}>tan</button>
                        <button style={funcButtonStyle} onClick={handlePi}>π</button>
                        <button style={funcButtonStyle} onClick={handleE}>e</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
