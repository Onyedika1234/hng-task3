import { Router } from "express";
import { fetchCountry, fetchRate } from "../controllers/fetch.controllers.js";
import dotenv from "dotenv";
import {
  deleteCountry,
  getCountries,
  getCountryByName,
  getStatus,
  postCountry,
} from "../controllers/countires.countrollers.js";
dotenv.config();

const countryRouter = Router();

countryRouter.get("/", getCountries);

countryRouter.post("/refresh", postCountry);

countryRouter.get("/status", getStatus);

countryRouter.get("/:name", getCountryByName);

countryRouter.delete("/:name", deleteCountry);

export default countryRouter;
