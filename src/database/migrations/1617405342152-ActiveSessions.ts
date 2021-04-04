import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ActiveSessions1617405342152 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sessions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isUnique: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fkUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['userId'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessions');
    }
}
