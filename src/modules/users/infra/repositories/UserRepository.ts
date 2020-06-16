import { Repository, getRepository } from 'typeorm';
import UserModel from '../typeorm/entities/User';
import IUserRepository from '../../repositoriesInterface/IUserRepository';
import IUserCreateInterfaceDTO from '../../dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserModel>;

  constructor() {
    this.ormRepository = getRepository(UserModel);
  }

  public async findById(id: string): Promise<UserModel | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create({
    name,
    email,
    password,
  }: IUserCreateInterfaceDTO): Promise<UserModel> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: UserModel): Promise<UserModel> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.ormRepository.findOne({
      where: email,
    });
    return user;
  }
}
export default UserRepository;
