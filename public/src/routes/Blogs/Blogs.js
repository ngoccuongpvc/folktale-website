import React from "react";
import Editor from '@react-page/editor';
import { imagePlugin } from '@react-page/plugins-image';

import slate from '@react-page/plugins-slate';
import spacerPlugin from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';

import dividerPlugin from '@react-page/plugins-divider';
import backgroundPlugin, { ModeEnum } from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';

import videoPlugin from '@react-page/plugins-video';

import html5videoPlugin from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';

import '@react-page/editor/lib/index.css';

const uploadHandler = (file, progress) => {
    console.log(file)
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
    render() {
        return (
            <div>
                <Editor  cellPlugins={cellPlugins} onChange={(value)=>{console.log(value)}}/>
            </div>
        )
    }
}   

export default Blogs