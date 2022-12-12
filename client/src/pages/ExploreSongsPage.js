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

import MenuBar from '../components/MenuBar';
import { getAllMatches, getAllPlayers, 
  getAllSongs, getBasicPlaylist, 
  getSongStatsForWeather, getSongAvgWeatherStats, 
  getSongsForWeather, getSongsLocationDate, 
  getSongsAttrHighLow, getSongsAttrThresholdWeather,
  getSongInfo, getSongsForWeatherMultLocations } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


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

class ExploreSongsPage extends React.Component {

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
      songsForWeatherMultLocationsResults: [],

      songStatsForWeatherAttr: "acousticness",
      songStatsForWeatherLocation: "United States",
      songStatsForWeatherWeather: "rainy", 

      songsForWeatherLocation: "",
      songsForWeatherWeather: "windy",

      highLow: "low", 
      highLowAttr: "liveness",

      pagination: null  
    }

    this.songStatsForWeatherAttributeOnChange = this.songStatsForWeatherAttributeOnChange.bind(this)
    this.songStatsForWeatherLocationOnChange = this.songStatsForWeatherLocationOnChange.bind(this)
    this.songStatsForWeatherWeatherOnChange = this.songStatsForWeatherWeatherOnChange.bind(this)

    this.songsForWeatherLocationOnChange = this.songsForWeatherLocationOnChange.bind(this)
    this.songsForWeatherWeatherOnChange = this.songsForWeatherWeatherOnChange.bind(this)

    this.highLowAttrOnChange = this.highLowAttrOnChange.bind(this)
    this.highLowOnChange = this.highLowOnChange.bind(this)

  }

  songStatsForWeatherAttributeOnChange(value) {
    this.setState({ songStatsForWeatherAttr: value })
    getSongStatsForWeather(value, this.state.songStatsForWeatherLocation, this.state.songStatsForWeatherWeather).then(res => {
      console.log(res.results)
      this.setState({ songStatResults: res.results })
    })
  }

  songStatsForWeatherLocationOnChange(value) {
    this.setState({ songStatsForWeatherLocation: value })
    getSongStatsForWeather(this.state.songStatsForWeatherAttr, value, this.state.songStatsForWeatherWeather).then(res => {
      console.log(res.results)
      this.setState({ songStatResults: res.results })
    })
  }

  songStatsForWeatherWeatherOnChange(value) {
    this.setState({ songStatsForWeatherWeather: value })
    getSongStatsForWeather(this.state.songStatsForWeatherAttr, this.state.songStatsForWeatherLocation, value).then(res => {
      console.log(res.results)
      this.setState({ songStatResults: res.results })
    })
  }

  songsForWeatherLocationOnChange(value) {
    this.setState({ songsForWeatherLocation: value })
    getSongsForWeather(this.state.songsForWeatherWeather, value).then(res => {
      console.log(res.results)
      this.setState({ songsForWeatherResults: res.results })
    })
  }

  songsForWeatherWeatherOnChange(value) {
    this.setState({ songsForWeatherWeather: value })
    getSongsForWeather(value, this.state.songsForWeatherLocation).then(res => {
      console.log(res.results)
      this.setState({ songsForWeatherResults: res.results })
    })
  }

  highLowAttrOnChange(value) {
    this.setState({ highLowAttr: value })
    getSongsAttrHighLow(value, this.state.highLow).then(res => {
      console.log(res.results)
      this.setState({ songsAttrHighLowResults: res.results })
    })
  }

   highLowOnChange(value) {
    this.setState({ highLow: value })
    getSongsAttrHighLow(this.state.highLowAttr, value).then(res => {
      console.log(res.results)
      this.setState({ songsAttrHighLowResults: res.results })
    })
  }

  componentDidMount() {
 

    getAllSongs().then(res => {
      console.log(res.results)
      this.setState({ songsResults: res.results })
    })

    getSongStatsForWeather('acousticness', 'United States', 'rainy').then(res => {
      console.log(res.results)
      this.setState({ songStatResults: res.results })
    })

    getSongsForWeather('windy', "").then(res => {
      console.log(res.results)
      this.setState({ songsForWeatherResults: res.results })
    })

    getSongsLocationDate('Spain', '2018-06-15').then(res => {
      console.log(res.results)
      this.setState({ songsLocationDateResults: res.results })
    })

    getSongsAttrHighLow('liveness', 'true').then(res => {
      console.log(res.results)
      this.setState({ songsAttrHighLowResults: res.results })
    })

    getSongsAttrThresholdWeather('danceability', 'rainy', '0.2', '0.7').then(res => {
      console.log(res.results)
      this.setState({ songThresHoldWeatherResults: res.results})
    })

    getSongsForWeatherMultLocations('rainy').then(res => {
      console.log(res.results)
      this.setState({ songsForWeatherMultLocationsResults: res.results })
    })
  }


  render() {

    return (
      <div>
        <MenuBar />

        {/* add a hide additional info button? so show only title/artist instead*/}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>All songs</h3>
          <Table dataSource={this.state.songsResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 20, showQuickJumper:true }}/>
        </div>

         {/* add selectable attr, location, weather */}
        {/* <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs stats for weather</h3>
          <Table dataSource={this.state.songStatResults} columns={songStatColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div> */}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Min, max, and average {this.state.songStatsForWeatherAttr} for songs played in {this.state.songStatsForWeatherLocation} on {this.state.songStatsForWeatherWeather} days</h3>
          <Select defaultValue="acousticness" style={{ width: 120 }} onChange={this.songStatsForWeatherAttributeOnChange}>
            <Option value="acousticness">Accousticness</Option>
            <Option value="danceability">Danceability</Option>
            <Option value="energy">Energy</Option>
            <Option value="instrumentalness">Instrumentalness</Option>
            <Option value="speechiness">Speechiness</Option>
            <Option value="liveness">Liveliness</Option>
            <Option value="loudness">Loudness</Option>
            <Option value="mode">Mode</Option>
            <Option value="tempo">Tempo</Option>
            <Option value="valence">Valence</Option>
            <Option value="duration">Duration</Option>
          </Select>
          
          <Select defaultValue="United States" style={{ width: 120 }} onChange={this.songStatsForWeatherLocationOnChange}>
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

          <Select defaultValue="rainy" style={{ width: 120 }} onChange={this.songStatsForWeatherWeatherOnChange}>
            <Option value="rainy">Rainy</Option>
            <Option value="snowy">Snowy</Option>
            <Option value="sunny">Sunny</Option>
          </Select>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => { } 
    };
  }} dataSource={this.state.songStatResults} columns={songStatColumns} pagination={{ pageSizeOptions:[10], defaultPageSize: 10, showQuickJumper:true }}>
          </Table>

        </div>







        {/* add selectable weather */}
        {/* <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs played for weather</h3>
          <Table dataSource={this.state.songsForWeatherResults} columns={songsForWeatherColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div> */}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Songs played in {this.state.songsForWeatherLocation ? this.state.songsForWeatherLocation : "all regions"} when the weather was {this.state.songsForWeatherWeather}</h3>
          
          <Select defaultValue="United States" style={{ width: 120 }} onChange={this.songsForWeatherLocationOnChange}>
            <Option value="">All regions</Option>
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

          <Select defaultValue="rainy" style={{ width: 120 }} onChange={this.songsForWeatherWeatherOnChange}>
            <Option value="rainy">Rainy</Option>
            <Option value="snowy">Snowy</Option>
            <Option value="sunny">Sunny</Option>
            <Option value="cloudy">Cloudy</Option>
            <Option value="windy">Windy</Option>
          </Select>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => { } 
    };
  }} dataSource={this.state.songsForWeatherResults} columns={songsForWeatherColumns} pagination={{ pageSizeOptions:[10], defaultPageSize: 10, showQuickJumper:true }}>
          </Table>

        </div>




        {/* add selectable region and date - calendar select for date? or search submission form*/}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs played for location on date</h3>
          <Table dataSource={this.state.songsLocationDateResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>



        {/* add selectable attribute and high/low */}

        {/* TODO: check this one I think it's buggy route/query */}

        {/* <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs with high or low attribute</h3>
          <Table dataSource={this.state.songsAttrHighLowResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div> */}
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Songs with {this.state.highLow == 'true' ? "high" : "low"} {this.state.highLowAttr}</h3>
          <Select defaultValue="liveness" style={{ width: 120 }} onChange={this.highLowAttrOnChange}>
            <Option value="acousticness">Accousticness</Option>
            <Option value="danceability">Danceability</Option>
            <Option value="energy">Energy</Option>
            <Option value="instrumentalness">Instrumentalness</Option>
            <Option value="speechiness">Speechiness</Option>
            <Option value="liveness">Liveliness</Option>
            <Option value="loudness">Loudness</Option>
            <Option value="mode">Mode</Option>
            <Option value="tempo">Tempo</Option>
            <Option value="valence">Valence</Option>
          </Select>
          
          <Select defaultValue="low" style={{ width: 120 }} onChange={this.highLowOnChange}>
            <Option value="true">High</Option>
            <Option value="false">Low</Option>
          </Select>
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => { } 
    };
  }} dataSource={this.state.songsAttrHighLowResults} columns={songColumns} pagination={{ pageSizeOptions:[10], defaultPageSize: 10, showQuickJumper:true }}>
          </Table>

        </div>












        {/* add a select form for this one for the attribute and weather, and a slider for threshold*/}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs with attribute within threshold for given weather</h3>
          <Table dataSource={this.state.songsThresholdWeatherResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>









        {/* add select form for weather */}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs for weather mult locations</h3>
          <Table dataSource={this.state.songsForWeatherMultLocationsResults} columns={playlistColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

      </div>
    )
  }

}

export default ExploreSongsPage

