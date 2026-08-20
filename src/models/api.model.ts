export interface CreateUserPayload {
  name: string;
  job: string;
}

export interface CreateUserResponse {
  id: number;
  name: string;
  job: string;
}

export interface SingleUserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface UpdateUserResponse {
  id: number;
  name: string;
  job: string;
}