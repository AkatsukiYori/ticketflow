import { createColumnHelper } from "@tanstack/react-table";
import { UpdateButton, DeleteButton } from "../../../components/buttons/Button";

type Category = {
    id: number;
    name: string;
}

const columnHelper = createColumnHelper<Category>();

export const columns = (
    onEdit: (data: Category) => void,
    onDelete: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1
    }),
    columnHelper.accessor("name", {
        header: "Name"
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div className="table-actions">
                    <UpdateButton func="edit" onClick={() => onEdit(data)} />
                    <DeleteButton func="delete" onClick={() => onDelete(data.id)} />
                </div>
            );
        }
    })
];