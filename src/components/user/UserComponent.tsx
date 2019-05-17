import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router';
import Api from '../../api/Api';
import User from '../../models/User';
import SkillType from '../../enums/SkillType';
import ProjectSkill from '../../models/ProjectSkill';
import './user.scss';
import SkillSelector from '../skillSelector/SkillSelector';
import SkillList from '../skillList/SkillList';

export default class UserComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {user: new User(), allSkills: []};
  }

  componentWillMount(): void {
    if (!this.isLoggedIn())
      return;
    const userId = this.isCurrentUser() ? this.getCurrentUserId() : this.props.match.params.userId;
    Api.getUser(userId).then(res => {
      if (res) this.setState({...this.state, user: res.data});
    });
    if (this.isCurrentUser()) {
      Api.getAllSkills().then(res => res && this.setState({...this.state, allSkills: res.data}));
    }
  }

  private isCurrentUser(): boolean {
    return this.props.location.pathname.includes('profile')
      || this.props.match.params.userId === this.getCurrentUserId();
  }

  private getCurrentUserId(): string {
    let id = localStorage.getItem("userId");
    if (id === null)
      return "";
    return id;
  }

  private deleteSkill = (skillName: string) => {
    Api.deleteSkill(skillName).then(res => {
      this.updateUserSkills(res.data);
    });
  };

  private endorseSkill = (skillName: string) => {
    Api.endroseSkill(skillName, this.state.user.id).then(res => {
      if (res) {
        this.updateUserSkills(res.data);
        const user = this.state.user;
        const skill = user.skills.find(skill => skill.name === skillName);
        if (skill) skill.endorsed = true;
        this.setState({...this.state, user});
      }
    });
  };
  private updateUserSkills = (newSkills: ProjectSkill[]) => {
    let user = {...this.state.user};
    user.skills = newSkills;
    this.setState({...this.state, user});
  };
  private getOtherSkills = (): ProjectSkill[] => {
    return this.state.allSkills.filter(skill => this.state.user.skills.filter(userSkill => userSkill.name === skill.name).length === 0);
  };

  private addSkill = (skillName: string) => {
    Api.addSkill(skillName).then(res => this.updateUserSkills(res.data));
  };

  private isLoggedIn(): boolean {
    return localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== undefined
  }

  render(): JSX.Element {
    if (!this.isLoggedIn()) {
      return <Redirect to={"/login"}/>
    }
    return (
      <main>
        <section id="slider">
          <div className="slider-container container"/>
        </section>

        <div id="wrapper" className="container">
          <div className="user-header-wrapper">
            <div className="user-header-container">
              <div className="user-avatar">
                <img src={this.state.user.profilePictureUrl} alt=""/>
              </div>
              <div className="user-content">
                <h3 className="user-name">{this.state.user.firstName + ' ' + this.state.user.lastName}</h3>
                <span className="user-nickname">{this.state.user.jobTitle}</span>
              </div>
            </div>
          </div>

          <div className="user-description">
            <p>{this.state.user.bio}</p>
          </div>

          <div className="user-skills">
            {this.isCurrentUser() && <SkillSelector onSubmit={this.addSkill} skills={this.getOtherSkills()}/>}
            <SkillList
              skills={this.state.user.skills}
              type={this.isCurrentUser() ? SkillType.deletable : SkillType.endorsable}
              onDelete={this.deleteSkill}
              onEndorse={this.endorseSkill}
            />
          </div>
        </div>
      </main>
    );
  }
}

interface MatchParams {
  userId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUserId: string;
}

interface State {
  user: User;
  allSkills: ProjectSkill[];
}
