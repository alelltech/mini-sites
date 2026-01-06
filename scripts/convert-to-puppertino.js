const fs = require('fs');
const path = require('path');

// Mapeamento de ícones por categoria/página
const iconMap = {
    // Utilitários
    'Porcentagem': 'icon-calculator',
    'IMC': 'icon-heart',
    'AvaliacaoCorporal': 'icon-user',
    'CPFValidador': 'icon-check',
    'ValidadorCNPJ': 'icon-check',
    'GeradorSenha': 'icon-lock',
    'Idade': 'icon-calendar',
    'ContadorDiasRestantes': 'icon-calendar',
    'GeradorNumeroAleatorio': 'icon-shuffle',
    'CalculadoraCalorias': 'icon-energy',
    'CalculadoraEnergia': 'icon-energy',
    
    // Conversores
    'Temperatura': 'icon-fire',
    'Comprimento': 'icon-ruler',
    'Peso': 'icon-equalizer',
    'Area': 'icon-grid',
    'Volume': 'icon-cup',
    'Velocidade': 'icon-speedometer',
    'Tempo': 'icon-clock',
    'Pressao': 'icon-energy',
    'Moedas': 'icon-wallet',
    
    // Finanças
    'Desconto': 'icon-tag',
    'JurosCompostos': 'icon-graph',
    'INSS': 'icon-doc',
    'SimuladorEmprestimo': 'icon-wallet',
    'CalculadoraFGTS': 'icon-wallet',
    'CalculadoraHipoteca': 'icon-home',
    'CalculadoraHorasExtras': 'icon-clock',
    'CalculadoraImpostos': 'icon-doc',
    'CalculadoraMargemLucro': 'icon-graph',
    
    // Educação
    'NotaFinal': 'icon-pencil',
    'Densidade': 'icon-chemistry',
    'CalculadoraCientifica': 'icon-calculator',
    'CronogramaEstudos': 'icon-calendar',
    'NotacaoCientifica': 'icon-calculator',
    
    // Desenvolvimento
    'UUID': 'icon-key',
    'GeradorcPF': 'icon-user',
    'Hash': 'icon-lock',
    'Base64': 'icon-settings',
    'BaseNumerica': 'icon-calculator',
    'GeradorCNPJ': 'icon-doc',
    'HexDecimal': 'icon-calculator',
    'HexRGB': 'icon-drop',
    'JSONFormatter': 'icon-settings',
    'MD5': 'icon-lock',
    'PaletaCores': 'icon-drop',
    'SHA256': 'icon-lock',
    'URLEncoder': 'icon-link',
    
    // Texto
    'MaiusculaMinuscula': 'icon-pencil',
    'RemovedorAcentos': 'icon-pencil',
    'PalavrasCaracteres': 'icon-pencil'
};

function convertFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath, '.js');
        
        // Remove importação de CSS
        content = content.replace(/import\s+['"](.*?\/styles\/.*?\.css)['"];?\n?/g, '');
        
        // Adiciona ícone apropriado
        const icon = iconMap[fileName] || 'icon-wrench';
        
        console.log(`Convertendo ${fileName} com ícone ${icon}...`);
        
        // Esta é uma conversão básica - você precisará ajustar manualmente casos complexos
        // O objetivo é apenas remover a dependência de CSS e preparar para estilo Puppertino
        
        fs.writeFileSync(filePath, content);
        console.log(`✓ ${fileName} convertido`);
        return true;
    } catch (error) {
        console.error(`✗ Erro ao converter ${filePath}:`, error.message);
        return false;
    }
}

// Processar todos os arquivos
const categories = ['utilitarios', 'conversores', 'financas', 'educacao', 'desenvolvimento', 'texto'];
let total = 0;
let success = 0;

categories.forEach(category => {
    const dir = path.join(__dirname, '..', 'src', 'pages', category);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
    files.forEach(file => {
        total++;
        const filePath = path.join(dir, file);
        if (convertFile(filePath)) success++;
    });
});

console.log(`\n${success}/${total} arquivos processados com sucesso`);
