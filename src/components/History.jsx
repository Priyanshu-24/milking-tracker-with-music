import { Link } from "react-router-dom";
import dayjs from "dayjs";

const History = () => {
  const history = JSON.parse(localStorage.getItem("milkingHistory")) || [];

  return (
    <>
      <div className="w-full flex justify-between items-center mb-6 p-4 bg-blue-200">
        <h1 className="text-3xl font-bold">Milking History</h1>
        <Link to="/" className="text-green-700 hover:underline font-semibold">
          Go Home
        </Link>
      </div>
      <div className="overflow-x-auto p-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                Start Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                End Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                Total Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                Milk Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((session, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {session.date}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {session.startTime}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {session.endTime}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {dayjs()
                    .startOf("day")
                    .add(session.totalTime, "second")
                    .format("HH:mm:ss")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {session.quantity} liters
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
