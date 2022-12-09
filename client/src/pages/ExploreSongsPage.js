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
  getSongInfo } from '../fetcher'
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


      playlistRegion: "Argentina", // Argentina is default value, update state if user changes this
      playlistWeather: "rainy", // rainy is default, update state if user alters 

      pagination: null  
    }

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

    getSongsAttrHighLow('liveness', 'high').then(res => {
      console.log(res.results)
      this.setState({ songsAttrHighLowResults: res.results })
    })

    getSongsAttrThresholdWeather('danceability', 'rainy', '0.2', '0.7').then(res => {
      console.log(res.results)
      this.setState({ songThresHoldWeatherResults: res.results})
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

        {/* add selectable weather */}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs stats for weather</h3>
          <Table dataSource={this.state.songStatResults} columns={songStatColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        {/* add selectable weather */}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs played for weather</h3>
          <Table dataSource={this.state.songsForWeatherResults} columns={songsForWeatherColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        {/* add selectable region and date - calendar select for date? or search submission form*/}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs played for location on date</h3>
          <Table dataSource={this.state.songsLocationDateResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        {/* add selectable attribute and high/low */}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs with high or low attribute</h3>
          <Table dataSource={this.state.songsAttrHighLowResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        {/* add a select form for this one for the attribute and weather, and a slider for threshold*/}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Songs with attribute within threshold for given weather</h3>
          <Table dataSource={this.state.songsThresholdWeatherResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

      </div>
    )
  }

}

export default ExploreSongsPage

