import type { ReactNode } from "react";
// feature icons
import { IoPeople } from "react-icons/io5";
import { MdChecklistRtl } from "react-icons/md";

const Features = () => (
    <div className="flex gap-3">
        <Feature text="Build a Community" icon={<IoPeople />} />
        <Feature text="Track your Backlog" icon={<MdChecklistRtl />} />
    </div>
)

const Feature = ({ text, icon }: { text: string, icon: ReactNode }) => (
    <div className="flex flex-col items-center justify-center border rounded-lg w-28 h-16 p-1 bg-gray-500/10">
        <span className="text-2xl text-brand mb-1">{icon}</span>
        <span className="text-xxs uppercase font-bold text-center">{text}</span>
    </div>
)

export default Features;