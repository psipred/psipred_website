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
/* harmony export (immutable) */ __webpack_exports__["h"] = parse_ffpreds;
/* harmony export (immutable) */ __webpack_exports__["g"] = parse_featcfg;
/* unused harmony export get_memsat_ranges */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse_ss2;
/* harmony export (immutable) */ __webpack_exports__["b"] = parse_pbdat;
/* harmony export (immutable) */ __webpack_exports__["c"] = parse_comb;
/* harmony export (immutable) */ __webpack_exports__["d"] = parse_memsatdata;
/* harmony export (immutable) */ __webpack_exports__["e"] = parse_presult;
/* harmony export (immutable) */ __webpack_exports__["f"] = parse_parseds;
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
/* harmony export (immutable) */ __webpack_exports__["f"] = clear_settings;
/* harmony export (immutable) */ __webpack_exports__["a"] = prepare_downloads_html;
/* harmony export (immutable) */ __webpack_exports__["b"] = handle_results;
/* harmony export (immutable) */ __webpack_exports__["e"] = display_structure;
/* harmony export (immutable) */ __webpack_exports__["c"] = set_downloads_panel;
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
      display_structure(file_url + result_dict.data_path, '#bioserf_model');
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
    display_structure(paths[0], '#domserf_model');
  }
}

function display_structure(uri, css_id) {
  let cartoon_color = function (atom) {
    if (atom.ss === 'h') {
      return '#e353e3';
    }
    if (atom.ss === 's') {
      return '#e5dd55';
    }
    return 'grey';
  };
  console.log("LOADING: " + uri);
  let element = $(css_id);
  let config = { backgroundColor: '#ffffff' };
  let viewer = $3Dmol.createViewer(element, config);
  let data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["d" /* get_text */])(uri, "GET", {});
  viewer.addModel(data, "pdb"); /* load data */
  viewer.setStyle({}, { cartoon: { colorfunc: cartoon_color } }); /* style all atoms */
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
  ractive.set('download_links', downloads_string);
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
function send_job(ractive, job_name, seq, name, email, submit_url, times_url, job_names) {
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
        ractive.fire('poll_trigger', job_name);
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
  results_panel_visible: 1,
  submission_widget_visible: 0,
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
initialisation_data.metapsicov_checked = true;
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
ractive.on('poll_trigger', function (name, job_type) {
  console.log("Polling backend for results");
  let url = submit_url + ractive.get('batch_uuid');
  history.pushState(null, '', app_path + '/&uuid=' + ractive.get('batch_uuid'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);

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

// These react to the headers being clicked to toggle the panel
//
ractive.on('sequence_active', function (event) {
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 0);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[0], '#domserf_model');
      }
    }
  });
});

ractive.on('submission_active', function (event) {
  let state = ractive.get('submission_widget_visible');
  if (state === 1) {
    ractive.set('submission_widget_visible', 0);
  } else {
    ractive.set('submission_widget_visible', 1);
  }
});

//grab the submit event from the main form and send the sequence to the backend
ractive.on('submit', function (event) {
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
  job_list.forEach(function (job_name) {
    check_states[job_name + '_job'] = ractive.get(job_name + '_job');
    check_states[job_name + '_checked'] = ractive.get(job_name + '_checked');
  });
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, seq, name, email, submit_url, times_url, check_states, job_list, job_names);
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
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["f" /* clear_settings */])(ractive, gear_string, job_list, job_names);
  //verify form contents and post
  //console.log(name);
  //console.log(email);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, subsequence, name, email, submit_url, times_url, check_states, job_list, job_names);
  //write new annotation diagram
  //submit subsection
  event.original.preventDefault();
});

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
  }
  if (previous_data.jobs.includes('hspred')) {
    ractive.set('hspred_button', true);
    ractive.set('results_panel_visible', 15);
  }
  if (previous_data.jobs.includes('memembed')) {
    ractive.set('memembed_button', true);
    ractive.set('results_panel_visible', 16);
  }
  if (previous_data.jobs.includes('gentdb')) {
    ractive.set('gentdb_button', true);
    ractive.set('results_panel_visible', 17);
  }
  ractive.set('sequence', previous_data.seq);
  ractive.set('email', previous_data.email);
  ractive.set('name', previous_data.name);
  let seq = ractive.get('sequence');
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.fire('poll_trigger', 'psipred');
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
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["e" /* display_structure */])(paths[uri_number], '#domserf_model');
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verify_and_send_form;
/* unused harmony export verify_form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_index_js__ = __webpack_require__(3);




//Takes the data needed to verify the input form data, either the main form
//or the submisson widget verifies that data and then posts it to the backend.
function verify_and_send_form(ractive, seq, name, email, submit_url, times_url, check_states, job_list, job_names) {
  /*verify that everything here is ok*/
  let error_message = null;
  let job_string = '';
  //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);

  let check_list = [];
  job_list.forEach(function (job_name) {
    check_list.push(check_states[job_name + '_checked']);
  });
  error_message = verify_form(seq, name, email, check_list);

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
        if (job_name === 'pgenthreader' || job_name === 'disopred' || job_name === 'dompred' || job_name === 'pdomthreader' || job_name === 'bioserf' || job_name === 'domserf') {
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
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["e" /* send_job */])(ractive, job_string, seq, name, email, submit_url, times_url, job_names);
    //set visibility and render panel once
    for (let i = 0; i < job_list.length; i++) {
      let job_name = job_list[i];
      if (check_states[job_name + '_checked'] === true && response) {
        ractive.set('results_visible', 2);
        ractive.fire(job_name + '_active');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
        break;
      }
    }

    if (!response) {
      window.location.href = window.location.href;
    }
  }
}

//Takes the form elements and checks they are valid
function verify_form(seq, job_name, email, checked_array) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWQxNjk0MTExOGJkNmYzZDY4OTIiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2ZmcHJlZHMiLCJyYWN0aXZlIiwiZmlsZSIsImxpbmVzIiwic3BsaXQiLCJicF9kYXRhIiwibWZfZGF0YSIsImNjX2RhdGEiLCJ0YWJsZV9kYXRhIiwiZm9yRWFjaCIsImxpbmUiLCJpIiwic3RhcnRzV2l0aCIsImVudHJpZXMiLCJsZW5ndGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0Iiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsIm1hdGNoIiwiZXhlYyIsImluY2x1ZGVzIiwicmVnaW9ucyIsInJlZ2lvbiIsInBhcnNlSW50Iiwic2VnIiwicGFyc2Vfc3MyIiwiYW5ub3RhdGlvbnMiLCJzaGlmdCIsImZpbHRlciIsIkJvb2xlYW4iLCJzcyIsImJpb2QzIiwiYW5ub3RhdGlvbkdyaWQiLCJwYXJlbnQiLCJtYXJnaW5fc2NhbGVyIiwiZGVidWciLCJjb250YWluZXJfd2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhaW5lcl9oZWlnaHQiLCJhbGVydCIsInBhcnNlX3BiZGF0IiwiZGlzb3ByZWQiLCJwYXJzZV9jb21iIiwicHJlY2lzaW9uIiwicG9zIiwiZ2VuZXJpY3h5TGluZUNoYXJ0IiwiY2hhcnRUeXBlIiwieV9jdXRvZmYiLCJwYXJzZV9tZW1zYXRkYXRhIiwic2VxIiwidG9wb19yZWdpb25zIiwic2lnbmFsX3JlZ2lvbnMiLCJyZWVudHJhbnRfcmVnaW9ucyIsInRlcm1pbmFsIiwiY29pbF90eXBlIiwidG1wX2Fubm8iLCJBcnJheSIsInByZXZfZW5kIiwiZmlsbCIsImFubm8iLCJtZW1zYXQiLCJwYXJzZV9wcmVzdWx0IiwidHlwZSIsImFubl9saXN0IiwicHNldWRvX3RhYmxlIiwidGFibGVfaGl0IiwidG9Mb3dlckNhc2UiLCJwZGIiLCJzdWJzdHJpbmciLCJhbG4iLCJhbm4iLCJwYXJzZV9wYXJzZWRzIiwicHJlZGljdGlvbl9yZWdleCIsInByZWRpY3Rpb25fbWF0Y2giLCJkZXRhaWxzIiwicmVwbGFjZSIsInZhbHVlcyIsImluZGV4T2YiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJkb21wcmVkIiwic2hvd19wYW5lbCIsImNsZWFyX3NldHRpbmdzIiwiZ2Vhcl9zdHJpbmciLCJqb2JfbGlzdCIsImpvYl9uYW1lcyIsImpvYl9uYW1lIiwiY2xlYXJTZWxlY3Rpb24iLCJ6aXAiLCJKU1ppcCIsInByZXBhcmVfZG93bmxvYWRzX2h0bWwiLCJkb3dubG9hZHNfaW5mbyIsImhlYWRlciIsInBzaXByZWQiLCJtZW1zYXRzdm0iLCJwZ2VudGhyZWFkZXIiLCJiaW9zZXJmIiwicGRvbXRocmVhZGVyIiwiZG9tc2VyZiIsImZmcHJlZCIsImhhbmRsZV9yZXN1bHRzIiwiZmlsZV91cmwiLCJob3Jpel9yZWdleCIsInNzMl9yZWdleCIsInBuZ19yZWdleCIsIm1lbXNhdF9jYXJ0b29uX3JlZ2V4IiwibWVtc2F0X3NjaGVtYXRpY19yZWdleCIsIm1lbXNhdF9kYXRhX3JlZ2V4IiwibWVtcGFja19jYXJ0b29uX3JlZ2V4IiwibWVtcGFja19ncmFwaF9vdXQiLCJtZW1wYWNrX2NvbnRhY3RfcmVzIiwibWVtcGFja19saXBpZF9yZXMiLCJkb21zc2VhX3ByZWRfcmVnZXgiLCJkb21zc2VhX3JlZ2V4IiwiZG9tc2VyZl9yZWdleCIsImZmcHJlZF9zY2hfcmVnZXgiLCJmZnByZWRfc3ZtX3JlZ2V4IiwiZmZwcmVkX3NjaGVtYXRpY19yZWdleCIsImZmcHJlZF90bV9yZWdleCIsImZmcHJlZF9mZWF0Y2ZnX3JlZ2V4IiwiZmZwcmVkX3ByZWRzX3JlZ2V4IiwiaW1hZ2VfcmVnZXgiLCJyZXN1bHRzIiwiZG9tYWluX2NvdW50IiwibWVtcGFja19yZXN1bHRfZm91bmQiLCJkb21zZXJmX3Jlc3VsdF9mb3VuZCIsInJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kIiwicHNpcHJlZF9yZXN1bHRfZm91bmQiLCJwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kIiwicmVzdWx0X2RpY3QiLCJuYW1lIiwiYW5uX3NldCIsInRtcCIsImRhdGFfcGF0aCIsInBhdGgiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImlkIiwicHJvY2Vzc19maWxlIiwiaG9yaXoiLCJzczJfbWF0Y2giLCJzczIiLCJwYmRhdCIsImNvbWIiLCJzY2hlbWVfbWF0Y2giLCJzY2hlbWF0aWMiLCJjYXJ0b29uX21hdGNoIiwiY2FydG9vbiIsIm1lbXNhdF9tYXRjaCIsIm1lbXBhY2siLCJncmFwaF9tYXRjaCIsImdyYXBoX291dCIsImNvbnRhY3RfbWF0Y2giLCJjb250YWN0IiwibGlwaWRfbWF0Y2giLCJsaXBpZF9vdXQiLCJ0YWJsZSIsImdlbnRocmVhZGVyIiwiYWxpZ24iLCJwbmdfbWF0Y2giLCJib3VuZGFyeV9wbmciLCJib3VuZGFyeSIsInByZWRfbWF0Y2giLCJkb21zc2VhcHJlZCIsImRvbXNzZWFfbWF0Y2giLCJkb21zc2VhIiwibW9kZWwiLCJkaXNwbGF5X3N0cnVjdHVyZSIsImhoYmxpdHMiLCJwZGJhYSIsImNhdGhibGFzdCIsInBkYmJsYXN0IiwiZG9tc2VyZl9tYXRjaCIsImJ1dHRvbnNfdGFncyIsInBhdGhzIiwic2NoX21hdGNoIiwic2NoIiwiZmVhdF9tYXRjaCIsImZlYXR1cmVzIiwicHJlZHNfbWF0Y2giLCJwcmVkcyIsInVyaSIsImNzc19pZCIsImNhcnRvb25fY29sb3IiLCJhdG9tIiwiZWxlbWVudCIsIiQiLCJjb25maWciLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2aWV3ZXIiLCIkM0Rtb2wiLCJjcmVhdGVWaWV3ZXIiLCJnZXRfdGV4dCIsImFkZE1vZGVsIiwic2V0U3R5bGUiLCJjb2xvcmZ1bmMiLCJ6b29tVG8iLCJyZW5kZXIiLCJ6b29tIiwic2V0X2Rvd25sb2Fkc19wYW5lbCIsImRvd25sb2Fkc19zdHJpbmciLCJjb25jYXQiLCJzZW5kX3JlcXVlc3QiLCJ1cmwiLCJzZW5kX2RhdGEiLCJyZXNwb25zZSIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJzdWJtaXNzaW9ucyIsImlucHV0X2ZpbGUiLCJqb2JzIiwic3VibWlzc2lvbiIsInNsaWNlIiwic3VibWlzc2lvbl9uYW1lIiwidXJsX3N0dWIiLCJjdGwiLCJwYXRoX2JpdHMiLCJmb2xkZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNJbkFycmF5IiwiYXJyYXkiLCJkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwiLCJyZXNpZHVlcyIsInJlcyIsImdldFVybFZhcnMiLCJ2YXJzIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJtIiwia2V5IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJpbXBvcnRhbnQiLCJzdHlsZSIsImdldEVtUGl4ZWxzIiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwiaG9zdG5hbWUiLCJpbml0aWFsaXNhdGlvbl9kYXRhIiwic2VxdWVuY2VfZm9ybV92aXNpYmxlIiwic3RydWN0dXJlX2Zvcm1fdmlzaWJsZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VsdHNfcGFuZWxfdmlzaWJsZSIsInN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUiLCJtb2RlbGxlcl9rZXkiLCJkb3dubG9hZF9saW5rcyIsInBzaXByZWRfaG9yaXoiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV9zY2hlbWF0aWMiLCJtZW1zYXRzdm1fY2FydG9vbiIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbl90YWJsZSIsImdlbl9hbm5fc2V0IiwicGFyc2Vkc19pbmZvIiwicGFyc2Vkc19wbmciLCJkZ2VuX3RhYmxlIiwiZGdlbl9hbm5fc2V0IiwiYmlvc2VyZl9tb2RlbCIsImRvbXNlcmZfYnV0dG9ucyIsImRvbXNlcmZfbW9kZWxfdXJpcyIsImZmcHJlZF9jYXJ0b29uIiwic2NoX3NjaGVtYXRpYyIsImZ1bmN0aW9uX3RhYmxlcyIsIm1ldGFwc2ljb3ZfZGF0YSIsIm1ldHNpdGVfZGF0YSIsImhzcHJlZF9kYXRhIiwibWVtZW1iZWRfZGF0YSIsImdlbnRkYl9kYXRhIiwic2VxdWVuY2UiLCJzZXF1ZW5jZV9sZW5ndGgiLCJzdWJzZXF1ZW5jZV9zdGFydCIsInN1YnNlcXVlbmNlX3N0b3AiLCJiYXRjaF91dWlkIiwibWV0YXBzaWNvdl9jaGVja2VkIiwiUmFjdGl2ZSIsImVsIiwidGVtcGxhdGUiLCJ1dWlkX3JlZ2V4IiwidXVpZF9tYXRjaCIsInNlcV9vYnNlcnZlciIsIm9ic2VydmUiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiaW5pdCIsImRlZmVyIiwic2VxX2xlbmd0aCIsInNlcV9zdGFydCIsInNlcV9zdG9wIiwiam9iX3R5cGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImJhdGNoIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwic3VibWlzc2lvbl9tZXNzYWdlIiwibGFzdF9tZXNzYWdlIiwiY29udGV4dCIsImdlbmVyYXRlQXN5bmMiLCJ0aGVuIiwiYmxvYiIsInNhdmVBcyIsImV2ZW50Iiwic2V0dGluZyIsInRvVXBwZXJDYXNlIiwiY2hlY2tfc3RhdGVzIiwidmVyaWZ5X2FuZF9zZW5kX2Zvcm0iLCJvcmlnaW5hbCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJzdG9wIiwic3Vic2VxdWVuY2UiLCJjYW5jZWwiLCJwcmV2aW91c19kYXRhIiwibG9hZE5ld0FsaWdubWVudCIsImFsblVSSSIsImFublVSSSIsInRpdGxlIiwib3BlbiIsImJ1aWxkTW9kZWwiLCJtb2Rfa2V5Iiwic3dhcERvbXNlcmYiLCJ1cmlfbnVtYmVyIiwiZXJyb3JfbWVzc2FnZSIsImpvYl9zdHJpbmciLCJjaGVja19saXN0IiwidmVyaWZ5X2Zvcm0iLCJwc2lwcmVkX2NoZWNrZWQiLCJwZ2VudGhyZWFkZXJfY2hlY2tlZCIsInBkb210aHJlYWRlcl9jaGVja2VkIiwiY2hlY2tlZF9hcnJheSIsInRlc3QiLCJudWNsZW90aWRlX2NvdW50Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFTyxTQUFTQSxhQUFULENBQXVCQyxPQUF2QixFQUFnQ0MsSUFBaEMsRUFBcUM7O0FBRTFDLE1BQUlDLFFBQVFELEtBQUtFLEtBQUwsQ0FBVyxJQUFYLENBQVo7QUFDQSxNQUFJQyxVQUFVLEVBQWQ7QUFDQSxNQUFJQyxVQUFVLEVBQWQ7QUFDQSxNQUFJQyxVQUFVLEVBQWQ7QUFDQSxNQUFJQyxhQUFhLEVBQWpCO0FBQ0FMLFFBQU1NLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWVDLENBQWYsRUFBaUI7QUFDN0IsUUFBR0QsS0FBS0UsVUFBTCxDQUFnQixHQUFoQixDQUFILEVBQXdCO0FBQUM7QUFBUTtBQUNqQyxRQUFJQyxVQUFVSCxLQUFLTixLQUFMLENBQVcsSUFBWCxDQUFkO0FBQ0EsUUFBR1MsUUFBUUMsTUFBUixHQUFpQixDQUFwQixFQUFzQjtBQUFD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QUNBO0FBQ0V1WixvQkFBZ0JBLGdCQUFnQiw2Q0FBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUlTLG1CQUFtQixDQUFDelUsSUFBSWhDLEtBQUosQ0FBVSwwQkFBVixLQUF1QyxFQUF4QyxFQUE0Q3ZELE1BQW5FO0FBQ0EsTUFBSWdhLG1CQUFpQnpVLElBQUl2RixNQUF0QixHQUFnQyxJQUFuQyxFQUNBO0FBQ0V1WixvQkFBZ0JBLGdCQUFnQix3R0FBaEM7QUFDRDtBQUNELE1BQUcsK0JBQStCUSxJQUEvQixDQUFvQ3hVLEdBQXBDLENBQUgsRUFDQTtBQUNFZ1Usb0JBQWdCQSxnQkFBZ0IsaURBQWhDO0FBQ0Q7O0FBRUQsTUFBRyxpR0FBQTVILENBQVUsSUFBVixFQUFnQm1JLGFBQWhCLE1BQW1DLEtBQXRDLEVBQTZDO0FBQzNDUCxvQkFBZ0JBLGdCQUFnQiwrQ0FBaEM7QUFDRDtBQUNELFNBQU9BLGFBQVA7QUFDRCxDIiwiZmlsZSI6InBzaXByZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWQxNjk0MTExOGJkNmYzZDY4OTIiLCJleHBvcnQgZnVuY3Rpb24gcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKXtcblxuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGJwX2RhdGEgPSBbXTtcbiAgbGV0IG1mX2RhdGEgPSBbXTtcbiAgbGV0IGNjX2RhdGEgPSBbXTtcbiAgbGV0IHRhYmxlX2RhdGEgPSAnJztcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoJyMnKSl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgIGlmKGVudHJpZXMubGVuZ3RoIDwgNCl7cmV0dXJuO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQlAnKXticF9kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdDQycpe2NjX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ01GJyl7bWZfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgfSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPkJpb2xvZ2ljYWwgUHJvY2VzcyBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgYnBfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+TW9sZWN1bGFyIEZ1bmN0aW9uIFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBtZl9kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG5cbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5DZWxsdWxhciBDb21wb25lbnQgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGNjX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcbiAgfSk7XG4gIHRhYmxlX2RhdGEgKz0gJzwvdGFibGU+PGJyIC8+JztcbiAgdGFibGVfZGF0YSArPSAnVGhlc2UgcHJlZGljdGlvbiB0ZXJtcyByZXByZXNlbnQgdGVybXMgcHJlZGljdGVkIHdoZXJlIFNWTSB0cmFpbmluZyBpbmNsdWRlcyBhc3NpZ25lZCBHTyB0ZXJtcyBhY3Jvc3MgYWxsIGV2aWRlbmNlIGNvZGUgdHlwZXMuIFNWTSByZWxpYWJpbGl0eSBpcyByZWdhcmRlZCBhcyBIaWdoIChIKSB3aGVuIE1DQywgc2Vuc2l0aXZpdHksIHNwZWNpZmljaXR5IGFuZCBwcmVjaXNpb24gYXJlIGpvaW50bHkgYWJvdmUgYSBnaXZlbiB0aHJlc2hvbGQuIG90aGVyd2lzZSBSZWxpYWJpbGl0eSBpcyBpbmRpY2F0ZWQgYXMgTG93IChMKS4gPGJyIC8+JztcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIHRhYmxlX2RhdGEpO1xuXG59XG5cbmZ1bmN0aW9uIHNldF9hYW5vcm0oKXtcbiAgbGV0IGhBQV9ub3JtID0ge307XG4gIGhBQV9ub3JtLkEgPSB7IHZhbDogMC4wNzE3ODMyNDgwMDYzMDksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjczNjc2NjE1MjQyNzV9O1xuICBoQUFfbm9ybS5WID0geyB2YWw6IDAuMDU5NjI0NTk1MzY5OTAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMzc3NzkxNTI4NzQ1fTtcbiAgaEFBX25vcm0uWSA9IHsgdmFsOiAwLjAyNjA3NTA2ODI0MDQzNyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNDgyMjQ3MTUzMTM3OX07XG4gIGhBQV9ub3JtLlcgPSB7IHZhbDogMC4wMTQxNjYwMDI2MTI3NzEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTA0NzE4MzU4MDE5OTZ9O1xuICBoQUFfbm9ybS5UID0geyB2YWw6IDAuMDUyNTkzNTgyOTcyNzE0LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwMDk0NzkzOTY0NTk3fTtcbiAgaEFBX25vcm0uUyA9IHsgdmFsOiAwLjA4MjEyMzI0MTMzMjA5OSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyODY4NzU2NjA4MTUxMn07XG4gIGhBQV9ub3JtLlAgPSB7IHZhbDogMC4wNjU1NTc1MzEzMjIyNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzQyMzkzOTg0OTY3MzZ9O1xuICBoQUFfbm9ybS5GID0geyB2YWw6IDAuMDM3MTAzOTk0OTY5MDAyLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE4NTQzNDIzMTM5MTg2fTtcbiAgaEFBX25vcm0uTSA9IHsgdmFsOiAwLjAyMjU2MjgxODE4Mzk1NSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxMTMyMTAzOTY2MjQ4MX07XG4gIGhBQV9ub3JtLksgPSB7IHZhbDogMC4wNTQ4MzM5NzkyNjkxODUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjkyNjQwODM2NjcxNTd9O1xuICBoQUFfbm9ybS5MID0geyB2YWw6IDAuMTAwMTA1OTE1NzU5MDYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAyNzY4MDg1MTkwMDl9O1xuICBoQUFfbm9ybS5JID0geyB2YWw6IDAuMDQyMDM0NTI2MDQwNDY3LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODI2ODQ5MjYyNDk1fTtcbiAgaEFBX25vcm0uSCA9IHsgdmFsOiAwLjAyNzE0MTQwMzUzNzU5OCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxNTUwNTY2Mzc4OTg1fTtcbiAgaEFBX25vcm0uRyA9IHsgdmFsOiAwLjA2OTE3OTgyMDEwNDUzNixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAzMDA4NzU2MjA1NzMyOH07XG4gIGhBQV9ub3JtLlEgPSB7IHZhbDogMC4wNjU5MjA1NjE5MzE4MDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAxMDMwOTEwMDgzNjZ9O1xuICBoQUFfbm9ybS5FID0geyB2YWw6IDAuMDQ2NDc4NDYyMjU4MzgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTk5NDYyNjk0NjE3MzZ9O1xuICBoQUFfbm9ybS5DID0geyB2YWw6IDAuMDI0OTA4NTUxODcyMDU2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDIwODIyOTA5NTg5NTA0fTtcbiAgaEFBX25vcm0uRCA9IHsgdmFsOiAwLjA0NDMzNzkwNDcyNjA0MSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODQzNjY3NzI1NjcyNn07XG4gIGhBQV9ub3JtLk4gPSB7IHZhbDogMC4wMzM1MDcwMjA5ODcwMzMsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTY1MzYwMjIyODgyMDR9O1xuICBoQUFfbm9ybS5SID0geyB2YWw6IDAuMDU5NzQwNDY5MDMxMTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjUxNjU5OTQ3NzMzODR9O1xuICByZXR1cm4oaEFBX25vcm0pO1xufVxuXG5mdW5jdGlvbiBzZXRfZm5vcm0oKXtcbiAgbGV0IGhGX25vcm0gPSB7fTtcbiAgaEZfbm9ybS5oeWRyb3Bob2JpY2l0eSA9IHt2YWw6IC0wLjM0ODc2ODI4MDgwMTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMC43NTU1OTE1Mjc2OTc5OX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgcG9zaXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjQ1NzcxNzQ2Njk0OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMy41NjcxMzMzNDExMzl9O1xuICBoRl9ub3JtWydhbGlwaGF0aWMgaW5kZXgnXSA9IHt2YWw6IDc5LjkxMTU0OTMxOTA5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi43ODc2MTc5Nzg4Mjd9O1xuICBoRl9ub3JtWydpc29lbGVjdHJpYyBwb2ludCddID0ge3ZhbDogNy42MTAyMDQ2MzgzNjAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMS45NzE2MTExMDIwMDg4fTtcbiAgaEZfbm9ybVsnbW9sZWN1bGFyIHdlaWdodCddID0ge3ZhbDogNDg2NjguNDEyODM5OTYxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzNzgzOC4zMjQ4OTU5Njl9O1xuICBoRl9ub3JtLmNoYXJnZSA9IHt2YWw6IDUuMDk5MTc2MzA1NzYwNCxcbiAgICAgICAgICAgICAgICAgICAgc2RlOiAxNi44Mzg2MzY1OTAyNX07XG4gIGhGX25vcm1bJ3BlcmNlbnQgbmVnYXRpdmUgcmVzaWR1ZXMnXSA9IHt2YWw6IDExLjAyNjE5MDEyODE3NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogNC4wMjA2NjMxNjgwOTI2fTtcbiAgaEZfbm9ybVsnbW9sYXIgZXh0aW5jdGlvbiBjb2VmZmljaWVudCddID0ge3ZhbDogNDY0NzUuMjkzOTIzOTI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RlOiAzOTI5OS4zOTk4NDg4MjN9O1xuICByZXR1cm4oaEZfbm9ybSk7XG59XG5cbmZ1bmN0aW9uIGdldF9hYV9jb2xvcih2YWwpe1xuICAgIGxldCBhYl92YWwgPSBNYXRoLmFicyh2YWwpO1xuICAgIGlmKGFiX3ZhbCA+PSAyLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjFwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAyLjI0KXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMnBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjJuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuOTYgKXtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmNXBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjVuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoYWJfdmFsID49IDEuNjQ1ICkge1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxMHBcIjt9XG4gICAgICAgIHJldHVybiBcInNpZ25pZjEwblwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJwbGFpblwiO1xufVxuXG4vL3BhcnNlIHRoZSBmZnByZWQgZmVhdGNmbyBmZWF0dXJlcyBmaWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IFNGX2RhdGEgPSB7fTtcbiAgbGV0IEFBX2RhdGEgPSB7fTtcbiAgbGV0IGhGX25vcm0gPXNldF9mbm9ybSgpO1xuICBsZXQgaEFBX25vcm09c2V0X2Fhbm9ybSgpO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIkFBXCIpKXtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBBQV9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gICAgaWYobGluZS5zdGFydHNXaXRoKFwiU0ZcIikpXG4gICAge1xuICAgICAgbGV0IGNvbHVtbnMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICAgIFNGX2RhdGFbY29sdW1uc1sxXV0gPSBjb2x1bW5zWzJdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gYnVpbGQgaHRtbCB0YWJsZXMgZm9yIHRoZSBmZWF0dXJlIGRhdGFcbiAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICBsZXQgZ2xvYmFsX2ZlYXR1cmVzID0gcmFjdGl2ZS5nZXQoJ2dsb2JhbF9mZWF0dXJlcycpO1xuICBsZXQgZmVhdF90YWJsZSA9ICc8Yj5HbG9iYWwgRmVhdHVyZXM8L2I+PGJyIC8+JztcbiAgZmVhdF90YWJsZSArPSAnR2xvYmFsIGZlYXR1cmVzIGFyZSBjYWxjdWxhdGVkIGRpcmVjdGx5IGZyb20gc2VxdWVuY2UuIExvY2FsaXNhdGlvbiB2YWx1ZXMgYXJlIHByZWRpY3RlZCBieSB0aGUgUHNvcnQgYWxnb3JpdGhtIGFuZCByZWZsZWN0IHRoZSByZWxhdGl2ZSBsaWtlbGlob29kIG9mIHRoZSBwcm90ZWluIG9jY3VweWluZyBkaWZmZXJlbnQgY2VsbHVsYXIgbG9jYWxpc2F0aW9ucy4gVGhlIGJpYXMgY29sdW1uIGlzIGhpZ2hsaWdodGVkIGFjY29yZGluZyB0byB0aGUgc2lnbmlmaWNhbmNlIG9mIHRoZSBmZWF0dXJlIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBaIHNjb3JlIG9mIHRoZSBmZWF0dXJlLjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJzx0YWJsZT48dHI+PHRoPkZlYXR1cmUgTmFtZTwvdGg+PHRoPlZhbHVlPC90aD48dGg+QmlhczwvdGg+PC90cj4nO1xuXG4gIE9iamVjdC5rZXlzKFNGX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmVfbmFtZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGlmKGZlYXR1cmVfbmFtZSBpbiBoRl9ub3JtKXtcbiAgICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvciggKHBhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS1oRl9ub3JtW2ZlYXR1cmVfbmFtZV0udmFsKSAvIGhGX25vcm1bZmVhdHVyZV9uYW1lXS5zZGUpO1xuICAgIH1cbiAgICBmZWF0X3RhYmxlICs9ICc8dHI+PHRkPicrZmVhdHVyZV9uYW1lKyc8L3RkPjx0ZD4nK3BhcnNlRmxvYXQoU0ZfZGF0YVtmZWF0dXJlX25hbWVdKS50b0ZpeGVkKDIpKyc8L3RkPjx0ZCBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPjwvdHI+JztcbiAgfSk7XG4gIGZlYXRfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIGZlYXRfdGFibGUpO1xuXG4gIC8vYnVpbGQgaHRtbCB0YWJsZSBmb3IgdGhlIEFBIGRhdGFcbiAgbGV0IGFhX2NvbXBvc2l0aW9uID0gcmFjdGl2ZS5nZXQoJ2FhX2NvbXBvc2l0aW9uJyk7XG4gIGxldCBhYV90YWJsZSA9ICc8Yj5BbWlubyBBY2lkIENvbXBvc2l0aW9uIChwZXJjZW50YWdlcyk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZT48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgYWFfdGFibGUgKz0gJzx0aD4nK3Jlc2lkdWUrJzwvdGg+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjx0cj4nO1xuICBPYmplY3Qua2V5cyhBQV9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihyZXNpZHVlKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJyc7XG4gICAgY2xhc3NfY29sb3VyID0gZ2V0X2FhX2NvbG9yKChwYXJzZUZsb2F0KEFBX2RhdGFbcmVzaWR1ZV0pLWhBQV9ub3JtW3Jlc2lkdWVdLnZhbCkgLyBoQUFfbm9ybVtyZXNpZHVlXS5zZGUpO1xuICAgIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JysocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKSoxMDApLnRvRml4ZWQoMikrJzwvdGQ+JztcbiAgfSk7XG4gIGFhX3RhYmxlICs9ICc8L3RyPjwvdGFibGU+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzxiPlNpZ25pZmljYW5jZSBLZXk8L2I+PGJyIC8+JztcbiAgYWFfdGFibGUgKz0gJzx0YWJsZSBjbGFzcz1cInNpZ25pZmtleVwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIyXCIgY2VsbHNwYWNpbmc9XCIwXCI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjxiPmxvdzwvYj48L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjlcIj4mbmJzcDs8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgYWxpZ249XCJyaWdodFwiPjxiPmhpZ2g8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMW5cIj5wICZsdDsgMC4wMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJuXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1blwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMTBuXCI+cCAmbHQ7IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD5wICZndDs9IDAuMTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwcFwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWY1cFwiPnAgJmx0OyAwLjA1PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmMnBcIj5wICZsdDsgMC4wMjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFwXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPHRyPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY29sc3Bhbj1cIjExXCI+U2lnbmlmaWNhbmNlIHAgdmFsdWUgaXMgY2FsY3VsYXRlZCB1c2luZyB0aGUgWiBzY29yZSBvZiB0aGUgcGVyY2VudCBhbWlubyBhY2lkIGNvbXBvc2l0aW9uPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPC90cj4nO1xuICBhYV90YWJsZSArPSAnPC90YWJsZT4nO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBhYV90YWJsZSk7XG59XG5cblxuLy8gZm9yIGEgZ2l2ZW4gbWVtc2F0IGRhdGEgZmlsZXMgZXh0cmFjdCBjb29yZGluYXRlIHJhbmdlcyBnaXZlbiBzb21lIHJlZ2V4XG5leHBvcnQgZnVuY3Rpb24gZ2V0X21lbXNhdF9yYW5nZXMocmVnZXgsIGRhdGEpXG57XG4gICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBpZihtYXRjaFsxXS5pbmNsdWRlcygnLCcpKVxuICAgIHtcbiAgICAgIGxldCByZWdpb25zID0gbWF0Y2hbMV0uc3BsaXQoJywnKTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24sIGkpe1xuICAgICAgICByZWdpb25zW2ldID0gcmVnaW9uLnNwbGl0KCctJyk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMF0gPSBwYXJzZUludChyZWdpb25zW2ldWzBdKTtcbiAgICAgICAgcmVnaW9uc1tpXVsxXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIGVsc2UgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJy0nKSlcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoWzFdKTtcbiAgICAgICAgbGV0IHNlZyA9IG1hdGNoWzFdLnNwbGl0KCctJyk7XG4gICAgICAgIGxldCByZWdpb25zID0gW1tdLCBdO1xuICAgICAgICByZWdpb25zWzBdWzBdID0gcGFyc2VJbnQoc2VnWzBdKTtcbiAgICAgICAgcmVnaW9uc1swXVsxXSA9IHBhcnNlSW50KHNlZ1sxXSk7XG4gICAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuKG1hdGNoWzFdKTtcbn1cblxuLy8gdGFrZSBhbmQgc3MyIChmaWxlKSBhbmQgcGFyc2UgdGhlIGRldGFpbHMgYW5kIHdyaXRlIHRoZSBuZXcgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBhbm5vdGF0aW9uc1tpXS5zcyA9IGVudHJpZXNbM107XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBhbGVydChcIlNTMiBhbm5vdGF0aW9uIGxlbmd0aCBkb2VzIG5vdCBtYXRjaCBxdWVyeSBzZXF1ZW5jZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuKGFubm90YXRpb25zKTtcbn1cblxuLy90YWtlIHRoZSBkaXNvcHJlZCBwYmRhdCBmaWxlLCBwYXJzZSBpdCBhbmQgYWRkIHRoZSBhbm5vdGF0aW9ucyB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICctJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnRCc7fVxuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnXicpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ1BCJzt9XG4gICAgICB9KTtcbiAgICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgICAgIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgfVxufVxuXG4vL3BhcnNlIHRoZSBkaXNvcHJlZCBjb21iIGZpbGUgYW5kIGFkZCBpdCB0byB0aGUgYW5ub3RhdGlvbiBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29tYihyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgcHJlY2lzaW9uID0gW107XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpOyBsaW5lcy5zaGlmdCgpO1xuICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBwcmVjaXNpb25baV0gPSB7fTtcbiAgICBwcmVjaXNpb25baV0ucG9zID0gZW50cmllc1sxXTtcbiAgICBwcmVjaXNpb25baV0ucHJlY2lzaW9uID0gZW50cmllc1s0XTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicsIHByZWNpc2lvbik7XG4gIGJpb2QzLmdlbmVyaWN4eUxpbmVDaGFydChwcmVjaXNpb24sICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuLy9wYXJzZSB0aGUgbWVtc2F0IG91dHB1dFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgLy9jb25zb2xlLmxvZyhmaWxlKTtcbiAgbGV0IHRvcG9fcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9Ub3BvbG9neTpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHNpZ25hbF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1NpZ25hbFxcc3BlcHRpZGU6XFxzKyguKylcXG4vLCBmaWxlKTtcbiAgbGV0IHJlZW50cmFudF9yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1JlLWVudHJhbnRcXHNoZWxpY2VzOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgdGVybWluYWwgPSBnZXRfbWVtc2F0X3JhbmdlcygvTi10ZXJtaW5hbDpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgLy9jb25zb2xlLmxvZyhzaWduYWxfcmVnaW9ucyk7XG4gIC8vIGNvbnNvbGUubG9nKHJlZW50cmFudF9yZWdpb25zKTtcbiAgbGV0IGNvaWxfdHlwZSA9ICdDWSc7XG4gIGlmKHRlcm1pbmFsID09PSAnb3V0JylcbiAge1xuICAgIGNvaWxfdHlwZSA9ICdFQyc7XG4gIH1cbiAgbGV0IHRtcF9hbm5vID0gbmV3IEFycmF5KHNlcS5sZW5ndGgpO1xuICBpZih0b3BvX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJylcbiAge1xuICAgIGxldCBwcmV2X2VuZCA9IDA7XG4gICAgdG9wb19yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnVE0nLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICAgIGlmKHByZXZfZW5kID4gMCl7cHJldl9lbmQgLT0gMTt9XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZCwgcmVnaW9uWzBdKTtcbiAgICAgIGlmKGNvaWxfdHlwZSA9PT0gJ0VDJyl7IGNvaWxfdHlwZSA9ICdDWSc7fWVsc2V7Y29pbF90eXBlID0gJ0VDJzt9XG4gICAgICBwcmV2X2VuZCA9IHJlZ2lvblsxXSsyO1xuICAgIH0pO1xuICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLTEsIHNlcS5sZW5ndGgpO1xuXG4gIH1cbiAgLy9zaWduYWxfcmVnaW9ucyA9IFtbNzAsODNdLCBbMTAyLDExN11dO1xuICBpZihzaWduYWxfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICBzaWduYWxfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1MnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICAvL3JlZW50cmFudF9yZWdpb25zID0gW1s0MCw1MF0sIFsyMDAsMjE4XV07XG4gIGlmKHJlZW50cmFudF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHJlZW50cmFudF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUkgnLCByZWdpb25bMF0sIHJlZ2lvblsxXSsxKTtcbiAgICB9KTtcbiAgfVxuICB0bXBfYW5uby5mb3JFYWNoKGZ1bmN0aW9uKGFubm8sIGkpe1xuICAgIGFubm90YXRpb25zW2ldLm1lbXNhdCA9IGFubm87XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKGFubm90YXRpb25zLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgdHlwZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIC8vY29uc29sZS5sb2codHlwZSsnX2Fubl9zZXQnKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQodHlwZSsnX2Fubl9zZXQnKTtcbiAgLy9jb25zb2xlLmxvZyhhbm5fbGlzdCk7XG4gIGlmKE9iamVjdC5rZXlzKGFubl9saXN0KS5sZW5ndGggPiAwKXtcbiAgbGV0IHBzZXVkb190YWJsZSA9ICc8dGFibGUgY2xhc3M9XCJzbWFsbC10YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkXCI+XFxuJztcbiAgcHNldWRvX3RhYmxlICs9ICc8dHI+PHRoPkNvbmYuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5OZXQgU2NvcmU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPnAtdmFsdWU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBhaXJFPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Tb2x2RTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5BbG4gTGVuZ3RoPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5UYXJnZXQgTGVuPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5RdWVyeSBMZW48L3RoPic7XG4gIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+UmVnaW9uIFN0YXJ0PC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBFbmQ8L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Q0FUSCBEb21haW48L3RoPic7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gIH1lbHNlIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5Gb2xkPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBTQ09QPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBDQVRIPC90aD4nO1xuICB9XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlBEQlNVTTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxpZ25tZW50PC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5NT0RFTDwvdGg+JztcblxuICAvLyBpZiBNT0RFTExFUiBUSElOR1lcbiAgcHNldWRvX3RhYmxlICs9ICc8L3RyPjx0Ym9keVwiPlxcbic7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgLy9jb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZihsaW5lLmxlbmd0aCA9PT0gMCl7cmV0dXJuO31cbiAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBsZXQgdGFibGVfaGl0ID0gZW50cmllc1s5XTtcbiAgICBpZih0eXBlID09PSAnZGdlbicpeyB0YWJsZV9oaXQgPSBlbnRyaWVzWzExXTt9XG4gICAgaWYodGFibGVfaGl0K1wiX1wiK2kgaW4gYW5uX2xpc3QpXG4gICAge1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0cj5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQgY2xhc3M9J1wiK2VudHJpZXNbMF0udG9Mb3dlckNhc2UoKStcIic+XCIrZW50cmllc1swXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzJdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1szXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzVdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s2XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbN10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzhdK1wiPC90ZD5cIjtcbiAgICBsZXQgcGRiID0gZW50cmllc1s5XS5zdWJzdHJpbmcoMCwgZW50cmllc1s5XS5sZW5ndGgtMik7XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgcGRiID0gZW50cmllc1sxMV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbMTFdLmxlbmd0aC0zKTt9XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzldK1wiPC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzEwXStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vdmVyc2lvbi9sYXRlc3QvZG9tYWluL1wiK3RhYmxlX2hpdCtcIic+XCIrdGFibGVfaGl0K1wiPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJjYXRoX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly93d3cucmNzYi5vcmcvcGRiL2V4cGxvcmUvZXhwbG9yZS5kbz9zdHJ1Y3R1cmVJZD1cIitwZGIrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5DQVRIIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmViaS5hYy51ay90aG9ybnRvbi1zcnYvZGF0YWJhc2VzL2NnaS1iaW4vcGRic3VtL0dldFBhZ2UucGw/cGRiY29kZT1cIitwZGIrXCInPk9wZW4gUERCU1VNPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5sb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisodGFibGVfaGl0K1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdwc2lwcmVkLmJ1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFt0YWJsZV9oaXQrXCJfXCIraV0uYWxuKStcIlxcXCIsIFxcXCJwZGJfbW9kZWxsZXJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIH1cbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8L3RyPlxcblwiO1xuICAgIH1cbiAgfSk7XG4gIHBzZXVkb190YWJsZSArPSBcIjwvdGJvZHk+PC90YWJsZT5cXG5cIjtcbiAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBwc2V1ZG9fdGFibGUpO1xuICB9XG4gIGVsc2Uge1xuICAgICAgcmFjdGl2ZS5zZXQodHlwZStcIl90YWJsZVwiLCBcIjxoMz5ObyBnb29kIGhpdHMgZm91bmQuIEdVRVNTIGFuZCBMT1cgY29uZmlkZW5jZSBoaXRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgcmVzdWx0cyBmaWxlPC9oMz5cIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWRpY3Rpb25fcmVnZXggPSAvRG9tYWluXFxzQm91bmRhcnlcXHNsb2NhdGlvbnNcXHNwcmVkaWN0ZWRcXHNEUFM6XFxzKC4rKS87XG4gIGxldCBwcmVkaWN0aW9uX21hdGNoID0gIHByZWRpY3Rpb25fcmVnZXguZXhlYyhmaWxlKTtcbiAgaWYocHJlZGljdGlvbl9tYXRjaClcbiAge1xuICAgIGxldCBkZXRhaWxzID0gZmlsZS5yZXBsYWNlKFwiXFxuXCIsXCI8YnIgLz5cIik7XG4gICAgZGV0YWlscyA9IGRldGFpbHMucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiPGg0PlwiK2RldGFpbHMrXCI8L2g0PlwiKTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgaWYocHJlZGljdGlvbl9tYXRjaFsxXS5pbmRleE9mKFwiLFwiKSlcbiAgICB7XG4gICAgICB2YWx1ZXMgPSBwcmVkaWN0aW9uX21hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaSl7XG4gICAgICAgIHZhbHVlc1tpXSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQocHJlZGljdGlvbl9tYXRjaFsxXSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpe1xuICAgICAgYW5ub3RhdGlvbnNbdmFsdWVdLmRvbXByZWQgPSAnQic7XG4gICAgfSk7XG4gICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGFyc2Vkc19pbmZvXCIsIFwiTm8gUGFyc2VEUyBEb21haW4gYm91bmRhcmllcyBwcmVkaWN0ZWRcIik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMiLCJpbXBvcnQgeyBwcm9jZXNzX2ZpbGUgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfdGV4dCB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dfcGFuZWwodmFsdWUsIHJhY3RpdmUpXG57XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIHZhbHVlICk7XG59XG5cbi8vYmVmb3JlIGEgcmVzdWJtaXNzaW9uIGlzIHNlbnQgYWxsIHZhcmlhYmxlcyBhcmUgcmVzZXQgdG8gdGhlIHBhZ2UgZGVmYXVsdHNcbmV4cG9ydCBmdW5jdGlvbiBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZywgam9iX2xpc3QsIGpvYl9uYW1lcyl7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCdkb3dubG9hZF9saW5rcycsICcnKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyICcram9iX25hbWVzW2pvYl9uYW1lXSsnIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX3NjaGVtYXRpYycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fc2V0Jywge30pO1xuICByYWN0aXZlLnNldCgnZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgnZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfaW5mbycsIG51bGwpO1xuICByYWN0aXZlLnNldCgncGFyc2Vkc19wbmcnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fdGFibGUnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RnZW5fYW5uX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfbW9kZWwnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9ucycsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfbW9kZWxfdXJpczonLCBbXSk7XG4gIHJhY3RpdmUuc2V0KCdzY2hfc2NoZW1hdGljOicsIG51bGwpO1xuICByYWN0aXZlLnNldCgnYWFfY29tcG9zaXRpb24nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2dsb2JhbF9mZWF0dXJlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgbnVsbCk7XG5cbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLG51bGwpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnNlcXVlbmNlX3Bsb3QnKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5wc2lwcmVkX2NhcnRvb24nKTtcbiAgYmlvZDMuY2xlYXJTZWxlY3Rpb24oJ2Rpdi5jb21iX3Bsb3QnKTtcblxuICB6aXAgPSBuZXcgSlNaaXAoKTtcbn1cblxuLy9UYWtlIGEgY291cGxlIG9mIHZhcmlhYmxlcyBhbmQgcHJlcGFyZSB0aGUgaHRtbCBzdHJpbmdzIGZvciB0aGUgZG93bmxvYWRzIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZV9kb3dubG9hZHNfaHRtbChkYXRhLCBkb3dubG9hZHNfaW5mbywgam9iX2xpc3QsIGpvYl9uYW1lcylcbntcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgaWYoZGF0YS5qb2JfbmFtZSA9PT0gam9iX25hbWUpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm9bam9iX25hbWVdID0ge307XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgLy9FWFRSQSBQQU5FTFMgRk9SIFNPTUUgSk9CUyBUWVBFUzpcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncGdlbnRocmVhZGVyJyB8fCBqb2JfbmFtZSA9PT0gJ2RvbXByZWQnICB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnbWV0YXBzaWNvdicgfHxcbiAgICAgICAgIGpvYl9uYW1lID09PSAnZmZwcmVkJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ21lbXBhY2snKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm09IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdiaW9zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlcj0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucGdlbnRocmVhZGVyK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuYmlvc2VyZitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdkb21zZXJmJylcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wc2lwcmVkK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlcj0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMucGRvbXRocmVhZGVyK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMuZG9tc2VyZitcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgICAgaWYoam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0gPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5tZW1zYXRzdm0rXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZD0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuaGVhZGVyID0gXCI8aDU+RG9tUHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQgPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5mZnByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vL3Rha2UgdGhlIGRhdGFibG9iIHdlJ3ZlIGdvdCBhbmQgbG9vcCBvdmVyIHRoZSByZXN1bHRzXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8sIGpvYl9uYW1lcylcbntcbiAgbGV0IGhvcml6X3JlZ2V4ID0gL1xcLmhvcml6JC87XG4gIGxldCBzczJfcmVnZXggPSAvXFwuc3MyJC87XG4gIGxldCBwbmdfcmVnZXggPSAvXFwucG5nJC87XG4gIGxldCBtZW1zYXRfY2FydG9vbl9yZWdleCA9IC9fY2FydG9vbl9tZW1zYXRfc3ZtXFwucG5nJC87XG4gIGxldCBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4ID0gL19zY2hlbWF0aWNcXC5wbmckLztcbiAgbGV0IG1lbXNhdF9kYXRhX3JlZ2V4ID0gL21lbXNhdF9zdm0kLztcbiAgbGV0IG1lbXBhY2tfY2FydG9vbl9yZWdleCA9IC9LYW1hZGEtS2F3YWlfXFxkKy5wbmckLztcbiAgbGV0IG1lbXBhY2tfZ3JhcGhfb3V0ID0gL2lucHV0X2dyYXBoLm91dCQvO1xuICBsZXQgbWVtcGFja19jb250YWN0X3JlcyA9IC9DT05UQUNUX0RFRjEucmVzdWx0cyQvO1xuICBsZXQgbWVtcGFja19saXBpZF9yZXMgPSAvTElQSURfRVhQT1NVUkUucmVzdWx0cyQvO1xuICBsZXQgZG9tc3NlYV9wcmVkX3JlZ2V4ID0gL1xcLnByZWQkLztcbiAgbGV0IGRvbXNzZWFfcmVnZXggPSAvXFwuZG9tc3NlYSQvO1xuICBsZXQgZG9tc2VyZl9yZWdleCA9IC8uK18oXFxkKylfKFxcZCspLipcXC5wZGIvO1xuICBsZXQgZmZwcmVkX3NjaF9yZWdleCA9IC8uK19zY2hcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3N2bV9yZWdleCA9IC8uK19jYXJ0b29uX21lbXNhdF9zdm1fLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3NjaGVtYXRpY19yZWdleCA9IC8uK19zY2hlbWF0aWNfLipcXC5wbmcvO1xuICBsZXQgZmZwcmVkX3RtX3JlZ2V4ID0gLy4rX3RtcFxcLnBuZy87XG4gIGxldCBmZnByZWRfZmVhdGNmZ19yZWdleCA9IC9cXC5mZWF0Y2ZnLztcbiAgbGV0IGZmcHJlZF9wcmVkc19yZWdleCA9IC9cXC5mdWxsX3Jhdy87XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBsZXQgZG9tYWluX2NvdW50ID0gMDtcbiAgbGV0IG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBkb21zZXJmX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgcmVmb3JtYXRfZG9tc2VyZl9tb2RlbHNfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIC8vUHJlcGF0b3J5IGxvb3AgZm9yIGluZm9ybWF0aW9uIHRoYXQgaXMgbmVlZGVkIGJlZm9yZSByZXN1bHRzIHBhcnNpbmc6XG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwicGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fZ2VuYWxpZ25tZW50X2Fubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb25fZG9tJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJkZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImRnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gIC8vbWFpbiByZXN1bHRzIHBhcnNpbmcgbG9vcFxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgLy9wc2lwcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PSAncHNpcGFzczInKVxuICAgIHtcbiAgICAgIHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBCREFUIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfdGltZVwiLCAnJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2NvbWJpbmUnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnY29tYicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q09NQiBOTiBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL21lbXNhdCBhbmQgbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1zYXRzdm0nKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoZW1lX21hdGNoID0gbWVtc2F0X3NjaGVtYXRpY19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hlbWVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNjaGVtYXRpYyBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9IG1lbXNhdF9jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbWVtc2F0X21hdGNoID0gbWVtc2F0X2RhdGFfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWVtc2F0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWVtc2F0ZGF0YScsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICAvL21lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtcGFja193cmFwcGVyJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2dlbl9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL3Bkb210aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzdm1fcHJvYl9kb20nKVxuICAgIHtcbiAgICAgIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfZG9tX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vZG9tcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwYXJzZWRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHBuZ19tYXRjaCA9IHBuZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwbmdfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnlfcG5nID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BhcnNlZHMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZG9tc3NlYScpXG4gICAge1xuICAgICAgbGV0IHByZWRfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBkb21zc2VhX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zc2VhX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIGZpbGU8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3J1bkJpb3NlcmYnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoaGJsaXRzX3BkYjcwJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ISFNlYXJjaCBSZXN1bHRzPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwZ3BibGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9jYXRoJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNBVEggQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3JlZm9ybWF0X2RvbXNlcmZfbW9kZWxzJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSBcInBhcnNlX3BkYl9ibGFzdFwiKVxuICAgIHtcbiAgICAgIGxldCBkb21zZXJmX21hdGNoID0gZG9tc2VyZl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zZXJmX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl90aW1lXCIsICcnKTtcbiAgICAgICAgLy8gVE8gRE8gQUREIFJFR0VYXG4gICAgICAgIGRvbWFpbl9jb3VudCs9MTtcbiAgICAgICAgZG9tc2VyZl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICBpZihkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKXtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCArPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnV0dG9uc190YWdzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX2J1dHRvbnNcIik7XG4gICAgICAgIGJ1dHRvbnNfdGFncyArPSAnPGJ1dHRvbiBvbkNsaWNrPVwicHNpcHJlZC5zd2FwRG9tc2VyZignK2RvbWFpbl9jb3VudCsnKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkRvbWFpbiAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYnV0dG9uPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9idXR0b25zXCIsIGJ1dHRvbnNfdGFncyk7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgICAgICBwYXRocy5wdXNoKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIsIHBhdGhzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0U2NoZW1hdGljJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3RpbWVcIiwgJycpO1xuXG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZlYXR1cmVzJylcbiAgICB7XG4gICAgICBsZXQgZmVhdF9tYXRjaCA9IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGZlYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlcXVlbmNlIEZlYXR1cmUgU3VtbWFyeTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZGZlYXR1cmVzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2h1bWFuJylcbiAgICB7XG4gICAgICBsZXQgcHJlZHNfbWF0Y2ggPSBmZnByZWRfcHJlZHNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZHNfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdPIFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkcHJlZGljdGlvbnMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgLy9TZXQgbm8gZm91bmQgc3RhdG1lbnRzIGZvciBzb21lIGpvYnMuXG4gIGlmKCEgbWVtcGFja19yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxoMz5ObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8L2gzPicpO1xuICB9XG4gIGlmKCEgcHNpcHJlZF9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICdObyAnK2pvYl9uYW1lcy5wc2lwcmVkKycgZGF0YSBnZW5lcmF0ZWQgZm9yIHRoaXMgam9iJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICB9XG4gIGlmKCEgcGRvbXRocmVhZGVyX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnTm8gJytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgdGFibGUgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gIH1cbiAgaWYoZG9tc2VyZl9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICBsZXQgcGF0aHMgPSByYWN0aXZlLmdldChcImRvbXNlcmZfbW9kZWxfdXJpc1wiKTtcbiAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfc3RydWN0dXJlKHVyaSwgY3NzX2lkKVxue1xuICBsZXQgY2FydG9vbl9jb2xvciA9IGZ1bmN0aW9uKGF0b20pIHtcbiAgICAgICAgIGlmKGF0b20uc3MgPT09ICdoJyl7cmV0dXJuICcjZTM1M2UzJzt9XG4gICAgICAgICBpZihhdG9tLnNzID09PSAncycpe3JldHVybiAnI2U1ZGQ1NSc7fVxuICAgICAgICAgcmV0dXJuKCdncmV5Jyk7XG4gIH07XG4gIGNvbnNvbGUubG9nKFwiTE9BRElORzogXCIrdXJpKTtcbiAgbGV0IGVsZW1lbnQgPSAkKGNzc19pZCk7XG4gIGxldCBjb25maWcgPSB7IGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnIH07XG4gIGxldCB2aWV3ZXIgPSAkM0Rtb2wuY3JlYXRlVmlld2VyKCBlbGVtZW50LCBjb25maWcgKTtcbiAgbGV0IGRhdGEgPSBnZXRfdGV4dCh1cmksIFwiR0VUXCIsIHt9KTtcbiAgdmlld2VyLmFkZE1vZGVsKCBkYXRhLCBcInBkYlwiICk7ICAgICAgICAgICAgICAgICAgICAgICAvKiBsb2FkIGRhdGEgKi9cbiAgdmlld2VyLnNldFN0eWxlKHt9LCB7Y2FydG9vbjoge2NvbG9yZnVuYzogY2FydG9vbl9jb2xvcn19KTsgIC8qIHN0eWxlIGFsbCBhdG9tcyAqL1xuICB2aWV3ZXIuem9vbVRvKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBzZXQgY2FtZXJhICovXG4gIHZpZXdlci5yZW5kZXIoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHJlbmRlciBzY2VuZSAqL1xuICB2aWV3ZXIuem9vbSgxLjcsIDMwMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbylcbntcbiAgLy9jb25zb2xlLmxvZyhkb3dubG9hZHNfaW5mbyk7XG4gIGxldCBkb3dubG9hZHNfc3RyaW5nID0gcmFjdGl2ZS5nZXQoJ2Rvd25sb2FkX2xpbmtzJyk7XG4gIGlmKCdwc2lwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXope1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXopO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO31cbiAgfVxuICBpZignZGlzb3ByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdtZW1zYXRzdm0nIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uZGF0YSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdwZ2VudGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZ2VudGhyZWFkZXInIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGRvbXRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGlmKGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci50YWJsZSl7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgICB9XG4gIH1cbiAgaWYoJ21lbXBhY2snIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suaGVhZGVyKTtcbiAgICBpZihkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pXG4gICAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTxiciAvPlwiKTtcbiAgICB9XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdiaW9zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmJpb3NlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLnBkYmFhKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2RvbXNlcmYnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuY2F0aGJsYXN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZG9tc2VyZi5wZGJibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdmZnByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuZmVhdHVyZXMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQucHJlZHMpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCBkb3dubG9hZHNfc3RyaW5nKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzIiwiaW1wb3J0IHsgZ2V0X21lbXNhdF9yYW5nZXMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2Vfc3MyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BiZGF0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2NvbWIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfbWVtc2F0ZGF0YSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wcmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3BhcnNlZHMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmVhdGNmZyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9mZnByZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcblxuXG4vL2dpdmVuIGEgdXJsLCBodHRwIHJlcXVlc3QgdHlwZSBhbmQgc29tZSBmb3JtIGRhdGEgbWFrZSBhbiBodHRwIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX3JlcXVlc3QodXJsLCB0eXBlLCBzZW5kX2RhdGEpXG57XG4gIGNvbnNvbGUubG9nKCdTZW5kaW5nIFVSSSByZXF1ZXN0Jyk7XG4gIGNvbnNvbGUubG9nKHVybCk7XG4gIGNvbnNvbGUubG9nKHR5cGUpO1xuICB2YXIgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogc2VuZF9kYXRhLFxuICAgIGNhY2hlOiBmYWxzZSxcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgIGFzeW5jOiAgIGZhbHNlLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gc2VuZCBkYXRhXCIpO31cbiAgICAgIHJlc3BvbnNlPWRhdGE7XG4gICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChcIlNlbmRpbmcgSm9iIHRvIFwiK3VybCtcIiBGYWlsZWQuIFwiK2Vycm9yLnJlc3BvbnNlVGV4dCtcIi4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIHdhcyB1bmFibGUgdG8gcHJvY2VzcyB5b3VyIHN1Ym1pc3Npb24uIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpOyByZXR1cm4gbnVsbDtcbiAgfX0pLnJlc3BvbnNlSlNPTjtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuLy9naXZlbiBhIGpvYiBuYW1lIHByZXAgYWxsIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBzZW5kIGFuIGh0dHAgcmVxdWVzdCB0byB0aGVcbi8vYmFja2VuZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRfam9iKHJhY3RpdmUsIGpvYl9uYW1lLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcylcbntcbiAgLy9hbGVydChzZXEpO1xuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgZm9ybSBkYXRhXCIpO1xuICBjb25zb2xlLmxvZyhqb2JfbmFtZSk7XG4gIHZhciBmaWxlID0gbnVsbDtcbiAgdHJ5XG4gIHtcbiAgICBmaWxlID0gbmV3IEJsb2IoW3NlcV0pO1xuICB9IGNhdGNoIChlKVxuICB7XG4gICAgYWxlcnQoZSk7XG4gIH1cbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZkLmFwcGVuZChcImlucHV0X2RhdGFcIiwgZmlsZSwgJ2lucHV0LnR4dCcpO1xuICBmZC5hcHBlbmQoXCJqb2JcIixqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcInN1Ym1pc3Npb25fbmFtZVwiLG5hbWUpO1xuICBmZC5hcHBlbmQoXCJlbWFpbFwiLCBlbWFpbCk7XG5cbiAgbGV0IHJlc3BvbnNlX2RhdGEgPSBzZW5kX3JlcXVlc3Qoc3VibWl0X3VybCwgXCJQT1NUXCIsIGZkKTtcbiAgaWYocmVzcG9uc2VfZGF0YSAhPT0gbnVsbClcbiAge1xuICAgIGxldCB0aW1lcyA9IHNlbmRfcmVxdWVzdCh0aW1lc191cmwsJ0dFVCcse30pO1xuICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkodGltZXMpKTtcbiAgICBpZihqb2JfbmFtZSBpbiB0aW1lcylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBqb2JfbmFtZXNbam9iX25hbWVdK1wiIGpvYnMgdHlwaWNhbGx5IHRha2UgXCIrdGltZXNbam9iX25hbWVdK1wiIHNlY29uZHNcIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChqb2JfbmFtZSsnX3RpbWUnLCBcIlVuYWJsZSB0byByZXRyaWV2ZSBhdmVyYWdlIHRpbWUgZm9yIFwiK2pvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icy5cIik7XG4gICAgfVxuICAgIGZvcih2YXIgayBpbiByZXNwb25zZV9kYXRhKVxuICAgIHtcbiAgICAgIGlmKGsgPT0gXCJVVUlEXCIpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdiYXRjaF91dWlkJywgcmVzcG9uc2VfZGF0YVtrXSk7XG4gICAgICAgIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgam9iX25hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlXG4gIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy91dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgc2VxdWVuY2UgZnJvbSBhIHByZXZpb3VzIHN1Ym1pc3Npb24gaXMgdGhlXG4vL3BhZ2Ugd2FzIGxvYWRlZCB3aXRoIGEgVVVJRFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9wcmV2aW91c19kYXRhKHV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKVxue1xuICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0aW5nIGRldGFpbHMgZ2l2ZW4gVVJJJyk7XG4gICAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgICAvL2FsZXJ0KHVybCk7XG4gICAgbGV0IHN1Ym1pc3Npb25fcmVzcG9uc2UgPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgaWYoISBzdWJtaXNzaW9uX3Jlc3BvbnNlKXthbGVydChcIk5PIFNVQk1JU1NJT04gREFUQVwiKTt9XG4gICAgbGV0IHNlcSA9IGdldF90ZXh0KGZpbGVfdXJsK3N1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uaW5wdXRfZmlsZSwgXCJHRVRcIiwge30pO1xuICAgIGxldCBqb2JzID0gJyc7XG4gICAgc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHN1Ym1pc3Npb24pe1xuICAgICAgam9icyArPSBzdWJtaXNzaW9uLmpvYl9uYW1lK1wiLFwiO1xuICAgIH0pO1xuICAgIGpvYnMgPSBqb2JzLnNsaWNlKDAsIC0xKTtcbiAgICByZXR1cm4oeydzZXEnOiBzZXEsICdlbWFpbCc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uZW1haWwsICduYW1lJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5zdWJtaXNzaW9uX25hbWUsICdqb2JzJzogam9ic30pO1xufVxuXG5cbi8vZ2V0IHRleHQgY29udGVudHMgZnJvbSBhIHJlc3VsdCBVUklcbmV4cG9ydCBmdW5jdGlvbiBnZXRfdGV4dCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcblxuIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgLy9kYXRhVHlwZTogXCJ0eHRcIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gcmVxdWVzdCBpbnB1dCBkYXRhIHRleHRcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiR2V0dGluZ3MgcmVzdWx0cyB0ZXh0IGZhaWxlZC4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpO31cbiAgfSk7XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cblxuLy9wb2xscyB0aGUgYmFja2VuZCB0byBnZXQgcmVzdWx0cyBhbmQgdGhlbiBwYXJzZXMgdGhvc2UgcmVzdWx0cyB0byBkaXNwbGF5XG4vL3RoZW0gb24gdGhlIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzX2ZpbGUodXJsX3N0dWIsIHBhdGgsIGN0bCwgemlwLCByYWN0aXZlKVxue1xuICBsZXQgdXJsID0gdXJsX3N0dWIgKyBwYXRoO1xuICBsZXQgcGF0aF9iaXRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIC8vZ2V0IGEgcmVzdWx0cyBmaWxlIGFuZCBwdXNoIHRoZSBkYXRhIGluIHRvIHRoZSBiaW8zZCBvYmplY3RcbiAgLy9hbGVydCh1cmwpO1xuICBjb25zb2xlLmxvZygnR2V0dGluZyBSZXN1bHRzIEZpbGUgYW5kIHByb2Nlc3NpbmcnKTtcbiAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBhc3luYzogICB0cnVlLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZmlsZSlcbiAgICB7XG4gICAgICB6aXAuZm9sZGVyKHBhdGhfYml0c1sxXSkuZmlsZShwYXRoX2JpdHNbMl0sIGZpbGUpO1xuICAgICAgaWYoY3RsID09PSAnaG9yaXonKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsIGZpbGUpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAncGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZ2VuX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdnZW4nKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2RvbV9wcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAnZGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGFyc2VkcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3BhcnNlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRmZWF0dXJlcycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdmZnByZWRwcmVkaWN0aW9ucycpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChKU09OLnN0cmluZ2lmeShlcnJvcikpO31cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCIvL2dpdmVuIGFuZCBhcnJheSByZXR1cm4gd2hldGhlciBhbmQgZWxlbWVudCBpcyBwcmVzZW50XG5leHBvcnQgZnVuY3Rpb24gaXNJbkFycmF5KHZhbHVlLCBhcnJheSkge1xuICBpZihhcnJheS5pbmRleE9mKHZhbHVlKSA+IC0xKVxuICB7XG4gICAgcmV0dXJuKHRydWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybihmYWxzZSk7XG4gIH1cbn1cblxuLy93aGVuIGEgcmVzdWx0cyBwYWdlIGlzIGluc3RhbnRpYXRlZCBhbmQgYmVmb3JlIHNvbWUgYW5ub3RhdGlvbnMgaGF2ZSBjb21lIGJhY2tcbi8vd2UgZHJhdyBhbmQgZW1wdHkgYW5ub3RhdGlvbiBwYW5lbFxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKXtcblxuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIGxldCByZXNpZHVlcyA9IHNlcS5zcGxpdCgnJyk7XG4gIGxldCBhbm5vdGF0aW9ucyA9IFtdO1xuICByZXNpZHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlcyl7XG4gICAgYW5ub3RhdGlvbnMucHVzaCh7J3Jlcyc6IHJlc30pO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChyYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKSwge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xufVxuXG5cbi8vZ2l2ZW4gYSBVUkwgcmV0dXJuIHRoZSBhdHRhY2hlZCB2YXJpYWJsZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuICAgIGxldCB2YXJzID0ge307XG4gICAgLy9jb25zaWRlciB1c2luZyBsb2NhdGlvbi5zZWFyY2ggaW5zdGVhZCBoZXJlXG4gICAgbGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLFxuICAgIGZ1bmN0aW9uKG0sa2V5LHZhbHVlKSB7XG4gICAgICB2YXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFycztcbiAgfVxuXG4vKiEgZ2V0RW1QaXhlbHMgIHwgQXV0aG9yOiBUeXNvbiBNYXRhbmljaCAoaHR0cDovL21hdGFuaWNoLmNvbSksIDIwMTMgfCBMaWNlbnNlOiBNSVQgKi9cbihmdW5jdGlvbiAoZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCkge1xuICAgIC8vIEVuYWJsZSBzdHJpY3QgbW9kZVxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gRm9ybSB0aGUgc3R5bGUgb24gdGhlIGZseSB0byByZXN1bHQgaW4gc21hbGxlciBtaW5pZmllZCBmaWxlXG4gICAgbGV0IGltcG9ydGFudCA9IFwiIWltcG9ydGFudDtcIjtcbiAgICBsZXQgc3R5bGUgPSBcInBvc2l0aW9uOmFic29sdXRlXCIgKyBpbXBvcnRhbnQgKyBcInZpc2liaWxpdHk6aGlkZGVuXCIgKyBpbXBvcnRhbnQgKyBcIndpZHRoOjFlbVwiICsgaW1wb3J0YW50ICsgXCJmb250LXNpemU6MWVtXCIgKyBpbXBvcnRhbnQgKyBcInBhZGRpbmc6MFwiICsgaW1wb3J0YW50O1xuXG4gICAgd2luZG93LmdldEVtUGl4ZWxzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXh0cmFCb2R5O1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gRW11bGF0ZSB0aGUgZG9jdW1lbnRFbGVtZW50IHRvIGdldCByZW0gdmFsdWUgKGRvY3VtZW50RWxlbWVudCBkb2VzIG5vdCB3b3JrIGluIElFNi03KVxuICAgICAgICAgICAgZWxlbWVudCA9IGV4dHJhQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpO1xuICAgICAgICAgICAgZXh0cmFCb2R5LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudDtcbiAgICAgICAgICAgIGRvY3VtZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZXh0cmFCb2R5LCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgc3R5bGUgYSB0ZXN0IGVsZW1lbnRcbiAgICAgICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBjbGllbnQgd2lkdGggb2YgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdmFsdWUgPSB0ZXN0RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICBpZiAoZXh0cmFCb2R5KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4dHJhIGJvZHkgZWxlbWVudFxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGV4dHJhQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRlc3QgZWxlbWVudFxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVtIHZhbHVlIGluIHBpeGVsc1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0oZG9jdW1lbnQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGNsZWFyX3NldHRpbmdzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHByZXBhcmVfZG93bmxvYWRzX2h0bWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgaGFuZGxlX3Jlc3VsdHMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2V0X2Rvd25sb2Fkc19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzaG93X3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGRpc3BsYXlfc3RydWN0dXJlIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcblxudmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoJy5jb3B5QnV0dG9uJyk7XG52YXIgemlwID0gbmV3IEpTWmlwKCk7XG5cbmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xuXG4vLyBTRVQgRU5EUE9JTlRTIEZPUiBERVYsIFNUQUdJTkcgT1IgUFJPRFxubGV0IGVuZHBvaW50c191cmwgPSBudWxsO1xubGV0IHN1Ym1pdF91cmwgPSBudWxsO1xubGV0IHRpbWVzX3VybCA9IG51bGw7XG5sZXQgZ2VhcnNfc3ZnID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51ay9wc2lwcmVkX2JldGEvc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbmxldCBtYWluX3VybCA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWtcIjtcbmxldCBhcHBfcGF0aCA9IFwiL3BzaXByZWRfYmV0YVwiO1xubGV0IGZpbGVfdXJsID0gJyc7XG5sZXQgZ2Vhcl9zdHJpbmcgPSAnPG9iamVjdCB3aWR0aD1cIjE0MFwiIGhlaWdodD1cIjE0MFwiIHR5cGU9XCJpbWFnZS9zdmcreG1sXCIgZGF0YT1cIicrZ2VhcnNfc3ZnKydcIj48L29iamVjdD4nO1xubGV0IGpvYl9saXN0ID0gW1wicHNpcHJlZFwiLCBcInBnZW50aHJlYWRlclwiLCBcIm1ldGFwc2ljb3ZcIiwgXCJkaXNvcHJlZFwiLCBcIm1lbXBhY2tcIixcbiAgICAgICAgICAgICAgICBcIm1lbXNhdHN2bVwiLCBcImdlbnRocmVhZGVyXCIsIFwiZG9tcHJlZFwiLCBcInBkb210aHJlYWRlclwiLCBcImJpb3NlcmZcIixcbiAgICAgICAgICAgICAgICBcImRvbXNlcmZcIiwgXCJmZnByZWRcIiwgXCJtZXRzaXRlXCIsIFwiaHNwcmVkXCIsIFwibWVtZW1iZWRcIiwgXCJnZW50ZGJcIl07XG5sZXQgam9iX25hbWVzID0ge1xuICAncHNpcHJlZCc6ICdQU0lQUkVEIFY0LjAnLFxuICAnZGlzb3ByZWQnOiAnRElPU1BSRUQgMycsXG4gICdtZW1zYXRzdm0nOiAnTUVNU0FULVNWTScsXG4gICdwZ2VudGhyZWFkZXInOiAncEdlblRIUkVBREVSJyxcbiAgJ21lbXBhY2snOiAnTUVNUEFDSycsXG4gICdnZW50aHJlYWRlcic6ICdHZW5USFJFQURFUicsXG4gICdkb21wcmVkJzogJ0RvbVByZWQnLFxuICAncGRvbXRocmVhZGVyJzogJ3BEb21USFJFQURFUicsXG4gICdiaW9zZXJmJzogJ0Jpb3NTZXJmIHYyLjAnLFxuICAnZG9tc2VyZic6ICdEb21TZXJmIHYyLjEnLFxuICAnZmZwcmVkJzogJ0ZGUHJlZCAzJyxcbiAgJ21ldGFwc2ljb3YnOiAnTWV0YVBTSUNPVicsXG4gICdtZXRzaXRlJzogJ01ldFNpdGUnLFxuICAnaHNwcmVkJzogJ0hTUHJlZCcsXG4gICdtZW1lbWJlZCc6ICdNRU1FTUJFRCcsXG4gICdnZW50ZGInOiAnR2VuZXJhdGUgVERCJyxcbn07XG5cbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKVxue1xuICBlbmRwb2ludHNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2VuZHBvaW50cy8nO1xuICBzdWJtaXRfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbmFseXRpY3NfYXV0b21hdGVkL2pvYnRpbWVzLyc7XG4gIGFwcF9wYXRoID0gJy9pbnRlcmZhY2UnO1xuICBtYWluX3VybCA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAnO1xuICBnZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG4gIGZpbGVfdXJsID0gbWFpbl91cmw7XG59XG5lbHNlIGlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImJpb2luZnN0YWdlMS5jcy51Y2wuYWMudWtcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSAgPT09IFwiYmlvaW5mLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhyZWYgID09PSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9cIikge1xuICBlbmRwb2ludHNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9zdWJtaXNzaW9uLyc7XG4gIHRpbWVzX3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL2pvYnRpbWVzLyc7XG4gIGZpbGVfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrXCIvYXBpXCI7XG4gIC8vZ2VhcnNfc3ZnID0gXCIuLi9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xufVxuZWxzZSB7XG4gIGFsZXJ0KCdVTlNFVFRJTkcgRU5EUE9JTlRTIFdBUk5JTkcsIFdBUk5JTkchJyk7XG4gIGVuZHBvaW50c191cmwgPSAnJztcbiAgc3VibWl0X3VybCA9ICcnO1xuICB0aW1lc191cmwgPSAnJztcbn1cblxubGV0IGluaXRpYWxpc2F0aW9uX2RhdGEgPSB7XG4gICAgc2VxdWVuY2VfZm9ybV92aXNpYmxlOiAxLFxuICAgIHN0cnVjdHVyZV9mb3JtX3Zpc2libGU6IDAsXG4gICAgcmVzdWx0c192aXNpYmxlOiAxLFxuICAgIHJlc3VsdHNfcGFuZWxfdmlzaWJsZTogMSxcbiAgICBzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcblxuICAgIG1ldGFwc2ljb3ZfZGF0YTogbnVsbCxcbiAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG4gICAgaHNwcmVkX2RhdGE6IG51bGwsXG4gICAgbWVtZW1iZWRfZGF0YTogbnVsbCxcbiAgICBnZW50ZGJfZGF0YTogbnVsbCxcblxuICAgIC8vIFNlcXVlbmNlIGFuZCBqb2IgaW5mb1xuICAgIHNlcXVlbmNlOiAnJyxcbiAgICBzZXF1ZW5jZV9sZW5ndGg6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RhcnQ6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RvcDogMSxcbiAgICBlbWFpbDogJycsXG4gICAgbmFtZTogJycsXG4gICAgYmF0Y2hfdXVpZDogbnVsbCxcbiAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgIGFubm90YXRpb25zOiBudWxsLFxufTtcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfY2hlY2tlZCddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19idXR0b24nXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfam9iJ10gPSBqb2JfbmFtZSsnX2pvYic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnXSA9ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX2ljb24nXSA9IGdlYXJfc3RyaW5nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ190aW1lJ10gPSAnTG9hZGluZyBEYXRhJztcbn0pO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5tZXRhcHNpY292X2NoZWNrZWQgPSB0cnVlO1xuLy8gREVDTEFSRSBWQVJJQUJMRVMgYW5kIGluaXQgcmFjdGl2ZSBpbnN0YW5jZVxudmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gIGVsOiAnI3BzaXByZWRfc2l0ZScsXG4gIHRlbXBsYXRlOiAnI2Zvcm1fdGVtcGxhdGUnLFxuICBkYXRhOiBpbml0aWFsaXNhdGlvbl9kYXRhLFxufSk7XG5cbi8vc2V0IHNvbWUgdGhpbmdzIG9uIHRoZSBwYWdlIGZvciB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIikge1xuICByYWN0aXZlLnNldCgnZW1haWwnLCAnZGFuaWVsLmJ1Y2hhbkB1Y2wuYWMudWsnKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCAndGVzdCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCAnUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVMnKTtcbn1cblxuLy80YjZhZDc5Mi1lZDFmLTExZTUtODk4Ni05ODkwOTZjMTNlZTZcbmxldCB1dWlkX3JlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbmxldCB1dWlkX21hdGNoID0gdXVpZF9yZWdleC5leGVjKGdldFVybFZhcnMoKS51dWlkKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vXG4vLyBBUFBMSUNBVElPTiBIRVJFXG4vL1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9IZXJlIHdlcmUga2VlcCBhbiBleWUgb24gc29tZSBmb3JtIGVsZW1lbnRzIGFuZCByZXdyaXRlIHRoZSBuYW1lIGlmIHBlb3BsZVxuLy9oYXZlIHByb3ZpZGVkIGEgZmFzdGEgZm9ybWF0dGVkIHNlcVxubGV0IHNlcV9vYnNlcnZlciA9IHJhY3RpdmUub2JzZXJ2ZSgnc2VxdWVuY2UnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUgKSB7XG4gIGxldCByZWdleCA9IC9ePiguKz8pXFxzLztcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhuZXdWYWx1ZSk7XG4gIGlmKG1hdGNoKVxuICB7XG4gICAgdGhpcy5zZXQoJ25hbWUnLCBtYXRjaFsxXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgdGhpcy5zZXQoJ25hbWUnLCBudWxsKTtcbiAgLy8gfVxuXG4gIH0sXG4gIHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfSk7XG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIGpvYl90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuXG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzKTtcblxuICAgICAgfSk7XG4gICAgICBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnRXJyb3InIHx8IGJhdGNoLnN0YXRlID09PSAnQ3Jhc2gnKVxuICAgIHtcbiAgICAgIGxldCBzdWJtaXNzaW9uX21lc3NhZ2UgPSBiYXRjaC5zdWJtaXNzaW9uc1swXS5sYXN0X21lc3NhZ2U7XG4gICAgICBhbGVydChcIlBPTExJTkcgRVJST1I6IEpvYiBGYWlsZWRcXG5cIitcbiAgICAgICAgICAgIFwiUGxlYXNlIENvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWsgcXVvdGluZyB0aGlzIGVycm9yIG1lc3NhZ2UgYW5kIHlvdXIgam9iIElEXFxuXCIrc3VibWlzc2lvbl9tZXNzYWdlKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9LCA1MDAwKTtcblxufSx7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH1cbik7XG5cbi8vIE9uIGNsaWNraW5nIHRoZSBHZXQgWmlwIGZpbGUgbGluayB0aGlzIHdhdGNoZXJzIHByZXBhcmVzIHRoZSB6aXAgYW5kIGhhbmRzIGl0IHRvIHRoZSB1c2VyXG5yYWN0aXZlLm9uKCdnZXRfemlwJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgdXVpZCA9IHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgemlwLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCJ9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHNhdmVBcyhibG9iLCB1dWlkK1wiLnppcFwiKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBUaGVzZSByZWFjdCB0byB0aGUgaGVhZGVycyBiZWluZyBjbGlja2VkIHRvIHRvZ2dsZSB0aGUgcGFuZWxcbi8vXG5yYWN0aXZlLm9uKCAnc2VxdWVuY2VfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgICAgbGV0IHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIGlmKGpvYl9uYW1lID09PSAncHNpcHJlZCcpe3NldHRpbmcgPSB0cnVlO31cbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBzZXR0aW5nKTtcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICAgIHJhY3RpdmUuc2V0KCBqb2JfbmFtZSsnX2NoZWNrZWQnLCBmYWxzZSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnZG93bmxvYWRzX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHNob3dfcGFuZWwoMSwgcmFjdGl2ZSk7XG59KTtcblxuLy9yZWdpc3RlciBsaXN0ZW5lcnMgZm9yIGVhY2ggcmVzdWx0cyBwYW5lbFxuam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSwgaSl7XG4gIGNvbnNvbGUubG9nKFwiYWRkaW5nIGpvYnMgd2F0Y2hlcnNcIik7XG4gIHJhY3RpdmUub24oam9iX25hbWUrJ19hY3RpdmUnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICBzaG93X3BhbmVsKGkrMiwgcmFjdGl2ZSk7XG4gICAgaWYoam9iX25hbWUgPT09IFwicHNpcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JykpXG4gICAgICB7XG4gICAgICAgIGJpb2QzLnBzaXByZWQocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gXCJkaXNvcHJlZFwiKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAge1xuICAgICAgaWYocmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoJ2RvbXNlcmZfbW9kZWxfdXJpcycpO1xuICAgICAgICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1swXSwgJyNkb21zZXJmX21vZGVsJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufSk7XG5cbnJhY3RpdmUub24oICdzdWJtaXNzaW9uX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIGxldCBzdGF0ZSA9IHJhY3RpdmUuZ2V0KCdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJyk7XG4gIGlmKHN0YXRlID09PSAxKXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAwICk7XG4gIH1cbiAgZWxzZXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAxICk7XG4gIH1cbn0pO1xuXG4vL2dyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBtYWluIGZvcm0gYW5kIHNlbmQgdGhlIHNlcXVlbmNlIHRvIHRoZSBiYWNrZW5kXG5yYWN0aXZlLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBkYXRhJyk7XG4gIGxldCBzZXEgPSB0aGlzLmdldCgnc2VxdWVuY2UnKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL14+LiskL21nLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXFxufFxccy9nLFwiXCIpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHNlcSk7XG5cbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgbGV0IGNoZWNrX3N0YXRlcyA9IHt9O1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gIH0pO1xuICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIFJlc3VibWlzc2lvbiB3aWRnZXQsIHRydW5jYXRlIHRoZSBzZXF1ZW5jZVxuLy8gYW5kIHNlbmQgYSBuZXcgam9iXG5yYWN0aXZlLm9uKCdyZXN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdSZXN1Ym1pdHRpbmcgc2VnbWVudCcpO1xuICBsZXQgc3RhcnQgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0YXJ0XCIpO1xuICBsZXQgc3RvcCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RvcFwiKTtcbiAgbGV0IHNlcXVlbmNlID0gcmFjdGl2ZS5nZXQoXCJzZXF1ZW5jZVwiKTtcbiAgbGV0IHN1YnNlcXVlbmNlID0gc2VxdWVuY2Uuc3Vic3RyaW5nKHN0YXJ0LTEsIHN0b3ApO1xuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJykrXCJfc2VnXCI7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzdWJzZXF1ZW5jZSk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgbmFtZSk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICB9KTtcbiAgLy9jbGVhciB3aGF0IHdlIGhhdmUgcHJldmlvdXNseSB3cml0dGVuXG4gIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2NvbnNvbGUubG9nKG5hbWUpO1xuICAvL2NvbnNvbGUubG9nKGVtYWlsKTtcbiAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc3Vic2VxdWVuY2UsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcyk7XG4gIC8vd3JpdGUgbmV3IGFubm90YXRpb24gZGlhZ3JhbVxuICAvL3N1Ym1pdCBzdWJzZWN0aW9uXG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGdlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0YXBzaWNvdicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkaXNvcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZGlzb3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDUpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtcGFjaycpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3Bkb210aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXNlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2hzcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1lbWJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCAncHNpcHJlZCcpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb2RlbChhbG5VUkksIHR5cGUpIHtcblxuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBsZXQgbW9kX2tleSA9IHJhY3RpdmUuZ2V0KCdtb2RlbGxlcl9rZXknKTtcbiAgaWYobW9kX2tleSA9PT0gJ00nKydPJysnRCcrJ0UnKydMJysnSScrJ1InKydBJysnTicrJ0onKydFJylcbiAge1xuICAgIC8vYWxlcnQodHlwZSk7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/dHlwZT1cIit0eXBlK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9NjcwLGhlaWdodD03MDBcIik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgTScrJ08nKydEJysnRScrJ0wnKydMJysnRScrJ1IgTGljZW5jZSBLZXknKTtcbiAgfVxufVxuXG4vLyBTd2FwcyBvdXQgdGhlIGRvbXNlcmYgbW9kZWwgd2hlbiB0aG9zZSBidXR0b25zIGFyZSBjbGlja2VkXG5leHBvcnQgZnVuY3Rpb24gc3dhcERvbXNlcmYodXJpX251bWJlcilcbntcbiAgdXJpX251bWJlciA9IHVyaV9udW1iZXItMTtcbiAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gIGRpc3BsYXlfc3RydWN0dXJlKHBhdGhzW3VyaV9udW1iZXJdLCAnI2RvbXNlcmZfbW9kZWwnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICAvKnZlcmlmeSB0aGF0IGV2ZXJ5dGhpbmcgaGVyZSBpcyBvayovXG4gIGxldCBlcnJvcl9tZXNzYWdlPW51bGw7XG4gIGxldCBqb2Jfc3RyaW5nID0gJyc7XG4gIC8vZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9mb3JtKHNlcSwgbmFtZSwgZW1haWwsIFtwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkXSk7XG5cbiAgbGV0IGNoZWNrX2xpc3QgPSBbXTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfbGlzdC5wdXNoKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSk7XG4gIH0pO1xuICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG5cbiAgaWYoZXJyb3JfbWVzc2FnZS5sZW5ndGggPiAwKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Zvcm1fZXJyb3InLCBlcnJvcl9tZXNzYWdlKTtcbiAgICBhbGVydChcIkZPUk0gRVJST1I6XCIrZXJyb3JfbWVzc2FnZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9pbml0aWFsaXNlIHRoZSBwYWdlXG4gICAgbGV0IHJlc3BvbnNlID0gdHJ1ZTtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTtcbiAgICAvL1Bvc3QgdGhlIGpvYnMgYW5kIGludGlhbGlzZSB0aGUgYW5ub3RhdGlvbnMgZm9yIGVhY2ggam9iXG4gICAgLy9XZSBhbHNvIGRvbid0IHJlZHVuZGFudGx5IHNlbmQgZXh0cmEgcHNpcHJlZCBldGMuLiBqb2JzXG4gICAgLy9ieXQgZG9pbmcgdGhlc2UgdGVzdCBpbiBhIHNwZWNpZmljIG9yZGVyXG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KGpvYl9uYW1lK1wiLFwiKTtcbiAgICAgICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkaXNvcHJlZCcgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnZG9tcHJlZCcgfHwgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnIHx8IGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucHNpcHJlZF9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGdlbnRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZG9tdGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcyk7XG4gICAgLy9zZXQgdmlzaWJpbGl0eSBhbmQgcmVuZGVyIHBhbmVsIG9uY2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYl9saXN0Lmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGxldCBqb2JfbmFtZSA9IGpvYl9saXN0W2ldO1xuICAgICAgaWYoY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID09PSB0cnVlICYmIHJlc3BvbnNlIClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICAgIHJhY3RpdmUuZmlyZSggam9iX25hbWUrJ19hY3RpdmUnICk7XG4gICAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoISByZXNwb25zZSl7d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjt9XG4gIH1cbn1cblxuLy9UYWtlcyB0aGUgZm9ybSBlbGVtZW50cyBhbmQgY2hlY2tzIHRoZXkgYXJlIHZhbGlkXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5X2Zvcm0oc2VxLCBqb2JfbmFtZSwgZW1haWwsIGNoZWNrZWRfYXJyYXkpXG57XG4gIGxldCBlcnJvcl9tZXNzYWdlID0gXCJcIjtcbiAgaWYoISAvXltcXHgwMC1cXHg3Rl0rJC8udGVzdChqb2JfbmFtZSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiUGxlYXNlIHJlc3RyaWN0IEpvYiBOYW1lcyB0byB2YWxpZCBsZXR0ZXJzIG51bWJlcnMgYW5kIGJhc2ljIHB1bmN0dWF0aW9uPGJyIC8+XCI7XG4gIH1cblxuICAvKiBsZW5ndGggY2hlY2tzICovXG4gIGlmKHNlcS5sZW5ndGggPiAxNTAwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIGxvbmcgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG4gIGlmKHNlcS5sZW5ndGggPCAzMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBzaG9ydCB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cblxuICAvKiBudWNsZW90aWRlIGNoZWNrcyAqL1xuICBsZXQgbnVjbGVvdGlkZV9jb3VudCA9IChzZXEubWF0Y2goL0F8VHxDfEd8VXxOfGF8dHxjfGd8dXxuL2cpfHxbXSkubGVuZ3RoO1xuICBpZigobnVjbGVvdGlkZV9jb3VudC9zZXEubGVuZ3RoKSA+IDAuOTUpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBhcHBlYXJzIHRvIGJlIG51Y2xlb3RpZGUgc2VxdWVuY2UuIFRoaXMgc2VydmljZSByZXF1aXJlcyBwcm90ZWluIHNlcXVlbmNlIGFzIGlucHV0PGJyIC8+XCI7XG4gIH1cbiAgaWYoL1teQUNERUZHSElLTE1OUFFSU1RWV1lYXy1dKy9pLnRlc3Qoc2VxKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyczxiciAvPlwiO1xuICB9XG5cbiAgaWYoaXNJbkFycmF5KHRydWUsIGNoZWNrZWRfYXJyYXkpID09PSBmYWxzZSkge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIGFuYWx5c2lzIHByb2dyYW1cIjtcbiAgfVxuICByZXR1cm4oZXJyb3JfbWVzc2FnZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvZm9ybXMvZm9ybXNfaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9