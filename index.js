import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import countryRouter from "./routes/countries.route.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.get("/", (_, res) => {
  res.send("Hello from the Server");
});

app.use("/countries", countryRouter);

app.listen(process.env.PORT, () => console.log("Server running..."));
