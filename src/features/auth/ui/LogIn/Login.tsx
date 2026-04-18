// styles
import styles from "./Login.module.scss";
import logo from "@assets/logo.png";
import SocialAuth from "./SocialAuth";
import Features from "./Features";

import Button from "@shared/ui/Atoms/Button/Button";
import { Input } from "@shared/ui/chadcn/input";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { PasswordField } from "@shared/ui/Organisms/PasswordField";

// routing
import { useLocation, useNavigate } from "react-router";
import { defaultRoute } from "@routes/routes";
import { Link } from "react-router";
import { publicRoutes } from "@routes/routes";

import { useState, type ReactNode } from "react";
import useLogin from "../../hooks/useLogin";


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { login, loading, error } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login({ email, password });
        } catch {
            return;
        }

        // clear fields
        setEmail("");
        setPassword("");

        const from = (location.state as any)?.from?.pathname || defaultRoute;
        navigate(from, { replace: true });
    }

    return (
        <div className={styles["login-card"]}>
            <div className={styles["presentation"]}>
                <img src={logo} alt="Gamer Dashboard Logo" />
                <span className="text-md">The ultimate command center for your gaming stats, progressions and community connections.</span>
                <div className="mt-10">
                    <Features/>
                </div>
            </div>
            <form className={styles["login-form"]} onSubmit={e => {
                e.preventDefault();
                handleLogin()
            }}>
                <div className={styles["login-title"]}>
                    <h2 className="text-white">Sign In</h2>
                    <span>Welcome back. Enter your details to sync your progress.</span>
                </div>

                <div className={styles.body}>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            value={email}
                            disabled={loading}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                    </Field>
                    <PasswordField password={password} setPassword={setPassword} disabled={loading} />
                </div>

                <Button disabled={loading} type="submit">
                    {loading ? "Signing you in..." : "Sign In"}
                </Button>
                {error && <span className={styles.error}>{error}</span>}
                <div className={styles["signup-link"]}>
                    <span>Don't have an account? <Link to={publicRoutes.SIGNUP}>Sign up</Link></span>
                </div>
                <div className="flex flex-col w-full gap-4 mt-10">
                    {/* divider */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-[#929292]" />
                        <span className="text-center text-[#929292] text-sm">Or connect with</span>
                        <div className="flex-1 h-px bg-[#929292]" />
                    </div>
                    <SocialAuth />
                </div>
            </form>
        </div>
    )
}

export default Login