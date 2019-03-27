import ProjectSkill from './ProjectSkill';

export default interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  profilePictureUrl: string | undefined;
  bio: string;
  skills: ProjectSkill[];
}
