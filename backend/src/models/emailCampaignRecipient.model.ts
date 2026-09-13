import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Validation classification (invalid/duplicate) and send lifecycle (pending..failed) share
// one column on purpose -- the brief's status list ("Pending, Queued, Sending, Sent,
// Failed, Skipped, Invalid, Duplicate") is a single progression, not two separate concepts:
// a row is either not sendable (invalid/duplicate) or moves pending -> sending -> sent/failed.
// "Skipped" is a row the admin explicitly deselected before confirming send.
export type RecipientStatus =
  | "pending"
  | "queued"
  | "sending"
  | "sent"
  | "failed"
  | "skipped"
  | "invalid"
  | "duplicate";

export interface EmailCampaignRecipientAttributes {
  id: string;
  campaignId: string;
  rowNumber: number;
  company: string;
  email: string;
  contactName: string;
  subject: string;
  status: RecipientStatus;
  isSelected: boolean;
  validationErrors: string[];
  errorMessage: string | null;
  sentAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailCampaignRecipientCreationAttributes = Optional<
  EmailCampaignRecipientAttributes,
  "id" | "validationErrors" | "errorMessage" | "sentAt" | "createdAt" | "updatedAt"
>;

export class EmailCampaignRecipient
  extends Model<EmailCampaignRecipientAttributes, EmailCampaignRecipientCreationAttributes>
  implements EmailCampaignRecipientAttributes
{
  declare id: string;
  declare campaignId: string;
  declare rowNumber: number;
  declare company: string;
  declare email: string;
  declare contactName: string;
  declare subject: string;
  declare status: RecipientStatus;
  declare isSelected: boolean;
  declare validationErrors: string[];
  declare errorMessage: string | null;
  declare sentAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initEmailCampaignRecipientModel(sequelize: Sequelize) {
  EmailCampaignRecipient.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      campaignId: { type: DataTypes.UUID, allowNull: false, field: "campaign_id" },
      rowNumber: { type: DataTypes.INTEGER, allowNull: false, field: "row_number" },
      company: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      contactName: { type: DataTypes.STRING, allowNull: false, field: "contact_name" },
      subject: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      isSelected: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: "is_selected" },
      validationErrors: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
        field: "validation_errors",
      },
      errorMessage: { type: DataTypes.TEXT, allowNull: true, field: "error_message" },
      sentAt: { type: DataTypes.DATE, allowNull: true, field: "sent_at" },
    },
    {
      sequelize,
      modelName: "EmailCampaignRecipient",
      tableName: "email_campaign_recipients",
      underscored: true,
      timestamps: true,
    },
  );
  return EmailCampaignRecipient;
}
