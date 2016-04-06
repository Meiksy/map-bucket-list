window.onload = function () {

    
    //setup views
    var countrySelectView = new CountrySelectView(document.querySelector('#countries'), document.querySelector('#form'));
    var countryDetailView = new CountryDetailView(document.querySelector('#info'));
    var bucketListView = new BucketListView(document.querySelector('#bucket-list'));

    //link change on select to update detail view and persist last country
    countrySelectView.onChange = function(country){
      countryDetailView.display(country);
      lastCountry.save(country);
    }

    //setup country list model
    var world = new CountryList();

    //setup bucket list
    var bucketList = new BucketList();
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/bucketlist");

    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var list = JSON.parse(jsonString);

        for(var item of list){
          bucketList.addCountry(item.index);
        }
        console.log("bucket list!", bucketList.list);

      }
    }
    request.send();

    //update views on data update
    world.onUpdate = function(countries){
      countrySelectView.populate(countries);
      var savedCountry = lastCountry.get();
      console.log('saved Country', savedCountry);
      if(savedCountry){
        countrySelectView.setSelectedIndex(savedCountry.index);
        countryDetailView.display(savedCountry);
      }
      bucketListView.refresh(countries, bucketList);
    };

    //get data from server
    world.populate();

    //submit button
    countrySelectView.onSubmit = function(countryId){
        bucketList.addCountry(countryId);
        bucketListView.addCountry(world.countries[countryId]);

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/bucketlist");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function(){
          console.log('got response');
        }
        request.send(JSON.stringify({index: countryId}) );
    };

}
