import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update player score', () => {
  const players = [
    {
      name: 'Kunegunda',
      score: 5
    }
  ];
  const playerScoreExpected = 10;

  const appComponent = shallow(<App />);
  appComponent.setState({ players });
  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
  onScoreUpdate(0, 5);
  const playersAfterUpdate = appComponent.state('players');
  const playersScoreAfterUpdate = playersAfterUpdate[0].score;
  expect(playersScoreAfterUpdate).toEqual(playerScoreExpected);
});

it('should add player {name: Ania, score: 0 }', () => {
  const playerExpected = {
    name: 'Ania',
    score: 0
  }
  const appComponent = shallow(<App />);
  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  onPlayerAdd('Ania');
  const playersAfterUpdate = appComponent.state('players');
  expect(playersAfterUpdate.length).toEqual(1);
  expect(playersAfterUpdate[0].name).toEqual(playerExpected.name);
  expect(playersAfterUpdate[0].score).toEqual(playerExpected.score);
});

it('should remove player from list ', () => {

  const players = [
    {
        name: 'Kunegunda',
        score: 5
    },
    {
        name: 'Antoś',
        score: 0
    }
  ];

  const playersLengthExpected = 1;
  const appComponent = shallow(<App />);
  appComponent.setState({players});
  const onPlayerDelete = appComponent.find(PlayersList).prop('onPlayerDelete');
  onPlayerDelete(0);
  const playersAfterDelete = appComponent.state('players');
  expect(playersAfterDelete.length).toEqual(playersLengthExpected);
})