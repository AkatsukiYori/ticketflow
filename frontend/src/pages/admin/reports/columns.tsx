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
        header: "Username",
        size: 100
    }),
    columnHelper.accessor("total", {
        header: "Total Ticket",
        size: 60
    }),
    columnHelper.accessor("on_progress", {
        header: "On Progress",
        size: 60
    }),
    columnHelper.accessor("closed", {
        header: "Closed",
        size: 60
    }),
    columnHelper.accessor("reject", {
        header: "Reject",
        size: 60
    }),
    columnHelper.accessor("score_1", {
        header: "Score 1",
        size: 60
    }),
    columnHelper.accessor("score_2", {
        header: "Score 2",
        size: 60
    }),
    columnHelper.accessor("score_3", {
        header: "Score 3",
        size: 60
    }),
    columnHelper.accessor("score_4", {
        header: "Score 4",
        size: 60
    }),
    columnHelper.accessor("score_5", {
        header: "Score 5",
        size: 60
    }),
    columnHelper.accessor("avg_rate", {
        header: "AVG Rate",
        size: 60
    }),
]