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
  ractive.set('metapsicov_map', null);

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

    if (result_dict.name === 'plot_self_contact_map') {
      ractive.set("metapsicov_waiting_message", '');
      ractive.set("metapsicov_waiting_icon", '');
      ractive.set("metapsicov_time", '');
      downloads_info.metapsicov.map = '<a href="' + file_url + result_dict.data_path + '">Contact Map</a><br />';
      ractive.set('metapsicov_map', '<b>Contact Map</b><br /><img height="800" width="800" src="' + file_url + result_dict.data_path + '">');
    }
    if (result_dict.name === 'contact_predictors') {
      // let metapsicov_ev_regex = /\.evfold/;
      // let metapsicov_psicov_regex = /\.psicov/;
      // let metapsicov_ccmpred_regex = /\.ccmpred/;
      let ev_match = metapsicov_ev_regex.exec(result_dict.data_path);
      if (ev_match) {
        downloads_info.metapsicov.freecontact = '<a href="' + file_url + result_dict.data_path + '">FreeContact predictions</a><br />';
      }
      let ps_match = metapsicov_psicov_regex.exec(result_dict.data_path);
      if (ps_match) {
        downloads_info.metapsicov.psicov = '<a href="' + file_url + result_dict.data_path + '">PSICOV predictions</a><br />';
      }
      let cc_match = metapsicov_ccmpred_regex.exec(result_dict.data_path);
      if (cc_match) {
        downloads_info.metapsicov.ccmpred = '<a href="' + file_url + result_dict.data_path + '">CCMPRED predictions</a><br />';
      }
    }
    if (result_dict.name === 'metapsicov_stage2') {
      downloads_info.metapsicov.preds = '<a href="' + file_url + result_dict.data_path + '">Contact Predictions</a><br />';
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
  if ('metapsicov' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.metapsicov.header);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.preds);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.map);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.psicov);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.freecontact);
    downloads_string = downloads_string.concat(downloads_info.metapsicov.ccmpred);
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
  console.log(options_data);
  fd.append("psiblast_dompred_evalue", options_data.psiblast_dompred_evalue);
  fd.append("psiblast_dompred_iterations", options_data.psiblast_dompred_iterations);
  console.log(fd);
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
initialisation_data.dompred_checked = true;
initialisation_data.dompred_advanced = 1;
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

  let options_data = {};
  options_data.psiblast_dompred_evalue = document.getElementById("dompred_e_value_cutoff").value;
  options_data.psiblast_dompred_iterations = document.getElementById("dompred_psiblast_iterations").value;
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, seq, name, email, submit_url, times_url, check_states, job_list, job_names, options_data);
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
function verify_and_send_form(ractive, seq, name, email, submit_url, times_url, check_states, job_list, job_names, options_data) {
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
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["e" /* send_job */])(ractive, job_string, seq, name, email, submit_url, times_url, job_names, options_data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmU1OTNjNjEzNjMyYWRiNDVlYWEiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbW1vbi9jb21tb25faW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlX2ZmcHJlZHMiLCJyYWN0aXZlIiwiZmlsZSIsImxpbmVzIiwic3BsaXQiLCJicF9kYXRhIiwibWZfZGF0YSIsImNjX2RhdGEiLCJ0YWJsZV9kYXRhIiwiZm9yRWFjaCIsImxpbmUiLCJpIiwic3RhcnRzV2l0aCIsImVudHJpZXMiLCJsZW5ndGgiLCJwdXNoIiwiY2xhc3NfY29sb3VyIiwic2V0Iiwic2V0X2Fhbm9ybSIsImhBQV9ub3JtIiwiQSIsInZhbCIsInNkZSIsIlYiLCJZIiwiVyIsIlQiLCJTIiwiUCIsIkYiLCJNIiwiSyIsIkwiLCJJIiwiSCIsIkciLCJRIiwiRSIsIkMiLCJEIiwiTiIsIlIiLCJzZXRfZm5vcm0iLCJoRl9ub3JtIiwiaHlkcm9waG9iaWNpdHkiLCJjaGFyZ2UiLCJnZXRfYWFfY29sb3IiLCJhYl92YWwiLCJNYXRoIiwiYWJzIiwicGFyc2VfZmVhdGNmZyIsIlNGX2RhdGEiLCJBQV9kYXRhIiwiY29sdW1ucyIsImdsb2JhbF9mZWF0dXJlcyIsImdldCIsImZlYXRfdGFibGUiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZlYXR1cmVfbmFtZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiYWFfY29tcG9zaXRpb24iLCJhYV90YWJsZSIsInJlc2lkdWUiLCJnZXRfbWVtc2F0X3JhbmdlcyIsInJlZ2V4IiwiZGF0YSIsIm1hdGNoIiwiZXhlYyIsImluY2x1ZGVzIiwicmVnaW9ucyIsInJlZ2lvbiIsInBhcnNlSW50Iiwic2VnIiwicGFyc2Vfc3MyIiwiYW5ub3RhdGlvbnMiLCJzaGlmdCIsImZpbHRlciIsIkJvb2xlYW4iLCJzcyIsImJpb2QzIiwiYW5ub3RhdGlvbkdyaWQiLCJwYXJlbnQiLCJtYXJnaW5fc2NhbGVyIiwiZGVidWciLCJjb250YWluZXJfd2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhaW5lcl9oZWlnaHQiLCJhbGVydCIsInBhcnNlX3BiZGF0IiwiZGlzb3ByZWQiLCJwYXJzZV9jb21iIiwicHJlY2lzaW9uIiwicG9zIiwiZ2VuZXJpY3h5TGluZUNoYXJ0IiwiY2hhcnRUeXBlIiwieV9jdXRvZmYiLCJwYXJzZV9tZW1zYXRkYXRhIiwic2VxIiwidG9wb19yZWdpb25zIiwic2lnbmFsX3JlZ2lvbnMiLCJyZWVudHJhbnRfcmVnaW9ucyIsInRlcm1pbmFsIiwiY29pbF90eXBlIiwidG1wX2Fubm8iLCJBcnJheSIsInByZXZfZW5kIiwiZmlsbCIsImFubm8iLCJtZW1zYXQiLCJwYXJzZV9wcmVzdWx0IiwidHlwZSIsImFubl9saXN0IiwicHNldWRvX3RhYmxlIiwidGFibGVfaGl0IiwidG9Mb3dlckNhc2UiLCJwZGIiLCJzdWJzdHJpbmciLCJhbG4iLCJhbm4iLCJwYXJzZV9wYXJzZWRzIiwicHJlZGljdGlvbl9yZWdleCIsInByZWRpY3Rpb25fbWF0Y2giLCJkZXRhaWxzIiwicmVwbGFjZSIsInZhbHVlcyIsImluZGV4T2YiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJkb21wcmVkIiwic2hvd19wYW5lbCIsImNsZWFyX3NldHRpbmdzIiwiZ2Vhcl9zdHJpbmciLCJqb2JfbGlzdCIsImpvYl9uYW1lcyIsImpvYl9uYW1lIiwiY2xlYXJTZWxlY3Rpb24iLCJ6aXAiLCJKU1ppcCIsInByZXBhcmVfZG93bmxvYWRzX2h0bWwiLCJkb3dubG9hZHNfaW5mbyIsImhlYWRlciIsInBzaXByZWQiLCJtZW1zYXRzdm0iLCJwZ2VudGhyZWFkZXIiLCJiaW9zZXJmIiwicGRvbXRocmVhZGVyIiwiZG9tc2VyZiIsImZmcHJlZCIsImhhbmRsZV9yZXN1bHRzIiwiZmlsZV91cmwiLCJob3Jpel9yZWdleCIsInNzMl9yZWdleCIsInBuZ19yZWdleCIsIm1lbXNhdF9jYXJ0b29uX3JlZ2V4IiwibWVtc2F0X3NjaGVtYXRpY19yZWdleCIsIm1lbXNhdF9kYXRhX3JlZ2V4IiwibWVtcGFja19jYXJ0b29uX3JlZ2V4IiwibWVtcGFja19ncmFwaF9vdXQiLCJtZW1wYWNrX2NvbnRhY3RfcmVzIiwibWVtcGFja19saXBpZF9yZXMiLCJkb21zc2VhX3ByZWRfcmVnZXgiLCJkb21zc2VhX3JlZ2V4IiwiZG9tc2VyZl9yZWdleCIsImZmcHJlZF9zY2hfcmVnZXgiLCJmZnByZWRfc3ZtX3JlZ2V4IiwiZmZwcmVkX3NjaGVtYXRpY19yZWdleCIsImZmcHJlZF90bV9yZWdleCIsImZmcHJlZF9mZWF0Y2ZnX3JlZ2V4IiwiZmZwcmVkX3ByZWRzX3JlZ2V4IiwibWV0YXBzaWNvdl9ldl9yZWdleCIsIm1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4IiwibWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4IiwiaW1hZ2VfcmVnZXgiLCJyZXN1bHRzIiwiZG9tYWluX2NvdW50IiwibWVtcGFja19yZXN1bHRfZm91bmQiLCJkb21zZXJmX3Jlc3VsdF9mb3VuZCIsInJlZm9ybWF0X2RvbXNlcmZfbW9kZWxzX2ZvdW5kIiwicHNpcHJlZF9yZXN1bHRfZm91bmQiLCJwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kIiwicmVzdWx0X2RpY3QiLCJuYW1lIiwiYW5uX3NldCIsInRtcCIsImRhdGFfcGF0aCIsInBhdGgiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImlkIiwicHJvY2Vzc19maWxlIiwiaG9yaXoiLCJzczJfbWF0Y2giLCJzczIiLCJwYmRhdCIsImNvbWIiLCJzY2hlbWVfbWF0Y2giLCJzY2hlbWF0aWMiLCJjYXJ0b29uX21hdGNoIiwiY2FydG9vbiIsIm1lbXNhdF9tYXRjaCIsIm1lbXBhY2siLCJncmFwaF9tYXRjaCIsImdyYXBoX291dCIsImNvbnRhY3RfbWF0Y2giLCJjb250YWN0IiwibGlwaWRfbWF0Y2giLCJsaXBpZF9vdXQiLCJ0YWJsZSIsImdlbnRocmVhZGVyIiwiYWxpZ24iLCJwbmdfbWF0Y2giLCJib3VuZGFyeV9wbmciLCJib3VuZGFyeSIsInByZWRfbWF0Y2giLCJkb21zc2VhcHJlZCIsImRvbXNzZWFfbWF0Y2giLCJkb21zc2VhIiwibW9kZWwiLCJkaXNwbGF5X3N0cnVjdHVyZSIsImhoYmxpdHMiLCJwZGJhYSIsImNhdGhibGFzdCIsInBkYmJsYXN0IiwiZG9tc2VyZl9tYXRjaCIsImJ1dHRvbnNfdGFncyIsInBhdGhzIiwic2NoX21hdGNoIiwic2NoIiwiZmVhdF9tYXRjaCIsImZlYXR1cmVzIiwicHJlZHNfbWF0Y2giLCJwcmVkcyIsIm1ldGFwc2ljb3YiLCJtYXAiLCJldl9tYXRjaCIsImZyZWVjb250YWN0IiwicHNfbWF0Y2giLCJwc2ljb3YiLCJjY19tYXRjaCIsImNjbXByZWQiLCJ1cmkiLCJjc3NfaWQiLCJjYXJ0b29uX2NvbG9yIiwiYXRvbSIsImVsZW1lbnQiLCIkIiwiY29uZmlnIiwiYmFja2dyb3VuZENvbG9yIiwidmlld2VyIiwiJDNEbW9sIiwiY3JlYXRlVmlld2VyIiwiZ2V0X3RleHQiLCJhZGRNb2RlbCIsInNldFN0eWxlIiwiY29sb3JmdW5jIiwiem9vbVRvIiwicmVuZGVyIiwiem9vbSIsInNldF9kb3dubG9hZHNfcGFuZWwiLCJkb3dubG9hZHNfc3RyaW5nIiwiY29uY2F0Iiwic2VuZF9yZXF1ZXN0IiwidXJsIiwic2VuZF9kYXRhIiwicmVzcG9uc2UiLCJhamF4IiwiY2FjaGUiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwiYXN5bmMiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlSlNPTiIsInNlbmRfam9iIiwiZW1haWwiLCJzdWJtaXRfdXJsIiwidGltZXNfdXJsIiwib3B0aW9uc19kYXRhIiwiQmxvYiIsImUiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicHNpYmxhc3RfZG9tcHJlZF9ldmFsdWUiLCJwc2libGFzdF9kb21wcmVkX2l0ZXJhdGlvbnMiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJzdWJtaXNzaW9ucyIsImlucHV0X2ZpbGUiLCJqb2JzIiwic3VibWlzc2lvbiIsInNsaWNlIiwic3VibWlzc2lvbl9uYW1lIiwidXJsX3N0dWIiLCJjdGwiLCJwYXRoX2JpdHMiLCJmb2xkZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNJbkFycmF5IiwiYXJyYXkiLCJkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwiLCJyZXNpZHVlcyIsInJlcyIsImdldFVybFZhcnMiLCJ2YXJzIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJtIiwia2V5IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJpbXBvcnRhbnQiLCJzdHlsZSIsImdldEVtUGl4ZWxzIiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwiaG9zdG5hbWUiLCJpbml0aWFsaXNhdGlvbl9kYXRhIiwic2VxdWVuY2VfZm9ybV92aXNpYmxlIiwic3RydWN0dXJlX2Zvcm1fdmlzaWJsZSIsInJlc3VsdHNfdmlzaWJsZSIsInJlc3VsdHNfcGFuZWxfdmlzaWJsZSIsInN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUiLCJiaW9zZXJmX2FkdmFuY2VkIiwiZG9tc2VyZl9hZHZhbmNlZCIsImRvbXByZWRfYWR2YW5jZWQiLCJmZnByZWRfYWR2YW5jZWQiLCJtZXRzaXRlX2FkdmFuY2VkIiwiaHNwcmVkX2FkdmFuY2VkIiwibWVtZW1iYWRfYWR2YW5jZWQiLCJtb2RlbGxlcl9rZXkiLCJkb3dubG9hZF9saW5rcyIsInBzaXByZWRfaG9yaXoiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV9zY2hlbWF0aWMiLCJtZW1zYXRzdm1fY2FydG9vbiIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbl90YWJsZSIsImdlbl9hbm5fc2V0IiwicGFyc2Vkc19pbmZvIiwicGFyc2Vkc19wbmciLCJkZ2VuX3RhYmxlIiwiZGdlbl9hbm5fc2V0IiwiYmlvc2VyZl9tb2RlbCIsImRvbXNlcmZfYnV0dG9ucyIsImRvbXNlcmZfbW9kZWxfdXJpcyIsImZmcHJlZF9jYXJ0b29uIiwic2NoX3NjaGVtYXRpYyIsImZ1bmN0aW9uX3RhYmxlcyIsIm1ldGFwc2ljb3ZfbWFwIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV9kYXRhIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX2RhdGEiLCJzZXF1ZW5jZSIsInNlcXVlbmNlX2xlbmd0aCIsInN1YnNlcXVlbmNlX3N0YXJ0Iiwic3Vic2VxdWVuY2Vfc3RvcCIsImJhdGNoX3V1aWQiLCJkb21wcmVkX2NoZWNrZWQiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInV1aWRfcmVnZXgiLCJ1dWlkX21hdGNoIiwic2VxX29ic2VydmVyIiwib2JzZXJ2ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbml0IiwiZGVmZXIiLCJzZXFfbGVuZ3RoIiwic2VxX3N0YXJ0Iiwic2VxX3N0b3AiLCJqb2JfdHlwZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiYmF0Y2giLCJzdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJzdWJtaXNzaW9uX21lc3NhZ2UiLCJsYXN0X21lc3NhZ2UiLCJjb250ZXh0IiwiZ2VuZXJhdGVBc3luYyIsInRoZW4iLCJibG9iIiwic2F2ZUFzIiwiZXZlbnQiLCJhZHYiLCJzZXR0aW5nIiwidG9VcHBlckNhc2UiLCJjaGVja19zdGF0ZXMiLCJnZXRFbGVtZW50QnlJZCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwib3JpZ2luYWwiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0Iiwic3RvcCIsInN1YnNlcXVlbmNlIiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsInN3YXBEb21zZXJmIiwidXJpX251bWJlciIsImVycm9yX21lc3NhZ2UiLCJqb2Jfc3RyaW5nIiwiY2hlY2tfbGlzdCIsInZlcmlmeV9mb3JtIiwicHNpcHJlZF9jaGVja2VkIiwicGdlbnRocmVhZGVyX2NoZWNrZWQiLCJwZG9tdGhyZWFkZXJfY2hlY2tlZCIsImNoZWNrZWRfYXJyYXkiLCJ0ZXN0IiwibnVjbGVvdGlkZV9jb3VudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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O0FBRUQsUUFBRyxDQUFFNFEsUUFBTCxFQUFjO0FBQUNrRCxhQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QkYsT0FBT0MsUUFBUCxDQUFnQkMsSUFBdkM7QUFBNkM7QUFDN0Q7QUFDRjs7QUFFRDtBQUNPLFNBQVMrSCxXQUFULENBQXFCM1YsR0FBckIsRUFBMEJzQyxRQUExQixFQUFvQzhJLEtBQXBDLEVBQTJDMkssYUFBM0MsRUFDUDtBQUNFLE1BQUlQLGdCQUFnQixFQUFwQjtBQUNBLE1BQUcsQ0FBRSxpQkFBaUJRLElBQWpCLENBQXNCMVQsUUFBdEIsQ0FBTCxFQUNBO0FBQ0VrVCxvQkFBZ0JBLGdCQUFnQixnRkFBaEM7QUFDRDs7QUFFRDtBQUNBLE1BQUd4VixJQUFJdkYsTUFBSixHQUFhLElBQWhCLEVBQ0E7QUFDRSthLG9CQUFnQkEsZ0JBQWdCLDRDQUFoQztBQUNEO0FBQ0QsTUFBR3hWLElBQUl2RixNQUFKLEdBQWEsRUFBaEIsRUFDQTtBQUNFK2Esb0JBQWdCQSxnQkFBZ0IsNkNBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJUyxtQkFBbUIsQ0FBQ2pXLElBQUloQyxLQUFKLENBQVUsMEJBQVYsS0FBdUMsRUFBeEMsRUFBNEN2RCxNQUFuRTtBQUNBLE1BQUl3YixtQkFBaUJqVyxJQUFJdkYsTUFBdEIsR0FBZ0MsSUFBbkMsRUFDQTtBQUNFK2Esb0JBQWdCQSxnQkFBZ0Isd0dBQWhDO0FBQ0Q7QUFDRCxNQUFHLCtCQUErQlEsSUFBL0IsQ0FBb0NoVyxHQUFwQyxDQUFILEVBQ0E7QUFDRXdWLG9CQUFnQkEsZ0JBQWdCLGlEQUFoQztBQUNEOztBQUVELE1BQUcsaUdBQUF0SSxDQUFVLElBQVYsRUFBZ0I2SSxhQUFoQixNQUFtQyxLQUF0QyxFQUE2QztBQUMzQ1Asb0JBQWdCQSxnQkFBZ0IsK0NBQWhDO0FBQ0Q7QUFDRCxTQUFPQSxhQUFQO0FBQ0QsQyIsImZpbGUiOiJwc2lwcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZlNTkzYzYxMzYzMmFkYjQ1ZWFhIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZmcHJlZHMocmFjdGl2ZSwgZmlsZSl7XG5cbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBicF9kYXRhID0gW107XG4gIGxldCBtZl9kYXRhID0gW107XG4gIGxldCBjY19kYXRhID0gW107XG4gIGxldCB0YWJsZV9kYXRhID0gJyc7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgaWYobGluZS5zdGFydHNXaXRoKCcjJykpe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KCdcXHQnKTtcbiAgICBpZihlbnRyaWVzLmxlbmd0aCA8IDQpe3JldHVybjt9XG4gICAgaWYoZW50cmllc1szXSA9PT0gJ0JQJyl7YnBfZGF0YS5wdXNoKGVudHJpZXMpO31cbiAgICBpZihlbnRyaWVzWzNdID09PSAnQ0MnKXtjY19kYXRhLnB1c2goZW50cmllcyk7fVxuICAgIGlmKGVudHJpZXNbM10gPT09ICdNRicpe21mX2RhdGEucHVzaChlbnRyaWVzKTt9XG4gIH0pO1xuXG4gIHRhYmxlX2RhdGEgKz0gXCI8Yj5CaW9sb2dpY2FsIFByb2Nlc3MgUHJlZGljdGlvbnM8L2I+PGJyIC8+XCI7XG4gIHRhYmxlX2RhdGEgKz0gXCI8dGFibGU+PHRyPjx0aD5HTyB0ZXJtPC90aD48dGg+TmFtZTwvdGg+PHRoPlByb2I8L3RoPjx0aD5TVk0gUmVsaWFiaWxpdHk8L3RoPjwvdHI+XCI7XG4gIGJwX2RhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyaWVzLCBpKXtcbiAgICBsZXQgY2xhc3NfY29sb3VyID0gJ3NhZmUnO1xuICAgIGlmKGVudHJpZXNbMl09PT0nTCcpe2NsYXNzX2NvbG91ciA9ICdub3RzYWZlJzt9XG4gICAgdGFibGVfZGF0YSArPSAnPHRyIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1sxXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbNF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzBdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1syXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzwvdHI+JztcblxuICB9KTtcbiAgdGFibGVfZGF0YSArPSAnPC90YWJsZT48YnIgLz4nO1xuICByYWN0aXZlLnNldCgnZnVuY3Rpb25fdGFibGVzJywgdGFibGVfZGF0YSk7XG5cbiAgdGFibGVfZGF0YSArPSBcIjxiPk1vbGVjdWxhciBGdW5jdGlvbiBQcmVkaWN0aW9uczwvYj48YnIgLz5cIjtcbiAgdGFibGVfZGF0YSArPSBcIjx0YWJsZT48dHI+PHRoPkdPIHRlcm08L3RoPjx0aD5OYW1lPC90aD48dGg+UHJvYjwvdGg+PHRoPlNWTSBSZWxpYWJpbGl0eTwvdGg+PC90cj5cIjtcbiAgbWZfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJpZXMsIGkpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnc2FmZSc7XG4gICAgaWYoZW50cmllc1syXT09PSdMJyl7Y2xhc3NfY29sb3VyID0gJ25vdHNhZmUnO31cbiAgICB0YWJsZV9kYXRhICs9ICc8dHIgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzFdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1s0XSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMF0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzJdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPC90cj4nO1xuXG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxuICB0YWJsZV9kYXRhICs9IFwiPGI+Q2VsbHVsYXIgQ29tcG9uZW50IFByZWRpY3Rpb25zPC9iPjxiciAvPlwiO1xuICB0YWJsZV9kYXRhICs9IFwiPHRhYmxlPjx0cj48dGg+R08gdGVybTwvdGg+PHRoPk5hbWU8L3RoPjx0aD5Qcm9iPC90aD48dGg+U1ZNIFJlbGlhYmlsaXR5PC90aD48L3RyPlwiO1xuICBjY19kYXRhLmZvckVhY2goZnVuY3Rpb24oZW50cmllcywgaSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICdzYWZlJztcbiAgICBpZihlbnRyaWVzWzJdPT09J0wnKXtjbGFzc19jb2xvdXIgPSAnbm90c2FmZSc7fVxuICAgIHRhYmxlX2RhdGEgKz0gJzx0ciBjbGFzcz1cIicrY2xhc3NfY29sb3VyKydcIj4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMV0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8dGQ+JytlbnRyaWVzWzRdKyc8L3RkPic7XG4gICAgdGFibGVfZGF0YSArPSAnPHRkPicrZW50cmllc1swXSsnPC90ZD4nO1xuICAgIHRhYmxlX2RhdGEgKz0gJzx0ZD4nK2VudHJpZXNbMl0rJzwvdGQ+JztcbiAgICB0YWJsZV9kYXRhICs9ICc8L3RyPic7XG4gIH0pO1xuICB0YWJsZV9kYXRhICs9ICc8L3RhYmxlPjxiciAvPic7XG4gIHRhYmxlX2RhdGEgKz0gJ1RoZXNlIHByZWRpY3Rpb24gdGVybXMgcmVwcmVzZW50IHRlcm1zIHByZWRpY3RlZCB3aGVyZSBTVk0gdHJhaW5pbmcgaW5jbHVkZXMgYXNzaWduZWQgR08gdGVybXMgYWNyb3NzIGFsbCBldmlkZW5jZSBjb2RlIHR5cGVzLiBTVk0gcmVsaWFiaWxpdHkgaXMgcmVnYXJkZWQgYXMgSGlnaCAoSCkgd2hlbiBNQ0MsIHNlbnNpdGl2aXR5LCBzcGVjaWZpY2l0eSBhbmQgcHJlY2lzaW9uIGFyZSBqb2ludGx5IGFib3ZlIGEgZ2l2ZW4gdGhyZXNob2xkLiBvdGhlcndpc2UgUmVsaWFiaWxpdHkgaXMgaW5kaWNhdGVkIGFzIExvdyAoTCkuIDxiciAvPic7XG4gIHJhY3RpdmUuc2V0KCdmdW5jdGlvbl90YWJsZXMnLCB0YWJsZV9kYXRhKTtcblxufVxuXG5mdW5jdGlvbiBzZXRfYWFub3JtKCl7XG4gIGxldCBoQUFfbm9ybSA9IHt9O1xuICBoQUFfbm9ybS5BID0geyB2YWw6IDAuMDcxNzgzMjQ4MDA2MzA5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI3MzY3NjYxNTI0Mjc1fTtcbiAgaEFBX25vcm0uViA9IHsgdmFsOiAwLjA1OTYyNDU5NTM2OTkwMSxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDM3Nzc5MTUyODc0NX07XG4gIGhBQV9ub3JtLlkgPSB7IHZhbDogMC4wMjYwNzUwNjgyNDA0MzcsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTQ4MjI0NzE1MzEzNzl9O1xuICBoQUFfbm9ybS5XID0geyB2YWw6IDAuMDE0MTY2MDAyNjEyNzcxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDEwNDcxODM1ODAxOTk2fTtcbiAgaEFBX25vcm0uVCA9IHsgdmFsOiAwLjA1MjU5MzU4Mjk3MjcxNCxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDA5NDc5Mzk2NDU5N307XG4gIGhBQV9ub3JtLlMgPSB7IHZhbDogMC4wODIxMjMyNDEzMzIwOTksXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMjg2ODc1NjYwODE1MTJ9O1xuICBoQUFfbm9ybS5QID0geyB2YWw6IDAuMDY1NTU3NTMxMzIyMjQxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDM0MjM5Mzk4NDk2NzM2fTtcbiAgaEFBX25vcm0uRiA9IHsgdmFsOiAwLjAzNzEwMzk5NDk2OTAwMixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAxODU0MzQyMzEzOTE4Nn07XG4gIGhBQV9ub3JtLk0gPSB7IHZhbDogMC4wMjI1NjI4MTgxODM5NTUsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTEzMjEwMzk2NjI0ODF9O1xuICBoQUFfbm9ybS5LID0geyB2YWw6IDAuMDU0ODMzOTc5MjY5MTg1LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI5MjY0MDgzNjY3MTU3fTtcbiAgaEFBX25vcm0uTCA9IHsgdmFsOiAwLjEwMDEwNTkxNTc1OTA2LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMjc2ODA4NTE5MDA5fTtcbiAgaEFBX25vcm0uSSA9IHsgdmFsOiAwLjA0MjAzNDUyNjA0MDQ2NyxcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyNjg0OTI2MjQ5NX07XG4gIGhBQV9ub3JtLkggPSB7IHZhbDogMC4wMjcxNDE0MDM1Mzc1OTgsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTU1MDU2NjM3ODk4NX07XG4gIGhBQV9ub3JtLkcgPSB7IHZhbDogMC4wNjkxNzk4MjAxMDQ1MzYsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMzAwODc1NjIwNTczMjh9O1xuICBoQUFfbm9ybS5RID0geyB2YWw6IDAuMDY1OTIwNTYxOTMxODAxLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDMwMTAzMDkxMDA4MzY2fTtcbiAgaEFBX25vcm0uRSA9IHsgdmFsOiAwLjA0NjQ3ODQ2MjI1ODM4LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE5OTQ2MjY5NDYxNzM2fTtcbiAgaEFBX25vcm0uQyA9IHsgdmFsOiAwLjAyNDkwODU1MTg3MjA1NixcbiAgICAgICAgICAgICAgICAgc2RlOiAwLjAyMDgyMjkwOTU4OTUwNH07XG4gIGhBQV9ub3JtLkQgPSB7IHZhbDogMC4wNDQzMzc5MDQ3MjYwNDEsXG4gICAgICAgICAgICAgICAgIHNkZTogMC4wMTg0MzY2NzcyNTY3MjZ9O1xuICBoQUFfbm9ybS5OID0geyB2YWw6IDAuMDMzNTA3MDIwOTg3MDMzLFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDE2NTM2MDIyMjg4MjA0fTtcbiAgaEFBX25vcm0uUiA9IHsgdmFsOiAwLjA1OTc0MDQ2OTAzMTE5LFxuICAgICAgICAgICAgICAgICBzZGU6IDAuMDI1MTY1OTk0NzczMzg0fTtcbiAgcmV0dXJuKGhBQV9ub3JtKTtcbn1cblxuZnVuY3Rpb24gc2V0X2Zub3JtKCl7XG4gIGxldCBoRl9ub3JtID0ge307XG4gIGhGX25vcm0uaHlkcm9waG9iaWNpdHkgPSB7dmFsOiAtMC4zNDg3NjgyODA4MDE1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDAuNzU1NTkxNTI3Njk3OTl9O1xuICBoRl9ub3JtWydwZXJjZW50IHBvc2l0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS40NTc3MTc0NjY5NDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDMuNTY3MTMzMzQxMTM5fTtcbiAgaEZfbm9ybVsnYWxpcGhhdGljIGluZGV4J10gPSB7dmFsOiA3OS45MTE1NDkzMTkwOTksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMTYuNzg3NjE3OTc4ODI3fTtcbiAgaEZfbm9ybVsnaXNvZWxlY3RyaWMgcG9pbnQnXSA9IHt2YWw6IDcuNjEwMjA0NjM4MzYwMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDEuOTcxNjExMTAyMDA4OH07XG4gIGhGX25vcm1bJ21vbGVjdWxhciB3ZWlnaHQnXSA9IHt2YWw6IDQ4NjY4LjQxMjgzOTk2MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzc4MzguMzI0ODk1OTY5fTtcbiAgaEZfbm9ybS5jaGFyZ2UgPSB7dmFsOiA1LjA5OTE3NjMwNTc2MDQsXG4gICAgICAgICAgICAgICAgICAgIHNkZTogMTYuODM4NjM2NTkwMjV9O1xuICBoRl9ub3JtWydwZXJjZW50IG5lZ2F0aXZlIHJlc2lkdWVzJ10gPSB7dmFsOiAxMS4wMjYxOTAxMjgxNzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGU6IDQuMDIwNjYzMTY4MDkyNn07XG4gIGhGX25vcm1bJ21vbGFyIGV4dGluY3Rpb24gY29lZmZpY2llbnQnXSA9IHt2YWw6IDQ2NDc1LjI5MzkyMzkyNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkZTogMzkyOTkuMzk5ODQ4ODIzfTtcbiAgcmV0dXJuKGhGX25vcm0pO1xufVxuXG5mdW5jdGlvbiBnZXRfYWFfY29sb3IodmFsKXtcbiAgICBsZXQgYWJfdmFsID0gTWF0aC5hYnModmFsKTtcbiAgICBpZihhYl92YWwgPj0gMi45NiApe1xuICAgICAgICBpZih2YWwgPiAwKXtyZXR1cm4gXCJzaWduaWYxcFwiO31cbiAgICAgICAgcmV0dXJuIFwic2lnbmlmMW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZihhYl92YWwgPj0gMi4yNCl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjJwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYyblwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjk2ICl7XG4gICAgICAgIGlmKHZhbCA+IDApe3JldHVybiBcInNpZ25pZjVwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWY1blwiO1xuICAgIH1cbiAgICBlbHNlIGlmKGFiX3ZhbCA+PSAxLjY0NSApIHtcbiAgICAgICAgaWYodmFsID4gMCl7cmV0dXJuIFwic2lnbmlmMTBwXCI7fVxuICAgICAgICByZXR1cm4gXCJzaWduaWYxMG5cIjtcbiAgICB9XG4gICAgcmV0dXJuIFwicGxhaW5cIjtcbn1cblxuLy9wYXJzZSB0aGUgZmZwcmVkIGZlYXRjZm8gZmVhdHVyZXMgZmlsZVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2ZlYXRjZmcocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxldCBTRl9kYXRhID0ge307XG4gIGxldCBBQV9kYXRhID0ge307XG4gIGxldCBoRl9ub3JtID1zZXRfZm5vcm0oKTtcbiAgbGV0IGhBQV9ub3JtPXNldF9hYW5vcm0oKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICBpZihsaW5lLnN0YXJ0c1dpdGgoXCJBQVwiKSl7XG4gICAgICBsZXQgY29sdW1ucyA9IGxpbmUuc3BsaXQoJ1xcdCcpO1xuICAgICAgQUFfZGF0YVtjb2x1bW5zWzFdXSA9IGNvbHVtbnNbMl07XG4gICAgfVxuICAgIGlmKGxpbmUuc3RhcnRzV2l0aChcIlNGXCIpKVxuICAgIHtcbiAgICAgIGxldCBjb2x1bW5zID0gbGluZS5zcGxpdCgnXFx0Jyk7XG4gICAgICBTRl9kYXRhW2NvbHVtbnNbMV1dID0gY29sdW1uc1syXTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGJ1aWxkIGh0bWwgdGFibGVzIGZvciB0aGUgZmVhdHVyZSBkYXRhXG4gIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgbGV0IGdsb2JhbF9mZWF0dXJlcyA9IHJhY3RpdmUuZ2V0KCdnbG9iYWxfZmVhdHVyZXMnKTtcbiAgbGV0IGZlYXRfdGFibGUgPSAnPGI+R2xvYmFsIEZlYXR1cmVzPC9iPjxiciAvPic7XG4gIGZlYXRfdGFibGUgKz0gJ0dsb2JhbCBmZWF0dXJlcyBhcmUgY2FsY3VsYXRlZCBkaXJlY3RseSBmcm9tIHNlcXVlbmNlLiBMb2NhbGlzYXRpb24gdmFsdWVzIGFyZSBwcmVkaWN0ZWQgYnkgdGhlIFBzb3J0IGFsZ29yaXRobSBhbmQgcmVmbGVjdCB0aGUgcmVsYXRpdmUgbGlrZWxpaG9vZCBvZiB0aGUgcHJvdGVpbiBvY2N1cHlpbmcgZGlmZmVyZW50IGNlbGx1bGFyIGxvY2FsaXNhdGlvbnMuIFRoZSBiaWFzIGNvbHVtbiBpcyBoaWdobGlnaHRlZCBhY2NvcmRpbmcgdG8gdGhlIHNpZ25pZmljYW5jZSBvZiB0aGUgZmVhdHVyZSB2YWx1ZSBjYWxjdWxhdGVkIGZyb20gWiBzY29yZSBvZiB0aGUgZmVhdHVyZS48YnIgLz4nO1xuICBmZWF0X3RhYmxlICs9ICc8dGFibGU+PHRyPjx0aD5GZWF0dXJlIE5hbWU8L3RoPjx0aD5WYWx1ZTwvdGg+PHRoPkJpYXM8L3RoPjwvdHI+JztcblxuICBPYmplY3Qua2V5cyhTRl9kYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlX25hbWUpe1xuICAgIGxldCBjbGFzc19jb2xvdXIgPSAnJztcbiAgICBpZihmZWF0dXJlX25hbWUgaW4gaEZfbm9ybSl7XG4gICAgICBjbGFzc19jb2xvdXIgPSBnZXRfYWFfY29sb3IoIChwYXJzZUZsb2F0KFNGX2RhdGFbZmVhdHVyZV9uYW1lXSktaEZfbm9ybVtmZWF0dXJlX25hbWVdLnZhbCkgLyBoRl9ub3JtW2ZlYXR1cmVfbmFtZV0uc2RlKTtcbiAgICB9XG4gICAgZmVhdF90YWJsZSArPSAnPHRyPjx0ZD4nK2ZlYXR1cmVfbmFtZSsnPC90ZD48dGQ+JytwYXJzZUZsb2F0KFNGX2RhdGFbZmVhdHVyZV9uYW1lXSkudG9GaXhlZCgyKSsnPC90ZD48dGQgY2xhc3M9XCInK2NsYXNzX2NvbG91cisnXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD48L3RyPic7XG4gIH0pO1xuICBmZWF0X3RhYmxlICs9ICc8L3RhYmxlPic7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBmZWF0X3RhYmxlKTtcblxuICAvL2J1aWxkIGh0bWwgdGFibGUgZm9yIHRoZSBBQSBkYXRhXG4gIGxldCBhYV9jb21wb3NpdGlvbiA9IHJhY3RpdmUuZ2V0KCdhYV9jb21wb3NpdGlvbicpO1xuICBsZXQgYWFfdGFibGUgPSAnPGI+QW1pbm8gQWNpZCBDb21wb3NpdGlvbiAocGVyY2VudGFnZXMpPC9iPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8dGFibGU+PHRyPic7XG4gIE9iamVjdC5rZXlzKEFBX2RhdGEpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHJlc2lkdWUpe1xuICAgIGFhX3RhYmxlICs9ICc8dGg+JytyZXNpZHVlKyc8L3RoPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48dHI+JztcbiAgT2JqZWN0LmtleXMoQUFfZGF0YSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24ocmVzaWR1ZSl7XG4gICAgbGV0IGNsYXNzX2NvbG91ciA9ICcnO1xuICAgIGNsYXNzX2NvbG91ciA9IGdldF9hYV9jb2xvcigocGFyc2VGbG9hdChBQV9kYXRhW3Jlc2lkdWVdKS1oQUFfbm9ybVtyZXNpZHVlXS52YWwpIC8gaEFBX25vcm1bcmVzaWR1ZV0uc2RlKTtcbiAgICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwiJytjbGFzc19jb2xvdXIrJ1wiPicrKHBhcnNlRmxvYXQoQUFfZGF0YVtyZXNpZHVlXSkqMTAwKS50b0ZpeGVkKDIpKyc8L3RkPic7XG4gIH0pO1xuICBhYV90YWJsZSArPSAnPC90cj48L3RhYmxlPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8Yj5TaWduaWZpY2FuY2UgS2V5PC9iPjxiciAvPic7XG4gIGFhX3RhYmxlICs9ICc8dGFibGUgY2xhc3M9XCJzaWduaWZrZXlcIiBhbGlnbj1cImNlbnRlclwiIGNlbGxwYWRkaW5nPVwiMlwiIGNlbGxzcGFjaW5nPVwiMFwiPic7XG4gIGFhX3RhYmxlICs9ICc8dHI+JztcbiAgYWFfdGFibGUgKz0gJzx0ZD48Yj5sb3c8L2I+PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCI5XCI+Jm5ic3A7PC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGFsaWduPVwicmlnaHRcIj48Yj5oaWdoPC9iPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjFuXCI+cCAmbHQ7IDAuMDE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYyblwiPnAgJmx0OyAwLjAyPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNW5cIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjEwblwiPnAgJmx0OyAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQ+cCAmZ3Q7PSAwLjE8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxMHBcIj5wICZsdDsgMC4xPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNsYXNzPVwic2lnbmlmNXBcIj5wICZsdDsgMC4wNTwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzx0ZCBjbGFzcz1cInNpZ25pZjJwXCI+cCAmbHQ7IDAuMDI8L3RkPic7XG4gIGFhX3RhYmxlICs9ICc8dGQgY2xhc3M9XCJzaWduaWYxcFwiPnAgJmx0OyAwLjAxPC90ZD4nO1xuICBhYV90YWJsZSArPSAnPHRkPjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzx0cj4nO1xuICBhYV90YWJsZSArPSAnPHRkIGNvbHNwYW49XCIxMVwiPlNpZ25pZmljYW5jZSBwIHZhbHVlIGlzIGNhbGN1bGF0ZWQgdXNpbmcgdGhlIFogc2NvcmUgb2YgdGhlIHBlcmNlbnQgYW1pbm8gYWNpZCBjb21wb3NpdGlvbjwvdGQ+JztcbiAgYWFfdGFibGUgKz0gJzwvdHI+JztcbiAgYWFfdGFibGUgKz0gJzwvdGFibGU+JztcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgYWFfdGFibGUpO1xufVxuXG5cbi8vIGZvciBhIGdpdmVuIG1lbXNhdCBkYXRhIGZpbGVzIGV4dHJhY3QgY29vcmRpbmF0ZSByYW5nZXMgZ2l2ZW4gc29tZSByZWdleFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9tZW1zYXRfcmFuZ2VzKHJlZ2V4LCBkYXRhKVxue1xuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZGF0YSk7XG4gICAgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJywnKSlcbiAgICB7XG4gICAgICBsZXQgcmVnaW9ucyA9IG1hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICByZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uLCBpKXtcbiAgICAgICAgcmVnaW9uc1tpXSA9IHJlZ2lvbi5zcGxpdCgnLScpO1xuICAgICAgICByZWdpb25zW2ldWzBdID0gcGFyc2VJbnQocmVnaW9uc1tpXVswXSk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMV0gPSBwYXJzZUludChyZWdpb25zW2ldWzFdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCctJykpXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaFsxXSk7XG4gICAgICAgIGxldCBzZWcgPSBtYXRjaFsxXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcmVnaW9ucyA9IFtbXSwgXTtcbiAgICAgICAgcmVnaW9uc1swXVswXSA9IHBhcnNlSW50KHNlZ1swXSk7XG4gICAgICAgIHJlZ2lvbnNbMF1bMV0gPSBwYXJzZUludChzZWdbMV0pO1xuICAgICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIHJldHVybihtYXRjaFsxXSk7XG59XG5cbi8vIHRha2UgYW5kIHNzMiAoZmlsZSkgYW5kIHBhcnNlIHRoZSBkZXRhaWxzIGFuZCB3cml0ZSB0aGUgbmV3IGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgYW5ub3RhdGlvbnNbaV0uc3MgPSBlbnRyaWVzWzNdO1xuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgYWxlcnQoXCJTUzIgYW5ub3RhdGlvbiBsZW5ndGggZG9lcyBub3QgbWF0Y2ggcXVlcnkgc2VxdWVuY2VcIik7XG4gICAgfVxuICAgIHJldHVybihhbm5vdGF0aW9ucyk7XG59XG5cbi8vdGFrZSB0aGUgZGlzb3ByZWQgcGJkYXQgZmlsZSwgcGFyc2UgaXQgYW5kIGFkZCB0aGUgYW5ub3RhdGlvbnMgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BiZGF0KHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnLScpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ0QnO31cbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJ14nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdQQic7fVxuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbn1cblxuLy9wYXJzZSB0aGUgZGlzb3ByZWQgY29tYiBmaWxlIGFuZCBhZGQgaXQgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWNpc2lvbiA9IFtdO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgcHJlY2lzaW9uW2ldID0ge307XG4gICAgcHJlY2lzaW9uW2ldLnBvcyA9IGVudHJpZXNbMV07XG4gICAgcHJlY2lzaW9uW2ldLnByZWNpc2lvbiA9IGVudHJpZXNbNF07XG4gIH0pO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nLCBwcmVjaXNpb24pO1xuICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocHJlY2lzaW9uLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbi8vcGFyc2UgdGhlIG1lbXNhdCBvdXRwdXRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZW1zYXRkYXRhKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIC8vY29uc29sZS5sb2coZmlsZSk7XG4gIGxldCB0b3BvX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvVG9wb2xvZ3k6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCBzaWduYWxfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9TaWduYWxcXHNwZXB0aWRlOlxccysoLispXFxuLywgZmlsZSk7XG4gIGxldCByZWVudHJhbnRfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9SZS1lbnRyYW50XFxzaGVsaWNlczpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHRlcm1pbmFsID0gZ2V0X21lbXNhdF9yYW5nZXMoL04tdGVybWluYWw6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIC8vY29uc29sZS5sb2coc2lnbmFsX3JlZ2lvbnMpO1xuICAvLyBjb25zb2xlLmxvZyhyZWVudHJhbnRfcmVnaW9ucyk7XG4gIGxldCBjb2lsX3R5cGUgPSAnQ1knO1xuICBpZih0ZXJtaW5hbCA9PT0gJ291dCcpXG4gIHtcbiAgICBjb2lsX3R5cGUgPSAnRUMnO1xuICB9XG4gIGxldCB0bXBfYW5ubyA9IG5ldyBBcnJheShzZXEubGVuZ3RoKTtcbiAgaWYodG9wb19yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpXG4gIHtcbiAgICBsZXQgcHJldl9lbmQgPSAwO1xuICAgIHRvcG9fcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1RNJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgICBpZihwcmV2X2VuZCA+IDApe3ByZXZfZW5kIC09IDE7fVxuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQsIHJlZ2lvblswXSk7XG4gICAgICBpZihjb2lsX3R5cGUgPT09ICdFQycpeyBjb2lsX3R5cGUgPSAnQ1knO31lbHNle2NvaWxfdHlwZSA9ICdFQyc7fVxuICAgICAgcHJldl9lbmQgPSByZWdpb25bMV0rMjtcbiAgICB9KTtcbiAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZC0xLCBzZXEubGVuZ3RoKTtcblxuICB9XG4gIC8vc2lnbmFsX3JlZ2lvbnMgPSBbWzcwLDgzXSwgWzEwMiwxMTddXTtcbiAgaWYoc2lnbmFsX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgc2lnbmFsX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdTJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgLy9yZWVudHJhbnRfcmVnaW9ucyA9IFtbNDAsNTBdLCBbMjAwLDIxOF1dO1xuICBpZihyZWVudHJhbnRfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICByZWVudHJhbnRfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1JIJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgdG1wX2Fubm8uZm9yRWFjaChmdW5jdGlvbihhbm5vLCBpKXtcbiAgICBhbm5vdGF0aW9uc1tpXS5tZW1zYXQgPSBhbm5vO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsIHR5cGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAvL2NvbnNvbGUubG9nKHR5cGUrJ19hbm5fc2V0Jyk7XG4gIGxldCBhbm5fbGlzdCA9IHJhY3RpdmUuZ2V0KHR5cGUrJ19hbm5fc2V0Jyk7XG4gIC8vY29uc29sZS5sb2coYW5uX2xpc3QpO1xuICBpZihPYmplY3Qua2V5cyhhbm5fbGlzdCkubGVuZ3RoID4gMCl7XG4gIGxldCBwc2V1ZG9fdGFibGUgPSAnPHRhYmxlIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPlxcbic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRyPjx0aD5Db25mLjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TmV0IFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5wLXZhbHVlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QYWlyRTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U29sdkU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIExlbmd0aDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+VGFyZ2V0IExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+UXVlcnkgTGVuPC90aD4nO1xuICBpZih0eXBlID09PSAnZGdlbicpe1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlJlZ2lvbiBTdGFydDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5SZWdpb24gRW5kPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPkNBVEggRG9tYWluPC90aD4nO1xuICAgIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBTQ09QPC90aD4nO1xuICB9ZWxzZSB7XG4gICAgcHNldWRvX3RhYmxlICs9ICc8dGg+Rm9sZDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggU0NPUDwvdGg+JztcbiAgICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5TRUFSQ0ggQ0FUSDwvdGg+JztcbiAgfVxuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QREJTVU08L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsaWdubWVudDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TU9ERUw8L3RoPic7XG5cbiAgLy8gaWYgTU9ERUxMRVIgVEhJTkdZXG4gIHBzZXVkb190YWJsZSArPSAnPC90cj48dGJvZHlcIj5cXG4nO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIC8vY29uc29sZS5sb2cobGluZSk7XG4gICAgaWYobGluZS5sZW5ndGggPT09IDApe3JldHVybjt9XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgbGV0IHRhYmxlX2hpdCA9IGVudHJpZXNbOV07XG4gICAgaWYodHlwZSA9PT0gJ2RnZW4nKXsgdGFibGVfaGl0ID0gZW50cmllc1sxMV07fVxuICAgIGlmKHRhYmxlX2hpdCtcIl9cIitpIGluIGFubl9saXN0KVxuICAgIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkIGNsYXNzPSdcIitlbnRyaWVzWzBdLnRvTG93ZXJDYXNlKCkrXCInPlwiK2VudHJpZXNbMF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzFdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1syXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbM10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzRdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s1XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzddK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s4XStcIjwvdGQ+XCI7XG4gICAgbGV0IHBkYiA9IGVudHJpZXNbOV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbOV0ubGVuZ3RoLTIpO1xuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7IHBkYiA9IGVudHJpZXNbMTFdLnN1YnN0cmluZygwLCBlbnRyaWVzWzExXS5sZW5ndGgtMyk7fVxuICAgIGlmKHR5cGUgPT09ICdkZ2VuJyl7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s5XStcIjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxMF0rXCI8L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vd3d3LmNhdGhkYi5pbmZvL3ZlcnNpb24vbGF0ZXN0L2RvbWFpbi9cIit0YWJsZV9oaXQrXCInPlwiK3RhYmxlX2hpdCtcIjwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuIFBEQlNVTTwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQubG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKHRhYmxlX2hpdCtcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J0Rpc3BsYXkgQWxpZ25tZW50JyAvPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5idWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLCBcXFwiY2F0aF9tb2RlbGxlclxcXCIpOycgdmFsdWU9J0J1aWxkIE1vZGVsJyAvPjwvdGQ+XCI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vd3d3LnJjc2Iub3JnL3BkYi9leHBsb3JlL2V4cGxvcmUuZG8/c3RydWN0dXJlSWQ9XCIrcGRiK1wiJz5cIit0YWJsZV9oaXQrXCI8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3Njb3AubXJjLWxtYi5jYW0uYWMudWsvc2NvcC9wZGIuY2dpP3BkYj1cIitwZGIrXCInPlNDT1AgU0VBUkNIPC9hPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vcGRiL1wiK3BkYitcIic+Q0FUSCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuIFBEQlNVTTwvYT48L3RkPlwiO1xuICAgICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J3BzaXByZWQubG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W3RhYmxlX2hpdCtcIl9cIitpXS5hbm4pK1wiXFxcIixcXFwiXCIrKHRhYmxlX2hpdCtcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J0Rpc3BsYXkgQWxpZ25tZW50JyAvPjwvdGQ+XCI7XG4gICAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0ncHNpcHJlZC5idWlsZE1vZGVsKFxcXCJcIisoYW5uX2xpc3RbdGFibGVfaGl0K1wiX1wiK2ldLmFsbikrXCJcXFwiLCBcXFwicGRiX21vZGVsbGVyXFxcIik7JyB2YWx1ZT0nQnVpbGQgTW9kZWwnIC8+PC90ZD5cIjtcbiAgICB9XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPC90cj5cXG5cIjtcbiAgICB9XG4gIH0pO1xuICBwc2V1ZG9fdGFibGUgKz0gXCI8L3Rib2R5PjwvdGFibGU+XFxuXCI7XG4gIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgcHNldWRvX3RhYmxlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAgIHJhY3RpdmUuc2V0KHR5cGUrXCJfdGFibGVcIiwgXCI8aDM+Tm8gZ29vZCBoaXRzIGZvdW5kLiBHVUVTUyBhbmQgTE9XIGNvbmZpZGVuY2UgaGl0cyBjYW4gYmUgZm91bmQgaW4gdGhlIHJlc3VsdHMgZmlsZTwvaDM+XCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYXJzZWRzKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVkaWN0aW9uX3JlZ2V4ID0gL0RvbWFpblxcc0JvdW5kYXJ5XFxzbG9jYXRpb25zXFxzcHJlZGljdGVkXFxzRFBTOlxccyguKykvO1xuICBsZXQgcHJlZGljdGlvbl9tYXRjaCA9ICBwcmVkaWN0aW9uX3JlZ2V4LmV4ZWMoZmlsZSk7XG4gIGlmKHByZWRpY3Rpb25fbWF0Y2gpXG4gIHtcbiAgICBsZXQgZGV0YWlscyA9IGZpbGUucmVwbGFjZShcIlxcblwiLFwiPGJyIC8+XCIpO1xuICAgIGRldGFpbHMgPSBkZXRhaWxzLnJlcGxhY2UoXCJcXG5cIixcIjxiciAvPlwiKTtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIjxoND5cIitkZXRhaWxzK1wiPC9oND5cIik7XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGlmKHByZWRpY3Rpb25fbWF0Y2hbMV0uaW5kZXhPZihcIixcIikpXG4gICAge1xuICAgICAgdmFsdWVzID0gcHJlZGljdGlvbl9tYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGkpe1xuICAgICAgICB2YWx1ZXNbaV0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHZhbHVlc1swXSA9IHBhcnNlSW50KHByZWRpY3Rpb25fbWF0Y2hbMV0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGFubm90YXRpb25zW3ZhbHVlXS5kb21wcmVkID0gJ0InO1xuICAgIH0pO1xuICAgIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBhcnNlZHNfaW5mb1wiLCBcIk5vIFBhcnNlRFMgRG9tYWluIGJvdW5kYXJpZXMgcHJlZGljdGVkXCIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzIiwiaW1wb3J0IHsgcHJvY2Vzc19maWxlIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3RleHQgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93X3BhbmVsKHZhbHVlLCByYWN0aXZlKVxue1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCB2YWx1ZSApO1xufVxuXG4vL2JlZm9yZSBhIHJlc3VibWlzc2lvbiBpcyBzZW50IGFsbCB2YXJpYWJsZXMgYXJlIHJlc2V0IHRvIHRoZSBwYWdlIGRlZmF1bHRzXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMpe1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMik7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCgnZG93bmxvYWRfbGlua3MnLCAnJyk7XG4gIGpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciAnK2pvYl9uYW1lc1tqb2JfbmFtZV0rJyBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ193YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfaG9yaXonLG51bGwpO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW5fdGFibGUnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3NldCcsIHt9KTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl90YWJsZScsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdwYXJzZWRzX2luZm8nLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ3BhcnNlZHNfcG5nJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX3RhYmxlJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkZ2VuX2Fubl9zZXQnLCB7fSk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX21vZGVsJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbnMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX21vZGVsX3VyaXM6JywgW10pO1xuICByYWN0aXZlLnNldCgnc2NoX3NjaGVtYXRpYzonLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2FhX2NvbXBvc2l0aW9uJywgbnVsbCk7XG4gIHJhY3RpdmUuc2V0KCdnbG9iYWxfZmVhdHVyZXMnLCBudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Z1bmN0aW9uX3RhYmxlcycsIG51bGwpO1xuICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCBudWxsKTtcblxuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKVxue1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBpZihkYXRhLmpvYl9uYW1lID09PSBqb2JfbmFtZSlcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mb1tqb2JfbmFtZV0gPSB7fTtcbiAgICAgIGRvd25sb2Fkc19pbmZvW2pvYl9uYW1lXS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXNbam9iX25hbWVdK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAvL0VYVFJBIFBBTkVMUyBGT1IgU09NRSBKT0JTIFRZUEVTOlxuICAgICAgaWYoam9iX25hbWUgPT09ICdwZ2VudGhyZWFkZXInIHx8IGpvYl9uYW1lID09PSAnZG9tcHJlZCcgIHx8XG4gICAgICAgICBqb2JfbmFtZSA9PT0gJ3Bkb210aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdtZXRhcHNpY292JyB8fFxuICAgICAgICAgam9iX25hbWUgPT09ICdmZnByZWQnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgIH1cbiAgICAgIGlmKGpvYl9uYW1lID09PSAnbWVtcGFjaycpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5cIitqb2JfbmFtZXMubWVtc2F0c3ZtK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5iaW9zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLnBzaXByZWQrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrXCIgRE9XTkxPQURTPC9oNT5cIjtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZiA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlciA9IFwiPGg1PlwiK2pvYl9uYW1lcy5kb21zZXJmK1wiIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICB9XG4gICAgICBpZihqb2JfbmFtZSA9PT0gJ2ZmcHJlZCcpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bSA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLm1lbXNhdHN2bStcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5oZWFkZXIgPSBcIjxoNT5Eb21QcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZCA9IHt9O1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyID0gXCI8aDU+XCIram9iX25hbWVzLmZmcHJlZCtcIiBET1dOTE9BRFM8L2g1PlwiO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vdGFrZSB0aGUgZGF0YWJsb2Igd2UndmUgZ290IGFuZCBsb29wIG92ZXIgdGhlIHJlc3VsdHNcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzKVxue1xuICBsZXQgaG9yaXpfcmVnZXggPSAvXFwuaG9yaXokLztcbiAgbGV0IHNzMl9yZWdleCA9IC9cXC5zczIkLztcbiAgbGV0IHBuZ19yZWdleCA9IC9cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9jYXJ0b29uX3JlZ2V4ID0gL19jYXJ0b29uX21lbXNhdF9zdm1cXC5wbmckLztcbiAgbGV0IG1lbXNhdF9zY2hlbWF0aWNfcmVnZXggPSAvX3NjaGVtYXRpY1xcLnBuZyQvO1xuICBsZXQgbWVtc2F0X2RhdGFfcmVnZXggPSAvbWVtc2F0X3N2bSQvO1xuICBsZXQgbWVtcGFja19jYXJ0b29uX3JlZ2V4ID0gL0thbWFkYS1LYXdhaV9cXGQrLnBuZyQvO1xuICBsZXQgbWVtcGFja19ncmFwaF9vdXQgPSAvaW5wdXRfZ3JhcGgub3V0JC87XG4gIGxldCBtZW1wYWNrX2NvbnRhY3RfcmVzID0gL0NPTlRBQ1RfREVGMS5yZXN1bHRzJC87XG4gIGxldCBtZW1wYWNrX2xpcGlkX3JlcyA9IC9MSVBJRF9FWFBPU1VSRS5yZXN1bHRzJC87XG4gIGxldCBkb21zc2VhX3ByZWRfcmVnZXggPSAvXFwucHJlZCQvO1xuICBsZXQgZG9tc3NlYV9yZWdleCA9IC9cXC5kb21zc2VhJC87XG4gIGxldCBkb21zZXJmX3JlZ2V4ID0gLy4rXyhcXGQrKV8oXFxkKykuKlxcLnBkYi87XG4gIGxldCBmZnByZWRfc2NoX3JlZ2V4ID0gLy4rX3NjaFxcLnBuZy87XG4gIGxldCBmZnByZWRfc3ZtX3JlZ2V4ID0gLy4rX2NhcnRvb25fbWVtc2F0X3N2bV8uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfc2NoZW1hdGljX3JlZ2V4ID0gLy4rX3NjaGVtYXRpY18uKlxcLnBuZy87XG4gIGxldCBmZnByZWRfdG1fcmVnZXggPSAvLitfdG1wXFwucG5nLztcbiAgbGV0IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4ID0gL1xcLmZlYXRjZmcvO1xuICBsZXQgZmZwcmVkX3ByZWRzX3JlZ2V4ID0gL1xcLmZ1bGxfcmF3LztcbiAgbGV0IG1ldGFwc2ljb3ZfZXZfcmVnZXggPSAvXFwuZXZmb2xkLztcbiAgbGV0IG1ldGFwc2ljb3ZfcHNpY292X3JlZ2V4ID0gL1xcLnBzaWNvdi87XG4gIGxldCBtZXRhcHNpY292X2NjbXByZWRfcmVnZXggPSAvXFwuY2NtcHJlZC87XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBsZXQgZG9tYWluX2NvdW50ID0gMDtcbiAgbGV0IG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBkb21zZXJmX3Jlc3VsdF9mb3VuZCA9IGZhbHNlO1xuICBsZXQgcmVmb3JtYXRfZG9tc2VyZl9tb2RlbHNfZm91bmQgPSBmYWxzZTtcbiAgbGV0IHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIGxldCBwZG9tdGhyZWFkZXJfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG4gIC8vUHJlcGF0b3J5IGxvb3AgZm9yIGluZm9ybWF0aW9uIHRoYXQgaXMgbmVlZGVkIGJlZm9yZSByZXN1bHRzIHBhcnNpbmc6XG4gIGZvcihsZXQgaSBpbiByZXN1bHRzKVxuICB7XG4gICAgbGV0IHJlc3VsdF9kaWN0ID0gcmVzdWx0c1tpXTtcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnR2VuQWxpZ25tZW50QW5ub3RhdGlvbicpXG4gICAge1xuICAgICAgICBsZXQgYW5uX3NldCA9IHJhY3RpdmUuZ2V0KFwicGdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW5fZ2VuYWxpZ25tZW50X2Fubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcImdlbl9hbm5fc2V0XCIpO1xuICAgICAgICBsZXQgdG1wID0gcmVzdWx0X2RpY3QuZGF0YV9wYXRoO1xuICAgICAgICBsZXQgcGF0aCA9IHRtcC5zdWJzdHIoMCwgdG1wLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICAgIGxldCBpZCA9IHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoXCIuXCIpKzEsIHBhdGgubGVuZ3RoKTtcbiAgICAgICAgYW5uX3NldFtpZF0gPSB7fTtcbiAgICAgICAgYW5uX3NldFtpZF0uYW5uID0gcGF0aCtcIi5hbm5cIjtcbiAgICAgICAgYW5uX3NldFtpZF0uYWxuID0gcGF0aCtcIi5hbG5cIjtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb25fZG9tJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJkZ2VuX2Fubl9zZXRcIik7XG4gICAgICAgIGxldCB0bXAgPSByZXN1bHRfZGljdC5kYXRhX3BhdGg7XG4gICAgICAgIGxldCBwYXRoID0gdG1wLnN1YnN0cigwLCB0bXAubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgbGV0IGlkID0gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihcIi5cIikrMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgICBhbm5fc2V0W2lkXSA9IHt9O1xuICAgICAgICBhbm5fc2V0W2lkXS5hbm4gPSBwYXRoK1wiLmFublwiO1xuICAgICAgICBhbm5fc2V0W2lkXS5hbG4gPSBwYXRoK1wiLmFsblwiO1xuICAgICAgICByYWN0aXZlLnNldChcImRnZW5fYW5uX3NldFwiLCBhbm5fc2V0KTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gIC8vbWFpbiByZXN1bHRzIHBhcnNpbmcgbG9vcFxuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgLy9wc2lwcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PSAncHNpcGFzczInKVxuICAgIHtcbiAgICAgIHBzaXByZWRfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG5cbiAgICAgIH1cbiAgICAgIGxldCBzczJfbWF0Y2ggPSBzczJfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc3MyX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLnNzMiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNTMiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnc3MyJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9kaXNvcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2Zvcm1hdCcpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdwYmRhdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBCREFUIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfdGltZVwiLCAnJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdkaXNvX2NvbWJpbmUnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnY29tYicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5jb21iID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q09NQiBOTiBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL21lbXNhdCBhbmQgbWVtcGFjayBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1zYXRzdm0nKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoZW1lX21hdGNoID0gbWVtc2F0X3NjaGVtYXRpY19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hlbWVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNjaGVtYXRpYyBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9IG1lbXNhdF9jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9jYXJ0b29uJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbWVtc2F0X21hdGNoID0gbWVtc2F0X2RhdGFfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobWVtc2F0X21hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWVtc2F0ZGF0YScsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICAvL21lbXBhY2sgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtcGFja193cmFwcGVyJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5EaWFncmFtIERhdGE8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWN0X21hdGNoID0gIG1lbXBhY2tfY29udGFjdF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY29udGFjdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9nZW50aHJlYWRlciBhbmQgcGdlbnRocmVhZGVyXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX3NvcnRfcHJlc3VsdHMnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2dlbl9wcmVzdWx0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMuZ2VudGhyZWFkZXIrJyBUYWJsZTwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGdlbnRocmVhZGVyKycgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAncHNldWRvX2Jhc19tb2RlbHMnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPicram9iX25hbWVzLnBnZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VudGhyZWFkZXJfcHNldWRvX2Jhc19hbGlnbicpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICd6aXAnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5nZW50aHJlYWRlcisnIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG5cbiAgICAvL3Bkb210aHJlYWRlclxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzdm1fcHJvYl9kb20nKVxuICAgIHtcbiAgICAgIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZG9tX3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Jytqb2JfbmFtZXMucGRvbXRocmVhZGVyKycgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfZG9tX2FsaWduJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nK2pvYl9uYW1lcy5wZG9tdGhyZWFkZXIrJyBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIC8vZG9tcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwYXJzZWRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImRvbXByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZG9tcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkb21wcmVkX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IHBuZ19tYXRjaCA9IHBuZ19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihwbmdfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmRvbXByZWQuYm91bmRhcnlfcG5nID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwYXJzZWRzX3BuZycsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmJvdW5kYXJ5ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Qm91bmRhcnkgZmlsZTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BhcnNlZHMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZG9tc3NlYScpXG4gICAge1xuICAgICAgbGV0IHByZWRfbWF0Y2ggPSAgZG9tc3NlYV9wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHByZWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tcHJlZC5kb21zc2VhcHJlZCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRPTVNTRUEgcHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBkb21zc2VhX21hdGNoID0gIGRvbXNzZWFfcHJlZF9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zc2VhX21hdGNoKVxuICAgICAge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmRvbXNzZWEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ET01TU0VBIGZpbGU8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3J1bkJpb3NlcmYnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJiaW9zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImJpb3NlcmZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmluYWwgSG9tb2xvZ3kgTW9kZWw8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRpc3BsYXlfc3RydWN0dXJlKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJyNiaW9zZXJmX21vZGVsJyk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdoaGJsaXRzX3BkYjcwJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5iaW9zZXJmLmhoYmxpdHMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5ISFNlYXJjaCBSZXN1bHRzPC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwZ3BibGFzdF9wZGJhYScpXG4gICAge1xuICAgICAgZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlBEQmFhIEJsYXN0PC9hPjxiciAvPic7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2libGFzdF9jYXRoJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNBVEggQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzaWJsYXN0X3BkYmFhJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLnBkYmJsYXN0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UERCYWEgQmxhc3Q8L2E+PGJyIC8+JztcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3JlZm9ybWF0X2RvbXNlcmZfbW9kZWxzJyB8fCByZXN1bHRfZGljdC5uYW1lID09PSBcInBhcnNlX3BkYl9ibGFzdFwiKVxuICAgIHtcbiAgICAgIGxldCBkb21zZXJmX21hdGNoID0gZG9tc2VyZl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihkb21zZXJmX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldChcImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJkb21zZXJmX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl90aW1lXCIsICcnKTtcbiAgICAgICAgLy8gVE8gRE8gQUREIFJFR0VYXG4gICAgICAgIGRvbWFpbl9jb3VudCs9MTtcbiAgICAgICAgZG9tc2VyZl9yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICBpZihkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsKXtcbiAgICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ppcCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8uZG9tc2VyZi5tb2RlbCArPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Nb2RlbCAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYT48YnIgLz4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5kb21zZXJmLm1vZGVsID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TW9kZWwgJytkb21zZXJmX21hdGNoWzFdKyctJytkb21zZXJmX21hdGNoWzJdKyc8L2E+PGJyIC8+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnV0dG9uc190YWdzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX2J1dHRvbnNcIik7XG4gICAgICAgIGJ1dHRvbnNfdGFncyArPSAnPGJ1dHRvbiBvbkNsaWNrPVwicHNpcHJlZC5zd2FwRG9tc2VyZignK2RvbWFpbl9jb3VudCsnKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkRvbWFpbiAnK2RvbXNlcmZfbWF0Y2hbMV0rJy0nK2RvbXNlcmZfbWF0Y2hbMl0rJzwvYnV0dG9uPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9idXR0b25zXCIsIGJ1dHRvbnNfdGFncyk7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICAgICAgICBwYXRocy5wdXNoKGZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIsIHBhdGhzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2V0U2NoZW1hdGljJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImZmcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJmZnByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZmZwcmVkX3RpbWVcIiwgJycpO1xuXG4gICAgICBsZXQgc2NoX21hdGNoID0gIGZmcHJlZF9zY2hfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoc2NoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5mZnByZWQuc2NoID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RmVhdHVyZSBTY2hlbWF0aWMgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ3NjaF9zY2hlbWF0aWMnLCAnPGI+U2VxdWVuY2UgRmVhdHVyZSBNYXA8L2I+PGJyIC8+UG9zaXRpb24gZGVwZW5kZW50IGZlYXR1cmUgcHJlZGljdGlvbnMgYXJlIG1hcHBlZCBvbnRvIHRoZSBzZXF1ZW5jZSBzY2hlbWF0aWMgc2hvd24gYmVsb3cuIFRoZSBsaW5lIGhlaWdodCBvZiB0aGUgUGhvc3Bob3J5bGF0aW9uIGFuZCBHbHljb3N5bGF0aW9uIGZlYXR1cmVzIHJlZmxlY3RzIHRoZSBjb25maWRlbmNlIG9mIHRoZSByZXNpZHVlIHByZWRpY3Rpb24uPGJyIC8+PGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgIH1cbiAgICAgIGxldCBjYXJ0b29uX21hdGNoID0gIGZmcHJlZF9zdm1fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8uZmZwcmVkLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgUE5HPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnemlwJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9jYXJ0b29uJywgJzxiPlByZWRpY3RlZCBUcmFuc21lbWJyYW5lIFRvcG9sb2d5PC9iPjxiciAvPjxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2ZlYXR1cmVzJylcbiAgICB7XG4gICAgICBsZXQgZmVhdF9tYXRjaCA9IGZmcHJlZF9mZWF0Y2ZnX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGZlYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5mZWF0dXJlcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNlcXVlbmNlIEZlYXR1cmUgU3VtbWFyeTwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2ZmcHJlZGZlYXR1cmVzJywgemlwLCByYWN0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZmZwcmVkX2h1bWFuJylcbiAgICB7XG4gICAgICBsZXQgcHJlZHNfbWF0Y2ggPSBmZnByZWRfcHJlZHNfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYocHJlZHNfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5wcmVkcyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdPIFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnZmZwcmVkcHJlZGljdGlvbnMnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwbG90X3NlbGZfY29udGFjdF9tYXAnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZXRhcHNpY292X3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1ldGFwc2ljb3ZfdGltZVwiLCAnJyk7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292Lm1hcCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgTWFwPC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldCgnbWV0YXBzaWNvdl9tYXAnLCAnPGI+Q29udGFjdCBNYXA8L2I+PGJyIC8+PGltZyBoZWlnaHQ9XCI4MDBcIiB3aWR0aD1cIjgwMFwiIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj4nKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2NvbnRhY3RfcHJlZGljdG9ycycpXG4gICAge1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9ldl9yZWdleCA9IC9cXC5ldmZvbGQvO1xuICAgICAgICAvLyBsZXQgbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXggPSAvXFwucHNpY292LztcbiAgICAgICAgLy8gbGV0IG1ldGFwc2ljb3ZfY2NtcHJlZF9yZWdleCA9IC9cXC5jY21wcmVkLztcbiAgICAgICAgbGV0IGV2X21hdGNoID0gbWV0YXBzaWNvdl9ldl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICAgIGlmKGV2X21hdGNoKVxuICAgICAgICB7XG4gICAgICAgICAgZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5mcmVlY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkZyZWVDb250YWN0IHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBzX21hdGNoID0gbWV0YXBzaWNvdl9wc2ljb3ZfcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgICBpZihwc19tYXRjaClcbiAgICAgICAge1xuICAgICAgICAgIGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YucHNpY292ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UFNJQ09WIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNjX21hdGNoID0gbWV0YXBzaWNvdl9jY21wcmVkX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgICAgaWYoY2NfbWF0Y2gpXG4gICAgICAgIHtcbiAgICAgICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmNjbXByZWQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DQ01QUkVEIHByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lICA9PT0gJ21ldGFwc2ljb3Zfc3RhZ2UyJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LnByZWRzID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q29udGFjdCBQcmVkaWN0aW9uczwvYT48YnIgLz4nO1xuICAgIH1cbiAgfVxuXG4gIC8vU2V0IG5vIGZvdW5kIHN0YXRtZW50cyBmb3Igc29tZSBqb2JzLlxuICBpZighIG1lbXBhY2tfcmVzdWx0X2ZvdW5kKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aDM+Tm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPC9oMz4nKTtcbiAgfVxuICBpZighIHBzaXByZWRfcmVzdWx0X2ZvdW5kKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnTm8gJytqb2JfbmFtZXMucHNpcHJlZCsnIGRhdGEgZ2VuZXJhdGVkIGZvciB0aGlzIGpvYicpO1xuICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF90aW1lXCIsICcnKTtcbiAgfVxuICBpZighIHBkb210aHJlYWRlcl9yZXN1bHRfZm91bmQpXG4gIHtcbiAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX21lc3NhZ2VcIiwgJ05vICcram9iX25hbWVzLnBkb210aHJlYWRlcisnIHRhYmxlIGdlbmVyYXRlZCBmb3IgdGhpcyBqb2InKTtcbiAgICByYWN0aXZlLnNldChcInBkb210aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgIHJhY3RpdmUuc2V0KFwicGRvbXRocmVhZGVyX3RpbWVcIiwgJycpO1xuICB9XG4gIGlmKGRvbXNlcmZfcmVzdWx0X2ZvdW5kKVxuICB7XG4gICAgbGV0IHBhdGhzID0gcmFjdGl2ZS5nZXQoXCJkb21zZXJmX21vZGVsX3VyaXNcIik7XG4gICAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbMF0sICcjZG9tc2VyZl9tb2RlbCcpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5X3N0cnVjdHVyZSh1cmksIGNzc19pZClcbntcbiAgbGV0IGNhcnRvb25fY29sb3IgPSBmdW5jdGlvbihhdG9tKSB7XG4gICAgICAgICBpZihhdG9tLnNzID09PSAnaCcpe3JldHVybiAnI2UzNTNlMyc7fVxuICAgICAgICAgaWYoYXRvbS5zcyA9PT0gJ3MnKXtyZXR1cm4gJyNlNWRkNTUnO31cbiAgICAgICAgIHJldHVybignZ3JleScpO1xuICB9O1xuICBjb25zb2xlLmxvZyhcIkxPQURJTkc6IFwiK3VyaSk7XG4gIGxldCBlbGVtZW50ID0gJChjc3NfaWQpO1xuICBsZXQgY29uZmlnID0geyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyB9O1xuICBsZXQgdmlld2VyID0gJDNEbW9sLmNyZWF0ZVZpZXdlciggZWxlbWVudCwgY29uZmlnICk7XG4gIGxldCBkYXRhID0gZ2V0X3RleHQodXJpLCBcIkdFVFwiLCB7fSk7XG4gIHZpZXdlci5hZGRNb2RlbCggZGF0YSwgXCJwZGJcIiApOyAgICAgICAgICAgICAgICAgICAgICAgLyogbG9hZCBkYXRhICovXG4gIHZpZXdlci5zZXRTdHlsZSh7fSwge2NhcnRvb246IHtjb2xvcmZ1bmM6IGNhcnRvb25fY29sb3J9fSk7ICAvKiBzdHlsZSBhbGwgYXRvbXMgKi9cbiAgdmlld2VyLnpvb21UbygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNhbWVyYSAqL1xuICB2aWV3ZXIucmVuZGVyKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiByZW5kZXIgc2NlbmUgKi9cbiAgdmlld2VyLnpvb20oMS43LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIC8vY29uc29sZS5sb2coZG93bmxvYWRzX2luZm8pO1xuICBsZXQgZG93bmxvYWRzX3N0cmluZyA9IHJhY3RpdmUuZ2V0KCdkb3dubG9hZF9saW5rcycpO1xuICBpZigncHNpcHJlZCcgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KXtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTt9XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ3Bkb210aHJlYWRlcicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBpZihkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIudGFibGUpe1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZG9tdGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gICAgfVxuICB9XG4gIGlmKCdtZW1wYWNrJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlcik7XG4gICAgaWYoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKVxuICAgIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtcGFjay5ncmFwaF9vdXQpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmxpcGlkX291dCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCJObyBwYWNraW5nIHByZWRpY3Rpb24gcG9zc2libGU8YnIgLz5cIik7XG4gICAgfVxuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignYmlvc2VyZicgaW4gZG93bmxvYWRzX2luZm8pXG4gIHtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5iaW9zZXJmLm1vZGVsKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5oaGJsaXRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uYmlvc2VyZi5wZGJhYSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG4gIGlmKCdkb21zZXJmJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmhlYWRlcik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYubW9kZWwpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kb21zZXJmLmNhdGhibGFzdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRvbXNlcmYucGRiYmxhc3QpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignZmZwcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5mZnByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnNjaCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmZmcHJlZC5jYXJ0b29uKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLmZlYXR1cmVzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8uZmZwcmVkLnByZWRzKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21ldGFwc2ljb3YnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wcmVkcyk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1ldGFwc2ljb3YubWFwKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5wc2ljb3YpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmZyZWVjb250YWN0KTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWV0YXBzaWNvdi5jY21wcmVkKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgZG93bmxvYWRzX3N0cmluZyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsImltcG9ydCB7IGdldF9tZW1zYXRfcmFuZ2VzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3NzMiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYmRhdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9jb21iIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21lbXNhdGRhdGEgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcHJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYXJzZWRzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX2ZlYXRjZmcgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfZmZwcmVkcyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5cblxuLy9naXZlbiBhIHVybCwgaHR0cCByZXF1ZXN0IHR5cGUgYW5kIHNvbWUgZm9ybSBkYXRhIG1ha2UgYW4gaHR0cCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc2VuZF9yZXF1ZXN0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuICBjb25zb2xlLmxvZygnU2VuZGluZyBVUkkgcmVxdWVzdCcpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgeW91ciBzdWJtaXNzaW9uLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7XG4gIH19KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBqb2JfbmFtZXMsIG9wdGlvbnNfZGF0YSlcbntcbiAgLy9hbGVydChzZXEpO1xuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgZm9ybSBkYXRhXCIpO1xuICBjb25zb2xlLmxvZyhqb2JfbmFtZSk7XG4gIHZhciBmaWxlID0gbnVsbDtcbiAgdHJ5XG4gIHtcbiAgICBmaWxlID0gbmV3IEJsb2IoW3NlcV0pO1xuICB9IGNhdGNoIChlKVxuICB7XG4gICAgYWxlcnQoZSk7XG4gIH1cbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZkLmFwcGVuZChcImlucHV0X2RhdGFcIiwgZmlsZSwgJ2lucHV0LnR4dCcpO1xuICBmZC5hcHBlbmQoXCJqb2JcIixqb2JfbmFtZSk7XG4gIGZkLmFwcGVuZChcInN1Ym1pc3Npb25fbmFtZVwiLG5hbWUpO1xuICBmZC5hcHBlbmQoXCJlbWFpbFwiLCBlbWFpbCk7XG4gIGNvbnNvbGUubG9nKG9wdGlvbnNfZGF0YSk7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfZXZhbHVlXCIsIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSk7XG4gIGZkLmFwcGVuZChcInBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9uc1wiLCBvcHRpb25zX2RhdGEucHNpYmxhc3RfZG9tcHJlZF9pdGVyYXRpb25zKTtcbiAgY29uc29sZS5sb2coZmQpO1xuICBsZXQgcmVzcG9uc2VfZGF0YSA9IHNlbmRfcmVxdWVzdChzdWJtaXRfdXJsLCBcIlBPU1RcIiwgZmQpO1xuICBpZihyZXNwb25zZV9kYXRhICE9PSBudWxsKVxuICB7XG4gICAgbGV0IHRpbWVzID0gc2VuZF9yZXF1ZXN0KHRpbWVzX3VybCwnR0VUJyx7fSk7XG4gICAgLy9hbGVydChKU09OLnN0cmluZ2lmeSh0aW1lcykpO1xuICAgIGlmKGpvYl9uYW1lIGluIHRpbWVzKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIGpvYl9uYW1lc1tqb2JfbmFtZV0rXCIgam9icyB0eXBpY2FsbHkgdGFrZSBcIit0aW1lc1tqb2JfbmFtZV0rXCIgc2Vjb25kc1wiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfdGltZScsIFwiVW5hYmxlIHRvIHJldHJpZXZlIGF2ZXJhZ2UgdGltZSBmb3IgXCIram9iX25hbWVzW2pvYl9uYW1lXStcIiBqb2JzLlwiKTtcbiAgICB9XG4gICAgZm9yKHZhciBrIGluIHJlc3BvbnNlX2RhdGEpXG4gICAge1xuICAgICAgaWYoayA9PSBcIlVVSURcIilcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ2JhdGNoX3V1aWQnLCByZXNwb25zZV9kYXRhW2tdKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCBqb2JfbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vL3V0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBzZXF1ZW5jZSBmcm9tIGEgcHJldmlvdXMgc3VibWlzc2lvbiBpcyB0aGVcbi8vcGFnZSB3YXMgbG9hZGVkIHdpdGggYSBVVUlEXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3ByZXZpb3VzX2RhdGEodXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpXG57XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3RpbmcgZGV0YWlscyBnaXZlbiBVUkknKTtcbiAgICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIC8vYWxlcnQodXJsKTtcbiAgICBsZXQgc3VibWlzc2lvbl9yZXNwb25zZSA9IHNlbmRfcmVxdWVzdCh1cmwsIFwiR0VUXCIsIHt9KTtcbiAgICBpZighIHN1Ym1pc3Npb25fcmVzcG9uc2Upe2FsZXJ0KFwiTk8gU1VCTUlTU0lPTiBEQVRBXCIpO31cbiAgICBsZXQgc2VxID0gZ2V0X3RleHQoZmlsZV91cmwrc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5pbnB1dF9maWxlLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGpvYnMgPSAnJztcbiAgICBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24oc3VibWlzc2lvbil7XG4gICAgICBqb2JzICs9IHN1Ym1pc3Npb24uam9iX25hbWUrXCIsXCI7XG4gICAgfSk7XG4gICAgam9icyA9IGpvYnMuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybih7J3NlcSc6IHNlcSwgJ2VtYWlsJzogc3VibWlzc2lvbl9yZXNwb25zZS5zdWJtaXNzaW9uc1swXS5lbWFpbCwgJ25hbWUnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLnN1Ym1pc3Npb25fbmFtZSwgJ2pvYnMnOiBqb2JzfSk7XG59XG5cblxuLy9nZXQgdGV4dCBjb250ZW50cyBmcm9tIGEgcmVzdWx0IFVSSVxuZXhwb3J0IGZ1bmN0aW9uIGdldF90ZXh0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuXG4gbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICAvL2RhdGFUeXBlOiBcInR4dFwiLFxuICAgIC8vY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSlcbiAgICB7XG4gICAgICBpZihkYXRhID09PSBudWxsKXthbGVydChcIkZhaWxlZCB0byByZXF1ZXN0IGlucHV0IGRhdGEgdGV4dFwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJHZXR0aW5ncyByZXN1bHRzIHRleHQgZmFpbGVkLiBUaGUgQmFja2VuZCBwcm9jZXNzaW5nIHNlcnZpY2UgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGNvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWtcIik7fVxuICB9KTtcbiAgcmV0dXJuKHJlc3BvbnNlKTtcbn1cblxuXG4vL3BvbGxzIHRoZSBiYWNrZW5kIHRvIGdldCByZXN1bHRzIGFuZCB0aGVuIHBhcnNlcyB0aG9zZSByZXN1bHRzIHRvIGRpc3BsYXlcbi8vdGhlbSBvbiB0aGUgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NfZmlsZSh1cmxfc3R1YiwgcGF0aCwgY3RsLCB6aXAsIHJhY3RpdmUpXG57XG4gIGxldCB1cmwgPSB1cmxfc3R1YiArIHBhdGg7XG4gIGxldCBwYXRoX2JpdHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgLy9nZXQgYSByZXN1bHRzIGZpbGUgYW5kIHB1c2ggdGhlIGRhdGEgaW4gdG8gdGhlIGJpbzNkIG9iamVjdFxuICAvL2FsZXJ0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdHZXR0aW5nIFJlc3VsdHMgRmlsZSBhbmQgcHJvY2Vzc2luZycpO1xuICBsZXQgcmVzcG9uc2UgPSBudWxsO1xuICAkLmFqYXgoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIGFzeW5jOiAgIHRydWUsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChmaWxlKVxuICAgIHtcbiAgICAgIHppcC5mb2xkZXIocGF0aF9iaXRzWzFdKS5maWxlKHBhdGhfYml0c1syXSwgZmlsZSk7XG4gICAgICBpZihjdGwgPT09ICdob3JpeicpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JywgZmlsZSk7XG4gICAgICAgIGJpb2QzLnBzaXByZWQoZmlsZSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnc3MyJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2Vfc3MyKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAncGJkYXQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgICAgLy9hbGVydCgnUEJEQVQgcHJvY2VzcycpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnY29tYicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdtZW1zYXRkYXRhJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdwZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdnZW5fcHJlc3VsdCcpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3ByZXN1bHQocmFjdGl2ZSwgZmlsZSwgJ2dlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZG9tX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdkZ2VuJyk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwYXJzZWRzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGFyc2VkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZGZlYXR1cmVzJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmVhdGNmZyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2ZmcHJlZHByZWRpY3Rpb25zJylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfZmZwcmVkcyhyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yKSk7fVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG59XG5cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIi8qIDEuIENhdGNoIGZvcm0gaW5wdXRcbiAgICAgMi4gVmVyaWZ5IGZvcm1cbiAgICAgMy4gSWYgZ29vZCB0aGVuIG1ha2UgZmlsZSBmcm9tIGRhdGEgYW5kIHBhc3MgdG8gYmFja2VuZFxuICAgICA0LiBzaHJpbmsgZm9ybSBhd2F5XG4gICAgIDUuIE9wZW4gc2VxIHBhbmVsXG4gICAgIDYuIFNob3cgcHJvY2Vzc2luZyBhbmltYXRpb25cbiAgICAgNy4gbGlzdGVuIGZvciByZXN1bHRcbiovXG5pbXBvcnQgeyB2ZXJpZnlfYW5kX3NlbmRfZm9ybSB9IGZyb20gJy4vZm9ybXMvZm9ybXNfaW5kZXguanMnO1xuaW1wb3J0IHsgc2VuZF9yZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRfcHJldmlvdXNfZGF0YSB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGdldFVybFZhcnMgfSBmcm9tICcuL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuaW1wb3J0IHsgY2xlYXJfc2V0dGluZ3MgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgcHJlcGFyZV9kb3dubG9hZHNfaHRtbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfcmVzdWx0cyB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5pbXBvcnQgeyBzZXRfZG93bmxvYWRzX3BhbmVsIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHNob3dfcGFuZWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgZGlzcGxheV9zdHJ1Y3R1cmUgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuXG52YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmNvcHlCdXR0b24nKTtcbnZhciB6aXAgPSBuZXcgSlNaaXAoKTtcblxuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5jbGlwYm9hcmQub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cbi8vIFNFVCBFTkRQT0lOVFMgRk9SIERFViwgU1RBR0lORyBPUiBQUk9EXG5sZXQgZW5kcG9pbnRzX3VybCA9IG51bGw7XG5sZXQgc3VibWl0X3VybCA9IG51bGw7XG5sZXQgdGltZXNfdXJsID0gbnVsbDtcbmxldCBnZWFyc19zdmcgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrL3BzaXByZWRfYmV0YS9zdGF0aWMvaW1hZ2VzL2dlYXJzLnN2Z1wiO1xubGV0IG1haW5fdXJsID0gXCJodHRwOi8vYmlvaW5mLmNzLnVjbC5hYy51a1wiO1xubGV0IGFwcF9wYXRoID0gXCIvcHNpcHJlZF9iZXRhXCI7XG5sZXQgZmlsZV91cmwgPSAnJztcbmxldCBnZWFyX3N0cmluZyA9ICc8b2JqZWN0IHdpZHRoPVwiMTQwXCIgaGVpZ2h0PVwiMTQwXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiBkYXRhPVwiJytnZWFyc19zdmcrJ1wiPjwvb2JqZWN0Pic7XG5sZXQgam9iX2xpc3QgPSBbXCJwc2lwcmVkXCIsIFwicGdlbnRocmVhZGVyXCIsIFwibWV0YXBzaWNvdlwiLCBcImRpc29wcmVkXCIsIFwibWVtcGFja1wiLFxuICAgICAgICAgICAgICAgIFwibWVtc2F0c3ZtXCIsIFwiZ2VudGhyZWFkZXJcIiwgXCJkb21wcmVkXCIsIFwicGRvbXRocmVhZGVyXCIsIFwiYmlvc2VyZlwiLFxuICAgICAgICAgICAgICAgIFwiZG9tc2VyZlwiLCBcImZmcHJlZFwiLCBcIm1ldHNpdGVcIiwgXCJoc3ByZWRcIiwgXCJtZW1lbWJlZFwiLCBcImdlbnRkYlwiXTtcbmxldCBqb2JfbmFtZXMgPSB7XG4gICdwc2lwcmVkJzogJ1BTSVBSRUQgVjQuMCcsXG4gICdkaXNvcHJlZCc6ICdESU9TUFJFRCAzJyxcbiAgJ21lbXNhdHN2bSc6ICdNRU1TQVQtU1ZNJyxcbiAgJ3BnZW50aHJlYWRlcic6ICdwR2VuVEhSRUFERVInLFxuICAnbWVtcGFjayc6ICdNRU1QQUNLJyxcbiAgJ2dlbnRocmVhZGVyJzogJ0dlblRIUkVBREVSJyxcbiAgJ2RvbXByZWQnOiAnRG9tUHJlZCcsXG4gICdwZG9tdGhyZWFkZXInOiAncERvbVRIUkVBREVSJyxcbiAgJ2Jpb3NlcmYnOiAnQmlvc1NlcmYgdjIuMCcsXG4gICdkb21zZXJmJzogJ0RvbVNlcmYgdjIuMScsXG4gICdmZnByZWQnOiAnRkZQcmVkIDMnLFxuICAnbWV0YXBzaWNvdic6ICdNZXRhUFNJQ09WJyxcbiAgJ21ldHNpdGUnOiAnTWV0U2l0ZScsXG4gICdoc3ByZWQnOiAnSFNQcmVkJyxcbiAgJ21lbWVtYmVkJzogJ01FTUVNQkVEJyxcbiAgJ2dlbnRkYic6ICdHZW5lcmF0ZSBUREInLFxufTtcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG5sZXQgaW5pdGlhbGlzYXRpb25fZGF0YSA9IHtcbiAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgYmlvc2VyZl9hZHZhbmNlZDogMCxcbiAgICBkb21zZXJmX2FkdmFuY2VkOiAwLFxuICAgIGRvbXByZWRfYWR2YW5jZWQ6IDAsXG4gICAgZmZwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1ldHNpdGVfYWR2YW5jZWQ6IDAsXG4gICAgaHNwcmVkX2FkdmFuY2VkOiAwLFxuICAgIG1lbWVtYmFkX2FkdmFuY2VkOiAwLFxuICAgIG1vZGVsbGVyX2tleTogbnVsbCxcbiAgICBkb3dubG9hZF9saW5rczogJycsXG5cbiAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuICAgIGRpc29fcHJlY2lzaW9uOiBudWxsLFxuICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcbiAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgIHBnZW5fYW5uX3NldDoge30sXG4gICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG4gICAgZ2VuX3RhYmxlOiBudWxsLFxuICAgIGdlbl9hbm5fc2V0OiB7fSxcbiAgICBwYXJzZWRzX2luZm86IG51bGwsXG4gICAgcGFyc2Vkc19wbmc6IG51bGwsXG4gICAgZGdlbl90YWJsZTogbnVsbCxcbiAgICBkZ2VuX2Fubl9zZXQ6IHt9LFxuICAgIGJpb3NlcmZfbW9kZWw6IG51bGwsXG4gICAgZG9tc2VyZl9idXR0b25zOiAnJyxcbiAgICBkb21zZXJmX21vZGVsX3VyaXM6IFtdLFxuICAgIGZmcHJlZF9jYXJ0b29uOiBudWxsLFxuICAgIHNjaF9zY2hlbWF0aWM6IG51bGwsXG4gICAgYWFfY29tcG9zaXRpb246IG51bGwsXG4gICAgZ2xvYmFsX2ZlYXR1cmVzOiBudWxsLFxuICAgIGZ1bmN0aW9uX3RhYmxlczogbnVsbCxcbiAgICBtZXRhcHNpY292X21hcDogbnVsbCxcblxuICAgIG1ldGFwc2ljb3ZfZGF0YTogbnVsbCxcbiAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG4gICAgaHNwcmVkX2RhdGE6IG51bGwsXG4gICAgbWVtZW1iZWRfZGF0YTogbnVsbCxcbiAgICBnZW50ZGJfZGF0YTogbnVsbCxcblxuICAgIC8vIFNlcXVlbmNlIGFuZCBqb2IgaW5mb1xuICAgIHNlcXVlbmNlOiAnJyxcbiAgICBzZXF1ZW5jZV9sZW5ndGg6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RhcnQ6IDEsXG4gICAgc3Vic2VxdWVuY2Vfc3RvcDogMSxcbiAgICBlbWFpbDogJycsXG4gICAgbmFtZTogJycsXG4gICAgYmF0Y2hfdXVpZDogbnVsbCxcbiAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgIGFubm90YXRpb25zOiBudWxsLFxufTtcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUpe1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfY2hlY2tlZCddID0gZmFsc2U7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ19idXR0b24nXSA9IGZhbHNlO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfam9iJ10gPSBqb2JfbmFtZSsnX2pvYic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX21lc3NhZ2UnXSA9ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgJytqb2JfbmFtZXNbam9iX25hbWVdKycgam9iIHRvIHByb2Nlc3M8L2gyPic7XG4gIGluaXRpYWxpc2F0aW9uX2RhdGFbam9iX25hbWUrJ193YWl0aW5nX2ljb24nXSA9IGdlYXJfc3RyaW5nO1xuICBpbml0aWFsaXNhdGlvbl9kYXRhW2pvYl9uYW1lKydfd2FpdGluZ190aW1lJ10gPSAnTG9hZGluZyBEYXRhJztcbn0pO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5kb21wcmVkX2NoZWNrZWQgPSB0cnVlO1xuaW5pdGlhbGlzYXRpb25fZGF0YS5kb21wcmVkX2FkdmFuY2VkID0gMTtcbi8vIERFQ0xBUkUgVkFSSUFCTEVTIGFuZCBpbml0IHJhY3RpdmUgaW5zdGFuY2VcbnZhciByYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICBlbDogJyNwc2lwcmVkX3NpdGUnLFxuICB0ZW1wbGF0ZTogJyNmb3JtX3RlbXBsYXRlJyxcbiAgZGF0YTogaW5pdGlhbGlzYXRpb25fZGF0YSxcbn0pO1xuXG4vL3NldCBzb21lIHRoaW5ncyBvbiB0aGUgcGFnZSBmb3IgdGhlIGRldmVsb3BtZW50IHNlcnZlclxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIpIHtcbiAgcmFjdGl2ZS5zZXQoJ2VtYWlsJywgJ2RhbmllbC5idWNoYW5AdWNsLmFjLnVrJyk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgJ3Rlc3QnKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgJ1FXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTRFFXRUFTJyk7XG59XG5cbi8vNGI2YWQ3OTItZWQxZi0xMWU1LTg5ODYtOTg5MDk2YzEzZWU2XG5sZXQgdXVpZF9yZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XG5sZXQgdXVpZF9tYXRjaCA9IHV1aWRfcmVnZXguZXhlYyhnZXRVcmxWYXJzKCkudXVpZCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vL1xuLy8gQVBQTElDQVRJT04gSEVSRVxuLy9cbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vSGVyZSB3ZXJlIGtlZXAgYW4gZXllIG9uIHNvbWUgZm9ybSBlbGVtZW50cyBhbmQgcmV3cml0ZSB0aGUgbmFtZSBpZiBwZW9wbGVcbi8vaGF2ZSBwcm92aWRlZCBhIGZhc3RhIGZvcm1hdHRlZCBzZXFcbmxldCBzZXFfb2JzZXJ2ZXIgPSByYWN0aXZlLm9ic2VydmUoJ3NlcXVlbmNlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlICkge1xuICBsZXQgcmVnZXggPSAvXj4oLis/KVxccy87XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMobmV3VmFsdWUpO1xuICBpZihtYXRjaClcbiAge1xuICAgIHRoaXMuc2V0KCduYW1lJywgbWF0Y2hbMV0pO1xuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIHRoaXMuc2V0KCduYW1lJywgbnVsbCk7XG4gIC8vIH1cblxuICB9LFxuICB7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH0pO1xuXG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIGpvYl90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuXG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbywgam9iX25hbWVzKTtcblxuICAgICAgfSk7XG4gICAgICBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnRXJyb3InIHx8IGJhdGNoLnN0YXRlID09PSAnQ3Jhc2gnKVxuICAgIHtcbiAgICAgIGxldCBzdWJtaXNzaW9uX21lc3NhZ2UgPSBiYXRjaC5zdWJtaXNzaW9uc1swXS5sYXN0X21lc3NhZ2U7XG4gICAgICBhbGVydChcIlBPTExJTkcgRVJST1I6IEpvYiBGYWlsZWRcXG5cIitcbiAgICAgICAgICAgIFwiUGxlYXNlIENvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWsgcXVvdGluZyB0aGlzIGVycm9yIG1lc3NhZ2UgYW5kIHlvdXIgam9iIElEXFxuXCIrc3VibWlzc2lvbl9tZXNzYWdlKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9LCA1MDAwKTtcblxufSx7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH1cbik7XG5cbi8vIE9uIGNsaWNraW5nIHRoZSBHZXQgWmlwIGZpbGUgbGluayB0aGlzIHdhdGNoZXJzIHByZXBhcmVzIHRoZSB6aXAgYW5kIGhhbmRzIGl0IHRvIHRoZSB1c2VyXG5yYWN0aXZlLm9uKCdnZXRfemlwJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgdXVpZCA9IHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgemlwLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCJ9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHNhdmVBcyhibG9iLCB1dWlkK1wiLnppcFwiKTtcbiAgICB9KTtcbn0pO1xuXG5yYWN0aXZlLm9uKCdzaG93X2Jpb3NlcmYnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnYmlvc2VyZl9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19kb21zZXJmJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IGFkdiA9IHJhY3RpdmUuZ2V0KCdkb21zZXJmX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9hZHZhbmNlZCcsIDEpO1xuICB9XG59KTtcbnJhY3RpdmUub24oJ3Nob3dfZG9tcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZG9tcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X2ZmcHJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnZmZwcmVkX2FkdmFuY2VkJyk7XG4gIGlmKGFkdil7XG4gICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9uKCdzaG93X21ldHNpdGUnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ21ldHNpdGVfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19oc3ByZWQnLCBmdW5jdGlvbihldmVudCkge1xuICBsZXQgYWR2ID0gcmFjdGl2ZS5nZXQoJ2hzcHJlZF9hZHZhbmNlZCcpO1xuICBpZihhZHYpe1xuICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbignc2hvd19tZW1lbWJlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBhZHYgPSByYWN0aXZlLmdldCgnbWVtZW1iZWRfYWR2YW5jZWQnKTtcbiAgaWYoYWR2KXtcbiAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAxKTtcbiAgfVxufSk7XG4vLyBUaGVzZSByZWFjdCB0byB0aGUgaGVhZGVycyBiZWluZyBjbGlja2VkIHRvIHRvZ2dsZSB0aGUgcGFuZWxcbi8vXG5yYWN0aXZlLm9uKCAnc2VxdWVuY2VfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYWR2YW5jZWQnLCAwKTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICBsZXQgc2V0dGluZyA9IGZhbHNlO1xuICAgICAgaWYoam9iX25hbWUgPT09ICdwc2lwcmVkJyl7c2V0dGluZyA9IHRydWU7fVxuICAgICAgcmFjdGl2ZS5zZXQoIGpvYl9uYW1lKydfY2hlY2tlZCcsIHNldHRpbmcpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdzdHJ1Y3R1cmVfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMCApO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYWR2YW5jZWQnLCAwKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV9hZHZhbmNlZCcsIDApO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX2FkdmFuY2VkJywgMCk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2FkdmFuY2VkJywgMCk7XG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICByYWN0aXZlLnNldCggam9iX25hbWUrJ19jaGVja2VkJywgZmFsc2UpO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAxICk7XG59KTtcblxucmFjdGl2ZS5vbiggJ2Rvd25sb2Fkc19hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBzaG93X3BhbmVsKDEsIHJhY3RpdmUpO1xufSk7XG5cbi8vcmVnaXN0ZXIgbGlzdGVuZXJzIGZvciBlYWNoIHJlc3VsdHMgcGFuZWxcbmpvYl9saXN0LmZvckVhY2goZnVuY3Rpb24oam9iX25hbWUsIGkpe1xuICBjb25zb2xlLmxvZyhcImFkZGluZyBqb2JzIHdhdGNoZXJzXCIpO1xuICByYWN0aXZlLm9uKGpvYl9uYW1lKydfYWN0aXZlJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgc2hvd19wYW5lbChpKzIsIHJhY3RpdmUpO1xuICAgIGlmKGpvYl9uYW1lID09PSBcInBzaXByZWRcIilcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpKVxuICAgICAge1xuICAgICAgICBiaW9kMy5wc2lwcmVkKHJhY3RpdmUuZ2V0KCdwc2lwcmVkX2hvcml6JyksICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoam9iX25hbWUgPT09IFwiZGlzb3ByZWRcIilcbiAgICB7XG4gICAgICBpZihyYWN0aXZlLmdldCgnZGlzb19wcmVjaXNpb24nKSlcbiAgICAgIHtcbiAgICAgICAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihqb2JfbmFtZSA9PT0gJ2RvbXNlcmYnKVxuICAgIHtcbiAgICAgIGlmKHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KCdkb21zZXJmX21vZGVsX3VyaXMnKTtcbiAgICAgICAgZGlzcGxheV9zdHJ1Y3R1cmUocGF0aHNbMF0sICcjZG9tc2VyZl9tb2RlbCcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn0pO1xuXG5yYWN0aXZlLm9uKCAnc3VibWlzc2lvbl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICBsZXQgc3RhdGUgPSByYWN0aXZlLmdldCgnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScpO1xuICBpZihzdGF0ZSA9PT0gMSl7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMCApO1xuICB9XG4gIGVsc2V7XG4gICAgcmFjdGl2ZS5zZXQoICdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJywgMSApO1xuICB9XG59KTtcblxuLy9ncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgbWFpbiBmb3JtIGFuZCBzZW5kIHRoZSBzZXF1ZW5jZSB0byB0aGUgYmFja2VuZFxucmFjdGl2ZS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgZGF0YScpO1xuICBsZXQgc2VxID0gdGhpcy5nZXQoJ3NlcXVlbmNlJyk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9ePi4rJC9tZywgXCJcIikudG9VcHBlckNhc2UoKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL1xcbnxcXHMvZyxcIlwiKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlX2xlbmd0aCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzZXEpO1xuXG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKTtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIGxldCBjaGVja19zdGF0ZXMgPSB7fTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfam9iJ10gPSByYWN0aXZlLmdldChqb2JfbmFtZSsnX2pvYicpO1xuICAgIGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfY2hlY2tlZCcpO1xuICB9KTtcblxuICBsZXQgb3B0aW9uc19kYXRhID0ge307XG4gIG9wdGlvbnNfZGF0YS5wc2libGFzdF9kb21wcmVkX2V2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9lX3ZhbHVlX2N1dG9mZlwiKS52YWx1ZTtcbiAgb3B0aW9uc19kYXRhLnBzaWJsYXN0X2RvbXByZWRfaXRlcmF0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9tcHJlZF9wc2libGFzdF9pdGVyYXRpb25zXCIpLnZhbHVlO1xuICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG4vLyBncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgUmVzdWJtaXNzaW9uIHdpZGdldCwgdHJ1bmNhdGUgdGhlIHNlcXVlbmNlXG4vLyBhbmQgc2VuZCBhIG5ldyBqb2JcbnJhY3RpdmUub24oJ3Jlc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ1Jlc3VibWl0dGluZyBzZWdtZW50Jyk7XG4gIGxldCBzdGFydCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RhcnRcIik7XG4gIGxldCBzdG9wID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdG9wXCIpO1xuICBsZXQgc2VxdWVuY2UgPSByYWN0aXZlLmdldChcInNlcXVlbmNlXCIpO1xuICBsZXQgc3Vic2VxdWVuY2UgPSBzZXF1ZW5jZS5zdWJzdHJpbmcoc3RhcnQtMSwgc3RvcCk7XG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKStcIl9zZWdcIjtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHN1YnNlcXVlbmNlKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCBuYW1lKTtcbiAgbGV0IGNoZWNrX3N0YXRlcyA9IHt9O1xuICBqb2JfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGpvYl9uYW1lKXtcbiAgICBjaGVja19zdGF0ZXNbam9iX25hbWUrJ19qb2InXSA9IHJhY3RpdmUuZ2V0KGpvYl9uYW1lKydfam9iJyk7XG4gICAgY2hlY2tfc3RhdGVzW2pvYl9uYW1lKydfY2hlY2tlZCddID0gcmFjdGl2ZS5nZXQoam9iX25hbWUrJ19jaGVja2VkJyk7XG4gIH0pO1xuICAvL2NsZWFyIHdoYXQgd2UgaGF2ZSBwcmV2aW91c2x5IHdyaXR0ZW5cbiAgY2xlYXJfc2V0dGluZ3MocmFjdGl2ZSwgZ2Vhcl9zdHJpbmcsIGpvYl9saXN0LCBqb2JfbmFtZXMpO1xuICAvL3ZlcmlmeSBmb3JtIGNvbnRlbnRzIGFuZCBwb3N0XG4gIC8vY29uc29sZS5sb2cobmFtZSk7XG4gIC8vY29uc29sZS5sb2coZW1haWwpO1xuICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzdWJzZXF1ZW5jZSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgY2hlY2tfc3RhdGVzLCBqb2JfbGlzdCwgam9iX25hbWVzKTtcbiAgLy93cml0ZSBuZXcgYW5ub3RhdGlvbiBkaWFncmFtXG4gIC8vc3VibWl0IHN1YnNlY3Rpb25cbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG4vLyBIZXJlIGhhdmluZyBzZXQgdXAgcmFjdGl2ZSBhbmQgdGhlIGZ1bmN0aW9ucyB3ZSBuZWVkIHdlIHRoZW4gY2hlY2tcbi8vIGlmIHdlIHdlcmUgcHJvdmlkZWQgYSBVVUlELCBJZiB0aGUgcGFnZSBpcyBsb2FkZWQgd2l0aCBhIFVVSUQgcmF0aGVyIHRoYW4gYVxuLy8gZm9ybSBzdWJtaXQuXG4vL1RPRE86IEhhbmRsZSBsb2FkaW5nIHRoYXQgcGFnZSB3aXRoIHVzZSB0aGUgTUVNU0FUIGFuZCBESVNPUFJFRCBVVUlEXG4vL1xuaWYoZ2V0VXJsVmFycygpLnV1aWQgJiYgdXVpZF9tYXRjaClcbntcbiAgY29uc29sZS5sb2coJ0NhdWdodCBhbiBpbmNvbWluZyBVVUlEJyk7XG4gIHNlcV9vYnNlcnZlci5jYW5jZWwoKTtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTsgLy8gc2hvdWxkIG1ha2UgYSBnZW5lcmljIG9uZSB2aXNpYmxlIHVudGlsIHJlc3VsdHMgYXJyaXZlLlxuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgMiApO1xuICByYWN0aXZlLnNldChcImJhdGNoX3V1aWRcIiwgZ2V0VXJsVmFycygpLnV1aWQpO1xuICBsZXQgcHJldmlvdXNfZGF0YSA9IGdldF9wcmV2aW91c19kYXRhKGdldFVybFZhcnMoKS51dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSk7XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncHNpcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcblxuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA1KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXBhY2snKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnbWVtcGFja19idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1zYXRzdm0nKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDgpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZG9tdGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTApO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnYmlvc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEyKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2ZmcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZmZwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRzaXRlJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdoc3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTUpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWVtZW1iZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50ZGInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTcpO1xuICB9XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgJ3BzaXByZWQnKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vIE5ldyBQYW5uZWwgZnVuY3Rpb25zXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWROZXdBbGlnbm1lbnQoYWxuVVJJLGFublVSSSx0aXRsZSkge1xuICBsZXQgdXJsID0gc3VibWl0X3VybCtyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICB3aW5kb3cub3BlbihcIi4uXCIrYXBwX3BhdGgrXCIvbXNhLz9hbm49XCIrZmlsZV91cmwrYW5uVVJJK1wiJmFsbj1cIitmaWxlX3VybCthbG5VUkksIFwiXCIsIFwid2lkdGg9ODAwLGhlaWdodD00MDBcIik7XG59XG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9kZWwoYWxuVVJJLCB0eXBlKSB7XG5cbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgbGV0IG1vZF9rZXkgPSByYWN0aXZlLmdldCgnbW9kZWxsZXJfa2V5Jyk7XG4gIGlmKG1vZF9rZXkgPT09ICdNJysnTycrJ0QnKydFJysnTCcrJ0knKydSJysnQScrJ04nKydKJysnRScpXG4gIHtcbiAgICAvL2FsZXJ0KHR5cGUpO1xuICAgIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tb2RlbC9wb3N0P3R5cGU9XCIrdHlwZStcIiZhbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTY3MCxoZWlnaHQ9NzAwXCIpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIE0nKydPJysnRCcrJ0UnKydMJysnTCcrJ0UnKydSIExpY2VuY2UgS2V5Jyk7XG4gIH1cbn1cblxuLy8gU3dhcHMgb3V0IHRoZSBkb21zZXJmIG1vZGVsIHdoZW4gdGhvc2UgYnV0dG9ucyBhcmUgY2xpY2tlZFxuZXhwb3J0IGZ1bmN0aW9uIHN3YXBEb21zZXJmKHVyaV9udW1iZXIpXG57XG4gIHVyaV9udW1iZXIgPSB1cmlfbnVtYmVyLTE7XG4gIGxldCBwYXRocyA9IHJhY3RpdmUuZ2V0KFwiZG9tc2VyZl9tb2RlbF91cmlzXCIpO1xuICBkaXNwbGF5X3N0cnVjdHVyZShwYXRoc1t1cmlfbnVtYmVyXSwgJyNkb21zZXJmX21vZGVsJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFpbi5qcyIsImltcG9ydCB7IHNlbmRfam9iIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgaXNJbkFycmF5IH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcblxuLy9UYWtlcyB0aGUgZGF0YSBuZWVkZWQgdG8gdmVyaWZ5IHRoZSBpbnB1dCBmb3JtIGRhdGEsIGVpdGhlciB0aGUgbWFpbiBmb3JtXG4vL29yIHRoZSBzdWJtaXNzb24gd2lkZ2V0IHZlcmlmaWVzIHRoYXQgZGF0YSBhbmQgdGhlbiBwb3N0cyBpdCB0byB0aGUgYmFja2VuZC5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGNoZWNrX3N0YXRlcywgam9iX2xpc3QsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKVxue1xuICAvKnZlcmlmeSB0aGF0IGV2ZXJ5dGhpbmcgaGVyZSBpcyBvayovXG4gIGxldCBlcnJvcl9tZXNzYWdlPW51bGw7XG4gIGxldCBqb2Jfc3RyaW5nID0gJyc7XG4gIC8vZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9mb3JtKHNlcSwgbmFtZSwgZW1haWwsIFtwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkXSk7XG5cbiAgbGV0IGNoZWNrX2xpc3QgPSBbXTtcbiAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgY2hlY2tfbGlzdC5wdXNoKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSk7XG4gIH0pO1xuICBlcnJvcl9tZXNzYWdlID0gdmVyaWZ5X2Zvcm0oc2VxLCBuYW1lLCBlbWFpbCwgY2hlY2tfbGlzdCk7XG5cbiAgaWYoZXJyb3JfbWVzc2FnZS5sZW5ndGggPiAwKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ2Zvcm1fZXJyb3InLCBlcnJvcl9tZXNzYWdlKTtcbiAgICBhbGVydChcIkZPUk0gRVJST1I6XCIrZXJyb3JfbWVzc2FnZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9pbml0aWFsaXNlIHRoZSBwYWdlXG4gICAgbGV0IHJlc3BvbnNlID0gdHJ1ZTtcbiAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIG51bGwgKTtcbiAgICAvL1Bvc3QgdGhlIGpvYnMgYW5kIGludGlhbGlzZSB0aGUgYW5ub3RhdGlvbnMgZm9yIGVhY2ggam9iXG4gICAgLy9XZSBhbHNvIGRvbid0IHJlZHVuZGFudGx5IHNlbmQgZXh0cmEgcHNpcHJlZCBldGMuLiBqb2JzXG4gICAgLy9ieXQgZG9pbmcgdGhlc2UgdGVzdCBpbiBhIHNwZWNpZmljIG9yZGVyXG4gICAgam9iX2xpc3QuZm9yRWFjaChmdW5jdGlvbihqb2JfbmFtZSl7XG4gICAgICAgIGlmKGNoZWNrX3N0YXRlc1tqb2JfbmFtZSsnX2NoZWNrZWQnXSA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KGpvYl9uYW1lK1wiLFwiKTtcbiAgICAgICAgICAgIHJhY3RpdmUuc2V0KGpvYl9uYW1lKydfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ3BnZW50aHJlYWRlcicgfHwgam9iX25hbWUgPT09ICdkaXNvcHJlZCcgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnZG9tcHJlZCcgfHwgam9iX25hbWUgPT09ICdwZG9tdGhyZWFkZXInIHx8XG4gICAgICAgICAgICAgICBqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnIHx8IGpvYl9uYW1lID09PSAnZG9tc2VyZicgfHxcbiAgICAgICAgICAgICAgIGpvYl9uYW1lID09PSAnbWV0YXBzaWNvdicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucHNpcHJlZF9jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihqb2JfbmFtZSA9PT0gJ2Jpb3NlcmYnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgICBjaGVja19zdGF0ZXMucGdlbnRocmVhZGVyX2NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGpvYl9uYW1lID09PSAnZG9tc2VyZicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoZWNrX3N0YXRlcy5wZG9tdGhyZWFkZXJfY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoam9iX25hbWUgPT09ICdtZW1wYWNrJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIGpvYl9uYW1lcywgb3B0aW9uc19kYXRhKTtcbiAgICAvL3NldCB2aXNpYmlsaXR5IGFuZCByZW5kZXIgcGFuZWwgb25jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgam9iX2xpc3QubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbGV0IGpvYl9uYW1lID0gam9iX2xpc3RbaV07XG4gICAgICBpZihjaGVja19zdGF0ZXNbam9iX25hbWUrJ19jaGVja2VkJ10gPT09IHRydWUgJiYgcmVzcG9uc2UgKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgICAgcmFjdGl2ZS5maXJlKCBqb2JfbmFtZSsnX2FjdGl2ZScgKTtcbiAgICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighIHJlc3BvbnNlKXt3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO31cbiAgfVxufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfZm9ybShzZXEsIGpvYl9uYW1lLCBlbWFpbCwgY2hlY2tlZF9hcnJheSlcbntcbiAgbGV0IGVycm9yX21lc3NhZ2UgPSBcIlwiO1xuICBpZighIC9eW1xceDAwLVxceDdGXSskLy50ZXN0KGpvYl9uYW1lKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJQbGVhc2UgcmVzdHJpY3QgSm9iIE5hbWVzIHRvIHZhbGlkIGxldHRlcnMgbnVtYmVycyBhbmQgYmFzaWMgcHVuY3R1YXRpb248YnIgLz5cIjtcbiAgfVxuXG4gIC8qIGxlbmd0aCBjaGVja3MgKi9cbiAgaWYoc2VxLmxlbmd0aCA+IDE1MDApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gbG9uZyB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cbiAgaWYoc2VxLmxlbmd0aCA8IDMwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIHNob3J0IHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuXG4gIC8qIG51Y2xlb3RpZGUgY2hlY2tzICovXG4gIGxldCBudWNsZW90aWRlX2NvdW50ID0gKHNlcS5tYXRjaCgvQXxUfEN8R3xVfE58YXx0fGN8Z3x1fG4vZyl8fFtdKS5sZW5ndGg7XG4gIGlmKChudWNsZW90aWRlX2NvdW50L3NlcS5sZW5ndGgpID4gMC45NSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGFwcGVhcnMgdG8gYmUgbnVjbGVvdGlkZSBzZXF1ZW5jZS4gVGhpcyBzZXJ2aWNlIHJlcXVpcmVzIHByb3RlaW4gc2VxdWVuY2UgYXMgaW5wdXQ8YnIgLz5cIjtcbiAgfVxuICBpZigvW15BQ0RFRkdISUtMTU5QUVJTVFZXWVhfLV0rL2kudGVzdChzZXEpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzPGJyIC8+XCI7XG4gIH1cblxuICBpZihpc0luQXJyYXkodHJ1ZSwgY2hlY2tlZF9hcnJheSkgPT09IGZhbHNlKSB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdSBtdXN0IHNlbGVjdCBhdCBsZWFzdCBvbmUgYW5hbHlzaXMgcHJvZ3JhbVwiO1xuICB9XG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9mb3Jtcy9mb3Jtc19pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=