const TextDivider = ({ text }: { text: string}) => (
    <div className="flex items-center gap-2">
        <div className="flex-1 bg-subtitle h-px" />
        <span className="text-subtitle text-sm text-center">{text}</span>
        <div className="flex-1 bg-subtitle h-px" />
    </div>
)

export default TextDivider;