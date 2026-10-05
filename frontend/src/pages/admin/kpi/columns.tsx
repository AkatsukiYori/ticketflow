import { createColumnHelper } from "@tanstack/react-table";
import { Buttons } from "../../../components/buttons/Button";
import Styles from "../../../components/datatables/datatable.module.css";

type kpi = {
    id: number;
    name: string;
    verificator: string;
    weight: string;
    year_target: string;
    formula: string;
    target_status: string;
    kpi_description: {
        id: number;
        kpi_id: number;
        description: string;
    }[]
}

const columnHelper = createColumnHelper<kpi>();

export const kpiColumns = (
    onUpdate: (data: any) => void,
    onDelete: (id: number) => void,
    onDetail: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        size: 10,
        cell: ({ row }) => {
            return row.index + 1;
        }
    }),
    columnHelper.accessor("name", {
        header: "Name",
        size: 15
    }),
    columnHelper.display({
        header: "Description",
        size: 15,
        cell: ({ row }) => {
            const descriptions = row.original.kpi_description;

            return (
                <>
                    <div className={Styles['description-list']}>
                        {descriptions.map((item, index) => (
                            <div
                                key={index}
                                className={Styles['description-item']}
                            >
                                {item.description}
                            </div>
                        ))}
                    </div>
                </>
            )
        }
    }),
    columnHelper.accessor("weight", {
        header: "Weight",
        size: 10,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <>
                    {data.weight}%
                </>
            );
        }
    }),
    columnHelper.accessor("formula", {
        header: "Formula",
        size: 10
    }),
    columnHelper.accessor("year_target", {
        header: "Yearly Target",
        size: 10,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <>
                    {data.target_status === "qty" ? (
                        data.year_target
                    ) : (
                        data.year_target + "%"
                    )}
                </>
            )
        }
    }),
    columnHelper.accessor("verificator", {
        header: "Verificator",
        size: 10
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 10,
        cell: ({ row }) => {
            const { kpi_description, ...kpi } = row.original;
            const data = {...kpi, description: kpi_description.map((item) => item.description)}

            return (
                <>
                    <Buttons btnTitle="Edit" func="edit" onClick={() => onUpdate(data)}></Buttons>
                    <Buttons btnTitle="Delete" func="delete" onClick={() => onDelete(kpi.id)}></Buttons>
                    <Buttons btnTitle="Detail" func="detail" onClick={() => onDetail(kpi.id)}></Buttons>
                </>
            );
        }
    })
];