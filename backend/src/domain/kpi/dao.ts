import prisma from "../../prisma"
import * as KpiDTO from "../../dtos/kpi/kpi_dto";
import { Prisma } from "@prisma/client";

export const GetAllKpiDAO = async () => {
    const data = await prisma.kpi.findMany({
        include: {
            kpi_description: {
                select: {
                    id: true,
                    kpi_id: true,
                    description: true
                }
            }
        },
        where: {
            deleted_at: null
        },
        orderBy: {
            created_at: "desc"
        }
    });
    return data;
}

export const CheckTicketDAO = async (user: number, ticketTitle: string) => {
    const data = await prisma.tickets.findMany({
        select: {
            id: true,
            ticket_title: true,
            problem: true,
            report_date: true,
            status: true
        },
        where: {
            assign_to: user,
            closed_at: {
                not: null
            },
            ...(ticketTitle && {
                ticket_title: {
                    contains: ticketTitle
                }
            }),
            OR: [
                {
                    kpi_detail: {
                        is: null
                    }
                },
                {
                    kpi_detail: {
                        deleted_at: {
                            not: null
                        }
                    }
                }
            ]
        },
        orderBy: {
            created_at: 'desc'
        }
    });

    return data;
}

export const CheckTicketHasKpiDAO = async (kpiID: number, ticketTitle: string) => {
    const data = await prisma.tickets.findMany({
        select: {
            id: true,
            ticket_title: true,
            problem: true,
            report_date: true,
            status: true,
            kpi_detail: {
                select: {
                    id: true,
                    kpi_id: true,
                    user_id: true
                }
            }
        },
        where: {
            closed_at: {
                not: null
            },
            ...(ticketTitle && {
                ticket_title: {
                    contains: ticketTitle
                }
            }),
            kpi_detail: {
                is: {
                    kpi_id: kpiID,
                    deleted_at: null
                }
            }
        }
    });

    return data;
}

export const RegisterTicketDAO = async (tickets: number[], kpi: number, user: number) => {
    await prisma.$transaction(async (tx) => {
        for (const ticketId of tickets) {
            const existingTicket = await tx.detailKpi.findMany({
                where: {
                    ticket_id: ticketId
                }
            });

            await tx.detailKpi.upsert({
                where: {
                    ticket_id: ticketId
                },
                update: {
                    kpi_id: kpi,
                    user_id: user,
                    deleted_at: null
                },
                create: {
                    kpi_id: kpi,
                    ticket_id: ticketId,
                    user_id: user,
                    created_at: new Date(),
                    deleted_at: null
                }
            });

            // await tx.realizationKpi.create({
            //     data: {
            //         kpi_id: kpi,
            //         year: new Date().getFullYear(),
            //         month: new Date().getMonth() + 1,
            //         deleted_at: null
            //     }
            // });
        }
    });

}

export const UnregisterTicketDAO = async (kpi_id: number) => {
    await prisma.$transaction(async (tx) => {
        await tx.realizationKpi.updateMany({
            where: {
                kpi_id: kpi_id
            },
            data: {
                deleted_at: new Date()
            }
        });

        await prisma.detailKpi.updateMany({
            where: {
                kpi_id: kpi_id
            },
            data: {
                deleted_at: new Date()
            }
        });
    });
}

export const CreateKpiDAO = async (data: KpiDTO.CreateKpiInput) => {
    const { description, ...kpiData } = data;
    await prisma.$transaction(async (tx) => {
        const kpi = await tx.kpi.create({
            data: {
                ...kpiData
            }
        });

        const descLength = description.length;
        for (let i = 0; i < descLength; i++) {
            await tx.descriptionKpi.create({
                data: {
                    kpi_id: kpi.id,
                    description: description[i] ?? "",
                    created_at: new Date()
                }
            })
        }
    })
}

export const UpdateKpiDAO = async (id: number, data: Partial<KpiDTO.UpdateKpiInput>) => {
    const { description, ...kpiData } = data;

    const filteredData = Object.fromEntries(
        Object.entries(kpiData).filter(([_, v]) => v !== undefined)
    ) as unknown as Prisma.kpiUpdateInput;

    await prisma.$transaction(async (tx) => {
        await tx.kpi.update({
            where: {
                id: id
            },
            data: filteredData
        });

        const oldKPIDesc = await tx.descriptionKpi.findMany({
            where: { kpi_id: id },
            select: {
                id: true
            }
        });

        for(const desc of oldKPIDesc) {
            await tx.descriptionKpi.delete({
                where: { id: desc.id }
            })
        }

        const descLength = description?.length ?? 0;
        for (let i = 0; i < descLength; i++) {
            await tx.descriptionKpi.create({
                data: {
                    kpi_id: id,
                    description: description?.[i] ?? "",
                    created_at: new Date()
                }
            })
        }
    });
}

export const DeleteKpiDAO = async (id: number) => {
    const now = new Date();

    await prisma.$transaction(async (tx) => {
        await tx.descriptionKpi.updateMany({
            where: { kpi_id: id },
            data: { deleted_at: now }
        });

        await tx.realizationKpi.updateMany({
            where: { kpi_id: id },
            data: { deleted_at: now }
        });

        await tx.detailKpi.updateMany({
            where: { kpi_id: id },
            data: { deleted_at: now }
        });

        await tx.kpi.updateMany({
            where: { id: id },
            data: { deleted_at: now }
        })
    })
}