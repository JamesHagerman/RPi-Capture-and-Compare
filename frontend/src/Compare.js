import React, { Component } from 'react';
import axios from 'axios';
// TODO: Figure this out:
// import feathers from 'feathers/client';
import resemble from 'resemblejs'

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
        this.diffImage = new Image()

        this.state = {
            compareCount: 0,
            images: [],
            differences: []
        };
        this.allImages
        this.differences

        this.configureCanvas = this.configureCanvas.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.configureCanvas = this.configureCanvas.bind(this);
        this.getImageJson = this.getImageJson.bind(this);
        this.buildImagePath = this.buildImagePath.bind(this);

    }

    componentDidMount() {
        canvas = this.refs.canvas
        this.lastImage = this.refs.lastImage
        this.latestImage = this.refs.latestImage

        // this.configureCanvas();
        this.getImageJson();
        window.setInterval(this.updateImages, 5000);
        // window.setTimeout(this.updateImages, 1000);
    }

    configureCanvas() {
        console.log('canvas', canvas)
        ctx = canvas.getContext('2d')

        ctx.beginPath()
        ctx.rect(20, 20, 150, 100)
        ctx.fillStyle = "red"
        ctx.fill()
    }

    compareImages(latestImage, lastImage) {
        console.log('comparing images');
        var diff = resemble(lastImage).compareTo(latestImage).ignoreColors().onComplete((data) => {
            console.log(data);
            this.diffImage = new Image();
		    this.diffImage.src = data.getImageDataUrl();

            

            this.setState((prevState, props) => {
                let newDiff = prevState.differences
                if(data.misMatchPercentage == 0){
                    console.log('Images are the same...');
                } else {
                    console.warn('Images are different!!');
                    newDiff.push(latestImage);
                }
                
                return Object.assign(prevState,
                    { compareCount: prevState.compareCount + 1 },
                    { differences: newDiff}
                );
            })
        });
    }

    updateImages() {
        this.getImageJson()
            .then((images) => {
                this.setState((prevState, props) => Object.assign(prevState, {images} ))
                return images;
            })
            .then((images) => {
                this.compareImages(this.buildImagePath(images[0]), this.buildImagePath(images[1]));
                return images;
            });
            // .then((images) => {
            //     // draw images to canvas:
            //     ctx.drawImage(images[0], 0, 0);
            //     ctx.drawImage(images[1], 0, 0);
            // });
    }

    buildImagePath(filename) {
        return 'capture/files/' + filename;
    }

    getImageJson() {
        return axios.get('http://localhost:3030/images/0')
            .then(res => {
                // console.log(res);
                const images = res.data.images;
                console.log('fetched images', JSON.stringify(images,0,2));
                return images; 
            });
    }

    render() {
        this.allImages = this.state.images.map((imageName, idx) => {
            // console.log('list item: ', imageName);
            let url = this.buildImagePath(imageName);
            return (
                <li key={idx}><a href={url}>{url}</a></li>
            )
        });
        this.differences = this.state.differences.map((imageName, idx) => {
            // console.log('list item: ', imageName);
            let url = this.buildImagePath(imageName);
            return (
                <li key={idx}><a href={url}>{url}</a></li>
            )
        });
        return (
            <div>
                <div className='compares'>Number of image comparisons done: {this.state.compareCount}</div>
                {/*<canvas ref='canvas'></canvas>*/}

                <div className='images'>
                    <img ref='lastImage' src='capture/files/last.jpg'/>
                    <img ref='latestImage'src='capture/files/latest.jpg'/>
                </div>

                <div className='diffImage'>
                    Diff image: <br/>
                    <img src={this.diffImage.src}/>
                </div>
                
                <div className="foundDiffs">
                    Images that had differences:
                    <ul>{this.differences}</ul>
                </div>
                <div className='allImages'>
                    All images:
                    <ul>{this.allImages}</ul>
                </div>
            </div>
        )
    }
 
}