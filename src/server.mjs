import express from "express";
import router from "./routes/Routes.js";
import bodyParser from "body-parser";



const app = express();
const port = 3000;
const link = `https://localhost:${port}`;

// Configurar roteador
app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server online ~> ${link}`);
});
