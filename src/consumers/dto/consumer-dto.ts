import { IsString } from 'class-validator';

export class CreateConsumerDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly password: string;
}
