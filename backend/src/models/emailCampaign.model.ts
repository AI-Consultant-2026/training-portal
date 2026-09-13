import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { EmailCampaignRecipient } from "./emailCampaignRecipient.model";
import { User } from "./user.model";

// Only these two are approved sender identities (Data & settings has no UI to add more --
// see emailCampaigns.validators.ts, which is the actual enforcement point). Displaying
// these two addresses does not by itself mean the SMTP provider has authorised them as
// sender identities -- see backend/README/deployment notes for what must be confirmed
// provider-side (SPF/DKIM/verified sender) before a campaign is sent for real.
export const CAMPAIGN_FROM_ADDRESSES = ["hello@paleontraining.com", "corporate@paleontraining.com"] as const;
export type CampaignFromAddress = (typeof CAMPAIGN_FROM_ADDRESSES)[number];

export type CampaignStatus = "draft" | "sending" | "completed";

export interface EmailCampaignAttributes {
  id: string;
  createdBy: string;
  fromEmail: CampaignFromAddress | null;
  bodyTemplate: string | null;
  status: CampaignStatus;
  originalFilename: string;
  totalRecipients: number;
  validRecipients: number;
  invalidRecipients: number;
  duplicateRecipients: number;
  sentCount: number;
  failedCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailCampaignCreationAttributes = Optional<
  EmailCampaignAttributes,
  | "id"
  | "fromEmail"
  | "bodyTemplate"
  | "status"
  | "sentCount"
  | "failedCount"
  | "createdAt"
  | "updatedAt"
>;

export class EmailCampaign
  extends Model<EmailCampaignAttributes, EmailCampaignCreationAttributes>
  implements EmailCampaignAttributes
{
  declare id: string;
  declare createdBy: string;
  declare fromEmail: CampaignFromAddress | null;
  declare bodyTemplate: string | null;
  declare status: CampaignStatus;
  declare originalFilename: string;
  declare totalRecipients: number;
  declare validRecipients: number;
  declare invalidRecipients: number;
  declare duplicateRecipients: number;
  declare sentCount: number;
  declare failedCount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Populated only when the query explicitly `include`s them (see
  // emailCampaign.service.ts) -- not real columns on this model.
  declare recipients?: EmailCampaignRecipient[];
  declare creator?: User;
}

export function initEmailCampaignModel(sequelize: Sequelize) {
  EmailCampaign.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      createdBy: { type: DataTypes.UUID, allowNull: false, field: "created_by" },
      fromEmail: { type: DataTypes.STRING, allowNull: true, field: "from_email" },
      bodyTemplate: { type: DataTypes.TEXT, allowNull: true, field: "body_template" },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "draft" },
      originalFilename: { type: DataTypes.STRING, allowNull: false, field: "original_filename" },
      totalRecipients: { type: DataTypes.INTEGER, allowNull: false, field: "total_recipients" },
      validRecipients: { type: DataTypes.INTEGER, allowNull: false, field: "valid_recipients" },
      invalidRecipients: { type: DataTypes.INTEGER, allowNull: false, field: "invalid_recipients" },
      duplicateRecipients: { type: DataTypes.INTEGER, allowNull: false, field: "duplicate_recipients" },
      sentCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: "sent_count" },
      failedCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: "failed_count" },
    },
    {
      sequelize,
      modelName: "EmailCampaign",
      tableName: "email_campaigns",
      underscored: true,
      timestamps: true,
    },
  );
  return EmailCampaign;
}
