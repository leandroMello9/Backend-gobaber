import UserModel from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepositoryInterface {
  findByEmail(email: string): Promise<UserModel | undefined>;
  findById(id: string): Promise<UserModel | undefined>;
  create(data: ICreateUserDTO): Promise<UserModel>;
  save(user: UserModel): Promise<UserModel>;
}
