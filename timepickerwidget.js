YUI.add('timepicker', function(Y){
    
    var Lang    = Y.Lang,
    Widget      = Y.Widget,
    Position    = Y.WidgetPosition,
    Node        = Y.Node,
    getClassName= Y.ClassNameManager.getClassName,
    NAMESPACE   = 'p',
    DISPLAY     = 'display',
    CONSTRUCTOR = 'Timepicker',
    NONE        = 'none',
    CELL_CLASS  = 'cell',
    HOUR_CLASS  = 'hour',
    MINUTE_CLASS= 'minute',
    AMPM_CLASS  = 'ampm',
    AM          = 0,
    PM          = 1,
    NAME        = 'NAME',
    ROW         = 'row';
    
    /* utils */
    function pad(num){
        return (num < 10) ? '0' + num : num;
    };

    function makeCell(str, rowId){
        var thisClass = Y.ClassNameManager.getClassName(Timepicker.NAME, Timepicker[str]);
        var str = '<li class="'+thisClass+' '+Timepicker[CELL_CLASS]+' '+Timepicker[rowId]+'">'+str+'</li>';
        return str;
    }

    function makeRow(str, c){
        return '<ol>'+str+'</ol>';
    }
    
    function Timepicker(config){
         Timepicker.superclass.constructor.apply(this, arguments); 
    }        
    
    Timepicker[NAME] = 'timepicker';
    
    Timepicker.ATTRS = {
        
        separator:{
          value:{
              
          }  
        },
        
        time:{
            value:{
                hour:0,
                minute:0,
                ampm:AM
            }
        },
    
        strings: {
            value: {
                am : "AM",
                pm : "PM",
                seperator : ':'
            }
        }
    };
    
    Timepicker[HOUR_CLASS] = getClassName(Timepicker[NAME], HOUR_CLASS);
    Timepicker[MINUTE_CLASS] = getClassName(Timepicker[NAME], MINUTE_CLASS);
    Timepicker[AMPM_CLASS] = getClassName(Timepicker[NAME], AMPM_CLASS);
    Timepicker[HOUR_CLASS] = getClassName(Timepicker[NAME], HOUR_CLASS, ROW);
    Timepicker[MINUTE_CLASS] = getClassName(Timepicker[NAME], MINUTE_CLASS, ROW);
    Timepicker[CELL_CLASS] = getClassName(Timepicker[NAME], CELL_CLASS);
    
    
    Y.extend(Timepicker, Widget, {
        
        
              /* static vars */
              
              AM:AM,
              
              PM:PM,
        
              _model : {ampm:{},hour:{},minute:{}},
              
        
            
              initializer:function(){
                  
                  this.set('time.ampm', this.get('strings.am'));
            
                  
              },
              
              destructor: function(){
                  
                  delete(this._model.ampm);
                  delete(this._model.hour);
                  delete(this._model.minute);
                  
              },
              
              _syncTime:function(){
                  var time = this.get('time'),
                  ampm = this.get('time.ampm'),
                  strings = this.get('strings'),
                  seperator = this.get('strings.seperator');
                  
                  ampmString = (ampm == AM) ? this.get('strings.am') : this.get('strings.pm');
                  this.set('time.12hour', time.hour + seperator + time.minute + ampmString);
                  
                  var hour = (ampm == PM) ? parseInt(time.hour,10) + 12 : parseInt(time.hour,10);
     
                  if(hour == 24 || hour == 0 ) hour = Math.abs(hour-12);

                  
                  this.set('time.24hour', hour + seperator + time.minute);
                  
                  console.log(this.get('time'));
                  this.fire('timechange', this.get('time'));
              },
              
              _handleClick:function(e){
          
                  if(e.target.test('.'+Timepicker[CELL_CLASS])){
                      this.fire('cellclick', this.get('time'));
                  }
              },
              
              _handleOver:function(e){
                  var targ = e.target;
                  if(targ.test('.'+Timepicker[CELL_CLASS])){
                      var time = {};
                     
                      var value = e.target.get('innerHTML');
                      if(targ.hasClass(Timepicker[HOUR_CLASS])){
                          this.set('time.hour',value);
                      }else if (targ.hasClass(Timepicker[AMPM_CLASS])){
                          var amString = this.get('strings.am'),
                              pmString = this.get('strings.pm');
                              
                          if(value == amString){
                              this.set('time.ampm', AM);
                          } else{
                              this.set('time.ampm', PM);
                          }
                          
                      }else{
                          this.set('time.minute', value);
                      }
                      
                  }
                  this._syncTime();
                  
                  this.syncUI();
              },
              
              renderUI: function(){
                  //FIXME: This could be more efficient!
                  var cb = this.get('contentBox'),
                       m = this._model;

                  var row1 = cb.create('<ol>'),
                      row2 = cb.create('<ol>'),
                      row3 = cb.create('<ol>');
                  
                  var am = row1.create(makeCell(this.get('strings.am'),AMPM_CLASS)),
                      pm = row1.create(makeCell(this.get('strings.pm'),AMPM_CLASS));
                  m[AMPM_CLASS]['AM'] = am;
                  m[AMPM_CLASS]['PM'] = pm;
                  row1.appendChild(am);
                  row1.appendChild(pm);
                  for(var i=1; i<=12; i++){
                      var cell = row2.create(makeCell(i , HOUR_CLASS));
                      m[HOUR_CLASS][i] = cell;
                      row2.appendChild(cell);
                  }
                  for(var i=0; i<=45; i= i +15){
                      var cell = row3.create(makeCell(i , MINUTE_CLASS));
                      m[MINUTE_CLASS][i] = cell;
                      row3.appendChild(cell);
                  }
                  
                  var parent = cb.create('<div>');
                  
                  parent.appendChild(row1);
                  parent.appendChild(row2);
                  parent.appendChild(row3);
                  cb.appendChild(parent);
            
                  
                 
              },
              
              toggle: function(){
                  this[(this.get('visible') ? 'hide' : 'show')]();
              },
              
              bindUI: function(){
                  var cb = this.get('contentBox');
                  cb.on('click', this._handleClick, this);
                  cb.on('mouseover', this._handleOver, this);
              },
              
              syncUI: function(){
                  var time = this.get('time');
                  cells = this.get('contentBox').queryAll('li');
                  cells.removeClass('active');
                  var m = this._model;
                  if(time.ampm == AM){
                      m.ampm.AM.addClass('active');
                  }else if(time.ampm == PM){
                      m.ampm.PM.addClass('active');
                  }
                  m.minute[time.minute].addClass('active');
                  m.hour[time.hour].addClass('active');
                    
              }
          });
          
    Y.Base.build(Timepicker.NAME, Timepicker, {dynamic:false});
    Y.namespace(NAMESPACE +'.'+CONSTRUCTOR);
    Y[NAMESPACE][CONSTRUCTOR] = Timepicker;
    
    
}, '3.0.0b1', {requires:['oop', 'event-custom', 'attribute','base', 'dom', 'classnamemanager','widget','event']});