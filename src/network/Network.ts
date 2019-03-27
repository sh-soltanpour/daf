import axios, { AxiosPromise } from 'axios';
import BidRequestedResponse from '../models/BidRequestedResponse';
import Project from '../models/Project';
import ProjectSkill from '../models/ProjectSkill';
import User from '../models/User';
import ProjectListItem from '../models/ProjectListItem';
import UserListItem from '../models/UserListItem';

export default class Network {
  static getAllUsers() {
    return this.axiosInstance.get<UserListItem[]>('/users');
  }
  private static axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/'
  });

  static getAllProjects() {
    return this.axiosInstance.get<ProjectListItem[]>('/projects');
  }

  static getProject(projectId: string): AxiosPromise<Project> {
    return this.axiosInstance.get<Project>(`/projects/${projectId}`);
  }

  static bidRequested(projectId: string): AxiosPromise<BidRequestedResponse> {
    return this.axiosInstance.get<BidRequestedResponse>(`/projects/bids?projectId=${projectId}`);
  }

  static bidRequest(projectId: string, bidAmount: number): AxiosPromise<Project> {
    let data = {
      biddingUser: {
        id: '1'
      },
      project: {
        id: projectId
      },
      bidAmount: bidAmount
    };
    return this.axiosInstance.post<Project>('/projects/bids', data);
  }

  static getUser(userId: string): AxiosPromise<User> {
    return this.axiosInstance.get<User>(`/users/${userId}`);
  }

  static deleteSkill(skillName: string): AxiosPromise<ProjectSkill[]> {
    const data = { name: skillName };
    return this.axiosInstance.delete('/users/skills', { data: data });
  }

  static endroseSkill(skillName: string, endorsedUserId: string): AxiosPromise<ProjectSkill[]> {
    const data = {
      endorsedUser: {
        id: endorsedUserId
      },
      skill: {
        name: skillName
      }
    };
    return this.axiosInstance.post<ProjectSkill[]>('/users/skills/endorses', data);
  }
  static getAllSkills(): AxiosPromise<ProjectSkill[]> {
    return this.axiosInstance.get<ProjectSkill[]>('/skills');
  }
  static addSkill(skillName: string): AxiosPromise<ProjectSkill[]> {
    const data = { name: skillName };
    return this.axiosInstance.post<ProjectSkill[]>('/users/skills', data);
  }
}
