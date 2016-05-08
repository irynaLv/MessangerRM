Locations = React.createClass({
    getInitialState(){
        return {
            locations: undefined
        };
    },
    saveLocation(){
        var location = this.refs.locationName.getDOMNode().value;
        var me = this;
        Meteor.call("insertLocation", {name: location}, function(error, locations){
            if(error){
                Materialize.toast(error.reason, 4000)
            }   else{
                me.refs.locationName.getDOMNode().value = "";
                me.refs['locationList'].setState({locations : locations})
            }
        })
    } ,

    render(){
        return(
            <div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="location" type="text" ref="locationName" className="validate"/>
                        <label htmlFor="location">Add new location</label>
                    </div>
                </div>
                <div className="first-button">
                    <button onClick = {this.saveLocation} className="waves-effect waves-light btn">Save</button>
                </div>
                <button className="waves-effect waves-light btn">Cancel</button>
                <div className="row">
                    <h5>Current Locations</h5>
                    <LocationsList ref="locationList"/>
                </div>
            </div>
        )
    }
})