import { Input } from "@shared/ui/chadcn/input";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { PasswordField } from "@shared/ui/Organisms/PasswordField";
import TextDivider from "../TextDivider";
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
        <section className="relative flex flex-col md:flex-1 justify-center bg-cover bg-center p-6 md:p-9 w-full"
            style={{ backgroundImage: "url('/hero.jpg')" }}>
            {/*backdrop*/}
            <div className="absolute inset-0 bg-linear-to-r from-black/90 to-black/50" />
            {/*content*/}
            <div className="z-10 relative flex flex-col gap-4">
                <h2 className="m-0 text-brand">GameTracker</h2>
                <div className="flex flex-col gap-1 max-w-xl">
                    <h1 className="font-semibold text-5xl md:text-7xl">
                        Join the <span className="text-brand">Ultimate</span> Gamer Community
                    </h1>
                </div>
                <span className="w-xl max-w-full text-subtitle text-sm md:text-xl">
                    Create your gaming backlog, decide what to play next, connect with millions of players worldwide and build a community.
                </span>
                <div className="mt-10">
                    <Features />
                </div>
            </div>
        </section>
    )

    return (
        <section className="flex lg:flex-row flex-col">
            <Hero />
            <form className="flex flex-col bg-card shadow-sm px-7 md:px-16 py-7 md:py-12 border w-full lg:max-w-xl lg:h-dvh" onSubmit={e => {
                e.preventDefault();
                handleRegister();
            }}>
                <div>
                    <h2 className="block">Create Account</h2>
                    <span className="text-subtitle text-sm">Step into your gaming journey</span>
                </div>
                <div className="flex flex-col gap-4 my-7 w-full">
                    <SocialAuth />
                    {/* divider */}
                    <TextDivider text="Or with email"/>
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
                {error && <span className="mt-3 text-red-500 text-sm text-center">{error}</span>}
                <div className="mt-4 text-center">
                    <span>Already have an account? <Link to={publicRoutes.LOGIN} className="link-primary">Sign In</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Register