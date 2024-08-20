export default function numberFormat(number, decimals = 2) {
  const formatter = new Intl.NumberFormat("en", {
    style: "decimal",
    maximumFractionDigits: decimals,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return number ? formatter.format(number) : 0;
}
