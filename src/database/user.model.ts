import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Token } from "./token.model";


@Table({tableName: 'users'})
export class User extends Model<User> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    first_name: string

    @Column({type: DataType.STRING, allowNull: false})
    last_name: string
    
    @Column({type: DataType.STRING, allowNull: false})
    company: string

    @Column({type: DataType.STRING, allowNull: false})
    company_role: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @HasOne(() => Token)
    tokenId: Token;
}