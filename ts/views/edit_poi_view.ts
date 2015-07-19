define([
  'views/base/view',
  'text!templates/edit_poi.hbs',
  'chaplin',
      'views/map/marker-collection-view'
], function(View, template, Chaplin,MarkerCollectionView) {
  'use strict';
var mapView;
  var EditPoiView = View.extend({


    template: template,

    autoRender: true,
    className: 'edit-poi',
    container: '#page-container',

    listen: {
      addedToDOM: 'focusTitle'
    },

    events: {
      'submit form': 'save'
    },
    initialize:function(a){
        this.model.on('invalid',function(model,error){
            this.$(`.poi-${error}`).addClass('has-error');
        }.bind(this))


            /*this.$el.html( this.template(this.collection) ) ;*/
            /*CollectionView.prototype.render.apply(this)*/
            // $el here is a reference to the jQuery element
            // associated with the view, todoTpl is a reference
            // to an Underscore template and model.attributes
            // contains the attributes of the model.
            // Altogether, the statement is replacing the HTML of
            // a DOM element with the result of instantiating a
            // template with the model's attributes.

            var mapOptions = {
                center: new google.maps.LatLng(40.4000, 3.7167),
                zoom: 2,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            if (!mapView) {
                var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
                console.log(map)
                mapView = new MarkerCollectionView({
                    collection: this.collection,
                    map: map
                });
                mapView.closeChildren();

            }
            mapView.refresh();

    },
    focusTitle: function() {
      var $input = this.$('#title');
      var nameLength = $input.val().length;
      $input.focus().prop({
        selectionStart: nameLength
      });
    },

    save: function(event) {
      event.preventDefault();
      // Shortcuts
      this.clearErrors();
      var collection = this.collection;
      // Update model
      this.model.set({
        title: this.$('#title').val(),
        content:this.$('#content').val(),
        lat: this.$('#lat').val(),
        long:this.$('#long').val(),
        image_url:this.$('#image_url').val(),
        dragabble:false
      });
      /*console.log(this.model.validate())*/
      if( this.model.isValid() )
      {
          // Add model to collection
          if (!collection.get(this.model)) {
            collection.push(this.model);
          }
          // Save the model
          /*this.model.save();*/
          collection.save();
          // Back to overview
          Chaplin.utils.redirectTo({ name: 'pois' });
      }
    },
    clearErrors: function(){
        this.$('.poi-title').removeClass('has-error');
        this.$('.poi-content').removeClass('has-error');
        this.$('.poi-lat').removeClass('has-error');
        this.$('.poi-long').removeClass('has-error');
        this.$('.poi-image_url').removeClass('has-error');
    }

  });

  return EditPoiView;
});
