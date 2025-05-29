import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { SUCCESS_MESSAGE_KEY } from '../decorators/success-message.decorator';
import { ApiResponse } from '../dto/api-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class GlobalTransformInterceptor<T> implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const message = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data: T) => {
        const plainData = instanceToPlain(data);
        return new ApiResponse(plainData, message);
      }),
    );
  }
}
