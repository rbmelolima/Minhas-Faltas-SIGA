const puppeteer = require('puppeteer');
require('dotenv/config');

(async () => {
  const userId = process.env.SIGA_USUARIO;
  const password = process.env.SIGA_SENHA;
  console.table({ userId, password });

  console.log("Abrindo o browser...");
  const browser = await puppeteer.launch({
    //headless: true, // <- não abre a janela do navegador
    //slowMo: 1000 //<- Diminuindo a velocidade da execução,
  });

  const page = await browser.newPage();

  console.log("Indo até o SIGA...");
  await page.goto('https://siga.cps.sp.gov.br/aluno/login.aspx');

  await page.waitForSelector('#vSIS_USUARIOID');
  await page.type('#vSIS_USUARIOID', userId);

  await page.waitForSelector('#vSIS_USUARIOSENHA');
  await page.type('#vSIS_USUARIOSENHA', password);

  await page.click('input.button');

  await page.waitForNavigation()

  console.log("Capturando uma imagem...");
  await page.screenshot({ path: `assets/screenshot2.png` });

  console.log("Fim da execução...");
  await browser.close();
})();