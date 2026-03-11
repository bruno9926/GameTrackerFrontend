// styles
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";

import Button from "../../components/Atoms/Button/Button";
import Input from "../../components/Atoms/Input/Input";
// routing
import { useNavigate } from "react-router";
import { defaultRoute } from "../../routes/routes";
import { Link } from "react-router";
import { publicRoutes } from "../../routes/routes";

import { useState } from "react";
import useLogin from "./useLogin";

const Login = () => {
    const navigate = useNavigate();
    const login = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login({ email, password });
            //console.log("Auth token received:", authToken);
        } catch (error) {
            alert(error);
            return;
        }

        // clear fields
        setEmail("");
        setPassword("");

        navigate(defaultRoute);
    }

    const Feature = ({text}: {text: string}) => (
        <div className={styles["feature"]}>
            <span className={styles["text"]}>{text}</span>
        </div>
    )

    return (
        <section className={styles["login-page"]}>
            <div className={styles["login-card"]}>
                <div className={styles["presentation"]}>
                    <img src={logo} alt="Gamer Dashboard Logo" />
                    <span>The ultimate command center for your gaming stats, progressions and community connections.</span>
                    <div className={styles["feature-row"]}>
                        <Feature text="Build a Community"/>
                        <Feature text="Track your Backlog"/>
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

                    <Button onClick={handleLogin}>
                        Login
                    </Button>
                    <div className={styles["signup-link"]}>
                        <span>Don't have an account? <Link to={publicRoutes.SIGNUP}>Sign up</Link></span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login