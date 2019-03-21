
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min_hs_score').val(), 10 );
        var max = parseInt( $('#max_hs_score').val(), 10 );
        var score = parseFloat( data[2] ) || 0; // use data for the age column

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
