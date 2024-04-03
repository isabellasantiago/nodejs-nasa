export interface ValidatorService {
    validate(data: any, schema: any): Promise<void>
}