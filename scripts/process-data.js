import axios from "axios";
import { readdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";
import glob from "glob";

(async () => {

  console.log(`\nRemovendo arquivos de carros...`);
  try {
    const files = await glob(['public/data/cars/*/*.json', 'public/data/cars/*/*.details'], {noglobstar: true});
    
    for (const file of files) {
      rmSync(file, {force: true});
    }
    console.log(`✅ Carros removidos com sucesso.`);
    
    const metaData = JSON.parse(readFileSync('public/data/cars/meta_data.json', 'utf-8'));
    delete metaData.meta_data_views.url;
    for (let i = 0; i < metaData.models.length; i++) {
      delete metaData.models[i].url;
    }
  
    writeFileSync('public/data/cars/meta_data.json', JSON.stringify(metaData, null, 2));
    console.log(`✅ Meta dados de carros atualizados com sucesso.`);
    
  } catch (error) {
    console.error('Erro ao processar arquivos de carros:', error);
    console.error(error)
  }


  axios.defaults.timeout = 30000;
  let res = null;

  res = await axios.get(`https://www.bcb.gov.br/api/servico/sitebcb/HistoricoTaxaJurosDiario/ParametrosConsulta`);
  const parametros = res.data.conteudo;
  const taxas = [];
  for (const parametro of parametros) {
    const { 
      Segmento, // "Pessoa Física"
      Modalidade, // "Aquisição de outros bens - Pré-fixado"
      codigoSegmento, // "1"
      codigoModalidade, // "402101"
      tipoModalidade, // "D"
    } = parametro;
    try {
      res = await axios.get(`https://www.bcb.gov.br/api/servico/sitebcb/historicotaxajurosdiario/atual?filtro=(codigoSegmento eq '${codigoSegmento}') and (codigoModalidade eq '${codigoModalidade}') and (InicioPeriodo eq '2025-11-24')`);
      console.log(`✅ Arquivo ${Modalidade} salvo com sucesso.`);
      taxas.push(...res.data.conteudo.map(item => ({
        ...item,
        ...parametro,
        TaxaJurosAoMes: parseFloat(item.TaxaJurosAoMes.replace(',', '.')),
        TaxaJurosAoAno: parseFloat(item.TaxaJurosAoAno.replace(',', '.')),
      })));
    } catch (error) {
      console.error('Erro ao processar dados:', error);
      process.exit(1);
    }
  }
  writeFileSync('public/data/taxascredito.json', JSON.stringify(taxas, null, 2));
  
})()

