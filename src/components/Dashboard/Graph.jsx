import { CardGraph, CardStyles } from "./DashboardCards/Card";

export default function Graph() {
  return (
    <CardGraph 
      data={`graph should be here`}
      style={CardStyles.graph}
      icon={<i class="fa-solid fa-graph"></i>}
    />
  );
}
