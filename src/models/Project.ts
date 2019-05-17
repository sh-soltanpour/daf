import ProjectSkill from './ProjectSkill';
import User from './User';

export default class Project {
  id: string = '';
  title: string = '';
  skills: ProjectSkill[] = [];
  imageUrl: string = '';
  budget: number = 0;
  description: string = '';
  deadline: number = 0;
  winner: User | null = null
}
