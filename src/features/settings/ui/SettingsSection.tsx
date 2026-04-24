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
    <section id={id || title} className="card">
      <h2 className="mb-4">{title}</h2>
      {children}
    </section>
  )
}

export default SettingsSection;