import { InputGroup, InputGroupAddon, InputGroupInput } from "@shared/ui/chadcn/input-group";
import { RiSearchLine } from "react-icons/ri";

interface FriendsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const FriendsSearch = ({ value, onChange }: FriendsSearchProps) => {
  return (
    <InputGroup>
      <InputGroupAddon>
        <RiSearchLine />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Search friends..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default FriendsSearch;
