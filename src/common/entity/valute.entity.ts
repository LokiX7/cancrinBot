import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Valute' })
export class ValuteEntity {
  @PrimaryColumn()
  charCode: string;
  @Column({ unique: true })
  numCode: string;
  @Column()
  nominal: number;
  @Column()
  name: string;
  @Column('numeric', { scale: 2 })
  value: number;
  @Column('numeric', { scale: 2 })
  previous: number;
}
