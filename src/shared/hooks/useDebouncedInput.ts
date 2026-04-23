import { useEffect, useState } from "react";

interface UseDebouncedInputOptions {
  debounceTime?: number;
  minLength?: number;
}

interface UseDebouncedInputReturn {
  debouncedInput: string;
  waitingInput: boolean;
}

export const useDebouncedInput = (
  input: string,
  options: UseDebouncedInputOptions = {}
): UseDebouncedInputReturn => {
  const { debounceTime = 500, minLength = 0 } = options;
  
  const [debouncedInput, setDebouncedInput] = useState("");
  const [waitingInput, setWaitingInput] = useState(false);

  useEffect(() => {
    setWaitingInput(true);
    const timeout = setTimeout(() => {
      setDebouncedInput(input);
      setWaitingInput(false);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [input, debounceTime]);

  return {
    debouncedInput,
    waitingInput: waitingInput && input.length >= minLength,
  };
};
