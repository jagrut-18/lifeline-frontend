import React, { Component } from 'react';
import Talk from 'talkjs';

export default class Chat extends Component {

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

                const other = new Talk.User({
                    id: this.props.receiverDetails.id,
                    name: this.props.receiverDetails.name,
                    // email: "ronald@teflon.com",
                    // photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    // welcomeMessage: "Hey there! Love to chat :-)"
                });

                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users. 
                const conversationId = Talk.oneOnOneId(me, other);
            
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(other);
            
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
            <div style={{height: '500px'}} ref={c => this.container = c}>Loading...</div>
        </span>);
    }
}


// import './chat.css';
// import Heading from '../heading/heading';
// import Description from '../description/description';
// import Textfield from '../textfield/textfield';
// import { io } from "socket.io-client";
// import React, {useState, useEffect} from 'react';
// import Talk from 'talkjs';

// export default function Chat(props) {
//     // const socket = io('http://3.220.183.182:5000');

//     const [message, setMessage] = useState();
//     const [allMessages, setAllMessages] = useState([
//         {isMe: false, content: "Hey there"},
//         {isMe: true, content: "Hi, how are you?"},
//     ]);

//     const TALK_APP_ID = 't1Bw53u9';
//     const TALK_SECRET = 'sk_test_EQCQVnEHiWGQSUkjH8mGCLwOKiaz5oix';
//     const talkjsContainer = React.createRef();

//     // function sendMessage() {
//     //     if (message == '') return;
//     //     socket.emit('send-message', message);
//     // }

//     useEffect(() => {
//         // console.log("useeffect")
//         // socket.emit('sign_in', {'id': parseInt(localStorage.getItem('user_id'))})
//         // socket.on('message', data => {
//         //     console.log(data);
//         // })
//         Talk.ready.then(() => {
//             var me = new Talk.User({
//               id: localStorage.getItem('user_id'),
//               name: 'You',
//               welcomeMessage: 'Hey there! How are you? :-)',
//               role: 'default',
//             });
//             const session = new Talk.Session({
//                 appId: TALK_APP_ID,
//                 me: me,
//               });
//               var other = new Talk.User({
//                 id: props.receiverDetails.id,
//                 name: props.receiverDetails.name,
//                 // email: 'Sebastian@example.com',
//                 // photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
//                 welcomeMessage: 'Hey, how can I help?',
//                 role: 'default',
//               });
//               var conversation = session.getOrCreateConversation(
//                 Talk.oneOnOneId(me, other)
//               );
//               conversation.setParticipant(me);
// conversation.setParticipant(other);
// const chatbox = session.createChatbox();
// chatbox.select(conversation);
// chatbox.mount(document.getElementById('talkjs-container'));
//           });
//         // Talk.ready
//         //     .then(() => {
//         //         const me = new Talk.User({
//         //             id: localStorage.getItem('user_id'),
//         //             name: "You",
//         //             // email: localStorage.getItem('email'),
//         //             // photoUrl: "https://talkjs.com/docs/img/george.jpg",
//         //             welcomeMessage: "Hey there! How are you? :-)"
//         //         });

                
                

//         //         if (!window.talkSession) {
//         //             window.talkSession = new Talk.Session({
//         //                 appId: TALK_APP_ID,
//         //                 me: me
//         //             });
//         //         }

//         //         const other = new Talk.User({
//         //             id: '33241215', //props.receiverDetails.doctorId,
//         //             name: props.receiverDetails.doctorName,
//         //             // email: "ronald@teflon.com",
//         //             // photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
//         //             welcomeMessage: "Hey there! Love to chat :-)"
//         //         });

//         //         // You control the ID of a conversation. oneOnOneId is a helper method that generates
//         //         // a unique conversation ID for a given pair of users.
//         //         var conversation = window.talkSession.getOrCreateConversation(
//         //             Talk.oneOnOneId(me, other)
//         //           );
//         //         conversation.setParticipant(me);
//         //         conversation.setParticipant(other);
            
//         //         var inbox = window.talkSession.createInbox();
//         //         inbox.select(conversation);
//         //         inbox.mount(talkjsContainer.current);

//         //     })
//         //     .catch(e => console.error(e));
//     }, []);

//     return (
//         <div id='talkjs-container'></div>
//     );
//     return (
//         <div className="chat_container">
//             <div className="chat_header">
//                 <Heading text={props.receiverDetails.doctorName} style={{fontSize: 18}} />
//                 <Description text="Online" />
//             </div>
//             <div className="chat_messages">
//                 {
//                     allMessages.map((message, index) => <div key={index} className={message.isMe ? "chat_my_message" : "chat_other_message"}>{message.content}</div>)
//                 }
//             </div>
//             <div className="chat_footer">
//                 <Textfield placeholder="Type here..." />
//             <button className='chat_send_button'>
//                 Send
//             </button>
//             </div>
//         </div>
//     );
// }