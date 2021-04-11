import axios from "axios";

const URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let updatedUrl = URL;

  if(country) {
    updatedUrl = `${URL}/countries/${country}`
  }

  try {
    //Basic api call
    // const response = await axios.get(URL);

    //Destructure response
    const {data} = await axios.get(updatedUrl);
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate
    }

    //Another Way
    const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(updatedUrl);
    const modifiedResp = { confirmed, recovered, deaths, lastUpdate }

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
}

//Fetch DailyData from API
export const fetchDailyData = async () => {
  try {
    //IN this case data is Array
    const { data } = await axios.get(URL + '/daily');

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
}


//Fetch countries data from API
export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get(URL + '/countries');

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
}
