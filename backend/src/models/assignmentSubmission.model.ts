import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type AssignmentSubmissionStatus = "submitted" | "graded" | "returned";

export interface AssignmentSubmissionAttributes {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionDate: Date;
  filePath: string | null;
  submissionText: string | null;
  status: AssignmentSubmissionStatus;
  score: number | null;
  feedback: string | null;
  gradedDate: Date | null;
}

export type AssignmentSubmissionCreationAttributes = Optional<
  AssignmentSubmissionAttributes,
  "id" | "submissionDate" | "filePath" | "submissionText" | "status" | "score" | "feedback" | "gradedDate"
>;

export class AssignmentSubmission
  extends Model<AssignmentSubmissionAttributes, AssignmentSubmissionCreationAttributes>
  implements AssignmentSubmissionAttributes
{
  declare id: string;
  declare assignmentId: string;
  declare studentId: string;
  declare submissionDate: Date;
  declare filePath: string | null;
  declare submissionText: string | null;
  declare status: AssignmentSubmissionStatus;
  declare score: number | null;
  declare feedback: string | null;
  declare gradedDate: Date | null;
}

export function initAssignmentSubmissionModel(sequelize: Sequelize) {
  AssignmentSubmission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      assignmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "assignment_id",
        references: { model: "assignments", key: "id" },
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
      modelName: "AssignmentSubmission",
      tableName: "assignment_submissions",
      underscored: true,
      timestamps: false,
    },
  );

  return AssignmentSubmission;
}
