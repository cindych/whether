import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllMatches, getAllPlayers, getAllSongs, getBasicPlaylist, getSongAvgWeatherStat } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const playerColumns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
  },
  {
    title: 'Nationality',
    dataIndex: 'Nationality',
    key: 'Nationality',
    sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
  },
  {
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
    sorter: (a, b) => a.Rating - b.Rating
    
  },
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  {
    title: 'Potential',
    dataIndex: 'Potential',
    key: 'Potential',
    sorter: (a, b) => a.Potential - b.Potential
    
  },
  // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
  {
    title: 'Club',
    dataIndex: 'Club',
    key: 'Club',
    sorter: (a, b) => a.Club.localeCompare(b.Club)
    
  },
  // TASK 9: add a column for Value - no sorting required
  {
    title: 'Value',
    dataIndex: 'Value',
    key: 'Value',
  }
];

const songColumns = [
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Artist',
    dataIndex: 'Artist',
    key: 'Artist',
    sorter: (a, b) => a.artist.localeCompare(b.artist),
  },
  {
    title: 'Id',
    dataIndex: 'Id',
    key: 'Id',
    sorter: (a, b) => a.Id.localeCompare(b.Id),
  },
  {
    title: 'Acousticness',
    dataIndex: 'Acousticness',
    key: 'Acousticness',
    sorter: (a, b) => a.Acousticness - b.Acousticness
  },
  {
    title: 'Danceability',
    dataIndex: 'Danceability',
    key: 'Danceability',
    sorter: (a, b) => a.Danceability - b.Danceability
    
  },
  {
    title: 'Energy',
    dataIndex: 'Energy',
    key: 'Energy',
    sorter: (a, b) => a.Energy - b.Energy
    
  },
  {
    title: 'Instrumentalness',
    dataIndex: 'Instrumentalness',
    key: 'Instrumentalness',
    sorter: (a, b) => a.Instrumentalness - b.Instrumentalness
    
  },
  {
    title: 'Speechiness',
    dataIndex: 'Speechiness',
    key: 'Speechiness',
    sorter: (a, b) => a.Speechiness - b.Speechiness
    
  },
  {
    title: 'Liveness',
    dataIndex: 'Liveness',
    key: 'Liveness',
    sorter: (a, b) => a.Liveness - b.Liveness
    
  },
  {
    title: 'Loudness',
    dataIndex: 'Loudness',
    key: 'Loudness',
    sorter: (a, b) => a.Loudness - b.Loudness
    
  },
  {
    title: 'Mode',
    dataIndex: 'Mode',
    key: 'Mode',
    sorter: (a, b) => a.Mode - b.Mode
    
  },
  {
    title: 'Tempo',
    dataIndex: 'Tempo',
    key: 'Tempo',
    sorter: (a, b) => a.Tempo - b.Tempo
    
  },
  {
    title: 'Valence',
    dataIndex: 'Valence',
    key: 'Valence',
    sorter: (a, b) => a.Valence - b.Valence
    
  },
  {
    title: 'Key_Track',
    dataIndex: 'Key_Track',
    key: 'Key_Track',
    sorter: (a, b) => a.Key_Track - b.Key_Track
    
  },
  {
    title: 'Duration',
    dataIndex: 'Duration',
    key: 'Duration',
    sorter: (a, b) => a.Duration - b.Duration
    
  },
];

const playlistColumns = [
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Artist',
    dataIndex: 'Artist',
    key: 'Artist',
    sorter: (a, b) => a.artist.localeCompare(b.artist),
  },
];

const songStatColumns = [
  {
    title: 'Min',
    dataIndex: 'Min',
    key: 'Min',
    sorter: (a, b) => a.Min - b.Min
  },
  {
    title: 'Max',
    dataIndex: 'Max',
    key: 'Max',
    sorter: (a, b) => a.Max - b.Max
  },
  {
    title: 'Avg',
    dataIndex: 'Avg',
    key: 'Avg',
    sorter: (a, b) => a.Avg - b.Avg
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      songsResults: [],
      playlistResults: [],
      songStatResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    getAllMatches(null, null, value).then(res => {
      this.setState({ matchesResults: res.results })
    })
  }

  componentDidMount() {
    getAllMatches(null, null, 'D1').then(res => {
      this.setState({ matchesResults: res.results })
    })

    getAllPlayers().then(res => {
      console.log(res.results)
      this.setState({ playersResults: res.results })
    })






    getAllSongs().then(res => {
      console.log(res.results)
      this.setState({ songsResults: res.results })
    })

    getBasicPlaylist('Argentina', 'rainy').then(res => {
      console.log(res.results)
      this.setState({ playlistResults: res.results })
    })

    getSongAvgWeatherStat('acousticness', 'United States', 'rainy').then(res => {
      console.log(res.results)
      this.setState({ songStatResults: res.results })
    })

 
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs</h3>
          <Table dataSource={this.state.songsResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 20, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Playlist</h3>
          <Table dataSource={this.state.playlistResults} columns={playlistColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs avg stats for weather</h3>
          <Table dataSource={this.state.songStatResults} columns={songStatColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>



        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Players</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Matches</h3>
          <Select defaultValue="D1" style={{ width: 120 }} onChange={this.leagueOnChange}>
            <Option value="D1">Bundesliga</Option>
            {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
            <Option value="SP1">La Liga</Option>
            <Option value="F1">Ligue 1</Option>
            <Option value="I1">Serie A</Option>
            <Option value="E0">Premier League</Option>

          </Select>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Teams">
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="Home" dataIndex="Home" key="Home" sorter= {(a, b) => a.Home.localeCompare(b.Home)}/>
              <Column title="Away" dataIndex="Away" key="Away" sorter= {(a, b) => a.Away.localeCompare(b.Away)}/>
            </ColumnGroup>
            <ColumnGroup title="Goals">
              {/* TASK 5: add columns for home and away goals in this ColumnGroup, with the ability to sort values in these columns numerically */}
              <Column title="Home Goals" dataIndex="HomeGoals" key="HomeGoals" sorter= {(a, b) => a.HomeGoals < b.HomeGoals ? -1 : 1}/>
              <Column title="Away Goals" dataIndex="AwayGoals" key="AwayGoals" sorter= {(a, b) => a.AwayGoals < b.AwayGoals ? -1 : 1}/>
            </ColumnGroup>
             {/* TASK 6: create two columns (independent - not in a column group) for the date and time. Do not add a sorting functionality */}
              <Column title="Date" dataIndex="Date" key="Date"/>
              <Column title="Time" dataIndex="Time" key="Time"/>
          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage

