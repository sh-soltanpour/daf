import axios, { AxiosPromise } from 'axios';
import { ToastId } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BidRequestedResponse from '../models/BidRequestedResponse';
import Project from '../models/Project';
import ProjectListItem from '../models/ProjectListItem';
import ProjectSkill from '../models/ProjectSkill';
import User from '../models/User';
import UserListItem from '../models/UserListItem';
import ToastUtil from '../utils/ToastUtil';

class ApiClass {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/'
  });
  currentToastId: ToastId | undefined;
  constructor() {
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error == 'Error: Network Error') {
          ToastUtil.error('از اتصال اینترنت خود مطمئن شوید');
        } else if (error) {
        }
        // console.log(
        // 'TCL: NetworkClass -> constructor -> error',
        // error,
        // typeof error,
        // error == 'Error: Network Error',
        // JSON.stringify(error)
        // );
      }
    );
  }

  getAllUsers() {
    return this.axiosInstance.get<UserListItem[]>('/users');
  }

  getAllProjects() {
    return this.axiosInstance.get<ProjectListItem[]>('/projects');
  }

  getProject(projectId: string): AxiosPromise<Project> {
    return this.axiosInstance.get<Project>(`/projects/${projectId}`);
  }

  bidRequested(projectId: string): AxiosPromise<BidRequestedResponse> {
    return this.axiosInstance.get<BidRequestedResponse>(`/projects/bids?projectId=${projectId}`);
  }

  bidRequest(projectId: string, bidAmount: number): AxiosPromise<Project> {
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

  getUser(userId: string): AxiosPromise<User> {
    return this.axiosInstance.get<User>(`/users/${userId}`);
  }

  deleteSkill(skillName: string): AxiosPromise<ProjectSkill[]> {
    const data = { name: skillName };
    return this.axiosInstance.delete('/users/skills', { data: data });
  }

  endroseSkill(skillName: string, endorsedUserId: string): AxiosPromise<ProjectSkill[]> {
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
  getAllSkills(): AxiosPromise<ProjectSkill[]> {
    return this.axiosInstance.get<ProjectSkill[]>('/skills');
  }
  addSkill(skillName: string): AxiosPromise<ProjectSkill[]> {
    const data = { name: skillName };
    return this.axiosInstance.post<ProjectSkill[]>('/users/skills', data);
  }
}

const Api = new ApiClass();
export default Api;
