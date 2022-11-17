import express from "express";
const app: express.Application = express();
const port: any =  process.env.PORT || 8087;

import { getCardapio } from "./scrapper.js";

app.get("/", (req, res) => {
  res.send("Hello World!\n This is the api for the IFC araquari cardapio, <br/> created by @snow-sr (joão felipi cardoso) <br/> for any questions, please see the Documentation at https://github.com/snow-sr/Cardapio-ifc-scrapper");
})

app.get("/cardapios", async (req, res) => {
  const data = await getCardapio();
  res.send(data);
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
