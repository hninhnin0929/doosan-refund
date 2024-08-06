// components/Table.tsx
import React from "react";
import { FilterTypes } from "@/utils/types";

interface TableProps<T extends Record<string, React.ReactNode>> {
  data: T[];
  columns: { title: string; key: keyof T }[];
  filters: Record<keyof T, { type: FilterTypes; value: string }>;
  onFilterChange: (key: keyof T, type: FilterTypes, value: string) => void;
  onRowClick: (row: T) => void;
  selectedRow: T | null;
}

export function Table<T extends Record<string, React.ReactNode>>({
  data,
  columns,
  filters,
  onFilterChange,
  onRowClick,
  selectedRow,
}: TableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(({ title, key }) => (
              <th
                key={key as string}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500"
              >
                <div className="flex flex-col space-y-1">
                  <span>{title}</span>
                  <select
                    value={filters[key].type}
                    onChange={(e) =>
                      onFilterChange(
                        key,
                        e.target.value as FilterTypes,
                        filters[key].value
                      )
                    }
                    className="text-xs p-1 border rounded"
                  >
                    {Object.values(FilterTypes).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {filters[key].type !== FilterTypes.NO_FILTER && (
                    <input
                      type="text"
                      value={filters[key].value}
                      onChange={(e) =>
                        onFilterChange(key, filters[key].type, e.target.value)
                      }
                      className="text-xs p-1 border rounded"
                      placeholder={`Filter ${title}...`}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-xs">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick(row)}
                className={`cursor-pointer hover:bg-gray-100 ${
                  selectedRow === row ? "bg-blue-100" : ""
                }`}
              >
                {columns.map(({ key }) => (
                  <td key={key as string} className="px-4 py-2">
                    {/* {row[key]} */}
                    {/* <input
                      type="text"
                      value={row[key]}
                      className="w-full px-2 py-1 border rounded"
                    /> */}
                    <input
                      type="text"
                      value={(row[key] as string | number) ?? ""}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center">
                데이터가 없습니다...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
