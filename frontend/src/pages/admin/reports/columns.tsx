import { createColumnHelper } from "@tanstack/react-table"

type Users = {
    username: string;
    total: number;
    closed: number;
    on_progress: number;
    reject: number;
    avg_rate: number;
    score_1: number;
    score_2: number;
    score_3: number;
    score_4: number;
    score_5: number;
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
    columnHelper.accessor("score_1", {
        header: "Score 1"
    }),
    columnHelper.accessor("score_2", {
        header: "Score 2"
    }),
    columnHelper.accessor("score_3", {
        header: "Score 3"
    }),
    columnHelper.accessor("score_4", {
        header: "Score 4"
    }),
    columnHelper.accessor("score_5", {
        header: "Score 5"
    }),
    columnHelper.accessor("avg_rate", {
        header: "AVG Rate"
    }),
]