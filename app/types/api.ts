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

export interface Record{
    id: number
    user_id: number
    name: string
    content: string
  
}

export interface RecordListResponse{
  data: Record[]
}
