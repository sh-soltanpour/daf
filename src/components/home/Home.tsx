import React, { Component } from 'react';
import ProjectListItem from '../../models/ProjectListItem';
import Api from '../../api/Api';
import Hero from './Hero';
import ProjectListItemComponent from './JobItem';
import Sidebar from './Sidebar';
import '../../html-css/scss/style.scss';
import { StringUtil } from '../../utils/StringUtil';

export default class HomeComponent extends Component<Props, State> {
  onSearchProjects = (searchInput: string): void => {
    const { projectsListCache } = this.state;
    this.setState({ projectsList: StringUtil.searchStringInArray(projectsListCache, searchInput, x => x.title) });
  };
  constructor(props: Props) {
    super(props);
    this.state = { projectsList: [], projectsListCache: [] };
  }
  componentWillMount() {
    Api.getAllProjects().then(response => {
      if (!response) return;
      this.setState({ projectsListCache: response.data });
      this.onSearchProjects('');
    });
  }
  render() {
    const { projectsList } = this.state;
    const projectsComponents = projectsList.map(p => <ProjectListItemComponent key={p.id} project={p} />);
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
  projectsListCache: ProjectListItem[];
}
