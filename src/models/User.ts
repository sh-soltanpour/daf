import ProjectSkill from './ProjectSkill';

export default class User{
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  jobTitle: string = '';
  profilePictureUrl: string = '';
  bio: string = '';
  skills: ProjectSkill[] = []
}