YUI.add('timepicker', function(Y){
    
    var Lang    = Y.Lang,
    Widget      = Y.Widget,
    Position    = Y.WidgetPosition,
    Node        = Y.Node,
    getClassName= Y.ClassNameManager.getClassName,
    NAMESPACE   = 'p',
    DISPLAY     = 'display',
    NONE        = 'none',
    CONSTRUCTOR = 'Timepicker',
    CELL_CLASS  = 'cell',
    HOUR_CLASS  = 'hour',
    MINUTE_CLASS= 'minute',
    AMPM_CLASS  = 'ampm',
    ROW         = 'row',
    HOUR_ROW    = 'hourrow',
    MINUTE_ROW  = 'minuterow',
    AMPM_ROW    = 'ampmrow';
    
    /* utils */
    function pad(num){
        return (num < 10) ? '0' + num : num;
    };
    
//<span class="'+Timepicker[CELL_CLASS]+' '+Timepicker[rowId]+'">'+str+'</span>
    
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
    
    Timepicker.NAME = 'timepicker';
    
    Timepicker.ATTRS = {
        
        time:{
            value:{
                ampm:'am',
                hour:0,
                minute:0
            }
        },
    
        strings: {
            value: {
                am : "AM",
                pm : "PM"
            }
        }
    };
    
    Timepicker[HOUR_CLASS] = getClassName(Timepicker.NAME, HOUR_CLASS);
    Timepicker[MINUTE_CLASS] = getClassName(Timepicker.NAME, MINUTE_CLASS);
    Timepicker[AMPM_CLASS] = getClassName(Timepicker.NAME, AMPM_CLASS);
    Timepicker[HOUR_CLASS] = getClassName(Timepicker.NAME, HOUR_CLASS, ROW);
    Timepicker[MINUTE_CLASS] = getClassName(Timepicker.NAME, MINUTE_CLASS, ROW);
    Timepicker[CELL_CLASS] = getClassName(Timepicker.NAME, CELL_CLASS);
    
    
    Y.extend(Timepicker, Widget, {
        
              _model : {ampm:{},hour:{},minute:{}},
        
            
              initializer:function(){
                 
              },
              
              destructor: function(){
                  
              },
              
              _handleClick:function(e){
          
                  if(e.target.test('.'+Timepicker[CELL_CLASS])){
                      console.log('cell');
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
                          this.set('time.ampm', value);
                      }else{
                          this.set('time.minute', value);
                      }
                      
                  }
                  this.syncUI();
              },
              
              renderUI: function(){
       
                  var cb = this.get('contentBox'),
                       m = this._model;
                  this.set('xy',[20,20]);
                  var row1 = cb.create('<ol>'),
                      row2 = cb.create('<ol>'),
                      row3 = cb.create('<ol>');
                  
                  var am = row1.create(makeCell('AM',AMPM_CLASS)),
                      pm = row1.create(makeCell('PM',AMPM_CLASS));
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
       

                  cb.appendChild(row1);
                  cb.appendChild(row2);
                  cb.appendChild(row3);
                 // cb.set('innerHTML', rowStrings.join(''));
                  cb.setXY([0,0]);
                  cb.setStyle(DISPLAY, 'block');
                  
                 
              },

              
              bindUI: function(){
                  var cb = this.get('contentBox');
                  cb.on('click', this._handleClick, this);
                  cb.on('mouseover', this._handleOver, this);
              },
              
              syncUI: function(){
                  var time = this.get('time');
                  cells = this.get('contentBox').queryAll('li');
                  cells.each(function(cell){
                      cell.removeClass('active');
                  });
                  
              }
          });
          
    Y.Base.build(Timepicker.NAME, Timepicker, [Y.WidgetPosition, Y.WidgetStack], {dynamic:false});
    Y.namespace(NAMESPACE +'.'+CONSTRUCTOR);
    Y[NAMESPACE][CONSTRUCTOR] = Timepicker;
    
    
}, '3.0.0b1', {requires:['oop', 'event-custom', 'attribute','base', 'dom', 'classnamemanager','widget', 'widget-position','widget-position-ext','widget-stack','event']});