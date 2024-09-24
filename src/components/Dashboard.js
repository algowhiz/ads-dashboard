import { useEffect, useState } from "react";
import AdInsightsTable from "./AdInsightsTable";
import PieChart from "./PieChart";
import Adcards from './AdCards'


const Dashboard = () => {

  const initialCampaigns = [
    { name: "Conditioner", clicks: 3189, cost: 2150, conversions: 142, revenue: 4789 },
    { name: "Facewash", clicks: 4521, cost: 3078, conversions: 198, revenue: 6698 },
    { name: "Serums", clicks: 3961, cost: 4278, conversions: 321, revenue: 10567 },
    { name: "Cosmetics", clicks: 712, cost: 4272, conversions: 8, revenue: 16568 },
    { name: "Shampoos", clicks: 7264, cost: 5489, conversions: 287, revenue: 9543 },
    { name: "Fasewash", clicks: 4132, cost: 2987, conversions: 189, revenue: 6321 },
  ];

  const initialCampaigns2 = [
    { name: "Female", clicks: 3961, cost: 4278, conversions: 321, revenue: 10567 },
    { name: "Male", clicks: 712, cost: 4272, conversions: 8, revenue: 16568 },
    { name: "Unknown", clicks: 4132, cost: 2987, conversions: 189, revenue: 6321 },
  ];

  const tableHeading = ["Campaigns", "Clicks", "Cost", "Conversions", "Revenue"];
  const tableHeading2 = ["Groups", "Clicks", "Cost", "Conversions", "Revenue"];

  const [animate, setAnimate] = useState(false);

  const totals = initialCampaigns2.reduce((acc, campaign) => {
    acc.clicks += campaign.clicks;
    acc.cost += campaign.cost;
    acc.conversions += campaign.conversions;
    acc.revenue += campaign.revenue;
    return acc;
  }, { clicks: 0, cost: 0, conversions: 0, revenue: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <div className={`p-4 flex mt-5 text-[#99A2A9] flex-col md:flex-col lg:flex-row gap-4  ${animate ? 'animate-slide-in-left' : ''}  `}>
        {/* Ad Insights Table */}
        <AdInsightsTable initialCampaigns={initialCampaigns} tableHeading={tableHeading} showHeader={true} />

        {/* Pie Chart */}
        <PieChart initialCampaigns={initialCampaigns2} totals={totals} tableHeading={tableHeading2} showHeader={false} />


      </div>
      <Adcards />
    </>
  );
};

export default Dashboard;
