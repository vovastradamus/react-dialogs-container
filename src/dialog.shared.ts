export const dialogIDGenerator = (() => {
  let modalID = 0;
  return (): number => {
    modalID += 1;
    return modalID;
  };
})();

export function noop(): void {}
