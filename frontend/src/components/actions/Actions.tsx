import { useEffect, useRef, useState } from "react";
import Styles from "./actions.module.css";
import { MoreVertical, CheckCircle, XCircle, UserCheck, Trash2 } from "lucide-react";

type Props = {
    onAssign: () => void;
    onReject: () => void;
    onComplete: () => void;
    onRemove: () => void;
}

export const ActionDropdown = ({ onAssign, onReject, onComplete, onRemove }: Props) => {
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
                    <button onClick={onAssign} title="Apply"><UserCheck size={15} /> Assign</button>
                    <button onClick={onComplete} title="Complete"><CheckCircle size={15} /> Feedback</button>
                    <button onClick={onReject} title="Reject"><XCircle size={15} /> Reject</button>
                    <button onClick={onRemove} title="Delete"><Trash2 size={15} color="red" /> <span style={{ color: "red" }}>Remove</span></button>
                </div>
            )}
        </div>
    );
}