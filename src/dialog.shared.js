export const dialogIDGenerator = (() => {
  let modalID = 1;
  return () => {
    modalID += 1;
    return modalID;
  };
})();

export function noop() {}
