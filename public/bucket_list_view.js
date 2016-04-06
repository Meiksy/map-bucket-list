var BucketListView = function(listElement){
  this.listElement = listElement;

}

BucketListView.prototype = {
  refresh: function(countries, bucketList){
    for (item of bucketList.list){
      this.addCountry(countries[item]);
    }
  },
  addCountry: function(country){
    var item = document.createElement("li");
    item.innerText = country.name;
    this.listElement.appendChild(item);
  }
}

