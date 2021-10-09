import React from "react";
import Pagination from 'react-bootstrap/Pagination'
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
        )
    }
}   

export default Blogs