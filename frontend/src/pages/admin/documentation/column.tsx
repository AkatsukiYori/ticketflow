import { createColumnHelper } from "@tanstack/react-table";
import { Buttons } from "../../../components/buttons/Button";
import Styles from "../../../components/datatables/datatable.module.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Documentation = {
    id: number;
    category_id: number;
    title: string;
    description: string;
    documentation_files: {
        filename: string
    };
}

const columnHelper = createColumnHelper<Documentation>();

export const columns = (
    onEdit: (data: Documentation) => void,
    onDelete: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        size: 10,
        cell: ({ row }) => row.index + 1
    }),
    columnHelper.accessor("title", {
        header: "Title",
        size: 200
    }),
    columnHelper.accessor("description", {
        header: "Description",
        size: 400
    }),
    columnHelper.accessor((row) => row.documentation_files, {
        id: "documentation_files",
        header: "Attachment",
        size: 150,
        cell: (info) => {
            const file = info.getValue();
            
            if(!file) {
                return <span>No File</span>
            }

            return (
                <>
                    <Zoom>
                        <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/documentation/${file.filename}`}
                            alt="Attachment"
                            width="auto"
                            height={100}
                            style={{ objectFit: "contain" }}
                        />
                    </Zoom>
                </>
            );
        }
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 60,
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
