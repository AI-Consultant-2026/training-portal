import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Corporate staff portal (2026-11-10), see migration 20261110010000-create-corporate-clients.

export type CorporateClientStatus = "active" | "suspended";

export interface CorporateClientAttributes {
  id: string;
  name: string;
  country: string;
  contactName: string | null;
  contactEmail: string | null;
  joinCode: string;
  emailDomain: string | null;
  status: CorporateClientStatus;
  notes: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CorporateClient
  extends Model<
    CorporateClientAttributes,
    Optional<
      CorporateClientAttributes,
      "id" | "country" | "contactName" | "contactEmail" | "emailDomain" | "status" | "notes" | "createdAt" | "updatedAt"
    >
  >
  implements CorporateClientAttributes
{
  declare id: string;
  declare name: string;
  declare country: string;
  declare contactName: string | null;
  declare contactEmail: string | null;
  declare joinCode: string;
  declare emailDomain: string | null;
  declare status: CorporateClientStatus;
  declare notes: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export interface CorporateSeatAttributes {
  id: string;
  clientId: string;
  courseId: string;
  seats: number;
  expiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CorporateSeat
  extends Model<CorporateSeatAttributes, Optional<CorporateSeatAttributes, "id" | "expiresAt" | "createdAt" | "updatedAt">>
  implements CorporateSeatAttributes
{
  declare id: string;
  declare clientId: string;
  declare courseId: string;
  declare seats: number;
  declare expiresAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export interface CorporateMemberAttributes {
  id: string;
  clientId: string;
  userId: string;
  isManager: boolean;
  jobTitle: string | null;
  department: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CorporateMember
  extends Model<
    CorporateMemberAttributes,
    Optional<CorporateMemberAttributes, "id" | "isManager" | "jobTitle" | "department" | "createdAt" | "updatedAt">
  >
  implements CorporateMemberAttributes
{
  declare id: string;
  declare clientId: string;
  declare userId: string;
  declare isManager: boolean;
  declare jobTitle: string | null;
  declare department: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initCorporateModels(sequelize: Sequelize) {
  CorporateClient.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING(2), allowNull: false, defaultValue: "NG" },
      contactName: { type: DataTypes.STRING, allowNull: true },
      contactEmail: { type: DataTypes.STRING, allowNull: true },
      joinCode: { type: DataTypes.STRING, allowNull: false, unique: true },
      emailDomain: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, modelName: "CorporateClient", tableName: "corporate_clients", underscored: true },
  );

  CorporateSeat.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      clientId: { type: DataTypes.UUID, allowNull: false },
      courseId: { type: DataTypes.UUID, allowNull: false },
      seats: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      expiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: "CorporateSeat", tableName: "corporate_seats", underscored: true },
  );

  CorporateMember.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      clientId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false, unique: true },
      isManager: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      jobTitle: { type: DataTypes.STRING, allowNull: true },
      department: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize, modelName: "CorporateMember", tableName: "corporate_members", underscored: true },
  );
}
