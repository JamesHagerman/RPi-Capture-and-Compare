import React, { Component } from 'react';
import axios from 'axios';

import styles from './Compare.css'

let canvas;
let ctx;
let imageSize = 500;

export default class Compare extends Component {

    constructor(props) {
        super(props)

        console.log('Compare constructor')

        // Class variables:
        this.lastImage
        this.latestImage
        this.state = {
            compareCount: 0
        };

        this.configureCanvas = this.configureCanvas.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.configureCanvas = this.configureCanvas.bind(this);

    }

    componentDidMount() {
        canvas = this.refs.canvas
        this.lastImage = this.refs.lastImage
        this.latestImage = this.refs.latestImage

        this.configureCanvas();
        // this.loadAndCompare();
        window.setInterval(this.updateImages, 1000);
    }

    render() {
        return (
            <div>
                <div className='compares'>Number of image comparisons done: {this.state.compareCount}</div>
                <canvas ref='canvas'></canvas>

                <div className='images'>
                    <img ref='lastImage' src='capture/files/last.jpg'/>
                    <img ref='latestImage'src='capture/files/latest.jpg'/>
                </div>
                
                <div className="foundDiffs">
                    Found images that had differences:
                    <div className="all">
                    </div>
                </div>
            </div>
        )
    }

    configureCanvas() {
        console.log('canvas', canvas)
        ctx = canvas.getContext('2d')

        ctx.beginPath()
        ctx.rect(20, 20, 150, 100)
        ctx.fillStyle = "red"
        ctx.fill()
    }

    compareImages() {
        console.log('comparing images');
    }

    updateImages() {
        this.setState((prevState, props) => {
            return {compareCount: prevState.compareCount + 1};
        })

        // draw images to canvas:
        ctx.drawImage(this.lastImage, 0, 0);
        ctx.drawImage(this.latestImage, 0, 0);
    }

    getImageJson() {
        axios.get('images.json')
            .then(res => {
                const posts = res.data.data.children.map(obj => obj.data);
                this.setState({ posts });
            });
    }

 
}