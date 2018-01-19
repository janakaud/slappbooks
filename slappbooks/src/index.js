import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainComponent from './components/MainComponent'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainComponent />, document.getElementById('root'));
registerServiceWorker();
