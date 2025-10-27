import { Router } from "express";
import { fetchCountry, fetchRate } from "../controllers/fetch.controllers.js";
import dotenv from "dotenv";
dotenv.config();

const countryRouter = Router();

countryRouter.post("/refresh", async (req, res) => {
  const countries = await fetchCountry(process.env.URL1);

  const modifiedCountries = await countries.map(async (country) => {
    return {
      name: country.name,
      capital: country.capital,
      region: country.region,
      population: country.population,
      currency_code: country.currencies ? country.currencies[0].code : null,
      exchange_rate: (await fetchRate(
        process.env.URL2,
        country.currencies[0].code
      ))
        ? await fetchRate(process.env.URL2, country.currencies[0].code)
        : null,
      flag_url: country.flag,
    };
  });

  res.json({ countries: await Promise.all(modifiedCountries) });
});

export default countryRouter;
