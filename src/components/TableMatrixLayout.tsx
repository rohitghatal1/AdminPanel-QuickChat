import { Select, Input, Button, Form, InputNumber } from "antd";
import { MdDelete } from "react-icons/md";
const { Option } = Select;
interface OutputComponentProps {
  outputItems: any;
  warehouses?: any;
  setOutputItems?: any;
  allGlAccounts?: any;
  inputItems?: any;
  setInputItems?: any;
  setPlannedAggregate?: any;
  form: any;
  itemsData: any;
  customerPriceModel: any;
  resourcesData?: any;
  enableItem: any;
}

const OutputComponent: React.FC<OutputComponentProps> = ({
  outputItems,
  setOutputItems,
  warehouses,
  allGlAccounts,
  form,
  itemsData,
}) => {
  const calculateTotal = (index: any) => {
    const quantity = form.getFieldValue(["outputs", index, "Quantity"]);
    const price = form.getFieldValue(["outputs", index, "Price"]);
    const totalPrice = quantity && price ? quantity * price : 0;
    form.setFieldValue(["outputs", index, "TotalPrice"], totalPrice);
  };

  const tableStyles = `
    .output-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }
    
    .output-table th {
      background-color: #f8f9fa;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 2px solid #e9ecef;
      font-weight: 500;
      color: #495057;
    }
    
    .output-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #e9ecef;
      vertical-align: top;
    }
    
    .output-table tr:hover td {
      background-color: #f8f9fa;
    }
    
    .output-table .ant-form-item {
      margin-bottom: 0;
    }
    
    .output-table .ant-select, 
    .output-table .ant-input {
      width: 100%;
      border-radius: 4px;
    }
    
    .action-cell {
      width: 60px;
      text-align: center;
    }
    
    .uom-input {
      width: 80px;
      background: #f8f9fa !important;
      border: none !important;
    }
    
    .total-price-input {
      font-weight: 500;
      background: #f8f9fa !important;
    }
  `;

  return (
    <div className="text-xs md:text-md border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <style>{tableStyles}</style>

      <div className="overflow-x-auto">
        <table className="output-table min-w-[90vh]">
          <thead>
            <tr>
              <th style={{ minWidth: "200px" }}>
                Item Code <span className="text-red-500">*</span>
              </th>
              <th style={{ minWidth: "260px" }}>
                Item Name <span className="text-red-500">*</span>
              </th>
              <th style={{ minWidth: "260px" }}>
                GL Account <span className="text-red-500">*</span>
              </th>
              <th style={{ minWidth: "260px" }}>
                Warehouse <span className="text-red-500">*</span>
              </th>
              <th style={{ minWidth: "200px" }}>
                Base Quantity <span className="text-red-500">*</span>
              </th>
              <th style={{ minWidth: "200px" }}>
                DivRatio(%) <span className="text-red-500">*</span>
              </th>
              <th className="action-cell"></th>
            </tr>
          </thead>

          <tbody>
            {outputItems?.map((_: any, index: number) => (
              <tr key={index}>
                {/* Item Code Column */}
                <td style={{ minWidth: "200px" }}>
                  <Form.Item
                    name={["outputs", index, "ItemCode"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      showSearch
                      placeholder="Search item"
                      onChange={(value) => {
                        const singleItemData = itemsData?.find(
                          (item: any) => item?.ItemCode === value
                        );
                        const currentDocumentLines =
                          form.getFieldValue("outputs") || [];
                        const updatedDocumentLines = currentDocumentLines.map(
                          (item: any, i: number) =>
                            i === index
                              ? {
                                  ...item,
                                  ItemName: singleItemData?.ItemName,
                                  WhsCode:
                                    singleItemData?.DefaultWarehouse || "",
                                  UomCode: singleItemData?.InventoryUOM,
                                  Quantity: 1,
                                }
                              : item
                        );
                        form.setFieldsValue({ outputs: updatedDocumentLines });
                      }}
                      options={itemsData?.map((item: any) => ({
                        label: `${item?.ItemCode} - ${item?.ItemName}`,
                        value: item?.ItemCode,
                      }))}
                    />
                  </Form.Item>
                </td>

                {/* Item Name Column */}
                <td style={{ minWidth: "260px" }}>
                  <Form.Item
                    name={["outputs", index, "ItemName"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      showSearch
                      placeholder="Search item"
                      onChange={(value) => {
                        const singleItemData = itemsData?.find(
                          (item: any) => item?.ItemName === value
                        );
                        const currentDocumentLines =
                          form.getFieldValue("outputs") || [];
                        const updatedDocumentLines = currentDocumentLines.map(
                          (item: any, i: number) =>
                            i === index
                              ? {
                                  ...item,
                                  ItemCode: singleItemData?.ItemCode,
                                  WhsCode:
                                    singleItemData?.DefaultWarehouse || "",
                                  UomCode: singleItemData?.InventoryUOM,
                                  Quantity: 1,
                                }
                              : item
                        );
                        form.setFieldsValue({ outputs: updatedDocumentLines });
                      }}
                      options={itemsData?.map((item: any) => ({
                        label: item?.ItemName,
                        value: item?.ItemName,
                      }))}
                    />
                  </Form.Item>
                </td>

                {/* GL Account Column */}
                <td style={{ minWidth: "260px" }}>
                  <Form.Item
                    name={["outputs", index, "AccountCode"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select GL Account"
                      options={allGlAccounts?.map((GLAcc: any) => ({
                        label: `${GLAcc?.Code} - ${GLAcc?.Name}`,
                        value: GLAcc?.Code,
                      }))}
                    />
                  </Form.Item>
                </td>

                {/* Warehouse Column */}
                <td style={{ minWidth: "260px" }}>
                  <Form.Item
                    name={["outputs", index, "WhsCode"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      showSearch
                      dropdownStyle={{ width: "20rem" }}
                      placeholder="Select a warehouse"
                    >
                      {warehouses?.length > 0 &&
                        warehouses?.map((warehouse: any, index: number) => (
                          <Option value={warehouse?.WarehouseCode} key={index}>
                            {warehouse?.WarehouseName}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </td>

                {/* Base Quantity Column */}
                <td style={{ minWidth: "200px" }}>
                  <div className="flex gap-2">
                    <Form.Item
                      name={["outputs", index, "Quantity"]}
                      rules={[{ required: true, message: "Required" }]}
                      className="flex-1"
                    >
                      <Input
                        type="number"
                        onBlur={() => {
                          calculateTotal(index);
                          // updateInputQuantities(index);
                        }}
                        className="min-w-[5rem]!"
                      />
                    </Form.Item>

                    <Form.Item
                      name={["outputs", index, "UomCode"]}
                      className="w-[80px]"
                    >
                      <Input readOnly className="uom-input" />
                    </Form.Item>
                  </div>
                </td>

                {/* Division Ratio Column */}
                <td style={{ minWidth: "200px" }}>
                  <Form.Item
                    name={["outputs", index, "DivisionRatio"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <InputNumber
                      type="number"
                      className="w-full"
                      min={0}
                      max={100}
                    />
                  </Form.Item>
                </td>

                {/* Action Column */}
                <td className="action-cell">
                  <Button
                    type="text"
                    danger
                    icon={
                      <MdDelete className="text-lg text-red-500 hover:text-red-700" />
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      const currentLines = form.getFieldValue("outputs") || [];
                      const filtered = currentLines.filter(
                        (_: any, idx: number) => idx !== index
                      );
                      form.setFieldsValue({ outputs: filtered });
                      setOutputItems(
                        outputItems.filter((_: any, i: number) => i !== index)
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <Button
          type="dashed"
          onClick={(e) => {
            e.preventDefault();
            setOutputItems([...outputItems, { key: outputItems.length }]);
          }}
          className="hover:border-blue-500 hover:text-blue-600"
        >
          + Add New Item
        </Button>
      </div>
    </div>
  );
};

export default OutputComponent;
