var specificDates = ['24/12/2014','17/12/2014'];
var hoursToTakeAway = [[14,15],[17]];

var datetimepicker = $("#datetime").datetimepicker({
    format:'d.m.Y H:i',
    inline:true,
    theme:"dark",
    onGenerate:function(ct,$i){
        var ind = specificDates.indexOf(ct);
        $('.xdsoft_time_variant .xdsoft_time').show();
        if(ind !== -1) {
            $('.xdsoft_time_variant .xdsoft_time').each(function(index){
                if(hoursToTakeAway[ind].indexOf(parseInt($(this).text())) !== -1){
                    console.log($(this).text() + "sdadsa");
                    $(this).hide();        
                }
            });
        }
    }
});
