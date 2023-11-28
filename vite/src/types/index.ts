export interface AuthState {
  token: string | null;
  username: string | null;
  role: string | null;
  mixId: string | null;
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
  role: string,
  mixId: number
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

export interface UserRequest {
  userId: number;
  mixId: number;
  username: string;
  password: string;
  role: string;
}

export interface ApiResponse<T> {
  result : T[]
}

export interface StudentResponse {
  student_id: number;
  name: string;
  nim: string;
  email: string;
  idProdi: number,
  gender: string
  createdAt: string;
  updatedAt: string;
}

export interface StudentRequest{
  subjectId: number,
  name: string;
  email: string;
  nim: string;
  idProdi: number,
  gender: string
}

export interface LectureResponse {
  lecture_id: number;
  name: string;
  nip: string;
  email: string;
  gender: string
  createdAt: string;
  updatedAt: string;
}

export interface LectureRequest{
  lectureId: number;
  name: string;
  email: string;
  nip: string;
  gender: string
}

export interface SubjectResponse {
  subject_id: number;
  idProdi: number;
  name: string;
  code: string;
  sks: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectRequest {
  subjectId: number;
  idProdi: number;
  name: string;
  code: string;
  sks: number;
}

export interface ProdiResponse {
  prodi_id: number;
  name: string;
  idLecture: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProdiRequest {
  prodiId: number;
  name: string;
  idLecture: number
}

export interface ScheduleResponse {
  schedule_id: number;
  idProdi: number,
  idSubject: number,
  day: string,
  timeStart: string,
  timeEnd: string,
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleRequest {
  scheduleId: number;
  idProdi: number,
  idSubject: number,
  day: string,
  timeStart: string,
  timeEnd: string,
}

export interface ScoreResponse {
  score_id: number,
  idProdi: number,
  idSubject: number,
  idStudent: number,
  input: string
}

export interface ScoreRequest {
  scoreId: number,
  idProdi: number,
  idSubject: number,
  idStudent: number,
  input: string
}