export default function numberFormat(number, decimals = 2) {
  const formatter = new Intl.NumberFormat("es", {
    style: "decimal",
    maximumFractionDigits: decimals,
  });
  return number ? formatter.format(number) : 0;
}
