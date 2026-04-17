import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
    children: Readonly<React.ReactNode>;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <section className={styles["auth-layout"]}>
            {children}
        </section>
    )
}

export default AuthLayout;