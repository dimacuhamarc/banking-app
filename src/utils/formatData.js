
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
