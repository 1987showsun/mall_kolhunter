import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faCheck }from '@fortawesome/free-solid-svg-icons';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            idx: props.idx,
            cropperOpen: false,
            img: null,
            zoom: 1,
            croppedImg: "http://www.fillmurray.com/400/400"
        }
    }

    static getDerivedStateFromProps(props){
        return{
        }
    }

    render(){
        return(
            <React.Fragment>
                <label htmlFor="addCover" className="cover-img virtual">
                    {
                        this.props.children!=null&&
                            this.props.children
                    }
                    {
                        this.props.children==null&&
                            <i><FontAwesomeIcon icon={faPlus}/></i>
                    }
                    <input ref="in" type="file" name="newImage" id="addCover" onChange={this.handleFileChange.bind(this)}/>
                </label>
                {this.state.cropperOpen && 
                    <div className="cropper-wrapper">
                        <div className="cropper-wrapper-container">
                            <AvatarEditor
                                ref={this.setEditorRef.bind(this)}
                                image={this.state.img}
                                width={300}
                                height={300}
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
        let url = window.URL.createObjectURL(e.target.files[0]);
        this.setState({
            img: url,
            cropperOpen: true
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