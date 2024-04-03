type Envs = {
    port: string;
    secret_jwt_key: string;
}

export const envs: Envs = {
    port: process.env.PORT ?? '8081',
    secret_jwt_key: process.env.JWT_SECRET_KEY ?? 'mysecret'
}