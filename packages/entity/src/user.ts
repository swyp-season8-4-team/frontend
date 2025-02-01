import type { BaseRequestData } from "./appMetadata";

export enum UserType {}

export interface User {
  id: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  address: string;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRepository {
  addInfo(data: BaseRequestData<User>): Promise<User>;
  delete(data: BaseRequestData<void>): Promise<void>;
  get(data: BaseRequestData<void>): Promise<User>;
  update(data: BaseRequestData<User>): Promise<void>;
}
