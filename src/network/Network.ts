import Project from 'src/models/Project';
import axios, {AxiosPromise} from 'axios';


export default class Network {
    public static getProjects(): AxiosPromise<Project[]> {
        return axios
            .get<Project[]>("http://142.93.134.194:8000/joboonja/projects")
    }
    public static getProject(projectId: string): AxiosPromise<Project> {
        return axios
            .get<Project>(`http://localhost:8081/projects/${projectId}`)
    }
}