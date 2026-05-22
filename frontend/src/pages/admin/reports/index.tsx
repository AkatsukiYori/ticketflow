
import { CheckCircle, CircleEllipsis, SigmaSquare, XCircle } from "lucide-react";
import Styles from "../../../css/layouts/admin/layouts.module.css";
import { SelectOptions } from "../../../components/inputs/Input";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DataTables from "../../../components/datatables/DataTable";
import { useApi } from "../../../hooks/useApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Notifications } from "../../../components/notifications/notification";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { Buttons } from "../../../components/buttons/Button";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


export default function Report() {
    const { callApi } = useApi();

    const [filterMonth, setFilterMonth] = useState("");
    const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());
    const [filterCategory, setFilterCategory] = useState("");
    const [triggerFilter, setTriggerFilter] = useState(0);
    const [filteredTicket, setFilteredTicket] = useState<any[]>([]);
    
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
    const [pieChartCategory, setPieChartCategory] = useState<{name: string, value: number, fill: string}[]>([]);
    const [monthlyTicketData, setMonthlyTicketData] = useState<{name: string, total: number, fill: string}[]>([]);
    const [deptChartData, setDeptChartData] = useState<any[]>([]);
    const colors = ["#1B499D", "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#C084FC"];

    const fetchTicket = useCallback(async () => {
        try {
            const [resTicket, resCategory, resUsers] = await Promise.all([
                await callApi("get", "/tickets/get-all-ticket-logs"),
                await callApi("get", "/categories/get-all-categories"),
                await callApi("get", "/users/get-all-user")
            ]);

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
                    avg_rate: 0,
                    score_1: 0,
                    score_2: 0,
                    score_3: 0,
                    score_4: 0,
                    score_5: 0
                };
            });

            resCategory.forEach((category: any) => {
                categoryMap[category.name] = 0;
            });

            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Dec"];
            const chartData = months.map(m => ({ name: m, total: 0 }));
            const departmentMap: Record<string, number> = {};

            const myTicket = resTicket.filter((ticket: any) => {
                const ticketDate = new Date(ticket.report_date);
                const isThisMonth = (!filterMonth || ticketDate.getMonth() === Number(filterMonth));
                const isThisYear = (!filterYear || ticketDate.getFullYear() === Number(filterYear));
                const isDeleted = ticket.deleted_at === null || ticket.deleted_at === undefined;
                const isMatchCategory = filterCategory ? ticket.fk_category_id.name === filterCategory : true;

                return isThisMonth && isThisYear && isDeleted && isMatchCategory;
            });

            setFilteredTicket(myTicket);
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

                    if(Array.isArray(ticket.rating)) {
                        ticket.rating.forEach((rate: any) => {
                            const score = Number(rate.score);
                            if(score >= 1 && score <= 5) {
                                user[`score_${score}`]++;
                            }
                        })
                    }

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

                // Start Monthly Ticket Data
                const date = new Date(ticket.report_date);
                const monthIndex = date.getMonth();
                chartData[monthIndex].total += 1;
                // End Monthly Ticket Data

                // Start Dept Chart Data
                const deptName = ticket?.fk_department?.name || "Lainnnya";
                departmentMap[deptName] = (departmentMap[deptName] || 0) + 1;
                // End Dept Chart Data
            });

            const userRate = Object.values(userStateMap).map((rate: any) => {
                return {
                    ...rate,
                    avg_rate: rate.rate_count > 0 ? (rate.rate_sum / rate.rate_count).toFixed(1) : 0
                };
            });

            const formattedPieChartCategory = resCategory.map((category: any, index: number) => ({
                name: category.name,
                value: categoryMap[category.name],
                fill: colors[index % colors.length]
            }));

            const formattedMonthlyTicketData = chartData.map((item, index) => ({
                ...item,
                fill: colors[index % colors.length]
            }));

            const formattedDeptData = Object.entries(departmentMap).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);

            const totalScore = rating.score_1 + rating.score_2 + rating.score_3 + rating.score_4 + rating.score_5;
            setCountRating({ ...rating, total: totalScore });
            setCountStat(stats);
            setCountPriority(priority);
            setPieChartCategory(formattedPieChartCategory);
            setUserData(userRate);
            setDataCategory(resCategory);
            setMonthlyTicketData(formattedMonthlyTicketData);
            setDeptChartData(formattedDeptData);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi, triggerFilter]);

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
    const dataPiePriority = [
        { name: 'Low', value: countPriority.low || 0, fill: '#1b499d' },
        { name: 'Mid', value: countPriority.mid || 0, fill: '#EAB308' },
        { name: 'High', value: countPriority.high || 0, fill: '#EF4444' },
    ];
    // End PieChart

    // Start Get Year
    const startYear = 2026;
    const currentYear = new Date().getFullYear();
    const dynamicYear = [];
    dynamicYear.push({
        label: "All Year",
        value: ""
    });
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

    // Start Export
    const exportTicket = async (): Promise<void> => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report Tickets");

        worksheet.columns = [
            { key: "username", width: 20 },
            { key: "status", width: 20 },
            { key: "handle_by", width: 20 },
            { key: "ticket_no", width: 30 },
            { key: "ticket_title", width: 40 },
            { key: "category", width: 20 },
            { key: "department", width: 30 },
            { key: "modul", width: 30 },
            { key: "sub_modul", width: 30 },
            { key: "problem", width: 100 },
            { key: "priority", width: 20 },
            { key: "location", width: 30 },
            { key: "wa_no", width: 30 },
            { key: "note", width: 40 },
            { key: "report_date", width: 30 },
            { key: "estimate", width: 30 },
            { key: "closed_at", width: 30 },
            { key: "reopened_at", width: 30 },
            { key: "rejected_at", width: 30 },
            { key: "deleted_at", width: 30 },
        ];

        const titleRow = worksheet.getRow(1);
        titleRow.values = ["Report Tickets"];
        titleRow.font = { size: 16, bold: true };
        worksheet.mergeCells("A1:S1");
        
        const dateRow = worksheet.getRow(2);
        dateRow.values = [new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            timeZone: "Asia/Jakarta"
        })];
        worksheet.mergeCells("A2:S2");

        const headerRow = worksheet.getRow(4);
        headerRow.values = [
            "User",
            "Status",
            "Handle By",
            "Ticket No",
            "Ticket Title",
            "Category",
            "Department",
            "Module",
            "Sub Module",
            "Problem",
            "Priority",
            "Location",
            "Whatsapp No",
            "Note",
            "Report Date",
            "Estimate",
            "Closed At",
            "Reopened At",
            "Rejected At",
            "Deleted At",
        ];

        worksheet.eachRow((row, _rowNumber) => {
            row.eachCell((cell, _celNumber) => {
                cell.alignment = { wrapText: true, vertical: "middle" }
            })
        });

        headerRow.height = 25;
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "1B499D" },
            };
            cell.font = {
                bold: true,
                color: { argb: "FFFFFF" }
            };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
            cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true }
        });

        filteredTicket.forEach((ticket) => {
            worksheet.addRow({
                username: ticket.fk_member?.username || "Unassigned",
                status: (ticket.status.split("_").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")),
                handle_by: ticket.fk_users_id?.username || "Unassigned",
                ticket_no: ticket.ticket_no,
                ticket_title: ticket.ticket_title,
                category: ticket.fk_category_id?.name || "-",
                department: ticket.fk_department?.name || "-",
                modul: ticket?.modul || "-",
                sub_modul: ticket?.sub_modul || "-",
                problem: ticket.problem,
                priority: ticket?.priority?.toUpperCase() || "-",
                location: ticket.location || "-",
                wa_no: ticket.no_wa || "-",
                note: ticket?.note || "-",
                report_date: new Date(ticket.report_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta"
                }).replace(/\./g, ":"),
                estimate: ticket.estimate ? new Date(ticket.estimate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta"
                }).replace(/\./g, ":") : "-",
                closed_at: ticket.closed_at ? new Date(ticket.closed_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta"
                }).replace(/\./g, ":") : "-",
                reopened_at: ticket.reopened_at ? new Date(ticket.reopened_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta"
                }).replace(/\./g, ":") : "-",
                rejected_at: ticket.rejected_at ? new Date(ticket.rejected_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta"
                }).replace(/\./g, ":") : "-",
                deleted_at: ticket.deleted_at ? new Date(ticket.deleted_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta"
                }).replace(/\./g, ":") : "-"
            });
        });

        worksheet.eachRow((row, rowNumber) => {
            if(rowNumber > 4) {
                row.eachCell((cell, _cellNumber) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                    cell.alignment = { wrapText: true, vertical: "middle" }
                })
            }
        })

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `Report-tickets-${new Date().getTime()}.xlsx`);
    }
    // End Expprt

    return (
        <>
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
                                name="filter"
                                id="filter"
                                placeholder="All Month"
                                searchAble={true}
                                value={filterMonth}
                                onChangeSelect={(e) => setFilterMonth(e ? e.value : "")}
                                options={[
                                    { label: "All Month", value: "" },
                                    { label: "January", value: "0" },
                                    { label: "February", value: "1" },
                                    { label: "March", value: "2" },
                                    { label: "April", value: "3" },
                                    { label: "May", value: "4" },
                                    { label: "June", value: "5" },
                                    { label: "July", value: "6" },
                                    { label: "August", value: "7" },
                                    { label: "September", value: "8" },
                                    { label: "October", value: "9" },
                                    { label: "November", value: "10" },
                                    { label: "December", value: "11" }
                                ]}
                            />
                            <SelectOptions
                                name="filter"
                                id="filter"
                                placeholder="All Year"
                                searchAble={true}
                                value={filterYear}
                                onChangeSelect={(e) => setFilterYear(e ? e.value : "")}
                                options={dynamicYear}
                            />
                            <SelectOptions
                                name="filter"
                                id="filter"
                                placeholder="Filter Category"
                                searchAble={true}
                                value={filterCategory}
                                onChangeSelect={(e) => setFilterCategory(e ? e.value : "")}
                                options={[
                                    { label: "All Category", value: "" },
                                    ...dataCategory.map((val: any) => ({
                                        label: val.name,
                                        value: val.name
                                    }))  
                                ]}
                            />
                            <Buttons label="Filter" func="filter" btnTitle="Filter" onClick={() => setTriggerFilter(prev => prev + 1)} />
                            <Buttons label="Export Excel" func="export-excel" btnTitle="Export Excel" onClick={exportTicket} />
                        </section>
                    </section>
                </section>
                <section className={Styles['content-body']}>
                    <section className={Styles['content-body-left']}>
                        <section className={Styles['ticket-chart']}>
                            <h3>Tickets</h3>
                            <section style={{ width: "100%", height: "350px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={monthlyTicketData}
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
                                            {monthlyTicketData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill}></Cell>
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </section>
                        </section>
                        <section className={Styles['split-charts']}>
                            <section className={Styles['category-chart']}>
                                <h3>Category</h3>
                                <section style={{ width: "100%", height: "350px" }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                            <Pie
                                                data={pieChartCategory}
                                                dataKey="value" 
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius="60%"
                                                outerRadius="80%"
                                                paddingAngle={5}
                                                label={(entry) => entry.value}
                                            >
                                                {pieChartCategory.map((entry, index) => (
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
                            </section>
                            <section className={Styles['department-chart']}>
                                <h3>Department</h3>
                                <section style={{ width: "100%", height: "350px" }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={deptChartData}
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
                                            {deptChartData.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}></Cell>
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className={Styles['content-body-right']}>
                        <section className={Styles['priority']}>
                            <h3 style={{ margin: 0 }}>Priority</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                    <Pie
                                        data={dataPiePriority}
                                        dataKey="value" 
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="60%"
                                        outerRadius="80%"
                                        paddingAngle={5}
                                        label={(entry) => entry.value}
                                    >
                                        {dataPiePriority.map((entry, index) => (
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
                <section className={Styles['list-ticket']}>
                    <h3>Users</h3>
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
        </>
    );
}