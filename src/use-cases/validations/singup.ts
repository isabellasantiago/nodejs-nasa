import * as yup from 'yup'

export const signupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'At least 8 characters').required('Password is required'),
    confirmPassword: yup.string().min(8, 'At least 8 characters').oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password')
})