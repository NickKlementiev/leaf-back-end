import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('graphics')
class Graphic {
    @PrimaryColumn()
    readonly id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;
}

export { Graphic };
