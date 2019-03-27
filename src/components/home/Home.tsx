import React, { Component } from 'react';
import ProjectListItem from '../../models/ProjectListItem';
import Network from '../../network/Network';
import Hero from './Hero';
import ProjectListItemComponent from './JobItem';
import Sidebar from './Sidebar';

export default class HomeComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { projectsList: [] };
  }
  componentWillMount() {
    Network.getAllProjects().then(response => {
      this.setState({ projectsList: response.data });
    });
  }
  render() {
    const { projectsList } = this.state;
    const projectsComponents = projectsList.map(p => <ProjectListItemComponent key={p.id} project={p} />);
    return (
      <div>
        <Hero />
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
}
