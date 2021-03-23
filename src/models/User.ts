import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {Organization} from './Organization';

@Entity('users')
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    orgid: string;

    @ManyToOne(() => Organization)
    @JoinColumn({name: "id"})
    organization: Organization

    @PrimaryColumn()
    username: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };
