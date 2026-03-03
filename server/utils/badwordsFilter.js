import Filter from "bad-words";
import AppError from "./AppError.js";

const filter = new Filter();

export function checkBadWords(words) {
    for (const value of Object.values(words)) {
        // Run inputs through checker, throw error if contains bad words
        if (typeof value === "string" && filter.isProfane(value)) {
            throw new AppError("No foul language allowed, please change your input", 400);
        }
    }
}