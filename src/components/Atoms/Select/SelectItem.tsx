import { type FC, type OptionHTMLAttributes } from 'react';

type SelectItemProps = OptionHTMLAttributes<HTMLOptionElement>;

const SelectItem: FC<SelectItemProps> = ({
    children,
    ...props
}) => {
    return (
        <option {...props}>{children}</option>
    )
}

export default SelectItem