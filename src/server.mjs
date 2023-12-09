import express from "express";
import router from "./routes/Routes.js";




const app = express();
const port = 3000;
const link = `https://localhost:${port}`;

// Configurar roteador
app.use("/", router);


app.listen(port, () => {
  console.log(`Server online ~> ${link}`);
});
