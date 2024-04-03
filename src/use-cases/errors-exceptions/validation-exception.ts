export class ValidateException extends Error {
    details: Record<string, string>;

    constructor(message: string, details: Record<string, string>) {
        super(message);
        this.name = 'ValidateException';
        this.details = details;
    }
}