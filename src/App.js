import React, {useState,useEffect,useMemo, useCallback} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Layout, Menu, Breadcrumb, Input, Button, Modal, Table} from 'antd';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";
import {GithubOutlined} from "@ant-design/icons/lib";
import {connect} from 'react-redux';
import vector from './components/human.png'
const {Header, Content, Footer} = Layout;
const {Search} = Input;


export function App(props) {
    const [visible, setVisible] = useState(false)
    const [windowVisible, setWindowVisible]= useState(false)
    const [marker, setMarker] = useState()
    const [place, setPlace] = useState("")
    const [currentLocation, setCurrentLocation]= useState({lat:21.005492, long:105.844257})
    const [name, setName]= useState("")
    const [location, setLocation] = useState({lat:21.005492, long:105.844257})
    const {objects, getObjects}= props
    const onMarkerClick = (props, marker, e) => {
        setWindowVisible(true);
        setMarker(marker);
        setPlace(props)
    }
    const onSearchHandle = (v,e)=>{
        console.log(v);
        getObjects(v);
        // if(objects!==null&&objects[0]!=null) {
        //     console.log(objects[0]);
        //     setLocation({lat: objects[0].lat, long: objects[0].long})
        //     console.log('location',location);
        // }
        setVisible(true);
    }
    const onSubmitButtonHandler=()=>{
        setLocation({
            lat: 21.025907,
            long: 105.899875
        })
        console.log("on submit")
    }

    const tableColumn =[
        {title: "Name",
            dataIndex:"name"
        },
        {
            title:"Action",
            render: (record) => {
                return  <Button onClick={()=>{
                    console.log('record',record)
                    console.log('record.latitude', record.latitude)
                    console.log('record.longitude', record.longitude)
                    setLocation({lat:record.latitude, long: record.longitude})
                    setVisible(false)
                    setName(record.name)
                }} >Select</Button>
            }
        }
    ]
    const handleOK =() =>{
        setVisible(false)
    }
    const handleCancel=()=>{
        setVisible(false)
    }
    useEffect(()=>{
        console.log('location',location)
        console.log('location lat',location.lat)
        console.log('location long',location.long)


        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
            setCurrentLocation({lat:position.coords.latitude, long:position.coords.longitude})
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    },[location])
    console.log(currentLocation)
    console.log(location)
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}
                {/*  <Menu.Item key="1">nav 1</Menu.Item>*/}
                {/*  <Menu.Item key="2">nav 2</Menu.Item>*/}
                {/*  <Menu.Item key="3">nav 3</Menu.Item>*/}
                {/*</Menu>*/}
                <GithubOutlined style={{color: "pink", fontSize: 30}}/>
            </Header>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                {/*  <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                {/*  <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*  <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                <h1 style={{marginTop: 5}}>Project I</h1>
                <div className="site-layout-background"
                     style={{padding: 24, minHeight: 380, background: 'white', height: 600}}>

                    <h style={{marginLeft: 350, fontFamily: 'Ubuntu'}}>Find your place</h>


                    <Search
                        placeholder='demo'
                        style={{width: 320, marginLeft: 20}}
                        enterButton
                        name='search'
                        onSearch={onSearchHandle}
                    />
                    <Button onClick={onSubmitButtonHandler}> Test </Button>
                    <Map
                        google={props.google}
                        zoom={13}
                        style={mapStyles}
                        initialCenter={{lat: currentLocation.lat, lng: currentLocation.long}}
                        center={{lat:location.lat, lng:location.long}}
                        // center={objects.length!==0?{lat:objects[0].latitude, lng:objects[0].longitude}:{lat:21.005492, lng:105.844257}}
                    >
                        <Marker
                            // position={objects.length!==0?{lat:objects[0].latitude, lng:objects[0].longitude}:{lat:21.005492, lng:105.844257}} onClick={onMarkerClick}
                            onClick={onMarkerClick}
                            // position={{lat:21.005492,lng:105.844257}}
                            position={{lat:location.lat, lng: location.long}}
                            name={name} />
                       <Marker
                        position={{lat:currentLocation.lat,lng:currentLocation.long}}
                        icon={{
                            // url: require('./components/human.png')
                                url: vector
                        }}
                       />
                        <InfoWindow
                            marker={marker}
                            visible={windowVisible}
                        >
                            <div>
                                <h1>{place.name}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                    <Modal visible={visible} onOk={handleOK} onCancel={handleCancel}>
                        <Table columns={tableColumn} dataSource={objects}/>
                    </Modal>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>20183894 ©2020 Created by Vu Trong Duc </Footer>
        </Layout>
    );
}

const mapStyles = {
    width: '89%',
    height: '80%',
    marginTop: 10,

};
const mapStateToProps = state => {
return{
    objects: state.object.objects
}
}
const mapDispatchToProps = dispatch => {
return{
    getObjects: (n)=> dispatch({type:"API_CALL_REQUEST",name:n})
}
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: "AIzaSyBEY6kAxIIC4bNynlyy-3H2FMpcvD0uP0Y"
})(App));
