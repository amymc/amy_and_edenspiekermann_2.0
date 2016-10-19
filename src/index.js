import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';
import ImageViewer from './components/ImageViewer';
import './styles/utilities/reset.css';
import './styles/base/main.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/build/" component={ImageViewer} />
      </div>
    </BrowserRouter>
  )
}

 render(<App/>, document.getElementById('js-image-viewer'));