import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import '../typeorm/index';
import uploadConfig from '../../../config/upload';
import '../../container/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log('Serve started port 3333');
});
