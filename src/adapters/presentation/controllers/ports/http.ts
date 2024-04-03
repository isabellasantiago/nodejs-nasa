export interface HttpResponse {
    statusCode: number
    body?: any
}

export interface HttpRequest<T = any> {
    file?: any,
    body?: T
}