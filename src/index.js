import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './views/App/App';
import reportWebVitals from './reportWebVitals';
import TimelineService from "./shared/MockTimelineService";

const globalMockTimelineService = new TimelineService();

ReactDOM.render(<App timelineService={globalMockTimelineService}/>, document.getElementById('root'));

reportWebVitals();
