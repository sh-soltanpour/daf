import axios, {AxiosPromise} from 'axios';
import Project from '../models/Project';
import BidRequestedResponse from '../models/BidRequestedResponse';


export default class Network {
  public static getProjects(): AxiosPromise<Project[]> {
    return axios
      .get<Project[]>("http://142.93.134.194:8000/joboonja/projects")
  }

  public static getProject(projectId: string): AxiosPromise<Project> {
    return axios
      .get<Project>(`http://localhost:8081/projects/${projectId}`)
  }

  public static bidRequested(projectId: string): AxiosPromise<BidRequestedResponse> {
    return axios
      .get<BidRequestedResponse>(`http://localhost:8081/projects/bids?projectId=${projectId}`)
  }
}