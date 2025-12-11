import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';
import '../../styles/conversor.css';

export default function HexRGB() {
    const [hex, setHex] = useState('');
    const [r, setR] = useState('');
    const [g, setG] = useState('');
    const [b, setB] = useState('');
    const [resultRGB, setResultRGB] = useState('');
    const [resultHex, setResultHex] = useState('');
    const [previewColor, setPreviewColor] = useState('');

    function handleHexToRgb() {
        const hexVal = hex.trim();
        if (!/^#?[0-9A-F]{6}$/i.test(hexVal)) {
            return;
        }
        const h = hexVal.replace('#', '');
        const rv = parseInt(h.substr(0, 2), 16);
        const gv = parseInt(h.substr(2, 2), 16);
        const bv = parseInt(h.substr(4, 2), 16);
        setR(rv.toString());
        setG(gv.toString());
        setB(bv.toString());
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(hex.startsWith('#') ? hex : '#' + hex);
        setPreviewColor(hex.startsWith('#') ? hex : '#' + hex);
    }

    function handleRgbToHex() {
        const rv = parseInt(r);
        const gv = parseInt(g);
        const bv = parseInt(b);
        if (isNaN(rv) || isNaN(gv) || isNaN(bv) || rv < 0 || gv < 0 || bv < 0 || rv > 255 || gv > 255 || bv > 255) {
            return;
        }
        const hexVal = '#' + [rv, gv, bv].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        setHex(hexVal);
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(hexVal);
        setPreviewColor(hexVal);
    }

    function handleHexInput(e) {
        const val = e.target.value;
        setHex(val);
        if (!/^#?[0-9A-F]{6}$/i.test(val)) {
            setResultRGB('');
            setResultHex('');
            setPreviewColor('');
            return;
        }
        const h = val.replace('#', '');
        const rv = parseInt(h.substr(0, 2), 16);
        const gv = parseInt(h.substr(2, 2), 16);
        const bv = parseInt(h.substr(4, 2), 16);
        setR(rv.toString());
        setG(gv.toString());
        setB(bv.toString());
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(val.startsWith('#') ? val : '#' + val);
        setPreviewColor(val.startsWith('#') ? val : '#' + val);
    }

    function handleRInput(e) {
        const val = e.target.value;
        setR(val);
        if (val === '' || g === '' || b === '') {
            return;
        }
        const rv = parseInt(val);
        const gv = parseInt(g);
        const bv = parseInt(b);
        if (isNaN(rv) || isNaN(gv) || isNaN(bv) || rv < 0 || gv < 0 || bv < 0 || rv > 255 || gv > 255 || bv > 255) {
            return;
        }
        const hexVal = '#' + [rv, gv, bv].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        setHex(hexVal);
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(hexVal);
        setPreviewColor(hexVal);
    }

    function handleGInput(e) {
        const val = e.target.value;
        setG(val);
        if (r === '' || val === '' || b === '') {
            return;
        }
        const rv = parseInt(r);
        const gv = parseInt(val);
        const bv = parseInt(b);
        if (isNaN(rv) || isNaN(gv) || isNaN(bv) || rv < 0 || gv < 0 || bv < 0 || rv > 255 || gv > 255 || bv > 255) {
            return;
        }
        const hexVal = '#' + [rv, gv, bv].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        setHex(hexVal);
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(hexVal);
        setPreviewColor(hexVal);
    }

    function handleBInput(e) {
        const val = e.target.value;
        setB(val);
        if (r === '' || g === '' || val === '') {
            return;
        }
        const rv = parseInt(r);
        const gv = parseInt(g);
        const bv = parseInt(val);
        if (isNaN(rv) || isNaN(gv) || isNaN(bv) || rv < 0 || gv < 0 || bv < 0 || rv > 255 || gv > 255 || bv > 255) {
            return;
        }
        const hexVal = '#' + [rv, gv, bv].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        setHex(hexVal);
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(hexVal);
        setPreviewColor(hexVal);
    }

    function handleColorPicker(e) {
        const hexVal = e.target.value;
        setHex(hexVal);
        const h = hexVal.replace('#', '');
        const rv = parseInt(h.substr(0, 2), 16);
        const gv = parseInt(h.substr(2, 2), 16);
        const bv = parseInt(h.substr(4, 2), 16);
        setR(rv.toString());
        setG(gv.toString());
        setB(bv.toString());
        setResultRGB(`rgb(${rv}, ${gv}, ${bv})`);
        setResultHex(hexVal);
        setPreviewColor(hexVal);
    }

    function copyResult() {
        const output = `Hex: ${resultHex}\nRGB: ${resultRGB}`;
        copyToClipboard(output).then(() => {
            alert('Copiado!');
        });
    }

    function clear() {
        setHex('');
        setR('');
        setG('');
        setB('');
        setResultRGB('');
        setResultHex('');
        setPreviewColor('');
    }

    return (
        <section className="tool-section">
            <div className="tool-header">
                <h1>🎨 Conversor Hex/RGB</h1>
                <p className="description">Converta cores entre hexadecimal e RGB</p>
            </div>
            <div className="tool-container">
                <div className="form-group">
                    <label htmlFor="hex">Hex:</label>
                    <input
                        id="hex"
                        type="text"
                        placeholder="#FF5733"
                        value={hex}
                        onChange={handleHexInput}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px' }}
                    />
                </div>

                <div className="form-group">
                    <label>RGB:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="number"
                            placeholder="R (0-255)"
                            min="0"
                            max="255"
                            value={r}
                            onChange={handleRInput}
                            style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <input
                            type="number"
                            placeholder="G (0-255)"
                            min="0"
                            max="255"
                            value={g}
                            onChange={handleGInput}
                            style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <input
                            type="number"
                            placeholder="B (0-255)"
                            min="0"
                            max="255"
                            value={b}
                            onChange={handleBInput}
                            style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="colorPicker">Seletor de Cor:</label>
                    <input
                        id="colorPicker"
                        type="color"
                        value={hex || '#000000'}
                        onChange={handleColorPicker}
                        style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleHexToRgb}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Hex → RGB
                    </button>
                    <button
                        onClick={handleRgbToHex}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        RGB → Hex
                    </button>
                    <button
                        onClick={clear}
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

                {previewColor && (
                    <div className="result">
                        <div style={{
                            width: '100%',
                            height: '60px',
                            borderRadius: '4px',
                            marginBottom: '15px',
                            border: '1px solid #ddd',
                            backgroundColor: previewColor
                        }} />
                        <pre style={{
                            background: '#fff',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            overflow: 'auto',
                            marginBottom: '10px'
                        }}>
                            {`Hex: ${resultHex}\nRGB: ${resultRGB}`}
                        </pre>
                        <button
                            onClick={copyResult}
                            style={{
                                padding: '8px 16px',
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
