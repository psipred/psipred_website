var psipred =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["i"] = parse_metsite;
/* harmony export (immutable) */ __webpack_exports__["h"] = parse_ffpreds;
/* harmony export (immutable) */ __webpack_exports__["g"] = parse_featcfg;
/* unused harmony export get_memsat_ranges */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse_ss2;
/* harmony export (immutable) */ __webpack_exports__["b"] = parse_pbdat;
/* harmony export (immutable) */ __webpack_exports__["c"] = parse_comb;
/* harmony export (immutable) */ __webpack_exports__["d"] = parse_memsatdata;
/* harmony export (immutable) */ __webpack_exports__["e"] = parse_presult;
/* harmony export (immutable) */ __webpack_exports__["f"] = parse_parseds;
// parse the small metsite output table
function parse_metsite(ractive, file) {
  let metsite_table = '<br /><table><tr><td bgcolor="#ff0000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Metal Binding Contact</td></tr>';
  metsite_table += '<tr><td bgcolor="#000000" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Chain not predicted</td></tr>';
  metsite_table += '<tr><td bgcolor="#0000ff" style="border-style:solid; border-width:1px; border-color:#000000">&nbsp;&nbsp;</td><td>&nbsp;Predicted chain</td></tr></table><br />';
  metsite_table += '<table><tr><th>Residue Number</th><th>Raw Neural Network Score</th><th>Residue</th>';
  let hit_regex = /\d+\s.+?\s\w{3}\d+/g;
  let hit_matches = file.match(hit_regex);
  if (hit_matches) {
    hit_matches.forEach(function (line, i) {
      let entries = line.split(/\s/);
      metsite_table += '<tr><td>' + entries[0] + '</td><td>' + entries[1] + '</td><td>' + entries[2] + '</td></tr>';
    });
  }
  metsite_table += '<table>';
  ractive.set('metsite_table', metsite_table);
}

function parse_ffpreds(ractive, file) {

  let lines = file.split('\n');
  let bp_data = [];
  let mf_data = [];
  let cc_data = [];
  let table_data = '';
  lines.forEach(function (line, i) {
    if (line.startsWith('#')) {
      return;
    }
    let entries = line.split('\t');
    if (entries.length < 4) {
      return;
    }
    if (entries[3] === 'BP') {
      bp_data.push(entries);
    }
    if (entries[3] === 'CC') {
      cc_data.push(entries);
    }
    if (entries[3] === 'MF') {
      mf_data.push(entries);
    }
  });

  table_data += "<b>Biological Process Predictions</b><br />";
  table_data += "<table><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
  bp_data.forEach(function (entries, i) {
    let class_colour = 'safe';
    if (entries[2] === 'L') {
      class_colour = 'notsafe';
    }
    table_data += '<tr class="' + class_colour + '">';
    table_data += '<td>' + entries[1] + '</td>';
    table_data += '<td>' + entries[4] + '</td>';
    table_data += '<td>' + entries[0] + '</td>';
    table_data += '<td>' + entries[2] + '</td>';
    table_data += '</tr>';
  });
  table_data += '</table><br />';
  ractive.set('function_tables', table_data);

  table_data += "<b>Molecular Function Predictions</b><br />";
  table_data += "<table><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
  mf_data.forEach(function (entries, i) {
    let class_colour = 'safe';
    if (entries[2] === 'L') {
      class_colour = 'notsafe';
    }
    table_data += '<tr class="' + class_colour + '">';
    table_data += '<td>' + entries[1] + '</td>';
    table_data += '<td>' + entries[4] + '</td>';
    table_data += '<td>' + entries[0] + '</td>';
    table_data += '<td>' + entries[2] + '</td>';
    table_data += '</tr>';
  });
  table_data += '</table><br />';
  ractive.set('function_tables', table_data);

  table_data += "<b>Cellular Component Predictions</b><br />";
  table_data += "<table><tr><th>GO term</th><th>Name</th><th>Prob</th><th>SVM Reliability</th></tr>";
  cc_data.forEach(function (entries, i) {
    let class_colour = 'safe';
    if (entries[2] === 'L') {
      class_colour = 'notsafe';
    }
    table_data += '<tr class="' + class_colour + '">';
    table_data += '<td>' + entries[1] + '</td>';
    table_data += '<td>' + entries[4] + '</td>';
    table_data += '<td>' + entries[0] + '</td>';
    table_data += '<td>' + entries[2] + '</td>';
    table_data += '</tr>';
  });
  table_data += '</table><br />';
  table_data += 'These prediction terms represent terms predicted where SVM training includes assigned GO terms across all evidence code types. SVM reliability is regarded as High (H) when MCC, sensitivity, specificity and precision are jointly above a given threshold. otherwise Reliability is indicated as Low (L). <br />';
  ractive.set('function_tables', table_data);
}

function set_aanorm() {
  let hAA_norm = {};
  hAA_norm.A = { val: 0.071783248006309,
    sde: 0.027367661524275 };
  hAA_norm.V = { val: 0.059624595369901,
    sde: 0.020377791528745 };
  hAA_norm.Y = { val: 0.026075068240437,
    sde: 0.014822471531379 };
  hAA_norm.W = { val: 0.014166002612771,
    sde: 0.010471835801996 };
  hAA_norm.T = { val: 0.052593582972714,
    sde: 0.020094793964597 };
  hAA_norm.S = { val: 0.082123241332099,
    sde: 0.028687566081512 };
  hAA_norm.P = { val: 0.065557531322241,
    sde: 0.034239398496736 };
  hAA_norm.F = { val: 0.037103994969002,
    sde: 0.018543423139186 };
  hAA_norm.M = { val: 0.022562818183955,
    sde: 0.011321039662481 };
  hAA_norm.K = { val: 0.054833979269185,
    sde: 0.029264083667157 };
  hAA_norm.L = { val: 0.10010591575906,
    sde: 0.030276808519009 };
  hAA_norm.I = { val: 0.042034526040467,
    sde: 0.020826849262495 };
  hAA_norm.H = { val: 0.027141403537598,
    sde: 0.01550566378985 };
  hAA_norm.G = { val: 0.069179820104536,
    sde: 0.030087562057328 };
  hAA_norm.Q = { val: 0.065920561931801,
    sde: 0.030103091008366 };
  hAA_norm.E = { val: 0.04647846225838,
    sde: 0.019946269461736 };
  hAA_norm.C = { val: 0.024908551872056,
    sde: 0.020822909589504 };
  hAA_norm.D = { val: 0.044337904726041,
    sde: 0.018436677256726 };
  hAA_norm.N = { val: 0.033507020987033,
    sde: 0.016536022288204 };
  hAA_norm.R = { val: 0.05974046903119,
    sde: 0.025165994773384 };
  return hAA_norm;
}

function set_fnorm() {
  let hF_norm = {};
  hF_norm.hydrophobicity = { val: -0.34876828080152,
    sde: 0.75559152769799 };
  hF_norm['percent positive residues'] = { val: 11.457717466948,
    sde: 3.567133341139 };
  hF_norm['aliphatic index'] = { val: 79.911549319099,
    sde: 16.787617978827 };
  hF_norm['isoelectric point'] = { val: 7.6102046383603,
    sde: 1.9716111020088 };
  hF_norm['molecular weight'] = { val: 48668.412839961,
    sde: 37838.324895969 };
  hF_norm.charge = { val: 5.0991763057604,
    sde: 16.83863659025 };
  hF_norm['percent negative residues'] = { val: 11.026190128176,
    sde: 4.0206631680926 };
  hF_norm['molar extinction coefficient'] = { val: 46475.293923926,
    sde: 39299.399848823 };
  return hF_norm;
}

function get_aa_color(val) {
  let ab_val = Math.abs(val);
  if (ab_val >= 2.96) {
    if (val > 0) {
      return "signif1p";
    }
    return "signif1n";
  } else if (ab_val >= 2.24) {
    if (val > 0) {
      return "signif2p";
    }
    return "signif2n";
  } else if (ab_val >= 1.96) {
    if (val > 0) {
      return "signif5p";
    }
    return "signif5n";
  } else if (ab_val >= 1.645) {
    if (val > 0) {
      return "signif10p";
    }
    return "signif10n";
  }
  return "plain";
}

//parse the ffpred featcfo features file
function parse_featcfg(ractive, file) {
  let lines = file.split('\n');
  let SF_data = {};
  let AA_data = {};
  let hF_norm = set_fnorm();
  let hAA_norm = set_aanorm();
  lines.forEach(function (line, i) {
    if (line.startsWith("AA")) {
      let columns = line.split('\t');
      AA_data[columns[1]] = columns[2];
    }
    if (line.startsWith("SF")) {
      let columns = line.split('\t');
      SF_data[columns[1]] = columns[2];
    }
  });

  // build html tables for the feature data
  let class_colour = '';
  let global_features = ractive.get('global_features');
  let feat_table = '<b>Global Features</b><br />';
  feat_table += 'Global features are calculated directly from sequence. Localisation values are predicted by the Psort algorithm and reflect the relative likelihood of the protein occupying different cellular localisations. The bias column is highlighted according to the significance of the feature value calculated from Z score of the feature.<br />';
  feat_table += '<table><tr><th>Feature Name</th><th>Value</th><th>Bias</th></tr>';

  Object.keys(SF_data).sort().forEach(function (feature_name) {
    let class_colour = '';
    if (feature_name in hF_norm) {
      class_colour = get_aa_color((parseFloat(SF_data[feature_name]) - hF_norm[feature_name].val) / hF_norm[feature_name].sde);
    }
    feat_table += '<tr><td>' + feature_name + '</td><td>' + parseFloat(SF_data[feature_name]).toFixed(2) + '</td><td class="' + class_colour + '">&nbsp;&nbsp;&nbsp;</td></tr>';
  });
  feat_table += '</table>';
  ractive.set('global_features', feat_table);

  //build html table for the AA data
  let aa_composition = ractive.get('aa_composition');
  let aa_table = '<b>Amino Acid Composition (percentages)</b><br />';
  aa_table += '<table><tr>';
  Object.keys(AA_data).sort().forEach(function (residue) {
    aa_table += '<th>' + residue + '</th>';
  });
  aa_table += '</tr><tr>';
  Object.keys(AA_data).sort().forEach(function (residue) {
    let class_colour = '';
    class_colour = get_aa_color((parseFloat(AA_data[residue]) - hAA_norm[residue].val) / hAA_norm[residue].sde);
    aa_table += '<td class="' + class_colour + '">' + (parseFloat(AA_data[residue]) * 100).toFixed(2) + '</td>';
  });
  aa_table += '</tr></table><br />';
  aa_table += '<b>Significance Key</b><br />';
  aa_table += '<table class="signifkey" align="center" cellpadding="2" cellspacing="0">';
  aa_table += '<tr>';
  aa_table += '<td><b>low</b></td>';
  aa_table += '<td colspan="9">&nbsp;</td>';
  aa_table += '<td align="right"><b>high</b></td>';
  aa_table += '</tr>';
  aa_table += '<tr>';
  aa_table += '<td></td>';
  aa_table += '<td class="signif1n">p &lt; 0.01</td>';
  aa_table += '<td class="signif2n">p &lt; 0.02</td>';
  aa_table += '<td class="signif5n">p &lt; 0.05</td>';
  aa_table += '<td class="signif10n">p &lt; 0.1</td>';
  aa_table += '<td>p &gt;= 0.1</td>';
  aa_table += '<td class="signif10p">p &lt; 0.1</td>';
  aa_table += '<td class="signif5p">p &lt; 0.05</td>';
  aa_table += '<td class="signif2p">p &lt; 0.02</td>';
  aa_table += '<td class="signif1p">p &lt; 0.01</td>';
  aa_table += '<td></td>';
  aa_table += '</tr>';
  aa_table += '<tr>';
  aa_table += '<td colspan="11">Significance p value is calculated using the Z score of the percent amino acid composition</td>';
  aa_table += '</tr>';
  aa_table += '</table>';
  ractive.set('aa_composition', aa_table);
}

// for a given memsat data files extract coordinate ranges given some regex
function get_memsat_ranges(regex, data) {
  let match = regex.exec(data);
  if (match[1].includes(',')) {
    let regions = match[1].split(',');
    regions.forEach(function (region, i) {
      regions[i] = region.split('-');
      regions[i][0] = parseInt(regions[i][0]);
      regions[i][1] = parseInt(regions[i][1]);
    });
    return regions;
  } else if (match[1].includes('-')) {
    // console.log(match[1]);
    let seg = match[1].split('-');
    let regions = [[]];
    regions[0][0] = parseInt(seg[0]);
    regions[0][1] = parseInt(seg[1]);
    return regions;
  }
  return match[1];
}

// take and ss2 (file) and parse the details and write the new annotation grid
function parse_ss2(ractive, file) {
  let annotations = ractive.get('annotations');
  let lines = file.split('\n');
  lines.shift();
  lines = lines.filter(Boolean);
  if (annotations.length == lines.length) {
    lines.forEach(function (line, i) {
      let entries = line.split(/\s+/);
      annotations[i].ss = entries[3];
    });
    ractive.set('annotations', annotations);
    biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
  } else {
    alert("SS2 annotation length does not match query sequence");
  }
  return annotations;
}

//take the disopred pbdat file, parse it and add the annotations to the annotation grid
function parse_pbdat(ractive, file) {
  let annotations = ractive.get('annotations');
  let lines = file.split('\n');
  lines.shift();lines.shift();lines.shift();lines.shift();lines.shift();
  lines = lines.filter(Boolean);
  if (annotations.length == lines.length) {
    lines.forEach(function (line, i) {
      let entries = line.split(/\s+/);
      if (entries[3] === '-') {
        annotations[i].disopred = 'D';
      }
      if (entries[3] === '^') {
        annotations[i].disopred = 'PB';
      }
    });
    ractive.set('annotations', annotations);
    biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
  }
}

//parse the disopred comb file and add it to the annotation grid
function parse_comb(ractive, file) {
  let precision = [];
  let lines = file.split('\n');
  lines.shift();lines.shift();lines.shift();
  lines = lines.filter(Boolean);
  lines.forEach(function (line, i) {
    let entries = line.split(/\s+/);
    precision[i] = {};
    precision[i].pos = entries[1];
    precision[i].precision = entries[4];
  });
  ractive.set('diso_precision', precision);
  biod3.genericxyLineChart(precision, 'pos', ['precision'], ['Black'], 'DisoNNChart', { parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
}

//parse the memsat output
function parse_memsatdata(ractive, file) {
  let annotations = ractive.get('annotations');
  let seq = ractive.get('sequence');
  //console.log(file);
  let topo_regions = get_memsat_ranges(/Topology:\s+(.+?)\n/, file);
  let signal_regions = get_memsat_ranges(/Signal\speptide:\s+(.+)\n/, file);
  let reentrant_regions = get_memsat_ranges(/Re-entrant\shelices:\s+(.+?)\n/, file);
  let terminal = get_memsat_ranges(/N-terminal:\s+(.+?)\n/, file);
  //console.log(signal_regions);
  // console.log(reentrant_regions);
  let coil_type = 'CY';
  if (terminal === 'out') {
    coil_type = 'EC';
  }
  let tmp_anno = new Array(seq.length);
  if (topo_regions !== 'Not detected.') {
    let prev_end = 0;
    topo_regions.forEach(function (region) {
      tmp_anno = tmp_anno.fill('TM', region[0], region[1] + 1);
      if (prev_end > 0) {
        prev_end -= 1;
      }
      tmp_anno = tmp_anno.fill(coil_type, prev_end, region[0]);
      if (coil_type === 'EC') {
        coil_type = 'CY';
      } else {
        coil_type = 'EC';
      }
      prev_end = region[1] + 2;
    });
    tmp_anno = tmp_anno.fill(coil_type, prev_end - 1, seq.length);
  }
  //signal_regions = [[70,83], [102,117]];
  if (signal_regions !== 'Not detected.') {
    signal_regions.forEach(function (region) {
      tmp_anno = tmp_anno.fill('S', region[0], region[1] + 1);
    });
  }
  //reentrant_regions = [[40,50], [200,218]];
  if (reentrant_regions !== 'Not detected.') {
    reentrant_regions.forEach(function (region) {
      tmp_anno = tmp_anno.fill('RH', region[0], region[1] + 1);
    });
  }
  tmp_anno.forEach(function (anno, i) {
    annotations[i].memsat = anno;
  });
  ractive.set('annotations', annotations);
  biod3.annotationGrid(annotations, { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
}

function parse_presult(ractive, file, type) {
  let lines = file.split('\n');
  //console.log(type+'_ann_set');
  let ann_list = ractive.get(type + '_ann_set');
  //console.log(ann_list);
  if (Object.keys(ann_list).length > 0) {
    let pseudo_table = '<table class="small-table table-striped table-bordered">\n';
    pseudo_table += '<tr><th>Conf.</th>';
    pseudo_table += '<th>Net Score</th>';
    pseudo_table += '<th>p-value</th>';
    pseudo_table += '<th>PairE</th>';
    pseudo_table += '<th>SolvE</th>';
    pseudo_table += '<th>Aln Score</th>';
    pseudo_table += '<th>Aln Length</th>';
    pseudo_table += '<th>Target Len</th>';
    pseudo_table += '<th>Query Len</th>';
    if (type === 'dgen') {
      pseudo_table += '<th>Region Start</th>';
      pseudo_table += '<th>Region End</th>';
      pseudo_table += '<th>CATH Domain</th>';
      pseudo_table += '<th>SEARCH SCOP</th>';
    } else {
      pseudo_table += '<th>Fold</th>';
      pseudo_table += '<th>SEARCH SCOP</th>';
      pseudo_table += '<th>SEARCH CATH</th>';
    }
    pseudo_table += '<th>PDBSUM</th>';
    pseudo_table += '<th>Alignment</th>';
    pseudo_table += '<th>MODEL</th>';

    // if MODELLER THINGY
    pseudo_table += '</tr><tbody">\n';
    lines.forEach(function (line, i) {
      //console.log(line);
      if (line.length === 0) {
        return;
      }
      let entries = line.split(/\s+/);
      let table_hit = entries[9];
      if (type === 'dgen') {
        table_hit = entries[11];
      }
      if (table_hit + "_" + i in ann_list) {
        pseudo_table += "<tr>";
        pseudo_table += "<td class='" + entries[0].toLowerCase() + "'>" + entries[0] + "</td>";
        pseudo_table += "<td>" + entries[1] + "</td>";
        pseudo_table += "<td>" + entries[2] + "</td>";
        pseudo_table += "<td>" + entries[3] + "</td>";
        pseudo_table += "<td>" + entries[4] + "</td>";
        pseudo_table += "<td>" + entries[5] + "</td>";
        pseudo_table += "<td>" + entries[6] + "</td>";
        pseudo_table += "<td>" + entries[7] + "</td>";
        pseudo_table += "<td>" + entries[8] + "</td>";
        let pdb = entries[9].substring(0, entries[9].length - 2);
        if (type === 'dgen') {
          pdb = entries[11].substring(0, entries[11].length - 3);
        }
        if (type === 'dgen') {
          pseudo_table += "<td>" + entries[9] + "</td>";
          pseudo_table += "<td>" + entries[10] + "</td>";
          pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/version/latest/domain/" + table_hit + "'>" + table_hit + "</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SCOP SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open PDBSUM</a></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.loadNewAlignment(\"" + ann_list[table_hit + "_" + i].aln + "\",\"" + ann_list[table_hit + "_" + i].ann + "\",\"" + (table_hit + "_" + i) + "\");' value='Display Alignment' /></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.buildModel(\"" + ann_list[table_hit + "_" + i].aln + "\", \"cath_modeller\");' value='Build Model' /></td>";
        } else {
          pseudo_table += "<td><a target='_blank' href='https://www.rcsb.org/pdb/explore/explore.do?structureId=" + pdb + "'>" + table_hit + "</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SCOP SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/pdb/" + pdb + "'>CATH SEARCH</a></td>";
          pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open PDBSUM</a></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.loadNewAlignment(\"" + ann_list[table_hit + "_" + i].aln + "\",\"" + ann_list[table_hit + "_" + i].ann + "\",\"" + (table_hit + "_" + i) + "\");' value='Display Alignment' /></td>";
          pseudo_table += "<td><input class='button' type='button' onClick='psipred.buildModel(\"" + ann_list[table_hit + "_" + i].aln + "\", \"pdb_modeller\");' value='Build Model' /></td>";
        }
        pseudo_table += "</tr>\n";
      }
    });
    pseudo_table += "</tbody></table>\n";
    ractive.set(type + "_table", pseudo_table);
  } else {
    ractive.set(type + "_table", "<h3>No good hits found. GUESS and LOW confidence hits can be found in the results file</h3>");
  }
}

function parse_parseds(ractive, file) {
  let prediction_regex = /Domain\sBoundary\slocations\spredicted\sDPS:\s(.+)/;
  let prediction_match = prediction_regex.exec(file);
  if (prediction_match) {
    let details = file.replace("\n", "<br />");
    details = details.replace("\n", "<br />");
    ractive.set("parseds_info", "<h4>" + details + "</h4>");
    let values = [];
    if (prediction_match[1].indexOf(",")) {
      values = prediction_match[1].split(',');
      values.forEach(function (value, i) {
        values[i] = parseInt(value);
      });
    } else {
      values[0] = parseInt(prediction_match[1]);
    }
    console.log(values);
    let annotations = ractive.get('annotations');
    values.forEach(function (value) {
      annotations[value].dompred = 'B';
    });
    ractive.set('annotations', annotations);
  } else {
    ractive.set("parseds_info", "No ParseDS Domain boundaries predicted");
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = show_panel;
/* harmony export (immutable) */ __webpack_exports__["g"] = clear_settings;
/* harmony export (immutable) */ __webpack_exports__["a"] = prepare_downloads_html;
/* harmony export (immutable) */ __webpack_exports__["b"] = handle_results;
/* harmony export (immutable) */ __webpack_exports__["e"] = display_structure;
/* harmony export (immutable) */ __webpack_exports__["c"] = set_downloads_panel;
/* harmony export (immutable) */ __webpack_exports__["f"] = set_advanced_params;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(2);



function show_panel(value, ractive) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', value);
}

//before a resubmission is sent all variables are reset to the page defaults
function clear_settings(ractive, gear_string, job_list, job_names) {
  ractive.set('results_visible', 2);
  ractive.set('results_panel_visible', 1);
  ractive.set('psipred_button', false);
  ractive.set('download_links', '');
  job_list.forEach(function (job_name) {
    ractive.set(job_name + '_waiting_message', '<h2>Please wait for your ' + job_names[job_name] + ' job to process</h2>');
    ractive.set(job_name + '_waiting_icon', gear_string);
    ractive.set(job_name + '_time', 'Loading Data');
  });
  ractive.set('psipred_horiz', null);
  ractive.set('diso_precision');
  ractive.set('memsatsvm_schematic', '');
  ractive.set('memsatsvm_cartoon', '');
  ractive.set('pgen_table', '');
  ractive.set('pgen_set', {});
  ractive.set('gen_table', '');
  ractive.set('gen_set', {});
  ractive.set('parseds_info', null);
  ractive.set('parseds_png', null);
  ractive.set('dgen_table', null);
  ractive.set('dgen_ann_set', {});
  ractive.set('bioserf_model', null);
  ractive.set('domserf_buttons', '');
  ractive.set('domserf_model_uris:', []);
  ractive.set('sch_schematic:', null);
  ractive.set('aa_composition', null);
  ractive.set('global_features', null);
  ractive.set('function_tables', null);
  ractive.set('metapsicov_map', null);
  ractive.set('metsite_table', null);
  ractive.set('hspred_table', null);
  ractive.set('metsite_pdb', null);
  ractive.set('hspred_pdb', null);

  ractive.set('annotations', null);
  ractive.set('batch_uuid', null);
  biod3.clearSelection('div.sequence_plot');
  biod3.clearSelection('div.psipred_cartoon');
  biod3.clearSelection('div.comb_plot');

  zip = new JSZip();
}

//Take a couple of variables and prepare the html strings for the downloads panel
function prepare_downloads_html(data, downloads_info, job_list, job_names) {
  job_list.forEach(function (job_name) {
    if (data.job_name === job_name) {
      downloads_info[job_name] = {};
      downloads_info[job_name].header = "<h5>" + job_names[job_name] + " DOWNLOADS</h5>";
      //EXTRA PANELS FOR SOME JOBS TYPES:
      if (job_name === 'pgenthreader' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'metapsicov' || job_name === 'ffpred') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
      }
      if (job_name === 'mempack') {
        downloads_info.memsatsvm = {};
        downloads_info.memsatsvm.header = "<h5>" + job_names.memsatsvm + " DOWNLOADS</h5>";
      }
      if (job_name === 'bioserf') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
        downloads_info.pgenthreader = {};
        downloads_info.pgenthreader.header = "<h5>" + job_names.pgenthreader + " DOWNLOADS</h5>";
        downloads_info.bioserf = {};
        downloads_info.bioserf.header = "<h5>" + job_names.bioserf + " DOWNLOADS</h5>";
      }
      if (job_name === 'domserf') {
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>" + job_names.psipred + " DOWNLOADS</h5>";
        downloads_info.pdomthreader = {};
        downloads_info.pdomthreader.header = "<h5>" + job_names.pdomthreader + " DOWNLOADS</h5>";
        downloads_info.domserf = {};
        downloads_info.domserf.header = "<h5>" + job_names.domserf + " DOWNLOADS</h5>";
      }
      if (job_name === 'ffpred') {
        downloads_info.memsatsvm = {};
        downloads_info.memsatsvm.header = "<h5>" + job_names.memsatsvm + " DOWNLOADS</h5>";
        downloads_info.psipred = {};
        downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
        downloads_info.dompred = {};
        downloads_info.dompred.header = "<h5>DomPred DOWNLOADS</h5>";
        downloads_info.ffpred = {};
        downloads_info.ffpred.header = "<h5>" + job_names.ffpred + " DOWNLOADS</h5>";
      }
    }
  });
}

//take the datablob we've got and loop over the results
function handle_results(ractive, data, file_url, zip, downloads_info, job_names) {
  let horiz_regex = /\.horiz$/;
  let ss2_regex = /\.ss2$/;
  let png_regex = /\.png$/;
  let memsat_cartoon_regex = /_cartoon_memsat_svm\.png$/;
  let memsat_schematic_regex = /_schematic\.png$/;
  let memsat_data_regex = /memsat_svm$/;
  let mempack_cartoon_regex = /Kamada-Kawai_\d+.png$/;
  let mempack_graph_out = /input_graph.out$/;
  let mempack_contact_res = /CONTACT_DEF1.results$/;
  let mempack_lipid_res = /LIPID_EXPOSURE.results$/;
  let domssea_pred_regex = /\.pred$/;
  let domssea_regex = /\.domssea$/;
  let domserf_regex = /.+_(\d+)_(\d+).*\.pdb/;
  let ffpred_sch_regex = /.+_sch\.png/;
  let ffpred_svm_regex = /.+_cartoon_memsat_svm_.*\.png/;
  let ffpred_schematic_regex = /.+_schematic_.*\.png/;
  let ffpred_tm_regex = /.+_tmp\.png/;
  let ffpred_featcfg_regex = /\.featcfg/;
  let ffpred_preds_regex = /\.full_raw/;
  let metapsicov_ev_regex = /\.evfold/;
  let metapsicov_psicov_regex = /\.psicov/;
  let metapsicov_ccmpred_regex = /\.ccmpred/;
  let metsite_table_regex = /\.Metpred/;
  let metsite_pdb_regex = /\.MetPred/;

  let image_regex = '';
  let results = data.results;
  let domain_count = 0;
  let mempack_result_found = false;
  let domserf_result_found = false;
  let reformat_domserf_models_found = false;
  let psipred_result_found = false;
  let pdomthreader_result_found = false;
  //Prepatory loop for information that is needed before results parsing:
  for (let i in results) {
    let result_dict = results[i];
    if (result_dict.name === 'GenAlignmentAnnotation') {
      let ann_set = ractive.get("pgen_ann_set");
      let tmp = result_dict.data_path;
      let path = tmp.substr(0, tmp.lastIndexOf("."));
      let id = path.substr(path.lastIndexOf(".") + 1, path.length);
      ann_set[id] = {};
      ann_set[id].ann = path + ".ann";
      ann_set[id].aln = path + ".aln";
      ractive.set("pgen_ann_set", ann_set);
    }
    if (result_dict.name === 'gen_genalignment_annotation') {
      let ann_set = ractive.get("gen_ann_set");
      let tmp = result_dict.data_path;
      let path = tmp.substr(0, tmp.lastIndexOf("."));
      let id = path.substr(path.lastIndexOf(".") + 1, path.length);
      ann_set[id] = {};
      ann_set[id].ann = path + ".ann";
      ann_set[id].aln = path + ".aln";
      ractive.set("gen_ann_set", ann_set);
    }
    if (result_dict.name === 'GenAlignmentAnnotation_dom') {
      let ann_set = ractive.get("dgen_ann_set");
      let tmp = result_dict.data_path;
      let path = tmp.substr(0, tmp.lastIndexOf("."));
      let id = path.substr(path.lastIndexOf(".") + 1, path.length);
      ann_set[id] = {};
      ann_set[id].ann = path + ".ann";
      ann_set[id].aln = path + ".aln";
      ractive.set("dgen_ann_set", ann_set);
    }
  }
  console.log(results);
  //main results parsing loop
  for (let i in results) {
    let result_dict = results[i];
    //psipred files
    if (result_dict.name == 'psipass2') {
      psipred_result_found = true;
      let match = horiz_regex.exec(result_dict.data_path);
      if (match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'horiz', zip, ractive);
        ractive.set("psipred_waiting_message", '');
        ractive.set("psipred_waiting_icon", '');
        ractive.set("psipred_time", '');
        downloads_info.psipred.horiz = '<a href="' + file_url + result_dict.data_path + '">Horiz Format Output</a><br />';
      }
      let ss2_match = ss2_regex.exec(result_dict.data_path);
      if (ss2_match) {
        downloads_info.psipred.ss2 = '<a href="' + file_url + result_dict.data_path + '">SS2 Format Output</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ss2', zip, ractive);
      }
    }
    //disopred files
    if (result_dict.name === 'diso_format') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'pbdat', zip, ractive);
      ractive.set("disopred_waiting_message", '');
      downloads_info.disopred.pbdat = '<a href="' + file_url + result_dict.data_path + '">PBDAT Format Output</a><br />';
      ractive.set("disopred_waiting_icon", '');
      ractive.set("disopred_time", '');
    }
    if (result_dict.name === 'diso_combine') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'comb', zip, ractive);
      downloads_info.disopred.comb = '<a href="' + file_url + result_dict.data_path + '">COMB NN Output</a><br />';
    }

    //memsat and mempack files
    if (result_dict.name === 'memsatsvm') {
      ractive.set("memsatsvm_waiting_message", '');
      ractive.set("memsatsvm_waiting_icon", '');
      ractive.set("memsatsvm_time", '');
      let scheme_match = memsat_schematic_regex.exec(result_dict.data_path);
      if (scheme_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('memsatsvm_schematic', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.schematic = '<a href="' + file_url + result_dict.data_path + '">Schematic Diagram</a><br />';
      }
      let cartoon_match = memsat_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('memsatsvm_cartoon', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let memsat_match = memsat_data_regex.exec(result_dict.data_path);
      if (memsat_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'memsatdata', zip, ractive);
        downloads_info.memsatsvm.data = '<a href="' + file_url + result_dict.data_path + '">Memsat Output</a><br />';
      }
    }
    //mempack files
    if (result_dict.name === 'mempack_wrapper') {
      ractive.set("mempack_waiting_message", '');
      ractive.set("mempack_waiting_icon", '');
      ractive.set("mempack_time", '');
      let cartoon_match = mempack_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        mempack_result_found = true;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('mempack_cartoon', '<img width="1000px" src="' + file_url + result_dict.data_path + '" />');
        downloads_info.mempack.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let graph_match = mempack_graph_out.exec(result_dict.data_path);
      if (graph_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.mempack.graph_out = '<a href="' + file_url + result_dict.data_path + '">Diagram Data</a><br />';
      }
      let contact_match = mempack_contact_res.exec(result_dict.data_path);
      if (contact_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.mempack.contact = '<a href="' + file_url + result_dict.data_path + '">Contact Predictions</a><br />';
      }
      let lipid_match = mempack_lipid_res.exec(result_dict.data_path);
      if (lipid_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.mempack.lipid_out = '<a href="' + file_url + result_dict.data_path + '">Lipid Exposure Preditions</a><br />';
      }
    }
    //genthreader and pgenthreader
    if (result_dict.name === 'sort_presult') {
      ractive.set("pgenthreader_waiting_message", '');
      ractive.set("pgenthreader_waiting_icon", '');
      ractive.set("pgenthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'presult', zip, ractive);
      downloads_info.pgenthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'gen_sort_presults') {
      ractive.set("genthreader_waiting_message", '');
      ractive.set("genthreader_waiting_icon", '');
      ractive.set("genthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'gen_presult', zip, ractive);
      downloads_info.genthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.genthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'pseudo_bas_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Alignments</a><br />';
    }
    if (result_dict.name === 'pseudo_bas_models') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pgenthreader + ' Alignments</a><br />';
    }

    if (result_dict.name === 'genthreader_pseudo_bas_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.genthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.genthreader + ' Alignments</a><br />';
    }

    //pdomthreader
    if (result_dict.name === 'svm_prob_dom') {
      pdomthreader_result_found = true;
      ractive.set("pdomthreader_waiting_message", '');
      ractive.set("pdomthreader_waiting_icon", '');
      ractive.set("pdomthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'dom_presult', zip, ractive);
      downloads_info.pdomthreader.table = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pdomthreader + ' Table</a><br />';
    }
    if (result_dict.name === 'pseudo_bas_dom_align') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      downloads_info.pdomthreader.align = '<a href="' + file_url + result_dict.data_path + '">' + job_names.pdomthreader + ' Alignments</a><br />';
    }
    //dompred files
    if (result_dict.name === 'parseds') {
      ractive.set("dompred_waiting_message", '');
      ractive.set("dompred_waiting_icon", '');
      ractive.set("dompred_time", '');
      let png_match = png_regex.exec(result_dict.data_path);
      if (png_match) {
        downloads_info.dompred.boundary_png = '<a href="' + file_url + result_dict.data_path + '">Boundary PNG</a><br />';
        ractive.set('parseds_png', '<img src="' + file_url + result_dict.data_path + '" />');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      } else {
        downloads_info.dompred.boundary = '<a href="' + file_url + result_dict.data_path + '">Boundary file</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'parseds', zip, ractive);
      }
    }
    if (result_dict.name === 'domssea') {
      let pred_match = domssea_pred_regex.exec(result_dict.data_path);
      if (pred_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.dompred.domsseapred = '<a href="' + file_url + result_dict.data_path + '">DOMSSEA predictions</a><br />';
      }
      let domssea_match = domssea_pred_regex.exec(result_dict.data_path);
      if (domssea_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        downloads_info.dompred.domssea = '<a href="' + file_url + result_dict.data_path + '">DOMSSEA file</a><br />';
      }
    }
    if (result_dict.name === 'runBioserf') {
      ractive.set("bioserf_waiting_message", '');
      ractive.set("bioserf_waiting_icon", '');
      ractive.set("bioserf_time", '');
      downloads_info.bioserf.model = '<a href="' + file_url + result_dict.data_path + '">Final Homology Model</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      display_structure(file_url + result_dict.data_path, '#bioserf_model', true);
    }
    if (result_dict.name === 'hhblits_pdb70') {
      downloads_info.bioserf.hhblits = '<a href="' + file_url + result_dict.data_path + '">HHSearch Results</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'pgpblast_pdbaa') {
      downloads_info.bioserf.pdbaa = '<a href="' + file_url + result_dict.data_path + '">PDBaa Blast</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'psiblast_cath') {
      downloads_info.domserf.cathblast = '<a href="' + file_url + result_dict.data_path + '">CATH Blast</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'psiblast_pdbaa') {
      downloads_info.domserf.pdbblast = '<a href="' + file_url + result_dict.data_path + '">PDBaa Blast</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'reformat_domserf_models' || result_dict.name === "parse_pdb_blast") {
      let domserf_match = domserf_regex.exec(result_dict.data_path);
      if (domserf_match) {
        ractive.set("domserf_waiting_message", '');
        ractive.set("domserf_waiting_icon", '');
        ractive.set("domserf_time", '');
        // TO DO ADD REGEX
        domain_count += 1;
        domserf_result_found = true;
        if (downloads_info.domserf.model) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
          downloads_info.domserf.model += '<a href="' + file_url + result_dict.data_path + '">Model ' + domserf_match[1] + '-' + domserf_match[2] + '</a><br />';
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
          downloads_info.domserf.model = '<a href="' + file_url + result_dict.data_path + '">Model ' + domserf_match[1] + '-' + domserf_match[2] + '</a><br />';
        }
        let buttons_tags = ractive.get("domserf_buttons");
        buttons_tags += '<button onClick="psipred.swapDomserf(' + domain_count + ')" type="button" class="btn btn-default">Domain ' + domserf_match[1] + '-' + domserf_match[2] + '</button>';
        ractive.set("domserf_buttons", buttons_tags);
        let paths = ractive.get("domserf_model_uris");
        paths.push(file_url + result_dict.data_path);
        ractive.set("domserf_model_uris", paths);
      }
    }

    if (result_dict.name === 'getSchematic') {
      ractive.set("ffpred_waiting_message", '');
      ractive.set("ffpred_waiting_icon", '');
      ractive.set("ffpred_time", '');

      let sch_match = ffpred_sch_regex.exec(result_dict.data_path);
      if (sch_match) {
        downloads_info.ffpred.sch = '<a href="' + file_url + result_dict.data_path + '">Feature Schematic PNG</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('sch_schematic', '<b>Sequence Feature Map</b><br />Position dependent feature predictions are mapped onto the sequence schematic shown below. The line height of the Phosphorylation and Glycosylation features reflects the confidence of the residue prediction.<br /><img src="' + file_url + result_dict.data_path + '" />');
      }
      let cartoon_match = ffpred_svm_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        downloads_info.ffpred.cartoon = '<a href="' + file_url + result_dict.data_path + '">Memsat PNG</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
        ractive.set('ffpred_cartoon', '<b>Predicted Transmembrane Topology</b><br /><img src="' + file_url + result_dict.data_path + '" />');
      }
    }

    if (result_dict.name === 'features') {
      let feat_match = ffpred_featcfg_regex.exec(result_dict.data_path);
      if (feat_match) {
        downloads_info.ffpred.features = '<a href="' + file_url + result_dict.data_path + '">Sequence Feature Summary</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ffpredfeatures', zip, ractive);
      }
    }

    if (result_dict.name === 'ffpred_human') {
      let preds_match = ffpred_preds_regex.exec(result_dict.data_path);
      if (preds_match) {
        downloads_info.ffpred.preds = '<a href="' + file_url + result_dict.data_path + '">GO Predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'ffpredpredictions', zip, ractive);
      }
    }

    if (result_dict.name === 'plot_self_contact_map') {
      ractive.set("metapsicov_waiting_message", '');
      ractive.set("metapsicov_waiting_icon", '');
      ractive.set("metapsicov_time", '');
      downloads_info.metapsicov.map = '<a href="' + file_url + result_dict.data_path + '">Contact Map</a><br />';
      ractive.set('metapsicov_map', '<b>Contact Map</b><br /><img height="800" width="800" src="' + file_url + result_dict.data_path + '">');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }
    if (result_dict.name === 'contact_predictors') {
      // let metapsicov_ev_regex = /\.evfold/;
      // let metapsicov_psicov_regex = /\.psicov/;
      // let metapsicov_ccmpred_regex = /\.ccmpred/;
      let ev_match = metapsicov_ev_regex.exec(result_dict.data_path);
      if (ev_match) {
        downloads_info.metapsicov.freecontact = '<a href="' + file_url + result_dict.data_path + '">FreeContact predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
      let ps_match = metapsicov_psicov_regex.exec(result_dict.data_path);
      if (ps_match) {
        downloads_info.metapsicov.psicov = '<a href="' + file_url + result_dict.data_path + '">PSICOV predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
      let cc_match = metapsicov_ccmpred_regex.exec(result_dict.data_path);
      if (cc_match) {
        downloads_info.metapsicov.ccmpred = '<a href="' + file_url + result_dict.data_path + '">CCMPRED predictions</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
    }
    if (result_dict.name === 'metapsicov_stage2') {
      downloads_info.metapsicov.preds = '<a href="' + file_url + result_dict.data_path + '">Contact Predictions</a><br />';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
    }

    if (result_dict.name === 'metpred_wrapper') {
      let table_match = metsite_table_regex.exec(result_dict.data_path);
      let pdb_match = metsite_pdb_regex.exec(result_dict.data_path);
      ractive.set("metsite_waiting_message", '');
      ractive.set("metsite_waiting_icon", '');
      ractive.set("metsite_time", '');
      if (table_match) {
        downloads_info.metsite.table = '<a href="' + file_url + result_dict.data_path + '">Metsite Table</a><br />';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'metsite', zip, ractive);
      }
      if (pdb_match) {
        downloads_info.metsite.pdb = '<a href="' + file_url + result_dict.data_path + '">Metsite PDB</a><br />';
        ractive.set('metsite_pdb', file_url + result_dict.data_path);
        display_structure(file_url + result_dict.data_path, '#metsite_model', false);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'zip', zip, ractive);
      }
    }
  }

  //Set no found statments for some jobs.
  if (!mempack_result_found) {
    ractive.set('mempack_cartoon', '<h3>No packing prediction possible</h3>');
  }
  if (!psipred_result_found) {
    ractive.set("psipred_waiting_message", 'No ' + job_names.psipred + ' data generated for this job');
    ractive.set("psipred_waiting_icon", '');
    ractive.set("psipred_time", '');
  }
  if (!pdomthreader_result_found) {
    ractive.set("pdomthreader_waiting_message", 'No ' + job_names.pdomthreader + ' table generated for this job');
    ractive.set("pdomthreader_waiting_icon", '');
    ractive.set("pdomthreader_time", '');
  }
  if (domserf_result_found) {
    let paths = ractive.get("domserf_model_uris");
    display_structure(paths[0], '#domserf_model', true);
  }
}

function display_structure(uri, css_id, cartoon) {
  let cartoon_color = function (atom) {
    if (atom.ss === 'h') {
      return '#e353e3';
    }
    if (atom.ss === 's') {
      return '#e5dd55';
    }
    return 'grey';
  };
  let hotspot_color = function (atom) {
    if (atom.b == 1.0) {
      return 'red';
    }
    if (atom.b == 0.5) {
      return 'black';
    }
    return "blue";
  };
  console.log("LOADING: " + uri);
  let element = $(css_id);
  let config = { backgroundColor: '#ffffff' };
  let viewer = $3Dmol.createViewer(element, config);
  let data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["d" /* get_text */])(uri, "GET", {});
  viewer.addModel(data, "pdb"); /* load data */
  if (cartoon) {
    viewer.setStyle({}, { cartoon: { colorfunc: cartoon_color } }); /* style all atoms */
  } else {
    viewer.setStyle({}, { cartoon: { colorfunc: hotspot_color } }); /* style all atoms */
  }
  viewer.zoomTo(); /* set camera */
  viewer.render(); /* render scene */
  viewer.zoom(1.7, 3000);
}

function set_downloads_panel(ractive, downloads_info) {
  //console.log(downloads_info);
  let downloads_string = ractive.get('download_links');
  if ('psipred' in downloads_info) {
    if (downloads_info.psipred.horiz) {
      downloads_string = downloads_string.concat(downloads_info.psipred.header);
      downloads_string = downloads_string.concat(downloads_info.psipred.horiz);
      downloads_string = downloads_string.concat(downloads_info.psipred.ss2);
      downloads_string = downloads_string.concat("<br />");
    }
  }
  if ('disopred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.disopred.header);
    downloads_string = downloads_string.concat(downloads_info.disopred.pbdat);
    downloads_string = downloads_string.concat(downloads_info.disopred.comb);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('memsatsvm' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.header);
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.data);
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.schematic);
    downloads_string = downloads_string.concat(downloads_info.memsatsvm.cartoon);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('pgenthreader' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.pgenthreader.header);
    downloads_string = downloads_string.concat(downloads_info.pgenthreader.table);
    downloads_string = downloads_string.concat(downloads_info.pgenthreader.align);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('genthreader' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.genthreader.header);
    downloads_string = downloads_string.concat(downloads_info.genthreader.table);
    downloads_string = downloads_string.concat(downloads_info.genthreader.align);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('pdomthreader' in downloads_info) {
    if (downloads_info.pdomthreader.table) {
      downloads_string = downloads_string.concat(downloads_info.pdomthreader.header);
      downloads_string = downloads_string.concat(downloads_info.pdomthreader.table);
      downloads_string = downloads_string.concat(downloads_info.pdomthreader.align);
      downloads_string = downloads_string.concat("<br />");
    }
  }
  if ('mempack' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.mempack.header);
    if (downloads_info.mempack.cartoon) {
      downloads_string = downloads_string.concat(downloads_info.mempack.cartoon);
      downloads_string = downloads_string.concat(downloads_info.mempack.graph_out);
      downloads_string = downloads_string.concat(downloads_info.mempack.contact);
      downloads_string = downloads_string.concat(downloads_info.mempack.lipid_out);
    } else {
      downloads_string = downloads_string.concat("No packing prediction possible<br />");
    }
    downloads_string = downloads_string.concat("<br />");
  }
  if ('bioserf' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.bioserf.header);
    downloads_string = downloads_string.concat(downloads_info.bioserf.model);
    downloads_string = downloads_string.concat(downloads_info.bioserf.hhblits);
    downloads_string = downloads_string.concat(downloads_info.bioserf.pdbaa);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('domserf' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.domserf.header);
    downloads_string = downloads_string.concat(downloads_info.domserf.model);
    downloads_string = downloads_string.concat(downloads_info.domserf.cathblast);
    downloads_string = downloads_string.concat(downloads_info.domserf.pdbblast);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('ffpred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.ffpred.header);
    downloads_string = downloads_string.concat(downloads_info.ffpred.sch);
    downloads_string = downloads_string.concat(downloads_info.ffpred.cartoon);
    downloads_string = downloads_string.concat(downloads_info.ffpred.features);
    downloads_string = downloads_string.concat(downloads_info.ffpred.preds);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('metapsicov' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.metapsicov.header);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.preds);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.map);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.psicov);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.freecontact);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.ccmpred);
    downloads_string = downloads_string.concat("<br />");
  }
  if ('metsite' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.metsite.header);
    downloads_string = downloads_string.concat(downloads_info.metsite.table);
    downloads_string = downloads_string.concat(downloads_info.metsite.pdb);
    downloads_string = downloads_string.concat("<br />");
  }
  ractive.set('download_links', downloads_string);
}

function set_advanced_params() {
  let options_data = {};
  try {
    options_data.psiblast_dompred_evalue = document.getElementById("dompred_e_value_cutoff").value;
  } catch (err) {
    options_data.psiblast_dompred_evalue = "0.01";
  }
  try {
    options_data.psiblast_dompred_iterations = document.getElementById("dompred_psiblast_iterations").value;
  } catch (err) {
    options_data.psiblast_dompred_iterations = 5;
  }

  try {
    options_data.bioserf_modeller_key = document.getElementById("bioserf_modeller_key").value;
  } catch (err) {
    options_data.bioserf_modeller_key = "";
  }
  try {
    options_data.domserf_modeller_key = document.getElementById("domserf_modeller_key").value;
  } catch (err) {
    options_data.domserf_modeller_key = "";
  }
  try {
    options_data.ffpred_type = document.getElementById("ffpred_selection").value;
  } catch (err) {
    options_data.ffpred_type = "human";
  }

  try {
    options_data.metsite_checkchains_chain = document.getElementById("metsite_chain_id").value;
    options_data.extract_fasta_chain = document.getElementById("metsite_chain_id").value;
    options_data.seedSiteFind_chain = document.getElementById("metsite_chain_id").value;
    options_data.metpred_wrapper_chain = document.getElementById("metsite_chain_id").value;
  } catch (err) {
    options_data.metsite_checkchains_chain = "A";
    options_data.extract_fasta_chain = "A";
    options_data.seedSiteFind_chain = "A";
    options_data.metpred_wrapper_chain = "A";
  }
  try {
    options_data.seedSiteFind_metal = document.getElementById("metsite_metal_type").value;
    options_data.metpred_wrapper_metal = document.getElementById("metsite_metal_type").value;
  } catch (err) {
    options_data.seedSiteFind_metal = "Ca";
    options_data.metpred_wrapper_metal = "Ca";
  }
  try {
    options_data.metpred_wrapper_fpr = document.getElementById("metsite_fpr").value;
  } catch (err) {
    options_data.metpred_wrapper_fpr = "5";
  }

  try {
    options_data.hspred_checkchains_chains = document.getElementById("hspred_protein_1").value + document.getElementById("hspred_protein_2").value;
  } catch (err) {
    options_data.hspred_checkchains_chains = "AB";
  }
  try {
    options_data.hs_pred_first_chain = document.getElementById("hspred_protein_1").value;
    options_data.split_pdb_files_first_chain = document.getElementById("hspred_protein_1").value;
  } catch (err) {
    options_data.hs_pred_first_chain = "A";
    options_data.split_pdb_files_first_chain = "A";
  }
  try {
    options_data.hs_pred_second_chain = document.getElementById("hspred_protein_2").value;
    options_data.split_pdb_files_second_chain = document.getElementById("hspred_protein_2").value;
  } catch (err) {
    options_data.hs_pred_first_chain = "B";
    options_data.split_pdb_files_first_chain = "B";
  }

  // options_data. = document.getElementById("memembed_search_type");
  // options_data. = document.getElementById("memembed_barrel");
  // options_data. = document.getElementById("memembed_terminal");
  // options_data. = document.getElementById("memembed_boundaries");
  return options_data;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = send_request;
/* harmony export (immutable) */ __webpack_exports__["e"] = send_job;
/* harmony export (immutable) */ __webpack_exports__["b"] = get_previous_data;
/* harmony export (immutable) */ __webpack_exports__["d"] = get_text;
/* harmony export (immutable) */ __webpack_exports__["c"] = process_file;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__ = __webpack_require__(0);











//given a url, http request type and some form data make an http request
function send_request(url, type, send_data) {
  console.log('Sending URI request');
  console.log(url);
  console.log(type);
  var response = null;
  $.ajax({
    type: type,
    data: send_data,
    cache: false,
    contentType: false,
    processData: false,
    async: false,
    dataType: "json",
    //contentType: "application/json",
    url: url,
    success: function (data) {
      if (data === null) {
        alert("Failed to send data");
      }
      response = data;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {
      alert("Sending Job to " + url + " Failed. " + error.responseText + ". The Backend processing service was unable to process your submission. Please contact psipred@cs.ucl.ac.uk");return null;
    } }).responseJSON;
  return response;
}

//given a job name prep all the form elements and send an http request to the
//backend
function send_job(ractive, job_name, seq, name, email, submit_url, times_url, job_names, options_data) {
  //alert(seq);
  console.log("Sending form data");
  console.log(job_name);
  var file = null;
  try {
    file = new Blob([seq]);
  } catch (e) {
    alert(e);
  }
  let fd = new FormData();
  fd.append("input_data", file, 'input.txt');
  fd.append("job", job_name);
  fd.append("submission_name", name);
  fd.append("email", email);
  fd.append("psiblast_dompred_evalue", options_data.psiblast_dompred_evalue);
  fd.append("psiblast_dompred_iterations", options_data.psiblast_dompred_iterations);
  fd.append("metsite_checkchains_chain", options_data.metsite_checkchains_chain);
  fd.append("extract_fasta_chain", options_data.extract_fasta_chain);
  fd.append("seedSiteFind_metal", options_data.seedSiteFind_metal);
  fd.append("seedSiteFind_chain", options_data.seedSiteFind_chain);
  fd.append("metpred_wrapper_chain", options_data.metpred_wrapper_chain);
  fd.append("metpred_wrapper_metal", options_data.metpred_wrapper_metal);
  fd.append("metpred_wrapper_fpr", options_data.metpred_wrapper_fpr);
  fd.append("hspred_checkchains_chains", options_data.hspred_checkchains_chains);
  fd.append("hs_pred_first_chain", options_data.hs_pred_first_chain);
  fd.append("hs_pred_second_chain", options_data.hs_pred_second_chain);
  fd.append("split_pdb_files_first_chain", options_data.split_pdb_files_first_chain);
  fd.append("split_pdb_files_second_chain", options_data.split_pdb_files_second_chain);
  let response_data = send_request(submit_url, "POST", fd);
  if (response_data !== null) {
    let times = send_request(times_url, 'GET', {});
    //alert(JSON.stringify(times));
    if (job_name in times) {
      ractive.set(job_name + '_time', job_names[job_name] + " jobs typically take " + times[job_name] + " seconds");
    } else {
      ractive.set(job_name + '_time', "Unable to retrieve average time for " + job_names[job_name] + " jobs.");
    }
    for (var k in response_data) {
      if (k == "UUID") {
        ractive.set('batch_uuid', response_data[k]);
        if (['metiste', 'hspred', 'maketdb', 'memembed'].includes(job_name)) {
          ractive.fire('poll_trigger', false);
        } else {
          active.fire('poll_trigger', true);
        }
      }
    }
  } else {
    return null;
  }
  return true;
}

//utility function that gets the sequence from a previous submission is the
//page was loaded with a UUID
function get_previous_data(uuid, submit_url, file_url, ractive) {
  console.log('Requesting details given URI');
  let url = submit_url + ractive.get('batch_uuid');
  //alert(url);
  let submission_response = send_request(url, "GET", {});
  if (!submission_response) {
    alert("NO SUBMISSION DATA");
  }
  let seq = get_text(file_url + submission_response.submissions[0].input_file, "GET", {});
  let jobs = '';
  submission_response.submissions.forEach(function (submission) {
    jobs += submission.job_name + ",";
  });
  jobs = jobs.slice(0, -1);
  return { 'seq': seq, 'email': submission_response.submissions[0].email, 'name': submission_response.submissions[0].submission_name, 'jobs': jobs };
}

//get text contents from a result URI
function get_text(url, type, send_data) {

  let response = null;
  $.ajax({
    type: type,
    data: send_data,
    cache: false,
    contentType: false,
    processData: false,
    async: false,
    //dataType: "txt",
    //contentType: "application/json",
    url: url,
    success: function (data) {
      if (data === null) {
        alert("Failed to request input data text");
      }
      response = data;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {
      alert("Gettings results text failed. The Backend processing service is not available. Please contact psipred@cs.ucl.ac.uk");
    }
  });
  return response;
}

//polls the backend to get results and then parses those results to display
//them on the page
function process_file(url_stub, path, ctl, zip, ractive) {
  let url = url_stub + path;
  let path_bits = path.split("/");
  //get a results file and push the data in to the bio3d object
  //alert(url);
  console.log('Getting Results File and processing');
  let response = null;
  $.ajax({
    type: 'GET',
    async: true,
    url: url,
    success: function (file) {
      zip.folder(path_bits[1]).file(path_bits[2], file);
      if (ctl === 'horiz') {
        ractive.set('psipred_horiz', file);
        biod3.psipred(file, 'psipredChart', { parent: 'div.psipred_cartoon', margin_scaler: 2 });
      }
      if (ctl === 'ss2') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["a" /* parse_ss2 */])(ractive, file);
      }
      if (ctl === 'pbdat') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["b" /* parse_pbdat */])(ractive, file);
        //alert('PBDAT process');
      }
      if (ctl === 'comb') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["c" /* parse_comb */])(ractive, file);
      }
      if (ctl === 'memsatdata') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["d" /* parse_memsatdata */])(ractive, file);
      }
      if (ctl === 'presult') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file, 'pgen');
      }
      if (ctl === 'gen_presult') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file, 'gen');
      }
      if (ctl === 'dom_presult') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file, 'dgen');
      }
      if (ctl === 'parseds') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["f" /* parse_parseds */])(ractive, file);
      }
      if (ctl === 'ffpredfeatures') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["g" /* parse_featcfg */])(ractive, file);
      }
      if (ctl === 'ffpredpredictions') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["h" /* parse_ffpreds */])(ractive, file);
      }
      if (ctl === 'metsite') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["i" /* parse_metsite */])(ractive, file);
      }
    },
    error: function (error) {
      alert(JSON.stringify(error));
    }
  });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isInArray;
/* harmony export (immutable) */ __webpack_exports__["b"] = draw_empty_annotation_panel;
/* harmony export (immutable) */ __webpack_exports__["a"] = getUrlVars;
//given and array return whether and element is present
function isInArray(value, array) {
  if (array.indexOf(value) > -1) {
    return true;
  } else {
    return false;
  }
}

//when a results page is instantiated and before some annotations have come back
//we draw and empty annotation panel
function draw_empty_annotation_panel(ractive) {

  let seq = ractive.get('sequence');
  let residues = seq.split('');
  let annotations = [];
  residues.forEach(function (res) {
    annotations.push({ 'res': res });
  });
  ractive.set('annotations', annotations);
  biod3.annotationGrid(ractive.get('annotations'), { parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
}

//given a URL return the attached variables
function getUrlVars() {
  let vars = {};
  //consider using location.search instead here
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

/*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function (document, documentElement) {
  // Enable strict mode
  "use strict";

  // Form the style on the fly to result in smaller minified file

  let important = "!important;";
  let style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important;

  window.getEmPixels = function (element) {

    let extraBody;

    if (!element) {
      // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
      element = extraBody = document.createElement("body");
      extraBody.style.cssText = "font-size:1em" + important;
      documentElement.insertBefore(extraBody, document.body);
    }

    // Create and style a test element
    let testElement = document.createElement("i");
    testElement.style.cssText = style;
    element.appendChild(testElement);

    // Get the client width of the test element
    let value = testElement.clientWidth;

    if (extraBody) {
      // Remove the extra body element
      documentElement.removeChild(extraBody);
    } else {
      // Remove the test element
      element.removeChild(testElement);
    }

    // Return the em value in pixels
    return value;
  };
})(document, document.documentElement);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["loadNewAlignment"] = loadNewAlignment;
/* harmony export (immutable) */ __webpack_exports__["buildModel"] = buildModel;
/* harmony export (immutable) */ __webpack_exports__["swapDomserf"] = swapDomserf;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__ = __webpack_require__(1);
/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/













var clipboard = new Clipboard('.copyButton');
var zip = new JSZip();

clipboard.on('success', function (e) {
  console.log(e);
});
clipboard.on('error', function (e) {
  console.log(e);
});

// SET ENDPOINTS FOR DEV, STAGING OR PROD
let endpoints_url = null;
let submit_url = null;
let times_url = null;
let gears_svg = "http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg";
let main_url = "http://bioinf.cs.ucl.ac.uk";
let app_path = "/psipred_beta";
let file_url = '';
let gear_string = '<object width="140" height="140" type="image/svg+xml" data="' + gears_svg + '"></object>';
let job_list = ["psipred", "pgenthreader", "metapsicov", "disopred", "mempack", "memsatsvm", "genthreader", "dompred", "pdomthreader", "bioserf", "domserf", "ffpred", "metsite", "hspred", "memembed", "gentdb"];
let seq_job_list = ["psipred", "pgenthreader", "metapsicov", "disopred", "mempack", "memsatsvm", "genthreader", "dompred", "pdomthreader", "bioserf", "domserf", "ffpred"];
let struct_job_list = ["metsite", "hspred", "memembed", "gentdb"];
let job_names = {
  'psipred': 'PSIPRED V4.0',
  'disopred': 'DIOSPRED 3',
  'memsatsvm': 'MEMSAT-SVM',
  'pgenthreader': 'pGenTHREADER',
  'mempack': 'MEMPACK',
  'genthreader': 'GenTHREADER',
  'dompred': 'DomPred',
  'pdomthreader': 'pDomTHREADER',
  'bioserf': 'BiosSerf v2.0',
  'domserf': 'DomSerf v2.1',
  'ffpred': 'FFPred 3',
  'metapsicov': 'MetaPSICOV',
  'metsite': 'MetSite',
  'hspred': 'HSPred',
  'memembed': 'MEMEMBED',
  'gentdb': 'Generate TDB'
};

if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
  endpoints_url = 'http://127.0.0.1:8000/analytics_automated/endpoints/';
  submit_url = 'http://127.0.0.1:8000/analytics_automated/submission/';
  times_url = 'http://127.0.0.1:8000/analytics_automated/jobtimes/';
  app_path = '/interface';
  main_url = 'http://127.0.0.1:8000';
  gears_svg = "../static/images/gears.svg";
  file_url = main_url;
} else if (location.hostname === "bioinfstage1.cs.ucl.ac.uk" || location.hostname === "bioinf.cs.ucl.ac.uk" || location.href === "http://bioinf.cs.ucl.ac.uk/psipred_beta/") {
  endpoints_url = main_url + app_path + '/api/endpoints/';
  submit_url = main_url + app_path + '/api/submission/';
  times_url = main_url + app_path + '/api/jobtimes/';
  file_url = main_url + app_path + "/api";
  //gears_svg = "../static/images/gears.svg";
} else {
  alert('UNSETTING ENDPOINTS WARNING, WARNING!');
  endpoints_url = '';
  submit_url = '';
  times_url = '';
}

let initialisation_data = {
  sequence_form_visible: 1,
  structure_form_visible: 0,
  results_visible: 1,
  resubmission_visible: 0,
  results_panel_visible: 1,
  submission_widget_visible: 0,
  bioserf_advanced: 0,
  domserf_advanced: 0,
  dompred_advanced: 0,
  ffpred_advanced: 0,
  metsite_advanced: 0,
  hspred_advanced: 0,
  memembad_advanced: 0,
  modeller_key: null,
  download_links: '',

  psipred_horiz: null,
  diso_precision: null,
  memsatsvm_schematic: '',
  memsatsvm_cartoon: '',
  pgen_table: null,
  pgen_ann_set: {},
  memsatpack_schematic: '',
  memsatpack_cartoon: '',
  gen_table: null,
  gen_ann_set: {},
  parseds_info: null,
  parseds_png: null,
  dgen_table: null,
  dgen_ann_set: {},
  bioserf_model: null,
  domserf_buttons: '',
  domserf_model_uris: [],
  ffpred_cartoon: null,
  sch_schematic: null,
  aa_composition: null,
  global_features: null,
  function_tables: null,
  metapsicov_map: null,
  metsite_table: null,
  metsite_pdb: null,
  hspred_table: null,
  hspred_pdb: null,

  metapsicov_data: null,
  metsite_data: null,
  hspred_data: null,
  memembed_data: null,
  gentdb_data: null,

  // Sequence and job info
  sequence: '',
  sequence_length: 1,
  subsequence_start: 1,
  subsequence_stop: 1,
  email: '',
  name: '',
  batch_uuid: null,
  //hold annotations that are read from datafiles
  annotations: null
};
job_list.forEach(function (job_name) {
  initialisation_data[job_name + '_checked'] = false;
  initialisation_data[job_name + '_button'] = false;
  initialisation_data[job_name + '_job'] = job_name + '_job';
  initialisation_data[job_name + '_waiting_message'] = '<h2>Please wait for your ' + job_names[job_name] + ' job to process</h2>';
  initialisation_data[job_name + '_waiting_icon'] = gear_string;
  initialisation_data[job_name + '_waiting_time'] = 'Loading Data';
});
initialisation_data.metsite_checked = true;
initialisation_data.metsite_advanced = 1;
initialisation_data.sequence_form_visible = 0;
initialisation_data.structure_form_visible = 1;
// DECLARE VARIABLES and init ractive instance
var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: initialisation_data
});

//set some things on the page for the development server
if (location.hostname === "127.0.0.1") {
  ractive.set('email', 'daniel.buchan@ucl.ac.uk');
  ractive.set('name', 'test');
  ractive.set('sequence', 'QWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEAS');
}

//4b6ad792-ed1f-11e5-8986-989096c13ee6
let uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let uuid_match = uuid_regex.exec(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid);

///////////////////////////////////////////////////////////////////////////////
//
//
// APPLICATION HERE
//
//
///////////////////////////////////////////////////////////////////////////////

//Here were keep an eye on some form elements and rewrite the name if people
//have provided a fasta formatted seq
let seq_observer = ractive.observe('sequence', function (newValue, oldValue) {

  let regex = /^>(.+?)\s/;
  let match = regex.exec(newValue);
  if (match) {
    this.set('name', match[1]);
  }
  // else {
  //   this.set('name', null);
  // }
}, { init: false,
  defer: true
});

//theses two observers stop people setting the resubmission widget out of bounds
ractive.observe('subsequence_stop', function (value) {
  let seq_length = ractive.get('sequence_length');
  let seq_start = ractive.get('subsequence_start');
  if (value > seq_length) {
    ractive.set('subsequence_stop', seq_length);
  }
  if (value <= seq_start) {
    ractive.set('subsequence_stop', seq_start + 1);
  }
});
ractive.observe('subsequence_start', function (value) {
  let seq_stop = ractive.get('subsequence_stop');
  if (value < 1) {
    ractive.set('subsequence_start', 1);
  }
  if (value >= seq_stop) {
    ractive.set('subsequence_start', seq_stop - 1);
  }
});

//After a job has been sent or a URL accepted this ractive block is called to
//poll the backend to get the results
ractive.on('poll_trigger', function (name, seq_type) {
  console.log("Polling backend for results");
  let url = submit_url + ractive.get('batch_uuid');
  history.pushState(null, '', app_path + '/&uuid=' + ractive.get('batch_uuid'));
  if (seq_type) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
  }
  let interval = setInterval(function () {
    let batch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__["a" /* send_request */])(url, "GET", {});
    let downloads_info = {};

    if (batch.state === 'Complete') {
      console.log("Render results");
      let submissions = batch.submissions;
      submissions.forEach(function (data) {
        // console.log(data);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["a" /* prepare_downloads_html */])(data, downloads_info, job_list, job_names);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["b" /* handle_results */])(ractive, data, file_url, zip, downloads_info, job_names);
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["c" /* set_downloads_panel */])(ractive, downloads_info);

      clearInterval(interval);
    }
    if (batch.state === 'Error' || batch.state === 'Crash') {
      let submission_message = batch.submissions[0].last_message;
      alert("POLLING ERROR: Job Failed\n" + "Please Contact psipred@cs.ucl.ac.uk quoting this error message and your job ID\n" + submission_message);
      clearInterval(interval);
    }
  }, 5000);
}, { init: false,
  defer: true
});

// On clicking the Get Zip file link this watchers prepares the zip and hands it to the user
ractive.on('get_zip', function (context) {
  let uuid = ractive.get('batch_uuid');
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, uuid + ".zip");
  });
});

ractive.on('show_bioserf', function (event) {
  let adv = ractive.get('bioserf_advanced');
  if (adv) {
    ractive.set('bioserf_advanced', 0);
  } else {
    ractive.set('bioserf_advanced', 1);
  }
});
ractive.on('show_domserf', function (event) {
  let adv = ractive.get('domserf_advanced');
  if (adv) {
    ractive.set('domserf_advanced', 0);
  } else {
    ractive.set('domserf_advanced', 1);
  }
});
ractive.on('show_dompred', function (event) {
  let adv = ractive.get('dompred_advanced');
  if (adv) {
    ractive.set('dompred_advanced', 0);
  } else {
    ractive.set('dompred_advanced', 1);
  }
});
ractive.on('show_ffpred', function (event) {
  let adv = ractive.get('ffpred_advanced');
  if (adv) {
    ractive.set('ffpred_advanced', 0);
  } else {
    ractive.set('ffpred_advanced', 1);
  }
});
ractive.on('show_metsite', function (event) {
  let adv = ractive.get('metsite_advanced');
  if (adv) {
    ractive.set('metsite_advanced', 0);
  } else {
    ractive.set('metsite_advanced', 1);
  }
});
ractive.on('show_hspred', function (event) {
  let adv = ractive.get('hspred_advanced');
  if (adv) {
    ractive.set('hspred_advanced', 0);
  } else {
    ractive.set('hspred_advanced', 1);
  }
});
ractive.on('show_memembed', function (event) {
  let adv = ractive.get('memembed_advanced');
  if (adv) {
    ractive.set('memembed_advanced', 0);
  } else {
    ractive.set('memembed_advanced', 1);
  }
});
// These react to the headers being clicked to toggle the panel
//
ractive.on('sequence_active', function (event) {
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 0);
  ractive.set('memembed_advanced', 0);
  ractive.set('hspred_advanced', 0);
  ractive.set('metsite_advanced', 0);
  ractive.set('ffpred_advanced', 0);
  ractive.set('dompred_advanced', 0);
  ractive.set('domserf_advanced', 0);
  ractive.set('bioserf_advanced', 0);
  job_list.forEach(function (job_name) {
    let setting = false;
    if (job_name === 'psipred') {
      setting = true;
    }
    ractive.set(job_name + '_checked', setting);
  });
  ractive.set('sequence_form_visible', null);
  ractive.set('sequence_form_visible', 1);
});

ractive.on('structure_active', function (event) {
  ractive.set('sequence_form_visible', null);
  ractive.set('sequence_form_visible', 0);
  ractive.set('memembed_advanced', 0);
  ractive.set('hspred_advanced', 0);
  ractive.set('metsite_advanced', 0);
  ractive.set('ffpred_advanced', 0);
  ractive.set('dompred_advanced', 0);
  ractive.set('domserf_advanced', 0);
  ractive.set('bioserf_advanced', 0);
  job_list.forEach(function (job_name) {
    ractive.set(job_name + '_checked', false);
  });
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 1);
});

ractive.on('downloads_active', function (event) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["d" /* show_panel */])(1, ractive);
});

//register listeners for each results panel
job_list.forEach(function (job_name, i) {
  console.log("adding jobs watchers");
  ractive.on(job_name + '_active', function (event) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["d" /* show_panel */])(i + 2, ractive);
    if (job_name === "psipred") {
      if (ractive.get('psipred_horiz')) {
        biod3.psipred(ractive.get('psipred_horiz'), 'psipredChart', { parent: 'div.psipred_cartoon', margin_scaler: 2 });
      }
    }
    if (job_name === "disopred") {
      if (ractive.get('diso_precision')) {
        biod3.genericxyLineChart(ractive.get('diso_precision'), 'pos', ['precision'], ['Black'], 'DisoNNChart', { parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
      }
    }
    if (job_name === 'domserf') {
      if (ractive.get('domserf_model_uris').length) {
        let paths = ractive.get('domserf_model_uris');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[0], '#domserf_model', true);
      }
    }
    if (job_name === 'metsite') {
      if (ractive.get('metsite_pdb').length) {
        let met_pdb = ractive.get('metsite_pdb');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(met_pdb, '#metsite_model', false);
      }
    }
    if (job_name === 'hspred') {
      if (ractive.get('hspred_pdb').length) {
        let met_pdb = ractive.get('hspred_pdb');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(met_pdb, '#hspred_model', false);
      }
    }
  });
});

ractive.on('submission_active', function (event) {
  console.log("SUBMISSION ACTIVE");
  let state = ractive.get('submission_widget_visible');

  if (state === 1) {
    ractive.set('submission_widget_visible', 0);
  } else {
    ractive.set('submission_widget_visible', 1);
  }
});

//grab the submit event from the main form and send the sequence to the backend
ractive.on('submit', function (event) {
  let submit_job = false;
  console.log('Submitting data');
  let seq = this.get('sequence');
  seq = seq.replace(/^>.+$/mg, "").toUpperCase();
  seq = seq.replace(/\n|\s/g, "");
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.set('sequence', seq);

  let name = this.get('name');
  let email = this.get('email');
  let check_states = {};
  let struct_type = false;
  let seq_type = false;
  job_list.forEach(function (job_name) {
    check_states[job_name + '_job'] = ractive.get(job_name + '_job');
    check_states[job_name + '_checked'] = ractive.get(job_name + '_checked');
    if (check_states[job_name + '_checked'] && struct_job_list.includes(job_name)) {
      struct_type = true;
    }
    if (check_states[job_name + '_checked'] && seq_job_list.includes(job_name)) {
      seq_type = true;
    }
  });

  let options_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["f" /* set_advanced_params */])();
  //HANDLE FFPRED JOB SELECTION.
  if (check_states.bioserf_checked || check_states.domserf_checked) {
    let bios_modeller_test = test_modeller_key(options_data.bioserf_modeller_key);
    let doms_modeller_test = test_modeller_key(options_data.domserf_modeller_key);
    if (bios_modeller_test || doms_modeller_test) {
      submit_job = true;
    } else {
      alert("You have not provided a valid MODELLER key. Contact the Sali lab for a MODELLER licence.");
    }
  } else {
    submit_job = true;
  }
  if (seq_type && struct_type) {
    alert("You can not submit both sequence and structure analysis jobs");
    submit_job = false;
  }
  if (submit_job) {
    console.log("Submitting");
    if (seq_type) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, seq, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, seq_type, struct_type);
    }
    if (struct_type) {
      let pdbFile = null;
      let pdbData = '';
      try {
        pdbFile = document.getElementById("pdbFile");
        let file = pdbFile.files[0];
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload = function (e) {
          pdbData = fr.result;
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, pdbData, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, seq_type, struct_type);
        };
      } catch (err) {
        pdbData = "";
        console.log(err);
      }
    }
  }
  event.original.preventDefault();
});

// grab the submit event from the Resubmission widget, truncate the sequence
// and send a new job
ractive.on('resubmit', function (event) {
  console.log('Resubmitting segment');
  let start = ractive.get("subsequence_start");
  let stop = ractive.get("subsequence_stop");
  let sequence = ractive.get("sequence");
  let subsequence = sequence.substring(start - 1, stop);
  let name = this.get('name') + "_seg";
  let email = this.get('email');
  ractive.set('sequence_length', subsequence.length);
  ractive.set('subsequence_stop', subsequence.length);
  ractive.set('sequence', subsequence);
  ractive.set('name', name);
  let check_states = {};
  job_list.forEach(function (job_name) {
    check_states[job_name + '_job'] = ractive.get(job_name + '_job');
    check_states[job_name + '_checked'] = ractive.get(job_name + '_checked');
  });
  //clear what we have previously written
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["g" /* clear_settings */])(ractive, gear_string, job_list, job_names);
  //verify form contents and post
  //add form defaults but null the structes ones as we don't allow structure job resubmission
  let options_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["f" /* set_advanced_params */])();
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, subsequence, name, email, submit_url, times_url, check_states, job_list, job_names, true, false);
  //write new annotation diagram
  //submit subsection
  event.original.preventDefault();
});

function test_modeller_key(input) {
  if (input === 'MODELIRANJE') {
    return true;
  }
  return false;
}

// Here having set up ractive and the functions we need we then check
// if we were provided a UUID, If the page is loaded with a UUID rather than a
// form submit.
//TODO: Handle loading that page with use the MEMSAT and DISOPRED UUID
//
if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid && uuid_match) {
  console.log('Caught an incoming UUID');
  seq_observer.cancel();
  ractive.set('results_visible', null); // should make a generic one visible until results arrive.
  ractive.set('results_visible', 2);
  ractive.set("batch_uuid", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid);
  let previous_data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__["b" /* get_previous_data */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["a" /* getUrlVars */])().uuid, submit_url, file_url, ractive);
  let seq_type = true;
  if (previous_data.jobs.includes('psipred')) {
    ractive.set('psipred_button', true);
    ractive.set('results_panel_visible', 2);
  }
  if (previous_data.jobs.includes('pgenthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('results_panel_visible', 3);
  }
  if (previous_data.jobs.includes('metapsicov')) {
    ractive.set('metapsicov_button', true);
    ractive.set('psipred_button', true);
    ractive.set('results_panel_visible', 4);
  }
  if (previous_data.jobs.includes('disopred')) {
    ractive.set('disopred_button', true);
    ractive.set('results_panel_visible', 5);
  }
  if (previous_data.jobs.includes('mempack')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('mempack_button', true);
    ractive.set('results_panel_visible', 6);
  }
  if (previous_data.jobs.includes('memsatsvm')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('results_panel_visible', 7);
  }
  if (previous_data.jobs.includes('genthreader')) {
    ractive.set('genthreader_button', true);
    ractive.set('results_panel_visible', 8);
  }
  if (previous_data.jobs.includes('dompred')) {
    ractive.set('psipred_button', true);
    ractive.set('dompred_button', true);
    ractive.set('results_panel_visible', 9);
  }
  if (previous_data.jobs.includes('pdomthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pdomthreader_button', true);
    ractive.set('results_panel_visible', 10);
  }
  if (previous_data.jobs.includes('bioserf')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('bioserf_button', true);
    ractive.set('results_panel_visible', 11);
  }
  if (previous_data.jobs.includes('domserf')) {
    ractive.set('psipred_button', true);
    ractive.set('pdomthreader_button', true);
    ractive.set('domserf_button', true);
    ractive.set('results_panel_visible', 12);
  }
  if (previous_data.jobs.includes('ffpred')) {
    ractive.set('ffpred_button', true);
    ractive.set('results_panel_visible', 13);
  }
  if (previous_data.jobs.includes('metsite')) {
    ractive.set('metsite_button', true);
    ractive.set('results_panel_visible', 14);
    seq_type = false;
  }
  if (previous_data.jobs.includes('hspred')) {
    ractive.set('hspred_button', true);
    ractive.set('results_panel_visible', 15);
    seq_type = false;
  }
  if (previous_data.jobs.includes('memembed')) {
    ractive.set('memembed_button', true);
    ractive.set('results_panel_visible', 16);
    seq_type = false;
  }
  if (previous_data.jobs.includes('gentdb')) {
    ractive.set('gentdb_button', true);
    ractive.set('results_panel_visible', 17);
    seq_type = false;
  }
  ractive.set('sequence', previous_data.seq);
  ractive.set('email', previous_data.email);
  ractive.set('name', previous_data.name);
  let seq = ractive.get('sequence');
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.fire('poll_trigger', seq_type);
}

///////////////////////////////////////////////////////////////////////////////
//
// New Pannel functions
//
///////////////////////////////////////////////////////////////////////////////


//Reload alignments for JalView for the genTHREADER table
function loadNewAlignment(alnURI, annURI, title) {
  let url = submit_url + ractive.get('batch_uuid');
  window.open(".." + app_path + "/msa/?ann=" + file_url + annURI + "&aln=" + file_url + alnURI, "", "width=800,height=400");
}

//Reload alignments for JalView for the genTHREADER table
function buildModel(alnURI, type) {

  let url = submit_url + ractive.get('batch_uuid');
  let mod_key = ractive.get('modeller_key');
  if (mod_key === 'M' + 'O' + 'D' + 'E' + 'L' + 'I' + 'R' + 'A' + 'N' + 'J' + 'E') {
    //alert(type);
    window.open(".." + app_path + "/model/post?type=" + type + "&aln=" + file_url + alnURI, "", "width=670,height=700");
  } else {
    alert('Please provide a valid M' + 'O' + 'D' + 'E' + 'L' + 'L' + 'E' + 'R Licence Key');
  }
}

// Swaps out the domserf model when those buttons are clicked
function swapDomserf(uri_number) {
  uri_number = uri_number - 1;
  let paths = ractive.get("domserf_model_uris");
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[uri_number], '#domserf_model', true);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verify_and_send_form;
/* unused harmony export verify_struct_form */
/* unused harmony export verify_seq_form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_index_js__ = __webpack_require__(3);




//Takes the data needed to verify the input form data, either the main form
//or the submisson widget verifies that data and then posts it to the backend.
function verify_and_send_form(ractive, data, name, email, submit_url, times_url, check_states, job_list, job_names, options_data, seq_type, struct_type) {
  /*verify that everything here is ok*/
  let error_message = null;
  let job_string = '';
  //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);

  let check_list = [];
  job_list.forEach(function (job_name) {
    check_list.push(check_states[job_name + '_checked']);
  });

  if (seq_type) {
    error_message = verify_seq_form(data, name, email, check_list);
  }
  if (struct_type) {
    error_message = verify_struct_form(data, name, email, check_list);
  }
  if (error_message.length > 0) {
    ractive.set('form_error', error_message);
    alert("FORM ERROR:" + error_message);
  } else {
    //initialise the page
    let response = true;
    ractive.set('results_visible', null);
    //Post the jobs and intialise the annotations for each job
    //We also don't redundantly send extra psipred etc.. jobs
    //byt doing these test in a specific order
    job_list.forEach(function (job_name) {
      if (check_states[job_name + '_checked'] === true) {
        job_string = job_string.concat(job_name + ",");
        ractive.set(job_name + '_button', true);
        if (job_name === 'pgenthreader' || job_name === 'disopred' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'bioserf' || job_name === 'domserf' || job_name === 'metapsicov') {
          ractive.set('psipred_button', true);
          check_states.psipred_checked = false;
        }
        if (job_name === 'bioserf') {
          ractive.set('pgenthreader_button', true);
          check_states.pgenthreader_checked = false;
        }
        if (job_name === 'domserf') {
          ractive.set('pdomthreader_button', true);
          check_states.pdomthreader_checked = false;
        }
        if (job_name === 'mempack') {
          ractive.set('memsatsvm_button', true);
        }
      }
    });

    job_string = job_string.slice(0, -1);
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["e" /* send_job */])(ractive, job_string, data, name, email, submit_url, times_url, job_names, options_data);
    //set visibility and render panel once
    for (let i = 0; i < job_list.length; i++) {
      let job_name = job_list[i];
      if (check_states[job_name + '_checked'] === true && response) {
        ractive.set('results_visible', 2);
        ractive.fire(job_name + '_active');
        if (seq_type) {
          ractive.set('resubmission_visible', 2);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
        }
        break;
      }
    }

    if (!response) {
      window.location.href = window.location.href;
    }
  }
}

function verify_struct_form(struct, job_name, email, checked_array) {
  let error_message = "";
  if (!/^[\x00-\x7F]+$/.test(job_name)) {
    error_message = error_message + "Please restrict Job Names to valid letters numbers and basic punctuation<br />";
  }
  // TODO: one day we should let these services take xml pdb files
  if (!/^HEADER|^ATOM\s+\d+/i.test(struct)) {
    error_message = error_message + "Your file does not look like a plain text ascii pdb file. This service does not accept .gz or xml format pdb files";
  }
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["c" /* isInArray */])(true, checked_array) === false) {
    error_message = error_message + "You must select at least one analysis program";
  }
  return error_message;
}

//Takes the form elements and checks they are valid
function verify_seq_form(seq, job_name, email, checked_array) {
  let error_message = "";
  if (!/^[\x00-\x7F]+$/.test(job_name)) {
    error_message = error_message + "Please restrict Job Names to valid letters numbers and basic punctuation<br />";
  }

  /* length checks */
  if (seq.length > 1500) {
    error_message = error_message + "Your sequence is too long to process<br />";
  }
  if (seq.length < 30) {
    error_message = error_message + "Your sequence is too short to process<br />";
  }

  /* nucleotide checks */
  let nucleotide_count = (seq.match(/A|T|C|G|U|N|a|t|c|g|u|n/g) || []).length;
  if (nucleotide_count / seq.length > 0.95) {
    error_message = error_message + "Your sequence appears to be nucleotide sequence. This service requires protein sequence as input<br />";
  }
  if (/[^ACDEFGHIKLMNPQRSTVWYX_-]+/i.test(seq)) {
    error_message = error_message + "Your sequence contains invalid characters<br />";
  }

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["c" /* isInArray */])(true, checked_array) === false) {
    error_message = error_message + "You must select at least one analysis program";
  }
  return error_message;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjJhMGM0NTIxZmJkMDcyY2M4MzYiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX21ldHNpdGUiLCJyYWN0aXZlIiwiZmlsZSIsIm1ldHNpdGVfdGFibGUiLCJoaXRfcmVnZXgiLCJoaXRfbWF0Y2hlcyIsIm1hdGNoIiwiZm9yRWFjaCIsImxpbmUiLCJpIiwiZW50cmllcyIsInNwbGl0Iiwic2V0IiwicGFyc2VfZmZwcmVkcyIsImxpbmVzIiwiYnBfZGF0YSIsIm1mX2RhdGEiLCJjY19kYXRhIiwidGFibGVfZGF0YSIsInN0YXJ0c1dpdGgiLCJsZW5ndGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsImV4ZWMiLCJpbmNsdWRlcyIsInJlZ2lvbnMiLCJyZWdpb24iLCJwYXJzZUludCIsInNlZyIsInBhcnNlX3NzMiIsImFubm90YXRpb25zIiwic2hpZnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwic3MiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsInBzZXVkb190YWJsZSIsInRhYmxlX2hpdCIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwicGFyc2VfcGFyc2VkcyIsInByZWRpY3Rpb25fcmVnZXgiLCJwcmVkaWN0aW9uX21hdGNoIiwiZGV0YWlscyIsInJlcGxhY2UiLCJ2YWx1ZXMiLCJpbmRleE9mIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZG9tcHJlZCIsInNob3dfcGFuZWwiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiam9iX2xpc3QiLCJqb2JfbmFtZXMiLCJqb2JfbmFtZSIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJoZWFkZXIiLCJwc2lwcmVkIiwibWVtc2F0c3ZtIiwicGdlbnRocmVhZGVyIiwiYmlvc2VyZiIsInBkb210aHJlYWRlciIsImRvbXNlcmYiLCJmZnByZWQiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJwbmdfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwiZG9tc3NlYV9wcmVkX3JlZ2V4IiwiZG9tc3NlYV9yZWdleCIsImRvbXNlcmZfcmVnZXgiLCJmZnByZWRfc2NoX3JlZ2V4IiwiZmZwcmVkX3N2bV9yZWdleCIsImZmcHJlZF9zY2hlbWF0aWNfcmVnZXgiLCJmZnByZWRfdG1fcmVnZXgiLCJmZnByZWRfZmVhdGNmZ19yZWdleCIsImZmcHJlZF9wcmVkc19yZWdleCIsIm1ldGFwc2ljb3ZfZXZfcmVnZXgiLCJtZXRhcHNpY292X3BzaWNvdl9yZWdleCIsIm1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCIsIm1ldHNpdGVfdGFibGVfcmVnZXgiLCJtZXRzaXRlX3BkYl9yZWdleCIsImltYWdlX3JlZ2V4IiwicmVzdWx0cyIsImRvbWFpbl9jb3VudCIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiZG9tc2VyZl9yZXN1bHRfZm91bmQiLCJyZWZvcm1hdF9kb21zZXJmX21vZGVsc19mb3VuZCIsInBzaXByZWRfcmVzdWx0X2ZvdW5kIiwicGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCIsInJlc3VsdF9kaWN0IiwibmFtZSIsImFubl9zZXQiLCJ0bXAiLCJkYXRhX3BhdGgiLCJwYXRoIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJpZCIsInByb2Nlc3NfZmlsZSIsImhvcml6Iiwic3MyX21hdGNoIiwic3MyIiwicGJkYXQiLCJjb21iIiwic2NoZW1lX21hdGNoIiwic2NoZW1hdGljIiwiY2FydG9vbl9tYXRjaCIsImNhcnRvb24iLCJtZW1zYXRfbWF0Y2giLCJtZW1wYWNrIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJnZW50aHJlYWRlciIsImFsaWduIiwicG5nX21hdGNoIiwiYm91bmRhcnlfcG5nIiwiYm91bmRhcnkiLCJwcmVkX21hdGNoIiwiZG9tc3NlYXByZWQiLCJkb21zc2VhX21hdGNoIiwiZG9tc3NlYSIsIm1vZGVsIiwiZGlzcGxheV9zdHJ1Y3R1cmUiLCJoaGJsaXRzIiwicGRiYWEiLCJjYXRoYmxhc3QiLCJwZGJibGFzdCIsImRvbXNlcmZfbWF0Y2giLCJidXR0b25zX3RhZ3MiLCJwYXRocyIsInNjaF9tYXRjaCIsInNjaCIsImZlYXRfbWF0Y2giLCJmZWF0dXJlcyIsInByZWRzX21hdGNoIiwicHJlZHMiLCJtZXRhcHNpY292IiwibWFwIiwiZXZfbWF0Y2giLCJmcmVlY29udGFjdCIsInBzX21hdGNoIiwicHNpY292IiwiY2NfbWF0Y2giLCJjY21wcmVkIiwidGFibGVfbWF0Y2giLCJwZGJfbWF0Y2giLCJtZXRzaXRlIiwidXJpIiwiY3NzX2lkIiwiY2FydG9vbl9jb2xvciIsImF0b20iLCJob3RzcG90X2NvbG9yIiwiYiIsImVsZW1lbnQiLCIkIiwiY29uZmlnIiwiYmFja2dyb3VuZENvbG9yIiwidmlld2VyIiwiJDNEbW9sIiwiY3JlYXRlVmlld2VyIiwiZ2V0X3RleHQiLCJhZGRNb2RlbCIsInNldFN0eWxlIiwiY29sb3JmdW5jIiwiem9vbVRvIiwicmVuZGVyIiwiem9vbSIsInNldF9kb3dubG9hZHNfcGFuZWwiLCJkb3dubG9hZHNfc3RyaW5nIiwiY29uY2F0Iiwic2V0X2FkdmFuY2VkX3BhcmFtcyIsIm9wdGlvbnNfZGF0YSIsInBzaWJsYXN0X2RvbXByZWRfZXZhbHVlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVyciIsInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyIsImJpb3NlcmZfbW9kZWxsZXJfa2V5IiwiZG9tc2VyZl9tb2RlbGxlcl9rZXkiLCJmZnByZWRfdHlwZSIsIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4iLCJleHRyYWN0X2Zhc3RhX2NoYWluIiwic2VlZFNpdGVGaW5kX2NoYWluIiwibWV0cHJlZF93cmFwcGVyX2NoYWluIiwic2VlZFNpdGVGaW5kX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX21ldGFsIiwibWV0cHJlZF93cmFwcGVyX2ZwciIsImhzcHJlZF9jaGVja2NoYWluc19jaGFpbnMiLCJoc19wcmVkX2ZpcnN0X2NoYWluIiwic3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluIiwiaHNfcHJlZF9zZWNvbmRfY2hhaW4iLCJzcGxpdF9wZGJfZmlsZXNfc2Vjb25kX2NoYWluIiwic2VuZF9yZXF1ZXN0IiwidXJsIiwic2VuZF9kYXRhIiwicmVzcG9uc2UiLCJhamF4IiwiY2FjaGUiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwiYXN5bmMiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlSlNPTiIsInNlbmRfam9iIiwiZW1haWwiLCJzdWJtaXRfdXJsIiwidGltZXNfdXJsIiwiQmxvYiIsImUiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVzcG9uc2VfZGF0YSIsInRpbWVzIiwiayIsImZpcmUiLCJhY3RpdmUiLCJnZXRfcHJldmlvdXNfZGF0YSIsInV1aWQiLCJzdWJtaXNzaW9uX3Jlc3BvbnNlIiwic3VibWlzc2lvbnMiLCJpbnB1dF9maWxlIiwiam9icyIsInN1Ym1pc3Npb24iLCJzbGljZSIsInN1Ym1pc3Npb25fbmFtZSIsInVybF9zdHViIiwiY3RsIiwicGF0aF9iaXRzIiwiZm9sZGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzSW5BcnJheSIsImFycmF5IiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibSIsImtleSIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsInN0eWxlIiwiZ2V0RW1QaXhlbHMiLCJleHRyYUJvZHkiLCJjcmVhdGVFbGVtZW50IiwiY3NzVGV4dCIsImluc2VydEJlZm9yZSIsImJvZHkiLCJ0ZXN0RWxlbWVudCIsImFwcGVuZENoaWxkIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsImNsaXBib2FyZCIsIkNsaXBib2FyZCIsIm9uIiwiZW5kcG9pbnRzX3VybCIsImdlYXJzX3N2ZyIsIm1haW5fdXJsIiwiYXBwX3BhdGgiLCJzZXFfam9iX2xpc3QiLCJzdHJ1Y3Rfam9iX2xpc3QiLCJob3N0bmFtZSIsImluaXRpYWxpc2F0aW9uX2RhdGEiLCJzZXF1ZW5jZV9mb3JtX3Zpc2libGUiLCJzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlIiwicmVzdWx0c192aXNpYmxlIiwicmVzdWJtaXNzaW9uX3Zpc2libGUiLCJyZXN1bHRzX3BhbmVsX3Zpc2libGUiLCJzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlIiwiYmlvc2VyZl9hZHZhbmNlZCIsImRvbXNlcmZfYWR2YW5jZWQiLCJkb21wcmVkX2FkdmFuY2VkIiwiZmZwcmVkX2FkdmFuY2VkIiwibWV0c2l0ZV9hZHZhbmNlZCIsImhzcHJlZF9hZHZhbmNlZCIsIm1lbWVtYmFkX2FkdmFuY2VkIiwibW9kZWxsZXJfa2V5IiwiZG93bmxvYWRfbGlua3MiLCJwc2lwcmVkX2hvcml6IiwiZGlzb19wcmVjaXNpb24iLCJtZW1zYXRzdm1fc2NoZW1hdGljIiwibWVtc2F0c3ZtX2NhcnRvb24iLCJwZ2VuX3RhYmxlIiwicGdlbl9hbm5fc2V0IiwibWVtc2F0cGFja19zY2hlbWF0aWMiLCJtZW1zYXRwYWNrX2NhcnRvb24iLCJnZW5fdGFibGUiLCJnZW5fYW5uX3NldCIsInBhcnNlZHNfaW5mbyIsInBhcnNlZHNfcG5nIiwiZGdlbl90YWJsZSIsImRnZW5fYW5uX3NldCIsImJpb3NlcmZfbW9kZWwiLCJkb21zZXJmX2J1dHRvbnMiLCJkb21zZXJmX21vZGVsX3VyaXMiLCJmZnByZWRfY2FydG9vbiIsInNjaF9zY2hlbWF0aWMiLCJmdW5jdGlvbl90YWJsZXMiLCJtZXRhcHNpY292X21hcCIsIm1ldHNpdGVfcGRiIiwiaHNwcmVkX3RhYmxlIiwiaHNwcmVkX3BkYiIsIm1ldGFwc2ljb3ZfZGF0YSIsIm1ldHNpdGVfZGF0YSIsImhzcHJlZF9kYXRhIiwibWVtZW1iZWRfZGF0YSIsImdlbnRkYl9kYXRhIiwic2VxdWVuY2UiLCJzZXF1ZW5jZV9sZW5ndGgiLCJzdWJzZXF1ZW5jZV9zdGFydCIsInN1YnNlcXVlbmNlX3N0b3AiLCJiYXRjaF91dWlkIiwibWV0c2l0ZV9jaGVja2VkIiwiUmFjdGl2ZSIsImVsIiwidGVtcGxhdGUiLCJ1dWlkX3JlZ2V4IiwidXVpZF9tYXRjaCIsInNlcV9vYnNlcnZlciIsIm9ic2VydmUiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiaW5pdCIsImRlZmVyIiwic2VxX2xlbmd0aCIsInNlcV9zdGFydCIsInNlcV9zdG9wIiwic2VxX3R5cGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImJhdGNoIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwic3VibWlzc2lvbl9tZXNzYWdlIiwibGFzdF9tZXNzYWdlIiwiY29udGV4dCIsImdlbmVyYXRlQXN5bmMiLCJ0aGVuIiwiYmxvYiIsInNhdmVBcyIsImV2ZW50IiwiYWR2Iiwic2V0dGluZyIsIm1ldF9wZGIiLCJzdWJtaXRfam9iIiwidG9VcHBlckNhc2UiLCJjaGVja19zdGF0ZXMiLCJzdHJ1Y3RfdHlwZSIsImJpb3NlcmZfY2hlY2tlZCIsImRvbXNlcmZfY2hlY2tlZCIsImJpb3NfbW9kZWxsZXJfdGVzdCIsInRlc3RfbW9kZWxsZXJfa2V5IiwiZG9tc19tb2RlbGxlcl90ZXN0IiwidmVyaWZ5X2FuZF9zZW5kX2Zvcm0iLCJwZGJGaWxlIiwicGRiRGF0YSIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9ubG9hZCIsInJlc3VsdCIsIm9yaWdpbmFsIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsInN0b3AiLCJzdWJzZXF1ZW5jZSIsImlucHV0IiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsInN3YXBEb21zZXJmIiwidXJpX251bWJlciIsImVycm9yX21lc3NhZ2UiLCJqb2Jfc3RyaW5nIiwiY2hlY2tfbGlzdCIsInZlcmlmeV9zZXFfZm9ybSIsInZlcmlmeV9zdHJ1Y3RfZm9ybSIsInBzaXByZWRfY2hlY2tlZCIsInBnZW50aHJlYWRlcl9jaGVja2VkIiwicGRvbXRocmVhZGVyX2NoZWNrZWQiLCJzdHJ1Y3QiLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNB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QUFFRCxNQUFHLGlHQUFBM0osQ0FBVSxJQUFWLEVBQWdCb0ssYUFBaEIsTUFBbUMsS0FBdEMsRUFBNkM7QUFDM0NULG9CQUFnQkEsZ0JBQWdCLCtDQUFoQztBQUNEO0FBQ0QsU0FBT0EsYUFBUDtBQUNELEMiLCJmaWxlIjoicHNpcHJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MmEwYzQ1MjFmYmQwNzJjYzgzNiIsIi8vIHBhcnNlIHRoZSBzbWFsbCBtZXRzaXRlIG91dHB1dCB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21ldHNpdGUocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IG1ldHNpdGVfdGFibGUgPSAnPGJyIC8+PHRhYmxlPjx0cj48dGQgYmdjb2xvcj1cIiNmZjAwMDBcIiBzdHlsZT1cImJvcmRlci1zdHlsZTpzb2xpZDsgYm9yZGVyLXdpZHRoOjFweDsgYm9yZGVyLWNvbG9yOiMwMDAwMDBcIj4mbmJzcDsmbmJzcDs8L3RkPjx0ZD4mbmJzcDtNZXRhbCBCaW5kaW5nIENvbnRhY3Q8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDAwMFwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO0NoYWluIG5vdCBwcmVkaWN0ZWQ8L3RkPjwvdHI+JztcbiAgbWV0c2l0ZV90YWJsZSArPSAnPHRyPjx0ZCBiZ2NvbG9yPVwiIzAwMDBmZlwiIHN0eWxlPVwiYm9yZGVyLXN0eWxlOnNvbGlkOyBib3JkZXItd2lkdGg6MXB4OyBib3JkZXItY29sb3I6IzAwMDAwMFwiPiZuYnNwOyZuYnNwOzwvdGQ+PHRkPiZuYnNwO1ByZWRpY3RlZCBjaGFpbjwvdGQ+PC90cj48L3RhYmxlPjxiciAvPic7XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPlJlc2lkdWUgTnVtYmVyPC90aD48dGg+UmF3IE5ldXJhbCBOZXR3b3JrIFNjb3JlPC90aD48dGg+UmVzaWR1ZTwvdGg+JztcbiAgbGV0IGhpdF9yZWdleCA9IC9cXGQrXFxzLis/XFxzXFx3ezN9XFxkKy9nO1xuICBsZXQgaGl0X21hdGNoZXMgPSBmaWxlLm1hdGNoKGhpdF9yZWdleCk7XG4gIGlmKGhpdF9tYXRjaGVzKVxuICB7XG4gICAgaGl0X21hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzLyk7XG4gICAgICBtZXRzaXRlX3RhYmxlICs9ICc8dHI+PHRkPicrZW50cmllc1swXSsnPC90ZD48dGQ+JytlbnRyaWVzWzFdKyc8L3RkPjx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+PC90cj4nO1xuICAgIH0pO1xuICB9XG4gIG1ldHNpdGVfdGFibGUgKz0gJzx0YWJsZT4nO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG1ldHNpdGVfdGFibGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKXtcblxuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGJwX2RhdGEgPSBbXTtcbiAgbGV0IG1mX2RhdGEgPSBbXTtcbiAgbGV0IGNjX2RhdGEgPSBbXTtcbiAgbGV0IHRhYmxlX2RhdGEgPSAnJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoJyMnKSl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoIDwgNCl7cmV0dXJuO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQlAnKXticF9kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdDQycpe2NjX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ01GJyl7bWZfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgfSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkJpb2xvZ2ljYWwgUHJvY2VzcyBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgYnBfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+TW9sZWN1bGFyIEZ1bmN0aW9uIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBtZl9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5DZWxsdWxhciBDb21wb25lbnQgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGNjX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgdGFibGVfZGF0YSArPSAnVGhlc2UgcHJlZGljdGlvbiB0ZXJtcyByZXByZXNlbnQgdGVybXMgcHJlZGljdGVkIHdoZXJlIFNWTSB0cmFpbmluZyBpbmNsdWRlcyBhc3NpZ25lZCBHTyB0ZXJtcyBhY3Jvc3MgYWxsIGV2aWRlbmNlIGNvZGUgdHlwZXMuIFNWTSByZWxpYWJpbGl0eSBpcyByZWdhcmRlZCBhcyBIaWdoIChIKSB3aGVuIE1DQywgc2Vuc2l0aXZpdHksIHNwZWNpZmljaXR5IGFuZCBwcmVjaXNpb24gYXJlIGpvaW50bHkgYWJvdmUgYSBnaXZlbiB0aHJlc2hvbGQuIG90aGVyd2lzZSBSZWxpYWJpbGl0eSBpcyBpbmRpY2F0ZWQgYXMgTG93IChMKS4gPGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG59XG5cbmZ1bmN0aW9uIHNldF9hYW5vcm0oKXtcbiAgbGV0IGhBQV9ub3JtID0ge307XG4gIGhBQV9ub3JtLkEgPSB7IHZhbDogMC4wNzE3ODMyNDgwMDYzMDksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjczNjc2NjE1MjQyNzV9O1xuICBoQUFfbm9ybS5WID0geyB2YWw6IDAuMDU5NjI0NTk1MzY5OTAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMzc3NzkxNTI4NzQ1fTtcbiAgaEFBX25vcm0uWSA9IHsgdmFsOiAwLjAyNjA3NTA2ODI0MDQzNyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNDgyMjQ3MTUzMTM3OX07XG4gIGhBQV9ub3JtLlcgPSB7IHZhbDogMC4wMTQxNjYwMDI2MTI3NzEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTA0NzE4MzU4MDE5OTZ9O1xuICBoQUFfbm9ybS5UID0geyB2YWw6IDAuMDUyNTkzNTgyOTcyNzE0LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMDk0NzkzOTY0NTk3fTtcbiAgaEFBX25vcm0uUyA9IHsgdmFsOiAwLjA4MjEyMzI0MTMzMjA5OSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyODY4NzU2NjA4MTUxMn07XG4gIGhBQV9ub3JtLlAgPSB7IHZhbDogMC4wNjU1NTc1MzEzMjIyNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzQyMzkzOTg0OTY3MzZ9O1xuICBoQUFfbm9ybS5GID0geyB2YWw6IDAuMDM3MTAzOTk0OTY5MDAyLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NTQzNDIzMTM5MTg2fTtcbiAgaEFBX25vcm0uTSA9IHsgdmFsOiAwLjAyMjU2MjgxODE4Mzk1NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMTMyMTAzOTY2MjQ4MX07XG4gIGhBQV9ub3JtLksgPSB7IHZhbDogMC4wNTQ4MzM5NzkyNjkxODUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjkyNjQwODM2NjcxNTd9O1xuICBoQUFfbm9ybS5MID0geyB2YWw6IDAuMTAwMTA1OTE1NzU5MDYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAyNzY4MDg1MTkwMDl9O1xuICBoQUFfbm9ybS5JID0geyB2YWw6IDAuMDQyMDM0NTI2MDQwNDY3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODI2ODQ5MjYyNDk1fTtcbiAgaEFBX25vcm0uSCA9IHsgdmFsOiAwLjAyNzE0MTQwMzUzNzU5OCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNTUwNTY2Mzc4OTg1fTtcbiAgaEFBX25vcm0uRyA9IHsgdmFsOiAwLjA2OTE3OTgyMDEwNDUzNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDA4NzU2MjA1NzMyOH07XG4gIGhBQV9ub3JtLlEgPSB7IHZhbDogMC4wNjU5MjA1NjE5MzE4MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAxMDMwOTEwMDgzNjZ9O1xuICBoQUFfbm9ybS5FID0geyB2YWw6IDAuMDQ2NDc4NDYyMjU4MzgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTk5NDYyNjk0NjE3MzZ9O1xuICBoQUFfbm9ybS5DID0geyB2YWw6IDAuMDI0OTA4NTUxODcyMDU2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODIyOTA5NTg5NTA0fTtcbiAgaEFBX25vcm0uRCA9IHsgdmFsOiAwLjA0NDMzNzkwNDcyNjA0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODQzNjY3NzI1NjcyNn07XG4gIGhBQV9ub3JtLk4gPSB7IHZhbDogMC4wMzM1MDcwMjA5ODcwMzMsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTY1MzYwMjIyODgyMDR9O1xuICBoQUFfbm9ybS5SID0geyB2YWw6IDAuMDU5NzQwNDY5MDMxMTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjUxNjU5OTQ3NzMzODR9O1xuICByZXR1cm4oaEFBX25vcm0pO1xufVxuXG5mdW5jdGlvbiBzZXRfZm5vcm0oKXtcbiAgbGV0IGhGX25vcm0gPSB7fTtcbiAgaEZfbm9ybS5oeWRyb3Bob2JpY2l0eSA9IHt2YWw6IC0wLjM0ODc2ODI4MDgwMTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMC43NTU1OTE1Mjc2OTc5OX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgcG9zaXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjQ1NzcxNzQ2Njk0OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMy41NjcxMzMzNDExMzl9O1xuICBoRl9ub3JtWydhbGlwaGF0aWMgaW5kZXgnXSA9IHt2YWw6IDc5LjkxMTU0OTMxOTA5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi43ODc2MTc5Nzg4Mjd9O1xuICBoRl9ub3JtWydpc29lbGVjdHJpYyBwb2ludCddID0ge3ZhbDogNy42MTAyMDQ2MzgzNjAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMS45NzE2MTExMDIwMDg4fTtcbiAgaEZfbm9ybVsnbW9sZWN1bGFyIHdlaWdodCddID0ge3ZhbDogNDg2NjguNDEyODM5OTYxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzNzgzOC4zMjQ4OTU5Njl9O1xuICBoRl9ub3JtLmNoYXJnZSA9IHt2YWw6IDUuMDk5MTc2MzA1NzYwNCxcbiAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi44Mzg2MzY1OTAyNX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgbmVnYXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjAyNjE5MDEyODE3NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogNC4wMjA2NjMxNjgwOTI2fTtcbiAgaEZfbm9ybVsnbW9sYXIgZXh0aW5jdGlvbiBjb2VmZmljaWVudCddID0ge3ZhbDogNDY0NzUuMjkzOTIzOTI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzOTI5OS4zOTk4NDg4MjN9O1xuICByZXR1cm4oaEZfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIGdldF9hYV9jb2xvcih2YWwpe1xuICAgIGxldCBhYl92YWwgPSBNYXRoLmFicyh2YWwpO1xuICAgIGlmKGFiX3ZhbCA+PSAyLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjFwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAyLjI0KXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMnBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjJuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmNXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjVuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuNjQ1ICkge1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxMHBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjEwblwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJwbGFpblwiO1xufVxuXG4vL3BhcnNlIHRoZSBmZnByZWQgZmVhdGNmbyBmZWF0dXJlcyBmaWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IFNGX2RhdGEgPSB7fTtcbiAgbGV0IEFBX2RhdGEgPSB7fTtcbiAgbGV0IGhGX25vcm0gPXNldF9mbm9ybSgpO1xuICBsZXQgaEFBX25vcm09c2V0X2Fhbm9ybSgpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIkFBXCIpKXtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBBQV9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiU0ZcIikpXG4gICAge1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIFNGX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gYnVpbGQgaHRtbCB0YWJsZXMgZm9yIHRoZSBmZWF0dXJlIGRhdGFcbiAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICBsZXQgZ2xvYmFsX2ZlYXR1cmVzID0gcmFjdGl2ZS5nZXQoJ2dsb2JhbF9mZWF0dXJlcycpO1xuICBsZXQgZmVhdF90YWJsZSA9ICc8Yj5HbG9iYWwgRmVhdHVyZXM8L2I+PGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnR2xvYmFsIGZlYXR1cmVzIGFyZSBjYWxjdWxhdGVkIGRpcmVjdGx5IGZyb20gc2VxdWVuY2UuIExvY2FsaXNhdGlvbiB2YWx1ZXMgYXJlIHByZWRpY3RlZCBieSB0aGUgUHNvcnQgYWxnb3JpdGhtIGFuZCByZWZsZWN0IHRoZSByZWxhdGl2ZSBsaWtlbGlob29kIG9mIHRoZSBwcm90ZWluIG9jY3VweWluZyBkaWZmZXJlbnQgY2VsbHVsYXIgbG9jYWxpc2F0aW9ucy4gVGhlIGJpYXMgY29sdW1uIGlzIGhpZ2hsaWdodGVkIGFjY29yZGluZyB0byB0aGUgc2lnbmlmaWNhbmNlIG9mIHRoZSBmZWF0dXJlIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBaIHNjb3JlIG9mIHRoZSBmZWF0dXJlLjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkZlYXR1cmUgTmFtZTwvdGg+PHRoPlZhbHVlPC90aD48dGg+QmlhczwvdGg+PC90cj4nO1xuXG4gIE9iamVjdC5rZXlzKFNGX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmVfbmFtZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGlmKGZlYXR1cmVfbmFtZSBpbiBoRl9ub3JtKXtcbiAgICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvciggKHBhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS1oRl9ub3JtW2ZlYXR1cmVfbmFtZV0udmFsKSAvIGhGX25vcm1bZmVhdHVyZV9uYW1lXS5zZGUpO1xuICAgIH1cbiAgICBmZWF0X3RhYmxlICs9ICc8dHI+PHRkPicrZmVhdHVyZV9uYW1lKyc8L3RkPjx0ZD4nK3BhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS50b0ZpeGVkKDIpKyc8L3RkPjx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPjwvdHI+JztcbiAgfSk7XG4gIGZlYXRfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIGZlYXRfdGFibGUpO1xuXG4gIC8vYnVpbGQgaHRtbCB0YWJsZSBmb3IgdGhlIEFBIGRhdGFcbiAgbGV0IGFhX2NvbXBvc2l0aW9uID0gcmFjdGl2ZS5nZXQoJ2FhX2NvbXBvc2l0aW9uJyk7XG4gIGxldCBhYV90YWJsZSA9ICc8Yj5BbWlubyBBY2lkIENvbXBvc2l0aW9uIChwZXJjZW50YWdlcyk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZT48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgYWFfdGFibGUgKz0gJzx0aD4nK3Jlc2lkdWUrJzwvdGg+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKChwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pLWhBQV9ub3JtW3Jlc2lkdWVdLnZhbCkgLyBoQUFfbm9ybVtyZXNpZHVlXS5zZGUpO1xuICAgIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JysocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKSoxMDApLnRvRml4ZWQoMikrJzwvdGQ+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzxiPlNpZ25pZmljYW5jZSBLZXk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSBjbGFzcz1cInNpZ25pZmtleVwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIyXCIgY2VsbHNwYWNpbmc9XCIwXCI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjxiPmxvdzwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjlcIj4mbmJzcDs8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgYWxpZ249XCJyaWdodFwiPjxiPmhpZ2g8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMW5cIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJuXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1blwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBuXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD5wICZndDs9IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwcFwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1cFwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMnBcIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFwXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjExXCI+U2lnbmlmaWNhbmNlIHAgdmFsdWUgaXMgY2FsY3VsYXRlZCB1c2luZyB0aGUgWiBzY29yZSBvZiB0aGUgcGVyY2VudCBhbWlubyBhY2lkIGNvbXBvc2l0aW9uPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBhYV90YWJsZSk7XG59XG5cblxuLy8gZm9yIGEgZ2l2ZW4gbWVtc2F0IGRhdGEgZmlsZXMgZXh0cmFjdCBjb29yZGluYXRlIHJhbmdlcyBnaXZlbiBzb21lIHJlZ2V4XG5leHBvcnQgZnVuY3Rpb24gZ2V0X21lbXNhdF9yYW5nZXMocmVnZXgsIGRhdGEpXG57XG4gICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBpZihtYXRjaFsxXS5pbmNsdWRlcygnLCcpKVxuICAgIHtcbiAgICAgIGxldCByZWdpb25zID0gbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24sIGkpe1xuICAgICAgICByZWdpb25zW2ldID0gcmVnaW9uLnNwbGl0KCctJyk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMF0gPSBwYXJzZUludChyZWdpb25zW2ldWzBdKTtcbiAgICAgICAgcmVnaW9uc1tpXVsxXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIGVsc2UgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJy0nKSlcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoWzFdKTtcbiAgICAgICAgbGV0IHNlZyA9IG1hdGNoWzFdLnNwbGl0KCctJyk7XG4gICAgICAgIGxldCByZWdpb25zID0gW1tdLCBdO1xuICAgICAgICByZWdpb25zWzBdWzBdID0gcGFyc2VJbnQoc2VnWzBdKTtcbiAgICAgICAgcmVnaW9uc1swXVsxXSA9IHBhcnNlSW50KHNlZ1sxXSk7XG4gICAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuKG1hdGNoWzFdKTtcbn1cblxuLy8gdGFrZSBhbmQgc3MyIChmaWxlKSBhbmQgcGFyc2UgdGhlIGRldGFpbHMgYW5kIHdyaXRlIHRoZSBuZXcgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBhbm5vdGF0aW9uc1tpXS5zcyA9IGVudHJpZXNbM107XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBhbGVydChcIlNTMiBhbm5vdGF0aW9uIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBxdWVyeSBzZXF1ZW5jZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuKGFubm90YXRpb25zKTtcbn1cblxuLy90YWtlIHRoZSBkaXNvcHJlZCBwYmRhdCBmaWxlLCBwYXJzZSBpdCBhbmQgYWRkIHRoZSBhbm5vdGF0aW9ucyB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICctJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnRCc7fVxuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnXicpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ1BCJzt9XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5UYXJnZXQgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5RdWVyeSBMZW48L3RoPic7XG4gIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIFN0YXJ0PC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBFbmQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSCBEb21haW48L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gIH1lbHNlIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Gb2xkPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBTQ09QPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBDQVRIPC90aD4nO1xuICB9XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJjYXRoX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly93d3cucmNzYi5vcmcvcGRiL2V4cGxvcmUvZXhwbG9yZS5kbz9zdHJ1Y3R1cmVJZD1cIitwZGIrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5DQVRIIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJwZGJfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8L3RyPlxcblwiO1xuICAgIH1cbiAgfSk7XG4gIHBzZXVkb190YWJsZSArPSBcIjwvdGJvZHk+PC90YWJsZT5cXG5cIjtcbiAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBwc2V1ZG9fdGFibGUpO1xuICB9XG4gIGVsc2Uge1xuICAgICAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBcIjxoMz5ObyBnb29kIGhpdHMgZm91bmQuIEdVRVNTIGFuZCBMT1cgY29uZmlkZW5jZSBoaXRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgcmVzdWx0cyBmaWxlPC9oMz5cIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWRpY3Rpb25fcmVnZXggPSAvRG9tYWluXFxzQm91bmRhcnlcXHNsb2NhdGlvbnNcXHNwcmVkaWN0ZWRcXHNEUFM6XFxzKC4rKS87XG4gIGxldCBwcmVkaWN0aW9uX21hdGNoID0gIHByZWRpY3Rpb25fcmVnZXguZXhlYyhmaWxlKTtcbiAgaWYocHJlZGljdGlvbl9tYXRjaClcbiAge1xuICAgIGxldCBkZXRhaWxzID0gZmlsZS5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgZGV0YWlscyA9IGRldGFpbHMucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiPGg0PlwiK2RldGFpbHMrXCI8L2g0PlwiKTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgaWYocHJlZGljdGlvbl9tYXRjaFsxXS5pbmRleE9mKFwiLFwiKSlcbiAgICB7XG4gICAgICB2YWx1ZXMgPSBwcmVkaWN0aW9uX21hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaSl7XG4gICAgICAgIHZhbHVlc1tpXSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQocHJlZGljdGlvbl9tYXRjaFsxXSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpe1xuICAgICAgYW5ub3RhdGlvbnNbdmFsdWVdLmRvbXByZWQgPSAnQic7XG4gICAgfSk7XG4gICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiTm8gUGFyc2VEUyBEb21haW4gYm91bmRhcmllcyBwcmVkaWN0ZWRcIik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMiLCJpbXBvcnQgeyBwcm9jZXNzX2ZpbGUgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfdGV4dCB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dfcGFuZWwodmFsdWUsIHJhY3RpdmUpXG57XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIHZhbHVlICk7XG59XG5cbi8vYmVmb3JlIGEgcmVzdWJtaXNzaW9uIGlzIHNlbnQgYWxsIHZhcmlhYmxlcyBhcmUgcmVzZXQgdG8gdGhlIHBhZ2UgZGVmYXVsdHNcbmV4cG9ydCBmdW5jdGlvbiBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcyl7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsICcnKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgnZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfaW5mbycsIG51bGwpO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fYW5uX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfbW9kZWwnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9ucycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfbW9kZWxfdXJpczonLCBbXSk7XG4gIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljOicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X21hcCcsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90YWJsZScsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX3BkYicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3BkYicsIG51bGwpO1xuXG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJyxudWxsKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5zZXF1ZW5jZV9wbG90Jyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYucHNpcHJlZF9jYXJ0b29uJyk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuY29tYl9wbG90Jyk7XG5cbiAgemlwID0gbmV3IEpTWmlwKCk7XG59XG5cbi8vVGFrZSBhIGNvdXBsZSBvZiB2YXJpYWJsZXMgYW5kIHByZXBhcmUgdGhlIGh0bWwgc3RyaW5ncyBmb3IgdGhlIGRvd25sb2FkcyBwYW5lbFxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8sIGpvYl9saXN0LCBqb2JfbmFtZXMpXG57XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGlmKGRhdGEuam9iX25hbWUgPT09IGpvYl9uYW1lKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXSA9IHt9O1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIC8vRVhUUkEgUEFORUxTIEZPUiBTT01FIEpPQlMgVFlQRVM6XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkb21wcmVkJyAgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAncGRvbXRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ21ldGFwc2ljb3YnIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnYmlvc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBnZW50aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmJpb3NlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucHNpcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXI9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBkb210aHJlYWRlcitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmRvbXNlcmYrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5Qc2lwcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQ9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZmZwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy90YWtlIHRoZSBkYXRhYmxvYiB3ZSd2ZSBnb3QgYW5kIGxvb3Agb3ZlciB0aGUgcmVzdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvLCBqb2JfbmFtZXMpXG57XG4gIGxldCBob3Jpel9yZWdleCA9IC9cXC5ob3JpeiQvO1xuICBsZXQgc3MyX3JlZ2V4ID0gL1xcLnNzMiQvO1xuICBsZXQgcG5nX3JlZ2V4ID0gL1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2NhcnRvb25fcmVnZXggPSAvX2NhcnRvb25fbWVtc2F0X3N2bVxcLnBuZyQvO1xuICBsZXQgbWVtc2F0X3NjaGVtYXRpY19yZWdleCA9IC9fc2NoZW1hdGljXFwucG5nJC87XG4gIGxldCBtZW1zYXRfZGF0YV9yZWdleCA9IC9tZW1zYXRfc3ZtJC87XG4gIGxldCBtZW1wYWNrX2NhcnRvb25fcmVnZXggPSAvS2FtYWRhLUthd2FpX1xcZCsucG5nJC87XG4gIGxldCBtZW1wYWNrX2dyYXBoX291dCA9IC9pbnB1dF9ncmFwaC5vdXQkLztcbiAgbGV0IG1lbXBhY2tfY29udGFjdF9yZXMgPSAvQ09OVEFDVF9ERUYxLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfbGlwaWRfcmVzID0gL0xJUElEX0VYUE9TVVJFLnJlc3VsdHMkLztcbiAgbGV0IGRvbXNzZWFfcHJlZF9yZWdleCA9IC9cXC5wcmVkJC87XG4gIGxldCBkb21zc2VhX3JlZ2V4ID0gL1xcLmRvbXNzZWEkLztcbiAgbGV0IGRvbXNlcmZfcmVnZXggPSAvLitfKFxcZCspXyhcXGQrKS4qXFwucGRiLztcbiAgbGV0IGZmcHJlZF9zY2hfcmVnZXggPSAvLitfc2NoXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zdm1fcmVnZXggPSAvLitfY2FydG9vbl9tZW1zYXRfc3ZtXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF9zY2hlbWF0aWNfcmVnZXggPSAvLitfc2NoZW1hdGljXy4qXFwucG5nLztcbiAgbGV0IGZmcHJlZF90bV9yZWdleCA9IC8uK190bXBcXC5wbmcvO1xuICBsZXQgZmZwcmVkX2ZlYXRjZmdfcmVnZXggPSAvXFwuZmVhdGNmZy87XG4gIGxldCBmZnByZWRfcHJlZHNfcmVnZXggPSAvXFwuZnVsbF9yYXcvO1xuICBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgbGV0IG1ldHNpdGVfdGFibGVfcmVnZXggPSAvXFwuTWV0cHJlZC87XG4gIGxldCBtZXRzaXRlX3BkYl9yZWdleCA9IC9cXC5NZXRQcmVkLztcblxuXG4gIGxldCBpbWFnZV9yZWdleCA9ICcnO1xuICBsZXQgcmVzdWx0cyA9IGRhdGEucmVzdWx0cztcbiAgbGV0IGRvbWFpbl9jb3VudCA9IDA7XG4gIGxldCBtZW1wYWNrX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgZG9tc2VyZl9yZXN1bHRfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kID0gZmFsc2U7XG4gIGxldCBwc2lwcmVkX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICAvL1ByZXBhdG9yeSBsb29wIGZvciBpbmZvcm1hdGlvbiB0aGF0IGlzIG5lZWRlZCBiZWZvcmUgcmVzdWx0cyBwYXJzaW5nOlxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX2dlbmFsaWdubWVudF9hbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdHZW5BbGlnbm1lbnRBbm5vdGF0aW9uX2RvbScpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwiZGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAvL21haW4gcmVzdWx0cyBwYXJzaW5nIGxvb3BcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIC8vcHNpcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT0gJ3BzaXBhc3MyJylcbiAgICB7XG4gICAgICBwc2lwcmVkX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgICBsZXQgbWF0Y2ggPSBob3Jpel9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdob3JpeicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SG9yaXogRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuXG4gICAgICB9XG4gICAgICBsZXQgc3MyX21hdGNoID0gc3MyX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNzMl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TUzIgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3NzMicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vZGlzb3ByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19mb3JtYXQnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGJkYXQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QQkRBVCBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19jb21iaW5lJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2NvbWInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNPTUIgTk4gT3V0cHV0PC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgLy9tZW1zYXQgYW5kIG1lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtc2F0c3ZtJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHNjaGVtZV9tYXRjaCA9IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoZW1lX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TY2hlbWF0aWMgRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSBtZW1zYXRfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IG1lbXNhdF9tYXRjaCA9IG1lbXNhdF9kYXRhX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1lbXNhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ21lbXNhdGRhdGEnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1lbXNhdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgLy9tZW1wYWNrIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXBhY2tfd3JhcHBlcicpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja190aW1lXCIsICcnKTtcbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIG1lbXBhY2tfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICBtZW1wYWNrX3Jlc3VsdF9mb3VuZCA9IHRydWU7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aW1nIHdpZHRoPVwiMTAwMHB4XCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGdyYXBoX21hdGNoID0gIG1lbXBhY2tfZ3JhcGhfb3V0LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGdyYXBoX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RGlhZ3JhbSBEYXRhPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY29udGFjdF9tYXRjaCA9ICBtZW1wYWNrX2NvbnRhY3RfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNvbnRhY3RfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jb250YWN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGxpcGlkX21hdGNoID0gIG1lbXBhY2tfbGlwaWRfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGxpcGlkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TGlwaWQgRXhwb3N1cmUgUHJlZGl0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vZ2VudGhyZWFkZXIgYW5kIHBnZW50aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzb3J0X3ByZXN1bHQnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9zb3J0X3ByZXN1bHRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdnZW5fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLmdlbnRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfbW9kZWxzJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbnRocmVhZGVyX3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgLy9wZG9tdGhyZWFkZXJcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnc3ZtX3Byb2JfZG9tJylcbiAgICB7XG4gICAgICBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2RvbV9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBkb210aHJlYWRlcisnIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2RvbV9hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICAvL2RvbXByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGFyc2VkcycpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF90aW1lXCIsICcnKTtcbiAgICAgIGxldCBwbmdfbWF0Y2ggPSBwbmdfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocG5nX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5X3BuZyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IFBORzwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5ib3VuZGFyeSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkJvdW5kYXJ5IGZpbGU8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYXJzZWRzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2RvbXNzZWEnKVxuICAgIHtcbiAgICAgIGxldCBwcmVkX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwcmVkX21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuZG9tc3NlYXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZG9tc3NlYV9tYXRjaCA9ICBkb21zc2VhX3ByZWRfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc3NlYV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RE9NU1NFQSBmaWxlPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdydW5CaW9zZXJmJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZpbmFsIEhvbW9sb2d5IE1vZGVsPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjYmlvc2VyZl9tb2RlbCcsIHRydWUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnaGhibGl0c19wZGI3MCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SEhTZWFyY2ggUmVzdWx0czwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGdwYmxhc3RfcGRiYWEnKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYucGRiYWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QREJhYSBCbGFzdDwvYT48YnIgLz4nO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNpYmxhc3RfY2F0aCcpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5jYXRoYmxhc3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQVRIIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdyZWZvcm1hdF9kb21zZXJmX21vZGVscycgfHwgcmVzdWx0X2RpY3QubmFtZSA9PT0gXCJwYXJzZV9wZGJfYmxhc3RcIilcbiAgICB7XG4gICAgICBsZXQgZG9tc2VyZl9tYXRjaCA9IGRvbXNlcmZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZG9tc2VyZl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfdGltZVwiLCAnJyk7XG4gICAgICAgIC8vIFRPIERPIEFERCBSRUdFWFxuICAgICAgICBkb21haW5fY291bnQrPTE7XG4gICAgICAgIGRvbXNlcmZfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgaWYoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCl7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwgKz0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPk1vZGVsICcrZG9tc2VyZl9tYXRjaFsxXSsnLScrZG9tc2VyZl9tYXRjaFsyXSsnPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ1dHRvbnNfdGFncyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9idXR0b25zXCIpO1xuICAgICAgICBidXR0b25zX3RhZ3MgKz0gJzxidXR0b24gb25DbGljaz1cInBzaXByZWQuc3dhcERvbXNlcmYoJytkb21haW5fY291bnQrJylcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5Eb21haW4gJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2J1dHRvbj4nO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfYnV0dG9uc1wiLCBidXR0b25zX3RhZ3MpO1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICAgICAgcGF0aHMucHVzaChmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiLCBwYXRocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dldFNjaGVtYXRpYycpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF90aW1lXCIsICcnKTtcblxuICAgICAgbGV0IHNjaF9tYXRjaCA9ICBmZnByZWRfc2NoX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZlYXR1cmUgU2NoZW1hdGljIFBORzwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljJywgJzxiPlNlcXVlbmNlIEZlYXR1cmUgTWFwPC9iPjxiciAvPlBvc2l0aW9uIGRlcGVuZGVudCBmZWF0dXJlIHByZWRpY3Rpb25zIGFyZSBtYXBwZWQgb250byB0aGUgc2VxdWVuY2Ugc2NoZW1hdGljIHNob3duIGJlbG93LiBUaGUgbGluZSBoZWlnaHQgb2YgdGhlIFBob3NwaG9yeWxhdGlvbiBhbmQgR2x5Y29zeWxhdGlvbiBmZWF0dXJlcyByZWZsZWN0cyB0aGUgY29uZmlkZW5jZSBvZiB0aGUgcmVzaWR1ZSBwcmVkaWN0aW9uLjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBmZnByZWRfc3ZtX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IFBORzwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfY2FydG9vbicsICc8Yj5QcmVkaWN0ZWQgVHJhbnNtZW1icmFuZSBUb3BvbG9neTwvYj48YnIgLz48aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdmZWF0dXJlcycpXG4gICAge1xuICAgICAgbGV0IGZlYXRfbWF0Y2ggPSBmZnByZWRfZmVhdGNmZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihmZWF0X21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TZXF1ZW5jZSBGZWF0dXJlIFN1bW1hcnk8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdmZnByZWRmZWF0dXJlcycsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZmcHJlZF9odW1hbicpXG4gICAge1xuICAgICAgbGV0IHByZWRzX21hdGNoID0gZmZwcmVkX3ByZWRzX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRzX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5HTyBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZHByZWRpY3Rpb25zJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncGxvdF9zZWxmX2NvbnRhY3RfbWFwJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3Zfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3RpbWVcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5tYXAgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IE1hcDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfbWFwJywgJzxiPkNvbnRhY3QgTWFwPC9iPjxiciAvPjxpbWcgaGVpZ2h0PVwiODAwXCIgd2lkdGg9XCI4MDBcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdjb250YWN0X3ByZWRpY3RvcnMnKVxuICAgIHtcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gICAgICAgIC8vIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG4gICAgICAgIGxldCBldl9tYXRjaCA9IG1ldGFwc2ljb3ZfZXZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihldl9tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuZnJlZWNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5GcmVlQ29udGFjdCBwcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHNfbWF0Y2ggPSBtZXRhcHNpY292X3BzaWNvdl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKHBzX21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QU0lDT1YgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNjX21hdGNoID0gbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoY2NfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmNjbXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQ01QUkVEIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSAgPT09ICdtZXRhcHNpY292X3N0YWdlMicpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWV0cHJlZF93cmFwcGVyJylcbiAgICB7XG4gICAgICBsZXQgdGFibGVfbWF0Y2ggPSBtZXRzaXRlX3RhYmxlX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGxldCBwZGJfbWF0Y2ggPSBtZXRzaXRlX3BkYl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0c2l0ZV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRzaXRlX3RpbWVcIiwgJycpO1xuICAgICAgaWYodGFibGVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFRhYmxlPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWV0c2l0ZScsIHppcCwgcmFjdGl2ZSk7XG5cbiAgICAgIH1cbiAgICAgIGlmKHBkYl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5wZGIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZXRzaXRlIFBEQjwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9wZGInLCBmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9TZXQgbm8gZm91bmQgc3RhdG1lbnRzIGZvciBzb21lIGpvYnMuXG4gIGlmKCEgbWVtcGFja19yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxoMz5ObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8L2gzPicpO1xuICB9XG4gIGlmKCEgcHNpcHJlZF9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICdObyAnK2pvYl9uYW1lcy5wc2lwcmVkKycgZGF0YSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICB9XG4gIGlmKCEgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnTm8gJytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgdGFibGUgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gIH1cbiAgaWYoZG9tc2VyZl9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfc3RydWN0dXJlKHVyaSwgY3NzX2lkLCBjYXJ0b29uKVxue1xuICBsZXQgY2FydG9vbl9jb2xvciA9IGZ1bmN0aW9uKGF0b20pIHtcbiAgICBpZihhdG9tLnNzID09PSAnaCcpe3JldHVybiAnI2UzNTNlMyc7fVxuICAgIGlmKGF0b20uc3MgPT09ICdzJyl7cmV0dXJuICcjZTVkZDU1Jzt9XG4gICAgcmV0dXJuKCdncmV5Jyk7XG4gIH07XG4gIGxldCBob3RzcG90X2NvbG9yID0gZnVuY3Rpb24oYXRvbSl7XG4gICAgaWYoYXRvbS5iID09IDEuMCl7cmV0dXJuICdyZWQnO31cbiAgICBpZihhdG9tLmIgPT0gMC41KXtyZXR1cm4gJ2JsYWNrJzt9XG4gICAgcmV0dXJuKFwiYmx1ZVwiKTtcbiAgfTtcbiAgY29uc29sZS5sb2coXCJMT0FESU5HOiBcIit1cmkpO1xuICBsZXQgZWxlbWVudCA9ICQoY3NzX2lkKTtcbiAgbGV0IGNvbmZpZyA9IHsgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicgfTtcbiAgbGV0IHZpZXdlciA9ICQzRG1vbC5jcmVhdGVWaWV3ZXIoIGVsZW1lbnQsIGNvbmZpZyApO1xuICBsZXQgZGF0YSA9IGdldF90ZXh0KHVyaSwgXCJHRVRcIiwge30pO1xuICB2aWV3ZXIuYWRkTW9kZWwoIGRhdGEsIFwicGRiXCIgKTsgICAgICAgICAgICAgICAgICAgICAgIC8qIGxvYWQgZGF0YSAqL1xuICBpZihjYXJ0b29uKVxuICB7XG4gICAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogY2FydG9vbl9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB9XG4gIGVsc2Uge1xuICAgIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGhvdHNwb3RfY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgfVxuICB2aWV3ZXIuem9vbVRvKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBzZXQgY2FtZXJhICovXG4gIHZpZXdlci5yZW5kZXIoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHJlbmRlciBzY2VuZSAqL1xuICB2aWV3ZXIuem9vbSgxLjcsIDMwMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbylcbntcbiAgLy9jb25zb2xlLmxvZyhkb3dubG9hZHNfaW5mbyk7XG4gIGxldCBkb3dubG9hZHNfc3RyaW5nID0gcmFjdGl2ZS5nZXQoJ2Rvd25sb2FkX2xpbmtzJyk7XG4gIGlmKCdwc2lwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXope1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXopO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO31cbiAgfVxuICBpZignZGlzb3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1zYXRzdm0nIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZ2VudGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGRvbXRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSl7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgICB9XG4gIH1cbiAgaWYoJ21lbXBhY2snIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suaGVhZGVyKTtcbiAgICBpZihkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pXG4gICAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTxiciAvPlwiKTtcbiAgICB9XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdiaW9zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLnBkYmFhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2RvbXNlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuY2F0aGJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdmZnByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWV0YXBzaWNvdicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5tYXApO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnBzaWNvdik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuZnJlZWNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmNjbXByZWQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWV0c2l0ZScgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRzaXRlLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0c2l0ZS5wZGIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCBkb3dubG9hZHNfc3RyaW5nKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2FkdmFuY2VkX3BhcmFtcygpXG57XG4gIGxldCBvcHRpb25zX2RhdGEgPSB7fTtcbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9lX3ZhbHVlX2N1dG9mZlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUgPSBcIjAuMDFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9wc2libGFzdF9pdGVyYXRpb25zXCIpLnZhbHVlO1xuICB9XG4gIGNhdGNoKGVycikge1xuICAgIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMgPSA1O1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlvc2VyZl9tb2RlbGxlcl9rZXlcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmJpb3NlcmZfbW9kZWxsZXJfa2V5ID0gXCJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmRvbXNlcmZfbW9kZWxsZXJfa2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb21zZXJmX21vZGVsbGVyX2tleVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuZG9tc2VyZl9tb2RlbGxlcl9rZXkgPSBcIlwiO1xuICB9XG4gIHRyeXtcbiAgICBvcHRpb25zX2RhdGEuZmZwcmVkX3R5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZmcHJlZF9zZWxlY3Rpb25cIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmZmcHJlZF90eXBlID0gXCJodW1hblwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRzaXRlX2NoZWNrY2hhaW5zX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2NoYWluX2lkXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfY2hhaW5faWRcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLm1ldHByZWRfd3JhcHBlcl9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9jaGFpbl9pZFwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0c2l0ZV9jaGVja2NoYWluc19jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluID0gXCJBXCI7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbiA9IFwiQVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfY2hhaW4gPSBcIkFcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9tZXRhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0c2l0ZV9tZXRhbF90eXBlXCIpLnZhbHVlO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1ldHNpdGVfbWV0YWxfdHlwZVwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuc2VlZFNpdGVGaW5kX21ldGFsID0gXCJDYVwiO1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwgPSBcIkNhXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRzaXRlX2ZwclwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2ZwciA9IFwiNVwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc3ByZWRfY2hlY2tjaGFpbnNfY2hhaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoc3ByZWRfcHJvdGVpbl8xXCIpLnZhbHVlK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyA9IFwiQUJcIjtcbiAgfVxuICB0cnl7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gICAgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbiA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhzcHJlZF9wcm90ZWluXzFcIikudmFsdWU7XG4gIH1cbiAgY2F0Y2goZXJyKSB7XG4gICAgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4gPSBcIkFcIjtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX2ZpcnN0X2NoYWluID0gXCJBXCI7XG4gIH1cbiAgdHJ5e1xuICAgIG9wdGlvbnNfZGF0YS5oc19wcmVkX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgICBvcHRpb25zX2RhdGEuc3BsaXRfcGRiX2ZpbGVzX3NlY29uZF9jaGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHNwcmVkX3Byb3RlaW5fMlwiKS52YWx1ZTtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBvcHRpb25zX2RhdGEuaHNfcHJlZF9maXJzdF9jaGFpbiA9IFwiQlwiO1xuICAgIG9wdGlvbnNfZGF0YS5zcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW4gPSBcIkJcIjtcbiAgfVxuXG4gIC8vIG9wdGlvbnNfZGF0YS4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX3NlYXJjaF90eXBlXCIpO1xuICAvLyBvcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9iYXJyZWxcIik7XG4gIC8vIG9wdGlvbnNfZGF0YS4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbWVtYmVkX3Rlcm1pbmFsXCIpO1xuICAvLyBvcHRpb25zX2RhdGEuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1lbWJlZF9ib3VuZGFyaWVzXCIpO1xuICByZXR1cm4ob3B0aW9uc19kYXRhKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzIiwiaW1wb3J0IHsgZ2V0X21lbXNhdF9yYW5nZXMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2Vfc3MyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BiZGF0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2NvbWIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWVtc2F0ZGF0YSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wcmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BhcnNlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmVhdGNmZyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZnByZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21ldHNpdGUgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuXG5cbi8vZ2l2ZW4gYSB1cmwsIGh0dHAgcmVxdWVzdCB0eXBlIGFuZCBzb21lIGZvcm0gZGF0YSBtYWtlIGFuIGh0dHAgcmVxdWVzdFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfcmVxdWVzdCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcbiAgY29uc29sZS5sb2coJ1NlbmRpbmcgVVJJIHJlcXVlc3QnKTtcbiAgY29uc29sZS5sb2codXJsKTtcbiAgY29uc29sZS5sb2codHlwZSk7XG4gIHZhciByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byBzZW5kIGRhdGFcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiU2VuZGluZyBKb2IgdG8gXCIrdXJsK1wiIEZhaWxlZC4gXCIrZXJyb3IucmVzcG9uc2VUZXh0K1wiLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2Ugd2FzIHVuYWJsZSB0byBwcm9jZXNzIHlvdXIgc3VibWlzc2lvbi4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7IHJldHVybiBudWxsO1xuICB9fSkucmVzcG9uc2VKU09OO1xuICByZXR1cm4ocmVzcG9uc2UpO1xufVxuXG4vL2dpdmVuIGEgam9iIG5hbWUgcHJlcCBhbGwgdGhlIGZvcm0gZWxlbWVudHMgYW5kIHNlbmQgYW4gaHR0cCByZXF1ZXN0IHRvIHRoZVxuLy9iYWNrZW5kXG5leHBvcnQgZnVuY3Rpb24gc2VuZF9qb2IocmFjdGl2ZSwgam9iX25hbWUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgam9iX25hbWVzLCBvcHRpb25zX2RhdGEpXG57XG4gIC8vYWxlcnQoc2VxKTtcbiAgY29uc29sZS5sb2coXCJTZW5kaW5nIGZvcm0gZGF0YVwiKTtcbiAgY29uc29sZS5sb2coam9iX25hbWUpO1xuICB2YXIgZmlsZSA9IG51bGw7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBmZC5hcHBlbmQoXCJpbnB1dF9kYXRhXCIsIGZpbGUsICdpbnB1dC50eHQnKTtcbiAgZmQuYXBwZW5kKFwiam9iXCIsam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJzdWJtaXNzaW9uX25hbWVcIixuYW1lKTtcbiAgZmQuYXBwZW5kKFwiZW1haWxcIiwgZW1haWwpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2V2YWx1ZVwiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUpO1xuICBmZC5hcHBlbmQoXCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnNcIiwgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyk7XG4gIGZkLmFwcGVuZChcIm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW5cIiwgb3B0aW9uc19kYXRhLm1ldHNpdGVfY2hlY2tjaGFpbnNfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJleHRyYWN0X2Zhc3RhX2NoYWluXCIsIG9wdGlvbnNfZGF0YS5leHRyYWN0X2Zhc3RhX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwic2VlZFNpdGVGaW5kX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5zZWVkU2l0ZUZpbmRfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJzZWVkU2l0ZUZpbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNlZWRTaXRlRmluZF9jaGFpbik7XG4gIGZkLmFwcGVuZChcIm1ldHByZWRfd3JhcHBlcl9jaGFpblwiLCBvcHRpb25zX2RhdGEubWV0cHJlZF93cmFwcGVyX2NoYWluKTtcbiAgZmQuYXBwZW5kKFwibWV0cHJlZF93cmFwcGVyX21ldGFsXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfbWV0YWwpO1xuICBmZC5hcHBlbmQoXCJtZXRwcmVkX3dyYXBwZXJfZnByXCIsIG9wdGlvbnNfZGF0YS5tZXRwcmVkX3dyYXBwZXJfZnByKTtcbiAgZmQuYXBwZW5kKFwiaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWluc1wiLCBvcHRpb25zX2RhdGEuaHNwcmVkX2NoZWNrY2hhaW5zX2NoYWlucyk7XG4gIGZkLmFwcGVuZChcImhzX3ByZWRfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLmhzX3ByZWRfZmlyc3RfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJoc19wcmVkX3NlY29uZF9jaGFpblwiLCBvcHRpb25zX2RhdGEuaHNfcHJlZF9zZWNvbmRfY2hhaW4pO1xuICBmZC5hcHBlbmQoXCJzcGxpdF9wZGJfZmlsZXNfZmlyc3RfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19maXJzdF9jaGFpbik7XG4gIGZkLmFwcGVuZChcInNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW5cIiwgb3B0aW9uc19kYXRhLnNwbGl0X3BkYl9maWxlc19zZWNvbmRfY2hhaW4pO1xuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIGpvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgaWYoWydtZXRpc3RlJywgJ2hzcHJlZCcsICdtYWtldGRiJywgJ21lbWVtYmVkJ10uaW5jbHVkZXMoam9iX25hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ21ldHNpdGUnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9tZXRzaXRlKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTt9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzIiwiLy9naXZlbiBhbmQgYXJyYXkgcmV0dXJuIHdoZXRoZXIgYW5kIGVsZW1lbnQgaXMgcHJlc2VudFxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgaWYoYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMSlcbiAge1xuICAgIHJldHVybih0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4oZmFsc2UpO1xuICB9XG59XG5cbi8vd2hlbiBhIHJlc3VsdHMgcGFnZSBpcyBpbnN0YW50aWF0ZWQgYW5kIGJlZm9yZSBzb21lIGFubm90YXRpb25zIGhhdmUgY29tZSBiYWNrXG4vL3dlIGRyYXcgYW5kIGVtcHR5IGFubm90YXRpb24gcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSl7XG5cbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICBsZXQgcmVzaWR1ZXMgPSBzZXEuc3BsaXQoJycpO1xuICBsZXQgYW5ub3RhdGlvbnMgPSBbXTtcbiAgcmVzaWR1ZXMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xuICAgIGFubm90YXRpb25zLnB1c2goeydyZXMnOiByZXN9KTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQocmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyksIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbn1cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgc2V0X2FkdmFuY2VkX3BhcmFtcyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBjbGVhcl9zZXR0aW5ncyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBwcmVwYXJlX2Rvd25sb2Fkc19odG1sIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGhhbmRsZV9yZXN1bHRzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNldF9kb3dubG9hZHNfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2hvd19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBkaXNwbGF5X3N0cnVjdHVyZSB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcbmxldCBqb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgXCJtZW1zYXRzdm1cIiwgXCJnZW50aHJlYWRlclwiLCBcImRvbXByZWRcIiwgXCJwZG9tdGhyZWFkZXJcIiwgXCJiaW9zZXJmXCIsXG4gICAgICAgICAgICAgICAgXCJkb21zZXJmXCIsIFwiZmZwcmVkXCIsIFwibWV0c2l0ZVwiLCBcImhzcHJlZFwiLCBcIm1lbWVtYmVkXCIsIFwiZ2VudGRiXCJdO1xubGV0IHNlcV9qb2JfbGlzdCA9IFtcInBzaXByZWRcIiwgXCJwZ2VudGhyZWFkZXJcIiwgXCJtZXRhcHNpY292XCIsIFwiZGlzb3ByZWRcIiwgXCJtZW1wYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIixdO1xubGV0IHN0cnVjdF9qb2JfbGlzdCA9IFtcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBqb2JfbmFtZXMgPSB7XG4gICdwc2lwcmVkJzogJ1BTSVBSRUQgVjQuMCcsXG4gICdkaXNvcHJlZCc6ICdESU9TUFJFRCAzJyxcbiAgJ21lbXNhdHN2bSc6ICdNRU1TQVQtU1ZNJyxcbiAgJ3BnZW50aHJlYWRlcic6ICdwR2VuVEhSRUFERVInLFxuICAnbWVtcGFjayc6ICdNRU1QQUNLJyxcbiAgJ2dlbnRocmVhZGVyJzogJ0dlblRIUkVBREVSJyxcbiAgJ2RvbXByZWQnOiAnRG9tUHJlZCcsXG4gICdwZG9tdGhyZWFkZXInOiAncERvbVRIUkVBREVSJyxcbiAgJ2Jpb3NlcmYnOiAnQmlvc1NlcmYgdjIuMCcsXG4gICdkb21zZXJmJzogJ0RvbVNlcmYgdjIuMScsXG4gICdmZnByZWQnOiAnRkZQcmVkIDMnLFxuICAnbWV0YXBzaWNvdic6ICdNZXRhUFNJQ09WJyxcbiAgJ21ldHNpdGUnOiAnTWV0U2l0ZScsXG4gICdoc3ByZWQnOiAnSFNQcmVkJyxcbiAgJ21lbWVtYmVkJzogJ01FTUVNQkVEJyxcbiAgJ2dlbnRkYic6ICdHZW5lcmF0ZSBUREInLFxufTtcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG5sZXQgaW5pdGlhbGlzYXRpb25fZGF0YSA9IHtcbiAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgcmVzdWJtaXNzaW9uX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgYmlvc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXByZWRfYWR2YW5jZWQ6IDAsXG4gICAgZmZwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1ldHNpdGVfYWR2YW5jZWQ6IDAsXG4gICAgaHNwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1lbWVtYmFkX2FkdmFuY2VkOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcbiAgICBtZXRhcHNpY292X21hcDogbnVsbCxcbiAgICBtZXRzaXRlX3RhYmxlOiBudWxsLFxuICAgIG1ldHNpdGVfcGRiOiBudWxsLFxuICAgIGhzcHJlZF90YWJsZTogbnVsbCxcbiAgICBoc3ByZWRfcGRiOiBudWxsLFxuXG4gICAgbWV0YXBzaWNvdl9kYXRhOiBudWxsLFxuICAgIG1ldHNpdGVfZGF0YTogbnVsbCxcbiAgICBoc3ByZWRfZGF0YTogbnVsbCxcbiAgICBtZW1lbWJlZF9kYXRhOiBudWxsLFxuICAgIGdlbnRkYl9kYXRhOiBudWxsLFxuXG4gICAgLy8gU2VxdWVuY2UgYW5kIGpvYiBpbmZvXG4gICAgc2VxdWVuY2U6ICcnLFxuICAgIHNlcXVlbmNlX2xlbmd0aDogMSxcbiAgICBzdWJzZXF1ZW5jZV9zdGFydDogMSxcbiAgICBzdWJzZXF1ZW5jZV9zdG9wOiAxLFxuICAgIGVtYWlsOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBiYXRjaF91dWlkOiBudWxsLFxuICAgIC8vaG9sZCBhbm5vdGF0aW9ucyB0aGF0IGFyZSByZWFkIGZyb20gZGF0YWZpbGVzXG4gICAgYW5ub3RhdGlvbnM6IG51bGwsXG59O1xuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19jaGVja2VkJ10gPSBmYWxzZTtcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX2J1dHRvbiddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19qb2InXSA9IGpvYl9uYW1lKydfam9iJztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfbWVzc2FnZSddID0gJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+JztcbiAgaW5pdGlhbGlzYXRpb25fZGF0YVtqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbiddID0gZ2Vhcl9zdHJpbmc7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX3RpbWUnXSA9ICdMb2FkaW5nIERhdGEnO1xufSk7XG5pbml0aWFsaXNhdGlvbl9kYXRhLm1ldHNpdGVfY2hlY2tlZCA9IHRydWU7XG5pbml0aWFsaXNhdGlvbl9kYXRhLm1ldHNpdGVfYWR2YW5jZWQgPSAxO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5zZXF1ZW5jZV9mb3JtX3Zpc2libGUgPSAwO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5zdHJ1Y3R1cmVfZm9ybV92aXNpYmxlID0gMTtcbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YTogaW5pdGlhbGlzYXRpb25fZGF0YSxcbn0pO1xuXG4vL3NldCBzb21lIHRoaW5ncyBvbiB0aGUgcGFnZSBmb3IgdGhlIGRldmVsb3BtZW50IHNlcnZlclxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIpIHtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJywgJ2RhbmllbC5idWNoYW5AdWNsLmFjLnVrJyk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgJ3Rlc3QnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgJ1FXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTJyk7XG59XG5cbi8vNGI2YWQ3OTItZWQxZi0xMWU1LTg5ODYtOTg5MDk2YzEzZWU2XG5sZXQgdXVpZF9yZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XG5sZXQgdXVpZF9tYXRjaCA9IHV1aWRfcmVnZXguZXhlYyhnZXRVcmxWYXJzKCkudXVpZCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vL1xuLy8gQVBQTElDQVRJT04gSEVSRVxuLy9cbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vSGVyZSB3ZXJlIGtlZXAgYW4gZXllIG9uIHNvbWUgZm9ybSBlbGVtZW50cyBhbmQgcmV3cml0ZSB0aGUgbmFtZSBpZiBwZW9wbGVcbi8vaGF2ZSBwcm92aWRlZCBhIGZhc3RhIGZvcm1hdHRlZCBzZXFcbmxldCBzZXFfb2JzZXJ2ZXIgPSByYWN0aXZlLm9ic2VydmUoJ3NlcXVlbmNlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlICkge1xuXG5cblxuXG4gICBsZXQgcmVnZXggPSAvXj4oLis/KVxccy87XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobmV3VmFsdWUpO1xuICBpZihtYXRjaClcbiAge1xuICAgIHRoaXMuc2V0KCduYW1lJywgbWF0Y2hbMV0pO1xuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIHRoaXMuc2V0KCduYW1lJywgbnVsbCk7XG4gIC8vIH1cblxuICB9LFxuICB7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH0pO1xuXG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIHNlcV90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgaWYoc2VxX3R5cGUpe1xuICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgfVxuICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgIGxldCBiYXRjaCA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgZG93bmxvYWRzX2luZm8gPSB7fTtcblxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnQ29tcGxldGUnKVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyIHJlc3VsdHNcIik7XG4gICAgICBsZXQgc3VibWlzc2lvbnMgPSBiYXRjaC5zdWJtaXNzaW9ucztcbiAgICAgIHN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gICAgICAgICAgaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcyk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBsZXQgc3VibWlzc2lvbl9tZXNzYWdlID0gYmF0Y2guc3VibWlzc2lvbnNbMF0ubGFzdF9tZXNzYWdlO1xuICAgICAgYWxlcnQoXCJQT0xMSU5HIEVSUk9SOiBKb2IgRmFpbGVkXFxuXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSBDb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrIHF1b3RpbmcgdGhpcyBlcnJvciBtZXNzYWdlIGFuZCB5b3VyIGpvYiBJRFxcblwiK3N1Ym1pc3Npb25fbWVzc2FnZSk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgNTAwMCk7XG5cbn0se2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9XG4pO1xuXG4vLyBPbiBjbGlja2luZyB0aGUgR2V0IFppcCBmaWxlIGxpbmsgdGhpcyB3YXRjaGVycyBwcmVwYXJlcyB0aGUgemlwIGFuZCBoYW5kcyBpdCB0byB0aGUgdXNlclxucmFjdGl2ZS5vbignZ2V0X3ppcCcsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgbGV0IHV1aWQgPSByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICBzYXZlQXMoYmxvYiwgdXVpZCtcIi56aXBcIik7XG4gICAgfSk7XG59KTtcblxucmFjdGl2ZS5vbignc2hvd19iaW9zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdiaW9zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tc2VyZicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2RvbXByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2RvbXByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19mZnByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2ZmcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZXRzaXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdtZXRzaXRlX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfaHNwcmVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfbWVtZW1iZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21lbWVtYmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xuLy8gVGhlc2UgcmVhY3QgdG8gdGhlIGhlYWRlcnMgYmVpbmcgY2xpY2tlZCB0byB0b2dnbGUgdGhlIHBhbmVsXG4vL1xucmFjdGl2ZS5vbiggJ3NlcXVlbmNlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgbGV0IHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncHNpcHJlZCcpe3NldHRpbmcgPSB0cnVlO31cbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBzZXR0aW5nKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICAgIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIGZhbHNlKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgc2hvd19wYW5lbCgxLCByYWN0aXZlKTtcbn0pO1xuXG4vL3JlZ2lzdGVyIGxpc3RlbmVycyBmb3IgZWFjaCByZXN1bHRzIHBhbmVsXG5qb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lLCBpKXtcbiAgY29uc29sZS5sb2coXCJhZGRpbmcgam9icyB3YXRjaGVyc1wiKTtcbiAgcmFjdGl2ZS5vbihqb2JfbmFtZSsnX2FjdGl2ZScsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgIHNob3dfcGFuZWwoaSsyLCByYWN0aXZlKTtcbiAgICBpZihqb2JfbmFtZSA9PT0gXCJwc2lwcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSBcImRpc29wcmVkXCIpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldCgnZG9tc2VyZl9tb2RlbF91cmlzJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzWzBdLCAnI2RvbXNlcmZfbW9kZWwnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdtZXRzaXRlJylcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnbWV0c2l0ZV9wZGInKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBtZXRfcGRiID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjbWV0c2l0ZV9tb2RlbCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09ICdoc3ByZWQnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdoc3ByZWRfcGRiJykubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsZXQgbWV0X3BkYiA9IHJhY3RpdmUuZ2V0KCdoc3ByZWRfcGRiJyk7XG4gICAgICAgIGRpc3BsYXlfc3RydWN0dXJlKG1ldF9wZGIsICcjaHNwcmVkX21vZGVsJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICB9KTtcblxufSk7XG5cbnJhY3RpdmUub24oICdzdWJtaXNzaW9uX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIGNvbnNvbGUubG9nKFwiU1VCTUlTU0lPTiBBQ1RJVkVcIik7XG4gIGxldCBzdGF0ZSA9IHJhY3RpdmUuZ2V0KCdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJyk7XG5cbiAgaWYoc3RhdGUgPT09IDEpe1xuICAgIHJhY3RpdmUuc2V0KCAnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScsIDAgKTtcbiAgfVxuICBlbHNle1xuICAgIHJhY3RpdmUuc2V0KCAnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScsIDEgKTtcbiAgfVxufSk7XG5cbi8vZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIG1haW4gZm9ybSBhbmQgc2VuZCB0aGUgc2VxdWVuY2UgdG8gdGhlIGJhY2tlbmRcbnJhY3RpdmUub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBzdWJtaXRfam9iID0gZmFsc2U7XG4gIGNvbnNvbGUubG9nKCdTdWJtaXR0aW5nIGRhdGEnKTtcbiAgbGV0IHNlcSA9IHRoaXMuZ2V0KCdzZXF1ZW5jZScpO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXj4uKyQvbWcsIFwiXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9cXG58XFxzL2csXCJcIik7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc2VxKTtcblxuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJyk7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGxldCBzdHJ1Y3RfdHlwZSA9IGZhbHNlO1xuICBsZXQgc2VxX3R5cGUgPSBmYWxzZTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSAmJiBzdHJ1Y3Rfam9iX2xpc3QuaW5jbHVkZXMoam9iX25hbWUpKVxuICAgIHtcbiAgICAgIHN0cnVjdF90eXBlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddICYmIHNlcV9qb2JfbGlzdC5pbmNsdWRlcyhqb2JfbmFtZSkpXG4gICAge1xuICAgICAgc2VxX3R5cGUgPSB0cnVlO1xuICAgIH1cblxuICB9KTtcblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICAvL0hBTkRMRSBGRlBSRUQgSk9CIFNFTEVDVElPTi5cbiAgaWYoY2hlY2tfc3RhdGVzLmJpb3NlcmZfY2hlY2tlZCB8fCBjaGVja19zdGF0ZXMuZG9tc2VyZl9jaGVja2VkKVxuICB7XG4gICAgbGV0IGJpb3NfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5iaW9zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgbGV0IGRvbXNfbW9kZWxsZXJfdGVzdCA9IHRlc3RfbW9kZWxsZXJfa2V5KG9wdGlvbnNfZGF0YS5kb21zZXJmX21vZGVsbGVyX2tleSk7XG4gICAgaWYoYmlvc19tb2RlbGxlcl90ZXN0IHx8IGRvbXNfbW9kZWxsZXJfdGVzdClcbiAgICB7XG4gICAgICBzdWJtaXRfam9iID10cnVlO1xuICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KFwiWW91IGhhdmUgbm90IHByb3ZpZGVkIGEgdmFsaWQgTU9ERUxMRVIga2V5LiBDb250YWN0IHRoZSBTYWxpIGxhYiBmb3IgYSBNT0RFTExFUiBsaWNlbmNlLlwiKTtcbiAgICB9XG4gIH1cbiAgZWxzZXtcbiAgICBzdWJtaXRfam9iPXRydWU7XG4gIH1cbiAgaWYoc2VxX3R5cGUgJiYgc3RydWN0X3R5cGUpXG4gIHtcbiAgICBhbGVydChcIllvdSBjYW4gbm90IHN1Ym1pdCBib3RoIHNlcXVlbmNlIGFuZCBzdHJ1Y3R1cmUgYW5hbHlzaXMgam9ic1wiKTtcbiAgICBzdWJtaXRfam9iID0gZmFsc2U7XG4gIH1cbiAgaWYoc3VibWl0X2pvYilcbiAge1xuICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZ1wiKTtcbiAgICBpZihzZXFfdHlwZSlcbiAgICB7XG4gICAgICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpO1xuICAgIH1cbiAgICBpZihzdHJ1Y3RfdHlwZSlcbiAgICB7XG4gICAgICBsZXQgcGRiRmlsZSA9IG51bGw7XG4gICAgICBsZXQgcGRiRGF0YSA9ICcnO1xuICAgICAgdHJ5e1xuICAgICAgIHBkYkZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBkYkZpbGVcIik7XG4gICAgICAgbGV0IGZpbGUgPSBwZGJGaWxlLmZpbGVzWzBdO1xuICAgICAgIGxldCBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgZnIucmVhZEFzVGV4dChmaWxlKTtcbiAgICAgICBmci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHBkYkRhdGEgPSBmci5yZXN1bHQ7XG4gICAgICAgIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHBkYkRhdGEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhLCBzZXFfdHlwZSwgc3RydWN0X3R5cGUpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIHBkYkRhdGEgPSBcIlwiO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGdyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBSZXN1Ym1pc3Npb24gd2lkZ2V0LCB0cnVuY2F0ZSB0aGUgc2VxdWVuY2Vcbi8vIGFuZCBzZW5kIGEgbmV3IGpvYlxucmFjdGl2ZS5vbigncmVzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnUmVzdWJtaXR0aW5nIHNlZ21lbnQnKTtcbiAgbGV0IHN0YXJ0ID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdGFydFwiKTtcbiAgbGV0IHN0b3AgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0b3BcIik7XG4gIGxldCBzZXF1ZW5jZSA9IHJhY3RpdmUuZ2V0KFwic2VxdWVuY2VcIik7XG4gIGxldCBzdWJzZXF1ZW5jZSA9IHNlcXVlbmNlLnN1YnN0cmluZyhzdGFydC0xLCBzdG9wKTtcbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpK1wiX3NlZ1wiO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc3Vic2VxdWVuY2UpO1xuICByYWN0aXZlLnNldCgnbmFtZScsIG5hbWUpO1xuICBsZXQgY2hlY2tfc3RhdGVzID0ge307XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2pvYiddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19qb2InKTtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2NoZWNrZWQnKTtcbiAgfSk7XG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gIC8vdmVyaWZ5IGZvcm0gY29udGVudHMgYW5kIHBvc3RcbiAgLy9hZGQgZm9ybSBkZWZhdWx0cyBidXQgbnVsbCB0aGUgc3RydWN0ZXMgb25lcyBhcyB3ZSBkb24ndCBhbGxvdyBzdHJ1Y3R1cmUgam9iIHJlc3VibWlzc2lvblxuICBsZXQgb3B0aW9uc19kYXRhID0gc2V0X2FkdmFuY2VkX3BhcmFtcygpO1xuICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzdWJzZXF1ZW5jZSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzLCB0cnVlLCBmYWxzZSk7XG4gIC8vd3JpdGUgbmV3IGFubm90YXRpb24gZGlhZ3JhbVxuICAvL3N1Ym1pdCBzdWJzZWN0aW9uXG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuZnVuY3Rpb24gdGVzdF9tb2RlbGxlcl9rZXkoaW5wdXQpXG57XG4gIGlmKGlucHV0ID09PSAnTU9ERUxJUkFOSkUnKVxuICB7XG4gICAgcmV0dXJuKHRydWUpO1xuICB9XG4gIHJldHVybihmYWxzZSk7XG59XG5cbi8vIEhlcmUgaGF2aW5nIHNldCB1cCByYWN0aXZlIGFuZCB0aGUgZnVuY3Rpb25zIHdlIG5lZWQgd2UgdGhlbiBjaGVja1xuLy8gaWYgd2Ugd2VyZSBwcm92aWRlZCBhIFVVSUQsIElmIHRoZSBwYWdlIGlzIGxvYWRlZCB3aXRoIGEgVVVJRCByYXRoZXIgdGhhbiBhXG4vLyBmb3JtIHN1Ym1pdC5cbi8vVE9ETzogSGFuZGxlIGxvYWRpbmcgdGhhdCBwYWdlIHdpdGggdXNlIHRoZSBNRU1TQVQgYW5kIERJU09QUkVEIFVVSURcbi8vXG5pZihnZXRVcmxWYXJzKCkudXVpZCAmJiB1dWlkX21hdGNoKVxue1xuICBjb25zb2xlLmxvZygnQ2F1Z2h0IGFuIGluY29taW5nIFVVSUQnKTtcbiAgc2VxX29ic2VydmVyLmNhbmNlbCgpO1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgbnVsbCApOyAvLyBzaG91bGQgbWFrZSBhIGdlbmVyaWMgb25lIHZpc2libGUgdW50aWwgcmVzdWx0cyBhcnJpdmUuXG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIHJhY3RpdmUuc2V0KFwiYmF0Y2hfdXVpZFwiLCBnZXRVcmxWYXJzKCkudXVpZCk7XG4gIGxldCBwcmV2aW91c19kYXRhID0gZ2V0X3ByZXZpb3VzX2RhdGEoZ2V0VXJsVmFycygpLnV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKTtcbiAgbGV0IHNlcV90eXBlID0gdHJ1ZTtcbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwc2lwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAyKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldGFwc2ljb3YnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDQpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA1KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXBhY2snKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnbWVtcGFja19idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1zYXRzdm0nKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDgpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZG9tdGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnYmlvc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEyKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2ZmcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZmZwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRzaXRlJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNCk7XG4gICAgICBzZXFfdHlwZSA9IGZhbHNlO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnaHNwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE1KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1lbWJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE2KTtcbiAgICAgIHNlcV90eXBlID0gZmFsc2U7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50ZGInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTcpO1xuICAgICAgc2VxX3R5cGUgPSBmYWxzZTtcbiAgfVxuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLHByZXZpb3VzX2RhdGEuc2VxKTtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJyxwcmV2aW91c19kYXRhLmVtYWlsKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLHByZXZpb3VzX2RhdGEubmFtZSk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIHNlcV90eXBlKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vIE5ldyBQYW5uZWwgZnVuY3Rpb25zXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWROZXdBbGlnbm1lbnQoYWxuVVJJLGFublVSSSx0aXRsZSkge1xuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICB3aW5kb3cub3BlbihcIi4uXCIrYXBwX3BhdGgrXCIvbXNhLz9hbm49XCIrZmlsZV91cmwrYW5uVVJJK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9ODAwLGhlaWdodD00MDBcIik7XG59XG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9kZWwoYWxuVVJJLCB0eXBlKSB7XG5cbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgbGV0IG1vZF9rZXkgPSByYWN0aXZlLmdldCgnbW9kZWxsZXJfa2V5Jyk7XG4gIGlmKG1vZF9rZXkgPT09ICdNJysnTycrJ0QnKydFJysnTCcrJ0knKydSJysnQScrJ04nKydKJysnRScpXG4gIHtcbiAgICAvL2FsZXJ0KHR5cGUpO1xuICAgIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tb2RlbC9wb3N0P3R5cGU9XCIrdHlwZStcIiZhbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTY3MCxoZWlnaHQ9NzAwXCIpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIE0nKydPJysnRCcrJ0UnKydMJysnTCcrJ0UnKydSIExpY2VuY2UgS2V5Jyk7XG4gIH1cbn1cblxuLy8gU3dhcHMgb3V0IHRoZSBkb21zZXJmIG1vZGVsIHdoZW4gdGhvc2UgYnV0dG9ucyBhcmUgY2xpY2tlZFxuZXhwb3J0IGZ1bmN0aW9uIHN3YXBEb21zZXJmKHVyaV9udW1iZXIpXG57XG4gIHVyaV9udW1iZXIgPSB1cmlfbnVtYmVyLTE7XG4gIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1t1cmlfbnVtYmVyXSwgJyNkb21zZXJmX21vZGVsJywgdHJ1ZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFpbi5qcyIsImltcG9ydCB7IHNlbmRfam9iIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgaXNJbkFycmF5IH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcblxuLy9UYWtlcyB0aGUgZGF0YSBuZWVkZWQgdG8gdmVyaWZ5IHRoZSBpbnB1dCBmb3JtIGRhdGEsIGVpdGhlciB0aGUgbWFpbiBmb3JtXG4vL29yIHRoZSBzdWJtaXNzb24gd2lkZ2V0IHZlcmlmaWVzIHRoYXQgZGF0YSBhbmQgdGhlbiBwb3N0cyBpdCB0byB0aGUgYmFja2VuZC5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBkYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBjaGVja19zdGF0ZXMsIGpvYl9saXN0LCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSwgc2VxX3R5cGUsIHN0cnVjdF90eXBlKVxue1xuICAvKnZlcmlmeSB0aGF0IGV2ZXJ5dGhpbmcgaGVyZSBpcyBvayovXG4gIGxldCBlcnJvcl9tZXNzYWdlPW51bGw7XG4gIGxldCBqb2Jfc3RyaW5nID0gJyc7XG4gIC8vZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9mb3JtKHNlcSwgbmFtZSwgZW1haWwsIFtwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkXSk7XG5cbiAgbGV0IGNoZWNrX2xpc3QgPSBbXTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfbGlzdC5wdXNoKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSk7XG4gIH0pO1xuXG4gIGlmKHNlcV90eXBlKXtcbiAgICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X3NlcV9mb3JtKGRhdGEsIG5hbWUsIGVtYWlsLCBjaGVja19saXN0KTtcbiAgfVxuICBpZihzdHJ1Y3RfdHlwZSl7XG4gICAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9zdHJ1Y3RfZm9ybShkYXRhLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG4gIH1cbiAgaWYoZXJyb3JfbWVzc2FnZS5sZW5ndGggPiAwKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Zvcm1fZXJyb3InLCBlcnJvcl9tZXNzYWdlKTtcbiAgICBhbGVydChcIkZPUk0gRVJST1I6XCIrZXJyb3JfbWVzc2FnZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9pbml0aWFsaXNlIHRoZSBwYWdlXG4gICAgbGV0IHJlc3BvbnNlID0gdHJ1ZTtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTtcbiAgICAvL1Bvc3QgdGhlIGpvYnMgYW5kIGludGlhbGlzZSB0aGUgYW5ub3RhdGlvbnMgZm9yIGVhY2ggam9iXG4gICAgLy9XZSBhbHNvIGRvbid0IHJlZHVuZGFudGx5IHNlbmQgZXh0cmEgcHNpcHJlZCBldGMuLiBqb2JzXG4gICAgLy9ieXQgZG9pbmcgdGhlc2UgdGVzdCBpbiBhIHNwZWNpZmljIG9yZGVyXG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KGpvYl9uYW1lK1wiLFwiKTtcbiAgICAgICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkaXNvcHJlZCcgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnZG9tcHJlZCcgfHwgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnIHx8IGpvYl9uYW1lID09PSAnZG9tc2VyZicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnbWV0YXBzaWNvdicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucHNpcHJlZF9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGdlbnRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZG9tdGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBkYXRhLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSk7XG4gICAgLy9zZXQgdmlzaWJpbGl0eSBhbmQgcmVuZGVyIHBhbmVsIG9uY2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYl9saXN0Lmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGxldCBqb2JfbmFtZSA9IGpvYl9saXN0W2ldO1xuICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlICYmIHJlc3BvbnNlIClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICAgIHJhY3RpdmUuZmlyZSggam9iX25hbWUrJ19hY3RpdmUnICk7XG4gICAgICAgIGlmKHNlcV90eXBlKXtcbiAgICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VibWlzc2lvbl92aXNpYmxlJywgMiApO1xuICAgICAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighIHJlc3BvbnNlKXt3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO31cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X3N0cnVjdF9mb3JtKHN0cnVjdCwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG4gIC8vIFRPRE86IG9uZSBkYXkgd2Ugc2hvdWxkIGxldCB0aGVzZSBzZXJ2aWNlcyB0YWtlIHhtbCBwZGIgZmlsZXNcbiAgaWYoISAvXkhFQURFUnxeQVRPTVxccytcXGQrL2kudGVzdChzdHJ1Y3QpKXtcbiAgICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIGZpbGUgZG9lcyBub3QgbG9vayBsaWtlIGEgcGxhaW4gdGV4dCBhc2NpaSBwZGIgZmlsZS4gVGhpcyBzZXJ2aWNlIGRvZXMgbm90IGFjY2VwdCAuZ3ogb3IgeG1sIGZvcm1hdCBwZGIgZmlsZXNcIjtcbiAgfVxuICBpZihpc0luQXJyYXkodHJ1ZSwgY2hlY2tlZF9hcnJheSkgPT09IGZhbHNlKSB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdSBtdXN0IHNlbGVjdCBhdCBsZWFzdCBvbmUgYW5hbHlzaXMgcHJvZ3JhbVwiO1xuICB9XG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuLy9UYWtlcyB0aGUgZm9ybSBlbGVtZW50cyBhbmQgY2hlY2tzIHRoZXkgYXJlIHZhbGlkXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X3NlcV9mb3JtKHNlcSwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG5cbiAgLyogbGVuZ3RoIGNoZWNrcyAqL1xuICBpZihzZXEubGVuZ3RoID4gMTUwMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBsb25nIHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuICBpZihzZXEubGVuZ3RoIDwgMzApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gc2hvcnQgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG5cbiAgLyogbnVjbGVvdGlkZSBjaGVja3MgKi9cbiAgbGV0IG51Y2xlb3RpZGVfY291bnQgPSAoc2VxLm1hdGNoKC9BfFR8Q3xHfFV8TnxhfHR8Y3xnfHV8bi9nKXx8W10pLmxlbmd0aDtcbiAgaWYoKG51Y2xlb3RpZGVfY291bnQvc2VxLmxlbmd0aCkgPiAwLjk1KVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgYXBwZWFycyB0byBiZSBudWNsZW90aWRlIHNlcXVlbmNlLiBUaGlzIHNlcnZpY2UgcmVxdWlyZXMgcHJvdGVpbiBzZXF1ZW5jZSBhcyBpbnB1dDxiciAvPlwiO1xuICB9XG4gIGlmKC9bXkFDREVGR0hJS0xNTlBRUlNUVldZWF8tXSsvaS50ZXN0KHNlcSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnM8YnIgLz5cIjtcbiAgfVxuXG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==