import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class GraphicsData1619908867494 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'graphicsdata',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'uv',
                        type: 'int',
                    },
                    {
                        name: 'pv',
                        type: 'int',
                    },
                    {
                        name: 'amt',
                        type: 'int',
                    },
                    {
                        name: 'graphicId',
                        type: 'int',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fkGraph',
                        referencedTableName: 'graphics',
                        referencedColumnNames: ['id'],
                        columnNames: ['graphicId'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('graphicsdata');
    }
}
