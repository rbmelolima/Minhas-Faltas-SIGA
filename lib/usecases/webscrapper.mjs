import 'dotenv/config';
import puppeteer from 'puppeteer';
import asyncCallWithTimeout from '../utils/asyncCallWithTimeout.mjs';

async function loginOnSIGA(page, userId, password) {
  await page.waitForSelector('#vSIS_USUARIOID');
  await page.type('#vSIS_USUARIOID', userId);
  await page.waitForSelector('#vSIS_USUARIOSENHA');
  await page.type('#vSIS_USUARIOSENHA', password);
  await page.click('input.button');
  await page.waitForNavigation();
}

async function getParcialAbsences(request, response) {
  try {
    const { userId, password } = request.body;

    const browser = await puppeteer.launch({
      'args': [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    await page.goto(
      'https://siga.cps.sp.gov.br/aluno/login.aspx'
    );

    await asyncCallWithTimeout(
      loginOnSIGA(page, userId, password),
      10000
    ).catch((_) => {
      throw "Timeout on SIGA";
    });

    await page.goto(
      "https://siga.cps.sp.gov.br/aluno/faltasparciais.aspx"
    );

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

    await browser.close();

    return response.status(200).json(absences);
  } catch(error) {
    if(error == "Timeout on SIGA") {
      return response.status(401).json({
        title: "Erro inesperado",
        error: "Ocorreu um erro inesperado ao tentar acessar o SIGA. Por favor, tente novamente mais tarde e verifique suas credenciais."
      });
    } else {
      return response.status(500).json({
        title: "Erro inesperado",
        error: error.toString(),
      });
    }

  }
}

export { getParcialAbsences };

