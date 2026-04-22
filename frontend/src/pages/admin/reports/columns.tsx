import { createColumnHelper } from "@tanstack/react-table"

type Users = {
    username: string;
    total: number;
    closed: number;
    on_progress: number;
    reject: number;
    avg_rate: number;
}

const columnHelper = createColumnHelper<Users>();

export const columns = () => [
    columnHelper.accessor("username", {
        header: "Username"
    }),
    columnHelper.accessor("total", {
        header: "Total Ticket"
    }),
    columnHelper.accessor("on_progress", {
        header: "On Progress"
    }),
    columnHelper.accessor("closed", {
        header: "Closed"
    }),
    columnHelper.accessor("reject", {
        header: "Reject"
    }),
    columnHelper.accessor("avg_rate", {
        header: "AVG Rate"
    }),
]