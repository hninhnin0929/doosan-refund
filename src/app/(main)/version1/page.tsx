"use client";

import React, { useState, useMemo } from "react";
import { responseData, tableTitles } from "@/data/dummydata";

enum FilterTypes {
  NO_FILTER = "No Filter",
  CONTAINS = "Contains",
  EQUALS = "Equals",
}

type DataItem = (typeof responseData.tableData)[0];

const titleToKey: { [key: string]: keyof DataItem } = {
  "환급 ID": "refundId",
  수출자명: "exporterName",
  "수출자 이메일": "exporterEmail",
  "수출자 존환번호": "exporterPhoneNumber",
  상풍명: "productName",
  "환급 사유": "refundReason",
  "환급 금액": "refundAmount",
  신청일: "applicationDate",
  "처리 상태": "status",
  "처리 일자": "processingDate",
};

type Row = {
  [key: string]: string | number;
};

export default function ExportReportPage() {
  const [filters, setFilters] = useState(
    Object.fromEntries(
      tableTitles.map((title) => [
        title,
        { type: FilterTypes.NO_FILTER, value: "" },
      ])
    )
  );

  const [currentPage, setCurrentPage] = useState(responseData.currentPage);

  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [activeTab, setActiveTab] = useState<String>("새부정보");

  const filteredData = useMemo(() => {
    return responseData.tableData.filter((row) =>
      Object.entries(filters).every(([title, filter]) => {
        const key = titleToKey[title as keyof typeof titleToKey];
        const value = row[key].toString().toLowerCase();

        switch (filter.type) {
          case FilterTypes.CONTAINS:
            return value.includes(filter.value.toLowerCase());
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
    title: string,
    type: FilterTypes,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [title]: { type, value },
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredData.length / responseData.itemsPerPage);

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <button key="ellipsis-start" className="btn-custom btn-pagination">
          ...
        </button>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`btn-custom ${
            currentPage === page ? "btn-pagination-active" : "btn-pagination"
          }`}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <button key="ellipsis-end" className="btn-custom btn-pagination">
          ...
        </button>
      );
    }

    return pageButtons;
  };

  const RowDetails: React.FC<{ row: Row | null }> = ({ row }) => {
    if (!row) return null;

    const tabs = ["새부정보", "기록", "관련 항목"];

    return (
      <div className="mt-4 bg-white rounded-lg shadow-md text-xs">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === "새부정보" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">세부정보</h3>
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          )}

          {activeTab === "기록" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">환급 요청 이력</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <strong>요청 날짜:</strong> 2023년 1월 15일
                </li>
                <li>
                  <strong>처리 완료 날짜:</strong> 2023년 2월 10일
                </li>
                <li>
                  <strong>처리 상태:</strong> 승인됨
                </li>
                <li>
                  <strong>처리 히스토:</strong> 요청 제출 후 검토, 추가 서류
                  요청, 최종 승인
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-2 mt-3">처리 히스토리</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <strong>2023년 1월 16일:</strong> 서류 검토 시작
                </li>
                <li>
                  <strong>2023년 1월 25일:</strong> 추가 서류 요청
                </li>
                <li>
                  <strong>2023년 2월 5일:</strong> 서류 보강 후 승인
                </li>
                <li>
                  <strong>2023년 2월 10일:</strong> 환급 금액 송금
                </li>
              </ul>
            </div>
          )}

          {activeTab === "관련 항목" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">관련 법령 및 규정</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <strong>관세법 제52조:</strong> 환급 요청 절차와 조건
                </li>
                <li>
                  <strong>환급 규정 제10조:</strong> 환급 금액 계산 방법
                </li>
                <li>
                  <strong>관세청 공문:</strong> 최신 환급 정책 안내
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-2 mt-3">관련 서류 및 양식</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <strong>환급 요청서 양식:</strong> [링크 또는 첨부파일]
                </li>
                <li>
                  <strong>필요 서류 목록:</strong> 추가 서류 요청
                </li>
                <li>
                  <strong>2023년 2월 5일:</strong> 영수증, 송장 사본, 신분증 사본
                </li>
                <li>
                  <strong>처리 완료 통지서:</strong> [링크 또는 첨부파일]
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

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
      <div className="bg-white rounded-lg shadow-md overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {tableTitles.map((title, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500"
                >
                  <div className="flex flex-col space-y-1">
                    <span>{title}</span>
                    <select
                      value={filters[title].type}
                      onChange={(e) =>
                        handleFilterChange(
                          title,
                          e.target.value as FilterTypes,
                          filters[title].value
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
                    {filters[title].type !== FilterTypes.NO_FILTER && (
                      <input
                        type="text"
                        value={filters[title].value}
                        onChange={(e) =>
                          handleFilterChange(
                            title,
                            filters[title].type,
                            e.target.value
                          )
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
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => setSelectedRow(row)}
                  className={`cursor-pointer hover:bg-gray-100 ${
                    selectedRow === row ? "bg-blue-100" : ""
                  }`}
                >
                  {tableTitles.map((title, cellIndex) => {
                    const key = titleToKey[title as keyof typeof titleToKey];
                    return (
                      <td key={cellIndex} className="px-4 py-2">
                        {row[key]}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableTitles.length}
                  className="px-4 py-2 text-center"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md text-xs">
        <div>
          현재 페이지 {(currentPage - 1) * responseData.itemsPerPage + 1}에서{" "}
          {Math.min(
            currentPage * responseData.itemsPerPage,
            filteredData.length
          )}
          까지, 총 {filteredData.length} 항목
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="btn-custom btn-pagination"
          >
            처음
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-custom btn-pagination"
          >
            이전
          </button>
          {renderPageButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-custom btn-pagination"
          >
            다음
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="btn-custom btn-pagination"
          >
            마지
          </button>
        </div>
      </div>
      {/* end pagination */}

      {/* Row Details */}
      <RowDetails row={selectedRow} />
    </div>
  );
}
