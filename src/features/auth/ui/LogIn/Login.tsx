import logo from "@assets/logo.png";
import SocialAuth from "./SocialAuth";
import Features from "./Features";

import Button from "@shared/ui/Atoms/Button/Button";
import TextDivider from "../TextDivider";
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
        <div className="grid grid-cols-1 md:grid-cols-2 auth-card">
            {/*info */}
            <div className="flex flex-col justify-center items-center mb-4 md:mb-0 p-6 md:p-10 lg:p-16">
                <img src={logo} alt="Gamer Dashboard Logo" className="mb-4 h-20" />
                <span className="text-md text-center">The ultimate command center for your gaming stats, progressions and community connections.</span>
                <div className="mt-10">
                    <Features/>
                </div>
            </div>
            {/*form */}
            <form className="flex flex-col justify-center mt-4 md:mt-0 p-6 lg:p-16 border-t md:border-t-0 md:border-l h-full" onSubmit={e => {
                e.preventDefault();
                handleLogin()
            }}>
                <div className="mb-4">
                    <h2 className="mb-0 text-title">Sign In</h2>
                    <span>Welcome back. Enter your details to sync your progress.</span>
                </div>

                <div className="flex flex-col gap-4 py-6">
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
                <div className="mt-4 font-normal text-subtitle text-sm text-center">
                    <span>Don't have an account? <Link to={publicRoutes.SIGNUP} className="link-primary">Sign up</Link></span>
                </div>
                <div className="flex flex-col gap-4 mt-10 w-full">
                    {/* divider */}
                    <TextDivider text="Or connect with"/>
                    <SocialAuth />
                </div>
            </form>
        </div>
    )
}

export default Login