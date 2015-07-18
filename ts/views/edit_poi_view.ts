define([
  'views/base/view',
  'text!templates/edit_poi.hbs',
  'chaplin'
], function(View, template, Chaplin) {
  'use strict';

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
    initialize:function(){
        this.model.on('invalid',function(model,error){
            this.$(`.poi-${error}`).addClass('has-error');
        }.bind(this))

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
        image_url:this.$('#image_url').val()
      });
      /*console.log(this.model.validate())*/
      if( this.model.isValid() )
      {
          // Add model to collection
          if (!collection.get(this.model)) {
            collection.push(this.model);
          }
          // Save the model
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
