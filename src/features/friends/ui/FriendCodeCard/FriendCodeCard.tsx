import { useState } from "react";
import { Input } from "@shared/ui/chadcn/input";
import { RiArrowRightLine } from "react-icons/ri";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

interface FriendCodeCardProps {
  code: string;
  onAddFriend?: (code: string) => void;
}

const FriendCodeCard = ({ code, onAddFriend }: FriendCodeCardProps) => {
  const [friendCode, setFriendCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!friendCode.trim()) return;
    onAddFriend?.(friendCode.trim());
    setFriendCode("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="gap-3 card">
      {/* Your code */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-subtitle text-xxs uppercase">Your code</span>
          <span className="font-bold text-title text-xl">{code}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 cursor-pointer badge ${copied ? "border-success text-success bg-success/10" : ""}`}
        >
          {copied ? <LuCopyCheck size={15} /> : <LuCopy size={15} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Add friend input */}
      <div className="flex gap-2">
        <Input
          placeholder="Friend's code"
          value={friendCode}
          onChange={(e) => setFriendCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="flex justify-center items-center bg-brand hover:bg-brand/80 p-2 rounded-lg h-11 aspect-square text-white transition-colors cursor-pointer animation-duration shrink-0"
        >
          <RiArrowRightLine size={20} />
        </button>
      </div>
    </div>
  );
};

export default FriendCodeCard;
