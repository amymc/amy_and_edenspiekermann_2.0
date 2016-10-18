import React, { Component } from 'react';
import {render} from 'react-dom';
import { BrowserHistory, BrowserRouter, Match, Miss, hashHistory } from 'react-router';
// import {Router, Match, Route, hashHistory, useRouterHistory} from 'react-router';
import history from 'history';


import ImageViewer from './components/ImageViewer';


// const listenToUrl = history.listen((location, action) => {
//   // location is an object like window.location 
//   console.log('url listening', action, location.pathname, location.state)
// });

// class Home extends Component {
//     render(){
//         return (<h1>Hi</h1>);
//     }
// }

// render(
//     <Router>
//         <Route path="/" component={ImageViewer}/>
//     </Router>,
//     document.getElementById('image-viewer')
// );

const App = () => {
  return (
    <BrowserRouter history={history}>
      <div>
        <Match exactly pattern="/" component={ImageViewer} />
      </div>
    </BrowserRouter>
  )
}

//render(<Root/>, document.querySelector('#main'));

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// const App = () => {
//   return (
//     <Router history={hashHistory}>
//         <Route path="/" component={ImageViewer} />
//     </Router>
//   )
// }
 render(<App/>, document.getElementById('image-viewer'));
//render(<ImageViewer/>, document.getElementById('image-viewer'));

//import {Router, Route} from 'react-router';

// class Home extends Component {
//     render(){
//         return (<h1>Hi</h1>);
//     }
// }

// render(
//     <Router>
//         <!--Each route is defined with Route-->
//         <Route path="/" component={Home}/>
//     </Router>,
//     document.getElementById('container')
// );