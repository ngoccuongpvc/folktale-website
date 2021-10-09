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
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

class CreateBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert : false,
            data : null,
            isShowContentEditor : true,
            isShowPreviewEditor : false
        }
    }

    handleChange(data) {
        this.setState({...this.state, data : data})
    }
    handleSubmit() {

    }
    showContentEditor() {
        return(
                <div >
                    <Editor value={this.state.data} cellPlugins={cellPlugins} onChange={(data)=>{this.handleChange(data)}}/>
                    
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="primary" 
                            onClick={() => {
                                this.setState({...this.state, isShowContentEditor : false, isShowPreviewEditor : true})
                                }}>
                            Next
                        </Button>
                    </div>
                </div>
            )
    }
    showPreviewEditor() {
        return(
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title of the post" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Sort Content</Form.Label>
                        <Form.Control type="text" placeholder="Sort Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Thumbnail</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                </Form>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="danger" 
                        onClick={() => {
                            this.setState({...this.state, isShowContentEditor : true, isShowPreviewEditor : false})
                            }}>
                        Back
                    </Button>
                    {" "}
                    <Button variant="warning" 
                        onClick={() => {
                            }}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.isShowContentEditor === true) {
            return this.showContentEditor()
        } else {
            return this.showPreviewEditor()
        }
        
    }
}   

export default CreateBlog