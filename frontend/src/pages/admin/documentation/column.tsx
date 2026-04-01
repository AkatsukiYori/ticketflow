import { createColumnHelper } from "@tanstack/react-table";
import { UpdateButton, DeleteButton } from "../../../components/buttons/Button";
import Styles from "../../../components/datatables/datatable.module.css";

type Documentation = {
    id: number;
    category_id: number;
    title: string;
    description: string;
}

const columnHelper = createColumnHelper<Documentation>();

export const columns = (
    onEdit: (data: Documentation) => void,
    onDelete: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1
    }),
    columnHelper.accessor("title", {
        header: "Title"
    }),
    columnHelper.accessor("description", {
        header: "Description"
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div className={Styles['table-actions']}>
                    <UpdateButton func="edit" onClick={() => onEdit(data)} />
                    <DeleteButton func="delete" onClick={() => onDelete(data.id)} />
                </div>
            );
        }
    })
];