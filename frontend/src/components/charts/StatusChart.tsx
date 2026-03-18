// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
//     ResponsiveContainer
// } from "recharts";

// const colors = ["#facc15", "#fb923c", "#4ade80", "#ef4444"];
// type TicketStatus = {
//     name: string;
//     value: number;
// };

// const data: TicketStatus[] = [
//     { name: "Pending", value: 12 },
//     { name: "On Progress", value: 8 },
//     { name: "Completed", value: 25 },
//     { name: "Rejected", value: 3 }
// ];
// export default function TicketPieChart() {

//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//                 <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
//                     {data.map((entry, index) => (
//                         <Cell key={index} fill={colors[index]}></Cell>
//                     ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//         </ResponsiveContainer>
//     );
// }