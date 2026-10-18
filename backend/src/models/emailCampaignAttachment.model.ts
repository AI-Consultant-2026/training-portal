import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// A file sent with every email in a campaign (2026-10-18), e.g. a signed partnership letter.
// `data` is the file itself; it is excluded from every API response (see
// emailCampaign.service.ts ATTACHMENT_META) and only read when emails are actually sent.
export interface EmailCampaignAttachmentAttributes {
  id: string;
  campaignId: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  data: Buffer;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailCampaignAttachmentCreationAttributes = Optional<
  EmailCampaignAttachmentAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class EmailCampaignAttachment
  extends Model<EmailCampaignAttachmentAttributes, EmailCampaignAttachmentCreationAttributes>
  implements EmailCampaignAttachmentAttributes
{
  declare id: string;
  declare campaignId: string;
  declare filename: string;
  declare contentType: string;
  declare sizeBytes: number;
  declare data: Buffer;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initEmailCampaignAttachmentModel(sequelize: Sequelize) {
  EmailCampaignAttachment.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      campaignId: { type: DataTypes.UUID, allowNull: false, field: "campaign_id" },
      filename: { type: DataTypes.STRING, allowNull: false },
      contentType: { type: DataTypes.STRING, allowNull: false, field: "content_type" },
      sizeBytes: { type: DataTypes.INTEGER, allowNull: false, field: "size_bytes" },
      data: { type: DataTypes.BLOB, allowNull: false },
    },
    {
      sequelize,
      modelName: "EmailCampaignAttachment",
      tableName: "email_campaign_attachments",
      underscored: true,
      timestamps: true,
    },
  );
  return EmailCampaignAttachment;
}
