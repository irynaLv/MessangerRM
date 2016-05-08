ChangePassword = React.createClass({
    onSubmit(e){
        e.preventDefault();
        var oldPassword = this.refs.oldPassword.getDOMNode().value;
        var newPassword = this.refs.newPassword.getDOMNode().value;
        var passwordConfirm = this.refs.passwordConfirm.getDOMNode().value;

        if(newPassword !== passwordConfirm ){
            Materialize.toast('Your new passwords don\'t match!', 4000)
        }else if(oldPassword == ""){
            Materialize.toast('Please type old password', 4000)
        }else{
            Accounts.changePassword(oldPassword, newPassword, function (error){
              if(error){
                  Materialize.toast(error.reason, 4000)
              }else{
                  FlowRouter.go("/");
              }
          })
        }
    },
    render(){
        return(
            <div className="row">
                <h4 className="text-center"> Change Password</h4>
                <form onSubmit={this.onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="oldPassword" type="password" ref="oldPassword" className="validate"/>
                            <label htmlFor="oldPassword">Old Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="newPassword" type="password" ref="newPassword" className="validate"/>
                            <label htmlFor="newPassword">New Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="confirmPassword" type="password" ref="passwordConfirm" className="validate"/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                    </div>

                    <div>
                        <button className="waves-effect waves-light btn">Change Password</button>
                    </div>
                </form>
            </div>
        )
    }
});
