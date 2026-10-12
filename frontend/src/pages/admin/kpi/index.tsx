import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useApi } from "../../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Notifications } from "../../../components/notifications/notification";
import DataTables from "../../../components/datatables/DataTable";
import { kpiColumns } from "./columns";
import { InputText } from "../../../components/inputs/Input";
import { Buttons } from "../../../components/buttons/Button";
import KpiModal from "../../../components/modals/kpi/KpiModal";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import KpiDetailModal from "../../../components/modals/kpiDetailModal/kpiDetailModal";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type RegisterPayload = {
    tickets: number[];
    kpiId: number;
    userId: number;
}

export default function KPI() {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selected, setSelected] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState("");
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});
    const [selectedID, setSelectedID] = useState<number>(0);
    const [ticketSearch, setTicketSearch] = useState("");
    const [deleteID, setDeletedID] = useState<number | null>(null);

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const fetchKPI = useCallback(async () => {
        try {
            return await callApi("get", `/kpi/get-all-kpi`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: 'error', persist: false });
        }
    }, [callApi]);

    const fetchCheckTicket = useCallback(async (userId: number, ticketTitle?: string) => {
        try {
            return await callApi("get", `/kpi/check-tickets/${userId}?ticketTitle=${encodeURIComponent(ticketTitle ?? "")}`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    const fetchTicketHasKpi = useCallback(async (kpiId: number, ticketTitle?: string) => {
        try {
            return await callApi("get", `/kpi/check-ticket-has-kpi/${kpiId}?ticketTitle=${encodeURIComponent(ticketTitle ?? "")}`)
        } catch (error: any) {
           Notifications({ message: "Failed to detch data.", variantType: "error", persist: false }); 
        }
    }, [callApi]);

    const fetchUser = useCallback(async () => {
        try {
            const username = localStorage.getItem("username");
            if(!username) return;

            return await callApi("get", `/users/get-user/${username}`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);
    
    const fetchUsers = useCallback(async () => {
        try {
            return await callApi("get", '/users/get-all-user');
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    const { data = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ["kpi"],
        queryFn: fetchKPI,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    const { data: unregisteredTickets = [] } = useQuery({
        queryKey: ["kpi", "unregistered-tickets", user?.id, debouncedSearch],
        queryFn: () => fetchCheckTicket(user.id, debouncedSearch),
        enabled: detailOpen && !!user?.id,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    const { data: registeredTickets = [] } = useQuery({
        queryKey: ["kpi", "registered-tickets", selectedID, debouncedSearch],
        queryFn: () => fetchTicketHasKpi(selectedID, debouncedSearch),
        enabled: !!selectedID,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    const handleRegisterMutation = useMutation({
        mutationFn: async ({ tickets, kpiId, userId }: RegisterPayload) => {
            return await callApi("post", `/kpi/register-ticket/${kpiId}`, {tickets, userId});
        },
        onSuccess: (res) => {
            Notifications({
                message: res.message,
                variantType: "success",
                persist: false
            });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    const handleUnregisterMutation = useMutation({
        mutationFn: async (kpi_id: any) => {
            return await callApi("put", `/kpi/unregister-ticket/${kpi_id}`);
        },
        onSuccess: (res) => {
            Notifications({
                message: res.message,
                variantType: "success",
                persist: false
            });

            queryClient.invalidateQueries({
                queryKey: ['kpi']
            });

            queryClient.invalidateQueries({
                queryKey: ["ticket"]
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    function handleModalCreate() {
        setOpen(true);
        setMode("create");
        setSelected(null);
    }

    function handleModalUpdate(data: any) {
        setOpen(true);
        setMode("edit");
        setSelected(data);
    }

    function handleModalDelete(id: number) {
        setConfirmOpen(true);
        setDeletedID(id)
    }

    function handleModalDetail(id: number) {
        setDetailOpen(true);
        setSelectedID(id);
    }

    function handleRegister(tickets: number[]) {
        if(!selectedID || !user?.id) return;

        handleRegisterMutation.mutate({
            tickets,
            kpiId: selectedID,
            userId: user.id
        });
    }

    function handleUnregister(kpi_id: any) {
        handleUnregisterMutation.mutate(kpi_id);
    }

    function handleTicketSearch(ticketTitle: string) {
        setTicketSearch(ticketTitle);
    }

    const getColumns = useMemo(() => kpiColumns(handleModalUpdate, handleModalDelete, handleModalDetail), [handleModalUpdate, handleModalDelete, handleModalDetail]);
    
    const table = useReactTable({
        data: data ?? [],
        columns: getColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });

    const handleCreateMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("post", `/kpi/create`, data);
        },
        onSuccess: (res) => {
            Notifications({
                message: res.message,
                variantType: "success",
                persist: false
            });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
            });

            setOpen(false);
            setFieldError({});
        },
        onError: (error: any) => {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                Notifications({ message: "Please fill in all reqiired fields.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    });

    function handleCreate(data: any) {
        handleCreateMutation.mutate(data);
    }

    const handleUpdateMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("put", `/kpi/update/${data.id}`, data);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
            });

            setOpen(false);
            setFieldError({});
        },
        onError: (error: any) => {
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
    });

    function handleUpdate (data: any) {
        handleUpdateMutation.mutate(data);
    }

    const handleDeleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return await callApi("put", `/kpi/delete/${id}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
            });

            setConfirmOpen(false);
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    function handleDelete (id: number)  {
        if(!id) return;
        handleDeleteMutation.mutate(id);
    }

    // EXPORT EXCEL
    const ticketsByMonth = months.map((month, monthIndex) => {
        const tickets: any[] = [];

        data.forEach((kpi: any) => {
            kpi.kpi_detail.forEach((detail: any) => {
                const date = new Date(detail.created_at);

                if (date.getMonth() === monthIndex) {
                    tickets.push(detail);
                }
            });
        });

        return {
            month,
            tickets
        };
    });

    const exportKPI = async () : Promise<void> => {
        const workbook = new ExcelJS.Workbook();
        const masterSheet = workbook.addWorksheet("KPI POINTS");

        masterSheet.columns = [
            { key: "no", width: 6 },
            { key: "key_performance_indicators", width: 50 },
            { key: "keterangan", width: 60 },
            { key: "bobot", width: 12 },
            { key: "target_per_tahun", width: 18 },
            { key: "formula", width: 25 },
            { key: "verificator", width: 25 }
        ];

        masterSheet.mergeCells("A1:G1");

        const columnWidths = [
            6,
            50,
            60,
            12,
            18,
            20,
            25
        ];

        columnWidths.forEach((width, index) => {
            masterSheet.getColumn(index + 1).width = width;
        });

        // START: KPI POINTS SHEET
        const ticketCell = masterSheet.getCell("A1");
        ticketCell.value = "KPI POINTS";
        ticketCell.font = {
            size: 16,
            bold: true,
            color: {
                argb: "FFFFFFFF"
            }
        };
        ticketCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FF1B499D"
            }
        };
        ticketCell.alignment = {
            vertical: "middle",
            horizontal: "center"
        };
        masterSheet.getRow(1).height = 30;

        const headerRow = masterSheet.getRow(3);
        headerRow.values = [
            "No",
            "Key Performance Indicators",
            "Keterangan",
            "Bobot",
            "Target Per Tahun",
            "Formula",
            "Verificator"
        ];
        headerRow.height = 25;
        headerRow.eachCell((cell) => {
            cell.font = {
                bold: true
            },
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            },
            cell.alignment = {
                vertical: "middle",
                horizontal: "center",
                wrapText: true
            }
        });

        data.forEach((kpi: any, index: number) => {
            const isEmptyValue = kpi.value == null || kpi.value === "-";

            const row = masterSheet.addRow({
                no: index + 1,
                key_performance_indicators: kpi.name,
                keterangan: "-",
                bobot: kpi.weight + "%",
                target_per_tahun: (kpi.target_status === "qty" ? kpi.year_target : kpi.year_target + "%"),
                formula: kpi.formula,
                verificator: kpi.verificator || "-"
            });

            row.eachCell((cell, colNumber) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                },
                cell.alignment = {
                    vertical: "middle",
                    horizontal: [1, 4, 5, 6, 8].includes(colNumber) || isEmptyValue
                        ? "center"
                        : "left",
                    wrapText: true
                };
            });
        });
        // END: KPI POINTS SHEET

        // START: USER SHEET
        let currentRow = 14;
        users.forEach((user: any) => {
            const worksheet =  workbook.addWorksheet(user.username);

            worksheet.columns = [
                { key: "no", width: 6 },
                { key: "key_performance_indicators", width: 50 },
                { key: "realisasi_per_tahun", width: 30 },
                { key: "score", width: 30 },
                { key: "total_score", width: 15 },
                { key: "realisasi_januari", width: 15 },
                { key: "realisasi_februari", width: 15 },
                { key: "realisasi_maret", width: 15 },
                { key: "realisasi_april", width: 15 },
                { key: "realisasi_mei", width: 15 },
                { key: "realisasi_juni", width: 15 },
                { key: "realisasi_juli", width: 15 },
                { key: "realisasi_agustus", width: 15 },
                { key: "realisasi_september", width: 15 },
                { key: "realisasi_oktober", width: 15 },
                { key: "realisasi_november", width: 15 },
                { key: "realisasi_desember", width: 15 }
            ];

            // START: ROW REALIZATION
            worksheet.mergeCells("A1:Q1");

            const titleCell = worksheet.getCell("A1");
            titleCell.value = `KPI - ${user.username}`;
            titleCell.font = {
                size: 16,
                bold: true,
                color: {
                    argb: "FFFFFFFF"
                }
            };
            titleCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "FF1B499D"
                }
            };
            titleCell.alignment = {
                horizontal: "center",
                vertical: "middle"
            };

            worksheet.getRow(1).height = 30;

            const headerRow = worksheet.getRow(3);
            headerRow.values = [
                "No",
                "Key Performance Indicators",
                "Realisasi Per Tahun",
                "Score",
                "Total Score",
                "Realisasi Januari",
                "Realisasi Februari",
                "Realisasi Maret",
                "Realisasi April",
                "Realisasi Mei",
                "Realisasi Juni",
                "Realisasi Juli",
                "Realisasi Agustus",
                "Realisasi September",
                "Realisasi Oktober",
                "Realisasi November",
                "Realisasi Desember"
            ];
            headerRow.eachCell((cell) => {
                cell.font = {
                    bold: true
                },
                cell.alignment = {
                    horizontal: "center",
                    vertical: "middle",
                    wrapText: true
                },
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                }
            });

            data.forEach((kpi: any, index: number) => {
                const row = worksheet.addRow({
                    no: index + 1,
                    key_performance_indicators: kpi.name,
                });

                row.eachCell((cell, colNumber) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    },
                    cell.alignment = {
                        vertical: "middle",
                        horizontal: [1, 4, 5, 6, 8].includes(colNumber)
                            ? "center"
                            : "left",
                        wrapText: true
                    };
                });
            });
            // END: ROW REALIZATION

            // START: DETAIL TICKET
            worksheet.mergeCells("A12:D12");

            const titleDetailTicket = worksheet.getCell("A12");
            titleDetailTicket.value = "Detail Ticket";
            titleDetailTicket.font = {
                size: 16,
                bold: true,
                color: {
                    argb: "FFFFFFFF"
                }
            };
            titleDetailTicket.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "FF1B499D"
                }
            };
            titleDetailTicket.alignment = {
                horizontal: "center",
                vertical: "middle"
            };

            worksheet.getRow(12).height = 30;

            const detailTicketHeaderRow = worksheet.getRow(13);
            detailTicketHeaderRow.values = [
                "No",
                "Periode",
                "Kode Ticket",
                "Judul Ticket"
            ];
            detailTicketHeaderRow.height = 20;
            detailTicketHeaderRow.eachCell((cell) => {
                cell.font = {
                    bold: true
                },
                cell.alignment = {
                    horizontal: "center",
                    vertical: "middle",
                    wrapText: true
                },
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                }
            });

            ticketsByMonth.forEach((group, index) => {
                const startRow = currentRow;

                if(group.tickets.length === 0) {
                    const row = worksheet.getRow(currentRow);

                    row.getCell(1).value = index + 1;
                    row.getCell(2).value = group.month;
                    row.getCell(3).value = "-";
                    row.getCell(4).value = "-";

                    currentRow++;
                } else {
                    group.tickets.forEach((detail: any) => {
                        const row = worksheet.getRow(currentRow);

                        row.getCell(3).value = detail.fk_ticket_id.ticket_no;
                        row.getCell(4).value = detail.fk_ticket_id.ticket_title;

                        currentRow++;
                    })

                    const endRow = currentRow - 1;

                    if(startRow < endRow) {
                        worksheet.mergeCells(
                            `A${startRow}:A${endRow}`
                        );

                        worksheet.mergeCells(
                            `B${startRow}:B${endRow}`
                        );
                    }

                    worksheet.getCell(`A${startRow}`).value = index + 1;
                    worksheet.getCell(`B${startRow}`).value = group.month;
                }
            });

            
            for (let rowNumber = 14; rowNumber < currentRow; rowNumber++) {
                const row = worksheet.getRow(rowNumber);
                row.height = 30;

                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    const isEmpty = cell.value == null || cell.value === "-";

                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" }
                    };
                    cell.alignment = {
                        vertical: "middle",
                        horizontal: [1, 2].includes(colNumber) || isEmpty
                            ? "center"
                            : "left",
                        wrapText: true
                    };
                });
            }
            // END: DETAIL TICKET
        });
        // END: USER SHEET

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `KPI Point-${new Date().getTime()}.xlsx`);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(ticketSearch);
        }, 300);

        return () => clearTimeout(timeout);
    }, [ticketSearch]);

    return (
        <>
            <section className={Styles['main-content']}>
                <section className={Styles['content-header']}>
                    <section className={Styles['filter']}>
                        <InputText type="text" name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                        <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => refetch()} />
                    </section>
                    <section className={Styles['buttons-section']}>
                        <Buttons label="Export Excel" func="export-excel" btnTitle="Export Excel" onClick={exportKPI} />
                        <Buttons label="New KPI Point" func="add-desktop" onClick={handleModalCreate} btnTitle="New KPI Point" />
                        <Buttons label="" func="add-mobile" onClick={handleModalCreate} btnTitle="New KPI Point" />
                    </section>
                </section>
                <section className={Styles['content-body']}>
                    {isFetching && !isLoading && (
                        <section style={{ fontSize: "12px", marginBottom: "10px" }}>
                            Refreshing...
                        </section>
                    )}
                    <div style={{ flex: '1', display: 'flex', flexDirection: "column", gap: "16px" }}>
                        <DataTables
                            table={table}
                        />
                    </div>
                </section>
            </section>

            <KpiModal
                open={open}
                mode={mode}
                data={selected}
                onClose={() => {
                    setOpen(false);
                }}
                onSubmit={handleCreate}
                onUpdate={handleUpdate}
                validation={(fieldError)}
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
            <KpiDetailModal
                open={detailOpen}
                kpiId={selectedID}
                onClose={() => setDetailOpen(false)}
                unregisterTickets={unregisteredTickets}
                registerTickets={registeredTickets}
                onRegister={handleRegister}
                onUnregister={handleUnregister}
                onSearch={handleTicketSearch}
            />
        </>
    );
}