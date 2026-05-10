import { describe, expect, it } from "vitest";
import type { ApiError } from "../api/ApiError";
import errorMessages, { getErrorMessage } from "./error-messages";

describe("error messages", () => {
    it("should return the correct error message for a known error code", () => {
        // given
        const error: ApiError = {
            code: "GAME_ALREADY_EXISTS",
            message: "Server error: game already exists"
        }
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe(errorMessages.GAME_ALREADY_EXISTS);
    }),

    it("should return the error message of an Error instance", () => {
        // given
        const error = new Error("This is an error message");
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe("This is an error message");
    })

    it("should return the message property of an object if it exists", () => {
        // given
        const error = { message: "This is an error message from an object" };
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe("This is an error message from an object");
    })

    it("should return the string if a string is passed", () => {
        // given
        const error = "This is a string error";
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe("This is a string error");
    })

    it("should return a stringified version of the error if it's an unknown type", () => {
        // given
        const error = { unexpected: "error" };
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe(JSON.stringify(error));
    })

    it("should return the error message for UNKNOWN_ERROR when it has a message", () => {
        // given
        const error: ApiError = {
            code: "UNKNOWN_ERROR",
            message: "Something went wrong on the server"
        };
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe("Something went wrong on the server");
    })

    it("should return the default UNKNOWN_ERROR label when it has no message", () => {
        // given
        const error: ApiError = {
            code: "UNKNOWN_ERROR",
            message: ""
        };
        //when
        const message = getErrorMessage(error);
        //then
        expect(message).toBe(errorMessages.UNKNOWN_ERROR);
    })

    it("should return the correct error message when called multiple times", () => {
        // given
        const error: ApiError = {
            code: "GAME_ALREADY_EXISTS",
            message: "Server error: game already exists"
        };
        //when
        let message = getErrorMessage(error);
        for (let i = 0; i < 5; i++) {
            message = getErrorMessage(error);
        }
        //then
        expect(message).toBe(errorMessages.GAME_ALREADY_EXISTS);
    });
});