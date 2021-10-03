import React from "react";
import Editor from '@react-page/editor';
import image from '@react-page/plugins-image';
import slate from '@react-page/plugins-slate';
import '@react-page/editor/lib/index.css';

const cellPlugins = [slate(), image];
class Blogs extends React.Component {
    render() {
        return (
            <div>
                <Editor  cellPlugins={cellPlugins} onChange={(value)=>{console.log(value)}}/>
            </div>
        )
    }
}   

export default Blogs