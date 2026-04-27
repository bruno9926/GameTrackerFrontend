// Register.tsx
import { Link } from "react-router";
import RegisterForm from "./RegisterForm";
import SocialAuth from "../LogIn/SocialAuth";
import TextDivider from "../TextDivider";
import Features from "../LogIn/Features";
import { publicRoutes } from "@routes/routes";

const Hero = () => (
    <section
        className="relative flex flex-col md:flex-1 justify-center bg-cover bg-center md:p-9 px-6 py-9 w-full"
        style={{ backgroundImage: "url('/hero.jpg')" }}
    >
        <div className="absolute inset-0 bg-linear-to-r from-black/90 to-black/50" />

        <div className="z-10 relative flex flex-col gap-4">
            <h2 className="m-0 text-brand">GameTracker</h2>
            <div className="flex flex-col gap-1 max-w-xl">
                <h1 className="font-semibold text-5xl md:text-7xl">
                    Join the <span className="text-brand">Ultimate</span> Gamer Community
                </h1>
            </div>
            <span className="w-xl max-w-full text-subtitle text-sm md:text-xl">
                Create your gaming backlog, decide what to play next...
            </span>

            <div className="mt-10">
                <Features />
            </div>
        </div>
    </section>
);

const Register = () => {
    return (
        <section className="flex lg:flex-row flex-col">
            <Hero />

            <div className="flex flex-col bg-card shadow-sm px-7 md:px-16 py-7 md:py-12 border w-full lg:max-w-xl lg:h-dvh">
                <div>
                    <h2>Create Account</h2>
                    <span className="text-subtitle text-sm">
                        Step into your gaming journey
                    </span>
                </div>

                <div className="flex flex-col gap-4 my-7">
                    <SocialAuth />
                    <TextDivider text="Or with email" />
                </div>

                <RegisterForm />

                <div className="mt-4 text-center">
                    <span>
                        Already have an account?{" "}
                        <Link to={publicRoutes.LOGIN} className="link-primary">
                            Sign In
                        </Link>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Register;