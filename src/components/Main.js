import React, { Component } from 'react'
import { 
    Button, 
    CircularProgress, 
    Paper,
    Chip
} from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import SpeedIcon from '@material-ui/icons/Speed';
import UploadIcon from '@material-ui/icons/CloudUpload';
// TODO:
import GifIcon from '@material-ui/icons/Gif';

import ConvertedVideosContainer from './ConvertedVideosContainer.js';
import { fetchVideosFromGif, mapAPIResultsToFiles, bytesToKiloBytes } from './../util';
import { primary } from '../theme.js';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFile: null,
            convertedFiles: null,
            loading: false,
        };

        this.inputRef = React.createRef();
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
    }

    async handleFileInputChange(event) {
        const inputFile = event.target.files[0];
        if (!inputFile) {
            return;
        }

        this.setState({ inputFile, loading: true }, async () => {
            const results = await fetchVideosFromGif(inputFile);
            const convertedFiles = results.map((file) => mapAPIResultsToFiles(file, inputFile));

            this.setState({ convertedFiles, loading: false });
        });
    }

    render() {
        const { inputFile, convertedFiles, loading } = this.state;

        return (
            <main>
                {inputFile && 
                    <Paper 
                        className="file-container input-file-container"
                        elevation={3}
                    >
                        <h3>Original file</h3>
                        <img className="file input-file" src={URL.createObjectURL(inputFile)} alt="Original GIF file" />
                        <Chip 
                            style={{margin: '10px 15px 0'}} 
                            label={'gif'} 
                            variant="outlined" 
                            color="primary" 
                            icon={<MovieIcon />} 
                        />
                        <Chip 
                            style={{margin: '10px 15px 0'}} 
                            label={bytesToKiloBytes(inputFile.size) + ' KB'} 
                            variant="outlined" 
                            color="primary" 
                            icon={<SpeedIcon />} 
                        />
                    </Paper>
                }

                <input 
                    style={{display: 'none'}} 
                    onChange={this.handleFileInputChange} 
                    type="file"
                    name="gif"
                    accept="image/gif"
                    ref={this.inputRef}
                />
                <Button
                    className="upload-gif-button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (this.inputRef.current) {
                            this.inputRef.current.click();
                        }
                    }}
                    startIcon={<UploadIcon />}
                >
                    UPLOAD GIF
                </Button>

                {convertedFiles && 
                    <React.Fragment>
                        <hr style={{ 
                            borderColor: primary[500],
                            width: '100%',
                            marginTop: 20,
                        }} />
                        <ConvertedVideosContainer files={convertedFiles} />
                    </React.Fragment>
                }
                {loading && 
                    <div className="converting-file-placeholder">
                        <h3><em>Converting</em></h3>
                        <CircularProgress
                            size={24}
                            className="converting-file-progress"
                        />
                    </div>
                }
            </main>
        )
    }
}
