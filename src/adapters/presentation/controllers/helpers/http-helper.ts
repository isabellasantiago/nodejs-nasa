import { HttpResponse } from "../ports/http";

export const notFoundRequest = (error: Error): HttpResponse => ({
    statusCode: 404,
    body: error.message
})

export const okCreated = (data: any ): HttpResponse => ({
    body: data,
    statusCode: 201
})

export const successNoContent = (): HttpResponse => ({
    statusCode: 204
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error.message
})

export const conflictRequest = (error: Error): HttpResponse => ({
    statusCode: 409,
    body: error.message
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error.message
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: error.message
})