import { Switch, Route } from 'react-router-dom'
import './App.css'
import { Landing, Home, Create, Details } from './pages/'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/create" component={Create} />
                <Route path="/game/:id" component={Details} />
            </Switch>
        </div>
    )
}

export default App
