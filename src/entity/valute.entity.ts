import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Valute' })
export class ValuteEntity {
  @PrimaryColumn()
  numCode: number;
  @Column({ unique: true })
  charCode: string;
  @Column()
  nominal: number;
  @Column()
  name: string;
  @Column('numeric', { scale: 2 })
  value: number;
  @Column('numeric', { scale: 2 })
  previous: number;
}
