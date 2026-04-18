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

import { useState } from "react";
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
        <div className="auth-card grid grid-cols-1 md:grid-cols-2">
            {/*info */}
            <div className="flex flex-col items-center justify-center mb-4 p-6 md:p-10 lg:p-16 md:mb-0">
                <img src={logo} alt="Gamer Dashboard Logo" className="h-20 mb-4" />
                <span className="text-md text-center">The ultimate command center for your gaming stats, progressions and community connections.</span>
                <div className="mt-10">
                    <Features/>
                </div>
            </div>
            {/*form */}
            <form className="h-full flex flex-col justify-center p-6 mt-4 border-t md:border-t-0 md:border-l md:mt-0 lg:p-16" onSubmit={e => {
                e.preventDefault();
                handleLogin()
            }}>
                <div className="mb-4">
                    <h2 className="text-title mb-0">Sign In</h2>
                    <span>Welcome back. Enter your details to sync your progress.</span>
                </div>

                <div className="py-6 flex flex-col gap-4">
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
                {error && <span className="mt-2 text-error text-sm text-center">{error}</span>}
                <div className="mt-4 text-center text-sm text-subtitle font-normal">
                    <span>Don't have an account? <Link to={publicRoutes.SIGNUP} className="link-primary">Sign up</Link></span>
                </div>
                <div className="flex flex-col w-full gap-4 mt-10">
                    {/* divider */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-subtitle" />
                        <span className="text-center text-subtitle text-sm">Or connect with</span>
                        <div className="flex-1 h-px bg-subtitle" />
                    </div>
                    <SocialAuth />
                </div>
            </form>
        </div>
    )
}

export default Login