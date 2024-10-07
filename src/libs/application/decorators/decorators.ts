import type { ExecutionContext } from '@nestjs/common';
import {
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Err from '@src/libs/application/exception-filters/errors/errors';


export interface UserTokenData {
  id: string;
  role: UserRole;
  email: string;
}

export const UserRolesArray = ['ADMIN', 'USER', 'MANAGER'] as const;
export type UserRole = (typeof UserRolesArray)[number];

//export const Roles = Reflector.create<UserRole[]>();

export const UserData = createParamDecorator(
  (data: keyof UserTokenData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new Err.InternalServerError().setCause(
        '@UserData has been used while there is no user in the request. Maybe an auth decorator has not been used in the route',
      );
    }

    return data ? request.user[data] : request.user;
  },
);

