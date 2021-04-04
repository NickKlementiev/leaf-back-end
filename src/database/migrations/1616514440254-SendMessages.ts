import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SendMessages1616514440254 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'sender',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'receiver',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                    },
                    {
                        name: 'sentAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fkSender',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['sender'],
                    },
                    {
                        name: 'fkReceiver',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['receiver'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }
}
