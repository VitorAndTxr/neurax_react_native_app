import ErrorMessage from "./ErrorMessage";


export default interface ApiResponse<T> {
    success: boolean;
    result: T;
    errors: ErrorMessage[];
}
