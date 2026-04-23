export type ApiError = {
    message: string;
    code: ERROR_CODE;
    status?: number;
};

export type ERROR_CODE =
    'GAME_ALREADY_EXISTS' |
    'UNKNOWN_ERROR'

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
};