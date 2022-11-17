var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
function parseReadingErrors(str) {
    return str.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}
export function getCardapio() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        yield page.goto("https://docs.google.com/document/d/e/2PACX-1vTPE7yf1xB9XSPUdyHoeumfUmiGb-ZHwUeOCXm_KFfinckJymM1l6ibp294v9fySmfSQ8LcJUItdNcj/pub");
        // get all trs
        const trs = yield page.evaluate(() => {
            const trs = document.querySelectorAll("tr");
            return Array.from(trs).map((tr) => {
                const tds = tr.querySelectorAll("td");
                return Array.from(tds).map((td) => td.innerText);
            });
        });
        class CardapioSemanal {
            constructor() {
                this.cardapio = [];
            }
        }
        // create a class called cardapio
        class CardapioDiario {
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
            const dia = new CardapioDiario(parseReadingErrors(trs[0][i]), parseReadingErrors(trs[1][i]), parseReadingErrors(trs[2][i]), parseReadingErrors(trs[3][i]), parseReadingErrors(trs[4][i]), parseReadingErrors(trs[5][i]));
            cardapioSemana.cardapio.push(dia);
        }
        console.log(cardapioSemana);
        yield browser.close();
        return cardapioSemana;
    });
}
getCardapio();
//# sourceMappingURL=scrapper.js.map