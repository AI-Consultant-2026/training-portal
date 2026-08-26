import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface LeadAttributes {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course: string;
  university: string | null;
  source: string | null;
  welcomeEmailSentAt: Date | null;
  reminder21dSentAt: Date | null;
  reminder14dSentAt: Date | null;
  reminder7dSentAt: Date | null;
  reminder1dSentAt: Date | null;
  reminder0dSentAt: Date | null;
  recycleEmailSentAt: Date | null;
  createdAt?: Date;
}

export type LeadCreationAttributes = Optional<
  LeadAttributes,
  | "id"
  | "phone"
  | "university"
  | "source"
  | "welcomeEmailSentAt"
  | "reminder21dSentAt"
  | "reminder14dSentAt"
  | "reminder7dSentAt"
  | "reminder1dSentAt"
  | "reminder0dSentAt"
  | "recycleEmailSentAt"
  | "createdAt"
>;

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone: string | null;
  declare course: string;
  declare university: string | null;
  declare source: string | null;
  declare welcomeEmailSentAt: Date | null;
  declare reminder21dSentAt: Date | null;
  declare reminder14dSentAt: Date | null;
  declare reminder7dSentAt: Date | null;
  declare reminder1dSentAt: Date | null;
  declare reminder0dSentAt: Date | null;
  declare recycleEmailSentAt: Date | null;
  declare readonly createdAt: Date;
}

export function initLeadModel(sequelize: Sequelize) {
  Lead.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: true },
      course: { type: DataTypes.STRING, allowNull: false },
      university: { type: DataTypes.STRING, allowNull: true },
      source: { type: DataTypes.STRING, allowNull: true },
      welcomeEmailSentAt: { type: DataTypes.DATE, allowNull: true, field: "welcome_email_sent_at" },
      reminder21dSentAt: { type: DataTypes.DATE, allowNull: true, field: "reminder_21d_sent_at" },
      reminder14dSentAt: { type: DataTypes.DATE, allowNull: true, field: "reminder_14d_sent_at" },
      reminder7dSentAt: { type: DataTypes.DATE, allowNull: true, field: "reminder_7d_sent_at" },
      reminder1dSentAt: { type: DataTypes.DATE, allowNull: true, field: "reminder_1d_sent_at" },
      reminder0dSentAt: { type: DataTypes.DATE, allowNull: true, field: "reminder_0d_sent_at" },
      recycleEmailSentAt: { type: DataTypes.DATE, allowNull: true, field: "recycle_email_sent_at" },
    },
    {
      sequelize,
      modelName: "Lead",
      tableName: "leads",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );
  return Lead;
}
