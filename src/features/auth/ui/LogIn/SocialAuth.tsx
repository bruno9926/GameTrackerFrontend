import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import type { ReactNode } from "react";

const SocialAuth = () => (
    <div className="flex gap-4">
        <SocialButton provider="Google" icon={<FaGoogle />} />
        <SocialButton provider="Discord" icon={<FaDiscord />} />
    </div>
)

const Provider = {
    "GOOGLE": "Google",
    "DISCORD": "Discord"
} as const;
const providerStyles = {
    [Provider.GOOGLE]: "border-google text-google hover:bg-google hover:text-white active:bg-google active:text-white",
    [Provider.DISCORD]: "border-discord text-discord hover:bg-discord hover:text-white active:bg-discord active:text-white",
} as const;
interface SocialButtonProps {
    provider: (typeof Provider)[keyof typeof Provider];
    icon: ReactNode;
}
const SocialButton = ({ provider, icon }: SocialButtonProps) => {
    const baseClass = "flex items-center justify-center gap-2 w-full py-2 border rounded-md cursor-pointer transition-all animation-duration";
    const hoverClass = providerStyles[provider] || providerStyles[Provider.GOOGLE];
    return (
        <button className={[baseClass, hoverClass].join(" ")} type="button">
            {icon}
            <span>{provider}</span>
        </button>
    )
}

export default SocialAuth;