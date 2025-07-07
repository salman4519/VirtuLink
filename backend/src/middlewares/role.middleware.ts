import { Request, Response, NextFunction } from "express";
import { createHttpError } from "@/utils/http-error.util";
import { AuthJwtPayload } from "@/types/jwt-payload";
import { HttpResponse } from "@/constants";
import { HttpStatus } from "@/constants/status.constant";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.headers["x-user-payload"]) {
      return next(
        createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.UNAUTHORIZED)
      );
    }

    const user = JSON.parse(
      req.headers["x-user-payload"] as string
    ) as AuthJwtPayload;

    if (!allowedRoles.includes(user.role)) {
      return next(createHttpError(HttpStatus.FORBIDDEN, HttpResponse.FORBIDDEN));
    }
    next();
  };
}; 