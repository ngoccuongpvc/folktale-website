// import React from "react";
// import Pagination from 'react-bootstrap/Pagination'
// class Blogs extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             showAlert : false,
//             totalPage : 1,
//             currentPage : 1,
//         }
//     }

//     render() {
//         return (
//             <Pagination style={{display: 'flex', justifyContent: 'center'}}>
//                 <Pagination.First />
//                 <Pagination.Prev />
//                 {(() => {
//                     var pages = []
//                     var i
//                     for (i = 1; i<=this.state.totalPage; ++i) {
//                         pages.push(
//                             <Pagination.Item 
//                                 key={i} 
//                                 active={this.state.currentPage == i}
//                                 onClick={(event) => {this.setState({...this.state, currentPage : event.target.text})}}
//                                 >
//                                 {i}
//                             </Pagination.Item>
//                         )
//                     }
//                     return pages
//                 })()}
//                 <Pagination.Next />
//                 <Pagination.Last />
//             </Pagination>
//         )
//     }
// }   

// export default Blogs

import React from "react";
import Editor from '@react-page/editor';
import '@react-page/editor/lib/index.css';

import { imagePlugin } from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';

import spacerPlugin from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';

import dividerPlugin from '@react-page/plugins-divider';
import backgroundPlugin, { ModeEnum } from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';

import videoPlugin from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';

import html5videoPlugin from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';

import axios from 'axios';

const uploadHandler = (file, progress) => {
    console.log(file)
    return new Promise(resolve => {
        var formData = new FormData()
        formData.append('upload', file)

        axios({
            method : 'post',
            url : '/api/upload-image',
            data: formData,
            headers : { "Content-Type": "multipart/form-data" }
        }).then(res => {
            resolve({url : res.data.url })
        }).catch(res => {
            console.log(res)
        })
      });
}

const cellPlugins = [
    slate(), 
    imagePlugin({imageUpload : uploadHandler}), 
    videoPlugin, 
    html5videoPlugin, 
    spacerPlugin, 
    dividerPlugin, 
    backgroundPlugin({
        imageUpload: uploadHandler,
        enabledModes:
            ModeEnum.COLOR_MODE_FLAG |
            ModeEnum.IMAGE_MODE_FLAG |
            ModeEnum.GRADIENT_MODE_FLAG,
    }),
];

class Blogs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert : false
        }
    }

    render() {
        return (
            <div>
                <Editor  cellPlugins={cellPlugins} onChange={(value)=>{console.log(value)}}/>
            </div>
        )
    }
}   

export default Blogs