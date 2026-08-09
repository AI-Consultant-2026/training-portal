import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type UserRole = "student" | "instructor" | "admin";
export type UserStatus = "active" | "inactive" | "suspended";

export interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  profileData: Record<string, unknown>;
  location: string;
  courseInterest: string | null;
  lastActiveAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  | "id"
  | "role"
  | "status"
  | "profileData"
  | "location"
  | "courseInterest"
  | "lastActiveAt"
  | "createdAt"
  | "updatedAt"
>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare firstName: string;
  declare lastName: string;
  declare role: UserRole;
  declare status: UserStatus;
  declare profileData: Record<string, unknown>;
  declare location: string;
  declare courseInterest: string | null;
  declare lastActiveAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password_hash",
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      role: {
        type: DataTypes.ENUM("student", "instructor", "admin"),
        allowNull: false,
        defaultValue: "student",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      profileData: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        field: "profile_data",
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Nigeria",
      },
      courseInterest: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "course_interest",
      },
      lastActiveAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_active_at",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    },
  );

  return User;
}
