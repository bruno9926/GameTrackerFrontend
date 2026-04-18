import { Input } from "@shared/ui/chadcn/input";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { PasswordField } from "@shared/ui/Organisms/PasswordField";
import Button from "@shared/ui/Atoms/Button/Button";
import { Link } from "react-router";
import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import { useNavigate } from "react-router";
import SocialAuth from "../LogIn/SocialAuth";
import Features from "../LogIn/Features";

// login route
import { publicRoutes } from "@routes/routes";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        register,
        loading,
        error
    } = useRegister();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register({
                username,
                email,
                password
            })
        } catch {
            return;
        }

        // clear fields
        setUsername("");
        setEmail("");
        setPassword("");

        navigate(publicRoutes.LOGIN);
    }

    const Hero = () => (
        <section className="flex flex-col flex-1 justify-center p-9 relative bg-cover bg-center"
            style={{ backgroundImage: "url('/hero.jpg')" }}>
            {/*backdrop*/}
            <div className="absolute inset-0 bg-linear-to-r from-black/90 to-black/50" />
            {/*content*/}
            <div className="relative z-10 flex flex-col gap-4">
                <h2 className="text-brand m-0">GameTracker</h2>
                <div className="flex flex-col gap-1 max-w-xl">
                    <h1 className="text-[4.5rem] font-semibold">
                        Join the <span className="text-brand">Ultimate</span> Gamer Community
                    </h1>
                </div>
                <span className="w-xl text-subtitle text-xl">
                    Create your gaming backlog, decide what to play next, connect with millions of players worldwide and build a community.
                </span>
                <div className="mt-10">
                    <Features />
                </div>
            </div>
        </section>
    )

    return (
        <section className="h-screen flex">
            <Hero />
            <div>
                <form className="flex flex-col h-full w-xl border py-12 px-16 bg-card shadow-sm" onSubmit={e => {
                    e.preventDefault();
                    handleRegister();
                }}>
                    <div>
                        <h2 className="block">Create Account</h2>
                        <span className="text-subtitle text-sm">Step into your gaming journey</span>
                    </div>
                    <div className="flex flex-col w-full gap-4 my-7">
                        <SocialAuth />
                        {/* divider */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-subtitle" />
                            <span className="text-center text-subtitle text-sm">Or with email</span>
                            <div className="flex-1 h-px bg-subtitle" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mb-6">
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                id="username"
                                name="username"
                                autoComplete="username"
                                type="text"
                                value={username}
                                disabled={loading}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            />
                        </Field>
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
                        {loading ? "Signing you up..." : "Sign Up"}
                    </Button>
                    {error && <span className="mt-3 text-sm text-red-500 text-center">{error}</span>}
                    <div className="mt-4 text-center">
                        <span>Already have an account? <Link to={publicRoutes.LOGIN} className="link-primary">Sign In</Link>
                        </span>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register