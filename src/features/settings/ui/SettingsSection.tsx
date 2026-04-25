import type { ReactNode } from "react";

interface SettingSectionProps {
  title: string,
  children?: ReactNode,
  id?: string,
}
const SettingsSection = ({
  title,
  children,
  id
}: SettingSectionProps) => {
  return (
    <section id={id || title} className="mx-auto md:p-5 lg:p-8 pb-8 w-full max-w-5xl">
      <h2 className="mb-5">{title}</h2>
      {children}
    </section>
  )
}

export default SettingsSection;