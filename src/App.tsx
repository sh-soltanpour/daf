import React, {Component} from 'react';
import './App.css';
import ProjectComponent from './components/project/ProjectComponent';

class App extends Component<Props, State> {
    changeTitle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = event => {
        this.setState({title: 'new title'});
    };


    constructor(props: Props) {
        super(props);

        this.state = {
            title: 'welkfj'
        };
    }

    render() {
        return (
            <ProjectComponent/>
        );
    }

}

export default App;

interface Props {
}

interface State {
    title: string;
}
