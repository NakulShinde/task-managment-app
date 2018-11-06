import React, {Component} from "react";
import {connect} from 'react-redux'

// Note: Enable while needed to connect with webSocket
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'

import {newTasksReceivedFromWS} from './../actions/TaskListActions'

class WebSocketConnect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webSocketConnected: false
        };

        this.connectWS();
    }
    connectWS() {

        /*
        //Un-comment this for websocket with SockJS & stomp client
        this.socket = new SockJS('/gettasks');
        this.stompClient = Stomp.over(this.socket);
        this
            .stompClient
            .connect({}, (frame) => {
                console.log(`connected, ${frame}!`);
                this.setState({webSocketConnected: true});
                this
                    .stompClient
                    .subscribe('/topic/tasks', (task) => {
                        console.log(JSON.parse(task.body));
                        this.onRecieveData(JSON.parse(task.data));
                    });
            });
        */

        //IMP: mock websocket server posting dummy task data every 2 sec.
        //mock websocket repo is https://github.com/NakulShinde/mock-websocket-server
        //this will open WebSocket server on URL: ws://localhost:40510

        var websocket = new WebSocket('ws://localhost:40510');

        websocket.onopen = function () {
            console.log('websocket is connected ...')
            websocket.send('connected')
            this.setState({webSocketConnected: true});
        }.bind(this);

        websocket.onclose = function (evt) {
            console.log('websocket is connection closed...')
            this.setState({webSocketConnected: false});
        }.bind(this);

        websocket.onerror = function (evt) {
            console.log('websocket error...', evt);
        };

        websocket.onmessage = function (task) {
            this.onRecieveData(JSON.parse(task.data));
        }.bind(this);
    }
    onRecieveData(data) {
        console.log("WS Received data : ", data);
        this
            .props
            .updateTask(data);
    }

    render() {

        return (
            <div className="websocket-component"></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const matchDispatchToProps = (dispatch) => {
    return {
        updateTask: (newTask) => dispatch(newTasksReceivedFromWS(newTask))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(WebSocketConnect)
