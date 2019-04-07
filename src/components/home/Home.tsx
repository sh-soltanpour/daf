import React, { Component } from 'react';
import ProjectListItem from '../../models/ProjectListItem';
import Network from '../../network/Network';
import Hero from './Hero';
import ProjectListItemComponent from './JobItem';
import Sidebar from './Sidebar';
import '../../html-css/scss/style.scss';
import { SearchUtil } from '../../utils/SearchUtil';

export default class HomeComponent extends Component<Props, State> {
  onSearchProjects = (searchInput: string): void => {
    const { projectsListCache } = this.state;
    this.setState({ projectsList: SearchUtil.searchStringInArray(projectsListCache, searchInput, x => x.title) });
  };
  constructor(props: Props) {
    super(props);
    this.state = { projectsList: [], projectsListCache: [] };
  }
  componentWillMount() {
    Network.getAllProjects().then(response => {
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
        <div id="wrapper" className="container">
          <Sidebar />

          <section id="job-list-wrapper">
            <ul className="job-list">{projectsComponents}</ul>
          </section>
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
