import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const XLS_URL = 'https://www.bcb.gov.br/conteudo/txcred/Documents/taxascredito.xls';
const DOWNLOAD_PATH = path.join(__dirname, '../data/taxascredito.xls');
const JSON_OUTPUT_PATH = path.join(__dirname, '../data/taxascredito.json');

// Criar diretório data se não existir
const dataDir = path.dirname(DOWNLOAD_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Baixa o arquivo XLS do URL
 */
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Baixando arquivo de ${url}...`);
    
    https.get(url, (response) => {
      // Tratar redirecionamentos
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Erro ao baixar: Status ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filePath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Arquivo baixado com sucesso: ${filePath}`);
        resolve(filePath);
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Remover arquivo incompleto
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Processa dados mesclando cabeçalhos de múltiplas linhas
 */
function processSheetWithMergedHeaders(sheet) {
  // Obter todas as linhas da planilha
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  if (rows.length < 6) return [];

  // Linhas 5 e 6 (índice 4 e 5) para mesclar cabeçalhos
  const headerLine1 = rows[4] || [];
  const headerLine2 = rows[5] || [];

  // Mesclar cabeçalhos: combinar texto das duas linhas
  const mergedHeaders = headerLine1.map((header, index) => {
    const header2 = headerLine2[index] || '';
    
    // Mesclar apenas se ambas tiverem conteúdo
    if (header && header2 && header !== header2) {
      return `${header}_${header2}`;
    }
    return header || header2 || `Column_${index}`;
  }).map(sanitizeHeader);

  // Processar dados a partir da linha 7 (índice 6)
  const data = [];
  for (let i = 6; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.every(cell => cell === null || cell === undefined || cell === '')) continue;
    if(row.slice(0, mergedHeaders.length).join('').trim() === '') continue;

    const obj = {};
    mergedHeaders.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : null;
    });
    data.push(obj);
  }

  return data;
}

function sanitizeHeader(header) {
  return header.trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

/**
 * Converte XLS para JSON
 */
function convertXlsToJson(xlsPath, jsonPath) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`🔄 Convertendo XLS para JSON...`);
      
      // Ler arquivo XLS
      const workbook = XLSX.readFile(xlsPath);
      const jsonData = {};

      // Processar todas as planilhas
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const data = processSheetWithMergedHeaders(sheet);
        jsonData[sheetName] = data;
      });

      // Salvar como JSON
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log(`✅ JSON salvo com sucesso: ${jsonPath}`);
      console.log(`📊 Planilhas processadas: ${Object.keys(jsonData).join(', ')}`);
      
      resolve(jsonData);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Função principal
 */
async function main() {
  try {
    console.log('🚀 Iniciando processo de download e conversão...\n');
    
    // Baixar arquivo
    await downloadFile(XLS_URL, DOWNLOAD_PATH);
    
    // Converter para JSON
    const jsonData = await convertXlsToJson(DOWNLOAD_PATH, JSON_OUTPUT_PATH);
    
    console.log('\n✨ Processo concluído com sucesso!');
    console.log(`\n📁 Arquivos gerados:`);
    console.log(`  XLS: ${DOWNLOAD_PATH}`);
    console.log(`  JSON: ${JSON_OUTPUT_PATH}`);
    
    return jsonData;
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar
main();
