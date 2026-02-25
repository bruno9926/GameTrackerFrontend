// styles
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";
// routing
import { useNavigate } from "react-router";
import { defaultRoute } from "../../routes/routes";
import Button from "../../components/Atoms/Button/Button";
import Input from "../../components/Atoms/Input/Input";

import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section className={styles["login-page"]}>
            <div className={styles["login-card"]}>
                <div className={styles.header}>
                    <img src={logo} alt="Gamer Dashboard Logo" />
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

                <Button onClick={() => {
                    navigate(defaultRoute)
                }}>
                    Login
                </Button>
            </div>
        </section>
    )
}

export default Login