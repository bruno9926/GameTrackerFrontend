import { type FC, useEffect, useState } from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
    ComboboxInput,
} from "@shared/ui/chadcn/combobox";
import useGameTitleSearch from "@features/games/hooks/useGameTitleSearch";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import type { GameTitle } from "@features/games/model/GameTitle";

interface GameTitleSearchProps {
    onSelectValue: (value: GameTitle) => void
}
const GameTitleSearch: FC<GameTitleSearchProps> = ({ onSelectValue }) => {
    const [gameTitles, setGameTitles] = useState<GameTitle[]>([]);
    const clearSearchResults = () => setGameTitles([]);

    const [searchString, setSearchString] = useState<string>("");
    const [open, setOpen] = useState(false);

    const [waitingInput, setWaitingInput] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const debounceTime = 500; //in milliseconds
    const minSearchLenght = 2;

    const { searchGame, loading } = useGameTitleSearch()

    useEffect(() => {
        setWaitingInput(true);
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchString);
            setWaitingInput(false);
        }, debounceTime);

        return () => clearTimeout(timeout);
    }, [searchString]);

    useEffect(() => {
        if (debouncedSearch == "") {
            clearSearchResults();
            return;
        }
        if (debouncedSearch.length < minSearchLenght) return;

        let currentSearch = debouncedSearch;
        const asyncSearch = async () => {
            try {
                const result = await searchGame(currentSearch);
                if (currentSearch !== debouncedSearch) return;
                setGameTitles(result)
            } catch (e) {
                console.error(e)
            }
        }
        asyncSearch();
    }, [debouncedSearch])

    return (
        <Field>
            <FieldLabel>Name</FieldLabel>
            <Combobox
                items={gameTitles}
                inputValue={searchString}
                onInputValueChange={(value) => {
                    setOpen(true);
                    setSearchString(value);
                }}
                onValueChange={(value) => {
                    let gameTitle = value as GameTitle
                    onSelectValue(gameTitle);
                }}
                itemToStringLabel={gameTitle => (gameTitle as GameTitle).name }
                open={open}
                onOpenChange={setOpen}
            >
                <ComboboxInput placeholder="Search for a game title" />
                <ComboboxContent>
                    <ComboboxEmpty>{
                        (loading || waitingInput) ? "Searching..."
                            : searchString ? "No results" : "Type to search for games"
                    }</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => {
                            let gameTitle = item as GameTitle;
                            return (
                                <ComboboxItem key={gameTitle.id} value={gameTitle} className="cursor-pointer">
                                    {gameTitle.name}
                                </ComboboxItem>
                            )
                        }}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </Field >
    );
};

export default GameTitleSearch;
