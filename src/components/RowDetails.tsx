// components/RowDetails.tsx
import React, { useState } from "react";

interface RowDetailsProps<T extends Record<string, React.ReactNode>> {
  row: T | null;
}

export function RowDetails<T extends Record<string, React.ReactNode>>({
  row,
}: RowDetailsProps<T>) {
  const [activeTab, setActiveTab] = useState<string>("새부정보");
  const tabs = ["새부정보", "기록", "관련 항목"];

  if (!row) return null;

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
                <strong>처리 히스토:</strong> 요청 제출 후 검토, 추가 서류 요청,
                최종 승인
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
            <h3 className="text-lg font-semibold mb-2 mt-3">
              관련 서류 및 양식
            </h3>
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
}
