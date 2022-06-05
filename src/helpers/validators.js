

export const required = value => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Maximum length is ${maxLength} symbols`;
    return undefined;
}