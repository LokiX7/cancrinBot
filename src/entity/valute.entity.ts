import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Valute' })
export class ValuteEntity {
  @PrimaryColumn()
  numCode: number;
  @Column()
  charCode: string;
  @Column()
  nominal: number;
  @Column()
  name: string;
  @Column()
  value: number;
  @Column()
  previous: number;
}
