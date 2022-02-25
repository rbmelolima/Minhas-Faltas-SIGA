const puppeteer = require('puppeteer');
require('dotenv/config');


(async () => {
  const userId = process.env.SIGA_USUARIO;
  const password = process.env.SIGA_SENHA;
  console.table({ userId, password });

  console.log("-> Abrindo o browser");
  const browser = await puppeteer.launch({
    //headless: false, // <- abre a janela do navegador
    //slowMo: 100 //<- Diminuindo a velocidade da execução,
  });

  const page = await browser.newPage();

  console.log("-> Indo até o SIGA");
  await page.goto('https://siga.cps.sp.gov.br/aluno/login.aspx');

  console.log("-> Fazendo login no SIGA");
  await page.waitForSelector('#vSIS_USUARIOID');
  await page.type('#vSIS_USUARIOID', userId);

  await page.waitForSelector('#vSIS_USUARIOSENHA');
  await page.type('#vSIS_USUARIOSENHA', password);

  await page.click('input.button');

  await page.waitForNavigation()

  console.log("-> Indo para a página de faltas parciais");
  await page.goto("https://siga.cps.sp.gov.br/aluno/faltasparciais.aspx");

  console.log("-> Pegando as disciplinas");
  const bodyHandle = await page.$('#Grid1ContainerTbl tbody');
  const tbody = await page.evaluate((body) => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  console.log("-> Capturando uma imagem");
  await page.screenshot({ path: `assets/screenshot3.png` });

  console.log("-> Fim da execução");
  await browser.close();
})();
