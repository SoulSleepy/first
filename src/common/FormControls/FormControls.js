import React from "react";
import style from './FormControls.module.css'

export function Element({input, meta, ...props }) {
    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <div>
                <props.elementType {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

