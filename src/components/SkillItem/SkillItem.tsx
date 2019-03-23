import React, {Component} from 'react';

export default class SkillItem extends Component<Props, State> {

    render(): JSX.Element {
        return (
            <div className="skill-item">
                <span className="skill-name">{this.props.name}</span>
                <span className="skill-rating">
                    <span>{this.props.point}</span>
                </span>
            </div>
        );
    }

}

interface Props {
    name: string,
    point: number
}

interface State {
}