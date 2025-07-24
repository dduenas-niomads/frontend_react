import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
//import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";

export default function Home() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido al Home</h1>
      {/* Aquí tu dashboard */}
      <EcommerceMetrics />
      <MonthlySalesChart />
      <StatisticsChart />
      <MonthlyTarget />
      <RecentOrders />
      <DemographicCard />
      {/* <PageMeta /> */}
    </div>
  );
}