import * as Yup from 'yup';

interface IRequest {
  email: string;
  password: string;
}
class ValidateUser {
  public async execute(data: IRequest): Promise<IRequest> {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(data))) {
      throw new Error('Schema validation, data is incorrect');
    }
    return data;
  }
}
export default ValidateUser;
