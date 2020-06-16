import { container } from 'tsyringe';

import IAppointmentsRepository from '../../modules/appointments/repositoriesInterface/IAppointmentsRepositories';
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositores/AppointmentsRepository';
import IUserRepository from '../../modules/users/repositoriesInterface/IUserRepository';
import UserRepository from '../../modules/users/infra/repositories/UserRepository';
// 1 paremetro o nome que ira ser registrado para cada repositorio
// registerSingleton = iNSTACIA A NOSSAS ENTIDADES 1 VEZ NO CICLO DE VIDA DA APLICAÇÃO
// Resgiter = Instancia as entidades toda vez que a aplicação é iniciada
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);
