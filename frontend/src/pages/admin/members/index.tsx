import Styles from "../../../css/layouts/admin/layouts.module.css";
import { InputText } from "../../../components/inputs/Input";
import { Buttons } from "../../../components/buttons/Button";
import DataTables from "../../../components/datatables/DataTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import MemberModal from "../../../components/modals/users/MemberModal";
import { columns } from "./column";
import { useApi } from "../../../hooks/useApi";
import { Notifications } from "../../../components/notifications/notification";
import { socket } from "../../../api/socket";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";

export default function Members() {
    const { callApi } = useApi();

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selected, setSelected] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});
    const [deleteID, setDeleteID] = useState<number | null>(null);

    const [globalFilter, setGlobalFilter] = useState("");

    const fetchUsers = useCallback(async () => {
        try {
            const result = await callApi("get", "/members/get-all-members");
            setData(result);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false })
        }
    }, [callApi]);

    function handleModalCreate() {
        setMode("create");
        setSelected("");
        setOpen(true);
    }

    function handleModalUpdate(row: any) {
        setMode("edit");
        setSelected(row);
        setOpen(true);
    }

    function handleModalDelete(id: number) {
        setConfirmOpen(true);
        setDeleteID(id);
    }

    async function handleSubmit(data: any) {
        try {
            const res = await callApi("post", `/members/new-members`, data);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpen(false);
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                Notifications({ message: "Please fill in all required fields.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    }

    async function handleUpdate(data: any) {
        try {
            const res = await callApi("put", `/members/update-members/${data.id}`, data);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpen(false);
            setFieldError({});
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                Notifications({ message: "Please fill in all required fields.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    }

    async function handleDelete(id: number) {
        if(!id) return;

        try {
            const res = await callApi("put", `/members/delete-members/${id}`);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setConfirmOpen(true);
            setDeleteID(null);
        } catch (error: any) {
            Notifications({ message: "Something went wrong.", variantType: "success", persist: false });
        }
    }

    const getColumns = useMemo(() => columns(handleModalUpdate, handleModalDelete), []);
    const table = useReactTable({
        data,
        columns: getColumns,
        state: {
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });

    useEffect(() => {
        fetchUsers();

        const handleMembersChange = () => {
            fetchUsers();
        }

        socket.on("members-change", handleMembersChange);

        return () => {
            socket.off("members-change", handleMembersChange);
        }
    }, [fetchUsers]);

    return (
        <section className={Styles['main-content']}>
            <section className={Styles['content-header']}>
                <section className={Styles['filter']}>
                    <InputText type="text" name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                    <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => fetchUsers()} />
                </section>
                <section>
                     <Buttons label="New User" func="add-desktop" btnTitle="New User" onClick={handleModalCreate} />
                     <Buttons label="" func="add-mobile" btnTitle="New User" onClick={handleModalCreate} />
                </section>
            </section>
            <section className={Styles['content-body']}>
                <DataTables table={ table } />
            </section>

            <MemberModal
                open={open}
                mode={mode}
                data={selected}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                onUpdate={handleUpdate}
                validation={fieldError}
            />
            <ConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => deleteID && handleDelete(deleteID)}
                isTicket={false}
                message="Deleted data is permanent and cannot be retrieved!"
                label="Are you sure?"
                btnCancel="Cancel"
                btnYes="Yes"
            />
        </section>
    );
}