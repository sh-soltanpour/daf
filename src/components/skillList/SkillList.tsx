import React, { Component } from 'react';
import SkillType from '../../enums/SkillType';
import ProjectSkill from '../../models/ProjectSkill';
import './skillList.scss';
import SkillItem from '../skillItem/SkillItem';

export default class SkillList extends Component<Props, {}> {
  static defaultProps = {
    type: SkillType.endorsed,
    onDelete: (skillName: string) => {},
    onEndorse: (skillName: string) => {}
  };

  private getSkillType(skill: ProjectSkill): SkillType {
    if (this.props.type === SkillType.deletable || this.props.type === SkillType.simple) return this.props.type;
    return skill.endorsed ? SkillType.endorsed : SkillType.endorsable;
  }

  private getOnClick(skill: ProjectSkill): (skillName: string) => void {
    switch (this.getSkillType(skill)) {
      case SkillType.deletable:
        return this.props.onDelete;
      case SkillType.endorsable:
        return this.props.onEndorse;
      default:
        return (skillName: string) => {};
    }
  }

  render(): JSX.Element {
    return (
      <ul className="skills-list">
        {this.props.skills.map(skill => (
          <li key={skill.name}>
            <SkillItem name={skill.name} point={skill.point} type={this.getSkillType(skill)} onClick={this.getOnClick(skill)} />
          </li>
        ))}
      </ul>
    );
  }
}

interface Props {
  skills: ProjectSkill[];
  type: SkillType;
  onEndorse: (skillName: string) => void;
  onDelete: (skillName: string) => void;
}
