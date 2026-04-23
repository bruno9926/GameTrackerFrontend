import { isApiError, type ApiError, type ERROR_CODE } from "@shared/api/ApiError";

const errorMessages: Record<ERROR_CODE, string> = {
  GAME_ALREADY_EXISTS: "This game is already in your list",
  UNKNOWN_ERROR: "Unknown error"
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) return getUserError(error);

  if (error instanceof Error) return error.message;

  return String(error);
}

const getUserError = (error: ApiError) => {
    return errorMessages[error.code] || error.message || errorMessages["UNKNOWN_ERROR"];
}

export default errorMessages;