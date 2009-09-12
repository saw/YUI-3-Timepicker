YUI.add('timepicker', function(Y){
    
    var Lang = Y.Lang,
    Widget   = Y.Widget,
    Position = Y.WidgetPosition,
    Node     = Y.Node,
    NAMESPACE= 'Saw',
    DISPLAY  = 'display',
    NONE     = 'none',
    CONSTRUCTOR= 'Timepicker';
    
    /* utils */
    function pad(num){
        return (num < 10) ? '0' + num : num;
    };
    
    
    function makeCell(str, rowId){
        var nodeId = 'cn-' + str;
       //rowLookup[nodeId] = rowId;
        var str = '<li id="'+nodeId+'" class=" c-cell c-'+str+'"><span>'+str+'</span></li>';
        return str;
    }

    function makeRow(str, c){
        return '<ol id="'+c+'" class="c-row">'+str+'</ol>';
    }
    
    function Timepicker(config){
         Timepicker.superclass.constructor.apply(this, arguments); 
    }        
    
    Timepicker.NAME = 'timepicker';
    
    Timepicker.ATTRS = {
    
        strings: {
            value: {
                am : "AM",
                pm : "PM"
            }
        }
    };
    
    Timepicker.HOUR_CLASS = Y.ClassNameManager.getClassName(Timepicker.NAME, "hour");
    Timepicker.MINUTE_CLASS = Y.ClassNameManager.getClassName(Timepicker.NAME, "minute");
    Timepicker.AMPM_CLASS = Y.ClassNameManager.getClassName(Timepicker.NAME, "ampm");
    Timepicker.HIDDEN = Y.ClassNameManager.getClassName(Timepicker.NAME, "hidden");
    
    Y.extend(Timepicker, Widget, {
              initializer:function(){
                 
              },
              
              destructor: function(){
                  
              },
              
              _handleOver:function(){
                  console.log('over');
              },
              
              renderUI: function(){
       
                  var cb = this.get('contentBox');
                 
                  var rowStrings = [];
                  rowStrings.push(makeRow(makeCell('AM','prefix')+makeCell('PM','prefix'), 'c-prefix'));
                  var hour ='', minute='';
                  for(var i=1; i<=12; i++){
                      hour += makeCell(i , 'hour');
                  }
                  rowStrings.push(makeRow(hour, 'c-hour'));
       
                  for(var i=0; i<=45; i= i +15){
                      minute += makeCell(i, 'minute');
                  }
       
                  rowStrings.push(makeRow(minute, 'c-minute'));
       
                  cb.set('innerHTML', rowStrings.join(''));
                  cb.setXY([0,0]);
                  cb.setStyle(DISPLAY, 'block');
                  // cb.on('click', handleClicks);
                  // 
                  //                  .on('mouseover', handleOver);
              },
              
              // show: function(){
              //     this.set('hidden', false);
              //     this.syncUI();
              // },
              // 
              // hide: function(){
              //     
              //     this.set('hidden', true);
              //     this.syncUI();
              // },
              
              bindUI: function(){
                  var cb = this.get('contentBox')

                  cb.on('mouseover', this._handleOver);
              },
              
              syncUI: function(){
                  if(this.get('hidden')){
                      this.get('contentBox').addClass(Timepicker.HIDDEN);
                  }else{
                      this.get('contentBox').removeClass(Timepicker.HIDDEN);
                  }
              }
          });
          
    Y.Base.build(Timepicker.NAME, Timepicker, [Y.WidgetPosition, Y.WidgetStack], {dynamic:false});
    Y.namespace(NAMESPACE +'.'+CONSTRUCTOR);
    Y[NAMESPACE][CONSTRUCTOR] = Timepicker;
    
    
}, '3.0.0b1', {requires:['oop', 'event-custom', 'attribute','base', 'dom', 'classnamemanager','widget', 'widget-position','widget-position-ext','widget-stack','event']});