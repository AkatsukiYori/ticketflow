import { useState } from "react";
import { NewButton, RefreshButton } from "../../../components/buttons/Button";
import { InputText } from "../../../components/inputs/Input";

export default function Documentation() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [data, setData] = useState<any[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    return (
        <div>
            <div className="filter" style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputText name="search" id="search" placeholder="Search..." />
                    <RefreshButton />
                </section>
                <section>
                    <NewButton label="Documentation" func="add"></NewButton>
                </section>
            </div>
            {/* <DataTables
                table={table}
            /> */}

            {/* <CategoryModal open={open} mode={mode} data={selected} onClose={() => setOpen(false)} onSubmit={handleSubmit} onUpdate={handleUpdate} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => deleteID && handleDelete(deleteID)} isDeleted={true} /> */}
        </div>
    );
}