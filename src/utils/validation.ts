export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_MAX_LENGTH = 20
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface ValidationError {
  isValid: boolean
  message: string
}

export const validateEmail = (email: string): ValidationError => {
  if (!email) {
    return { isValid: false, message: 'Email is required' }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Invalid email format' }
  }
  return { isValid: true, message: '' }
}

export const validatePassword = (password: string, confirmPassword?: string): ValidationError => {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { isValid: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` }
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return { isValid: false, message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters` }
  }
  if (confirmPassword && password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' }
  }
  return { isValid: true, message: '' }
} 