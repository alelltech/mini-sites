import React, { useState } from 'react';

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

    function handleSqrt() {
        handleSquareRoot();
    }

    function handleSin() {
        handleSine();
    }

    function handleCos() {
        handleCosine();
    }

    function handleTan() {
        handleTangent();
    }

    function handleLog() {
        handleLogarithm();
    }

    function handleLn() {
        try {
            const result = Math.log(eval(display));
            setDisplay(String(result));
        } catch (e) {
            setDisplay('Erro');
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-calculator"></i> Calculadora Científica
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Realize operações avançadas com funções científicas</p>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '8px',
                        textAlign: 'right',
                        fontSize: '24px',
                        marginBottom: '15px',
                        fontFamily: 'monospace',
                        wordWrap: 'break-word',
                        minHeight: '40px',
                        border: '2px solid rgba(102, 126, 234, 0.3)'
                    }}>
                        {display || '0'}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px'
                    }}>
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', color: '#fff', gridColumn: 'span 2' }} onClick={handleClear}>C</button>
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff' }} onClick={() => handleAddChar('(')}>( </button>
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff' }} onClick={() => handleAddChar(')')}>)</button>
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={() => handleAddChar('/')}>/</button>

                        {['7', '8', '9'].map(n => <button key={n} style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={() => handleAddChar(n)}>{n}</button>)}
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={() => handleAddChar('×')}>×</button>

                        {['4', '5', '6'].map(n => <button key={n} style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={() => handleAddChar(n)}>{n}</button>)}
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={() => handleAddChar('-')}>−</button>

                        {['1', '2', '3'].map(n => <button key={n} style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={() => handleAddChar(n)}>{n}</button>)}
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={() => handleAddChar('+')}>+</button>

                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', color: '#fff', gridColumn: 'span 2' }} onClick={() => handleAddChar('0')}>0</button>
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={() => handleAddChar('.')}>.</button>
                        <button style={{ padding: '15px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: '#fff' }} onClick={handleCalculate}>=</button>

                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleSqrt}>√</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={() => handleAddChar('^')}>x^y</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleSin}>sin</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleCos}>cos</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleTan}>tan</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleLog}>log</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleLn}>ln</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handlePi}>π</button>
                        <button style={{ padding: '10px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }} onClick={handleE}>e</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
