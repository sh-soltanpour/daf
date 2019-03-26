import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router';
import Network from '../../network/Network';
import User from '../../models/User';
import '../../html-css/scss/user-main.scss';
import '../../html-css/scss/user.scss';
import SkillList from '../SkillList/SkillList';
import SkillType from '../../enums/SkillType';

export default class UserComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {user: new User()}
  }

  componentWillMount(): void {
    Network.getUser(this.props.match.params.userId)
      .then(res => {
        this.setState({...this.state, user: res.data})
      })
  }
  private isCurrentUser(): boolean {
    return this.state.user.id === this.props.currentUserId
  }

  render(): JSX.Element {
    return (
      <main>
        <section id="slider">
          <div className="slider-container container">
          </div>
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
            <SkillList skills={this.state.user.skills}
                       type={this.isCurrentUser() ? SkillType.deletable : SkillType.endorsable}
            />
          </div>
        </div>
      </main>
    )
  }
}

interface MatchParams {
  userId: string
}

interface Props extends RouteComponentProps
  <MatchParams> {
  currentUserId: string
}

interface State {
  user: User
}