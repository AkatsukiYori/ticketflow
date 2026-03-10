import "../../components/inputs/input.css";

type Props = {
    name: string;
    id: string;
    className? :string;
    placeholder: string;
    style?: React.CSSProperties;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputText({ name, id, className, placeholder, style, value, onChange } : Props) {
    return (
        <input type="text" name={name} id={id} value={value} onChange={onChange} className={`text-input ${className || ""}`} placeholder={placeholder} style={style} />
    );
}

export function SelectOptions() {
    return (
        <select name="filterInput" id="filterInput" className="select-options">
            <option value="">-- Filter --</option>
        </select>
    );
}