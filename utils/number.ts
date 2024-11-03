export const toNumber = (
  number: number | undefined,
  digit: number | null = null
): string => {
  if (number !== undefined) {
    if (digit !== null) {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digit,
        minimumFractionDigits: digit,
        useGrouping: true,
      }).format(number);
    } else {
      return new Intl.NumberFormat("en-US", {
        useGrouping: true,
      }).format(number);
    }
  } else {
    return "";
  }
};
