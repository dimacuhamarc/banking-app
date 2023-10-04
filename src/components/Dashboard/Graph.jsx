import { CardGraph, CardStyles } from "./DashboardCards/Card";

export default function Graph() {
  return (
    <CardGraph 
      data={`graph should be here`}
      style={CardStyles.graph}
      icon={<i className="fa-solid fa-graph"></i>}
    />
  );
}
