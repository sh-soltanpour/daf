import axios, {AxiosPromise} from 'axios';
import Project from '../models/Project';
import BidRequestedResponse from '../models/BidRequestedResponse';
import User from '../models/User';
import ProjectSkill from '../models/ProjectSkill';


export default class Network {
  private static axiosInstance = axios.create({
    baseURL: "http://localhost:8081/"
  });

  public static getProject(projectId: string): AxiosPromise<Project> {
    return this.axiosInstance
      .get<Project>(`/projects/${projectId}`)
  }

  public static bidRequested(projectId: string): AxiosPromise<BidRequestedResponse> {
    return this.axiosInstance
      .get<BidRequestedResponse>(`/projects/bids?projectId=${projectId}`)
  }

  public static bidRequest(projectId: string, bidAmount: number): AxiosPromise<Project> {
    let data = {
      "biddingUser": {
        "id": "1"
      },
      "project": {
        "id": projectId
      },
      "bidAmount": bidAmount
    };
    return this.axiosInstance
      .post<Project>('/projects/bids', data)
  }

  public static getUser(userId: string): AxiosPromise<User> {
    return this.axiosInstance.get<User>(`/users/${userId}`)
  }

  public static deleteSkill(skillName: string): AxiosPromise<ProjectSkill[]> {
    const data = {'name': skillName};
    return this.axiosInstance.delete('/users/skills', {data: data});
  }

  public static endroseSkill(skillName: string, endorsedUserId: string): AxiosPromise<ProjectSkill[]> {
    const data = {
      "endorsedUser": {
        "id": endorsedUserId
      },
      "skill": {
        "name": skillName
      }
    };
    return this.axiosInstance.post<ProjectSkill[]>('/users/skills/endorses', data)
  }
  public static getAllSkills(): AxiosPromise<ProjectSkill[]>{
    return this.axiosInstance.get<ProjectSkill[]>('/skills')
  }
  public static addSkill(skillName: string): AxiosPromise<ProjectSkill[]>{
    const data = {"name" : skillName};
    return this.axiosInstance.post<ProjectSkill[]>('/users/skills', data);
  }
}