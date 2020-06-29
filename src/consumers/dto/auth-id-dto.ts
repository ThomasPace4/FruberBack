import { IsString } from 'class-validator';

export class AuthIdDto {
  @IsString()
  readonly authId: string;
}
