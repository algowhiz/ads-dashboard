import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { RxQuestionMarkCircled } from "react-icons/rx";

const AdInsightsTable = ({ initialCampaigns, showHeader, tableHeading }) => {
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

    const totals = campaigns.reduce((acc, campaign) => {
        acc.clicks += campaign.clicks;
        acc.cost += campaign.cost;
        acc.conversions += campaign.conversions;
        acc.revenue += campaign.revenue;
        return acc;
    }, { clicks: 0, cost: 0, conversions: 0, revenue: 0 });


    const handleSort = (field, order) => {
        setSortField(field);
        setSortOrder(order);

        if (sortField === field) {
            if (sortOrder === 'asc') {
                order = null;
            } else if (sortOrder === 'desc') {
                order = null;
            }
        }

        if (order === null) {
            setCampaigns(initialCampaigns);
            setSortField(null);
            setSortOrder(null);
        } else {


            const newOrder = [...campaigns];

            const sortedCampaigns = newOrder.sort((a, b) => {
                if (order === 'asc') {
                    return a[field] > b[field] ? 1 : -1;
                } else if (order === 'desc') {
                    return a[field] < b[field] ? 1 : -1;
                }
            });
            setCampaigns(sortedCampaigns);
        }
    };

    const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
    };

    return (
        <Card className={`w-full rounded-none ${showHeader ? 'lg:w-1/2' : ''} h-auto`}>
            {showHeader && (
                <div className="border-b-2 border-b-[#99A2A9] mb-2">
                    <CardHeader className="p-3">
                        <div className="flex justify-between">
                            <h2 className="text-xl text-black">Ad Insights</h2>
                            <RxQuestionMarkCircled color="#E6E6E6" size={28} />
                        </div>
                    </CardHeader>
                </div>
            )}

            <CardContent className="p-0 border-0 m-0 rounded-none mt-5">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-b-collapse">
                        <thead>
                            <tr>
                                {tableHeading.map((header, idx) => (
                                    <th key={idx} className="p-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#4F5355] flex-grow">{header}</span>
                                            <div className="flex flex-col items-center gap-0">
                                                <MdOutlineKeyboardArrowUp
                                                    onClick={() => { handleSort(header.toLowerCase(), "asc") }}

                                                    className={`mb-[-6px] cursor-pointer ${sortField === header.toLowerCase() && sortOrder === 'asc' ? 'text-black' : 'text-gray-400'}`}
                                                />
                                                <MdKeyboardArrowDown
                                                    onClick={() => handleSort(header.toLowerCase(), "desc")}

                                                    className={`cursor-pointer  ${sortField === header.toLowerCase() && sortOrder === 'desc' ? 'text-black' : 'text-gray-400'}`}
                                                />
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign, rowIndex) => (
                                <tr key={rowIndex} className="text-center text-[#99A2A9] hover:bg-[#E8F4FE]">
                                    <td
                                        className={`p-2 border-t-2 ${selectedCell.row === rowIndex && selectedCell.col === 0 ? 'border-2 border-[#0096FF]' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, 0)}
                                    >
                                        {campaign.name}
                                    </td>
                                    <td
                                        className={`p-2 border-t-2 ${selectedCell.row === rowIndex && selectedCell.col === 1 ? 'border-2 border-[#0096FF]' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, 1)}
                                    >
                                        {campaign.clicks}
                                    </td>
                                    <td
                                        className={`p-2 border-t-2 ${selectedCell.row === rowIndex && selectedCell.col === 2 ? 'border-2 border-[#0096FF]' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, 2)}
                                    >
                                        {`USD ${campaign.cost}`}
                                    </td>
                                    <td
                                        className={`p-2 border-t-2 ${selectedCell.row === rowIndex && selectedCell.col === 3 ? 'border-2 border-[#0096FF]' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, 3)}
                                    >
                                        {campaign.conversions}
                                    </td>
                                    <td
                                        className={`p-2 border-t-2 ${selectedCell.row === rowIndex && selectedCell.col === 4 ? 'border-2 border-[#0096FF]' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, 4)}
                                    >
                                        {`USD ${campaign.revenue}`}
                                    </td>
                                </tr>
                            ))}
                            <tr className="font-thin border-t-[2.3px] border-[#b4b4b4] text-center text-[#99A2A9]">
                                <td className="p-2">Total</td>
                                <td className="p-2">{totals.clicks}</td>
                                <td className="p-2">{`USD ${totals.cost}`}</td>
                                <td className="p-2">{totals.conversions}</td>
                                <td className="p-2">{`USD ${totals.revenue}`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdInsightsTable;
