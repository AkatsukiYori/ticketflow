import { createColumnHelper } from "@tanstack/react-table";
import { Buttons } from "../../../components/buttons/Button";
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
                    <Buttons label="" func="edit" onClick={() => onEdit(data)} btnTitle="Edit Documentation" />
                    <Buttons label="" func="delete" onClick={() => onDelete(data.id)} btnTitle="Delete Documentation" />
                </div>
            );
        }
    })
];