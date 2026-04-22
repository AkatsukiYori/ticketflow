import { flexRender } from "@tanstack/react-table";
import Styles from "../../components/datatables/datatable.module.css";
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from "lucide-react";

type Props = {
    table: any,
    style?: React.CSSProperties,
    customStyle?: any
}

export default function DataTables({ table, style, customStyle }: Props) {
    return (
        <section>
            <section className={Styles['table']}>
                <table className={Styles['data-table']}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header: any, index: number) => {
                                    const isFirst = index === 0;
                                    const isLast = index === headerGroup.headers.length - 1;

                                    return (
                                        <th
                                            key={header.id}
                                            className={Styles['data-th']}
                                            style={{
                                                textAlign: "center",
                                                verticalAlign: "center",
                                                width: isFirst ? (customStyle?.thFirst.width || "40px") : isLast ? (customStyle?.thLast.width || "100px") : "auto"
                                            }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody style={style}>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={table.getAllColumns().length} style={{ textAlign: "center", padding: "20px" }}>
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row: any) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell: any, index: number) => {
                                        const isFirst = index === 0;
                                        const isLast = index === row.getVisibleCells().length - 1;

                                        return (
                                            <td
                                                data-label={cell.column.columnDef.header}
                                                key={cell.id}
                                                className={Styles['data-td']}
                                                style={{
                                                    textAlign: "center",
                                                    width: isFirst ? (customStyle?.tdFirst.width || "40px") : isLast ? (customStyle?.tdLast.width || "100px") : "auto"
                                                }}
                                            >
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
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Fungsi pagination */}
                <div className={Styles.paginationContainer}>
                    <div className={Styles.paginationInfo}>
                        Showing {table.getRowModel().rows.length} of {table.getCoreRowModel().rows.length} entries
                    </div>
                    
                    <div className={Styles.paginationControls}>
                        <button 
                            onClick={() => table.setPageIndex(0)} 
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft size={18} />
                        </button>
                        <button 
                            onClick={() => table.previousPage()} 
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <span className={Styles.pageIndicator}>
                            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
                        </span>

                        <button 
                            onClick={() => table.nextPage()} 
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button 
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight size={18} />
                        </button>
                    </div>

                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className={Styles.pageSizeSelect}
                    >
                        {[10, 20, 30, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
        </section>
    );
}