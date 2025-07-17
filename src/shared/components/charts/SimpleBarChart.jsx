import React from 'react';
import {
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer
} from 'recharts';

const SimpleBarChart = ({
     data,
     dataKey,
     nameKey,
     barColor = '#8884d8',
     title = '',
     subtitle = '',
     height = 300
}) => {
     // Custom tooltip component
     const CustomTooltip = ({ active, payload, label }) => {
          if (active && payload && payload.length) {
               return (
                    <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
                         <p className="font-semibold">{label}</p>
                         <p className="text-sm">
                              <span className="font-medium">Value:</span> {payload[0].value}
                         </p>
                    </div>
               );
          }
          return null;
     };

     return (
          <div className="w-full h-full space-y-2">
               {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
               {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}

               <ResponsiveContainer width="100%" height={height}>
                    <BarChart
                         data={data}
                         margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 10,
                         }}
                    >
                         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                         <XAxis
                              dataKey={nameKey}
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                         />
                         <YAxis
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                              tickFormatter={(value) => {
                                   if (value >= 1000) return `$${value / 1000}k`;
                                   return `$${value}`;
                              }}
                         />
                         <Tooltip content={<CustomTooltip />} />
                         <Legend />
                         <Bar
                              dataKey={dataKey}
                              name={dataKey.replace(/_/g, ' ')}
                              fill={barColor}
                              radius={[4, 4, 0, 0]}
                         />
                    </BarChart>
               </ResponsiveContainer>
          </div>
     );
};

export default SimpleBarChart;