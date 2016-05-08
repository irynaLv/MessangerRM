MessageTemplate = React.createClass({
    getInitialState(){
        var me = this;
        return {
            messages: Meteor.call("getMessages", {}, function(er, data){
                if(!er){
                    me.setState({messages : data});
                }

            })
        };
    },

    render(){
        if(!this.state.messages){
            return  <div></div>
        }
        var userId = Meteor.userId();
        var cx = React.addons.classSet;

        return(
            <div className="messages-container">
                {this.state.messages.map(function(message){
                    var classes = cx({
                        'message-wrapper': true,
                        'them': userId != message.userId,
                        'me': userId == message.userId
                    });
                    return <div className={classes}>
                        <div className="circle-wrapper animated bounceIn"></div>
                        <div className="text-wrapper animated">
                            <div className="name-wrapper">{message.userName}</div>
                            <div>{message.text}</div>
                            <div className="date-wrapper">{moment(message.dateTime).format("DD, MMMM, YYYY hh:mm A")}</div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
})