import { InputGroup, InputGroupAddon, InputGroupInput } from "@shared/ui/chadcn/input-group";
import { RiSearchLine } from "react-icons/ri";

interface FriendsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FriendsSearch = ({ value, onChange, placeholder = "Search friends..." }: FriendsSearchProps) => {
  return (
    <InputGroup>
      <InputGroupAddon>
        <RiSearchLine />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default FriendsSearch;
