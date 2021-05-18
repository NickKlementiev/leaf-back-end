import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Graphic } from './Graphic';

@Entity('graphicsdata')
class GraphicsData {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    uv: number;

    @Column()
    pv: number;

    @Column()
    amt: number;

    @Column()
    graphicId: number;

    @ManyToOne(() => Graphic)
    @JoinColumn({ name: 'id' })
    graphic: Graphic;
}

export { GraphicsData };
