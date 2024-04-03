import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'At least 8 characters').required('Password is required')
})