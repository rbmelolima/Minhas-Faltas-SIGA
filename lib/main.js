const puppeteer = require('puppeteer');

(async () => {
  console.log("Abrindo o browser...");
  const browser = await puppeteer.launch({ 
    headless: false,
    //slowMo: 100 //<- Diminuindo a velocidade da execução,
  });

  const page = await browser.newPage();

  console.log("Indo até o SIGA...");
  await page.goto('https://siga.cps.sp.gov.br/aluno/login.aspx');

  console.log("Capturando uma imagem...");
  await page.screenshot({ path: `assets/screenshot.png` });

  console.log("Fim da execução...");
  await browser.close();
})();