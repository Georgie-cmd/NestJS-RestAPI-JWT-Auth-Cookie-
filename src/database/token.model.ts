import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";


@Table({tableName: 'tokens'})
export class Token extends Model<Token> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    refresh_token: string

    @Column({type: DataType.STRING, allowNull: true})
    refresh_token_exp: string

    @ForeignKey(() => User)
    userId: number
   
    @BelongsTo(() => User)
    user: User
}