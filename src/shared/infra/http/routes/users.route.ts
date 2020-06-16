import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import CreateUserService from '../../../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarService';
import uploadConfig from '../../../../config/auth';
import userAuthenticate from '../middlewares/UserIsAuthenticate';

const userRouter = Router();
const upload = multer(uploadConfig);

// userRouter.get('/', async (request, response) => {
//   const userRepository = getRepository(UserModel);
//   const userList = await userRepository.find();
//   return response.json(userList);
// });
userRouter.post('/', async (request, response) => {
  try {
    const { email, password, name } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, name, password });
    return response.json(user);
  } catch (err) {
    console.log('Erro ->', err);
    return response.json({ erro: err });
  }
});
userRouter.patch(
  '/avatar',
  userAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      delete user.password;
      return response.json(user);
    } catch (err) {
      return response.json({ erro: err.message });
    }
  },
);
export default userRouter;
