import moment from "moment";
import React, { useEffect, useState } from "react";
import Photo from "../../assets/photos/banner.png";
import profileAvatar from "../../assets/photos/profilePic.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar, Modal, Popover } from "antd";
import { CiLogout } from "react-icons/ci";

const Dashboard: React.FC = () => {
  const [allContacts, setAllContacts] = useState<any>([]);
  const [allIntegrations, setAllIntegrations] = useState<any>([]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const popoverContent = (
    <div>
      <p
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => {
          Modal.confirm({
            title: "Confirm Logout",
            content: "Are you sure, you want to log out ?",
            onOk: handleLogout,
          });
        }}
      >
        <CiLogout />
        Log out
      </p>
    </div>
  );

  return (
    <div className="w-full py-6 flex gap-4 bg-white px-3">
      <div className="w-[70%] h-full ml-4">
        <div className="flex justify-between items-center border p-6 rounded-xl">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Dashboard</h1>
            <p className="text-sm text-blue-600">
              {moment().format("dddd, DD MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="relative mt-20 bg-blue-500 text-white p-6 rounded-xl shadow-md flex items-center space-y-6">
          <img
            src={Photo}
            alt="User"
            className="absolute bottom-0 left-6 w-60 h-60 object-cover transform"
          />

          <div className="text-center ml-60">
            <h2 className="text-2xl font-bold">
              Simplify Bulk WhatsApp Messaging
            </h2>

            <p className="text-sm mt-4">
              Streamline communication effortlessly! With our solution, sending
              bulk WhatsApp messages is faster and more convenient than ever.
              Embrace the power to connect with your team seamlessly and
              effectively.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 border border-gray-300 p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg text-gray-700">Activity</h3>
            <div className="mt-4">
              <div className="h-36 rounded-lg flex items-center justify-center text-gray-500">
                Chart Placeholder
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-md">
            <h3 className="font-bold text-lg text-gray-700">Progress</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="mt-4 flex flex-col items-center">
                <div className="h-24 w-24 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                  {allContacts.length}
                </div>
                <p className="text-gray-600 mt-2">Contacts</p>
              </div>

              <div className="mt-4 flex flex-col items-center">
                <div className="h-24 w-24 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                  {allIntegrations.length}
                </div>
                <p className="text-gray-600 mt-2">Integrations</p>
              </div>
            </div>
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

      <div className="w-[28%] bg-white rounded-lg border border-gray-300 p-3">
        <div className="p-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-semibold text-lg">My Profile</h2>
            <Popover
              trigger="click"
              content={popoverContent}
              placement="bottom"
            >
              <span className="cursor-pointer">
                <BsThreeDotsVertical />
              </span>
            </Popover>
          </div>
          <div className="flex flex-col items-center justify-center mt-8">
            <Avatar size={70} src={profileAvatar} className="border" />
            <p className="font-semibold text-lg">Rohit Ghatal</p>
            <p className="text-gray-500">rohitghatal@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
