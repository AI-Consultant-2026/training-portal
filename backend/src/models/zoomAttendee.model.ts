import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Someone who signed in on the public /Zooom-Attendees page after a Zoom session.
// `email` is stored lowercased; (email, dateAttended) is unique.
export interface ZoomAttendeeAttributes {
  id: string;
  name: string;
  email: string;
  dateAttended: string;
  status: string | null;
  phone: string | null;
  wantsUpdates: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ZoomAttendeeCreationAttributes = Optional<
  ZoomAttendeeAttributes,
  "id" | "status" | "phone" | "wantsUpdates" | "createdAt" | "updatedAt"
>;

export class ZoomAttendee
  extends Model<ZoomAttendeeAttributes, ZoomAttendeeCreationAttributes>
  implements ZoomAttendeeAttributes
{
  declare id: string;
  declare name: string;
  declare email: string;
  declare dateAttended: string;
  declare status: string | null;
  declare phone: string | null;
  declare wantsUpdates: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initZoomAttendeeModel(sequelize: Sequelize) {
  ZoomAttendee.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      dateAttended: { type: DataTypes.DATEONLY, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      wantsUpdates: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize, tableName: "zoom_attendees", underscored: true },
  );
}
