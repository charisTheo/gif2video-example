import React, { Component } from 'react'
import { 
    Link,
    Chip
} from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';
import MovieIcon from '@material-ui/icons/Movie';
import SpeedIcon from '@material-ui/icons/Speed';

export default class ConvertedVideoDetails extends Component {
    constructor(props) {
        super(props);

        this.downloadLink = React.createRef();
    }
    render() {
        const { 
            outputFileSizeKB,
            objectUrl, 
            name,
            type
        } = this.props.file;

        return (
            <div className="converted-video-details">
                <Chip label={type} variant="outlined" color="primary" icon={<MovieIcon />} />
                <Chip label={outputFileSizeKB + " KB"} variant="outlined" color="primary" icon={<SpeedIcon />} />

                <Chip 
                    onClick={() => this.downloadLink.current && this.downloadLink.current.click()}
                    label={"Download"} 
                    variant="default"
                    color="primary" 
                    icon={<DownloadIcon />} 
                />
                <Link 
                    style={{display: 'none'}}
                    ref={this.downloadLink}
                    href={objectUrl} 
                    color="primary"
                    download={name} 
                >Download link</Link>
            </div>
        )
    }
}
