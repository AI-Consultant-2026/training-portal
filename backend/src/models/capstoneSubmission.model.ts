import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type CapstoneSubmissionStatus = "submitted" | "graded" | "returned";

export interface CapstoneSubmissionAttributes {
  id: string;
  capstoneId: string;
  studentId: string;
  submissionDate: Date;
  filePath: string | null;
  submissionText: string | null;
  status: CapstoneSubmissionStatus;
  score: number | null;
  feedback: string | null;
  gradedDate: Date | null;
}

export type CapstoneSubmissionCreationAttributes = Optional<
  CapstoneSubmissionAttributes,
  "id" | "submissionDate" | "filePath" | "submissionText" | "status" | "score" | "feedback" | "gradedDate"
>;

export class CapstoneSubmission
  extends Model<CapstoneSubmissionAttributes, CapstoneSubmissionCreationAttributes>
  implements CapstoneSubmissionAttributes
{
  declare id: string;
  declare capstoneId: string;
  declare studentId: string;
  declare submissionDate: Date;
  declare filePath: string | null;
  declare submissionText: string | null;
  declare status: CapstoneSubmissionStatus;
  declare score: number | null;
  declare feedback: string | null;
  declare gradedDate: Date | null;
}

export function initCapstoneSubmissionModel(sequelize: Sequelize) {
  CapstoneSubmission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      capstoneId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "capstone_id",
        references: { model: "capstones", key: "id" },
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "student_id",
        references: { model: "users", key: "id" },
      },
      submissionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "submission_date",
      },
      filePath: { type: DataTypes.STRING, allowNull: true, field: "file_path" },
      submissionText: { type: DataTypes.TEXT, allowNull: true, field: "submission_text" },
      status: {
        type: DataTypes.ENUM("submitted", "graded", "returned"),
        allowNull: false,
        defaultValue: "submitted",
      },
      score: { type: DataTypes.INTEGER, allowNull: true },
      feedback: { type: DataTypes.TEXT, allowNull: true },
      gradedDate: { type: DataTypes.DATE, allowNull: true, field: "graded_date" },
    },
    {
      sequelize,
      modelName: "CapstoneSubmission",
      tableName: "capstone_submissions",
      underscored: true,
      timestamps: false,
    },
  );

  return CapstoneSubmission;
}
