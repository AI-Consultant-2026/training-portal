import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type EnrollmentStatus = "active" | "completed" | "dropped" | "suspended";

export interface EnrollmentAttributes {
  id: string;
  courseId: string;
  studentId: string;
  enrolledDate: Date;
  status: EnrollmentStatus;
  completionDate: Date | null;
  progressPercent: number;
  grade: string | null;
}

export type EnrollmentCreationAttributes = Optional<
  EnrollmentAttributes,
  "id" | "enrolledDate" | "status" | "completionDate" | "progressPercent" | "grade"
>;

export class Enrollment
  extends Model<EnrollmentAttributes, EnrollmentCreationAttributes>
  implements EnrollmentAttributes
{
  declare id: string;
  declare courseId: string;
  declare studentId: string;
  declare enrolledDate: Date;
  declare status: EnrollmentStatus;
  declare completionDate: Date | null;
  declare progressPercent: number;
  declare grade: string | null;
}

export function initEnrollmentModel(sequelize: Sequelize) {
  Enrollment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "course_id",
        references: { model: "courses", key: "id" },
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "student_id",
        references: { model: "users", key: "id" },
      },
      enrolledDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "enrolled_date",
      },
      status: {
        type: DataTypes.ENUM("active", "completed", "dropped", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      completionDate: { type: DataTypes.DATE, allowNull: true, field: "completion_date" },
      progressPercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "progress_percent",
      },
      grade: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "enrollments",
      underscored: true,
      timestamps: false,
    },
  );

  return Enrollment;
}
