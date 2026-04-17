import { type SelectHTMLAttributes, type FC } from 'react';
import styles from './Select.module.scss';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
};

const Select: FC<SelectProps> = ({
    children,
    label,
    ...props
}) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label + " " + styles.floated}>{label}</label>
            <select
                className={styles.select}
                {...props}
            >
                {children}
            </select>
        </div>
    )
}

export default Select