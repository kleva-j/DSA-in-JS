export const palindrome = (word: string) => {
  const reversed = word.split('').reverse().join('');
  return word === reversed;
};
