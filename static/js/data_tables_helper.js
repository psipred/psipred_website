$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min;
        var max;
        var score;
        if(settings.sTableId === 'hspred_table'){
          min = parseFloat( $('#min_hs_score').val(), 10 );
          max = parseFloat( $('#max_hs_score').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'metsite_table'){
          min = parseFloat( $('#min_met_score').val());
          max = parseFloat( $('#max_met_score').val());
          score = parseFloat( data[1] ) || 0;
        }

        if(settings.sTableId === 'bp_table'){
          min = parseFloat( $('#min_bp_prob').val(), 10 );
          max = parseFloat( $('#max_bp_prob').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'mf_table'){
          min = parseFloat( $('#min_mf_prob').val(), 10 );
          max = parseFloat( $('#max_mf_prob').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'cc_table'){
          min = parseFloat( $('#min_cc_prob').val(), 10 );
          max = parseFloat( $('#max_cc_prob').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }

        if(settings.sTableId === 'gen_table'){
          min = parseFloat( $('#min_gen_pval').val(), 10 );
          max = parseFloat( $('#max_gen_pval').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'pgen_table'){
          min = parseFloat( $('#min_pgen_pval').val(), 10 );
          max = parseFloat( $('#max_pgen_pval').val(), 10 );
          score = parseFloat( data[2] ) || 0;
        }
        if(settings.sTableId === 'dgen_table'){
          min = parseFloat( $('#min_dgen_pval').val(), 10 );
          max = parseFloat( $('#max_dgen_pval').val(), 10 );
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
