import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import UserRepository from '../infra/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  private repository: UserRepository;

  constructor(@inject('UsersRepository') repository: UserRepository) {
    this.repository = repository;
  }

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<UserModel> {
    const findEmail = await this.repository.findByEmail(email);

    if (findEmail) {
      throw Error('Email is already being used');
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
export default CreateUserService;
