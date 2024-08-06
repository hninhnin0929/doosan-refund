"use client";

import React, { useState, useMemo } from "react";
import { responseData, tableTitles } from "@/data/dummydata";
import { FilterTypes } from "@/utils/types";
import { Table } from "@/components/Table";
import { Pagination } from "@/components/Pagination";
import { RowDetails } from "@/components/RowDetails";

type DataItem = (typeof responseData.tableData)[0];

const searchKeys = [
  "refundId",
  "exporterName",
  "exporterEmail",
  "exporterPhoneNumber",
  "productName",
  "refundReason",
  "refundAmount",
  "applicationDate",
  "status",
  "processingDate",
];

export default function ExportReportPage() {
  // const [filters, setFilters] = useState(
  //   Object.fromEntries(
  //     searchKeys.map((key) => [key, { type: FilterTypes.NO_FILTER, value: "" }])
  //   )
  // );
  const [filters, setFilters] = useState<Record<keyof DataItem, { type: FilterTypes; value: string }>>(
    Object.fromEntries(
      searchKeys.map((key) => [key, { type: FilterTypes.NO_FILTER, value: "" }])
    ) as Record<keyof DataItem, { type: FilterTypes; value: string }>
  );

  const [currentPage, setCurrentPage] = useState(responseData.currentPage);

  const [selectedRow, setSelectedRow] = useState<DataItem | null>(null);

  const filteredData = useMemo(() => {
    return responseData.tableData.filter((row) =>
      searchKeys.every((key) => {
        // const filter = filters[key];
        const filter = filters[key as keyof typeof filters];
        const value = row[key as keyof DataItem]?.toString().toLowerCase();

        switch (filter.type) {
          case FilterTypes.CONTAINS:
            return value?.includes(filter.value.toLowerCase());
          case FilterTypes.EQUALS:
            return value === filter.value.toLowerCase();
          default:
            return true;
        }
      })
    );
  }, [filters]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * responseData.itemsPerPage;
    const endIndex = startIndex + responseData.itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const handleFilterChange = (
    key: keyof DataItem,
    type: FilterTypes,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: { type, value },
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredData.length / responseData.itemsPerPage);

  const columns = tableTitles.map((title, index) => ({
    title,
    key: searchKeys[index] as keyof DataItem,
  }));

  return (
    <div className="flex flex-1 flex-col space-y-2 bg-gray-50">
      <h2 className="text-lg font-bold">환급 메뉴1</h2>

      {/* Action buttons */}
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
        <div className="space-x-2">
          <button className="btn-custom btn-edit">편집</button>
          <button className="btn-custom btn-delete">삭제</button>
        </div>
        <div className="space-x-2">
          <button className="btn-custom btn-print">언쇄</button>
          <button className="btn-custom btn-export">내보내기</button>
        </div>
      </div>

      {/* Table */}
      <Table
        data={paginatedData}
        columns={columns}
        filters={filters}
        onFilterChange={handleFilterChange}
        onRowClick={setSelectedRow}
        selectedRow={selectedRow}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={responseData.itemsPerPage}
        totalItems={filteredData.length}
      />

      {/* Row Details */}
      <RowDetails row={selectedRow} />
    </div>
  );
}
