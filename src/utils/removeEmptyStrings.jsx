// export const removeEmptyStrings = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
export const removeEmptyStrings = (obj) =>
    Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== '' && v !== null)
    );
export const upperCaseFirstLetter = (str) => {
    if (!str) return
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const lowerCaseFirstLetter = (str) => str.charAt(0).toLowerCase() + str.slice(1);

export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeWords = (str) => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

export const capitalizeAllWords = (str) => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

export const upperCase = (str) => str.toUpperCase();

export const lowerCase = (str) => str.toLowerCase();
export const fallbackText = (str) => {
    if (!str || typeof str !== "string") return ""; // Handle empty or invalid input

    const words = str.trim().split(/\s+/); // Split by spaces, trimming extra spaces
    if (words.length === 1) {
        return words[0][0].toUpperCase(); // Single word: return the first letter
    }

    const firstLetter = words[0][0].toUpperCase();
    const lastLetter = words[words.length - 1][0].toUpperCase();

      return firstLetter + lastLetter;
  };