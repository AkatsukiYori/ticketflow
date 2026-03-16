import "../../components/inputs/input.css";

type Option = {
    label: string;
    value: string;
}

type Props = {
    name?: string;
    id?: string;
    className? :string;
    placeholder?: string;
    style?: React.CSSProperties;
    value?: string;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
    onChangeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
    label?: string;
    options?: Option[];
}

export function InputText({ name, id, className, placeholder, style, value, onChangeInput } : Props) {
    return (
        <input type="text" name={name} id={id} value={value} onChange={onChangeInput} className={`text-input ${className || ""}`} placeholder={placeholder} style={style} />
    );
}

export function SelectOptions({ label, value, options, onChangeSelect }: Props) {
    return (
        <select name="filterInput" id="filterInput" className="select-options" value={value} onChange={onChangeSelect}>
            <option value="">{ label }</option>
            {options?.map((opt, index) => (
                <option key={index} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
}