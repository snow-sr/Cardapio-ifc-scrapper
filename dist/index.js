"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
function parseReadingErrors(str) {
    return str.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}
(async () => {
    const browser = await puppeteer_1.default.launch({
        executablePath: "/var/lib/snapd/snap/bin/chromium"
    });
    const page = await browser.newPage();
    await page.goto('https://docs.google.com/document/d/e/2PACX-1vTPE7yf1xB9XSPUdyHoeumfUmiGb-ZHwUeOCXm_KFfinckJymM1l6ibp294v9fySmfSQ8LcJUItdNcj/pub');
    const trs = await page.evaluate(() => {
        const trs = document.querySelectorAll('tr');
        return Array.from(trs).map(tr => {
            const tds = tr.querySelectorAll('td');
            return Array.from(tds).map(td => td.innerText);
        });
    });
    class CardapioSemanal {
        constructor() {
            this.cardapio = [];
        }
    }
    class Cardapio {
        constructor(dia, pratoPrincipal, vegetariano, acompanhamento, salada, sobremesa) {
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
        const dia = new Cardapio(parseReadingErrors(trs[0][i]), parseReadingErrors(trs[1][i]), parseReadingErrors(trs[2][i]), parseReadingErrors(trs[3][i]), parseReadingErrors(trs[4][i]), parseReadingErrors(trs[5][i]));
        cardapioSemana.cardapio.push(dia);
    }
    console.log(cardapioSemana);
    await browser.close();
})();
//# sourceMappingURL=index.js.map