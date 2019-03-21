$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        console.log("SETTINGS ID: "+settings.sTableId);
        var min;
        var max;
        var score;
        min = parseInt( $('#min_hs_score').val(), 10 );
        max = parseInt( $('#max_hs_score').val(), 10 );
        score = parseFloat( data[2] ) || 0;

        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && score <= max ) ||
             ( min <= score   && isNaN( max ) ) ||
             ( min <= score   && score <= max ) )
        {
            return true;
        }
        return false;
    }
);
