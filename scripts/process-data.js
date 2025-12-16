import axios from "axios";
import { readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "fs";
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

  console.log(`\nRenomeando imagens de carros...`);
  try {
    const carImages = await glob(`public/data/cars/**/*.jpg`);
    for (let i = 0; i < carImages.length; i++) {
      if(!path.basename(carImages[i]).match(/(.+)\.json\-.+\.jpg/gi, '$1')){
        continue;
      }
      let newName = path.basename(carImages[i])
        .replace(/(.+)\.json\-.+\.jpg/gi, '$1')
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/-+$/i, '')
        .toLowerCase();
      renameSync(carImages[i], path.join(path.dirname(carImages[i]), `${newName}-${i}.jpg`));
    }
  } catch (error) {
    console.error('Erro ao renomear imagens de carros');
    console.error(error)      
  }
  console.log(`✅ Imagens renomeadas com sucesso.`);


  console.log(`\nIndexando imagens...`);
  try {
    const metaData = JSON.parse(readFileSync('public/data/cars/meta_data.json', 'utf-8'));
    
    for (let i = 0; i < metaData.models.length; i++) {
      try {
        const {fabricante, nome_do_modelo, anos_disponiveis} = metaData.models[i];
        const imagesPrefix = `${fabricante.toLowerCase()}-${nome_do_modelo}-${anos_disponiveis}`
          .replace(/[^a-z0-9]+/gi, '-')
          .replace(/-+$/i, '')
          .toLowerCase();
        const carImages = await glob(`${imagesPrefix}*`, {absolute: false, cwd: `public/data/cars/${fabricante}`});
        metaData.models[i].images = carImages.map(file => `/data/cars/${fabricante}/${file}`);
      } catch (error) {
        console.error(`Erro ao indexar imagens para ${metaData.models[i].nome_do_modelo}:`, error);
      }
    }
    
    writeFileSync('public/data/cars/meta_data.json', JSON.stringify(metaData, null, 2));
    console.log(`✅ Imagens indexadas com sucesso.`);
    
  } catch (error) {
    console.error('Erro ao indexar imagens:');
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

