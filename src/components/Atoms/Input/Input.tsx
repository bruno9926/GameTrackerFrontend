import { useState, useRef, type FC, type InputHTMLAttributes } from "react";
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
}

const Input: FC<InputProps> = ({
    type,
    label = '', ...props
}) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        if (!inputRef.current?.value) {
            setFocused(false);
        }
    }

    return (
        <div className={styles.wrapper}>
            <label className={`${styles.label} ${focused ? styles.floated : ""}`}>
                {label}
            </label>
            <input
                ref={inputRef}
                className={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        </div>
    )
}

export default Input;