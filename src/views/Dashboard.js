import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import BarGraph from "../components/BarGraph";
import LineGraph from "../components/LineGraph";

export default function Dashboard() {
  const documents = [
    {
      number: "01",
      name: "document 01",
      percentage: 25,
    },
    {
      number: "02",
      name: "document 02",
      percentage: 18,
    },
    {
      number: "03",
      name: "document 03",
      percentage: 11,
    },
    {
      number: "04",
      name: "document 04",
      percentage: 9,
    },
    {
      number: "05",
      name: "document 05",
      percentage: 8,
    },
  ];

  const colors = [
    { first: "#62B2FD", second: "rgba(98,178,253,0.3)" },
    { first: "#9BDFC4", second: "rgba(155,223,196,0.3)" },
    { first: "#44194A", second: "rgba(68,25,74,0.2)" },
    { first: "#EA79BA", second: "rgba(234,121,186,0.3)" },
    { first: "#FFB44F", second: "rgba(255,180,79,0.3)" },
  ];

  const icons = ["../assets/icons/queries.png", "../assets/icons/documents.png", "../assets/icons/profile.png"];
  const data = [
    {
      name: "Total Queries",
      number: "5,513,068",
      status: "up",
      percentage: "12",
    },
    {
      name: "Total Documents",
      number: "513,068",
      status: "up",
      percentage: "2",
    },
    {
      name: "Total Queries",
      number: "568",
      status: "down",
      percentage: "1",
    },
  ];

  const [active, setActive] = useState("Week");

  const timeFrames = ["Week", "Month", "Year"];

  return (
    <div className="h-screen overflow-auto hide-scrollbar">
      <nav className="ml-[4%] py-4 px-10 text-2xl font-bold">
        Admin Dashboard
      </nav>
      <main className="ml-[4%] grid grid-cols-12 gap-4 p-10">
        <div className=" col-span-7 mr-4">
          <div className="flex">
            <span className="text-xl font-semibold">Overview</span>
            <ul className="ml-auto flex gap-4">
              {timeFrames.map((time) => (
                <li
                  key={time}
                  onClick={() => setActive(time)}
                  className={`px-3 py-1 rounded-xl cursor-pointer ${
                    active === time ? "bg-[#44194A] text-white font-light" : ""
                  }`}
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between gap-4 mt-3">
            {data.map((d, i) => (
              <div className="border-2 w-full flex flex-col justify-center gap-4 py-4 px-2 rounded-lg">
                <p className="flex gap-4 items-center">
                  <img src={`${icons[i]}`} alt="icon" />
                  {d.name}
                </p>
                <p className="text-xl font-bold">{d.number}</p>
                <p className="flex gap-2">
                  {d.status == "up" ? (
                    <span className="text-green-400  flex">
                      <ArrowUp className="w-4 h-6" />+{d.percentage} %{" "}
                    </span>
                  ) : (
                    <span className="text-red-400 flex">
                      <ArrowDown className="w-4 h-6" />-{d.percentage} %{" "}
                    </span>
                  )}
                  on this week
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <span className="text-2xl font-semibold">Daily active users</span>
            <div>
              <span className="text-gray-400 text-sm ml-2">Last 30 days</span>
              <div className="shadow-lg rounded-xl px-2">
                <LineGraph />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <span className="text-2xl font-bold">
            {" "}
            System Health & Performance
          </span>
          <div className="flex flex-col justify-around rounded-xl shadow-lg p-4 mt-0">
            <div className="flex flex-col border-2 rounded-lg py-2 px-6">
              <span>Average response time of the RAG system</span>
              <span className="text-xl font-semibold flex items-center justify-between">
                3.0 seconds
                <div className="p-[10px] rounded-full bg-[rgba(68,25,74,0.1)]">
                  <img src="../assets/icons/clock.png" alt="icon" />
                </div>
              </span>
            </div>
            <div className="flex flex-col mt-2 border-2 rounded-lg py-2 px-6">
              <span className="">
                Average Number of documents retrieved per query{" "}
              </span>
              <span className="text-xl font-semibold flex items-center justify-between">
                25 documents
                <img src="../assets/icons/documents.png" alt="icon" />
              </span>
            </div>
            <div className="flex flex-col mt-2 border-2 rounded-lg py-2 px-6">
              <span>AUser Satisfaction Score</span>
              <span className="text-xl font-semibold flex items-center justify-between">
                80 %
                <div className="p-[10px] rounded-full bg-[rgba(255,180,79,0.1)]">
                  <img src="../assets/icons/heart.png" alt="icon" />
                </div>
              </span>
            </div>
            <div className="flex flex-col mt-2 border-2 rounded-lg py-2 px-6">
              <span>Missed or failed searches</span>
              <span className="text-xl font-semibold flex items-center justify-between">
                2% of total queries
                <div className="p-[10px] rounded-full bg-[rgba(155,223,196,0.1)]">
                  <img src="../assets/icons/search.png" alt="icon" />
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <span className="text-2xl font-semibold">Most Queried Documents</span>
          <div className="grid grid-cols-12 rounded-lg shadow-lg px-4 border-t mt-4">
            <div className="border-b pb-2 text-gray-400 col-span-2 text-sm pt-2">
              #
            </div>
            <div className="border-b text-gray-400  col-span-4 text-sm pt-2">
              Document Name
            </div>
            <div className="border-b text-gray-400 col-span-4 text-sm pt-2">
              Number of Queries
            </div>
            <div className="border-b text-gray-400 col-span-2 text-sm pt-2"></div>

            {documents.map((doc, i) => (
              <>
                <div className="border-b py-2 text-[#444A6D] text-sm col-span-2">
                  {doc.number}
                </div>
                <div className="border-b py-2 text-[#444A6D] text-sm col-span-4">
                  {doc.name}
                </div>
                <div className="w-full flex items-center border-b py-2 col-span-4">
                  <div className="w-[80%] h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[${colors[i].first}]`}
                      style={{ width: `${doc.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="border-b py-2 flex justify-center items-center text-[#444A6D] text-sm col-span-2">
                  <div
                    className={`w-[80%] border border-[${colors[i].first}] rounded-lg flex justify-center items-center bg-[${colors[i].second}]`}
                  >
                    {doc.percentage}%
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="col-span-6">
          <span className="text-2xl font-semibold">Most Discussed Topics</span>
          <div className="shadow-lg rounded-lg px-4 py-1 mt-4">
            <div>
              <BarGraph />
            </div>
            <div className="grid grid-cols-2 gap-2 px-10">
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-[#62B2FD]"></div>
                <span className="text-gray-400 text-sm">
                  Equipment Maintenance
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-[#9BDFC4]"></div>
                <span className="text-gray-400 text-sm">Safety Protocols</span>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-[#EA79BA]"></div>
                <span className="text-gray-400 text-sm">Quality Control</span>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-[#FFB44F]"></div>
                <span className="text-gray-400 text-sm">Incident Response</span>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-[#44194A]"></div>
                <span className="text-gray-400 text-sm">
                  Machinery Calibration
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
