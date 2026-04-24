
import { CheckCircle, CircleEllipsis, SigmaSquare, XCircle } from "lucide-react";
import Styles from "../../../css/layouts/admin/layouts.module.css";
import { SelectOptions } from "../../../components/inputs/Input";
import { Bar, BarChart, CartesianGrid, Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DataTables from "../../../components/datatables/DataTable";
import { useApi } from "../../../hooks/useApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ErrorNotification } from "../../../components/notifications/notification";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";


export default function Report() {
    const { callApi } = useApi();
    
    const [dataTicket, setDataTicket] = useState<any[]>([]);
    const [userData, setUserData] = useState<any[]>([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [countStat, setCountStat] = useState({
        total: 0,
        pending: 0,
        on_progress: 0,
        closed: 0,
        reject: 0,
    });
    const [countRating, setCountRating] = useState({
        score_1: 0, 
        score_2: 0, 
        score_3: 0, 
        score_4: 0, 
        score_5: 0 ,
        total: 0
    });
    const [countPriority, setCountPriority] = useState({
        low: 0,
        mid: 0,
        high: 0
    });
    const [barChartData, setBarChartData] = useState<{name: string, total: number, fill: string}[]>([]);

    const fetchTicket = useCallback(async () => {
        try {
            const [resTicket, resCategory, resUsers] = await Promise.all([
                await callApi("get", "/tickets/get-all-ticket-logs"),
                await callApi("get", "/categories/get-all-categories"),
                await callApi("get", "/users/get-all-user")
            ]);

            const dateNow = new Date();
            const categoryMap: { [key: string]: number } = {};

            let stats = {
                total: 0,
                pending: 0,
                on_progress: 0,
                closed: 0,
                reject: 0,
            }

            let rating = {
                score_1: 0,
                score_2: 0,
                score_3: 0,
                score_4: 0,
                score_5: 0,
                total: 0
            }

            let priority = {
                low: 0,
                mid: 0,
                high: 0
            }

            const formattedUser = resUsers.map((user: any) => ({
                user_id: user.id,
                username: user.username
            }));

            const userStateMap: Record<string, any> = {};
            formattedUser.forEach((user: any) => {
                userStateMap[user.user_id] = {
                    username: user.username,
                    total: 0,
                    closed: 0,
                    on_progress: 0,
                    reject: 0,
                    rate_sum: 0,
                    rate_count: 0,
                    avg_rate: 0
                };
            });

            resCategory.forEach((category: any) => {
                categoryMap[category.name] = 0;
            })

            const myTicket = resTicket.filter((ticket: any) => {
                const ticketDate = new Date(ticket.report_date);
                const isThisYear = ticketDate.getFullYear() === dateNow.getFullYear();
                const isDeleted = ticket.deleted_at === null || ticket.deleted_at === undefined;

                return isThisYear && isDeleted;
            });
            myTicket.forEach((ticket: any) => {
                const status = ticket.status?.toLowerCase();
                const prio = ticket.priority?.toLowerCase();
                const isClosed = ticket.closed_at !== null && ticket.closed_at !== undefined;

                // Start Status ticket
                stats.total++;
                if(isClosed) {
                    stats.closed++;   
                } else if (!isClosed && status === "completed") {
                    stats.on_progress++;
                } else {
                    switch (status) {
                        case 'pending': stats.pending++; break;
                        case 'on_progress': stats.on_progress++; break;
                        case 'reject': stats.reject++; break;
                    }
                }
                // End Status Ticket

                // Start Rating
                let currentRatingSum = 0;
                let currentRatingCount = 0;
                if(Array.isArray(ticket.rating)) {
                    ticket.rating.forEach((rate: any) => {
                        const score = Number(rate.score);
                        rating.total++;
                        rating[`score_${score}` as keyof typeof rating]++;

                        currentRatingSum += score;
                        currentRatingCount++;
                    });
                }
                // End Rating

                // Start Priority
                if(priority.hasOwnProperty(prio)) priority[prio as keyof typeof priority]++;
                // End Priority

                // Start category
                const categoryName = ticket.fk_category_id?.name;
                if(categoryName && categoryMap.hasOwnProperty(categoryName)) {
                    categoryMap[categoryName]++;
                }
                // End Category

                const user_id = ticket.assign_to;
                if(userStateMap[user_id]) {
                    const user = userStateMap[user_id];
                    user.total++;
                    if(isClosed) {
                        user.closed++;

                        user.rate_sum += currentRatingSum;
                        user.rate_count += currentRatingCount;
                    } else {
                        switch (status) {
                            case "on_progress" : user.on_progress++; break;
                            case "reject" : user.reject++; break;
                        }
                    }
                }
            });

            const userRate = Object.values(userStateMap).map((rate: any) => {
                return {
                    ...rate,
                    avg_rate: rate.rate_count > 0 ? (rate.rate_sum / rate.rate_count).toFixed(1) : 0
                };
            });

            const formattedBarChartData = resCategory.map((category: any, index: number) => ({
                name: category.name,
                total: categoryMap[category.name],
                fill: ["#1B499D", "#3B82F6", "#EAB308", "#F97316", "#EF4444"][index % 5]
            }));

            const totalScore = rating.score_1 + rating.score_2 + rating.score_3 + rating.score_4 + rating.score_5;
            setCountRating({ ...rating, total: totalScore });
            setCountStat(stats);
            setCountPriority(priority);
            setBarChartData(formattedBarChartData);
            setDataTicket(myTicket);
            setUserData(userRate);
            setDataCategory(resCategory);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    const getPercentage = (scoreCount: number) => {
        if(countRating.total === 0) return 0;
        return (scoreCount / countRating.total) * 100;
    }

    const progressBar = () => {
        return (
            <>
                {[1, 2, 3, 4, 5].reverse().map((val) => {
                    const currentScoreCount = countRating[`score_${val}` as keyof typeof countRating];
                    const percentage = getPercentage(currentScoreCount as number);

                    return (
                        <section key={val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                            <span style={{ flex: 1.1 }}>Score {val} : </span>
                            <section style={{ flex: 4, overflow: "hidden", height: "22px", borderRadius: "4px", backgroundColor: "#F1F1F1" }}>
                                <section style={{ backgroundColor: "#1b499d", width: `${percentage}%`, height: "100%", transition: "width 0.3s" }}></section>
                            </section>
                            <span style={{ flex: 1 }}>({currentScoreCount})</span>
                        </section>
                    );
                })}
            </>
        );
    }

    // Start PieChart
    const dataPie = [
        { name: 'Low', value: countPriority.low || 0, fill: '#1b499d' },
        { name: 'Mid', value: countPriority.mid || 0, fill: '#EAB308' },
        { name: 'High', value: countPriority.high || 0, fill: '#EF4444' },
    ];
    // End PieChart

    // Start Get Year
    const startYear = 2026;
    const currentYear = new Date().getFullYear();
    const dynamicYear = [];
    for(let i = currentYear; i >= startYear; i--) {
        dynamicYear.push({
            label: i.toString(),
            value: i.toString(),
        });
    }
    // End Get Year

    useEffect(() => {
        fetchTicket();
    }, [fetchTicket]);

    const getColumns = useMemo(() => columns(), []);
    const table = useReactTable({
        data: userData,
        columns: getColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });

    return (
        <section className={Styles['main-content']}>
            <section className={Styles['content-header']}>  
                <section className={Styles['card-1']}>
                    <section className={Styles['card-content']}>
                        <section className={Styles['card-content-left']}>
                            <SigmaSquare size={50} style={{ marginLeft: "10px" }} />
                        </section>
                        <section className={Styles['card-content-right']}>
                            <h1>{countStat.total}</h1>
                            <p>Total Ticket</p>
                        </section>
                    </section>
                </section>
                <section className={Styles['card-2']}>
                    <section className={Styles['card-content']}>
                        <section className={Styles['card-content-left']}>
                            <CircleEllipsis size={50} style={{ marginLeft: "10px" }} />
                        </section>
                        <section className={Styles['card-content-right']}>
                            <h1>{countStat.pending}</h1>
                            <p>Pending</p>
                        </section>
                    </section>
                </section>
                <section className={Styles['card-2']}>
                    <section className={Styles['card-content']}>
                        <section className={Styles['card-content-left']}>
                            <CircleEllipsis size={50} style={{ marginLeft: "10px" }} />
                        </section>
                        <section className={Styles['card-content-right']}>
                            <h1>{countStat.on_progress}</h1>
                            <p>On Progress</p>
                        </section>
                    </section>
                </section>
                <section className={Styles['card-3']}>
                    <section className={Styles['card-content']}>
                        <section className={Styles['card-content-left']}>
                            <CheckCircle size={50} style={{ marginLeft: "10px" }} />
                        </section>
                        <section className={Styles['card-content-right']}>
                            <h1>{countStat.closed}</h1>
                            <p>Closed</p>
                        </section>
                    </section>
                </section>
                <section className={Styles['card-4']}>
                    <section className={Styles['card-content']}>
                        <section className={Styles['card-content-left']}>
                            <XCircle size={50} style={{ marginLeft: "10px" }} />
                        </section>
                        <section className={Styles['card-content-right']}>
                            <h1>{countStat.reject}</h1>
                            <p>Reject</p>
                        </section>
                    </section>
                </section>
            </section>
            <section className={Styles['filter']}>
                <section className={Styles['filter-content']}>
                    <h3 style={{ margin: 0 }}>Filter</h3>
                    <section className={Styles['filter-input']}>
                        <SelectOptions
                            label="All Month"
                            name="filter"
                            id="filter"
                            options={[
                                { label: "January", value: "1" },
                                { label: "February", value: "2" },
                                { label: "March", value: "3" },
                                { label: "April", value: "4" },
                                { label: "May", value: "5" },
                                { label: "June", value: "6" },
                                { label: "July", value: "7" },
                                { label: "August", value: "8" },
                                { label: "September", value: "9" },
                                { label: "October", value: "10" },
                                { label: "November", value: "11" },
                                { label: "December", value: "12" }
                            ]}
                        />
                        <SelectOptions
                            label="All Year"
                            name="filter"
                            id="filter"
                            options={dynamicYear}
                        />
                        <SelectOptions
                            label="Filter Category"
                            name="filter"
                            id="filter"
                            options={dataCategory.map((val: any) => (
                                { label: val.name, value: val.id }
                            ))}
                        />
                        <button type="button">Filter</button>
                        <button type="button">Download Excel</button>
                    </section>
                </section>
            </section>
            <section className={Styles['content-body']}>
                <section className={Styles['content-body-left']}>
                    <section className={Styles['category-chart']}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barChartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: -20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3" vertical={false} stroke="#F0F0F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                                <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />

                                <Bar dataKey="total" radius={[ 4, 4, 0, 0 ]} barSize={30}>
                                    {barChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill}></Cell>
                                    ))}
                                </Bar>
                                <Legend />
                                {/* <RechartsDevtools /> */}
                            </BarChart>
                        </ResponsiveContainer>
                    </section>
                    <section className={Styles['list-ticket']}>
                        <DataTables
                            table={table}
                            style={{ height: "auto" }}
                            customStyle={{
                                thFirst: { width: "180px" },
                                thLast: { width: "120px" },
                                tdFirst: { width: "180px" },
                                tdLast: { width: "120px" }
                            }}
                        />
                    </section>
                </section>
                <section className={Styles['content-body-right']}>
                    <section className={Styles['priority']}>
                        <h3 style={{ margin: 0 }}>Priority</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <Pie
                                    data={dataPie}
                                    dataKey="value" 
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="80%"
                                    paddingAngle={5}
                                    label={(entry) => entry.value}
                                >
                                    {dataPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none' }} 
                                />
                                <Legend iconType="circle" verticalAlign="bottom" />
                            </PieChart>
                        </ResponsiveContainer>
                    </section>
                    <section className={Styles['rating-card']}>
                        <h3 style={{ margin: 0 }}>Rating</h3>
                        <section className={Styles['rating-card-content']}>
                            {progressBar()}
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
}