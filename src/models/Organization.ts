import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('organizations')
class Organization {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}

export { Organization };
