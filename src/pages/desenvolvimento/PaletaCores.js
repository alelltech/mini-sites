import React, { useState, useEffect } from 'react';
import '../../styles/conversor.css';

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
        <section className="tool-section">
            <div className="tool-header">
                <h1>🎨 Gerador de Paleta de Cores</h1>
                <p className="description">Gere paletas de cores automaticamente</p>
            </div>
            <div className="tool-container">
                <div style={{ marginBottom: '20px' }}>
                    <label>Cor Base:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                        <input
                            type="color"
                            value={baseColor}
                            onChange={handleColorChange}
                            style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                        />
                        <span style={{ fontFamily: 'monospace' }}>{baseColor}</span>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '15px',
                    marginTop: '20px'
                }}>
                    {colors.map((color) => (
                        <div
                            key={color}
                            onClick={() => copyColor(color)}
                            style={{
                                padding: '20px',
                                borderRadius: '4px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s',
                                backgroundColor: color
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            <div style={{
                                fontSize: '12px',
                                marginTop: '10px',
                                fontFamily: 'monospace',
                                background: 'rgba(0,0,0,0.1)',
                                padding: '5px',
                                borderRadius: '3px',
                                color: 'white',
                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                {color}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
