/// <reference types="multer" />
import { FilesService } from './files.service';
import { FileType } from './entities/file.entity';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    findAll(userId: number, fileType: FileType): Promise<import("./entities/file.entity").FileEntity[]>;
    create(file: Express.Multer.File, userId: number): Promise<{
        filename: string;
        originalName: string;
        size: number;
        mimetype: string;
        user: {
            id: number;
        };
    } & import("./entities/file.entity").FileEntity>;
    remove(userId: number, ids: string): Promise<import("typeorm").UpdateResult>;
}
