import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Divider,
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getBasicPlaylist, } from '../fetcher'
const { Option } = Select;

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

class PlaylistPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      playlistResults: [],

      playlistRegion: "Argentina", // Argentina is default value, update state if user changes this
      playlistWeather: "rainy", // rainy is default, update state if user alters 

      pagination: null  
    }

    this.playlistRegionOnChange = this.playlistRegionOnChange.bind(this)
    this.playlistWeatherOnChange = this.playlistWeatherOnChange.bind(this)
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


  componentDidMount() {

    getBasicPlaylist('Argentina', 'rainy').then(res => {
      console.log(res.results)
      this.setState({ playlistResults: res.results })
    })

  }


  render() {

    return (
      <div>
        <MenuBar />

        {/* playlist with select test below; this should be basic homepage */}
        {/* all of the other queries that have "return LIST of songs for whatever" should go into custom playlist page */}

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Playlist for songs played in {this.state.playlistRegion} when the weather was {this.state.playlistWeather}</h3>
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
  }} dataSource={this.state.playlistResults} columns={playlistColumns} pagination={{ pageSizeOptions:[10], defaultPageSize: 10, showQuickJumper:true }}>
          </Table>

        </div>

      </div>
    )
  }

}

export default PlaylistPage

