"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const typeorm_2 = require("typeorm");
let FilesService = exports.FilesService = class FilesService {
    constructor(repository) {
        this.repository = repository;
    }
    findAll(userId, fileType) {
        const qb = this.repository.createQueryBuilder('file');
        qb.where('file.userId = :userId', { userId });
        if (fileType === file_entity_1.FileType.PHOTOS) {
            qb.andWhere('file.mimetype LIKE :type', { type: '%image%' });
        }
        if (fileType === file_entity_1.FileType.TRASH) {
            qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
        }
        return qb.getMany();
    }
    create(file, userId) {
        return this.repository.save({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            user: { id: userId },
        });
    }
    async remove(userId, ids) {
        const idsArray = ids.split(',');
        const qb = this.repository.createQueryBuilder('file');
        qb.where('id IN (:...ids) AND userId = :userId', {
            ids: idsArray,
            userId,
        });
        return qb.softDelete().execute();
    }
};
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map