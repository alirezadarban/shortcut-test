import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  url: string;
}
