export interface IPaginationPageProps {
    lastPage: number;
    refetch: (args: { page: number, search?: string }) => void;   
}

