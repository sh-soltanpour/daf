import React, {Component} from 'react';
import './App.css';
import ProjectComponent from './components/project/ProjectComponent';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


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
            <Router>
                <Route path="/projects/:projectId" component={ProjectComponent}/>
            </Router>
        );
    }

}

export default App;

interface Props {
}

interface State {
    title: string;
}
