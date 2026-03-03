import sanitizeHtml from "sanitize-html";

// Sanitize user generate strings, Avoids script injection
export function sanitizeString(value) {
    return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {}
    });
};