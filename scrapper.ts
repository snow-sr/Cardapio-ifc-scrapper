import puppeteer from "puppeteer";

function parseReadingErrors(str: string): string {
  return str.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

export async function getCardapio(){
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto(
    "https://docs.google.com/document/d/e/2PACX-1vTPE7yf1xB9XSPUdyHoeumfUmiGb-ZHwUeOCXm_KFfinckJymM1l6ibp294v9fySmfSQ8LcJUItdNcj/pub"
  );

  // get all trs
  const trs = await page.evaluate(() => {
    const trs = document.querySelectorAll("tr");
    return Array.from(trs).map((tr) => {
      const tds = tr.querySelectorAll("td");
      return Array.from(tds).map((td) => td.innerText);
    });
  });

  class CardapioSemanal {
    cardapio: Array<CardapioDiario>;

    constructor() {
      this.cardapio = [];
    }
  }

  // create a class called cardapio
  class CardapioDiario {
    dia: string;
    pratoPrincipal: string;
    vegetariano: string;
    acompanhamento: string;
    salada: string;
    sobremesa: string;

    constructor(
      dia: string,
      pratoPrincipal: string,
      vegetariano: string,
      acompanhamento: string,
      salada: string,
      sobremesa: string
    ) {
      this.dia = dia;
      this.pratoPrincipal = pratoPrincipal;
      this.vegetariano = vegetariano;
      this.acompanhamento = acompanhamento;
      this.salada = salada;
      this.sobremesa = sobremesa;
    }
  }

  const cardapioSemana = new CardapioSemanal();

  for (let i = 1; i < 6; i++) {
    const dia = new CardapioDiario(
      parseReadingErrors(trs[0][i]),
      parseReadingErrors(trs[1][i]),
      parseReadingErrors(trs[2][i]),
      parseReadingErrors(trs[3][i]),
      parseReadingErrors(trs[4][i]),
      parseReadingErrors(trs[5][i])
    );
    cardapioSemana.cardapio.push(dia);
  }

  console.log(cardapioSemana);
  
  await browser.close();
  return cardapioSemana;
}

getCardapio();