import { Input } from "@shared/ui/chadcn/input";
import { useState } from "react";

const Search = () => {
    const [ value, setValue ] = useState<string>();

    return (
        <div>
            <Input
                className="h-9"
                placeholder="Search games, friends..."
                name="search"
                type="text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
        </div>
    )
}

export default Search