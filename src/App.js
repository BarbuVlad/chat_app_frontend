import { CssBaseline, Typography, Container, createMuiTheme, MuiThemeProvider, } from '@material-ui/core';
import { amber, indigo } from '@material-ui/core/colors';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Settings from './pages/Settings';

import {Provider} from 'react-redux';
import store from './redux/configureStore';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/*  Theme overriding
see: https://material-ui.com/customization/default-theme/#default-theme*/
const theme = createMuiTheme({
  palette: {
      primary:{ main: amber[600]},
      secondary: {main: indigo[500]}, /*for color obj see https://material-ui.com/customization/color/#color 
                        using an color obj, it applies the variations automatically (dark, light)*/

      _red:{ main: "#ff8a65"},
      _green:{ main: "#9ccc65"},
      background: {
        default: '#4f4f4f'
      },
      typography: {
      //  fontFamily: '',
     // color: 'blue',
      //fontSize: 4,
      
      },
      tfColor:{
        color:'red'
    }
      
      
  },
  //typography: {}
});
/*Redux toolkit setup (for home page)*/

/*------*/
function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>

    <Switch>

      <Route exact path="/">
      <Container>

        <Login />
      </Container>
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/settings">
        <Settings />
      </Route>

      <Provider store={store}>
      <Route path="/home">
        <Home />
      </Route>
      </Provider>
      
    </Switch>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;
