import { useEffect, useRef, useState } from "react";
import Styles from "./actions.module.css";
import { MoreVertical, CheckCircle, XCircle, UserCheck, Trash2, LucideLockOpen } from "lucide-react";

type Props = {
    onAssign: () => void;
    onReject: () => void;
    onComplete: () => void;
    onRemove: () => void;
    onReopen: () => void;
    isClosed: boolean;
    isAssign: boolean;
}

export const ActionDropdown = ({ onAssign, onReject, onComplete, onRemove, onReopen, isClosed, isAssign }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = () => {
            if(isOpen && dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.addEventListener("mousedown", handleOutsideClick);
        }
    }, [isOpen]);

    return (
        <div className={Styles.container} ref={dropdownRef}>
            <button className={Styles.trigger} onClick={() => setIsOpen(!isOpen)}>
                <MoreVertical />
            </button>

            {isOpen && (
                <div className={Styles.menu}>
                    {isClosed ? (
                        <button onClick={onReopen} title="Re-Open Ticket"><LucideLockOpen size={15} /> Re-Open</button>
                    ) : (
                        <>
                        {isAssign ? (
                            <>
                                <button onClick={onAssign} title="Apply"><UserCheck size={15} /> Assign</button>
                                <button onClick={onComplete} title="Complete"><CheckCircle size={15} /> Feedback</button>
                                <button onClick={onReject} title="Reject"><XCircle size={15} /> Reject</button>
                            </>
                        ) : (
                            <button onClick={onAssign} title="Apply"><UserCheck size={15} /> Assign</button>
                        )}
                        </>
                    )}
                    <button onClick={onRemove} title="Delete"><Trash2 size={15} color="red" /> <span style={{ color: "red" }}>Remove</span></button>
                </div>
            )}
        </div>
    );
}