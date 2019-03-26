import axios, {AxiosPromise} from 'axios';
import Project from '../models/Project';
import BidRequestedResponse from '../models/BidRequestedResponse';


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
}