import { createColumnHelper } from "@tanstack/react-table";
import Styles from "../../../components/datatables/datatable.module.css";
import { Buttons } from "../../../components/buttons/Button";

type User = {
    id: number;
    username: string;
}

const columnHelper = createColumnHelper<User>()

export const columns = (
    onEdit: (data: User) => void,
    onDelete: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1
    }),
    columnHelper.accessor("username", {
        header: "Username"
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div className={Styles['table-actions']}>
                    <Buttons label="" func="edit" onClick={() => onEdit(data)} btnTitle="Edit User" />
                    <Buttons label="" func="delete" onClick={() => onDelete(data.id)} btnTitle="Delete User" />
                </div>
            );
        }
    })
];