import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface LessonAttributes {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  videoUrl: string | null;
  resources: Record<string, unknown>;
  order: number;
  durationMinutes: number;
  createdAt?: Date;
}

export type LessonCreationAttributes = Optional<
  LessonAttributes,
  "id" | "content" | "videoUrl" | "resources" | "order" | "durationMinutes" | "createdAt"
>;

export class Lesson extends Model<LessonAttributes, LessonCreationAttributes> implements LessonAttributes {
  declare id: string;
  declare moduleId: string;
  declare title: string;
  declare content: string;
  declare videoUrl: string | null;
  declare resources: Record<string, unknown>;
  declare order: number;
  declare durationMinutes: number;
  declare readonly createdAt: Date;
}

export function initLessonModel(sequelize: Sequelize) {
  Lesson.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      moduleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "module_id",
        references: { model: "modules", key: "id" },
      },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
      videoUrl: { type: DataTypes.STRING, allowNull: true, field: "video_url" },
      resources: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      durationMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "duration_minutes",
      },
    },
    {
      sequelize,
      modelName: "Lesson",
      tableName: "lessons",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );

  return Lesson;
}
