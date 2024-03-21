export const  ToTitleCase=(str)=>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
export const  ToSentenceCase=(str)=>{
    return str.charAt(0).toUpperCase()+str.substr(1).toLowerCase();
}
export const  ToCamelCase=(str)=>{
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0? match.toLowerCase() : match.toUpperCase();
    });
}
// snake case to word
export const  ToWordCase=(str)=>{

    return Capitalize(str.replace(/_/g,' '));
}
// capitalize first letter of each word in a string
export const  Capitalize=(str)=>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
