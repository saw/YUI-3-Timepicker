YUI.add('timepicker', function(Y){
    
    var Lang = Y.Lang,
    Widget   = Y.Widget,
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
    
    function Timepicker(config) {
        
        Timepicker.superclass.constructor.apply(this, arguments);

    };
    
    Timepicker.NAME = "timepicker";
    
    Timepicker.ATTRS = {
    
        strings: {
            value: {
                am : "AM",
                pm : "PM"
            }
        }
    };

    Y.extend(Timepicker, Widget, {
        initializer:function(){
            
        },
        
        destructor: function(){
            
        },
        
        renderUI: function(){

            myNode = this.get('contentBox');
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


            //bd.appendChild(myNode);

            myNode.set('innerHTML', rowStrings.join(''));
            myNode.setXY([0,0]);
            myNode.setStyle(DISPLAY, 'block');
            // myNode.on('click', handleClicks);
            // 
            //            myNode.on('mouseover', handleOver);
        },
        
        bindUI: function(){
            
        },
        
        syncUI: function(){
            
        }
    });
    
    Y.namespace(NAMESPACE +'.'+CONSTRUCTOR);
    Y[NAMESPACE][CONSTRUCTOR] = Timepicker;
    
    
}, '3.0.0b1', {requires:['selector','oop','attribute','dom','classnamemanager','event','widget']});