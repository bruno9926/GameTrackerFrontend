// styles
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";
// feature icons
import { IoPeople } from "react-icons/io5";
import { MdChecklistRtl } from "react-icons/md";

import Button from "../../components/Atoms/Button/Button";
import Input from "../../components/Atoms/Input/Input";
// routing
import { useNavigate } from "react-router";
import { defaultRoute } from "../../routes/routes";
import { Link } from "react-router";
import { publicRoutes } from "../../routes/routes";

import { useState, type ReactNode } from "react";
import useLogin from "./useLogin";


const Feature = ({ text, icon }: { text: string, icon: ReactNode }) => (
    <div className={styles["feature"]}>
        <span className={styles["icon"]}>{icon}</span>
        <span className={styles["text"]}>{text}</span>
    </div>
)

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error} = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login({ email, password });
        } catch (e) {
            return;
        }

        // clear fields
        setEmail("");
        setPassword("");

        navigate(defaultRoute);
    }

    return (
        <section className={styles["login-page"]}>
            <div className={styles["login-card"]}>
                <div className={styles["presentation"]}>
                    <img src={logo} alt="Gamer Dashboard Logo" />
                    <span>The ultimate command center for your gaming stats, progressions and community connections.</span>
                    <div className={styles["feature-row"]}>
                        <Feature text="Build a Community" icon={<IoPeople />} />
                        <Feature text="Track your Backlog" icon={<MdChecklistRtl />} />
                    </div>
                </div>
                <div className={styles["login-form"]}>
                    <div className={styles["login-title"]}>
                        <h2>Sign In</h2>
                        <span>Welcome back. Enter your details to sync your progress.</span>
                    </div>

                    <div className={styles.body}>
                        <Input
                            type="email"
                            label="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            label="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin} disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                    {error && <span className={styles.error}>Error: {error}</span>}
                    <div className={styles["signup-link"]}>
                        <span>Don't have an account? <Link to={publicRoutes.SIGNUP}>Sign up</Link></span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login