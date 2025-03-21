// Dummy table column titles 
export const tableTitles = [
  "환급 ID",
  "수출자명",
  "수출자 이메일",
  "수출자 존환번호",
  "상풍명",
  "환급 사유",
  "환급 금액",
  "신청일",
  "처리 상태",
  "처리 일자",
];

// Dummy API response data
export const responseData = {
  totalItems: 100, // Total number of items across all pages
  itemsPerPage: 10, // Number of items per page
  currentPage: 1, // Current page number
  totalPages: 10, // Total number of pages
  tableData: [
    {
      refundId: "001",
      exporterName: "김철수",
      exporterEmail: "cheolsu.kim@example.com",
      exporterPhoneNumber: "+82-10-1234-5678",
      productName: "전자제품",
      refundReason: "불량품",
      refundAmount: 150000,
      applicationDate: "2024-01-15",
      status: "대기 중",
      processingDate: "2024-01-20",
    },
    {
      refundId: "002",
      exporterName: "이영희",
      exporterEmail: "younghee.lee@example.com",
      exporterPhoneNumber: "+82-10-2345-6789",
      productName: "가전제품",
      refundReason: "설명과 다름",
      refundAmount: 200000,
      applicationDate: "2024-02-10",
      status: "승인",
      processingDate: "2024-02-15",
    },
    {
      refundId: "003",
      exporterName: "박민수",
      exporterEmail: "minsu.park@example.com",
      exporterPhoneNumber: "+82-10-3456-7890",
      productName: "가구",
      refundReason: "배송 지연",
      refundAmount: 300000,
      applicationDate: "2024-03-05",
      status: "거절",
      processingDate: "2024-03-10",
    },
    {
      refundId: "004",
      exporterName: "최은지",
      exporterEmail: "eunji.choi@example.com",
      exporterPhoneNumber: "+82-10-4567-8901",
      productName: "의류",
      refundReason: "변심",
      refundAmount: 180000,
      applicationDate: "2024-04-12",
      status: "대기 중",
      processingDate: "2024-04-17",
    },
    {
      refundId: "005",
      exporterName: "정지훈",
      exporterEmail: "jihun.jeong@example.com",
      exporterPhoneNumber: "+82-10-5678-9012",
      productName: "컴퓨터",
      refundReason: "잘못된 상품",
      refundAmount: 250000,
      applicationDate: "2024-05-22",
      status: "승인",
      processingDate: "2024-05-27",
    },
    {
      refundId: "006",
      exporterName: "한예지",
      exporterEmail: "yeji.han@example.com",
      exporterPhoneNumber: "+82-10-6789-0123",
      productName: "가전제품",
      refundReason: "손상됨",
      refundAmount: 320000,
      applicationDate: "2024-06-15",
      status: "거절",
      processingDate: "2024-06-20",
    },
    {
      refundId: "007",
      exporterName: "이준혁",
      exporterEmail: "junhyuk.lee@example.com",
      exporterPhoneNumber: "+82-10-7890-1234",
      productName: "가전제품",
      refundReason: "다른 곳에서 더 저렴함",
      refundAmount: 400000,
      applicationDate: "2024-07-19",
      status: "대기 중",
      processingDate: "2024-07-24",
    },
    {
      refundId: "008",
      exporterName: "김수민",
      exporterEmail: "sumin.kim@example.com",
      exporterPhoneNumber: "+82-10-8901-2345",
      productName: "악기",
      refundReason: "품질 불량",
      refundAmount: 500000,
      applicationDate: "2024-08-20",
      status: "승인",
      processingDate: "2024-08-25",
    },
    {
      refundId: "009",
      exporterName: "윤서연",
      exporterEmail: "seoyeon.yoon@example.com",
      exporterPhoneNumber: "+82-10-9012-3456",
      productName: "의류",
      refundReason: "사이즈 맞지 않음",
      refundAmount: 275000,
      applicationDate: "2024-09-23",
      status: "거절",
      processingDate: "2024-09-28",
    },
    {
      refundId: "010",
      exporterName: "장우진",
      exporterEmail: "woojin.jang@example.com",
      exporterPhoneNumber: "+82-10-0123-4567",
      productName: "전자제품",
      refundReason: "부품 누락",
      refundAmount: 600000,
      applicationDate: "2024-10-30",
      status: "대기 중",
      processingDate: "2024-11-04",
    },
  ],
};
