import React, { useState, useEffect } from 'react';

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

export default function PaletaCores() {
    const [baseColor, setBaseColor] = useState('#007bff');
    const [colors, setColors] = useState([]);

    useEffect(() => {
        generatePalette();
    }, []);

    function generatePalette() {
        const [r, g, b] = hexToRgb(baseColor);
        const newColors = [];
        for (let i = -40; i <= 40; i += 10) {
            newColors.push(rgbToHex(r + i, g + i, b + i));
        }
        setColors(newColors);
    }

    function handleColorChange(e) {
        const newColor = e.target.value;
        setBaseColor(newColor);
        const [r, g, b] = hexToRgb(newColor);
        const newColors = [];
        for (let i = -40; i <= 40; i += 10) {
            newColors.push(rgbToHex(r + i, g + i, b + i));
        }
        setColors(newColors);
    }

    function copyColor(color) {
        navigator.clipboard.writeText(color);
        alert('Copiado: ' + color);
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="p-card p-shadow-2" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(40px) saturate(150%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0' }}>
                    <i className="icon-palette"></i> Gerador de Paleta de Cores
                </h1>
                <p style={{ color: '#999', marginBottom: '25px' }}>Gere paletas de cores automaticamente</p>
                
                <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.08)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Cor Base:</label>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <input
                            type="color"
                            value={baseColor}
                            onChange={handleColorChange}
                            style={{ width: '60px', height: '60px', border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer', borderRadius: '10px' }}
                        />
                        <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: '700', letterSpacing: '1px' }}>{baseColor}</span>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '15px',
                    marginTop: '20px'
                }}>
                    {colors.map((color) => (
                        <div
                            key={color}
                            onClick={() => {
                                navigator.clipboard.writeText(color);
                                alert('Copiado: ' + color);
                            }}
                            style={{
                                padding: '20px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                backgroundColor: color,
                                border: '2px solid rgba(255,255,255,0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                            }}
                        >
                            <div style={{
                                fontSize: '12px',
                                marginTop: '10px',
                                fontFamily: 'monospace',
                                background: 'rgba(0,0,0,0.3)',
                                padding: '6px 8px',
                                borderRadius: '6px',
                                color: 'white',
                                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                fontWeight: '600',
                                letterSpacing: '0.5px'
                            }}>
                                {color}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
