import { Expose } from 'class-transformer';

export class UserSerializer {
  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  job: string;

  @Expose()
  reqres_id: number;

  @Expose()
  avatar: string;
}
