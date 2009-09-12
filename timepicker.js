YUI.add('timewidget', function(Y){
    
    //strings
    var DISPLAY = 'display',
    TIMECHANGE  = 'timechange',
    ACTIVE_CLASS      = 'active';
    
    function pad(num){
        return (num < 10) ? '0' + num : num;
    };

    var TimeHolder = function(pos){

        var _pos = pos,
        myNode   = false,
        rowLookup = {},
        rowStrings = [],
        E_ROW = {
            'prefix':0,
            'hour':1,
            'minute':2
        },
        state = {
            'prefix':0,
            'hour'  :0,
            'minute':0
        };

        function handleClicks(e){

            myNode.setStyle(DISPLAY,'none');
            th.fire(TIMECHANGE, state);
        }

        function move(p){
            myNode.setXY(p);
        }

        function clearRow(row){
            var n = Y.get('#c-'+row);
            var nl = n.queryAll('.c-cell');
            nl.removeClass(ACTIVE_CLASS);  
        }

        function setSelected(row, cell){
            clearRow(row);
            cell.addClass(ACTIVE_CLASS);
            th.fire(TIMECHANGE, state);
        }

        function setState(prefix, value){
            setSelected(prefix, value);

            //this is a little slow, non blocking please
            Y.Lang.later(0, this, function(){
                 state[prefix] = value.get('firstChild').get('innerHTML');
                 th.fire('timechange', state);
            });
        }

        var id = 0;


        function makeCell(str, rowId){
            var nodeId = 'cn-' + str;
            rowLookup[nodeId] = rowId;
            var str = '<li id="'+nodeId+'" class=" c-cell c-'+str+'"><span>'+str+'</span></li>';
            return str;
        }

        function makeRow(str, c){
            return '<ol id="'+c+'" class="c-row">'+str+'</ol>';
        }

        function handleOver(e){
            var target = e.target;
            if(target.test('.c-cell')){  
               var thisRow = rowLookup[target.get('id')];
               setState(thisRow, target);
            }

        }

        function doRender(){
            var bd = Y.get(document.body);
            myNode = bd.create('<div class="c-timeholder"></div>');

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


            bd.appendChild(myNode);

            myNode.set('innerHTML', rowStrings.join(''));
            myNode.setXY(_pos);
            myNode.setStyle(DISPLAY, 'none');
            myNode.on('click', handleClicks);

            myNode.on('mouseover', handleOver);
        };

        var th = {
            setPos:function(p){
                move(p);
            },

            render:function(){
                doRender();
            },

            show:function(){
                myNode.setStyle(DISPLAY, 'block');

            },

            hide:function(){
                myNode.setStyle(DISPLAY, 'none');
            },
            
            padTime:pad,

            pos:_pos
        };

        Y.augment(th, Y.Event.Target);

        return th;
    };
    
    Y.namespace('Timepicker');
    Y.Timepicker = TimeHolder;
   
}, '3.0.0b1', {requires:['node', 'event']});