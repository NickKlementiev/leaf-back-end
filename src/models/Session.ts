import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    Unique,
} from 'typeorm';

@Entity('sessions')
@Unique('uniqueUser', ['userId'])
class Session {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;
}

export { Session };
