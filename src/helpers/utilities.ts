import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export const toClass = <T, V>(cls: ClassConstructor<T>, plain: V): T =>
  plainToInstance(cls, plain, {
    exposeDefaultValues: true,
    exposeUnsetFields: true,
    strategy: 'excludeAll',
  });
