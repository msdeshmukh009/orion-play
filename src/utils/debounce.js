const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { debounce };
