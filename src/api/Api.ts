import axios, {AxiosPromise} from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import BidRequestedResponse from '../models/BidRequestedResponse';
import Project from '../models/Project';
import ProjectListItem from '../models/ProjectListItem';
import ProjectSkill from '../models/ProjectSkill';
import User from '../models/User';
import UserListItem from '../models/UserListItem';
import ToastUtil from '../utils/ToastUtil';
import LoginResponse from '../models/LoginResponse';

class ApiClass {
  private axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/neyanboon'
    baseURL: 'http://185.166.107.141:32245/neyanboon'
  });

  constructor() {
    this.axiosInstance.interceptors.request.use(
      config => {
        if (config.url && (config.url.includes("/login") || config.url.includes("/register")))
          return config;
        config.headers["X-Auth-Token"] = localStorage.getItem("accessToken");
        return config;
      },
      error => Promise.reject(error)
    );
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error == 'Error: Network Error') {
          ToastUtil.error('از اتصال اینترنت خود مطمئن شوید');
        }
        else if (error.response.status === 403 && !error.response.data){
          localStorage.clear();
          window.location.pathname = "/login"
        }
        else if (error.response.data.message === 'Entered amount is not valid') {
          ToastUtil.error('مقدار وارد شده از سقف پروژه بیشتر است');
        } else if (error.response.data.message === 'Access Denied') {
          ToastUtil.error('شما اجازه دسترسی به این صفحه را ندارید');
        }

      }
    );
  }

  searchProjects(searchTerm: string) {
    return this.axiosInstance.get<ProjectListItem[]>('/projects/search', {params: {q: searchTerm}});
  }

  searchUsers(searchTerm: string) {
    return this.axiosInstance.get<UserListItem[]>('/users/search', {params: {q: searchTerm}});
  }

  getAllUsers() {
    return this.axiosInstance.get<UserListItem[]>('/users');
  }

  getAllProjects(pageSize: number, pageNumber: number) {
    return this.axiosInstance.get<ProjectListItem[]>('/projects', {params: {pageNumber, pageSize}});
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
    const data = {name: skillName};
    return this.axiosInstance.delete('/users/skills', {data: data});
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
    const data = {name: skillName};
    return this.axiosInstance.post<ProjectSkill[]>('/users/skills', data);
  }

  login(username: string, password: string): AxiosPromise<LoginResponse> {
    const data = {id: username, password};
    return this.axiosInstance.post<LoginResponse>('/login', data);
  }

  register(firstName: string, lastName: string, bio: string, profilePictureUrl: string, jobTitle: string, password: string,
           username: string): AxiosPromise<{}> {
    const data = {
      firstName, lastName, bio, profilePictureUrl, jobTitle, password, id: username
    };
    return this.axiosInstance.post<{}>('/register', data);
  }
}

const Api = new ApiClass();
export default Api;
