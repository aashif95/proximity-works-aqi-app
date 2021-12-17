import React from "react";
import Chart from "react-google-charts";

export default function AqiComparisonChart(props) {
  const  { data } = props;
  return(
    <div className="w-100">
      <Chart
       width={'100%'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          [
            'Element',
            'Density',
            { role: 'style' },
            {
              sourceColumn: 0,
              role: 'annotation',
              type: 'string',
              calc: 'stringify',
            },
          ],
          ...data
        ]}
        options={{
          title: 'Air Quality Index comparison chart',
          bar: { groupWidth: '95%' },
          legend: { position: 'none' },
        }}
        // For tests
        rootProps={{ 'data-testid': '6' }}
      />
    </div>
  )
}