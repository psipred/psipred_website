$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        console.log(settings.sTableId);
        var min = parseInt( $('#min_hs_score').val(), 10 );
        var max = parseInt( $('#max_hs_score').val(), 10 );
        var score = parseFloat( data[2] ) || 0;

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
