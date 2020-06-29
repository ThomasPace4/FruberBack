import { IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly password: string;
}
