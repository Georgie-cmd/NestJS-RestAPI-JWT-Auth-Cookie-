import { Column, DataType, Model, Table } from "sequelize-typescript";


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

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    refresh_token: string

    @Column({type: DataType.STRING, allowNull: false})
    refresh_token_exp: string
}