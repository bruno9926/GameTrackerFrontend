import {
    userRoutes as routes,
    userPageNames as pageNames,
    type UserRouteToken as RouteToken
} from "@app/routes/routes";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@shared/ui/chadcn/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shared/ui/chadcn/popover";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@shared/ui/chadcn/input-group";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router";
import { useState } from "react";

const SearchIcon = () => (
    <div className="navbar-icon">
        <IoIosSearch />
    </div>
)

const SearchInput = () => (
    <InputGroup className="w-62 h-9">
        <InputGroupInput placeholder="Search games, friends..." />
        <InputGroupAddon align="inline-start">
            <IoIosSearch />
        </InputGroupAddon>
    </InputGroup>
)

const CommandBody = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <Command>
            <CommandInput placeholder="Search games, friends..." />
            <CommandList>
                <CommandEmpty>No results found...</CommandEmpty>
                <CommandGroup heading="Go to">
                    {
                        Object.entries(pageNames).map(([routeToken, pageName]) => {
                            return (
                                <CommandItem
                                    key={routeToken}
                                    onSelect={() => setOpen(false)}
                                >
                                    <Link to={routes[routeToken as RouteToken]}>{pageName}</Link>
                                </CommandItem>
                            )
                        })
                    }
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

const SearchMobile = () => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <SearchIcon />
            </PopoverTrigger>
            <PopoverContent className="p-2" align="center" side="top">
                <CommandBody setOpen={setOpen} />
            </PopoverContent>
        </Popover>
    )
}

const SearchDesktop = () => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <SearchInput />
            </PopoverTrigger>
            <PopoverContent className="p-1" align="end" side="top" sideOffset={-50}>
                <CommandBody setOpen={setOpen} />
            </PopoverContent>
        </Popover>
    )
}

const Search = () => {
    return (
        <>
            <div className="md:hidden flex items-center">
                <SearchMobile />
            </div>
            <div className="hidden md:block">
                <SearchDesktop />
            </div>
        </>
    )
}

export default Search