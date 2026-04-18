import styles from './AuthLayout.module.scss';
import clsx from 'clsx';

interface AuthLayoutProps {
    children: Readonly<React.ReactNode>;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <section className={clsx(styles["auth-layout"], 'flex items-center justify-center p-4 h-auto md:h-dvh')}>
            {children}
        </section>
    )
}

export default AuthLayout;