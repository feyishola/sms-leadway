import React, { useEffect, useState } from 'react'
import { LineChart, PieChart, Pie, Line, YAxis, XAxis, CartesianGrid, Tooltip , ResponsiveContainer, Legend, Cell} from "recharts";

const dataArry = [
    {
        day:"mon",
        sales:50,
        buy:25
    },
    {
        day:"tue",
        sales:60,
        buy:60
    },
    {
        day:"wed",
        sales:90,
        buy:40
    },
    {
        day:"thur",
        sales:20,
        buy:30
    },
    {
        day:"fri",
        sales:150,
        buy:50
    },
    {
        day:"sat",
        sales:50,
        buy:10
    },
    {
        day:"sun",
        sales:0,
        buy:0
    }
]

const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Charts = () => {
    const [data, setData] = useState(dataArry);

    useEffect(()=>{
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((day) => ({
          ...day,
          sales: Math.floor(Math.random() * 5000) + 1000,
          buy: Math.floor(Math.random() * 5000) + 1000,
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
    },[]);

  return (
    <div style={{width:"70vw", height:"70vh", margin:"0 auto"}}>
        <ResponsiveContainer width={'100%'} height={"100%"}>
            <LineChart data={data} width={400} height={400}>
                <Legend/>
                <XAxis dataKey={'day'}/>
                <YAxis/>
                <Tooltip/>
                <CartesianGrid strokeDasharray={"5 5"}/>
                <Line dataKey={'sales'} type={"monotone"}/>
                <Line dataKey={'buy'} type={"monotone"} stroke='green'/>
            </LineChart>

            <PieChart width={600} height={600}>
                <Legend layout='vertical'/>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={150} fill="#82ca9d" labelLine={false}
            label={renderCustomizedLabel}>
                {data01.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        
    </div>
  )
}

export default Charts

// <ResponsiveContainer width="100%" height="50%">
//             <PieChart width={600} height={600}>
//                 <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#82ca9d" labelLine={false}
//             label={renderCustomizedLabel}>
//                 {data01.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//                 </Pie>
//             </PieChart>
//         </ResponsiveContainer>