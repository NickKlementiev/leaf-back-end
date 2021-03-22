import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrganizations1616425432470 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'organizations',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('organizations');
    }
}
