import { Repository, getRepository } from 'typeorm';
import AppointmentModel from '../entities/Appointments';
import IAppointmentRepository from '../../../repositoriesInterface/IAppointmentsRepositories';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentsDTO';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<AppointmentModel>;

  constructor() {
    // Repositorio de appointment
    this.ormRepository = getRepository(AppointmentModel);
  }

  public async findByDate(date: Date): Promise<AppointmentModel | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<AppointmentModel> {
    const appointments = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointments);
    return appointments;
  }
}
export default AppointmentsRepository;
