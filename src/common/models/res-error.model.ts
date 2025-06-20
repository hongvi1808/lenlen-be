export interface ResError {
    success: boolean;
    code: string;
    statusCode: number;
    message: string;
    error: any
    data?: any;
}