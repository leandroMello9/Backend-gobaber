// Entidade de agendamento

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';

/*
  Um para um = (OneToOne)
  Um para muitos = (OneToMany)
  Muitos para Muitos = (ManyToMany)
*/
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // Muitos agendamentos para um usuario
  @ManyToOne(() => User)
  // Qual é a coluna que identificar qual q e o usuario que o prestador do serviço
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
