export const fetchCountry = async (url) => {
  try {
    const data = await fetch(url);
    const res = data.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error in fetching data");
  }
};

export const fetchRate = async (url, code) => {
  try {
    if (code === null) return;

    const data = await fetch(url);
    const res = await data.json();

    const mainCode = code.toUpperCase();

    return res.rates[mainCode] || null;
  } catch (error) {
    console.error("Error in fetching exchange rate");
    return error;
  }
};

export const fetchAllRate = async (url) => {
  try {
    const data = await fetch(url);
    const res = await data.json();

    return res.rates;
  } catch (error) {
    console.error("Error in fetching all exchange rates");
  }
};
