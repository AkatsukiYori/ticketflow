import { flexRender } from "@tanstack/react-table";
import "../../components/datatables/datatable.css";

type Props = {
    table: any
}

export default function DataTables({ table }: Props) {
    return (
        <table className="data-table">
            <thead>
                {table.getHeaderGroups().map((headerGroup: any) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => (
                            <th key={header.id} className="data-th">
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
                                <td key={cell.id} className="data-td">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}