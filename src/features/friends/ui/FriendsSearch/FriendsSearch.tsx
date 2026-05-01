import { InputGroup, InputGroupAddon, InputGroupInput } from "@shared/ui/chadcn/input-group";
import { RiSearchLine } from "react-icons/ri";

const FriendsSearch = () => {
  return (
    <InputGroup>
      <InputGroupAddon>
        <RiSearchLine />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search friends..." />
    </InputGroup>
  );
};

export default FriendsSearch;
