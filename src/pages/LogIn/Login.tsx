// styles
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

// feature icons
import { IoPeople } from "react-icons/io5";
import { MdChecklistRtl } from "react-icons/md";

import Button from "../../components/Atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { PasswordField } from "../../components/Organisms/PasswordField";

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
            <SocialButton provider="Google" icon={<FaGoogle />} color={providerColors.Google} />
            <SocialButton provider="Discord" icon={<FaDiscord />} color={providerColors.Discord} />
        </div>
    </div>
)

const providerColors = {
    "Google": "#4285f4",
    "Discord": "#5865F2",
    "default": "#e0e0e0"
} as const;
interface SocialButtonProps {
    provider: string;
    icon: ReactNode;
    color?: typeof providerColors[keyof typeof providerColors];
}
const SocialButton = ({ provider, icon, color = providerColors.default }: SocialButtonProps) => {
    const baseClass = "flex items-center justify-center gap-2 w-full py-2 border rounded-md cursor-pointer transition-colors text-white";
    const hoverClass = `hover:bg-[${color}]`;
    return (<button className={[baseClass, hoverClass].join(" ")}>
        {icon}
        <span>{provider}</span>
    </button>)
}

const Login = () => {
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
                <form className={styles["login-form"]}>
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
                                type="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                        </Field>
                        <PasswordField password={password} setPassword={setPassword} />
                    </div>

                    <Button onClick={handleLogin} disabled={loading} type="submit">
                        {loading ? "Signing you in..." : "Sign In"}
                    </Button>
                    {error && <span className={styles.error}>{error}</span>}
                    <div className={styles["signup-link"]}>
                        <span>Don't have an account? <Link to={publicRoutes.SIGNUP}>Sign up</Link></span>
                    </div>

                    <SocialAuth />
                </form>
            </div>
        </section>
    )
}

export default Login