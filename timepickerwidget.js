YUI.add('timepicker', function(Y){
    
    var Lang = Y.Lang,
    Widget   = Y.Widget,
    Node     = Y.Node,
    NAMESPACE= 'Saw',
    CONSTRUCTOR= 'Timepicker';
    
    /* utils */
    function pad(num){
        return (num < 10) ? '0' + num : num;
    };
    
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
            
        },
        
        bindUI: function(){
            
        },
        
        syncUI: function(){
            
        }
    });
    
    Y.namespace(NAMESPACE +'.'+CONSTRUCTOR);
    Y[NAMESPACE][CONSTRUCTOR] = Timepicker;
    
    
}, '3.0.0b1', {requires:['selector','oop','attribute','dom','classnamemanager','event','widget']});