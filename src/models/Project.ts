import ProjectSkill from 'src/models/ProjectSkill';

export default class Project {
    id: string = '';
    title: string = '';
    skills: ProjectSkill[] = [];
    imageUrl: string = '';
    budget: number = 0;
    description: string = ""

}