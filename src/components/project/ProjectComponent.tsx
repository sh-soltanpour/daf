import React, {Component} from 'react';
import '../../html-css/scss/project.css';
import ProjectSkill from '../../models/ProjectSkill';
import SkillList from '../SkillList/SkillList';
import Network from '../../network/Network';
import Project from '../../models/Project';
import {RouteComponentProps} from 'react-router';
import DateUtil from '../../utils/DateUtil';

export default class ProjectComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {project: new Project(), now: new Date()}
    }
    private deadlineRefresh: NodeJS.Timeout =
        setInterval( ()=>{this.setState({...this.state, now: new Date()})}, 1000);


    componentWillMount(): void {
        Network
            .getProject(this.props.match.params.projectId)
            .then(res => {
                    res.data.deadline = 1555718400000;
                    this.setState({...this.state, project: res.data});
                }
            )
    }
    componentWillUnmount(): void {
        clearInterval(this.deadlineRefresh)
    }

    projectDeadline(): JSX.Element {
        if (this.state.project.deadline > this.state.now.getTime()) {
            return (
                <li className="project-deadline">
                    <i className="flaticon-deadline"></i>
                    <span className="ml-2 font-weight-bold">زمان باقی‌مانده:</span>
                    <span>{DateUtil.dateDifference(this.state.now, new Date(this.state.project.deadline)).toPersianString()}</span>
                </li>
            )
        } else {
            return (
                <li className="project-deadline ended">
                    <i className="flaticon-deadline"></i>
                    <span className="font-weight-bold">مهلت تمام شده</span>
                </li>
            )
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <section id="slider">
                    <div className="slider-container container">
                    </div>
                </section>
                <div id="wrapper" className="container">

                    <div className="project-container">
                        <div className="d-flex">
                            <div className="project-avatar">
                                <img src={this.state.project.imageUrl} alt=""/>
                            </div>
                            <div className="project-content">
                                <h3 className="project-name">{this.state.project.title}</h3>
                                <ul className="project-info">
                                    {this.projectDeadline()}
                                    <li className="project-budget">
                                        <i className="flaticon-money-bag-1"></i>
                                        <span className="ml-2">بودجه:</span>
                                        <span>{this.state.project.budget} تومان</span>
                                    </li>
                                    <li className="won-user">
                                        <i className="flaticon-check-mark"></i>
                                        <span className="ml-2">برنده:</span>
                                        <span>وحید محمدی</span>
                                    </li>
                                </ul>
                                <div className="project-description">
                                    <h4>توضیحات</h4>
                                    <p>{this.state.project.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="project-skills">
                            <h4>مهارت‌های لازم:</h4>
                            <SkillList skills={this.state.project.skills}/>
                        </div>
                        <div className="project-form">
                            <div className="deadline-reached">
                                <i className="flaticon-danger ml-2"></i>
                                <span>مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface MatchParams {
    projectId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    project: Project
    now: Date
}