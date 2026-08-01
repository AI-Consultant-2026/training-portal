import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type VideoCheckpointQuestionType = "multiple_choice" | "true_false";

export interface VideoCheckpointAttributes {
  id: string;
  lessonId: string;
  timestampSeconds: number;
  questionText: string;
  questionType: VideoCheckpointQuestionType;
  order: number;
  explanation: string | null;
  createdAt?: Date;
}

export type VideoCheckpointCreationAttributes = Optional<
  VideoCheckpointAttributes,
  "id" | "order" | "explanation" | "createdAt"
>;

export class VideoCheckpoint
  extends Model<VideoCheckpointAttributes, VideoCheckpointCreationAttributes>
  implements VideoCheckpointAttributes
{
  declare id: string;
  declare lessonId: string;
  declare timestampSeconds: number;
  declare questionText: string;
  declare questionType: VideoCheckpointQuestionType;
  declare order: number;
  declare explanation: string | null;
  declare readonly createdAt: Date;
}

export function initVideoCheckpointModel(sequelize: Sequelize) {
  VideoCheckpoint.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lessonId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "lesson_id",
        references: { model: "lessons", key: "id" },
      },
      timestampSeconds: { type: DataTypes.INTEGER, allowNull: false, field: "timestamp_seconds" },
      questionText: { type: DataTypes.TEXT, allowNull: false, field: "question_text" },
      questionType: {
        type: DataTypes.ENUM("multiple_choice", "true_false"),
        allowNull: false,
        field: "question_type",
      },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      explanation: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "VideoCheckpoint",
      tableName: "video_checkpoints",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );

  return VideoCheckpoint;
}
