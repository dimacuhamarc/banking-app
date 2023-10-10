
export function formatData(data) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    currencyDisplay: "narrowSymbol",
  }).format(data);
}

export function formatAccountNumber(data) {
  return data.toString().replace(/\d{4}(?=.)/g, "$& ");
}

export function formatHolderName(data) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return data
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}