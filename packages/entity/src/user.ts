import type { BaseRequestData } from "./appMetadata";

export enum UserType {}

export interface User {
  id: string;
  email: string;
  nickname?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRepository {
  getUser(data: BaseRequestData<void>): Promise<User>;
}
