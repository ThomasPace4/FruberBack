import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly price: string;
  @IsString()
  readonly quantity: string;
  @IsString()
  readonly category: string;
  @IsString()
  readonly authId: string;
}
