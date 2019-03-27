import ProjectListItemSkills from './ProjectListItemSkills';

export default interface ProjectListItem {
  id: string;
  title: string;
  skills: ProjectListItemSkills[];
  imageUrl: string;
  budget: number;
  description: string;
  deadline: number;
}
