/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

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
