import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import IUserRepository from '../infra/repositories/UserRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
  private repository: IUserRepository;

  constructor(@inject('UsersRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<UserModel> {
    const user = await this.repository.findById(user_id);
    if (!user) {
      throw new Error('Only authenticate users can change avatar');
    }
    if (user.avatar) {
      // Deletando avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Stat = status de arquivo caso aquele arquivo exista
      const userAvatarExist = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarExist) {
        // Deletando o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await this.repository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
