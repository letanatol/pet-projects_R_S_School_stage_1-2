
function setLocalStorage(key, array) {
  const arrayString = JSON.stringify(array);
  localStorage.setItem(key, arrayString);
}

function getLocalStorage(key) {
  const arrayString = localStorage.getItem(key);
  return JSON.parse(arrayString);
}

export { setLocalStorage, getLocalStorage };
