import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1587308855638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // Nome da tabela
        name: 'users',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
    await queryRunner.dropTable('users');
  }
}
