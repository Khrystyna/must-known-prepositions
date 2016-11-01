// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
export const makeIterator = (array) => {
  let nextIndex = 0;

  return {
    next () {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {done: true};
    }
  }
}