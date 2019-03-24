import React, { Component } from 'react';
import ProjectSkill from 'src/models/ProjectSkill';
import SkillItem from '../SkillItem/SkillItem';

export default class SkillList extends Component<Props, {}> {
  // <ul className="skills-list">
  // <li className="skill-item">
  // <span className="skill-name">HTML</span>
  // <span className="skill-rating">
  // <span>5</span>
  // </span>
  // </li>
  render(): JSX.Element {
    return (
      <ul className="skills-list">
        {this.props.skills.map(skill => (
          <li key={skill.name}>
            <SkillItem name={skill.name} point={skill.point} />
          </li>
        ))}
      </ul>
    );
  }
}

interface Props {
  skills: ProjectSkill[];
}
