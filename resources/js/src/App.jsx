
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'

class App extends Component {
    render () {
        return <Routes />;
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
