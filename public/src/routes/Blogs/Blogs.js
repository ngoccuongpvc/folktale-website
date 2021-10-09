import React from "react";
import Pagination from 'react-bootstrap/Pagination'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Button from 'react-bootstrap/Button'

class Blogs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert : false,
            totalPage : 1,
            currentPage : 1,
        }
    }

    render() {
        return (
            <div>
                <Button variant="light">
                    <Link to="/create-blog" style={{ textDecoration: 'none' }}>
                        <AddIcon/> Create 
                    </Link>
                </Button>
                <Pagination style={{display: 'flex', justifyContent: 'center'}}>
                    <Pagination.First />
                    <Pagination.Prev />
                    {(() => {
                        var pages = []
                        var i
                        for (i = 1; i<=this.state.totalPage; ++i) {
                            pages.push(
                                <Pagination.Item 
                                    key={i} 
                                    active={this.state.currentPage == i}
                                    onClick={(event) => {this.setState({...this.state, currentPage : event.target.text})}}
                                    >
                                    {i}
                                </Pagination.Item>
                            )
                        }
                        return pages
                    })()}
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        )
    }
}   

export default Blogs