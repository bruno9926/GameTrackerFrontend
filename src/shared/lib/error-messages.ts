import { isApiError, type ApiError, type ERROR_CODE } from "@shared/api/ApiError";

const errorMessages: Record<ERROR_CODE, string> = {
  GAME_ALREADY_EXISTS: "This game is already in your library",
  UNKNOWN_ERROR: "Unknown error"
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) return getUserError(error);

  if (error instanceof Error) return error.message;
  if (error instanceof Object && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  if (typeof error === "object") return JSON.stringify(error);

  return String(error);
}

const getUserError = (error: ApiError) => {
  if (error.code == 'UNKNOWN_ERROR') {
    return error.message || errorMessages[error.code];
  }
  return errorMessages[error.code] || error.message || errorMessages["UNKNOWN_ERROR"];
}

export default errorMessages;

export const withErrorMessage = <T, A = void>(fn: (arg: A) => Promise<T>) => async (arg: A): Promise<T> => {
    try { return await fn(arg); }
    catch (e) { throw new Error(getErrorMessage(e)); }
};