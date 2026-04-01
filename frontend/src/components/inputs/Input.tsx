import Styles from "./input.module.css";

type Option = {
    label: string;
    value: string;
}

type Props = {
    type?: string;
    name?: string;
    id?: string;
    className? :string;
    placeholder?: string;
    style?: React.CSSProperties;
    value?: string;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
    onChangeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
    onChangeTextArea?: React.ChangeEventHandler<HTMLTextAreaElement>;
    label?: string;
    options?: Option[];
}

export function InputText({ type, name, id, className, placeholder, style, value, onChangeInput } : Props) {
    return (
        <input type={type} name={name} id={id} value={value} onChange={onChangeInput} className={`${Styles['text-input']} ${className || ""}`} placeholder={placeholder} style={style} />
    );
}

export function SelectOptions({ label, value, options, name, id, onChangeSelect, className, style }: Props) {
    return (
        <select name={name} id={id} className={`${Styles['select-options']} || ${className || ""}`} value={value} onChange={onChangeSelect} style={style}>
            <option value="">{ label }</option>
            {options?.map((opt, index) => (
                <option key={index} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
}

export function TextArea({ name, id, placeholder, style, value, className, onChangeTextArea }: Props) {
    return (
        <textarea name={name} id={id} placeholder={placeholder} value={value} onChange={onChangeTextArea} style={style} className={Styles['textarea-input']}></textarea>
    );
}