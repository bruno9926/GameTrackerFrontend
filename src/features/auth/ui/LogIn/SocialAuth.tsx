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

export default SocialAuth;