/// <reference types="multer" />
import { FileEntity, FileType } from './entities/file.entity';
import { Repository } from 'typeorm';
export declare class FilesService {
    private repository;
    constructor(repository: Repository<FileEntity>);
    findAll(userId: number, fileType: FileType): Promise<FileEntity[]>;
    create(file: Express.Multer.File, userId: number): Promise<{
        filename: string;
        originalName: string;
        size: number;
        mimetype: string;
        user: {
            id: number;
        };
    } & FileEntity>;
    remove(userId: number, ids: string): Promise<import("typeorm").UpdateResult>;
}
