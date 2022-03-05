import puppeteer from 'puppeteer';
import 'dotenv/config';
import {
  setTimeout
} from 'timers/promises';

async function loginOnSIGA(page, userId, password) {
  //setTimeout(5000, async () => {
  console.log("-> Fazendo login no SIGA");
  await page.waitForSelector('#vSIS_USUARIOID');
  await page.type('#vSIS_USUARIOID', userId);
  await page.waitForSelector('#vSIS_USUARIOSENHA');
  await page.type('#vSIS_USUARIOSENHA', password);
  await page.click('input.button');
  await page.waitForNavigation();
  //});
}

async function getParcialAbsences(request, response) {
  try {
    const { userId, password } = request.body;
    console.table({ userId, password });

    console.log("-> Abrindo o browser");
    const browser = await puppeteer.launch({
      headless: false, // <- abre a janela do navegador
      //slowMo: 100 //<- Diminuindo a velocidade da execução,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    console.log("-> Indo até o SIGA");
    await page.goto('https://siga.cps.sp.gov.br/aluno/login.aspx');

    await loginOnSIGA(page, userId, password);

    console.log("-> Indo para a página de faltas parciais");
    await page.goto("https://siga.cps.sp.gov.br/aluno/faltasparciais.aspx");

    console.log("-> Pegando as disciplinas");
    const rows = await page.$$eval("#Grid1ContainerTbl tbody > tr[id^='Grid']",
      (trs) => trs.map((tr) => tr.innerText)
    );

    const absences = new Object();
    rows.forEach((row) => {
      const discipline = row.split('\t');
      absences[discipline[0]] = {
        abbreviation: discipline[0],
        name: discipline[1],
        presences: discipline[2],
        absences: discipline[3],
      };
    });

    console.log("-> Fim da execução");
    await browser.close();

    return response.status(200).json(absences);
  } catch(error) {
    console.error(error);
    return response.status(400).json({
      title: "Erro inesperado",
      error: error.message,
    });
  }
}

export { getParcialAbsences };