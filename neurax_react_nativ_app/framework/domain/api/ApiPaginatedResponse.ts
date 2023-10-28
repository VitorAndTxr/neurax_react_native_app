import ErrorMessage from "./ErrorMessage";
import PagingInfo from "./PagingInfo";

export default interface ApiPaginatedResponse<T> {
    success: boolean;
    result: T[];
    errors: ErrorMessage[];
    paging: PagingInfo;
}


