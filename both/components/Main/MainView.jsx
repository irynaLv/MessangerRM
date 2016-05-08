MainView = React.createClass({

    getInitialState(){
        var user = Meteor.user();
        var me = this;
        return {
            locationName: Meteor.call("getUserLocationName", {},(er, data)=> {
                me.setState({
                    locationName: data
                });
            })
        };
    },

    onSubmit: function () {
        var textarea = this.refs.textarea.getDOMNode().value;
        var userId = Meteor.userId();
        var locationId =  Meteor.user().profile.location;
        if(textarea){
            var messageInfo ={
                text: textarea,
                userId: userId,
                dateTime: new Date(),
                locationId:locationId
            };

            Meteor.call("insertTextMessage", messageInfo, function(e){
                console.log("Save");
            })
        }
    },

    render() {
        if(!this.state.locationName){
            return(
                <div> <h4>Please select your location</h4> </div>
            )
        }

        return (

            <div>
                <h5>Location: {this.state.locationName}</h5>
                <MessageTemplate/>
                <div className="bottom">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <div className="input-field col s10"> <textarea id="textarea1" ref="textarea" className="materialize-textarea"></textarea>
                                    <label htmlFor="textarea1">Type you message here</label></div>
                                 <div className="input-field col s2">  <button className="waves-effect waves-light btn">Send</button></div>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
});