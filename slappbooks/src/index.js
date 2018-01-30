import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainComponent from './components/MainComponent'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
       <MainComponent />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
