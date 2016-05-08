Register = React.createClass({
    onSubmit(e){
        e.preventDefault();
        var form = $(e.target);
        var userName = form.find("#user_name").val();
        var email = form.find("#email").val();
        var password = form.find("#password").val();
        var passwordConfirm = form.find("#password_conf").val();

        if(password !== passwordConfirm){
            Materialize.toast('Your passwords don\'t match!', 4000)
        }else if(password == "" || passwordConfirm == ""){
            Materialize.toast('Password fields are required!', 4000)
        }else{
            var registerInfo = {
                email: email,
                username: userName,
                password: password,
                profile:{
                    locationId: null
                }

            }
            Accounts.createUser(registerInfo, function(error){
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
                <h4 className="text-center"> Register Account</h4>
                <form onSubmit={this.onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="user_name" type="text" required className="validate"/>
                            <label htmlFor="user_name">User Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password_conf" type="password" className="validate"/>
                            <label htmlFor="password_conf">Confirm Password</label>
                        </div>
                    </div>

                    <div>
                        <button className="waves-effect waves-light btn">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
});
