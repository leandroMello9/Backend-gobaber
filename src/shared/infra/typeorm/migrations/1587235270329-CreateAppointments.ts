import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1587235270329
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // Nome da tabela
        name: 'appointments',
        // Colunas da tabela
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            // Gerando o campo id como uuid
            generationStrategy: 'uuid',
            // Função que sera executada parar criar o id automaticamente
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
