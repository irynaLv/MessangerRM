Meteor.startup(function(){
});

Meteor.methods({
    insertLocation: function (location) {
        LocationCollection.insert(location);
        return LocationCollection.find().fetch();
    },

    getLocations: function () {
        var locations = LocationCollection.find().fetch();
        if(locations.length == 0){
            var locationArr = [{ name: "Ukraine"},
                { name: "USA"},
                { name: "Europe"},
                { name: "Japan"},
                { name: "China"},
                { name: "Dominican Republic"},
                { name: "Brazil"},
                { name: "Portugal"}]

            _.each(locationArr, function(doc) {
                LocationCollection.insert(doc);
            })
        }
        return LocationCollection.find().fetch();
    },

    updateUserInfo: function(userInfo){
        var userId = Meteor.userId();
        var user;
        if (Meteor.users.findOne({"emails.address": userInfo.email})) {
            user =  Meteor.users.findOne({"emails.address": userInfo.email});
            if(user._id != userId){
                throw  new Meteor.Error("create-failed", "User with "+ userInfo.email + " email has already exist." )
            }
        }
        if (Meteor.users.findOne({'username': userInfo.username})){
            user =  Meteor.users.findOne({'username': userInfo.username});
            if(user._id !== userId){
                throw  new Meteor.Error("create-failed", "User with "+ userInfo.username +  " username has already exist." )
            }
        }

        Meteor.users.update(this.userId, {
            $set: {
                username: userInfo.username,
                emails: [{
                    address:userInfo.email
                }],
                profile: userInfo.profile
            }
        });

    },

    insertTextMessage: function (message) {
        MessagesCollection.insert(message);
    },

    getMessages: function () {
        var locationId = Meteor.user().profile.location;
        var locations = MessagesCollection.find({"locationId": locationId}).fetch();
        _.each(locations, function(record){
            var user = Meteor.users.findOne({"_id": record.userId});
            if(user){
                record.userName = user.username;
            }
        })
        return locations;
    },

    getUserLocationName: function() {
        var locationId = Meteor.user().profile.location;
        if(locationId){
            var record =  LocationCollection.findOne({"_id": locationId});

            return record ? record.name  : "";
        }
        return false;
    }

});