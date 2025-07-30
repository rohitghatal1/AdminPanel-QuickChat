import {
  Button,
  Checkbox,
  Input,
  Modal,
  Pagination,
  Radio,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
interface IPageLayout {
  disable_export_button?: boolean;
  displayFilter?: any;
  children?: any;
  pagination?: any;
  exportData?: any;
  title?: string;
  total_records: number;
  data: any[];
  columns: any;
  loading: boolean;
  showChildren?: boolean;
  search?: {
    search: string;
    searchData: any;
  };

  filters?: {
    multiple?: boolean;
    title: string;
    filterString: string;
    data: {
      component?: any;
      value?: any;
      title?: string;
    }[];
  }[];
}

const PageLayout = ({
  disable_export_button,
  title,
  children,
  total_records,
  displayFilter,
  search,
  loading,
  columns,
  filters,
  data,
  pagination,
  exportData,
}: IPageLayout) => {
  const query = new URLSearchParams(window.location.search);

  const [showFilters, setShowFilters] = useState(false);
  const handleFilterClick = () => {
    setShowFilters((prevState) => {
      const newState = !prevState;
      localStorage.setItem(
        "filterBoxStatus",
        newState ? "Expanded" : "Collapsed"
      );
      return newState;
    });
  };

  useEffect(() => {
    const filterBoxStatus = localStorage.getItem("filterBoxStatus");
    if (filterBoxStatus === "Expanded") {
      setShowFilters(true);
    }
  }, []);

  const initialFiltersState: any = filters?.reduce((acc: any, _, index) => {
    acc[index] = true;
    return acc;
  }, {});
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    {}
  );
  const [openFilters, setOpenFilters] = useState<{ [key: number]: boolean }>(
    initialFiltersState
  );

  useEffect(() => {
    const initialFilterValues: any = {};
    filters?.forEach((el) => {
      const filterValue = query.get(el.filterString);
      if (filterValue) {
        initialFilterValues[el?.filterString] = filterValue;
      }
    });
    setFilterValues(initialFilterValues);
  }, [filters]);

  const toggleFilter = (index: number) => {
    setOpenFilters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState<any>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);

  const handleCancel = () => {
    clearInterval(intervalId);
    setIsModalVisible(false);
    setCountdown(null);
    setIsPreparing(false);
    setIsReady(false);
    setIntervalId(null);
  };

  const handleDownload = () => {
    exportData(); // Trigger file download
    setIsModalVisible(false); // Close modal after download
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="h-full flex space-x-2 p-2 pr-4">
      <div
        className={`${
          showFilters && filters && filters?.length > 0 ? "" : "hidden"
        }  w-[250px] overflow-y-auto relative pr-2  border-r-[1px]`}
      >
        <div className="flex items-center justify-between font-semibold text-sm sticky top-0 bg-white z-[100]">
          Filters:{" "}
          <div
            onClick={() => {
              query.delete("search");
              displayFilter("", "", true);
            }}
            className="border p-1 justify-center flex space-x-1 cursor-pointer shadow-sm items-center rounded-md text-[11px] "
          >
            <BiReset />{" "}
            <span className="font-semibold text-gray-600">Reset Filters</span>
          </div>
        </div>

        {filters &&
          filters?.length !== 0 &&
          filters.map((el, j) => (
            <React.Fragment key={j}>
              <h1
                onClick={() => toggleFilter(j)}
                className="bg-gray-50 px-1 py-2 rounded-md mt-2  font-medium text-sm flex space-x-1 items-center cursor-pointer"
              >
                {openFilters[j] ? <FaAngleDown /> : <FaAngleRight />}
                <span className="font-semibold">{el.title}</span>
              </h1>

              <div
                className={`flex flex-col space-y-1 py-2 ${
                  openFilters[j] ? "" : "hidden"
                }`}
              >
                {el.data?.map((filter, i) => {
                  const currentValues = filterValues[el.filterString]
                    ? filterValues[el.filterString].split(",")
                    : [];

                  const isAllOption = filter.value === "";

                  return (
                    <div key={i}>
                      {filter.component ? (
                        filter.component
                      ) : el.multiple ? (
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => {
                            let updatedValues: string[] = [];

                            if (isAllOption) {
                              query.delete(el.filterString);
                              setFilterValues((prev) => ({
                                ...prev,
                                [el.filterString]: "",
                              }));
                              displayFilter(query.toString());
                              return;
                            }

                            const isAlreadySelected = currentValues.includes(
                              filter.value
                            );

                            if (isAlreadySelected) {
                              updatedValues = currentValues.filter(
                                (v) => v !== filter.value
                              );
                            } else {
                              updatedValues = [
                                ...currentValues,
                                filter.value,
                              ].filter((v) => v !== "");
                            }

                            if (updatedValues.length === 0) {
                              query.delete(el.filterString);
                            } else {
                              query.set(
                                el.filterString,
                                updatedValues.join(",")
                              );
                            }

                            setFilterValues((prev) => ({
                              ...prev,
                              [el.filterString]: updatedValues.join(","),
                            }));

                            displayFilter(query.toString());
                          }}
                        >
                          <Checkbox
                            checked={
                              isAllOption
                                ? !filterValues[el.filterString]
                                : currentValues.includes(filter.value)
                            }
                          />
                          <span className="text-[13px]">{filter.title}</span>
                        </div>
                      ) : (
                        <Radio.Group
                          onChange={(e) => {
                            query.set(el.filterString, e.target.value);
                            if (e.target.value === "")
                              query.delete(el.filterString);

                            setFilterValues((prev) => ({
                              ...prev,
                              [el.filterString]: e.target.value,
                            }));

                            displayFilter(query.toString());
                          }}
                          value={filterValues[el.filterString] || ""}
                        >
                          <Radio className="text-[13px]" value={filter.value}>
                            {filter.title}
                          </Radio>
                        </Radio.Group>
                      )}
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          ))}
      </div>
      <div
        className={
          showFilters && filters && filters?.length > 0
            ? "w-[calc(100%-250px)]"
            : "w-full"
        }
      >
        <div
          className={` ${
            !title && (!filters || filters.length === 0) ? "h-0" : "h-[40px]"
          } font-semibold  text-sm flex justify-between items-center`}
        >
          <div className="flex space-x-4 items-center">
            {filters && filters?.length !== 0 && (
              <div
                className="p-1  border-[1px] cursor-pointer "
                onClick={handleFilterClick}
              >
                <CiFilter className="text-xl " />
              </div>
            )}
            {title && (
              <h1 className="flex items-center font-semibold">
                {`Total records: `}{" "}
                <span className="px-3 ml-1   py-[2px]  font-semibold rounded-lg bg-[#ebebf5] text-[11px] text-gray-600">
                  {total_records ?? 0}
                </span>
              </h1>
            )}
          </div>

          <div className="flex items-center flex-1 justify-end space-x-3">
            {!disable_export_button && (
              <>
                <Modal
                  title="Preparing Export"
                  open={isModalVisible}
                  onCancel={handleCancel}
                  footer={
                    isReady ? (
                      <Button type="primary" onClick={handleDownload}>
                        Download File
                      </Button>
                    ) : (
                      <Button key="cancel" onClick={handleCancel}>
                        Cancel
                      </Button>
                    )
                  }
                  closable={!isPreparing}
                  centered
                >
                  <div className="flex flex-col items-center gap-3">
                    {isPreparing ? (
                      <>
                        <Spin size="large" />
                        <p>Preparing your export... Please wait {countdown}s</p>
                      </>
                    ) : (
                      <p>
                        Your file is ready! Click "Download File" to proceed.
                      </p>
                    )}
                  </div>
                </Modal>
              </>
            )}

            {search && (
              <Input
                allowClear
                onChange={(e) => search.searchData(e.target.value)}
                value={search?.search}
                placeholder="Search..."
                className="max-w-[250px] font-normal"
              />
            )}
            {children}
          </div>
        </div>{" "}
        <Table
          // rowSelection={{ ...rowSelection }}
          rootClassName="strip"
          size="large"
          columns={columns}
          rowClassName={""}
          pagination={false}
          rowKey={(record: any) => record._id}
          dataSource={data}
          sticky={true}
          loading={loading}
          className={`${
            pagination
              ? "h-[calc(100%-100px)]"
              : !title
              ? "h-full"
              : "h-[calc(100%-40px)]"
          } overflow-scroll mt-2`}
        />
        {pagination && (
          <div className="h-[60px] justify-end flex items-center">
            <Pagination
              defaultCurrent={1}
              showSizeChanger={false}
              total={total_records}
              pageSize={25}
              responsive={true}
              onChange={(value) => {
                pagination(value);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
