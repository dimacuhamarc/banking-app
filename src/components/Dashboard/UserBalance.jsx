import { CardBalance, CardStyles } from "./DashboardCards/Card";

export default function UserBalance() {
  return (
    <CardBalance 
      data={`PHP ${Intl.NumberFormat("en-PH",2).format(42415.43)}`}
      style={CardStyles.cash}
      icon={<i class="fa-solid fa-money-bill"></i>}
      accountHolder={'Kim Min-jeong'}
      accountNumber={'2416 2335 23'}
    />
  );
}
