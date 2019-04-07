import React, { Component } from 'react';
import ProjectListItem from '../../models/ProjectListItem';
import { Link } from 'react-router-dom';

export default class ProjectListItemComponent extends Component<Props, State> {
  render() {
    const { budget, deadline, imageUrl, description, title, skills, id } = this.props.project;
    return (
      <li className="job-item-container">
        <Link to={`projects/${id}`}>
          <div className="job-item">
            <img className="job-item-avatar" src={imageUrl} alt="" />
            <div className="job-item-content">
              <div className="job-item-title-container">
                <h3 className="job-item-title">{title}</h3>
                <div className="job-item-date">
                  <span className="job-item-date-label">زمان باقی‌مانده:</span>
                  <span>۱۷:۲۵</span>
                </div>
              </div>
              <p className="job-item-desc">{description}</p>
              <div className="job-item-footer">
                <div className="budget-container">
                  <span className="budget-label">بودجه:</span>
                  <span className="budget-content">{budget} تومان</span>
                </div>
                <div className="skills-container">
                  <span className="skills-label">مهارت‌ها:</span>
                  <ul className="skill-list">
                    <li className="skill-item">HTML</li>
                    <li className="skill-item">CSS</li>
                    <li className="skill-item">JavaScript</li>
                    <li className="skill-item">TypeScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}
interface Props {
  project: ProjectListItem;
}
interface State {}
