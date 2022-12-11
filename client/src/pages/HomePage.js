import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Divider,
} from 'antd'

import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import { getAllMatches, getAllPlayers, 
  getAllSongs, getBasicPlaylist, 
  getSongStatsForWeather, getSongAvgWeatherStats, 
  getSongsForWeather, getSongsLocationDate, 
  getSongsAttrHighLow, getSongsAttrThresholdWeather,
  getSongInfo } from '../fetcher'
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

const songWeatherStatColumns = [
  {
    title: 'Rainfall',
    dataIndex: 'Rainfall',
    key: 'Rainfall',
    sorter: (a, b) => a.Rainfall - b.Rainfall
  },
  {
    title: 'Temperature',
    dataIndex: 'Temperature',
    key: 'Temperature',
    sorter: (a, b) => a.Temperature - b.Temperature
  },
  {
    title: 'Snowfall',
    dataIndex: 'Snowfall',
    key: 'Snowfall',
    sorter: (a, b) => a.Snowfall - b.Snowfall
  },
];

const songsForWeatherColumns = [
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
    title: 'Region',
    dataIndex: 'Region',
    key: 'Region',
    sorter: (a, b) => a.region.localeCompare(b.region),
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
      songWeatherStatResults: [],
      songsForWeatherResults: [],
      songsLocationDateResults: [],
      songsAttrHighLowResults: [],
      songsThresholdWeatherResults: [],
      songInfoResults: [],


      playlistRegion: "Argentina", // Argentina is default value, update state if user changes this
      playlistWeather: "rainy", // rainy is default, update state if user alters 

      titleQuery: "Still Got Time", 
      artistQuery: "ZAYN",

      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)

    this.playlistRegionOnChange = this.playlistRegionOnChange.bind(this)
    this.playlistWeatherOnChange = this.playlistWeatherOnChange.bind(this)
    this.handleTitleQueryChange = this.handleTitleQueryChange.bind(this)
    this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    
    // this is what handles options! from the menu select below for all matches, 
    // this then takes the selected option and feeds that into the function
    // (this is how you can pass params into your various things)
    
    getAllMatches(null, null, value).then(res => {
      this.setState({ matchesResults: res.results })
    })
  }

  playlistRegionOnChange(value) {
    this.setState({ playlistRegion: value })
    getBasicPlaylist(value, this.state.playlistWeather).then(res => {
      console.log(res.results)
      this.setState({ playlistResults: res.results })
    })
  }

  playlistWeatherOnChange(value) {
    this.setState({ playlistWeather: value})

    getBasicPlaylist(this.state.playlistRegion, value).then(res => {
      console.log(res.results)
      this.setState({ playlistResults: res.results })
    })
  }

  handleTitleQueryChange(event) {
    this.setState({ titleQuery: event.target.value })
  }

  handleArtistQueryChange(event) {
    this.setState({ artistQuery: event.target.value })

  }

  updateSearchResults() {
    //TASK 11: call getMatchSearch and update matchesResults in state. See componentDidMount() for a hint
    getSongInfo(this.state.titleQuery, this.state.artistQuery).then(res => {
        this.setState({ songInfoResults: res.results })
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

    getSongStatsForWeather('acousticness', 'United States', 'rainy').then(res => {
      console.log(res.results)
      this.setState({ songStatResults: res.results })
    })

    getSongAvgWeatherStats(this.state.artistQuery, this.state.titleQuery).then(res => {
      console.log(res.results)
      this.setState({ songWeatherStatResults: res.results })
    })

    getSongsForWeather('windy', "").then(res => {
      console.log(res.results)
      this.setState({ songsForWeatherResults: res.results })
    })

    getSongsLocationDate('Spain', '2018-06-15').then(res => {
      console.log(res.results)
      this.setState({ songsLocationDateResults: res.results })
    })

    getSongsAttrHighLow('liveness', 'high').then(res => {
      console.log(res.results)
      this.setState({ songsAttrHighLowResults: res.results })
    })

    getSongsAttrThresholdWeather('danceability', 'rainy', '0.2', '0.6').then(res => {
      console.log(res.results)
      this.setState({ songThresHoldWeatherResults: res.results})
    })
  }


  render() {

    return (
      <div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs</h3>
          <Table dataSource={this.state.songsResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 20, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Playlist</h3>
          <Table dataSource={this.state.playlistResults} columns={playlistColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs stats for weather</h3>
          <Table dataSource={this.state.songStatResults} columns={songStatColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs played for weather</h3>
          <Table dataSource={this.state.songsForWeatherResults} columns={songsForWeatherColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs played for location on date</h3>
          <Table dataSource={this.state.songsLocationDateResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs with high or low attribute</h3>
          <Table dataSource={this.state.songsAttrHighLowResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs with attribute within threshold for given weather</h3>
          <Table dataSource={this.state.songsThresholdWeatherResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>








        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Players</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>





        {/* playlist with select test below; this should be basic homepage */}
        {/* all of the other queries that have "return LIST of songs for whatever" should go into custom playlist page */}

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Playlist with select test</h3>
          <Select defaultValue="Argentina" style={{ width: 120 }} onChange={this.playlistRegionOnChange}>
            <Option value="Africa">Africa</Option>
            <Option value="Argentina">Argentina</Option>
            <Option value="Australia">Australia</Option>
            <Option value="Brazil">Brazil</Option>
            <Option value="Canada">Canada</Option>
            <Option value="Chile">Chile</Option>
            <Option value="France">France</Option>
            <Option value="Germany">Germany</Option>
            <Option value="Greece">Greece</Option>
            <Option value="Japan">Japan</Option>
            <Option value="Mexico">Mexico</Option>
            <Option value="South Korea">South Korea</Option>
            <Option value="Spain">Spain</Option>
            <Option value="Ukraine">Ukraine</Option>
            <Option value="United States">United States</Option>
          </Select>

          <Select defaultValue="rainy" style={{ width: 120 }} onChange={this.playlistWeatherOnChange}>
            <Option value="rainy">Rainy</Option>
            <Option value="snowy">Snowy</Option>
            <Option value="sunny">Sunny</Option>
          </Select>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => { } // set click row event here - go to song specific page? 
      // maybe for single song page let's show 
      // - all attrs in spotify table,
      // - avg weather stats on the days it was played, show overall and group by location?
      //    - (do this in two tables: one for "overall weather stats", and one for "weather stats by location")
      // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.playlistResults} columns={playlistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
          </Table>

        </div>




        {/* individual song info test below */}

        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Title</label>
                            <FormInput placeholder="Title" value={this.state.titleQuery} onChange={this.handleTitleQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artist</label>
                            <FormInput placeholder="Artist" value={this.state.artistQuery} onChange={this.handleArtistQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


        </Form>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Song info for {this.state.titleQuery} by {this.state.artistQuery}</h3>
          <Table dataSource={this.state.songInfoResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 20, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Average weather stats for {this.state.titleQuery} by {this.state.artistQuery}</h3>
          <Table dataSource={this.state.songWeatherStatResults} columns={songWeatherStatColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>
        {/* add a group by location option for above if it works*/}




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
  }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}>
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

