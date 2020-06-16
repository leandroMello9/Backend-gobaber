import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1587309974797
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Deletando uma coluna
    await queryRunner.dropColumn('appointments', 'provider');
    // Criando uma nova coluna na tabela appointments
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    // Chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        name: 'AppointmentsProvider',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Deletando a chave estrangeira
    await queryRunner.dropForeignKey('appointments', 'AppointmentsProvider');
    // Deletando o provider_id
    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
