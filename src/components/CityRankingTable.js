import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ReactGA from 'react-ga';

import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import withStyles from '@material-ui/core/styles/withStyles';

import data from '../data/data';
import '../App.css';


const styles = () => ({
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: 0,
    backgroundColor: '#F4F4F4',
    boxShadow: 'none',
    borderRadius: '0px'
  },
});

class CityRankingTable extends Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.initializeSlide();
  }

  initializeSlide = () => {
    this.setState({ checked: true });
  };

  handleCityClick = city => {
    ReactGA.event({
      category: 'City View',
      action: 'Clicked from Table',
      label: `${city.cityName}, ${city.state}`
    });

    this.props.history.push(`/city/${city.cityName}${city.state}`);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="cityRankingList">
        <Slide direction="left" in={this.state.checked} mountOnEnter unmountOnExit>
          <Paper className={classes.paper}>
            <div style={{ padding: '5px 15px' }}>
              {data.sort((a, b) => a.ranking - b.ranking).map(city => {
                return (<Card className="cityRankingCard" key={city.ranking} direction="1"
                              onClick={() => this.handleCityClick(city)}>
                  <CardContent>
                    <div className="cardBody">
                      <img className="cityTableImage" src={require('../' + city.thumbnail)}
                           alt={`${city.cityName} Header`}/>
                      <div className="cardText">
                        <h4>{city.cityName + ', ' + city.state}</h4>
                        <div className="score">Errors: {(city.score * 100).toFixed(2)}%</div>
                      </div>
                    </div>
                    <h1 className="ranking">{city.ranking < 10 ? '0' + city.ranking.toString() : city.ranking}</h1>
                  </CardContent>
                </Card>);
              })
              }
            </div>
          </Paper>
        </Slide>
      </div>
    );
  }
}

CityRankingTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CityRankingTable);