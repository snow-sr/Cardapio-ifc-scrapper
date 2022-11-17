import express from "express";
const app: express.Application = express();
const port: number = 8087;

import { getCardapio } from "./scrapper.js";

app.get("/cardapios", async (req, res) => {
  const data = await getCardapio();
  res.send(data);
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
