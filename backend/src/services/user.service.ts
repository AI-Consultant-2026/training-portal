import { User } from "../models";
import { ApiError } from "../utils/ApiError";

export function serializeUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    profileData: user.profileData,
    location: user.location,
    courseInterest: user.courseInterest,
  };
}

export async function getUserById(id: string): Promise<User> {
  const user = await User.findByPk(id);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  profileData?: Record<string, unknown>;
}

export async function updateProfile(userId: string, input: UpdateProfileInput): Promise<User> {
  const user = await getUserById(userId);

  if (input.firstName !== undefined) user.firstName = input.firstName;
  if (input.lastName !== undefined) user.lastName = input.lastName;
  if (input.profileData !== undefined) user.profileData = input.profileData;

  await user.save();
  return user;
}

export async function recordHeartbeat(userId: string): Promise<void> {
  await User.update({ lastActiveAt: new Date() }, { where: { id: userId } });
}
