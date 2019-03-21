$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min;
        var max;
        var score;
        if(settings.sTableId === 'hspred_table'){
          min = parseInt( $('#min_hs_score').val(), 10 );
          max = parseInt( $('#max_hs_score').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'metsite_table'){
          min = parseInt( $('#min_met_score').val(), 10 );
          max = parseInt( $('#max_met_score').val(), 10 );
          score = parseFloat( data[1] ) || 0;
        }

        if(settings.sTableId === 'bp_table'){
          min = parseInt( $('#min_bp_prob').val(), 10 );
          max = parseInt( $('#max_bp_prob').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'mf_table'){
          min = parseInt( $('#min_mf_prob').val(), 10 );
          max = parseInt( $('#max_mf_prob').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'cc_table'){
          min = parseInt( $('#min_cc_prob').val(), 10 );
          max = parseInt( $('#max_cc_prob').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        
        if(settings.sTableId === 'gen_table'){
          min = parseInt( $('#min_gen_pval').val(), 10 );
          max = parseInt( $('#max_gen_pval').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'mgen_table'){
          min = parseInt( $('#min_mgen_pval').val(), 10 );
          max = parseInt( $('#max_mgen_pval').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'dgen_table'){
          min = parseInt( $('#min_dgen_pval').val(), 10 );
          max = parseInt( $('#max_dgen_pval').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }

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
