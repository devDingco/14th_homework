import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  // @PrimaryGeneratedColumn("increment")
  public id!: string;

  @Column({ type: "text" })
  public writer!: string;

  @Column({ type: "text" })
  public title!: string;

  @Column({ type: "text" })
  public contents!: string;

  @Column({ type: "boolean", default: false })
  public isDeleted!: boolean;

  @Column({ type: "timestamp", default: null, nullable: true })
  deletedAt?: Date;

  // constructor(id: string, writer: string, title: string, contents: string) {
  //   super();
  //   this.id = id;
  //   this.writer = writer;
  //   this.title = title;
  //   this.contents = contents;
  // }
}
