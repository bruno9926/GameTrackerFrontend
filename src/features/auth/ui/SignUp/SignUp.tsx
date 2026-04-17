import styles from "./Signup.module.scss";
import Input from "@shared/ui/Atoms/Input/Input";
import Button from "@shared/ui/Atoms/Button/Button";
import { Link } from "react-router";
import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import { useNavigate } from "react-router";
// login route
import { publicRoutes } from "@routes/routes";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = useRegister();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register({
                username,
                email,
                password
            })
        } catch (error) {
            alert(error);
            return;
        }

        // clear fields
        setUsername("");
        setEmail("");
        setPassword("");

        navigate(publicRoutes.LOGIN);
    }

    return (
        <section className={styles["signup-page"]}>
            <div className={styles["signup-card"]}>
                <div className={styles.header}>
                    <h2>Sign Up</h2>
                </div>
                <div className={styles.body}>
                    <Input
                        type="text"
                        label="user name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                <Button onClick={handleRegister}>
                    Sign Up
                </Button>
                <div className={styles["login-link"]}>
                    <span>Already have an account? <Link to={publicRoutes.LOGIN}>Log in</Link></span>
                </div>
            </div>
        </section>
    )
}

export default SignUp