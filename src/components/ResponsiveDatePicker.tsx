import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import dayjs from "dayjs";

export default function ResponsiveDatePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: dayjs.Dayjs | undefined;
  onChange: (e: any) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={value ? "" : label}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            InputLabelProps: {
              shrink: false,
              sx: {
                display: "block",
                "&.Mui-focused, &.MuiFormLabel-filled": {
                  display: "none",
                },
              },
            },
            InputProps: {
              sx: {
                "& .MuiInputBase-input": {
                  paddingTop: "16px",
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}