import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router';
import './project.scss';
import Project from '../../models/Project';
import Api from '../../api/Api';
import {DateUtil} from '../../utils/DateUtil';
import SkillList from '../skillList/SkillList';
import {StringUtil} from '../../utils/StringUtil';
import SkillType from '../../enums/SkillType';
import ToastUtil from '../../utils/ToastUtil';

export default class ProjectComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      project: new Project(),
      now: new Date(),
      bidRequested: false,
      bidAmount: 0
    };
  }

  private deadlineRefresh = setInterval(() => {
    this.setState({...this.state, now: new Date()});
  }, 1000);

  componentWillMount() {
    if (!this.isLoggedIn())
      return;
    const projectId = this.props.match.params.projectId;
    Api.getProject(this.props.match.params.projectId).then(res => {
      this.setState({...this.state, project: res.data});
    })
      .catch(res => {

      })
    ;

    Api.bidRequested(projectId).then(res => {
      this.setState({...this.state, bidRequested: res.data.bidRequested});
    });
  }

  private projectExpired(): boolean {
    return this.state.project.deadline < this.state.now.getTime();
  }

  componentWillUnmount() {
    clearInterval(this.deadlineRefresh);
  }

  projectDeadline(): JSX.Element {
    if (!this.projectExpired()) {
      return (
        <li className="project-deadline">
          <i className="flaticon-deadline"/>
          <span className="ml-2 font-weight-bold">زمان باقی‌مانده:</span>
          <span>{DateUtil.dateDifference(this.state.now, new Date(this.state.project.deadline)).toPersianString()}</span>
        </li>
      );
    } else {
      return (
        <li className="project-deadline ended">
          <i className="flaticon-deadline"/>
          <span className="font-weight-bold">مهلت تمام شده</span>
        </li>
      );
    }
  }

  private changeBidAmount = (event: React.FormEvent<HTMLInputElement>) => {
    let newBidAmount = parseInt(event.currentTarget.value);
    this.setState({...this.state, bidAmount: newBidAmount});
  };
  private sendBidRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.bidAmount === 0) {
      ToastUtil.error('مقدار وارد شده صحیح نیست');
      return
    }
    Api.bidRequest(this.state.project.id, this.state.bidAmount).then(res => {
        if (res)
          this.setState({...this.state, bidRequested: true, project: res.data})
      }
    );
  };

  projectForm(): JSX.Element {
    if (this.projectExpired()) {
      return (
        <div className="deadline-reached">
          <i className="flaticon-danger ml-2"/>
          <span>مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!</span>
        </div>
      );
    } else if (this.state.bidRequested) {
      return (
        <div className="already-bid">
          <i className="flaticon-check-mark ml-2"/>
          <span>پیشنهاد شما ثبت شده است</span>
        </div>
      );
    } else {
      return (
        <div>
          <h4>ثبت پیشنهاد</h4>
          <form onSubmit={this.sendBidRequest} className="bid-form">
            <div className="input-wrapper">
              <input type="number" onChange={this.changeBidAmount}
                     placeholder="پیشنهاد خود را وارد کنید"/>
              <span className="bid-label">تومان</span>
            </div>
            <button type="submit">ارسال</button>
          </form>
        </div>
      );
    }
  }
  private isLoggedIn(): boolean {
    return localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== undefined
  }
  render(): JSX.Element {
    if (!this.isLoggedIn()){
      return <Redirect to={"/login"}/>
    }
    const {budget, title, imageUrl, description, skills, deadline} = this.state.project;
    return (
      <div>
        <section id="slider">
          <div className="slider-container container"/>
        </section>
        <div id="wrapper" className="container">
          <div className="project-container">
            <div className="d-flex">
              <div className="project-avatar">
                <img src={imageUrl} alt="Project Image"/>
              </div>
              <div className="project-content">
                <h3 className="project-name">{title}</h3>
                <ul className="project-info">
                  {this.projectDeadline()}
                  <li className="project-budget">
                    <i className="flaticon-money-bag-1"/>
                    <span className="ml-2">بودجه:</span>
                    <span>{StringUtil.convertEngNumbersToPersian(budget.toString())} تومان</span>
                  </li>
                  {this.projectExpired() &&
                  <li className="won-user">
                      <i className="flaticon-check-mark"/>
                      <span className="ml-2">برنده:</span>
                      <span>{this.getWinnerName()}</span>
                  </li>
                  }
                </ul>
                <div className="project-description">
                  <h4>توضیحات</h4>
                  <p>{description}</p>
                </div>
              </div>
            </div>
            <div className="project-skills">
              <h4>مهارت‌های لازم:</h4>
              <SkillList type={SkillType.simple} skills={skills}/>
            </div>
            <div className="project-form">{this.projectForm()}</div>
          </div>
        </div>
      </div>
    );
  }

  private getWinnerName(): string {
    if (this.state.project.winner) {
      return this.state.project.winner.firstName + ' ' + this.state.project.winner.lastName;
    }
    return 'برنده ندارد';
  }
}

interface MatchParams {
  projectId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
  project: Project;
  now: Date;
  bidRequested: boolean;
  bidAmount: number;
}
