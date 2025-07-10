import moment from "moment";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full py-6 flex gap-4 bg-white px-3">
      <div className="w-[70%] h-full ml-4">
        <div className="flex justify-between items-center border p-6 rounded-xl">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">
              Quickchat - Dashboard
            </h1>
            <p className="text-sm text-blue-600">
              {moment().format("dddd, DD MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-700">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-md">
              <h4 className="font-bold text-gray-700">Baseline Project</h4>
              <p className="text-sm text-gray-600">
                Make something interesting and make your day more meaningful.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl  border border-gray-300 shadow-md">
              <h4 className="font-bold text-gray-700">Paper Industry</h4>
              <p className="text-sm text-gray-600">
                Paper industry to explain the industry that is explored and
                pursued.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl  border border-gray-300 shadow-md">
              <h4 className="font-bold text-gray-700">Tool Production</h4>
              <p className="text-sm text-gray-600">
                Tools to provide your convenience in every access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
