import React, { Component } from 'react';
import './home.scss';
import ProjectListItem from '../../models/ProjectListItem';
import Api from '../../api/Api';
import Hero from '../hero/Hero';
import ProjectListItemComponent from './project-item/ProjectItem';
import Sidebar from '../sidebar/Sidebar';
import {Redirect} from 'react-router';

export default class HomeComponent extends Component<Props, State> {
  onSearchProjects = (searchTerm: string): void => {
    if (searchTerm === '') {
      this.pageNumber = 0;
      this.setState({ isSearching: false, projectsList: [] });
      this.getAllProjects();
    } else {
      Api.searchProjects(searchTerm).then(response => {
        if (!response) {
          this.setState({ projectsList: [], isSearching: true });
        } else {
          this.setState({
            projectsList: response.data,
            isSearching: true
          });
        }
      });
    }
  };
  onLoadMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.pageNumber += 1;
    this.getAllProjects();
  };
  constructor(props: Props) {
    super(props);
    this.state = { projectsList: [], isSearching: false, showLoadMore: false };
  }
  componentWillMount() {
    if(this.isLoggedIn())
      this.getAllProjects();
  }

  private isLoggedIn(): boolean {
    return localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== undefined
  }
  pageSize = 5;
  pageNumber = 0;
  private getAllProjects() {
    const { projectsList } = this.state;
    Api.getAllProjects(this.pageSize, this.pageNumber).then(response => {
      if (!response) return;
      this.setState({
        projectsList: this.pageNumber === 0 ? response.data : [...projectsList, ...response.data],
        showLoadMore: response.data.length >= this.pageSize
      });
    });
  }

  render() {
    if (!this.isLoggedIn()){
      return <Redirect to={"/login"}/>
    }
    const { projectsList, isSearching, showLoadMore } = this.state;
    const projectsComponents = projectsList
      // .sort((a, b) => a.deadline - b.deadline)
      .map(p => <ProjectListItemComponent key={p.id} project={p} />);
    return (
      <div>
        <Hero onSearch={this.onSearchProjects} />
        <div id="wrapper">
          <div className="container">
            <div className="home-wrapper">
              <Sidebar />

              <section id="job-list-wrapper">
                <ul className="job-list">
                  {projectsComponents.length > 0 ? projectsComponents : <div className="job-list-empty-state">هیچ پروژه‌ای وجود ندارد</div>}
                </ul>
                {showLoadMore && !isSearching && (
                  <button className="load-more-btn" onClick={this.onLoadMore}>
                    نمایش بیشتر
                  </button>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
interface Props {}
interface State {
  projectsList: ProjectListItem[];
  isSearching: boolean;
  // readonly pageSize: number;
  // pageNumber: number;
  showLoadMore: boolean;
}
