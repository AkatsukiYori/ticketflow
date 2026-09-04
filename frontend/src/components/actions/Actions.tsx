import { useEffect, useRef, useState } from "react";
import Styles from "./actions.module.css";
import { MoreVertical, CheckCircle, XCircle, UserCheck, Trash2, LucideLockOpen, Pencil, UserStar } from "lucide-react";
import { createPortal } from "react-dom";
import type { UserRole } from "../../permissions/role";
import { hasPermission } from "../../permissions";
import { Permission } from "../../permissions/permission";

type Props = {
    onAssign: () => void;
    onReject: () => void;
    onComplete: () => void;
    onRemove: () => void;
    onReopen: () => void;
    onEdit?: () => void;
    onAssignProgrammer?: () => void;
    isClosed: boolean;
    isAssign: boolean;
    userRole?: string;
    isIKB?: boolean;
}

export const ActionDropdown = ({ onAssign, onReject, onComplete, onRemove, onReopen, onEdit, onAssignProgrammer, isClosed, isAssign, userRole, isIKB }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const role = userRole as UserRole;
    const canAssign = hasPermission(role, Permission.ASSIGN);
    const canFeedback = hasPermission(role, Permission.FEEDBACK);
    const canReject = hasPermission(role, Permission.REJECT);
    const canRemove = hasPermission(role, Permission.REMOVE);
    const canReOpen = hasPermission(role, Permission.REOPEN);
    const canEdit = hasPermission(role, Permission.EDIT);
    const canAssignProgrammer = hasPermission(role, Permission.ASSIGNPROGRAMMER);

    const handleClick = (callback: () => void) => {
        callback();
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedTrigger = dropdownRef.current?.contains(target);
            const clickedMenu = menuRef.current?.contains(target);
            if(isOpen && !clickedTrigger && !clickedMenu) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [isOpen]);

    return (
        <div className={Styles.container} ref={dropdownRef}>
            <button ref={buttonRef} className={Styles.trigger} onClick={() => {
                if(buttonRef.current) {
                    const rect = buttonRef.current.getBoundingClientRect();

                    setPosition({
                        top: rect.bottom + 8,
                        left: rect.left - 140
                    });
                }

                setIsOpen(!isOpen);
            }}>
                <MoreVertical />
            </button>

            {isOpen && createPortal (
                <div ref={menuRef} className={Styles.menu} style={{
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                    zIndex: 9999
                }}>
                    {canAssignProgrammer && onAssignProgrammer && (
                        <button onClick={() => handleClick(onAssignProgrammer)}>
                            <UserStar size={15} />
                            Assign Programmer
                        </button>
                    )}

                    {!isClosed && canAssign && (
                        <button onClick={() => handleClick(onAssign)}>
                            <UserCheck size={15} />
                            Assign
                        </button>
                    )}

                    {!isClosed && isAssign && canFeedback && (
                        <button onClick={() => handleClick(onComplete)}>
                            <CheckCircle size={15} />
                            Feedback
                        </button>
                    )}

                    {!isClosed && isAssign && canReject && (
                        <button onClick={() => handleClick(onReject)}>
                            <XCircle size={15} />
                            Reject
                        </button>
                    )}

                    {isClosed && canReOpen && (
                        <button onClick={() => handleClick(onReopen)}>
                            <LucideLockOpen size={15} />
                            Re-Open
                        </button>
                    )}

                    {!isClosed && canRemove && (
                        <button onClick={() => handleClick(onRemove)} style={{ color: 'red' }}>
                            <Trash2 size={15} />
                            Remove
                        </button>
                    )}

                    {isIKB && canEdit && (
                        <button onClick={() => handleClick(() => onEdit?.())}>
                            <Pencil size={15} />
                            Edit
                        </button>
                    )}

                    {isClosed && (
                        <p>Ticket has Closed.</p>
                    )}

                    {isIKB && !isClosed && !isAssign && (role === "ikb") && (
                        <p>Ticket not assigned yet.</p>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}