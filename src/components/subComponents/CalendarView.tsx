import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const nepaliMonths = [
  "बैशाख",
  "जेष्ठ",
  "असार",
  "श्रावण",
  "भदौ",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पुष",
  "माघ",
  "फाल्गुन",
  "चैत्र",
];

const weekDays = ["आ", "सो", "मं", "बु", "बि", "शु", "श"];

const toNepaliDigits = (num: string | number) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((d) => nepaliDigits[parseInt(d)] || d)
    .join("");
};

interface CalendarData {
  BSYear: string;
  BSMonth: string;
  BSDate: string;
  ADDate: string;
}

interface HeaderData {
  BSYear: string;
  ADYear: string;
  FiscalYear: string;
}

const CalendarView: React.FC = () => {
  const [calendarData, setCalendarData] = useState<CalendarData[]>([]);
  const [groupedData, setGroupedData] = useState<
    Record<string, CalendarData[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<HeaderData[]>([]);

  const currentADYear = dayjs().format("YYYY");

  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          "/nepalidate/dates/header?noLimit=true"
        );
        const yearsData: HeaderData[] = res.data?.data || [];

        if (yearsData.length > 0) {
          setAvailableYears(yearsData);

          const currentYearData = yearsData.find(
            (year) => year.ADYear === currentADYear
          );

          setSelectedYear(currentYearData?.BSYear || yearsData[0].BSYear);
        } else {
          setError("कुनै पात्रो डाटा उपलब्ध छैन");
        }
      } catch (err) {
        console.error("Error fetching available years:", err);
        setError("वर्ष डाटा लोड गर्न असफल");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableYears();
  }, [currentADYear]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedYear) return;

      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/nepalidate/dates?BSYear=${selectedYear}`
        );
        const rows: CalendarData[] = res.data?.data?.[0]?.calender_rows || [];
        setCalendarData(rows);

        const grouped: Record<string, CalendarData[]> = {};
        rows.forEach((entry) => {
          const month = entry.BSMonth;
          if (!grouped[month]) grouped[month] = [];
          grouped[month].push(entry);
        });

        setGroupedData(grouped);
      } catch (err) {
        console.error("Error fetching calendar:", err);
        setError("नेपाली पात्रो लोड गर्न असफल");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const getFiscalYearForSelectedYear = () => {
    const selectedYearData = availableYears.find(
      (year) => year.BSYear === selectedYear
    );
    return selectedYearData?.FiscalYear || "";
  };

  if (loading && !selectedYear)
    return <div className="text-center py-8">लोड हुँदैछ...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!calendarData.length && selectedYear)
    return <div className="text-center py-8">कुनै डाटा उपलब्ध छैन</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-blue-50 p-4 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">
            नेपाली पात्रो - वि.सं. {toNepaliDigits(selectedYear)}
          </h2>
          {getFiscalYearForSelectedYear() && (
            <p className="text-sm text-blue-600 mt-1">
              आर्थिक वर्ष: {getFiscalYearForSelectedYear()}
            </p>
          )}
        </div>

        <div className="flex items-center bg-white rounded-md shadow-sm">
          <label
            htmlFor="year-select"
            className="mr-2 whitespace-nowrap pl-3 text-gray-700"
          >
            वर्ष छान्नुहोस्:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border-0 rounded-r-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={loading}
          >
            {availableYears.map((yearData) => (
              <option key={yearData.BSYear} value={yearData.BSYear}>
                वि.सं. {toNepaliDigits(yearData.BSYear)} ({yearData.ADYear})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">पात्रो डाटा लोड हुँदैछ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(groupedData)
            .sort(
              ([monthNumA], [monthNumB]) =>
                parseInt(monthNumA) - parseInt(monthNumB)
            )
            .map(([monthNum, dates]) => {
              const monthIndex = parseInt(monthNum) - 1;
              const monthName =
                nepaliMonths[monthIndex] || `अज्ञात महिना (${monthNum})`;

              return (
                <div
                  key={monthNum}
                  className="border  rounded-xl shadow-sm p-3"
                >
                  <h3 className="text-center border-b-2 nepali-text text-blue-600 font-bold text-lg mb-2">
                    {monthName} ({toNepaliDigits(monthNum)})
                  </h3>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
                    {weekDays.map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {dates.map((item, i) => {
                      const bsDateParts = item.BSDate.split("-");
                      const day = toNepaliDigits(bsDateParts[2]);
                      const adDate = dayjs(item.ADDate).format("MMM D");
                      const isToday = dayjs().isSame(dayjs(item.ADDate), "day");

                      return (
                        <div
                          key={i}
                          className={`p-1 border bg-green-50 rounded ${
                            isToday
                              ? "bg-blue-300 font-bold"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="nepali-text text-lg">{day}</div>
                          <div className="text-xs text-gray-500">{adDate}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
