import express from "express";
const app: express.Application = express();
const port: number = 8087;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
