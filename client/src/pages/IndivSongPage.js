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

import { getSongAvgWeatherStats, getSongInfo } from '../fetcher'
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


class IndivSongPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      songWeatherStatResults: [],
      songInfoResults: [],

      titleQuery: "Still Got Time", 
      artistQuery: "ZAYN",

      pagination: null  
    }



    this.handleTitleQueryChange = this.handleTitleQueryChange.bind(this)
    this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
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

    getSongAvgWeatherStats(this.state.artistQuery, this.state.titleQuery).then(res => {
      console.log(res.results)
      this.setState({ songWeatherStatResults: res.results })
    })

  }


  render() {

    return (
      <div>

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

        {/* TODO: change the presentation so this is a vertical chart instead of a horizontal table */}

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Song info for {this.state.titleQuery} by {this.state.artistQuery}</h3>
          <Table dataSource={this.state.songInfoResults} columns={songColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 20, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Average weather stats for {this.state.titleQuery} by {this.state.artistQuery}</h3>
          <Table dataSource={this.state.songWeatherStatResults} columns={songWeatherStatColumns} pagination={{ pageSizeOptions:[10, 20, 50], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>
        {/* add a group by location option */}

      </div>
    )
  }

}

export default IndivSongPage

