import hotToast, { Toaster } from 'react-hot-toast';

interface Toast {
    success: (message: string) => void;
    error: (message: string) => void;
    [key: string]: (message: string) => void;
}

const defaultOptions = {
    duration: 4000
}

const backgroundColor = (color: string) => `color-mix(in srgb, ${color}, transparent 90%)`;

const styleOptions = (color: string) => ({
    style: {
        color: color,
        backgroundColor: backgroundColor(color),
    },
    iconTheme: {
        primary: color,
        secondary: 'white',
    }
});

const toastAdapter: Toast = {
    success: (message: string) => hotToast.success(message, {
        ...defaultOptions,
        ...styleOptions('var(--color-success)'),
    }),
    error: (message: string) => hotToast.error(message, {
        ...defaultOptions,
        ...styleOptions('var(--color-error)'),

    })
};

export { Toaster };
export default toastAdapter;