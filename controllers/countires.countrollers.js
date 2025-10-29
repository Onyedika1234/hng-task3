import { fetchAllRate, fetchCountry } from "./fetch.controllers.js";
import prisma from "../utils/prisma.js";
import {
  validateName,
  validate_gdp,
} from "../middlewares/validate.middleware.js";
export const postCountry = async (req, res) => {
  try {
    const countries = await fetchCountry(
      "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies"
    );

    if (!countries)
      return res.status(503).json({
        error: "External data source unavailable",
        details:
          "Could not fetch data from https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies",
      });
    const rateData = await fetchAllRate(
      "https://open.er-api.com/v6/latest/USD"
    );

    if (!rateData)
      return res.status(503).json({
        error: "External data source unavailable",
        details:
          "Could not fetch data from https://open.er-api.com/v6/latest/USD",
      });

    const modifiedCountries = countries.map((country) => {
      const code = country.currencies?.[0]?.code?.toUpperCase() || null;
      const exchangeRate = code && rateData?.[code] ? rateData[code] : null;

      return {
        name: validateName(country.name),
        capital: country.capital,
        region: country.region,
        population: country.population,
        currency_code: code,
        exchange_rate: exchangeRate,
        estimated_gdp: validate_gdp(
          currency_code,
          countries.currencies
        ).toFixed(1),
        flag_url: country.flag,
      };
    });

    await Promise.allSettled(
      modifiedCountries.map((country) =>
        prisma.country.upsert({
          where: { name: country.name },
          update: { ...country },
          create: { ...country },
        })
      )
    );

    res.status(200).json({ message: "Countries data refreshed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCountries = async (req, res) => {
  const { region, currency } = req.query;

  try {
    const query = {
      region: region ? region : undefined,
      currency: currency ? currency : undefined,
    };

    const filteredCountry = await prisma.country.findMany({
      where: {
        region: query.region,
        currency_code: query.currency,
      },
    });

    if (!filteredCountry)
      return res.status(404).json({ error: "Country not found" });

    res.status(200).json(filteredCountry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStatus = async (req, res) => {
  try {
    const countries = await prisma.country.findMany();
    const countryLength = countries.length;
    const timeStamp = countries[0].last_refreshed_at;

    res.status(200).json({
      total_country: countryLength,
      last_refreshed: timeStamp,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) return res.status(400).json({ error: "Validation failed" });

    const country = await prisma.country.findUnique({
      where: { name },
    });

    if (!country) return res.status(404).json({ error: "Country not found" });

    res.status(200).json(country);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteCountry = async (req, res) => {
  const { name } = req.params;
  try {
    const deleted = await prisma.country.delete({
      where: { name },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
