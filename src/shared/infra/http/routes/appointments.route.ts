import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../../modules/appointments/services/CreateAppointmentService';
import UserIsAuthenticate from '../middlewares/UserIsAuthenticate';
// PARSE ISO = Converte uma string para um formate Date do javascript
// STARTOFHOUR = Pega uma data e coloca os segundos como zero minutos
// IS EQUAL = Comprar duas datas diferentes retorna true se for iguais ou false se forem diferente

const appointmentsRouter = Router();

// DTO = Data transer object = Transferindo um objeto de um arquivo para o outro
appointmentsRouter.use(UserIsAuthenticate);
// appointmentsRouter.get('/', async (req, res) => {
//   const appointmentList = await appointmentsRepository.find();
//   return res.json(appointmentList);
// });
appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);
    // Carrega o nosso service e verifica se  o service esta injetando qualquer dependencia
    const createAppointment = container.resolve(CreateAppointmentService);
    // Novo appointment
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
