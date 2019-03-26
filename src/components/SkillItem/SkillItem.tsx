import React, {Component} from 'react';
import SkillType from '../../enums/SkillType';

export default class SkillItem extends Component<Props, State> {


  endorsedClass(): string{
    return (
      this.props.type === SkillType.endorsed ? 'endorsed' : ''
    )
  }

  render(): JSX.Element {
    return (
      <div className={"skill-item " + this.endorsedClass()}>
        <span className="skill-name">{this.props.name}</span>
        <span className="skill-rating">
                    <span>{this.props.point}</span>
          {this.props.type === SkillType.deletable && <span className="remove-skill">-</span>}
          {this.props.type === SkillType.endorsable && <span className="skill-endorse">+</span>}
        </span>

      </div>
    );
  }

}

interface Props {
  name: string,
  point: number;
  type: SkillType
}

interface State {
}
