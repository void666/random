var _ = require('lodash');
var branch = require('./branches.json');
var geocoder = require('geocoder');
var count = branch.length;
console.log('cont',count);
var jsonfile = require('jsonfile');
var file = './newBranches.json';


function initiateTimeOut(i) {
  setTimeout(function() { doStuff(i) }, 500);
}
function doStuff(i) {
    data = branch[i];
    var address  = [data['address'],data['city'],data['state'],data['pincode']].join(', ');
    geocoder.geocode(address,function(err,res){
                if(err){
                    console.log(err);
                    return;
                }
                data['location'] = _.get(res, 'results.0.geometry.location');
                console.log(data);
            });
    i++;
    if (i <= 2000) {
        initiateTimeOut(i); 
    }
    else{
        var obj = branch;
                jsonfile.writeFile(file, obj, function (err) {
                console.error(err)
                });
    }
}
initiateTimeOut(0);

