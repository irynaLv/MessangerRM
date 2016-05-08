Edit = React.createClass({

    getInitialState(){
        var user = Meteor.user();
        var me = this;
        return {
            email: user && user.emails[0].address ,
            username:  user && user.username,
            location: user &&  user.profile.location,
            locations: Meteor.call("getLocations", {}, function(er, data){
                if(!er){
                    me.setState({locations : data,
                        email: Meteor.user().emails[0].address ,
                        username: Meteor.user().username,
                        location: Meteor.user().profile.location
                    });
                }

            })
        };
    },

    onSubmit(e){
        e.preventDefault();
        var userName = this.refs.userName.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var userInfo  ={
            username: userName,
            email: email,
            profile:{
                location: this.state.location
            }
        };
        Meteor.call("updateUserInfo", userInfo, function(error){
            if(error){
                Materialize.toast(error.reason, 4000)
            }else{
                FlowRouter.go("/");
            }

        })

    },

    handleChange: function(e){
        this.setState({
            location: e.currentTarget.value
        });
    },

    updateUserName: function(){
        this.setState({
            username: this.refs.userName.getDOMNode().value
        });
    },

    updateEmail: function(){
        this.setState({
            email: this.refs.email.getDOMNode().value
        });
    },

    render(){
        if(!this.state.locations){
            return  <div></div>
        }
        return(
            <div className="row">
                <h4 className="text-center"> Edit Account</h4>
                <form onSubmit={this.onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="user_name" type="text" onChange={this.updateUserName} value={this.state.username} ref="userName" className="validate"/>
                            <label htmlFor="user_name" className="active">User Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" onChange={this.updateEmail}  ref="email" value={this.state.email}/>
                            <label htmlFor="email" className="active">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.locations.map(function(listValue){
                            return (
                                <p>
                                    <input name="locations" type="radio"
                                           value={listValue._id}
                                           checked={this.state.location == listValue._id}
                                           onChange={this.handleChange} id={listValue._id} />
                                    <label htmlFor={listValue._id}>{listValue.name}</label>
                                </p>)
                        }, this)}
                    </div>

                    <div className="first-button">
                        <button className="waves-effect waves-light btn">Save</button>
                    </div>

                    <a className="waves-effect waves-light btn" href="/changePassword">Change Password</a>

    </form>
    </div>
    )
    }
});