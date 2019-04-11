import axios, { AxiosPromise } from 'axios';
import BidRequestedResponse from '../models/BidRequestedResponse';
import Project from '../models/Project';
import ProjectSkill from '../models/ProjectSkill';
import User from '../models/User';
import ProjectListItem from '../models/ProjectListItem';
import UserListItem from '../models/UserListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ApiClass {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/'
  });
  constructor() {
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error == 'Error: Network Error') {
          toast('fuck');
          // alert('Check your internet connection');
        }
        // console.log(
        // 'TCL: NetworkClass -> constructor -> error',
        // error,
        // typeof error,
        // error == 'Error: Network Error',
        // JSON.stringify(error)
        // );
        // handle error
        if (error.response) {
          alert(error.response.data.message);
        }
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
