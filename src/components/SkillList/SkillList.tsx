import React, { Component } from 'react';
import SkillItem from '../SkillItem/SkillItem';
import ProjectSkill from '../../models/ProjectSkill';
import SkillType from '../../enums/SkillType';

export default class SkillList extends Component<Props, {}> {
  static defaultProps = {
    type: SkillType.endorsed
  };

  render(): JSX.Element {
    return (
      <ul className="skills-list">
        {this.props.skills.map(skill => (
          <li key={skill.name}>
            <SkillItem name={skill.name} point={skill.point} type={this.props.type} />
          </li>
        ))}
      </ul>
    );
  }
}

interface Props {
  skills: ProjectSkill[];
  type: SkillType
}
