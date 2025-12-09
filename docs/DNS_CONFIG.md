# Configuração de Domínio e DNS - CalcZone BR

## 🌐 Visão Geral

Este documento detalha como registrar e configurar o domínio `calc-br.zone` para funcionar com GitHub Pages.

---

## 📋 Passo 1: Registrar o Domínio

### Onde Registrar?

Recomendamos:

1. **Namecheap.com** - R$25-35/ano, bom painel DNS
2. **GoDaddy.com** - R$30-50/ano, suporte em português
3. **Registro.br** - Se fosse .com.br (R$20-35/ano) - RECOMENDADO se usar .com.br

### Registrar em Namecheap

1. Acesse https://www.namecheap.com
2. Busque por `calc-br.zone`
3. Clique em "Add to Cart"
4. Pague com cartão ou PayPal
5. Finalize a compra
6. Você receberá confirmação por email

---

## 🔧 Passo 2: Configurar DNS no GitHub Pages

### Opção A: Usar Apex Domain (calc-br.zone)

#### Registros A (IPv4) - RECOMENDADO

No painel de DNS do seu registrador, adicione 4 registros A:

| Tipo | Host/Name | Valor |
|------|-----------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Exemplo em Namecheap:**

1. Acesse seu painel: https://ap.namecheap.com
2. Clique no domínio `calc-br.zone`
3. Vá para "Manage" → "Advanced DNS"
4. Você verá uma lista de registros
5. Remova os registros A padrão (se existirem)
6. Adicione os 4 registros A acima
7. Clique "Save changes"

#### Registros AAAA (IPv6) - OPCIONAL

Se quiser IPv6 também, adicione:

| Tipo | Host/Name | Valor |
|------|-----------|-------|
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

### Opção B: Usar Subdomínio WWW (www.calc-br.zone)

Se preferir algo mais simples, use apenas CNAME para `www`:

| Tipo | Host/Name | Valor |
|------|-----------|-------|
| CNAME | www | alelltech.github.io |

**Com esta opção:**
- `www.calc-br.zone` funcionará
- `calc-br.zone` será redirecionado automaticamente para `www`

---

## 🔍 Passo 3: Configurar GitHub Pages

### 1. Acesse Configurações do Repositório

1. Vá para: https://github.com/alelltech/mini-sites
2. Clique em **Settings** → **Pages** (na seção "Code and automation")

### 2. Configure o Domínio Customizado

1. Em "Custom domain", insira: `calc-br.zone` (ou `www.calc-br.zone`)
2. Clique **Save**
3. GitHub criará um arquivo `CNAME` automaticamente no repositório

### 3. Ative HTTPS

Após configurar o domínio:

1. Aguarde 5-10 minutos (DNS precisa propagar)
2. Volte para Settings → Pages
3. Você verá uma opção "Enforce HTTPS"
4. ✅ Marque a caixa "Enforce HTTPS"

Pronto! GitHub ativa SSL/TLS automaticamente.

---

## ✅ Passo 4: Verificar Configuração

### Testar DNS com Comando

Abra terminal/prompt de comando:

```bash
# Para apex domain (calc-br.zone)
dig calc-br.zone +noall +answer

# Você deve ver algo como:
# calc-br.zone.		3600	IN	A	185.199.108.153
# calc-br.zone.		3600	IN	A	185.199.109.153
# calc-br.zone.		3600	IN	A	185.199.110.153
# calc-br.zone.		3600	IN	A	185.199.111.153
```

Se não tiver `dig`, use em Windows:

```bash
nslookup calc-br.zone
```

### Testar Acesso

1. Aguarde até 24h para DNS propagar (geralmente 1-5 minutos)
2. Acesse: https://calc-br.zone
3. Você deve ver a homepage do CalcZone BR

### Se Não Funcionar

**Problema**: "This domain is not configured to serve web traffic"

**Solução**:
1. Volte a Settings → Pages
2. Remova o domínio
3. Aguarde 5 minutos
4. Reinsira o domínio
5. Clique Save novamente
6. Aguarde 10-15 minutos

---

## 📊 Arquivo CNAME (Automático)

O GitHub cria automaticamente um arquivo `CNAME` contendo seu domínio:

**Localização**: `/CNAME` (raiz do repositório)

**Conteúdo**:
```
calc-br.zone
```

**Importante**: 
- ✅ Este arquivo é criado automaticamente
- ✅ Não delete manualmente
- ✅ Se usar GitHub Actions, certifique-se que o `CNAME` está no output do build

---

## 🔄 Para GitHub Actions (CI/CD)

Se usar GitHub Actions para deploy (recomendado), adicione isto ao workflow:

```yaml
- name: Create CNAME
  run: echo "calc-br.zone" > dist/CNAME
```

**Arquivo**: `.github/workflows/deploy.yml` (já incluído neste projeto)

---

## 🚀 Timeline Esperada

| Ação | Tempo |
|------|-------|
| Registrar domínio | 5 minutos |
| Configurar DNS | 5 minutos |
| Configurar GitHub Pages | 5 minutos |
| DNS propagar | 1-24 horas (geralmente 1-5 min) |
| HTTPS ativar | 5-30 minutos após DNS |
| Site acessível | 1-2 horas no máximo |

---

## 🆘 Troubleshooting

### Problema: "DNS_PROBE_FINISHED_NXDOMAIN"

**Causa**: DNS ainda não propagou ou registros incorretos

**Solução**:
1. Aguarde 10-15 minutos
2. Limpe cache do navegador (Ctrl+F5)
3. Verifique registros A no painel DNS
4. Use `nslookup` para confirmar

### Problema: "Certificate not yet created"

**Causa**: HTTPS ainda não foi ativado

**Solução**:
1. Aguarde 5-10 minutos
2. Volte a Settings → Pages
3. Procure por "Enforce HTTPS"
4. Se não aparecer, remova e reinsira o domínio

### Problema: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"

**Causa**: Certificado SSL em transição

**Solução**:
1. Limpe cache do navegador
2. Tente em outro navegador
3. Aguarde 15 minutos
4. Tente novamente

### Problema: "GitHub can't find your site's folder"

**Causa**: Arquivo `CNAME` faltando ou repositório não público

**Solução**:
1. Certifique-se repositório é **público**
2. Verifique se `CNAME` existe no branch publicado
3. Se usar GitHub Actions, adicione step de criar `CNAME`

---

## 📚 Referências

- [GitHub Pages - Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages - HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Namecheap - DNS Setup](https://www.namecheap.com/support/knowledgebase/)

---

## ✨ Próximos Passos

Após domínio configurado:

1. ✅ Submeta ao Google Search Console
2. ✅ Configure Google Analytics
3. ✅ Aplique para Google AdSense
4. ✅ Monitore tráfego e performance
5. ✅ Adicione mais ferramentas conforme necessário

---

**Última atualização**: Dezembro 2024
