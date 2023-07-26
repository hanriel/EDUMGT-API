import { UserEntity } from '../../users/entities/user.entity';
export declare enum FileType {
    PHOTOS = "photos",
    TRASH = "trash"
}
export declare class FileEntity {
    id: number;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    user: UserEntity;
    deleteAt?: Date;
}
