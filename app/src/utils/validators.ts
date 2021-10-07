function thirteenDigitsISBN(isbn: string): boolean {
    let sum, digit, check, i;
    sum = 0;
    for (i = 0; i < 12; i++) {
        digit = parseInt(isbn[i]);
        if (i % 2 == 1) {
            sum += 3 * digit;
        } else {
            sum += digit;
        }
    }
    check = (10 - (sum % 10)) % 10;
    return (check == isbn[isbn.length - 1]);
}

function tenDigitsISBN(isbn: string): boolean {
    let sum, weight, digit, check, i;
    weight = 10;
    sum = 0;
    for (i = 0; i < 9; i++) {
        digit = parseInt(isbn[i]);
        sum += weight * digit;
        weight--;
    }
    check = (11 - (sum % 11)) % 11
    if (check == 10) {
        check = 'X';
    }
    return (check == isbn[isbn.length - 1].toUpperCase());

}

export function isValidISBN(isbn: string): boolean {
    isbn = isbn.replace(/[^0-9X]/gi, '');

    if (isbn.length == 10) return tenDigitsISBN(isbn)
    else if (isbn.length == 13) return thirteenDigitsISBN(isbn)
    else return false
}
