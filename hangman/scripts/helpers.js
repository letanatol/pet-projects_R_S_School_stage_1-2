function isCyrillic(letter) {
  const regex = /[а-яА-Я]/;

  return regex.test(letter);
}

export default isCyrillic;