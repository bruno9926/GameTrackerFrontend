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
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";
import { Field, FieldLabel, FieldDescription } from "@shared/ui/chadcn/field";
import type { GameTitle } from "@features/games/model/GameTitle";

interface GameTitleSearchProps {
    searchString: string,
    setSearchString: (searchString: string) => void
    onSelectValue: (value: GameTitle | null) => void,
    selectedGameTitle: GameTitle | null,
    selectionError: string | null,
    setSelectionError: (error: string | null) => void
}
const GameTitleSearch: FC<GameTitleSearchProps> = ({
    searchString,
    setSearchString,
    onSelectValue,
    selectedGameTitle,
    selectionError,
    setSelectionError
}) => {
    const [gameTitles, setGameTitles] = useState<GameTitle[]>([]);
    const clearSearchResults = () => setGameTitles([]);

    const [open, setOpen] = useState(false);

    const { searchGame, loading } = useGameTitleSearch();

    const { debouncedInput: debouncedSearch, waitingInput } = useDebouncedInput(searchString, {
        debounceTime: 500,
        minLength: 2,
    });

    useEffect(() => {
        if (debouncedSearch == "") {
            clearSearchResults();
            return;
        }

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
            <FieldLabel className={selectionError ? "text-error" : ""}>Name</FieldLabel>
            <Combobox
                items={gameTitles}
                inputValue={selectedGameTitle?.name ?? searchString}
                onInputValueChange={(value) => {
                    setSearchString(value);
                    setSelectionError(null);
                    // this ensure the selected game matches with the input content
                    if (selectedGameTitle !== null) onSelectValue(null);
                }}
                onValueChange={(value) => {
                    let gameTitle = value as GameTitle
                    setSearchString("")
                    setSelectionError(null);
                    onSelectValue(gameTitle);
                }}
                itemToStringLabel={gameTitle => (gameTitle as GameTitle).name}
                open={open}
                onOpenChange={setOpen}
            >
                
                <ComboboxInput placeholder="Search for a game title" aria-invalid={!!selectionError}/>
                {selectionError && <FieldDescription className="text-error">{selectionError}</FieldDescription>}
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
