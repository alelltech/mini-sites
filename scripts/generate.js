#!/usr/bin/env node

/**
 * CalcZone BR - Site Generator
 * Generates 50+ static sites from configuration and templates
 */

const fs = require('fs');
const path = require('path');

// ============================================
// Configuration
// ============================================

const CONFIG_FILE = path.join(__dirname, '../config/sites.json');
const TEMPLATE_DIR = path.join(__dirname, '../templates');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');
const OUTPUT_DIR = DIST_DIR;

// Tool implementations (HTML + Script)
const toolImplementations = {
    'calculadora-juros-compostos': {
        html: `<div class="form-group">
                    <label>Capital Inicial (R$)</label>
                    <input type="number" id="capital" placeholder="1000" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>Taxa de Juros (% ao ano)</label>
                    <input type="number" id="taxa" placeholder="5" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>Tempo (anos)</label>
                    <input type="number" id="tempo" placeholder="10" min="0" step="0.01">
                </div>
                <button class="btn btn-primary" onclick="calcularJurosCompostos()">Calcular</button>
                <div id="result" class="result hidden">
                    <div class="result-label">Montante Final</div>
                    <div class="result-value">R$ 0,00</div>
                    <div class="result-copy">
                        <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.querySelector('#result .result-value').textContent, this)">Copiar</button>
                    </div>
                </div>`,
        script: `function calcularJurosCompostos() {
                    const capital = parseFloat(document.getElementById('capital').value);
                    const taxa = parseFloat(document.getElementById('taxa').value);
                    const tempo = parseFloat(document.getElementById('tempo').value);

                    if (!isPositive(capital) || !isNonNegative(taxa) || !isPositive(tempo)) {
                        alert('Por favor, preencha todos os campos com valores válidos');
                        return;
                    }

                    const taxaDecimal = taxa / 100;
                    const montante = capital * Math.pow(1 + taxaDecimal, tempo);
                    const juros = montante - capital;

                    const resultDiv = document.getElementById('result');
                    const resultValue = resultDiv.querySelector('.result-value');
                    resultValue.textContent = formatCurrency(montante);
                    
                    showResult(resultDiv, formatCurrency(montante), 'Montante Final');
                    trackToolUsage('calculadora-juros-compostos');
                }`
    },
    'conversor-moedas': {
        html: `<div class="form-group">
                    <label>Valor</label>
                    <input type="number" id="valor" placeholder="100" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>De</label>
                    <select id="de">
                        <option value="BRL">Real (R$)</option>
                        <option value="USD">Dólar (US$)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">Libra (£)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Para</label>
                    <select id="para">
                        <option value="USD">Dólar (US$)</option>
                        <option value="BRL">Real (R$)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">Libra (£)</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="converterMoedas()">Converter</button>
                <div id="result" class="result hidden">
                    <div class="result-label">Resultado</div>
                    <div class="result-value">0,00</div>
                    <div class="result-copy">
                        <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.querySelector('#result .result-value').textContent, this)">Copiar</button>
                    </div>
                </div>`,
        script: `function converterMoedas() {
                    const valor = parseFloat(document.getElementById('valor').value);
                    const de = document.getElementById('de').value;
                    const para = document.getElementById('para').value;

                    if (!isPositive(valor)) {
                        alert('Por favor, insira um valor válido');
                        return;
                    }

                    // Taxas de câmbio aproximadas (em produção, usar API real)
                    const taxas = {
                        'BRL': 1,
                        'USD': 5.0,
                        'EUR': 5.5,
                        'GBP': 6.3
                    };

                    const valorEmReal = valor * taxas[de];
                    const resultado = valorEmReal / taxas[para];

                    const resultDiv = document.getElementById('result');
                    resultDiv.querySelector('.result-label').textContent = para;
                    resultDiv.querySelector('.result-value').textContent = formatNumber(resultado, 2);
                    
                    showResult(resultDiv, formatNumber(resultado, 2), \`Resultado em \${para}\`);
                    trackToolUsage('conversor-moedas');
                }`
    },
    'calculadora-margem-lucro': {
        html: `<div class="form-group">
                    <label>Custo do Produto (R$)</label>
                    <input type="number" id="custo" placeholder="100" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>Preço de Venda (R$)</label>
                    <input type="number" id="preco" placeholder="150" min="0" step="0.01">
                </div>
                <button class="btn btn-primary" onclick="calcularMargem()">Calcular</button>
                <div id="result" class="result hidden">
                    <div class="result-label">Margem de Lucro</div>
                    <div class="result-value">0%</div>
                    <div class="result-copy">
                        <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.querySelector('#result .result-value').textContent, this)">Copiar</button>
                    </div>
                </div>`,
        script: `function calcularMargem() {
                    const custo = parseFloat(document.getElementById('custo').value);
                    const preco = parseFloat(document.getElementById('preco').value);

                    if (!isPositive(custo) || !isPositive(preco)) {
                        alert('Por favor, preencha todos os campos');
                        return;
                    }

                    const lucro = preco - custo;
                    const margem = (lucro / preco) * 100;

                    const resultDiv = document.getElementById('result');
                    resultDiv.querySelector('.result-value').textContent = formatNumber(margem, 2) + '%';
                    
                    showResult(resultDiv, formatNumber(margem, 2) + '%', 'Margem de Lucro');
                    trackToolUsage('calculadora-margem-lucro');
                }`
    },
    'calculadora-horas-extras': {
        html: `<div class="form-group">
                    <label>Salário Mensal (R$)</label>
                    <input type="number" id="salario" placeholder="3000" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>Horas Extras Trabalhadas</label>
                    <input type="number" id="horas" placeholder="10" min="0" step="0.5">
                </div>
                <div class="form-group">
                    <label>Percentual Extra (%)</label>
                    <select id="percentual">
                        <option value="50">50% (normal)</option>
                        <option value="100">100% (noturna)</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="calcularExtras()">Calcular</button>
                <div id="result" class="result hidden">
                    <div class="result-label">Valor das Horas Extras</div>
                    <div class="result-value">R$ 0,00</div>
                    <div class="result-copy">
                        <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.querySelector('#result .result-value').textContent, this)">Copiar</button>
                    </div>
                </div>`,
        script: `function calcularExtras() {
                    const salario = parseFloat(document.getElementById('salario').value);
                    const horas = parseFloat(document.getElementById('horas').value);
                    const percentual = parseInt(document.getElementById('percentual').value);

                    if (!isPositive(salario) || !isPositive(horas)) {
                        alert('Por favor, preencha todos os campos');
                        return;
                    }

                    const valorHora = salario / 160; // 160 horas/mês
                    const valorExtra = valorHora * (1 + percentual / 100) * horas;

                    const resultDiv = document.getElementById('result');
                    resultDiv.querySelector('.result-value').textContent = formatCurrency(valorExtra);
                    
                    showResult(resultDiv, formatCurrency(valorExtra), 'Valor das Horas Extras');
                    trackToolUsage('calculadora-horas-extras');
                }`
    },
    'conversor-temperatura': {
        html: `<div class="form-group">
                    <label>Valor</label>
                    <input type="number" id="valor" placeholder="20">
                </div>
                <div class="form-group">
                    <label>De</label>
                    <select id="de">
                        <option value="C">Celsius (°C)</option>
                        <option value="F">Fahrenheit (°F)</option>
                        <option value="K">Kelvin (K)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Para</label>
                    <select id="para">
                        <option value="F">Fahrenheit (°F)</option>
                        <option value="C">Celsius (°C)</option>
                        <option value="K">Kelvin (K)</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="converterTemperatura()">Converter</button>
                <div id="result" class="result hidden">
                    <div class="result-label">Resultado</div>
                    <div class="result-value">0°</div>
                    <div class="result-copy">
                        <button class="btn btn-secondary btn-small" onclick="copyToClipboard(document.querySelector('#result .result-value').textContent, this)">Copiar</button>
                    </div>
                </div>`,
        script: `function converterTemperatura() {
                    const valor = parseFloat(document.getElementById('valor').value);
                    const de = document.getElementById('de').value;
                    const para = document.getElementById('para').value;

                    if (!isValidNumber(valor)) {
                        alert('Por favor, insira um valor válido');
                        return;
                    }

                    let resultado;
                    let simbolo = '°';

                    // Converter para Celsius primeiro
                    let celsius;
                    if (de === 'C') celsius = valor;
                    else if (de === 'F') celsius = (valor - 32) * 5/9;
                    else if (de === 'K') celsius = valor - 273.15;

                    // Converter para unidade alvo
                    if (para === 'C') resultado = celsius;
                    else if (para === 'F') resultado = (celsius * 9/5) + 32;
                    else if (para === 'K') { resultado = celsius + 273.15; simbolo = ''; }

                    const resultDiv = document.getElementById('result');
                    resultDiv.querySelector('.result-value').textContent = formatNumber(resultado, 2) + simbolo + para;
                    
                    showResult(resultDiv, formatNumber(resultado, 2) + simbolo + para, 'Temperatura Convertida');
                    trackToolUsage('conversor-temperatura');
                }`
    }
};

// ============================================
// File Operations
// ============================================

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function readTemplate(filename) {
    try {
        return fs.readFileSync(path.join(TEMPLATE_DIR, filename), 'utf8');
    } catch (err) {
        console.error(`❌ Erro ao ler template ${filename}:`, err.message);
        return '';
    }
}

function copyFile(src, dest) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
}

// ============================================
// Main Generator Functions
// ============================================

function getToolImplementation(slug) {
    if (toolImplementations[slug]) {
        return toolImplementations[slug];
    }
    // Fallback para ferramentas não implementadas
    return {
        html: `<div class="info-card">
                    <h3>⚙️ Em Desenvolvimento</h3>
                    <p>Esta ferramenta está em desenvolvimento. Volte em breve!</p>
                </div>`,
        script: `console.log('Tool not yet implemented: ${slug}');`
    };
}

function generateToolPage(tool, config) {
    const template = readTemplate('tool-template.html');
    const impl = getToolImplementation(tool.slug);

    let content = template
        .replace('{{TITLE}}', tool.title)
        .replace('{{DESCRIPTION}}', tool.description)
        .replace('{{KEYWORDS}}', tool.keywords)
        .replace('{{SLUG}}', tool.slug)
        .replace('{{ICON}}', tool.icon)
        .replace('{{TOOL_HTML}}', impl.html)
        .replace('{{TOOL_SCRIPT}}', impl.script);

    const toolDir = path.join(OUTPUT_DIR, tool.slug);
    ensureDir(toolDir);

    fs.writeFileSync(path.join(toolDir, 'index.html'), content, 'utf8');
}

function generateSitemap(tools, config) {
    const baseUrl = `https://${config.metadata.domain}`;
    const urls = tools.map(tool => `
  <url>
    <loc>${baseUrl}/${tool.slug}/</loc>
    <priority>0.8</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
${urls}
</urlset>`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemap, 'utf8');
}

function generateRobotsTxt(config) {
    const robots = `User-agent: *
Allow: /
Sitemap: https://${config.metadata.domain}/sitemap.xml`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), robots, 'utf8');
}

function copyPublicFiles() {
    if (fs.existsSync(PUBLIC_DIR)) {
        const files = fs.readdirSync(PUBLIC_DIR);
        files.forEach(file => {
            const src = path.join(PUBLIC_DIR, file);
            const dest = path.join(OUTPUT_DIR, file);
            if (fs.statSync(src).isFile()) {
                copyFile(src, dest);
            }
        });
    }
}

function generateCNAME() {
    const cnamePath = path.join(__dirname, '../CNAME');
    if (fs.existsSync(cnamePath)) {
        const domain = fs.readFileSync(cnamePath, 'utf8').trim();
        fs.writeFileSync(path.join(OUTPUT_DIR, 'CNAME'), domain, 'utf8');
    }
}

// ============================================
// Main Execution
// ============================================

function main() {
    console.log('🚀 Iniciando geração de sites CalcZone BR...\n');

    // Limpar diretório de saída
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.rmSync(OUTPUT_DIR, { recursive: true });
    }
    ensureDir(OUTPUT_DIR);

    // Ler configuração
    let config;
    try {
        const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
        config = JSON.parse(configData);
    } catch (err) {
        console.error('❌ Erro ao ler configuração:', err.message);
        process.exit(1);
    }

    const tools = config.tools;
    console.log(`📋 Encontrados ${tools.length} ferramentas\n`);

    // Copiar arquivos públicos
    console.log('📁 Copiando arquivos públicos...');
    copyPublicFiles();

    // Gerar página de cada ferramenta
    console.log('🔨 Gerando páginas das ferramentas...');
    let count = 0;
    tools.forEach(tool => {
        generateToolPage(tool, config);
        count++;
        if (count % 10 === 0) {
            process.stdout.write(`✓ ${count}/${tools.length}\r`);
        }
    });
    console.log(`✓ ${count} ferramentas geradas\n`);

    // Gerar sitemap
    console.log('🗺️  Gerando sitemap.xml...');
    generateSitemap(tools, config);

    // Gerar robots.txt
    console.log('🤖 Gerando robots.txt...');
    generateRobotsTxt(config);

    // Gerar/copiar CNAME
    console.log('🌐 Configurando domínio customizado...');
    generateCNAME();

    console.log('\n✨ Geração concluída com sucesso!');
    console.log(`📂 Saída em: ${OUTPUT_DIR}`);
    console.log(`🌍 Sites gerados: ${tools.length}`);
}

// Run
main();
