export const validateName = (name) => {
  if (!name) return;
  return name;
};

export const validate_gdp = (code, currencyArray) => {
  if (code === null) {
    return null;
  } else if (!currencyArray.length > 0) {
    return 0;
  } else {
    return (country.population * 1000) / exchangeRate;
  }
};
