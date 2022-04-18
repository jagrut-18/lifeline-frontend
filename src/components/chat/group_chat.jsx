import React, { Component } from 'react';
import Talk from 'talkjs';

export default class GroupChat extends Component {

    constructor(props) {
        super(props);
        
        this.chatbox = undefined;
    }

    componentDidMount() {
        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: localStorage.getItem("user_id"),
                    name: localStorage.getItem("user_name") ?? "You",
                    // email: "george@looney.net",
                    // photoUrl: "https://talkjs.com/docs/img/george.jpg",
                    // welcomeMessage: "Hey there! How are you? :-)"
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: 't1Bw53u9',
                        me: me
                    });
                }

                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users. 
                const conversationId = 'DOCTOR_GROUP_CHAT';
            
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
            
                this.chatbox = window.talkSession.createChatbox();
                this.chatbox.select(conversation);
                this.chatbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    componentWillUnmount() {
        if (this.chatbox) {
            this.chatbox.destroy();
        }
    }

    render() {
        return (<span>
            <div style={{height: '500px', width: '350px'}} ref={c => this.container = c}>Loading...</div>
        </span>);
    }
}
