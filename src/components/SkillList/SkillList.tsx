import React, {Component} from 'react';
import SkillItem from '../SkillItem/SkillItem';
import ProjectSkill from '../../models/ProjectSkill';
import SkillType from '../../enums/SkillType';

export default class SkillList extends Component<Props, {}> {
  static defaultProps = {
    type: SkillType.endorsed
  };

  private getSkillType(skill: ProjectSkill): SkillType {
    if (this.props.type === SkillType.deletable || this.props.type === SkillType.simple)
      return this.props.type;
    return skill.endorsed ? SkillType.endorsed : SkillType.endorsable;
  }

  render(): JSX.Element {
    return (
      <ul className="skills-list">
        {this.props.skills.map(skill => (
          <li key={skill.name}>
            <SkillItem name={skill.name} point={skill.point}
                       type={this.getSkillType(skill)}/>
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
