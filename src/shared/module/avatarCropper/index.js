/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import $ from 'jquery';
import AvatarEditor from 'react-avatar-editor';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCamera, faPlus, faMinus, faTimes, faCheck }from '@fortawesome/free-solid-svg-icons';

// Images
import transparent from '../../public/images/transparent.png';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            src: props.src || null,
            className: props.className || '',
            id: props.id || 'addCover',
            idx: props.idx,
            proportion: props.proportion || [1,1],
            cropperOpen: false,
            img: null,
            zoom: 1,
            width: 300,
            height: 300
        }
    }

    static getDerivedStateFromProps(props){
        return{
            src: props.src || null
        }
    }

    render(){

        const { id, src, className, width, height } = this.state;

        return(
            <React.Fragment>
                <label htmlFor={id} className={`cover-img virtual ${className}`}>
                    {
                        this.props.children!=null&&
                            this.props.children
                    }
                    {
                        this.props.children==null&&
                            <i><FontAwesomeIcon icon={faCamera}/></i>
                    }
                    <input ref="in" type="file" name="newImage" id={id} onChange={this.handleFileChange.bind(this)}/>
                    <img src={src!=null? src:transparent} alt="" title=""/>
                </label>
                {this.state.cropperOpen && 
                    <div className="cropper-wrapper">
                        <div className="cropper-wrapper-container">
                            <AvatarEditor
                                ref={this.setEditorRef.bind(this)}
                                image={this.state.img}
                                width={width}
                                height={height}
                                border={0}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={this.state.zoom}
                                rotate={0}
                            />
                            <div className="cropper-wrapper-action">
                                <button type="button" onClick={this.handleZoomSlider.bind(this,'in')}>
                                    <i><FontAwesomeIcon icon={faPlus} /></i>
                                </button>
                                <button type="button" onClick={this.handleZoomSlider.bind(this,'out')}>
                                    <i><FontAwesomeIcon icon={faMinus} /></i>
                                </button>
                                <button type="button" onClick={this.handleCancel.bind(this)}>
                                    <i><FontAwesomeIcon icon={faTimes} /></i>
                                </button>
                                <button type="button" onClick={this.handleSave.bind(this)}>
                                    <i><FontAwesomeIcon icon={faCheck} /></i>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

    handleZoomSlider( zoomCase ) {
        let min=1;
        let max=10;
        let { zoom } = this.state;
        switch( zoomCase ){
            case 'in':
                zoom = zoom + 0.5;
                if( zoom>max ) zoom=max;
                break;

            case 'out':
                zoom = zoom - 0.5;
                if( zoom<min ) zoom=min;
                break;
        }
        this.setState({
            zoom
        });
    }
    
    handleFileChange(e) {
        window.URL = window.URL || window.webkitURL;
        const { proportion } = this.state;
        let url = window.URL.createObjectURL(e.target.files[0]);
        const getWindowSize = () => {

            const zoom   = 0.8;
            let   win_w  = $(window).width();
            let   win_h  = $(window).height();

            if( win_w>win_h ){
                win_w = (win_h*( proportion[0]/proportion[1] )) * zoom;
                win_h = win_h * zoom;
            }else{
                win_h = (win_w/( proportion[0]/proportion[1] )) * zoom;
                win_w = win_w * zoom;
            }

            this.setState({
                width  : win_w,
                height : win_h
            })
        }
        getWindowSize();
        $(window).resize(()=>{
            getWindowSize
        });

        this.setState({
            img: url,
            cropperOpen: true,
        })
    }

    handleSave(e) {
        if (this.editor) {
            const canvasScaled = this.editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
            this.setState({
                img: null,
                cropperOpen: false
            },()=>{
                if( this.props.onChangeData!=undefined ){
                    //this.props.onChangeData({ images: croppedImg, sticky: false });
                    this.props.onChangeData( croppedImg );
                }
            })
        }
    }

    handleCancel() {
        this.setState({
            cropperOpen: false
        })
    }

    setEditorRef(editor) {
        this.editor = editor;
    }
}