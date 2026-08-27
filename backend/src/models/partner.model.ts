import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface PartnerAttributes {
  id: string;
  name: string;
  category: string;
  sector: string | null;
  url: string | null;
  contact: string | null;
  cost: string | null;
  status: string;
  lastContacted: string | null;
  renewalDate: string | null;
  notes: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PartnerCreationAttributes = Optional<
  PartnerAttributes,
  | "id"
  | "sector"
  | "url"
  | "contact"
  | "cost"
  | "status"
  | "lastContacted"
  | "renewalDate"
  | "notes"
  | "createdAt"
  | "updatedAt"
>;

export class Partner
  extends Model<PartnerAttributes, PartnerCreationAttributes>
  implements PartnerAttributes
{
  declare id: string;
  declare name: string;
  declare category: string;
  declare sector: string | null;
  declare url: string | null;
  declare contact: string | null;
  declare cost: string | null;
  declare status: string;
  declare lastContacted: string | null;
  declare renewalDate: string | null;
  declare notes: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initPartnerModel(sequelize: Sequelize) {
  Partner.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      sector: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: true },
      contact: { type: DataTypes.STRING, allowNull: true },
      cost: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "not-started" },
      lastContacted: { type: DataTypes.DATEONLY, allowNull: true, field: "last_contacted" },
      renewalDate: { type: DataTypes.DATEONLY, allowNull: true, field: "renewal_date" },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "Partner",
      tableName: "partners",
      underscored: true,
      timestamps: true,
    },
  );
  return Partner;
}
