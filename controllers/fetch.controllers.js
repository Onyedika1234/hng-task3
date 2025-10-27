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

    return rate;
  } catch (error) {
    console.error("Error in fetching exchange rate");
  }
};
