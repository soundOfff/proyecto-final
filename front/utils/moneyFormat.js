export default function moneyFormat(currency) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(currency.toFixed(2));
}
