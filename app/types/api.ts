export interface LoginResponse {
    data: string
}

export interface RegisterResponse {
  data: {
    id: number
    username: string
    password: string
  }
}

export interface ErrorResponse {
  message: string
}
