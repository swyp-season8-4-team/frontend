import { HttpHandler } from "msw";
import { userHandlers } from "./user-handlers";

export const handlers: HttpHandler[] = [...userHandlers];
