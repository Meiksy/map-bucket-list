var BucketList = function(){
  this.list = [];
  this.addCountry = function(countryId){
    this.list.push(countryId);
    console.log(this.list);
  }
}