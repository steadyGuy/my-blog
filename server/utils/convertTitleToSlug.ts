const translit = function (str: string) {

  if (!str.match(/[А-я]/)) return str;

  let abc = require("./dict");
  let letters = str.split("");
  let newStr = "";
  for (let i = 0, l = letters.length; i < l; i++) {
    let letter = letters[i];
    newStr += (abc[letter] !== undefined) ? abc[letter] : letter;
  }

  return newStr;
};

export const convertTitleToSlug = (title: string) => {
  return translit(
    title
      .toLowerCase()
      .trim()
      .replace(/[^\p{Letter} ]+/gu, '')
      .replace(/ +/g, '-'));
}