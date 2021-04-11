import React from 'react';
import { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line } from "react-chartjs-2";

import styles from './Chart.module.css';

const Chart = () => {

    const [dailyData, setDailyData] = useState([]);

    //Cannot use async with useEffect, so create new constant function inside useEffect
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    });

    const lineChart = (
      dailyData.length
        ? (
          <Line
            data={{
                labels: dailyData(({ date }) => date),
                datasets: [{
                    data: dailyData(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                }],
            }}

          />
        ) : null
    );

    return (
      <div>
        {lineChart}
      </div>
    )
}

export default Chart;