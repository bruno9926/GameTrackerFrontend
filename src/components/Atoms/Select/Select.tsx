import { type SelectHTMLAttributes, type FC } from 'react';
import styles from './Select.module.scss';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<SelectProps> = ({
    children,
    ...props
}) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label + " " + styles.floated}>status</label>
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