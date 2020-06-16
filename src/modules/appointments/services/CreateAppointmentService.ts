import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppointmentModel from '../infra/typeorm/entities/Appointments';
import AppointmentsRepository from '../repositoriesInterface/IAppointmentsRepositories';

interface IResquestDTO {
  date: Date;
  provider_id: string;
}
// Dependency Inversion
@injectable()
class CreateAppointmentService {
  private repository: AppointmentsRepository;

  // Informando pro service qual sera o repositorio que o servide ira utilizar
  constructor(
    @inject('AppointmentsRepository')
    repository: AppointmentsRepository,
  ) {
    this.repository = repository;
  }

  public async execute({
    date,
    provider_id,
  }: IResquestDTO): Promise<AppointmentModel> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.repository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw Error('Esse horario ja foi agendado');
    }

    const appointment = await this.repository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
