import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/globalFunctions.js';

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
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-palette"></i> Conversor Hex/RGB
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Converta cores entre hexadecimal e RGB</p>
                
                <div className="p-form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="hex" className="p-form-label">Hex:</label>
                    <input
                        id="hex"
                        className="p-input p-form-text"
                        type="text"
                        placeholder="#FF5733"
                        value={hex}
                        onChange={handleHexInput}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                    />
                </div>

                <div className="p-form-group" style={{ marginBottom: '15px' }}>
                    <label className="p-form-label">RGB:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            className="p-input p-form-text"
                            type="number"
                            placeholder="R (0-255)"
                            min="0"
                            max="255"
                            value={r}
                            onChange={handleRInput}
                            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        />
                        <input
                            className="p-input p-form-text"
                            type="number"
                            placeholder="G (0-255)"
                            min="0"
                            max="255"
                            value={g}
                            onChange={handleGInput}
                            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        />
                        <input
                            className="p-input p-form-text"
                            type="number"
                            placeholder="B (0-255)"
                            min="0"
                            max="255"
                            value={b}
                            onChange={handleBInput}
                            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)' }}
                        />
                    </div>
                </div>

                <div className="p-form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="colorPicker" className="p-form-label">Seletor de Cor:</label>
                    <input
                        id="colorPicker"
                        type="color"
                        value={hex || '#000000'}
                        onChange={handleColorPicker}
                        style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleHexToRgb}
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
                        Hex → RGB
                    </button>
                    <button
                        onClick={handleRgbToHex}
                        className="p-btn"
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        RGB → Hex
                    </button>
                    <button
                        onClick={clear}
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

                {previewColor && (
                    <div className="p-card" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '20px' }}>
                        <div style={{
                            width: '100%',
                            height: '80px',
                            borderRadius: '12px',
                            marginBottom: '15px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            backgroundColor: previewColor
                        }} />
                        <pre style={{
                            background: 'rgba(255,255,255,0.9)',
                            padding: '15px',
                            borderRadius: '8px',
                            overflow: 'auto',
                            marginBottom: '15px',
                            fontFamily: 'monospace',
                            fontSize: '14px'
                        }}>
                            {`Hex: ${resultHex}\nRGB: ${resultRGB}`}
                        </pre>
                        <button
                            onClick={copyResult}
                            className="p-btn"
                            style={{
                                padding: '10px 16px',
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
