import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('messages')
class Message {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    sender: string;

    @Column()
    receiver: string;

    @Column()
    content: string;

    @CreateDateColumn()
    sentAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Message };
