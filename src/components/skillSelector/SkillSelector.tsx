import React, { Component } from 'react';
import ProjectSkill from '../../models/ProjectSkill';
import './skillSelector.scss';

export default class SkillSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selectedSkill: '' };
  }

  private onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ selectedSkill: event.currentTarget.value });
  };

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.selectedSkill !== '') this.props.onSubmit(this.state.selectedSkill);
  };

  render(): JSX.Element {
    return (
      <div className="d-flex align-items-center mb-3">
        <h4 className="ml-3">مهارت‌ها:</h4>
        <div className="add-skill-form-container">
          <form onSubmit={this.onSubmit} className="add-skill-form">
            <select onChange={this.onChange} className="add-skill-input" name="" placeholder="انتخاب مهارت">
              <option value="">-- انتخاب مهارت --</option>
              {this.props.skills.map(skill => {
                return (
                  <option key={skill.name} value={skill.name}>
                    {skill.name}
                  </option>
                );
              })}
            </select>
            <button type="submit">افزودن مهارت</button>
          </form>
        </div>
      </div>
    );
  }
}

interface Props {
  skills: ProjectSkill[];
  onSubmit: (skillName: string) => void;
}

interface State {
  selectedSkill: string;
}
