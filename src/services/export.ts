import { AssessmentDataType } from "../@d.types";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


const fileType =
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportData = (data: AssessmentDataType[]) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const newData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(newData, "Data_Entry" + fileExtension);
  };