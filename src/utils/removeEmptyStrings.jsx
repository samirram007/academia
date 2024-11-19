export const removeEmptyStrings = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));

export const upperCaseFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const lowerCaseFirstLetter = (str) => str.charAt(0).toLowerCase() + str.slice(1);

export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeWords = (str) => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

export const capitalizeAllWords = (str) => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

export const upperCase = (str) => str.toUpperCase();

export const lowerCase = (str) => str.toLowerCase();
