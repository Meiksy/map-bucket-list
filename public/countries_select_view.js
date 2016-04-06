var CountrySelectView = function(selectElement, formElement){
  this.selectElement = selectElement;
  this.formElement = formElement;
  this.onChange = undefined;
  this.onSubmit = undefined;
  this.countries = [];
  this.selectElement.addEventListener('change', function (e) {
      var target = e.target
      var index = target.selectedIndex;
      var country = this.countries[index];
      this.onChange(country);
  }.bind(this), false);
  this.formElement.addEventListener('submit', function(e){
    e.preventDefault();
    this.onSubmit(e.target.countries.value);
    // console.log("country number", this.countries.value);
  }.bind(this));
}

CountrySelectView.prototype = {
  populate:function(countries){
    this.selectElement.innerHTML = "";
    this.countries = countries;
    this.countries.forEach(function(country, index){
      country.index = index;
      this.addOption(country, index);
    }.bind(this));
  },
  addOption:function(country, index){
    var option = document.createElement("option");
    option.value = index;
    option.text = country.name;
    this.selectElement.appendChild(option);
  },
  setSelectedIndex:function(index){
    this.selectElement.selectedIndex = index;
  }
}
