import axios from "axios";

const URL = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
  try {
    //Basic api call
    // const response = await axios.get(URL);

    //Destructure response
    const {data} = await axios.get(URL);
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate
    }

    //Another Way
    const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(URL);
    const modifiedResp = { confirmed, recovered, deaths, lastUpdate }

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (e) {

  }
}


export const fetchDailyData = async () => {
  try {
    //IN this case data is Array
    const { data } = await axios.get(URL + '/daily');

    console.log(data)

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.confirmed.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (e) {

  }
}
