import React from "react";
import Chart from "react-google-charts";

export default function AqiChart(props) {
  const  { data, city} = props;
  console.log(data)
  return(
    <div className="w-100">
      <Chart
        width={'100%'}
        height={'500'}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: 'string', label: 'Time' },
            'Air Quality Index',
          ],
         ...data
        ]}
        options={{
          chart: {
            title:
              `Live Air quality index - ${city}`,
          },
          width: 900,
          height: 500,
          series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: { axis: 'Time' },
            1: { axis: 'AirQualityIndex' },
          },
          axes: {
            // Adds labels to each axis; they don't have to match the axis names.
            y: {
              Time: { label: 'Air Quality Index' },
            },
          },
        }}
        rootProps={{ 'data-testid': '4' }}
      />
    </div>
  )
}