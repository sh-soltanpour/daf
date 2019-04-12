import React, { Component } from 'react';
import ProjectListItem from '../../../models/ProjectListItem';
import { Link } from 'react-router-dom';
import { DateUtil } from '../../../utils/DateUtil';
import { StringUtil } from '../../../utils/StringUtil';
import './projectItem.scss';

export default class ProjectListItemComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  private deadlineRefresh = setInterval(() => {
    this.setState({ ...this.state, now: new Date() });
  }, 1000);

  componentWillUnmount() {
    clearInterval(this.deadlineRefresh);
  }

  private projectExpired(): boolean {
    return this.props.project.deadline < this.state.now.getTime();
  }

  render() {
    const { budget, deadline, imageUrl, description, title, skills, id } = this.props.project;
    return (
      <li className={`job-item-container ${this.projectExpired() ? 'ended' : ''}`}>
        <Link to={`projects/${id}`}>
          <div className="job-item">
            <img className="job-item-avatar" src={imageUrl} alt="" />
            <div className="job-item-content">
              <div className="job-item-title-container">
                <h3 className="job-item-title">{title}</h3>
                <div className="job-item-date">
                  {!this.projectExpired() ? (
                    <span>
                      <span className="job-item-date-label">زمان باقی‌مانده:</span>
                      <span>{DateUtil.dateDifference(this.state.now, new Date(deadline)).toPersianString()}</span>
                    </span>
                  ) : (
                    <span>مهلت تمام شده</span>
                  )}
                </div>
              </div>
              <p className="job-item-desc">{description}</p>
              <div className="job-item-footer">
                <div className="budget-container">
                  <span className="budget-label">بودجه:</span>
                  <span className="budget-content">{StringUtil.convertEngNumbersToPersian(budget.toString())} تومان</span>
                </div>
                <div className="skills-container">
                  <span className="skills-label">مهارت‌ها:</span>
                  <ul className="skill-list">
                    {skills.map(s => (
                      <li key={s.name} className="skill-item">
                        {s.name}
                      </li>
                    ))}
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
interface State {
  now: Date;
}
