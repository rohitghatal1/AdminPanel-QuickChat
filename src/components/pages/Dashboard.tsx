import moment from "moment";
import React from "react";
import PaintBanner from "../../assets/logo/BharoshaLogo.png";
import profileAvatar from "../../assets/photos/profilePic.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar, Modal, Popover } from "antd";
import { CiLogout } from "react-icons/ci";
import { FaPaintRoller } from "react-icons/fa6";

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const popoverContent = (
    <div className="p-2">
      <p
        className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors"
        onClick={() => {
          Modal.confirm({
            title: "Confirm Logout",
            content: "Are you sure you want to log out?",
            onOk: handleLogout,
          });
        }}
      >
        <CiLogout className="text-lg" />
        Log out
      </p>
    </div>
  );

  return (
    <div className="w-full py-6 flex gap-4 bg-gray-50 px-3">
      <div className="w-[70%] h-full ml-4">
        <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-teal-400 p-6 rounded-xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Jasmine Paints Dashboard
            </h1>

            <p className="text-sm text-teal-100 mt-1">
              {moment().format("dddd, DD MMMM YYYY")}
            </p>
          </div>

          <FaPaintRoller className="text-4xl text-white opacity-90" />
        </div>

        <div className="relative mt-8 bg-white p-6 rounded-xl shadow-md flex items-center overflow-hidden">
          <img
            src={PaintBanner}
            alt="Paint Distribution"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 text-center w-full">
            <h2 className="text-2xl font-bold text-teal-800">
              Revolutionizing Paint Distribution
            </h2>
            <p className="text-sm mt-4 text-gray-600 max-w-2xl mx-auto">
              Delivering vibrant color solutions nationwide! Our efficient
              distribution network ensures timely delivery of premium quality
              paints.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-teal-800">Initiatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white p-5 rounded-xl shadow-md border border-teal-50 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-teal-800 mb-2">
                Premium Collection Launch
              </h4>

              <p className="text-sm text-gray-600">
                Introducing our new luxury paint line with enhanced durability
                and exclusive color palettes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md border border-teal-50 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-teal-800 mb-2">
                Eco-Friendly Paints
              </h4>

              <p className="text-sm text-gray-600">
                Expanding our sustainable product range with zero-VOC,
                environmentally friendly options.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md border border-teal-50 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-teal-800 mb-2">
                Supply Chain Optimization
              </h4>

              <p className="text-sm text-gray-600">
                Implementing AI-driven logistics for faster delivery and reduced
                operational costs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[28%] bg-white rounded-lg shadow-xl border border-teal-50 p-3">
        <div className="p-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-semibold text-lg text-teal-800">
              Distribution Manager
            </h2>

            <Popover
              trigger="click"
              content={popoverContent}
              placement="bottom"
            >
              <span className="cursor-pointer text-teal-600 hover:text-teal-800">
                <BsThreeDotsVertical />
              </span>
            </Popover>
          </div>

          <div className="flex flex-col items-center justify-center mt-8">
            <Avatar
              size={90}
              src={profileAvatar}
              className="border-4 border-teal-100 shadow-sm"
            />
            <p className="font-semibold text-lg mt-4 text-teal-800">
              Rohit Ghatal
            </p>
            <p className="text-gray-500 text-sm">
              Regional Distribution Manager
            </p>

            <div className="w-full mt-6 space-y-3">
              <div className="flex justify-between items-center p-2 bg-teal-50 rounded-lg">
                <span className="text-sm text-gray-600">Today's Orders:</span>
                <span className="font-semibold text-teal-700">42</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-teal-50 rounded-lg">
                <span className="text-sm text-gray-600">
                  Pending Shipments:
                </span>
                <span className="font-semibold text-teal-700">15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
