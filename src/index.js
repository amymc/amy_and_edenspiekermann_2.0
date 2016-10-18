import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';
import ImageViewer from './components/ImageViewer';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={ImageViewer} />
      </div>
    </BrowserRouter>
  )
}

 render(<App/>, document.getElementById('image-viewer'));