import { Router } from 'express';
import { container } from 'tsyringe';
import ValidateUserService from '../../../../modules/users/services/ValidadeUserSession';
import AuthenticateService from '../../../../modules/users/services/AnthenticateUserService';

const routes = Router();

routes.post('/', async (req, res) => {
  try {
    const validadeUser = new ValidateUserService();
    const { email, password } = req.body;
    const user = await validadeUser.execute(req.body);
    if (user) {
      const authenticateUser = container.resolve(AuthenticateService);
      const { user: userAuthenticate, token } = await authenticateUser.execute({
        email,
        password,
      });
      return res.json({ userAuthenticate, token });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
export default routes;
