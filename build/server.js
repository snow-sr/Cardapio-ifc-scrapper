var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
const app = express();
const port = 8087;
import { getCardapio } from "./scrapper.js";
app.get("/", (req, res) => {
    res.send("Hello World!\n This is the api for the IFC araquari cardapio, created by @snow-sr (joão felipi cardoso)\n for any questions, please see the Documentation at https://github.com/snow-sr/Cardapio-ifc-scrapper");
});
app.get("/cardapios", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getCardapio();
    res.send(data);
}));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
//# sourceMappingURL=server.js.map