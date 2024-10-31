import { useState } from "react"

export interface TextAreaProp {
    id: string
    register?: any
    name?: string
    required?: boolean
    label?: string
    placeholder?: string
    full?: boolean
    error?: boolean
    helper?: boolean
    errorMsg?: string
    withBg?: boolean
    type: string
    autocomplete?: boolean
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
    dashed?: boolean
    infoMsg?: string
    infoMsgHelper?: string
    roundedFull?: boolean
    disabled?: boolean
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    rows?: number
    onKeyDown?: any
    tabIndex?: number
    unit?: string
}

const TextArea: React.FC<TextAreaProp> = ({
    id,
    register,
    name = 'input',
    label,
    placeholder,
    withBg,
    Icon,
    full,
    error,
    errorMsg,
    type,
    autocomplete,
    dashed,
    infoMsg,
    roundedFull,
    disabled,
    value,
    helper,
    infoMsgHelper,
    onChange,
    className,
    rows,
    onKeyDown,
    tabIndex,
    unit
}) => {

    return (
        <>
            {
                label && <label className="form-label">{label}</label>
            }

            <textarea
                {...(register ? register(name) : {})}
                type={type}
                onChange={onChange}
                className="input max-w-full"
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                name={name}
                onKeyDown={onKeyDown}
                tabIndex={tabIndex}
                rows={rows} 
            />

            {
                helper &&
                <label className="form-label">
                    <span className="form-label-alt">{infoMsgHelper}</span>
                </label>
            }
            {
                error && errorMsg !== '' &&
                <label className="form-label">
                    <span className="form-label-alt text-error">{errorMsg}</span>
                </label>
            }
        </>
    )
}

TextArea.defaultProps = {
    label: '',
    placeholder: 'Type something',
    full: false,
    required: false,
    error: false,
    errorMsg: 'Invalid',
    withBg: false,
    autocomplete: false,
}

export default TextArea