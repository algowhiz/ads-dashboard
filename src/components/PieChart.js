import { Pie } from "react-chartjs-2";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Chart, ArcElement } from 'chart.js';
import { MdPieChart, MdOutlineTableChart } from "react-icons/md";
import { RadioGroup } from "@/components/ui/radio-group";
import { useState } from "react";
import { RxQuestionMarkCircled } from "react-icons/rx";
import AdInsightsTable from "./AdInsightsTable";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

Chart.register(ArcElement);

const PieChart = ({ initialCampaigns, tableHeading, showHeader, totals }) => {
  const [selectedOptionPie, setSelectedOptionPie] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Clicks');

  const [data, setData] = useState({
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        data: [8.09, 44.99, 46.93],
        backgroundColor: ["#FF813C", "#0096FF", "#323C46"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 5,
      },
    ],
  });

  const dropdDownOptions = [
    { value: 'clicks', label: 'Clicks' },
    { value: 'cost', label: 'Cost' },
    { value: 'conversions', label: 'Conversions' },
    { value: 'revenue', label: 'Revenue' },
  ];

  const malePercentage = ((initialCampaigns[1][selectedOption.toLowerCase()] / totals[selectedOption.toLowerCase()]) * 100).toFixed(2);
  const femalePercentage = ((initialCampaigns[0][selectedOption.toLowerCase()] / totals[selectedOption.toLowerCase()]) * 100).toFixed(2);
  const unknownPercentage = ((initialCampaigns[2][selectedOption.toLowerCase()] / totals[selectedOption.toLowerCase()]) * 100).toFixed(2);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);

    const updatedData = initialCampaigns.map(item => item[option.value]);

    setData({
      labels: ["Male", "Female", "Others"],
      datasets: [
        {
          data: updatedData,
          backgroundColor: ["#FF813C", "#0096FF", "#323C46"],
          borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
          borderWidth: 5,
        },
      ],
    });
  };

  const options = {
    cutout: '50%',
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <Card className="relative w-full md:w-full lg:w-1/2 h-auto rounded-none lg:h-[70vh]">
      <div className="border-b-2 border-[#99A2A9] mb-2 z-3">
        <CardHeader className="p-1">
          <div className="flex justify-between items-center">
            <h2 className="font-thin text-xl ml-3">Ad Insights</h2>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 m-1 flex items-center justify-between w-full hover:border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {selectedOption}
                  {isOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
                </button>

                {isOpen && (
                  <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {dropdDownOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleOptionClick(option)}
                        className={`px-2 flex justify-start items-center text-xs whitespace-nowrap py-1 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${selectedOption.toLowerCase() === option.value.toLowerCase() ? 'bg-[#E3EEFA]' : ''}`}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <RxQuestionMarkCircled color="#E6E6E6" size={28} />
            </div>
          </div>
        </CardHeader>
      </div>

      <div className=" h-[360px] md:h-[250px] lg:h-[270px]"> 
        {selectedOptionPie ? (
          <div className="flex flex-col md:flex-row md:justify-center md:items-center h-full">
            <div className="w-full md:w-2/3 flex justify-center items-center h-60 pointer-events-none"> 
              <Pie data={data} options={options} />
            </div>
            <div className="w-full ml-5 md:ml-0 md:w-1/3 mt-4 space-y-2">
              <p className="flex items-center space-x-2">
                <span className="w-14 h-6 bg-[#FF813C] inline-block rounded-lg"></span>
                <span>{malePercentage}% Male</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-14 h-6 bg-[#0096FF] inline-block rounded-lg"></span>
                <span>{femalePercentage}% Female</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-14 h-6 bg-[#323C46] inline-block rounded-lg"></span>
                <span>{unknownPercentage}% Others</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full"> 
            <AdInsightsTable initialCampaigns={initialCampaigns} tableHeading={tableHeading} showHeader={false} />
          </div>
        )}
      </div>

      <CardFooter className="relative p-6 flex items-center justify-end bg-white">
        <RadioGroup
          value="RadioGroup"
          onValueChange={setSelectedOptionPie}
          className="flex bg-[#EEEEEE] m-0 p-0 rounded-full cursor-pointer"
          onClick={() => setSelectedOptionPie(!selectedOptionPie)}
        >
          <div
            className={`flex items-center justify-center mr-[-9] w-10 h-10 rounded-full cursor-pointer ${selectedOptionPie ? 'bg-blue-500' : 'bg-gray-200'}`}
            onClick={() => setSelectedOptionPie(true)}
          >
            <MdPieChart className={`text-2xl ${selectedOptionPie ? 'text-white' : 'text-black'}`} />
          </div>

          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${!selectedOptionPie ? 'bg-blue-500' : 'bg-gray-200'}`}
            onClick={() => setSelectedOptionPie(false)}
          >
            <MdOutlineTableChart className={`text-2xl ${!selectedOptionPie ? 'text-white' : 'text-black'}`} />
          </div>
        </RadioGroup>
      </CardFooter>
    </Card>
  );
};

export default PieChart;
