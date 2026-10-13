import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// A message on the /refer/me notice board, posted by an admin from /admin/notices.
// Ambassadors only see notices whose expiresAt is empty or still in the future.
export interface AmbassadorNoticeAttributes {
  id: string;
  title: string;
  body: string;
  linkUrl: string | null;
  linkLabel: string | null;
  expiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AmbassadorNoticeCreationAttributes = Optional<
  AmbassadorNoticeAttributes,
  "id" | "linkUrl" | "linkLabel" | "expiresAt" | "createdAt" | "updatedAt"
>;

export class AmbassadorNotice
  extends Model<AmbassadorNoticeAttributes, AmbassadorNoticeCreationAttributes>
  implements AmbassadorNoticeAttributes
{
  declare id: string;
  declare title: string;
  declare body: string;
  declare linkUrl: string | null;
  declare linkLabel: string | null;
  declare expiresAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initAmbassadorNoticeModel(sequelize: Sequelize) {
  AmbassadorNotice.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      linkUrl: { type: DataTypes.STRING, allowNull: true },
      linkLabel: { type: DataTypes.STRING, allowNull: true },
      expiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, tableName: "ambassador_notices", underscored: true },
  );
}
