
export function titleCase(str) {
    return str.replace(/\w\S/g, function (t) { return t.toUpperCase() });
}

export function sentenceCase(str) {
    return str.replace(/[a-z]/i, function (letter) {

        return letter.toUpperCase();

    }).trim();
}