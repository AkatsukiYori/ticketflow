import { useEffect, useRef, useState } from "react";
import Styles from "./actions.module.css";
import { MoreVertical, CheckCircle, XCircle, UserCheck, Trash2, LucideLockOpen, Pencil } from "lucide-react";
import { createPortal } from "react-dom";

type Props = {
    onAssign: () => void;
    onReject: () => void;
    onComplete: () => void;
    onRemove: () => void;
    onReopen: () => void;
    onEdit?: () => void;
    isClosed: boolean;
    isAssign: boolean;
    userRole?: string;
    isIKB?: boolean;
}

export const ActionDropdown = ({ onAssign, onReject, onComplete, onRemove, onReopen, onEdit, isClosed, isAssign, userRole, isIKB }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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
                    {userRole === "admin" ? (
                        <>
                            {isClosed ? (
                                <button onClick={onReopen} title="Re-Open Ticket"><LucideLockOpen size={15} /> Re-Open</button>
                            ) : (
                                <>
                                    {isAssign ? (
                                        <>
                                            <button onClick={() => {
                                                onAssign();
                                                setIsOpen(!isOpen);
                                            }} title="Apply"><UserCheck size={15} /> Assign</button>
                                            <button onClick={() => {
                                                onComplete();
                                                setIsOpen(!isOpen);
                                            }} title="Complete"><CheckCircle size={15} /> Feedback</button>
                                            <button onClick={() => {
                                                onReject();
                                                setIsOpen(!isOpen);
                                            }} title="Reject"><XCircle size={15} /> Reject</button>
                                        </>
                                    ) : (
                                        <button onClick={() => {
                                            onAssign();
                                            setIsOpen(!isOpen);
                                        }} title="Apply"><UserCheck size={15} /> Assign</button>
                                    )}
                                </>
                            )}
                            {isIKB && (
                                <>
                                    <button onClick={() => {
                                        onEdit?.();
                                        setIsOpen(!isOpen);
                                    }} title="Edit Ticket"><Pencil size={15} /> Edit</button>
                                </>
                            )}
                            <button onClick={() => {
                                onRemove();
                                setIsOpen(!isOpen);
                            }} title="Delete"><Trash2 size={15} color="red" /> <span style={{ color: "red" }}>Remove</span></button>
                        </>
                    ) : (
                        <>
                            {isClosed ? (
                                <p>Ticket Closed.</p>
                            ) : (
                                <>
                                    {isAssign ? (
                                        <>
                                            <button onClick={() => {
                                                onComplete();
                                                setIsOpen(!isOpen);
                                            }} title="Complete"><CheckCircle size={15} /> Feedback</button>
                                        </>
                                    ) : (
                                        <p>Ticket is not assigned yet.</p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}