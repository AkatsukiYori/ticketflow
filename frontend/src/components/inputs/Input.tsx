import Styles from "./input.module.css";
import Select, { type ActionMeta, type SingleValue } from "react-select";

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
    value?: any;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
    onChangeTextArea?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onChangeCheckbox?: (checked: boolean) => void;
    label?: string;
    checked?: boolean;
    
    // Select
    onChangeSelect?: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
    options?: Option[];
    searchAble?: boolean;
}

export function InputText({ type, name, id, className, placeholder, style, value, onChangeInput } : Props) {
    return (
        <input type={type} name={name} id={id} value={value} onChange={onChangeInput} className={`${Styles['text-input']} ${className || ""}`} placeholder={placeholder} style={style} />
    );
}

export function SelectOptions({ value, options, name, id, onChangeSelect, className, searchAble, placeholder }: Props) {
    const selectedOption = typeof value === "string"
        ? (options?.find(opt => opt.value === value) || null)
        : (value || null);

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            // Atur tinggi minimal dan tinggi total di sini
            minHeight: '42px', 
            height: '42px',
            width: "100%",
            border: "1px solid #d1d1d1",
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#d1d1d1'
            }
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            height: '42px',
            padding: '0 6px'
        }),
        input: (provided: any) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorSeparator: (_provided: any) => ({
            display: 'none',
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            height: '42px',
        }),
    };

    return (
        <Select
            name={name}
            id={id}
            isSearchable={searchAble}
            className={`${Styles['select-options']} ${className || ""}`}
            value={selectedOption}
            onChange={onChangeSelect}
            placeholder={placeholder}
            options={options}
            styles={customStyles}
        />
    );
}

export function TextArea({ name, id, placeholder, style, value, onChangeTextArea }: Props) {
    return (
        <textarea name={name} id={id} placeholder={placeholder} value={value} onChange={onChangeTextArea} style={style} className={Styles['textarea-input']}></textarea>
    );
}

export function CustomCheckbox({ label, checked, onChangeCheckbox, name }: Props) {
    return (
        <label className={Styles.checkboxContainer}>
            <input type="checkbox" name={name} checked={checked} onChange={(e) => onChangeCheckbox?.(e.target.checked)} />
            <span className={`${Styles.checkmark} ${checked ? Styles.checked : ""}`}></span>
            <span className={`${Styles.labelText}`}>{label}</span>
        </label>
    );
}