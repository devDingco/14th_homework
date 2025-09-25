export interface IPaginationPageProps {
    lastPage: number;
    refetch: (args: { page: number, search?: string }) => void;   
    currentPage?: number;  // ✅ 추가
}

