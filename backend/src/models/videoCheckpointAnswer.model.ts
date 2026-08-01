import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface VideoCheckpointAnswerAttributes {
  id: string;
  checkpointId: string;
  answerText: string;
  isCorrect: boolean;
  order: number;
}

export type VideoCheckpointAnswerCreationAttributes = Optional<
  VideoCheckpointAnswerAttributes,
  "id" | "isCorrect" | "order"
>;

export class VideoCheckpointAnswer
  extends Model<VideoCheckpointAnswerAttributes, VideoCheckpointAnswerCreationAttributes>
  implements VideoCheckpointAnswerAttributes
{
  declare id: string;
  declare checkpointId: string;
  declare answerText: string;
  declare isCorrect: boolean;
  declare order: number;
}

export function initVideoCheckpointAnswerModel(sequelize: Sequelize) {
  VideoCheckpointAnswer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      checkpointId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "checkpoint_id",
        references: { model: "video_checkpoints", key: "id" },
      },
      answerText: { type: DataTypes.STRING, allowNull: false, field: "answer_text" },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_correct",
      },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "VideoCheckpointAnswer",
      tableName: "video_checkpoint_answers",
      underscored: true,
      timestamps: false,
    },
  );

  return VideoCheckpointAnswer;
}
