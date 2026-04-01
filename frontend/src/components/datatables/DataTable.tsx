import { flexRender } from "@tanstack/react-table";
import Styles from "../../components/datatables/datatable.module.css";
import StylesContent from "../../css/layouts/admin/layouts.module.css";
import { useState } from "react";

type Props = {
    table: any
}

export default function DataTables({ table }: Props) {
    const [openRow, setOpenRow] = useState(null);

    const toggleRow = (id: any) => {
        setOpenRow(prev => (prev === id ? null : id));
    };

    return (
        <section>
            <section className={Styles['table']}>
                <table className={Styles['data-table']}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => (
                                    <th key={header.id} className={Styles['data-th']}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={table.getAllColumns().length} style={{ textAlign: "center", padding: "20px" }}>
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row: any) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell: any) => (
                                        <td data-label={cell.column.columnDef.header} key={cell.id} className={Styles['data-td']}>
                                            <div key={cell.id} className={Styles['cell-row']}>
                                                <span className={Styles['cell-label']}>
                                                    {typeof cell.column.columnDef.header === "string"
                                                        ? cell.column.columnDef.header
                                                        : cell.column.id}
                                                </span>

                                                <span className={Styles['cell-value']}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </section>
    );
}