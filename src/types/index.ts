export interface AuthState {
  token: string | null;
  username: string | null;
}

export type AlertColorProps = "success" | "failure";

export interface Snackbar {
  open: boolean;
  alertColor: AlertColorProps;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  username: string;
}

export interface UserResponse {
  user_id: number;
  student_id: string | number;
  lecture_id: string | number;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  result : T[]
}

export interface StudentResponse {
  student_id: number;
  name: string;
  nim: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentRequest{
  name: string;
  email: string;
  year_in: string;
}


export interface LectureResponse {
  lecture_id: number;
  name: string;
  nip: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}