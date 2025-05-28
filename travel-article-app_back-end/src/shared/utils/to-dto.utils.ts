import { plainToInstance } from 'class-transformer';

export function toDto<T>(cls: new () => T, plain: object): T {
  return plainToInstance(cls, plain);
}
