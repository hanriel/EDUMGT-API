import { FileEntity } from '../../files/entities/file.entity';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    fname: string;
    lname: string;
    mname: string;
    files: FileEntity[];
}
