import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { showErrorMessage } from "../utils/ShowMessages";

const { Option } = Select;

const nepaliMonths = [
  { value: "01", label: "Baishak" },
  { value: "02", label: "Jestha" },
  { value: "03", label: "Ashad" },
  { value: "04", label: "Shrawan" },
  { value: "05", label: "Bhadra" },
  { value: "06", label: "Ashwin" },
  { value: "07", label: "Kartik" },
  { value: "08", label: "Mangsir" },
  { value: "09", label: "Poush" },
  { value: "10", label: "Magh" },
  { value: "11", label: "Falgun" },
  { value: "12", label: "Chaitra" },
];

const englishMonths = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const NepaliCalendar: React.FC = () => {
  const [addCalendarForm] = Form.useForm();
  const [isAddCalendarDrawerOpen, setIsAddCalendarDrawerOpen] = useState(false);
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/nepalidate/dates");
      setCalendarData(response.data.data || []);
    } catch (error) {
      message.error("Failed to fetch calendar data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const handleFormSubmit = async (values: any) => {
    setFormSubmitting(true);
    try {
      const payload = {
        ADYear: values.adYear,
        BSYear: values.bsYear,
        FiscalYear: values.fiscalYear,
        FiscalYearStart: values.fiscalYearStart?.format("YYYY-MM-DD"),
        FiscalYearEnd: values.fiscalYearEnd?.format("YYYY-MM-DD"),
        CalenderRowData: values.calendarData.map((item: any) => ({
          BSMonth: item.bsMonth,
          ADMonth: item.adMonth,
          BSStartDate: `${values.bsYear}-${item.bsMonth}-01`,
          BSEndDate: `${values.bsYear}-${item.bsMonth}-${item.bsEndDate}`,
          ADStartDate: item.adStartDate?.format("YYYY-MM-DD"),
          ADEndDate: item.adEndDate?.format("YYYY-MM-DD"),
        })),
      };

      await axiosInstance.post("/nepalidate/dates", payload);
      message.success("Calendar data saved successfully!");
      setIsAddCalendarDrawerOpen(false);
      fetchCalendarData();
    } catch (err: any) {
      showErrorMessage(err?.response?.data?.message);
      message.error("Failed to save calendar data");
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Biz Calendar</h2>
        <Button
          className="flex items-center gap-1"
          type="primary"
          onClick={() => setIsAddCalendarDrawerOpen(true)}
        >
          <FaPlus /> Add Calendar
        </Button>
      </div>

      <Spin spinning={loading}>
        <NepaliCalendar />
      </Spin>

      <Drawer
        title="Add New Calendar"
        width={1400}
        open={isAddCalendarDrawerOpen}
        onClose={() => setIsAddCalendarDrawerOpen(false)}
        destroyOnClose
        extra={
          <div className="flex items-center gap-4">
            <Button
              type="primary"
              onClick={() => addCalendarForm.submit()}
              loading={formSubmitting}
            >
              Submit
            </Button>
            <Button onClick={() => setIsAddCalendarDrawerOpen(false)}>
              Cancel
            </Button>
          </div>
        }
      >
        <Form
          form={addCalendarForm}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            calendarData: [{}],
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="adYear"
                label="AD Year"
                rules={[{ required: true, message: "Please select AD Year" }]}
              >
                <Select
                  placeholder="Select AD Year"
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                >
                  {Array.from({ length: 101 }, (_, i) => 2000 + i).map(
                    (year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bsYear"
                label="BS Year"
                rules={[{ required: true, message: "Please select BS Year" }]}
              >
                <Select
                  placeholder="Select BS Year"
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                >
                  {Array.from({ length: 101 }, (_, i) => 2050 + i).map(
                    (year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fiscalYear"
                label="Fiscal Year"
                rules={[
                  { required: true, message: "Please input Fiscal Year" },
                ]}
              >
                <Input placeholder="e.g. 2082/83" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fiscalYearStart"
                label="Fiscal Year Start (AD)"
                rules={[
                  { required: true, message: "Please select start date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fiscalYearEnd"
                label="Fiscal Year End (AD)"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Month Data</Divider>

          <Form.List name="calendarData">
            {(fields, { add, remove }) => (
              <>
                <Table
                  bordered
                  dataSource={fields}
                  pagination={false}
                  rowKey="key"
                  columns={[
                    {
                      title: "BS Month",
                      render: (_, __, index) => (
                        <Form.Item
                          name={[index, "bsMonth"]}
                          rules={[{ required: true, message: "Required" }]}
                          noStyle
                        >
                          <Select
                            placeholder="BS Month"
                            style={{ width: "100%" }}
                          >
                            {nepaliMonths.map((month) => (
                              <Option key={month.value} value={month.value}>
                                {month.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      ),
                    },
                    {
                      title: "AD Month",
                      render: (_, __, index) => (
                        <Form.Item
                          name={[index, "adMonth"]}
                          rules={[{ required: true, message: "Required" }]}
                          noStyle
                        >
                          <Select
                            placeholder="AD Month"
                            style={{ width: "100%" }}
                          >
                            {englishMonths.map((month) => (
                              <Option key={month.value} value={month.value}>
                                {month.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      ),
                    },
                    {
                      title: "BS End Date",
                      render: (_, __, index) => (
                        <Form.Item
                          name={[index, "bsEndDate"]}
                          rules={[{ required: true, message: "Required" }]}
                          noStyle
                        >
                          <Input style={{ width: "100%" }} />
                        </Form.Item>
                      ),
                    },
                    {
                      title: "AD Start Date",
                      render: (_, __, index) => (
                        <Form.Item
                          name={[index, "adStartDate"]}
                          rules={[{ required: true, message: "Required" }]}
                          noStyle
                        >
                          <DatePicker
                            format="YYYY-MM-DD"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ),
                    },
                    {
                      title: "AD End Date",
                      render: (_, __, index) => (
                        <Form.Item
                          name={[index, "adEndDate"]}
                          rules={[{ required: true, message: "Required" }]}
                          noStyle
                        >
                          <DatePicker
                            format="YYYY-MM-DD"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ),
                    },
                    {
                      title: "Action",
                      render: (_, __, index) => (
                        <Button
                          icon={<FaMinus />}
                          danger
                          type="text"
                          onClick={() => remove(index)}
                          disabled={fields.length <= 1}
                        />
                      ),
                    },
                  ]}
                />

                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<FaPlus />}
                  style={{ marginTop: 16 }}
                >
                  Add Month Entry
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    </div>
  );
};

export default NepaliCalendar;
