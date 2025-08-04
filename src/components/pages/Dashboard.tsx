import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage } from "../../utils/ShowMessages";
import { Card, Spin, Avatar, List, Statistic, Row, Col } from "antd";
import {
  FaUsers,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaUserPlus,
} from "react-icons/fa";
import { MdTrendingUp, MdToday } from "react-icons/md";
import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard: React.FC = () => {
  const [allMessages, setAllMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<any>([]);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/getUsers");
      setAllUsers(response?.data);
      console.log("fetched users: ", response?.data);
    } catch (err: any) {
      console.log(err);
      showErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMessages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/message/getMessages");
      setAllMessages(response?.data);
      console.log("Fetched messages:", response?.data);
    } catch (err: any) {
      console.log(err);
      showErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
    fetchAllMessages();
  }, []);

  const getStatistics = () => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const thisWeek = moment().startOf("week");
    const lastWeek = moment().subtract(1, "week").startOf("week");
    const thisMonth = moment().startOf("month");

    const todayMessages = allMessages.filter((msg: any) =>
      moment(msg.createdAt).isSame(today, "day")
    ).length;

    const yesterdayMessages = allMessages.filter((msg: any) =>
      moment(msg.createdAt).isSame(yesterday, "day")
    ).length;

    const thisWeekMessages = allMessages.filter((msg: any) =>
      moment(msg.createdAt).isAfter(thisWeek)
    ).length;

    const lastWeekMessages = allMessages.filter((msg: any) =>
      moment(msg.createdAt).isBetween(lastWeek, thisWeek)
    ).length;

    const thisMonthMessages = allMessages.filter((msg: any) =>
      moment(msg.createdAt).isAfter(thisMonth)
    ).length;

    const thisMonthUsers = allUsers.filter((user: any) =>
      moment(user.createdAt).isAfter(thisMonth)
    ).length;

    const dailyGrowth =
      yesterdayMessages === 0
        ? 100
        : ((todayMessages - yesterdayMessages) / yesterdayMessages) * 100;

    const weeklyGrowth =
      lastWeekMessages === 0
        ? 100
        : ((thisWeekMessages - lastWeekMessages) / lastWeekMessages) * 100;

    return {
      todayMessages,
      yesterdayMessages,
      thisWeekMessages,
      thisMonthMessages,
      thisMonthUsers,
      dailyGrowth,
      weeklyGrowth,
    };
  };

  const getChartData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = moment().subtract(i, "days");
      const dayMessages = allMessages.filter((msg: any) =>
        moment(msg.Date).isSame(date, "day")
      ).length;

      last7Days.push({
        date: date.format("MMM DD"),
        messages: dayMessages,
        day: date.format("ddd"),
      });
    }
    return last7Days;
  };

  const getRecentActivities = () => {
    const recentMessages = [...allMessages]
      .sort((a, b) => moment(b.Date).unix() - moment(a.Date).unix())
      .slice(0, 5);

    const recentUsers = [...allUsers]
      .sort((a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix())
      .slice(0, 3);

    return { recentMessages, recentUsers };
  };

  const stats = getStatistics();
  const { recentMessages, recentUsers } = getRecentActivities();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const pieData = [
    { name: "Today", value: stats.todayMessages },
    { name: "This Week", value: stats.thisWeekMessages },
    { name: "This Month", value: stats.thisMonthMessages },
    { name: "Total", value: allMessages.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Spin spinning={loading} size="large">
        <div className="p-6 max-h-screen overflow-y-auto">
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 border-0">
              <div className="flex justify-between items-center text-[#053b68] ">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    QuickChat Dashboard
                  </h1>
                  <p className="text-[#053b68] text-lg">
                    {moment().format("dddd, MMMM DD, YYYY")}
                  </p>
                  <p className="text-[#053b68] text-sm mt-1">
                    Welcome to your admin control center
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[#053b68] text-sm">Current Time</div>
                  <div className="text-2xl font-bold">
                    {moment().format("HH:mm:ss")}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <Statistic
                  title="Total Users"
                  value={allUsers.length}
                  prefix={<FaUsers className="text-blue-600" />}
                  suffix={
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <FaArrowUp className="mr-1" />+{stats.thisMonthUsers} this
                      month
                    </div>
                  }
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                <Statistic
                  title="Total Messages"
                  value={allMessages.length}
                  prefix={<FaEnvelope className="text-green-600" />}
                  suffix={
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <FaArrowUp className="mr-1" />+{stats.thisWeekMessages}{" "}
                      this week
                    </div>
                  }
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                <Statistic
                  title="Today's Messages"
                  value={stats.todayMessages}
                  prefix={<MdToday className="text-orange-600" />}
                  suffix={
                    <div
                      className={`text-xs flex items-center mt-1 ${
                        stats.dailyGrowth >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stats.dailyGrowth >= 0 ? (
                        <FaArrowUp className="mr-1" />
                      ) : (
                        <FaArrowDown className="mr-1" />
                      )}
                      {Math.abs(stats.dailyGrowth).toFixed(1)}% vs yesterday
                    </div>
                  }
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                <Statistic
                  title="Weekly Growth"
                  value={`${stats.weeklyGrowth.toFixed(1)}%`}
                  prefix={<MdTrendingUp className="text-purple-600" />}
                  suffix={
                    <div className="text-xs text-gray-600 mt-1">
                      {stats.thisWeekMessages} messages this week
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} lg={8}>
              <Card title="Message Distribution" className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((entry, index) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        {entry.name}
                      </div>
                      <span className="font-medium">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaUserPlus className="mr-2 text-green-600" />
                    Recent Users
                  </div>
                }
                className="h-96"
              >
                <List
                  dataSource={recentUsers}
                  renderItem={(user: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: "#52c41a" }}>
                            {user.name?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        }
                        title={
                          <div className="flex justify-between">
                            <span>{user.name}</span>
                            <span className="text-xs text-gray-500">
                              {moment(user.createdAt).fromNow()}
                            </span>
                          </div>
                        }
                        description={
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600">
                              {user.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          <div className="mt-8">
            <Card>
              <Row gutter={[16, 16]} className="text-center">
                <Col xs={12} sm={6}>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.todayMessages}
                    </div>
                    <div className="text-sm text-gray-600">Messages Today</div>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.thisWeekMessages}
                    </div>
                    <div className="text-sm text-gray-600">This Week</div>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.thisMonthMessages}
                    </div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {allUsers.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;
