import Appointment from '../infra/typeorm/entities/Appointments';
import ICreatAppointmentDTO from '../dtos/ICreateAppointmentsDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreatAppointmentDTO): Promise<Appointment>;
}
