// styles
import styles from "./Login.module.scss";
import logo from "@assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

// feature icons
import { IoPeople } from "react-icons/io5";
import { MdChecklistRtl } from "react-icons/md";

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


const Feature = ({ text, icon }: { text: string, icon: ReactNode }) => (
    <div className={styles["feature"]}>
        <span className={styles["icon"]}>{icon}</span>
        <span className={styles["text"]}>{text}</span>
    </div>
)

const SocialAuth = () => (
    <div className="flex flex-col w-full gap-4 mt-10">
        {/* divider */}
        <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#929292]" />
            <span className="text-center">Or connect with</span>
            <div className="flex-1 h-px bg-[#929292]" />
        </div>
        {/* social buttons */}
        <div className="flex gap-4">
            <SocialButton provider="Google" icon={<FaGoogle />} />
            <SocialButton provider="Discord" icon={<FaDiscord />} />
        </div>
    </div>
)

const Provider = {
    "GOOGLE": "Google",
    "DISCORD": "Discord"
} as const;
const providerStyles = {
    [Provider.GOOGLE]: "border-[#4285f4] text-[#4285f4] hover:bg-[#4285f4] hover:text-white",
    [Provider.DISCORD]: "border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white",
} as const;
interface SocialButtonProps {
    provider: (typeof Provider)[keyof typeof Provider];
    icon: ReactNode;
}
const SocialButton = ({ provider, icon }: SocialButtonProps) => {
    const baseClass = "flex items-center justify-center gap-2 w-full py-2 border rounded-md cursor-pointer transition-all duration-200";
    const hoverClass = providerStyles[provider] || providerStyles[Provider.GOOGLE];
    return (
        <button className={[baseClass, hoverClass].join(" ")} type="button">
            {icon}
            <span>{provider}</span>
        </button>
    )
}

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
                <span>The ultimate command center for your gaming stats, progressions and community connections.</span>
                <div className={styles["feature-row"]}>
                    <Feature text="Build a Community" icon={<IoPeople />} />
                    <Feature text="Track your Backlog" icon={<MdChecklistRtl />} />
                </div>
            </div>
            <form className={styles["login-form"]} onSubmit={e => {
                e.preventDefault();
                handleLogin()
            }}>
                <div className={styles["login-title"]}>
                    <h2>Sign In</h2>
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
                <SocialAuth />
            </form>
        </div>
    )
}

export default Login