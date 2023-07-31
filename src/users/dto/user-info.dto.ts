import { Expose } from "class-transformer";

export class UserInfoDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;
}
