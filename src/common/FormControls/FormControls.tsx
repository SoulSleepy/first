import React, { FC } from "react"
import { WrappedFieldProps } from "redux-form"
import style from './FormControls.module.css'

type PropsType = WrappedFieldProps & { elementtype: 'input' | 'textarea' }

export const Element: React.FC<PropsType> = ({ input, meta, elementtype, ...props }) => {

    const hasError = meta.touched && meta.error
    const tag = elementtype === 'input' ?
        <input {...input} {...props} /> :
        <textarea  {...input} {...props} />

    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <div>
                {tag}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

// комонент возвращает в зависимости от тега, элемент - инпут или текстареа, с разметкой.