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
/* unused harmony export get_memsat_ranges */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse_ss2;
/* harmony export (immutable) */ __webpack_exports__["b"] = parse_pbdat;
/* harmony export (immutable) */ __webpack_exports__["c"] = parse_comb;
/* harmony export (immutable) */ __webpack_exports__["d"] = parse_memsatdata;
/* harmony export (immutable) */ __webpack_exports__["e"] = parse_presult;

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
    console.log(match[1]);
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
    pseudo_table += '<th>Str Len</th>';
    pseudo_table += '<th>Seq Len</th>';
    pseudo_table += '<th>Fold</th>';
    pseudo_table += '<th>SEARCH SCOP</th>';
    pseudo_table += '<th>SEARCH CATH</th>';
    pseudo_table += '<th>PDBSUM</th>';
    pseudo_table += '<th>Alignment</th>';
    pseudo_table += '<th>MODEL</th>';

    // if MODELLER THINGY
    pseudo_table += '</tr><tbody">\n';
    lines.forEach(function (line, i) {
      if (line.length === 0) {
        return;
      }
      let entries = line.split(/\s+/);
      if (entries[9] + "_" + i in ann_list) {
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
        pseudo_table += "<td><a target='_blank' href='https://www.rcsb.org/pdb/explore/explore.do?structureId=" + pdb + "'>" + entries[9] + "</a></td>";
        pseudo_table += "<td><a target='_blank' href='http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?pdb=" + pdb + "'>SCOP SEARCH</a></td>";
        pseudo_table += "<td><a target='_blank' href='http://www.cathdb.info/pdb/" + pdb + "'>CATH SEARCH</a></td>";
        pseudo_table += "<td><a target='_blank' href='http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb + "'>Open PDBSUM</a></td>";
        pseudo_table += "<td><input class='button' type='button' onClick='loadNewAlignment(\"" + ann_list[entries[9] + "_" + i].aln + "\",\"" + ann_list[entries[9] + "_" + i].ann + "\",\"" + (entries[9] + "_" + i) + "\");' value='Display Alignment' /></td>";
        pseudo_table += "<td><input class='button' type='button' onClick='buildModel(\"" + ann_list[entries[9] + "_" + i].aln + "\");' value='Build Model' /></td>";
        pseudo_table += "</tr>\n";
      }
    });
    pseudo_table += "</tbody></table>\n";
    ractive.set(type + "_table", pseudo_table);
  } else {
    ractive.set(type + "_table", "<h3>No good hits found. GUESS and LOW confidence hits can be found in the results file</h3>");
  }
}

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = clear_settings;
/* harmony export (immutable) */ __webpack_exports__["a"] = prepare_downloads_html;
/* harmony export (immutable) */ __webpack_exports__["b"] = handle_results;
/* harmony export (immutable) */ __webpack_exports__["c"] = set_downloads_panel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(3);


//before a resubmission is sent all variables are reset to the page defaults
function clear_settings(ractive, gear_string) {
  ractive.set('results_visible', 2);
  ractive.set('results_panel_visible', 1);
  ractive.set('psipred_button', false);
  ractive.set('download_links', '');
  ractive.set('psipred_waiting_message', '<h2>Please wait for your PSIPRED job to process</h2>');
  ractive.set('psipred_waiting_icon', gear_string);
  ractive.set('psipred_time', 'Loading Data');
  ractive.set('psipred_horiz', null);
  ractive.set('disopred_waiting_message', '<h2>Please wait for your DISOPRED job to process</h2>');
  ractive.set('disopred_waiting_icon', gear_string);
  ractive.set('disopred_time', 'Loading Data');
  ractive.set('diso_precision');
  ractive.set('memsatsvm_waiting_message', '<h2>Please wait for your MEMSAT-SVM job to process</h2>');
  ractive.set('memsatsvm_waiting_icon', gear_string);
  ractive.set('memsatsvm_time', 'Loading Data');
  ractive.set('memsatsvm_schematic', '');
  ractive.set('memsatsvm_cartoon', '');
  ractive.set('pgenthreader_waiting_message', '<h2>Please wait for your pGenTHREADER job to process</h2>');
  ractive.set('pgenthreader_waiting_icon', gear_string);
  ractive.set('pgenthreader_time', 'Loading Data');
  ractive.set('pgen_table', '');
  ractive.set('pgen_set', {});

  ractive.set('mempack_waiting_message', '<h2>Please wait for your MEMPACK job to process</h2>');
  ractive.set('mempack_waiting_icon', gear_string);
  ractive.set('mempack_time', 'Loading Data');
  ractive.set('genthreader_waiting_message', '<h2>Please wait for your GenTHREADER job to process</h2>');
  ractive.set('genthreader_waiting_icon', gear_string);
  ractive.set('genthreader_time', 'Loading Data');
  ractive.set('dompred_waiting_message', '<h2>Please wait for your DomPRED job to process</h2>');
  ractive.set('dompred_waiting_icon', gear_string);
  ractive.set('dompred_time', 'Loading Data');
  ractive.set('pdomthreader_waiting_message', '<h2>Please wait for your pDomTHREADER job to process</h2>');
  ractive.set('pdomthreader_waiting_icon', gear_string);
  ractive.set('pdomthreader_time', 'Loading Data');
  ractive.set('bioserf_waiting_message', '<h2>Please wait for your BioSerf job to process</h2>');
  ractive.set('bioserf_waiting_icon', gear_string);
  ractive.set('bioserf_time', 'Loading Data');
  ractive.set('domserf_waiting_message', '<h2>Please wait for your DomSerf job to process</h2>');
  ractive.set('domserf_waiting_icon', gear_string);
  ractive.set('domserf_time', 'Loading Data');
  ractive.set('ffpred_waiting_message', '<h2>Please wait for your FFPred job to process</h2>');
  ractive.set('ffpred_waiting_icon', gear_string);
  ractive.set('ffpred_time', 'Loading Data');
  ractive.set('metapsicov_waiting_message', '<h2>Please wait for your MetaPSICOV job to process</h2>');
  ractive.set('metapsicov_waiting_icon', gear_string);
  ractive.set('metapsicov_time', 'Loading Data');
  ractive.set('metsite_waiting_message', '<h2>Please wait for your MetSite job to process</h2>');
  ractive.set('metsite_waiting_icon', gear_string);
  ractive.set('metsite_time', 'Loading Data');
  ractive.set('hspred_waiting_message', '<h2>Please wait for your HSPred job to process</h2>');
  ractive.set('hspred_waiting_icon', gear_string);
  ractive.set('hspred_time', 'Loading Data');
  ractive.set('memembed_waiting_message', '<h2>Please wait for your MEMEMBED job to process</h2>');
  ractive.set('memembed_waiting_icon', gear_string);
  ractive.set('memembed_time', 'Loading Data');
  ractive.set('gentdb_waiting_message', '<h2>Please wait for your TDB generation job to process</h2>');
  ractive.set('gentdb_waiting_icon', gear_string);
  ractive.set('gentdb_time', 'Loading Data');

  //ractive.set('diso_precision');
  ractive.set('annotations', null);
  ractive.set('batch_uuid', null);
  biod3.clearSelection('div.sequence_plot');
  biod3.clearSelection('div.psipred_cartoon');
  biod3.clearSelection('div.comb_plot');

  zip = new JSZip();
}

//Take a couple of variables and prepare the html strings for the downloads panel
function prepare_downloads_html(data, downloads_info) {
  if (data.job_name.includes('psipred')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
  }
  if (data.job_name.includes('disopred')) {
    downloads_info.disopred = {};
    downloads_info.disopred.header = "<h5>DisoPredD DOWNLOADS</h5>";
  }
  if (data.job_name.includes('memsatsvm')) {
    downloads_info.memsatsvm = {};
    downloads_info.memsatsvm.header = "<h5>MEMSATSVM DOWNLOADS</h5>";
  }
  if (data.job_name.includes('pgenthreader')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.pgenthreader = {};
    downloads_info.pgenthreader.header = "<h5>pGenTHREADER DOWNLOADS</h5>";
  }
  if (data.job_name.includes('mempack')) {
    downloads_info.memsatsvm = {};
    downloads_info.memsatsvm.header = "<h5>MEMSATSVM DOWNLOADS</h5>";
    downloads_info.mempack = {};
    downloads_info.mempack.header = "<h5>MEMPACK DOWNLOADS</h5>";
  }
  if (data.job_name.includes('genthreader')) {
    downloads_info.genthreader = {};
    downloads_info.genthreader.header = "<h5>GenTHREADER DOWNLOADS</h5>";
  }
  if (data.job_name.includes('dompred')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.dompred = {};
    downloads_info.dompred.header = "<h5>DomPred DOWNLOADS</h5>";
  }
  if (data.job_name.includes('pdomthreader')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.pdomthreader = {};
    downloads_info.pdomthreader.header = "<h5>pDomTHREADER DOWNLOADS</h5>";
  }
  if (data.job_name.includes('bioserf')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.pgenthreader = {};
    downloads_info.pgenthreader.header = "<h5>pGenTHREADER DOWNLOADS</h5>";
    downloads_info.bioserf = {};
    downloads_info.bioserf.header = "<h5>BioSerf DOWNLOADS</h5>";
  }
  if (data.job_name.includes('domserf')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.pdomthreader = {};
    downloads_info.pdomthreader.header = "<h5>pDomTHREADER DOWNLOADS</h5>";
    downloads_info.domserf = {};
    downloads_info.domserf.header = "<h5>DomSerf DOWNLOADS</h5>";
  }
  if (data.job_name.includes('ffpred')) {
    downloads_info.disopred = {};
    downloads_info.disopred.header = "<h5>DisoPredD DOWNLOADS</h5>";
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.dompred = {};
    downloads_info.dompred.header = "<h5>DomPred DOWNLOADS</h5>";
    downloads_info.ffpred = {};
    downloads_info.ffpred.header = "<h5>FFPred DOWNLOADS</h5>";
  }
  if (data.job_name.includes('metapsicov')) {
    downloads_info.psipred = {};
    downloads_info.psipred.header = "<h5>Psipred DOWNLOADS</h5>";
    downloads_info.metapsicov = {};
    downloads_info.metapsicov.header = "<h5>MetaPSICOV DOWNLOADS</h5>";
  }
  if (data.job_name.includes('metsite')) {
    downloads_info.metsite = {};
    downloads_info.metsite.header = "<h5>Metsite DOWNLOADS</h5>";
  }
  if (data.job_name.includes('hspred')) {
    downloads_info.hspred = {};
    downloads_info.hspred.header = "<h5>HSPred DOWNLOADS</h5>";
  }
  if (data.job_name.includes('memembed')) {
    downloads_info.memembed = {};
    downloads_info.memembed.header = "<h5>MEMEMBED DOWNLOADS</h5>";
  }
  if (data.job_name.includes('gentdb')) {
    downloads_info.gentdb = {};
    downloads_info.gentdb.header = "<h5>TDB DOWNLOAD</h5>";
  }
}

//take the datablob we've got and loop over the results
function handle_results(ractive, data, file_url, zip, downloads_info) {
  let horiz_regex = /\.horiz$/;
  let ss2_regex = /\.ss2$/;
  let memsat_cartoon_regex = /_cartoon_memsat_svm\.png$/;
  let memsat_schematic_regex = /_schematic\.png$/;
  let memsat_data_regex = /memsat_svm$/;
  let mempack_cartoon_regex = /Kamada-Kawai_\d+.png$/;
  let mempack_graph_out = /input_graph.out$/;
  let mempack_contact_res = /CONTACT_DEF1.results$/;
  let mempack_lipid_res = /LIPID_EXPOSURE.results$/;
  let mempack_result_found = false;

  let image_regex = '';
  let results = data.results;
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
  }
  console.log(results);
  for (let i in results) {
    let result_dict = results[i];
    //psipred files
    if (result_dict.name == 'psipass2') {
      let match = horiz_regex.exec(result_dict.data_path);
      if (match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'horiz', zip, ractive);
        ractive.set("psipred_waiting_message", '');
        downloads_info.psipred.horiz = '<a href="' + file_url + result_dict.data_path + '">Horiz Format Output</a><br />';
        ractive.set("psipred_waiting_icon", '');
        ractive.set("psipred_time", '');
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

    if (result_dict.name === 'memsatsvm') {
      ractive.set("memsatsvm_waiting_message", '');
      ractive.set("memsatsvm_waiting_icon", '');
      ractive.set("memsatsvm_time", '');
      let scheme_match = memsat_schematic_regex.exec(result_dict.data_path);
      if (scheme_match) {
        ractive.set('memsatsvm_schematic', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.schematic = '<a href="' + file_url + result_dict.data_path + '">Schematic Diagram</a><br />';
      }
      let cartoon_match = memsat_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        ractive.set('memsatsvm_cartoon', '<img src="' + file_url + result_dict.data_path + '" />');
        downloads_info.memsatsvm.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let memsat_match = memsat_data_regex.exec(result_dict.data_path);
      if (memsat_match) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'memsatdata', zip, ractive);
        downloads_info.memsatsvm.data = '<a href="' + file_url + result_dict.data_path + '">Memsat Output</a><br />';
      }
    }
    if (result_dict.name === 'mempack_wrapper') {
      ractive.set("mempack_waiting_message", '');
      ractive.set("mempack_waiting_icon", '');
      ractive.set("mempack_time", '');
      let cartoon_match = mempack_cartoon_regex.exec(result_dict.data_path);
      if (cartoon_match) {
        mempack_result_found = true;
        ractive.set('mempack_cartoon', '<img width="1000px" src="' + file_url + result_dict.data_path + '" />');
        downloads_info.mempack.cartoon = '<a href="' + file_url + result_dict.data_path + '">Cartoon Diagram</a><br />';
      }
      let graph_match = mempack_graph_out.exec(result_dict.data_path);
      if (graph_match) {
        downloads_info.mempack.graph_out = '<a href="' + file_url + result_dict.data_path + '">Diagram Data</a><br />';
      }
      let contact_match = mempack_contact_res.exec(result_dict.data_path);
      if (contact_match) {
        downloads_info.mempack.contact = '<a href="' + file_url + result_dict.data_path + '">Contact Predictions</a><br />';
      }
      let lipid_match = mempack_lipid_res.exec(result_dict.data_path);
      if (lipid_match) {
        downloads_info.mempack.lipid_out = '<a href="' + file_url + result_dict.data_path + '">Lipid Exposure Preditions</a><br />';
      }
    }
    if (result_dict.name === 'sort_presult') {
      ractive.set("pgenthreader_waiting_message", '');
      ractive.set("pgenthreader_waiting_icon", '');
      ractive.set("pgenthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'presult', zip, ractive);
      downloads_info.pgenthreader.table = '<a href="' + file_url + result_dict.data_path + '">pGenTHREADER Table</a><br />';
    }
    if (result_dict.name === 'gen_sort_presults') {
      ractive.set("genthreader_waiting_message", '');
      ractive.set("genthreader_waiting_icon", '');
      ractive.set("genthreader_time", '');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["c" /* process_file */])(file_url, result_dict.data_path, 'gen_presult', zip, ractive);
      downloads_info.genthreader.table = '<a href="' + file_url + result_dict.data_path + '">GenTHREADER Table</a><br />';
    }

    if (result_dict.name === 'pseudo_bas_align') {
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">pGenTHREADER Alignments</a><br />';
    }
    if (result_dict.name === 'genthreader_pseudo_bas_align') {
      downloads_info.genthreader.align = '<a href="' + file_url + result_dict.data_path + '">GenTHREADER Alignments</a><br />';
    }
  }
  if (!mempack_result_found) {
    ractive.set('mempack_cartoon', '<h3>No packing prediction possible</h3>');
  }
}

function set_downloads_panel(ractive, downloads_info) {
  console.log(downloads_info);
  let downloads_string = ractive.get('download_links');
  if ('psipred' in downloads_info) {
    downloads_string = downloads_string.concat(downloads_info.psipred.header);
    downloads_string = downloads_string.concat(downloads_info.psipred.horiz);
    downloads_string = downloads_string.concat(downloads_info.psipred.ss2);
    downloads_string = downloads_string.concat("<br />");
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

  ractive.set('download_links', downloads_string);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = send_request;
/* harmony export (immutable) */ __webpack_exports__["d"] = send_job;
/* harmony export (immutable) */ __webpack_exports__["b"] = get_previous_data;
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
function send_job(ractive, job_name, seq, name, email, submit_url, times_url) {
  //alert(seq);
  console.log("Sending form data");
  console.log(job_name);
  var file = null;
  let upper_name = job_name.toUpperCase();
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
      ractive.set(job_name + '_time', upper_name + " jobs typically take " + times[job_name] + " seconds");
    } else {
      ractive.set(job_name + '_time', "Unable to retrieve average time for " + upper_name + " jobs.");
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
    },
    error: function (error) {
      alert(JSON.stringify(error));
    }
  });
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requests_requests_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__ = __webpack_require__(2);
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

// DECLARE VARIABLES and init ractive instance
var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: {
    sequence_form_visible: 1,
    structure_form_visible: 0,
    results_visible: 1,
    results_panel_visible: 1,
    submission_widget_visible: 0,
    modeller_key: null,

    psipred_checked: false,
    psipred_button: false,
    disopred_checked: false,
    disopred_button: false,
    memsatsvm_checked: false,
    memsatsvm_button: false,
    pgenthreader_checked: false,
    pgenthreader_button: false,
    mempack_checked: false,
    mempack_button: false,
    genthreader_checked: true,
    genthreader_button: false,
    dompred_checked: false,
    dompred_button: false,
    pdomthreader_checked: false,
    pdomthreader_button: false,
    bioserf_checked: false,
    bioserf_button: false,
    domserf_checked: false,
    domserf_button: false,
    ffpred_checked: false,
    ffpred_button: false,
    metsite_checked: false,
    metsite_button: false,
    hspred_checked: false,
    hspred_button: false,
    memembed_checked: false,
    memembed_button: false,
    gentdb_checked: false,
    gentdb_button: false,
    metapsicov_checked: false,
    metapsicov_button: false,

    // pgenthreader_checked: false,
    // pdomthreader_checked: false,
    // dompred_checked: false,
    // mempack_checked: false,
    // ffpred_checked: false,
    // bioserf_checked: false,
    // domserf_checked: false,
    download_links: '',
    psipred_job: 'psipred_job',
    disopred_job: 'disopred_job',
    memsatsvm_job: 'memsatsvm_job',
    pgenthreader_job: 'pgenthreader_job',
    mempack_job: 'mempack_job',
    genthreader_job: 'genthreader_job',
    dompred_job: 'dompred_job',
    pdomthreader_job: 'pdomthreader_job',
    bioserf_job: 'bioserf_job',
    domserf_job: 'domserf_job',
    ffpred_job: 'ffpred_job',
    metsite_job: 'metsite_job',
    hspred_job: 'hspred_job',
    memembed_job: 'memembed_job',
    gentdb_job: 'gentdb_job',
    metapsicov_job: 'metapsicov_job',

    psipred_waiting_message: '<h2>Please wait for your PSIPRED job to process</h2>',
    psipred_waiting_icon: gear_string,
    psipred_time: 'Loading Data',
    psipred_horiz: null,

    disopred_waiting_message: '<h2>Please wait for your DISOPRED job to process</h2>',
    disopred_waiting_icon: gear_string,
    disopred_time: 'Loading Data',
    diso_precision: null,

    memsatsvm_waiting_message: '<h2>Please wait for your MEMSAT-SVM job to process</h2>',
    memsatsvm_waiting_icon: gear_string,
    memsatsvm_time: 'Loading Data',
    memsatsvm_schematic: '',
    memsatsvm_cartoon: '',

    pgenthreader_waiting_message: '<h2>Please wait for your pGenTHREADER job to process</h2>',
    pgenthreader_waiting_icon: gear_string,
    pgenthreader_time: 'Loading Data',
    pgen_table: null,
    pgen_ann_set: {},

    mempack_waiting_message: '<h2>Please wait for your MEMPACK job to process</h2>',
    mempack_waiting_icon: gear_string,
    mempack_time: 'Loading Data',
    memsatpack_schematic: '',
    memsatpack_cartoon: '',

    genthreader_waiting_message: '<h2>Please wait for your GenTHREADER job to process</h2>',
    genthreader_waiting_icon: gear_string,
    genthreader_time: 'Loading Data',
    gen_table: null,
    gen_ann_set: {},

    dompred_waiting_message: '<h2>Please wait for your DOMPRED job to process</h2>',
    dompred_waiting_icon: gear_string,
    dompred_time: 'Loading Data',
    dompred_data: null,

    pdomthreader_waiting_message: '<h2>Please wait for your pDomTHREADER job to process</h2>',
    pdomthreader_waiting_icon: gear_string,
    pdomthreader_time: 'Loading Data',
    pdomthreader_data: null,

    bioserf_waiting_message: '<h2>Please wait for your BioSerf job to process</h2>',
    bioserf_waiting_icon: gear_string,
    bioserf_time: 'Loading Data',
    bioserf_data: null,

    domserf_waiting_message: '<h2>Please wait for your DomSerf job to process</h2>',
    domserf_waiting_icon: gear_string,
    domserf_time: 'Loading Data',
    domserf_data: null,

    ffpred_waiting_message: '<h2>Please wait for your FFPred job to process</h2>',
    ffpred_waiting_icon: gear_string,
    ffpred_time: 'Loading Data',
    ffpred_data: null,

    metapsicov_waiting_message: '<h2>Please wait for your MetaPSICOV job to process</h2>',
    metapsicov_waiting_icon: gear_string,
    metapsicov_time: 'Loading Data',
    metapsicov_data: null,

    metsite_waiting_message: '<h2>Please wait for your MetSite job to process</h2>',
    metsite_waiting_icon: gear_string,
    metsite_time: 'Loading Data',
    metsite_data: null,

    hspred_waiting_message: '<h2>Please wait for your HSPred job to process</h2>',
    hspred_waiting_icon: gear_string,
    hspred_time: 'Loading Data',
    hspred_data: null,

    memembed_waiting_message: '<h2>Please wait for your MEMEMBED job to process</h2>',
    memembed_waiting_icon: gear_string,
    memembed_time: 'Loading Data',
    memembed_data: null,

    gentdb_waiting_message: '<h2>Please wait for TDB Generation job to process</h2>',
    gentdb_waiting_icon: gear_string,
    gentdb_time: 'Loading Data',
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
  }
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["a" /* prepare_downloads_html */])(data, downloads_info);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["b" /* handle_results */])(ractive, data, file_url, zip, downloads_info);
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

// These react to the headers being clicked to toggle the results panel
//
ractive.on('sequence_active', function (event) {
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 0);
  ractive.set('psipred_checked', true);
  ractive.set('disopred_checked', false);
  ractive.set('memsatsvm_checked', false);
  ractive.set('pgenthreader_checked', false);
  ractive.set('mempack_checked', false);
  ractive.set('genthreader_checked', false);
  ractive.set('dompred_checked', false);
  ractive.set('pdomthreader_checked', false);
  ractive.set('bioserf_checked', false);
  ractive.set('domserf_checked', false);
  ractive.set('ffpred_checked', false);
  ractive.set('metapsicov_checked', false);
  ractive.set('metsite_checked', false);
  ractive.set('hspred_checked', false);
  ractive.set('memembed_checked', false);
  ractive.set('gentdb_checked', false);
  ractive.set('sequence_form_visible', null);
  ractive.set('sequence_form_visible', 1);
});
ractive.on('structure_active', function (event) {
  ractive.set('sequence_form_visible', null);
  ractive.set('sequence_form_visible', 0);
  ractive.set('psipred_checked', false);
  ractive.set('disopred_checked', false);
  ractive.set('memsatsvm_checked', false);
  ractive.set('pgenthreader_checked', false);
  ractive.set('mempack_checked', false);
  ractive.set('genthreader_checked', false);
  ractive.set('dompred_checked', false);
  ractive.set('pdomthreader_checked', false);
  ractive.set('bioserf_checked', false);
  ractive.set('domserf_checked', false);
  ractive.set('ffpred_checked', false);
  ractive.set('metapsicov_checked', false);
  ractive.set('metsite_checked', false);
  ractive.set('hspred_checked', false);
  ractive.set('memembed_checked', false);
  ractive.set('gentdb_checked', false);
  ractive.set('structure_form_visible', null);
  ractive.set('structure_form_visible', 1);
});

ractive.on('downloads_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 11);
});
ractive.on('psipred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 1);
  if (ractive.get('psipred_horiz')) {
    biod3.psipred(ractive.get('psipred_horiz'), 'psipredChart', { parent: 'div.psipred_cartoon', margin_scaler: 2 });
  }
});
ractive.on('disopred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 4);
  if (ractive.get('diso_precision')) {
    biod3.genericxyLineChart(ractive.get('diso_precision'), 'pos', ['precision'], ['Black'], 'DisoNNChart', { parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300 });
  }
});
ractive.on('memsatsvm_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 6);
});
ractive.on('pgenthreader_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 2);
});
ractive.on('mempack_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 5);
});
ractive.on('genthreader_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 7);
});
ractive.on('dompred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 8);
});
ractive.on('pdomthreader_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 9);
});
ractive.on('bioserf_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 10);
});
ractive.on('domserf_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 12);
});
ractive.on('ffpred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 13);
});
ractive.on('metapsicov_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 18);
});
ractive.on('metsite_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 14);
});
ractive.on('hspred_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 15);
});
ractive.on('memembed_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 16);
});
ractive.on('gentdb_active', function (event) {
  ractive.set('results_panel_visible', null);
  ractive.set('results_panel_visible', 17);
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
  let psipred_job = this.get('psipred_job');
  let psipred_checked = this.get('psipred_checked');
  let disopred_job = this.get('disopred_job');
  let disopred_checked = this.get('disopred_checked');
  let memsatsvm_job = this.get('memsatsvm_job');
  let memsatsvm_checked = this.get('memsatsvm_checked');
  let pgenthreader_job = this.get('pgenthreader_job');
  let pgenthreader_checked = this.get('pgenthreader_checked');
  let mempack_job = this.get('mempack_job');
  let mempack_checked = this.get('mempack_checked');
  let genthreader_job = this.get('genthreader_job');
  let genthreader_checked = this.get('genthreader_checked');
  let dompred_job = this.get('dompred_job');
  let dompred_checked = this.get('dompred_checked');
  let pdomthreader_job = this.get('pdomthreader_job');
  let pdomthreader_checked = this.get('pdomthreader_checked');
  let bioserf_job = this.get('bioserf_job');
  let bioserf_checked = this.get('bioserf_checked');
  let domserf_job = this.get('domserf_job');
  let domserf_checked = this.get('domserf_checked');
  let ffpred_job = this.get('ffpred_job');
  let ffpred_checked = this.get('ffpred_checked');
  let metapsicov_job = this.get('metapsicov_job');
  let metapsicov_checked = this.get('metapsicov_checked');
  let metsite_job = this.get('metasite_job');
  let metsite_checked = this.get('metasite_checked');
  let hspred_job = this.get('hspred_job');
  let hspred_checked = this.get('hspred_checked');
  let memembed_job = this.get('memembed_job');
  let memembed_checked = this.get('memembed_checked');
  let gentdb_job = this.get('gentdb_job');
  let gentdb_checked = this.get('gentdb_checked');

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, seq, name, email, submit_url, times_url, psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked, mempack_checked, genthreader_checked, dompred_checked, pdomthreader_checked, bioserf_checked, domserf_checked, ffpred_checked, metapsicov_checked, metsite_checked, hspred_checked, memembed_checked, gentdb_checked);
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
  let psipred_job = this.get('psipred_job');
  let psipred_checked = this.get('psipred_checked');
  let disopred_job = this.get('disopred_job');
  let disopred_checked = this.get('disopred_checked');
  let memsatsvm_job = this.get('memsatsvm_job');
  let memsatsvm_checked = this.get('memsatsvm_checked');
  let pgenthreader_job = this.get('pgenthreader_job');
  let pgenthreader_checked = this.get('pgenthreader_checked');
  let mempack_job = this.get('mempack_job');
  let mempack_checked = this.get('mempack_checked');
  let genthreader_job = this.get('genthreader_job');
  let genthreader_checked = this.get('genthreader_checked');
  let dompred_job = this.get('dompred_job');
  let dompred_checked = this.get('dompred_checked');
  let pdomthreader_job = this.get('pdomthreader_job');
  let pdomthreader_checked = this.get('pdomthreader_checked');
  let bioserf_job = this.get('bioserf_job');
  let bioserf_checked = this.get('bioserf_checked');
  let domserf_job = this.get('domserf_job');
  let domserf_checked = this.get('domserf_checked');
  let ffpred_job = this.get('ffpred_job');
  let ffpred_checked = this.get('ffpred_checked');
  let metapsicov_job = this.get('metapsicov_job');
  let metapsicov_checked = this.get('metapsicov_checked');
  let metsite_job = this.get('metasite_job');
  let metsite_checked = this.get('metasite_checked');
  let hspred_job = this.get('hspred_job');
  let hspred_checked = this.get('hspred_checked');
  let memembed_job = this.get('memembed_job');
  let memembed_checked = this.get('memembed_checked');
  let gentdb_job = this.get('gentdb_job');
  let gentdb_checked = this.get('gentdb_checked');
  //clear what we have previously written
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ractive_helpers_ractive_helpers_js__["d" /* clear_settings */])(ractive, gear_string);
  //verify form contents and post
  //console.log(name);
  //console.log(email);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__forms_forms_index_js__["a" /* verify_and_send_form */])(ractive, subsequence, name, email, submit_url, times_url, psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked, mempack_checked, genthreader_checked, dompred_checked, pdomthreader_checked, bioserf_checked, domserf_checked, ffpred_checked, metapsicov_checked, metsite_checked, hspred_checked, memembed_checked, gentdb_checked);
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
    ractive.set('results_panel_visible', 1);
  }
  if (previous_data.jobs.includes('disopred')) {
    ractive.set('disopred_button', true);
    ractive.set('results_panel_visible', 4);
  }
  if (previous_data.jobs.includes('memsatsvm')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('results_panel_visible', 6);
  }
  if (previous_data.jobs.includes('pgenthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('results_panel_visible', 2);
  }
  if (previous_data.jobs.includes('mempack')) {
    ractive.set('memsatsvm_button', true);
    ractive.set('mempack_button', true);
    ractive.set('results_panel_visible', 5);
  }
  if (previous_data.jobs.includes('genthreader')) {
    ractive.set('genthreader_button', true);
    ractive.set('results_panel_visible', 7);
  }
  if (previous_data.jobs.includes('dompred')) {
    ractive.set('psipred_button', true);
    ractive.set('dompred_button', true);
    ractive.set('results_panel_visible', 8);
  }
  if (previous_data.jobs.includes('pdomthreader')) {
    ractive.set('psipred_button', true);
    ractive.set('pdomthreader_button', true);
    ractive.set('results_panel_visible', 9);
  }
  if (previous_data.jobs.includes('bioserf')) {
    ractive.set('psipred_button', true);
    ractive.set('pgenthreader_button', true);
    ractive.set('bioserf_button', true);
    ractive.set('results_panel_visible', 10);
  }
  if (previous_data.jobs.includes('domserf')) {
    ractive.set('psipred_button', true);
    ractive.set('pdomthreader_button', true);
    ractive.set('results_panel_visible', 12);
  }
  if (previous_data.jobs.includes('ffpred')) {
    ractive.set('psipred_button', true);
    ractive.set('disopred_button', true);
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
  if (previous_data.jobs.includes('metapsicov')) {
    ractive.set('metapsicov_button', true);
    ractive.set('results_panel_visible', 18);
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
function buildModel(alnURI) {

  let url = submit_url + ractive.get('batch_uuid');
  let mod_key = ractive.get('modeller_key');
  if (mod_key === 'M' + 'O' + 'D' + 'E' + 'L' + 'I' + 'R' + 'A' + 'N' + 'J' + 'E') {
    window.open(".." + app_path + "/model/post?aln=" + file_url + alnURI, "", "width=670,height=700");
  } else {
    alert('Please provide a valid M' + 'O' + 'D' + 'E' + 'L' + 'L' + 'E' + 'R Licence Key');
  }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verify_and_send_form;
/* unused harmony export verify_form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_index_js__ = __webpack_require__(1);




//Takes the data needed to verify the input form data, either the main form
//or the submisson widget verifies that data and then posts it to the backend.
function verify_and_send_form(ractive, seq, name, email, submit_url, times_url, psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked, mempack_checked, genthreader_checked, dompred_checked, pdomthreader_checked, bioserf_checked, domserf_checked, ffpred_checked, metapsicov_checked, metsite_checked, hspred_checked, memembed_checked, gentdb_checked) {
  /*verify that everything here is ok*/
  let error_message = null;
  let job_string = '';
  //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);

  error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked, pgenthreader_checked, mempack_checked, genthreader_checked, dompred_checked, pdomthreader_checked, bioserf_checked, domserf_checked, ffpred_checked, metapsicov_checked, metsite_checked, hspred_checked, memembed_checked, gentdb_checked]);
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
    if (pgenthreader_checked === true) {
      job_string = job_string.concat("pgenthreader,");
      ractive.set('pgenthreader_button', true);
      ractive.set('psipred_button', true);
      psipred_checked = false;
    }
    if (disopred_checked === true) {
      job_string = job_string.concat("disopred,");
      ractive.set('disopred_button', true);
      ractive.set('psipred_button', true);
      psipred_checked = false;
    }
    if (psipred_checked === true) {
      job_string = job_string.concat("psipred,");
      ractive.set('psipred_button', true);
    }
    if (memsatsvm_checked === true) {
      job_string = job_string.concat("memsatsvm,");
      ractive.set('memsatsvm_button', true);
    }
    if (mempack_checked === true) {
      job_string = job_string.concat("mempack,");
      ractive.set('mempack_button', true);
      ractive.set('memsatsvm_button', true);
    }
    if (genthreader_checked === true) {
      job_string = job_string.concat("genthreader,");
      ractive.set('genthreader_button', true);
    }
    if (dompred_checked === true) {
      job_string = job_string.concat("dompred,");
      ractive.set('dompred_button', true);
    }
    if (pdomthreader_checked === true) {
      job_string = job_string.concat("pdomthreader,");
      ractive.set('pdomthreader_button', true);
    }
    if (bioserf_checked === true) {
      job_string = job_string.concat("bioserf,");
      ractive.set('bioserf_button', true);
    }
    if (domserf_checked === true) {
      job_string = job_string.concat("domserf,");
      ractive.set('domserf_button', true);
    }
    if (ffpred_checked === true) {
      job_string = job_string.concat("ffpred,");
      ractive.set('ffpred_button', true);
    }
    if (metapsicov_checked === true) {
      job_string = job_string.concat("metapsicov,");
      ractive.set('metapsicov_button', true);
    }
    if (metsite_checked === true) {
      job_string = job_string.concat("metsite,");
      ractive.set('metsite_button', true);
    }
    if (hspred_checked === true) {
      job_string = job_string.concat("hspred,");
      ractive.set('hspred_button', true);
    }
    if (memembed_checked === true) {
      job_string = job_string.concat("memembed,");
      ractive.set('memembed_button', true);
    }
    if (gentdb_checked === true) {
      job_string = job_string.concat("gentdb,");
      ractive.set('gentdb_button', true);
    }

    job_string = job_string.slice(0, -1);
    response = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__requests_requests_index_js__["d" /* send_job */])(ractive, job_string, seq, name, email, submit_url, times_url);
    //set visibility and render panel once
    if (psipred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('psipred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
      // parse sequence and make seq plot
    } else if (disopred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('disopred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (memsatsvm_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('memsatsvm_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (pgenthreader_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('pgenthreader_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (mempack_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('mempack_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (genthreader_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('genthreader_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (dompred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('dompred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (pdomthreader_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('pdomthreader_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (bioserf_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('bioserf_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (domserf_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('domserf_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (ffpred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('ffpred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (metapsicov_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('metapsicov_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (metsite_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('metsite_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (hspred_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('hspred_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (memembed_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('memembed_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
    } else if (gentdb_checked === true && response) {
      ractive.set('results_visible', 2);
      ractive.fire('gentdb_active');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_common_index_js__["b" /* draw_empty_annotation_panel */])(ractive);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmQ5ODBkYjM2ZTM1NzMyNDk1MzIiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbImdldF9tZW1zYXRfcmFuZ2VzIiwicmVnZXgiLCJkYXRhIiwibWF0Y2giLCJleGVjIiwiaW5jbHVkZXMiLCJyZWdpb25zIiwic3BsaXQiLCJmb3JFYWNoIiwicmVnaW9uIiwiaSIsInBhcnNlSW50IiwiY29uc29sZSIsImxvZyIsInNlZyIsInBhcnNlX3NzMiIsInJhY3RpdmUiLCJmaWxlIiwiYW5ub3RhdGlvbnMiLCJnZXQiLCJsaW5lcyIsInNoaWZ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxlbmd0aCIsImxpbmUiLCJlbnRyaWVzIiwic3MiLCJzZXQiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsInR5cGUiLCJhbm5fbGlzdCIsIk9iamVjdCIsImtleXMiLCJwc2V1ZG9fdGFibGUiLCJ0b0xvd2VyQ2FzZSIsInBkYiIsInN1YnN0cmluZyIsImFsbiIsImFubiIsImlzSW5BcnJheSIsInZhbHVlIiwiYXJyYXkiLCJpbmRleE9mIiwiZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsIiwicmVzaWR1ZXMiLCJyZXMiLCJwdXNoIiwiZ2V0VXJsVmFycyIsInZhcnMiLCJwYXJ0cyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInJlcGxhY2UiLCJtIiwia2V5IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJpbXBvcnRhbnQiLCJzdHlsZSIsImdldEVtUGl4ZWxzIiwiZWxlbWVudCIsImV4dHJhQm9keSIsImNyZWF0ZUVsZW1lbnQiLCJjc3NUZXh0IiwiaW5zZXJ0QmVmb3JlIiwiYm9keSIsInRlc3RFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwiY2xlYXJfc2V0dGluZ3MiLCJnZWFyX3N0cmluZyIsImNsZWFyU2VsZWN0aW9uIiwiemlwIiwiSlNaaXAiLCJwcmVwYXJlX2Rvd25sb2Fkc19odG1sIiwiZG93bmxvYWRzX2luZm8iLCJqb2JfbmFtZSIsInBzaXByZWQiLCJoZWFkZXIiLCJtZW1zYXRzdm0iLCJwZ2VudGhyZWFkZXIiLCJtZW1wYWNrIiwiZ2VudGhyZWFkZXIiLCJkb21wcmVkIiwicGRvbXRocmVhZGVyIiwiYmlvc2VyZiIsImRvbXNlcmYiLCJmZnByZWQiLCJtZXRhcHNpY292IiwibWV0c2l0ZSIsImhzcHJlZCIsIm1lbWVtYmVkIiwiZ2VudGRiIiwiaGFuZGxlX3Jlc3VsdHMiLCJmaWxlX3VybCIsImhvcml6X3JlZ2V4Iiwic3MyX3JlZ2V4IiwibWVtc2F0X2NhcnRvb25fcmVnZXgiLCJtZW1zYXRfc2NoZW1hdGljX3JlZ2V4IiwibWVtc2F0X2RhdGFfcmVnZXgiLCJtZW1wYWNrX2NhcnRvb25fcmVnZXgiLCJtZW1wYWNrX2dyYXBoX291dCIsIm1lbXBhY2tfY29udGFjdF9yZXMiLCJtZW1wYWNrX2xpcGlkX3JlcyIsIm1lbXBhY2tfcmVzdWx0X2ZvdW5kIiwiaW1hZ2VfcmVnZXgiLCJyZXN1bHRzIiwicmVzdWx0X2RpY3QiLCJuYW1lIiwiYW5uX3NldCIsInRtcCIsImRhdGFfcGF0aCIsInBhdGgiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsImlkIiwicHJvY2Vzc19maWxlIiwiaG9yaXoiLCJzczJfbWF0Y2giLCJzczIiLCJwYmRhdCIsImNvbWIiLCJzY2hlbWVfbWF0Y2giLCJzY2hlbWF0aWMiLCJjYXJ0b29uX21hdGNoIiwiY2FydG9vbiIsIm1lbXNhdF9tYXRjaCIsImdyYXBoX21hdGNoIiwiZ3JhcGhfb3V0IiwiY29udGFjdF9tYXRjaCIsImNvbnRhY3QiLCJsaXBpZF9tYXRjaCIsImxpcGlkX291dCIsInRhYmxlIiwiYWxpZ24iLCJzZXRfZG93bmxvYWRzX3BhbmVsIiwiZG93bmxvYWRzX3N0cmluZyIsImNvbmNhdCIsInNlbmRfcmVxdWVzdCIsInVybCIsInNlbmRfZGF0YSIsInJlc3BvbnNlIiwiJCIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJ1cHBlcl9uYW1lIiwidG9VcHBlckNhc2UiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJnZXRfdGV4dCIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwiaG9zdG5hbWUiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInNlcXVlbmNlX2Zvcm1fdmlzaWJsZSIsInN0cnVjdHVyZV9mb3JtX3Zpc2libGUiLCJyZXN1bHRzX3Zpc2libGUiLCJyZXN1bHRzX3BhbmVsX3Zpc2libGUiLCJzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlIiwibW9kZWxsZXJfa2V5IiwicHNpcHJlZF9jaGVja2VkIiwicHNpcHJlZF9idXR0b24iLCJkaXNvcHJlZF9jaGVja2VkIiwiZGlzb3ByZWRfYnV0dG9uIiwibWVtc2F0c3ZtX2NoZWNrZWQiLCJtZW1zYXRzdm1fYnV0dG9uIiwicGdlbnRocmVhZGVyX2NoZWNrZWQiLCJwZ2VudGhyZWFkZXJfYnV0dG9uIiwibWVtcGFja19jaGVja2VkIiwibWVtcGFja19idXR0b24iLCJnZW50aHJlYWRlcl9jaGVja2VkIiwiZ2VudGhyZWFkZXJfYnV0dG9uIiwiZG9tcHJlZF9jaGVja2VkIiwiZG9tcHJlZF9idXR0b24iLCJwZG9tdGhyZWFkZXJfY2hlY2tlZCIsInBkb210aHJlYWRlcl9idXR0b24iLCJiaW9zZXJmX2NoZWNrZWQiLCJiaW9zZXJmX2J1dHRvbiIsImRvbXNlcmZfY2hlY2tlZCIsImRvbXNlcmZfYnV0dG9uIiwiZmZwcmVkX2NoZWNrZWQiLCJmZnByZWRfYnV0dG9uIiwibWV0c2l0ZV9jaGVja2VkIiwibWV0c2l0ZV9idXR0b24iLCJoc3ByZWRfY2hlY2tlZCIsImhzcHJlZF9idXR0b24iLCJtZW1lbWJlZF9jaGVja2VkIiwibWVtZW1iZWRfYnV0dG9uIiwiZ2VudGRiX2NoZWNrZWQiLCJnZW50ZGJfYnV0dG9uIiwibWV0YXBzaWNvdl9jaGVja2VkIiwibWV0YXBzaWNvdl9idXR0b24iLCJkb3dubG9hZF9saW5rcyIsInBzaXByZWRfam9iIiwiZGlzb3ByZWRfam9iIiwibWVtc2F0c3ZtX2pvYiIsInBnZW50aHJlYWRlcl9qb2IiLCJtZW1wYWNrX2pvYiIsImdlbnRocmVhZGVyX2pvYiIsImRvbXByZWRfam9iIiwicGRvbXRocmVhZGVyX2pvYiIsImJpb3NlcmZfam9iIiwiZG9tc2VyZl9qb2IiLCJmZnByZWRfam9iIiwibWV0c2l0ZV9qb2IiLCJoc3ByZWRfam9iIiwibWVtZW1iZWRfam9iIiwiZ2VudGRiX2pvYiIsIm1ldGFwc2ljb3Zfam9iIiwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2UiLCJwc2lwcmVkX3dhaXRpbmdfaWNvbiIsInBzaXByZWRfdGltZSIsInBzaXByZWRfaG9yaXoiLCJkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2UiLCJkaXNvcHJlZF93YWl0aW5nX2ljb24iLCJkaXNvcHJlZF90aW1lIiwiZGlzb19wcmVjaXNpb24iLCJtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlIiwibWVtc2F0c3ZtX3dhaXRpbmdfaWNvbiIsIm1lbXNhdHN2bV90aW1lIiwibWVtc2F0c3ZtX3NjaGVtYXRpYyIsIm1lbXNhdHN2bV9jYXJ0b29uIiwicGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZSIsInBnZW50aHJlYWRlcl93YWl0aW5nX2ljb24iLCJwZ2VudGhyZWFkZXJfdGltZSIsInBnZW5fdGFibGUiLCJwZ2VuX2Fubl9zZXQiLCJtZW1wYWNrX3dhaXRpbmdfbWVzc2FnZSIsIm1lbXBhY2tfd2FpdGluZ19pY29uIiwibWVtcGFja190aW1lIiwibWVtc2F0cGFja19zY2hlbWF0aWMiLCJtZW1zYXRwYWNrX2NhcnRvb24iLCJnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2UiLCJnZW50aHJlYWRlcl93YWl0aW5nX2ljb24iLCJnZW50aHJlYWRlcl90aW1lIiwiZ2VuX3RhYmxlIiwiZ2VuX2Fubl9zZXQiLCJkb21wcmVkX3dhaXRpbmdfbWVzc2FnZSIsImRvbXByZWRfd2FpdGluZ19pY29uIiwiZG9tcHJlZF90aW1lIiwiZG9tcHJlZF9kYXRhIiwicGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZSIsInBkb210aHJlYWRlcl93YWl0aW5nX2ljb24iLCJwZG9tdGhyZWFkZXJfdGltZSIsInBkb210aHJlYWRlcl9kYXRhIiwiYmlvc2VyZl93YWl0aW5nX21lc3NhZ2UiLCJiaW9zZXJmX3dhaXRpbmdfaWNvbiIsImJpb3NlcmZfdGltZSIsImJpb3NlcmZfZGF0YSIsImRvbXNlcmZfd2FpdGluZ19tZXNzYWdlIiwiZG9tc2VyZl93YWl0aW5nX2ljb24iLCJkb21zZXJmX3RpbWUiLCJkb21zZXJmX2RhdGEiLCJmZnByZWRfd2FpdGluZ19tZXNzYWdlIiwiZmZwcmVkX3dhaXRpbmdfaWNvbiIsImZmcHJlZF90aW1lIiwiZmZwcmVkX2RhdGEiLCJtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZSIsIm1ldGFwc2ljb3Zfd2FpdGluZ19pY29uIiwibWV0YXBzaWNvdl90aW1lIiwibWV0YXBzaWNvdl9kYXRhIiwibWV0c2l0ZV93YWl0aW5nX21lc3NhZ2UiLCJtZXRzaXRlX3dhaXRpbmdfaWNvbiIsIm1ldHNpdGVfdGltZSIsIm1ldHNpdGVfZGF0YSIsImhzcHJlZF93YWl0aW5nX21lc3NhZ2UiLCJoc3ByZWRfd2FpdGluZ19pY29uIiwiaHNwcmVkX3RpbWUiLCJoc3ByZWRfZGF0YSIsIm1lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZSIsIm1lbWVtYmVkX3dhaXRpbmdfaWNvbiIsIm1lbWVtYmVkX3RpbWUiLCJtZW1lbWJlZF9kYXRhIiwiZ2VudGRiX3dhaXRpbmdfbWVzc2FnZSIsImdlbnRkYl93YWl0aW5nX2ljb24iLCJnZW50ZGJfdGltZSIsImdlbnRkYl9kYXRhIiwic2VxdWVuY2UiLCJzZXF1ZW5jZV9sZW5ndGgiLCJzdWJzZXF1ZW5jZV9zdGFydCIsInN1YnNlcXVlbmNlX3N0b3AiLCJiYXRjaF91dWlkIiwidXVpZF9yZWdleCIsInV1aWRfbWF0Y2giLCJzZXFfb2JzZXJ2ZXIiLCJvYnNlcnZlIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImluaXQiLCJkZWZlciIsInNlcV9sZW5ndGgiLCJzZXFfc3RhcnQiLCJzZXFfc3RvcCIsImpvYl90eXBlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiYXRjaCIsInN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsInN1Ym1pc3Npb25fbWVzc2FnZSIsImxhc3RfbWVzc2FnZSIsImNvbnRleHQiLCJnZW5lcmF0ZUFzeW5jIiwidGhlbiIsImJsb2IiLCJzYXZlQXMiLCJldmVudCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwib3JpZ2luYWwiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0Iiwic3RvcCIsInN1YnNlcXVlbmNlIiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsImVycm9yX21lc3NhZ2UiLCJqb2Jfc3RyaW5nIiwidmVyaWZ5X2Zvcm0iLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4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RDs7QUFFRDtBQUNBLE1BQUlLLG1CQUFtQixDQUFDcFcsSUFBSTdDLEtBQUosQ0FBVSwwQkFBVixLQUF1QyxFQUF4QyxFQUE0Q3FCLE1BQW5FO0FBQ0EsTUFBSTRYLG1CQUFpQnBXLElBQUl4QixNQUF0QixHQUFnQyxJQUFuQyxFQUNBO0FBQ0V1WCxvQkFBZ0JBLGdCQUFnQix3R0FBaEM7QUFDRDtBQUNELE1BQUcsK0JBQStCSSxJQUEvQixDQUFvQ25XLEdBQXBDLENBQUgsRUFDQTtBQUNFK1Ysb0JBQWdCQSxnQkFBZ0IsaURBQWhDO0FBQ0Q7O0FBRUQsTUFBRyxpR0FBQXhVLENBQVUsSUFBVixFQUFnQjJVLGFBQWhCLE1BQW1DLEtBQXRDLEVBQTZDO0FBQzNDSCxvQkFBZ0JBLGdCQUFnQiwrQ0FBaEM7QUFDRDtBQUNELFNBQU9BLGFBQVA7QUFDRCxDIiwiZmlsZSI6InBzaXByZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmQ5ODBkYjM2ZTM1NzMyNDk1MzIiLCJcbi8vIGZvciBhIGdpdmVuIG1lbXNhdCBkYXRhIGZpbGVzIGV4dHJhY3QgY29vcmRpbmF0ZSByYW5nZXMgZ2l2ZW4gc29tZSByZWdleFxuZXhwb3J0IGZ1bmN0aW9uIGdldF9tZW1zYXRfcmFuZ2VzKHJlZ2V4LCBkYXRhKVxue1xuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZGF0YSk7XG4gICAgaWYobWF0Y2hbMV0uaW5jbHVkZXMoJywnKSlcbiAgICB7XG4gICAgICBsZXQgcmVnaW9ucyA9IG1hdGNoWzFdLnNwbGl0KCcsJyk7XG4gICAgICByZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uLCBpKXtcbiAgICAgICAgcmVnaW9uc1tpXSA9IHJlZ2lvbi5zcGxpdCgnLScpO1xuICAgICAgICByZWdpb25zW2ldWzBdID0gcGFyc2VJbnQocmVnaW9uc1tpXVswXSk7XG4gICAgICAgIHJlZ2lvbnNbaV1bMV0gPSBwYXJzZUludChyZWdpb25zW2ldWzFdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCctJykpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhtYXRjaFsxXSk7XG4gICAgICAgIGxldCBzZWcgPSBtYXRjaFsxXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcmVnaW9ucyA9IFtbXSwgXTtcbiAgICAgICAgcmVnaW9uc1swXVswXSA9IHBhcnNlSW50KHNlZ1swXSk7XG4gICAgICAgIHJlZ2lvbnNbMF1bMV0gPSBwYXJzZUludChzZWdbMV0pO1xuICAgICAgICByZXR1cm4ocmVnaW9ucyk7XG4gICAgfVxuICAgIHJldHVybihtYXRjaFsxXSk7XG59XG5cbi8vIHRha2UgYW5kIHNzMiAoZmlsZSkgYW5kIHBhcnNlIHRoZSBkZXRhaWxzIGFuZCB3cml0ZSB0aGUgbmV3IGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgYW5ub3RhdGlvbnNbaV0uc3MgPSBlbnRyaWVzWzNdO1xuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgYWxlcnQoXCJTUzIgYW5ub3RhdGlvbiBsZW5ndGggZG9lcyBub3QgbWF0Y2ggcXVlcnkgc2VxdWVuY2VcIik7XG4gICAgfVxuICAgIHJldHVybihhbm5vdGF0aW9ucyk7XG59XG5cbi8vdGFrZSB0aGUgZGlzb3ByZWQgcGJkYXQgZmlsZSwgcGFyc2UgaXQgYW5kIGFkZCB0aGUgYW5ub3RhdGlvbnMgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3BiZGF0KHJhY3RpdmUsIGZpbGUpXG57XG4gICAgbGV0IGFubm90YXRpb25zID0gcmFjdGl2ZS5nZXQoJ2Fubm90YXRpb25zJyk7XG4gICAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZihhbm5vdGF0aW9ucy5sZW5ndGggPT0gbGluZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBpZihlbnRyaWVzWzNdID09PSAnLScpe2Fubm90YXRpb25zW2ldLmRpc29wcmVkID0gJ0QnO31cbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJ14nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdQQic7fVxuICAgICAgfSk7XG4gICAgICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gICAgICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICAgIH1cbn1cblxuLy9wYXJzZSB0aGUgZGlzb3ByZWQgY29tYiBmaWxlIGFuZCBhZGQgaXQgdG8gdGhlIGFubm90YXRpb24gZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2NvbWIocmFjdGl2ZSwgZmlsZSlcbntcbiAgbGV0IHByZWNpc2lvbiA9IFtdO1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTsgbGluZXMuc2hpZnQoKTtcbiAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSwgaSl7XG4gICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgcHJlY2lzaW9uW2ldID0ge307XG4gICAgcHJlY2lzaW9uW2ldLnBvcyA9IGVudHJpZXNbMV07XG4gICAgcHJlY2lzaW9uW2ldLnByZWNpc2lvbiA9IGVudHJpZXNbNF07XG4gIH0pO1xuICByYWN0aXZlLnNldCgnZGlzb19wcmVjaXNpb24nLCBwcmVjaXNpb24pO1xuICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocHJlY2lzaW9uLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbi8vcGFyc2UgdGhlIG1lbXNhdCBvdXRwdXRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9tZW1zYXRkYXRhKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIC8vY29uc29sZS5sb2coZmlsZSk7XG4gIGxldCB0b3BvX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvVG9wb2xvZ3k6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCBzaWduYWxfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9TaWduYWxcXHNwZXB0aWRlOlxccysoLispXFxuLywgZmlsZSk7XG4gIGxldCByZWVudHJhbnRfcmVnaW9ucyA9IGdldF9tZW1zYXRfcmFuZ2VzKC9SZS1lbnRyYW50XFxzaGVsaWNlczpcXHMrKC4rPylcXG4vLCBmaWxlKTtcbiAgbGV0IHRlcm1pbmFsID0gZ2V0X21lbXNhdF9yYW5nZXMoL04tdGVybWluYWw6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIC8vY29uc29sZS5sb2coc2lnbmFsX3JlZ2lvbnMpO1xuICAvLyBjb25zb2xlLmxvZyhyZWVudHJhbnRfcmVnaW9ucyk7XG4gIGxldCBjb2lsX3R5cGUgPSAnQ1knO1xuICBpZih0ZXJtaW5hbCA9PT0gJ291dCcpXG4gIHtcbiAgICBjb2lsX3R5cGUgPSAnRUMnO1xuICB9XG4gIGxldCB0bXBfYW5ubyA9IG5ldyBBcnJheShzZXEubGVuZ3RoKTtcbiAgaWYodG9wb19yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpXG4gIHtcbiAgICBsZXQgcHJldl9lbmQgPSAwO1xuICAgIHRvcG9fcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1RNJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgICBpZihwcmV2X2VuZCA+IDApe3ByZXZfZW5kIC09IDE7fVxuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQsIHJlZ2lvblswXSk7XG4gICAgICBpZihjb2lsX3R5cGUgPT09ICdFQycpeyBjb2lsX3R5cGUgPSAnQ1knO31lbHNle2NvaWxfdHlwZSA9ICdFQyc7fVxuICAgICAgcHJldl9lbmQgPSByZWdpb25bMV0rMjtcbiAgICB9KTtcbiAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoY29pbF90eXBlLCBwcmV2X2VuZC0xLCBzZXEubGVuZ3RoKTtcblxuICB9XG4gIC8vc2lnbmFsX3JlZ2lvbnMgPSBbWzcwLDgzXSwgWzEwMiwxMTddXTtcbiAgaWYoc2lnbmFsX3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgc2lnbmFsX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdTJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgLy9yZWVudHJhbnRfcmVnaW9ucyA9IFtbNDAsNTBdLCBbMjAwLDIxOF1dO1xuICBpZihyZWVudHJhbnRfcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKXtcbiAgICByZWVudHJhbnRfcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbil7XG4gICAgICB0bXBfYW5ubyA9IHRtcF9hbm5vLmZpbGwoJ1JIJywgcmVnaW9uWzBdLCByZWdpb25bMV0rMSk7XG4gICAgfSk7XG4gIH1cbiAgdG1wX2Fubm8uZm9yRWFjaChmdW5jdGlvbihhbm5vLCBpKXtcbiAgICBhbm5vdGF0aW9uc1tpXS5tZW1zYXQgPSBhbm5vO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICBiaW9kMy5hbm5vdGF0aW9uR3JpZChhbm5vdGF0aW9ucywge3BhcmVudDogJ2Rpdi5zZXF1ZW5jZV9wbG90JywgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsIHR5cGUpXG57XG4gIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAvL2NvbnNvbGUubG9nKHR5cGUrJ19hbm5fc2V0Jyk7XG4gIGxldCBhbm5fbGlzdCA9IHJhY3RpdmUuZ2V0KHR5cGUrJ19hbm5fc2V0Jyk7XG4gIC8vY29uc29sZS5sb2coYW5uX2xpc3QpO1xuICBpZihPYmplY3Qua2V5cyhhbm5fbGlzdCkubGVuZ3RoID4gMCl7XG4gIGxldCBwc2V1ZG9fdGFibGUgPSAnPHRhYmxlIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPlxcbic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRyPjx0aD5Db25mLjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TmV0IFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5wLXZhbHVlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QYWlyRTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U29sdkU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIExlbmd0aDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U3RyIExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U2VxIExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+Rm9sZDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBDQVRIPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QREJTVU08L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsaWdubWVudDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TU9ERUw8L3RoPic7XG5cbiAgLy8gaWYgTU9ERUxMRVIgVEhJTkdZXG4gIHBzZXVkb190YWJsZSArPSAnPC90cj48dGJvZHlcIj5cXG4nO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUubGVuZ3RoID09PSAwKXtyZXR1cm47fVxuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIGlmKGVudHJpZXNbOV0rXCJfXCIraSBpbiBhbm5fbGlzdClcbiAgICB7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRyPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZCBjbGFzcz0nXCIrZW50cmllc1swXS50b0xvd2VyQ2FzZSgpK1wiJz5cIitlbnRyaWVzWzBdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1sxXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbMl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzNdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s0XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNV0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzZdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s3XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbOF0rXCI8L3RkPlwiO1xuICAgIGxldCBwZGIgPSBlbnRyaWVzWzldLnN1YnN0cmluZygwLCBlbnRyaWVzWzldLmxlbmd0aC0yKTtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vd3d3LnJjc2Iub3JnL3BkYi9leHBsb3JlL2V4cGxvcmUuZG8/c3RydWN0dXJlSWQ9XCIrcGRiK1wiJz5cIitlbnRyaWVzWzldK1wiPC9hPjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwOi8vc2NvcC5tcmMtbG1iLmNhbS5hYy51ay9zY29wL3BkYi5jZ2k/cGRiPVwiK3BkYitcIic+U0NPUCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuY2F0aGRiLmluZm8vcGRiL1wiK3BkYitcIic+Q0FUSCBTRUFSQ0g8L2E+PC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly93d3cuZWJpLmFjLnVrL3Rob3JudG9uLXNydi9kYXRhYmFzZXMvY2dpLWJpbi9wZGJzdW0vR2V0UGFnZS5wbD9wZGJjb2RlPVwiK3BkYitcIic+T3BlbiBQREJTVU08L2E+PC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0nbG9hZE5ld0FsaWdubWVudChcXFwiXCIrKGFubl9saXN0W2VudHJpZXNbOV0rXCJfXCIraV0uYWxuKStcIlxcXCIsXFxcIlwiKyhhbm5fbGlzdFtlbnRyaWVzWzldK1wiX1wiK2ldLmFubikrXCJcXFwiLFxcXCJcIisoZW50cmllc1s5XStcIl9cIitpKStcIlxcXCIpOycgdmFsdWU9J0Rpc3BsYXkgQWxpZ25tZW50JyAvPjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nYnV0dG9uJyB0eXBlPSdidXR0b24nIG9uQ2xpY2s9J2J1aWxkTW9kZWwoXFxcIlwiKyhhbm5fbGlzdFtlbnRyaWVzWzldK1wiX1wiK2ldLmFsbikrXCJcXFwiKTsnIHZhbHVlPSdCdWlsZCBNb2RlbCcgLz48L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjwvdHI+XFxuXCI7XG4gICAgfVxuICB9KTtcbiAgcHNldWRvX3RhYmxlICs9IFwiPC90Ym9keT48L3RhYmxlPlxcblwiO1xuICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIHBzZXVkb190YWJsZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgICByYWN0aXZlLnNldCh0eXBlK1wiX3RhYmxlXCIsIFwiPGgzPk5vIGdvb2QgaGl0cyBmb3VuZC4gR1VFU1MgYW5kIExPVyBjb25maWRlbmNlIGhpdHMgY2FuIGJlIGZvdW5kIGluIHRoZSByZXN1bHRzIGZpbGU8L2gzPlwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG59XG5cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nKXtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIpO1xuICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMSk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgJycpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIFBTSVBSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRElTT1BSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnZGlzb3ByZWRfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnZGlzb3ByZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNRU1TQVQtU1ZNIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIHBHZW5USFJFQURFUiBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl9zZXQnLCB7fSk7XG5cbiAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNRU1QQUNLIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnbWVtcGFja190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBHZW5USFJFQURFUiBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIERvbVBSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBwRG9tVEhSRUFERVIgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIEJpb1NlcmYgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRG9tU2VyZiBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIEZGUHJlZCBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTWV0YVBTSUNPViBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNZXRTaXRlIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgSFNQcmVkIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTUVNRU1CRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIFREQiBnZW5lcmF0aW9uIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdnZW50ZGJfdGltZScsICdMb2FkaW5nIERhdGEnKTtcblxuICAvL3JhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvKVxue1xuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwc2lwcmVkJykpXG4gIHtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5Qc2lwcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gIH1cbiAgaWYoZGF0YS5qb2JfbmFtZS5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyID0gXCI8aDU+RGlzb1ByZWREIERPV05MT0FEUzwvaDU+XCI7XG4gIH1cbiAgaWYoZGF0YS5qb2JfbmFtZS5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm09IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5NRU1TQVRTVk0gRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXI9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5wR2VuVEhSRUFERVIgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZW1wYWNrJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1Pk1FTVNBVFNWTSBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2sgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlciA9IFwiPGg1Pk1FTVBBQ0sgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpKXtcbiAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+R2VuVEhSRUFERVIgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdkb21wcmVkJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwZG9tdGhyZWFkZXInKSl7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBEb21USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ2Jpb3NlcmYnKSl7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBHZW5USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmY9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyID0gXCI8aDU+QmlvU2VyZiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ2RvbXNlcmYnKSl7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBEb21USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmY9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+RG9tU2VyZiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ2ZmcHJlZCcpKXtcbiAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmhlYWRlciA9IFwiPGg1PkRpc29QcmVkRCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5mZnByZWQ9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5GRlByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZXRhcHNpY292Jykpe1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292PSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmhlYWRlciA9IFwiPGg1Pk1ldGFQU0lDT1YgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZXRzaXRlJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLmhlYWRlciA9IFwiPGg1Pk1ldHNpdGUgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdoc3ByZWQnKSl7XG4gICAgZG93bmxvYWRzX2luZm8uaHNwcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlciA9IFwiPGg1PkhTUHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ21lbWVtYmVkJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbWVtYmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8ubWVtZW1iZWQuaGVhZGVyID0gXCI8aDU+TUVNRU1CRUQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdnZW50ZGInKSl7XG4gICAgZG93bmxvYWRzX2luZm8uZ2VudGRiID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZ2VudGRiLmhlYWRlciA9IFwiPGg1PlREQiBET1dOTE9BRDwvaDU+XCI7XG4gIH1cblxufVxuXG4vL3Rha2UgdGhlIGRhdGFibG9iIHdlJ3ZlIGdvdCBhbmQgbG9vcCBvdmVyIHRoZSByZXN1bHRzXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8pXG57XG4gIGxldCBob3Jpel9yZWdleCA9IC9cXC5ob3JpeiQvO1xuICBsZXQgc3MyX3JlZ2V4ID0gL1xcLnNzMiQvO1xuICBsZXQgbWVtc2F0X2NhcnRvb25fcmVnZXggPSAvX2NhcnRvb25fbWVtc2F0X3N2bVxcLnBuZyQvO1xuICBsZXQgbWVtc2F0X3NjaGVtYXRpY19yZWdleCA9IC9fc2NoZW1hdGljXFwucG5nJC87XG4gIGxldCBtZW1zYXRfZGF0YV9yZWdleCA9IC9tZW1zYXRfc3ZtJC87XG4gIGxldCBtZW1wYWNrX2NhcnRvb25fcmVnZXggPSAvS2FtYWRhLUthd2FpX1xcZCsucG5nJC87XG4gIGxldCBtZW1wYWNrX2dyYXBoX291dCA9IC9pbnB1dF9ncmFwaC5vdXQkLztcbiAgbGV0IG1lbXBhY2tfY29udGFjdF9yZXMgPSAvQ09OVEFDVF9ERUYxLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfbGlwaWRfcmVzID0gL0xJUElEX0VYUE9TVVJFLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZ2VuX2dlbmFsaWdubWVudF9hbm5vdGF0aW9uJylcbiAgICB7XG4gICAgICAgIGxldCBhbm5fc2V0ID0gcmFjdGl2ZS5nZXQoXCJnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwiZ2VuX2Fubl9zZXRcIiwgYW5uX3NldCk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgLy9wc2lwcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PSAncHNpcGFzczInKVxuICAgIHtcbiAgICAgIGxldCBtYXRjaCA9IGhvcml6X3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1hdGNoKVxuICAgICAge1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2hvcml6JywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaG9yaXogPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Ib3JpeiBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfdGltZVwiLCAnJyk7XG4gICAgICB9XG4gICAgICBsZXQgc3MyX21hdGNoID0gc3MyX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNzMl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5zczIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TUzIgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3NzMicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vZGlzb3ByZWQgZmlsZXNcbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19mb3JtYXQnKVxuICAgIHtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncGJkYXQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQucGJkYXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5QQkRBVCBGb3JtYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImRpc29wcmVkX3RpbWVcIiwgJycpO1xuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnZGlzb19jb21iaW5lJylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ2NvbWInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuY29tYiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNPTUIgTk4gT3V0cHV0PC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ21lbXNhdHN2bScpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV90aW1lXCIsICcnKTtcbiAgICAgIGxldCBzY2hlbWVfbWF0Y2ggPSBtZW1zYXRfc2NoZW1hdGljX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKHNjaGVtZV9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLnNjaGVtYXRpYyA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPlNjaGVtYXRpYyBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9IG1lbXNhdF9jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICc8aW1nIHNyYz1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIiAvPicpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IG1lbXNhdF9tYXRjaCA9IG1lbXNhdF9kYXRhX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKG1lbXNhdF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdtZW1zYXRkYXRhJywgemlwLCByYWN0aXZlKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5NZW1zYXQgT3V0cHV0PC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1wYWNrX3dyYXBwZXInKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfdGltZVwiLCAnJyk7XG4gICAgICBsZXQgY2FydG9vbl9tYXRjaCA9ICBtZW1wYWNrX2NhcnRvb25fcmVnZXguZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoY2FydG9vbl9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgbWVtcGFja19yZXN1bHRfZm91bmQgPSB0cnVlO1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtcGFja19jYXJ0b29uJywgJzxpbWcgd2lkdGg9XCIxMDAwcHhcIiBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5jYXJ0b29uID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+Q2FydG9vbiBEaWFncmFtPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgZ3JhcGhfbWF0Y2ggPSAgbWVtcGFja19ncmFwaF9vdXQuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYoZ3JhcGhfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suZ3JhcGhfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+RGlhZ3JhbSBEYXRhPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgY29udGFjdF9tYXRjaCA9ICBtZW1wYWNrX2NvbnRhY3RfcmVzLmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNvbnRhY3RfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNvbnRhY3QgUHJlZGljdGlvbnM8L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBsaXBpZF9tYXRjaCA9ICBtZW1wYWNrX2xpcGlkX3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihsaXBpZF9tYXRjaClcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtcGFjay5saXBpZF9vdXQgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5MaXBpZCBFeHBvc3VyZSBQcmVkaXRpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG5cbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3NvcnRfcHJlc3VsdCcpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl90aW1lXCIsICcnKTtcbiAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAncHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIudGFibGUgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5wR2VuVEhSRUFERVIgVGFibGU8L2E+PGJyIC8+JztcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2dlbl9zb3J0X3ByZXN1bHRzJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3dhaXRpbmdfaWNvblwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcImdlbnRocmVhZGVyX3RpbWVcIiwgJycpO1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdnZW5fcHJlc3VsdCcsIHppcCwgcmFjdGl2ZSk7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdlblRIUkVBREVSIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ3BzZXVkb19iYXNfYWxpZ24nKVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPnBHZW5USFJFQURFUiBBbGlnbm1lbnRzPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdnZW50aHJlYWRlcl9wc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5hbGlnbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkdlblRIUkVBREVSIEFsaWdubWVudHM8L2E+PGJyIC8+JztcbiAgICB9XG4gIH1cbiAgaWYoISBtZW1wYWNrX3Jlc3VsdF9mb3VuZClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2NhcnRvb24nLCAnPGgzPk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTwvaDM+Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9kb3dubG9hZHNfcGFuZWwocmFjdGl2ZSwgZG93bmxvYWRzX2luZm8pXG57XG4gIGNvbnNvbGUubG9nKGRvd25sb2Fkc19pbmZvKTtcbiAgbGV0IGRvd25sb2Fkc19zdHJpbmcgPSByYWN0aXZlLmdldCgnZG93bmxvYWRfbGlua3MnKTtcbiAgaWYoJ3BzaXByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2dlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlci50YWJsZSk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXBhY2snIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suaGVhZGVyKTtcbiAgICBpZihkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pXG4gICAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTxiciAvPlwiKTtcbiAgICB9XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG5cbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgZG93bmxvYWRzX3N0cmluZyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsImltcG9ydCB7IGdldF9tZW1zYXRfcmFuZ2VzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3NzMiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYmRhdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9jb21iIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21lbXNhdGRhdGEgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcHJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5cblxuLy9naXZlbiBhIHVybCwgaHR0cCByZXF1ZXN0IHR5cGUgYW5kIHNvbWUgZm9ybSBkYXRhIG1ha2UgYW4gaHR0cCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc2VuZF9yZXF1ZXN0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuICBjb25zb2xlLmxvZygnU2VuZGluZyBVUkkgcmVxdWVzdCcpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgeW91ciBzdWJtaXNzaW9uLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7XG4gIH19KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIGNvbnNvbGUubG9nKGpvYl9uYW1lKTtcbiAgdmFyIGZpbGUgPSBudWxsO1xuICBsZXQgdXBwZXJfbmFtZSA9IGpvYl9uYW1lLnRvVXBwZXJDYXNlKCk7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBmZC5hcHBlbmQoXCJpbnB1dF9kYXRhXCIsIGZpbGUsICdpbnB1dC50eHQnKTtcbiAgZmQuYXBwZW5kKFwiam9iXCIsam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJzdWJtaXNzaW9uX25hbWVcIixuYW1lKTtcbiAgZmQuYXBwZW5kKFwiZW1haWxcIiwgZW1haWwpO1xuXG4gIGxldCByZXNwb25zZV9kYXRhID0gc2VuZF9yZXF1ZXN0KHN1Ym1pdF91cmwsIFwiUE9TVFwiLCBmZCk7XG4gIGlmKHJlc3BvbnNlX2RhdGEgIT09IG51bGwpXG4gIHtcbiAgICBsZXQgdGltZXMgPSBzZW5kX3JlcXVlc3QodGltZXNfdXJsLCdHRVQnLHt9KTtcbiAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHRpbWVzKSk7XG4gICAgaWYoam9iX25hbWUgaW4gdGltZXMpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgdXBwZXJfbmFtZStcIiBqb2JzIHR5cGljYWxseSB0YWtlIFwiK3RpbWVzW2pvYl9uYW1lXStcIiBzZWNvbmRzXCIpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgXCJVbmFibGUgdG8gcmV0cmlldmUgYXZlcmFnZSB0aW1lIGZvciBcIit1cHBlcl9uYW1lK1wiIGpvYnMuXCIpO1xuICAgIH1cbiAgICBmb3IodmFyIGsgaW4gcmVzcG9uc2VfZGF0YSlcbiAgICB7XG4gICAgICBpZihrID09IFwiVVVJRFwiKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsIHJlc3BvbnNlX2RhdGFba10pO1xuICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIGpvYl9uYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHNlcXVlbmNlIGZyb20gYSBwcmV2aW91cyBzdWJtaXNzaW9uIGlzIHRoZVxuLy9wYWdlIHdhcyBsb2FkZWQgd2l0aCBhIFVVSURcbmV4cG9ydCBmdW5jdGlvbiBnZXRfcHJldmlvdXNfZGF0YSh1dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSlcbntcbiAgICBjb25zb2xlLmxvZygnUmVxdWVzdGluZyBkZXRhaWxzIGdpdmVuIFVSSScpO1xuICAgIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgLy9hbGVydCh1cmwpO1xuICAgIGxldCBzdWJtaXNzaW9uX3Jlc3BvbnNlID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGlmKCEgc3VibWlzc2lvbl9yZXNwb25zZSl7YWxlcnQoXCJOTyBTVUJNSVNTSU9OIERBVEFcIik7fVxuICAgIGxldCBzZXEgPSBnZXRfdGV4dChmaWxlX3VybCtzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmlucHV0X2ZpbGUsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgam9icyA9ICcnO1xuICAgIHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihzdWJtaXNzaW9uKXtcbiAgICAgIGpvYnMgKz0gc3VibWlzc2lvbi5qb2JfbmFtZStcIixcIjtcbiAgICB9KTtcbiAgICBqb2JzID0gam9icy5zbGljZSgwLCAtMSk7XG4gICAgcmV0dXJuKHsnc2VxJzogc2VxLCAnZW1haWwnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmVtYWlsLCAnbmFtZSc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uc3VibWlzc2lvbl9uYW1lLCAnam9icyc6IGpvYnN9KTtcbn1cblxuXG4vL2dldCB0ZXh0IGNvbnRlbnRzIGZyb20gYSByZXN1bHQgVVJJXG5mdW5jdGlvbiBnZXRfdGV4dCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcblxuIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgLy9kYXRhVHlwZTogXCJ0eHRcIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gcmVxdWVzdCBpbnB1dCBkYXRhIHRleHRcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiR2V0dGluZ3MgcmVzdWx0cyB0ZXh0IGZhaWxlZC4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpO31cbiAgfSk7XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cblxuLy9wb2xscyB0aGUgYmFja2VuZCB0byBnZXQgcmVzdWx0cyBhbmQgdGhlbiBwYXJzZXMgdGhvc2UgcmVzdWx0cyB0byBkaXNwbGF5XG4vL3RoZW0gb24gdGhlIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzX2ZpbGUodXJsX3N0dWIsIHBhdGgsIGN0bCwgemlwLCByYWN0aXZlKVxue1xuICBsZXQgdXJsID0gdXJsX3N0dWIgKyBwYXRoO1xuICBsZXQgcGF0aF9iaXRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIC8vZ2V0IGEgcmVzdWx0cyBmaWxlIGFuZCBwdXNoIHRoZSBkYXRhIGluIHRvIHRoZSBiaW8zZCBvYmplY3RcbiAgLy9hbGVydCh1cmwpO1xuICBjb25zb2xlLmxvZygnR2V0dGluZyBSZXN1bHRzIEZpbGUgYW5kIHByb2Nlc3NpbmcnKTtcbiAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBhc3luYzogICB0cnVlLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZmlsZSlcbiAgICB7XG4gICAgICB6aXAuZm9sZGVyKHBhdGhfYml0c1sxXSkuZmlsZShwYXRoX2JpdHNbMl0sIGZpbGUpO1xuICAgICAgaWYoY3RsID09PSAnaG9yaXonKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsIGZpbGUpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlLCAncGdlbicpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnZ2VuX3ByZXN1bHQnKVxuICAgICAge1xuICAgICAgICBwYXJzZV9wcmVzdWx0KHJhY3RpdmUsIGZpbGUsICdnZW4nKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChKU09OLnN0cmluZ2lmeShlcnJvcikpO31cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGNsZWFyX3NldHRpbmdzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHByZXBhcmVfZG93bmxvYWRzX2h0bWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgaGFuZGxlX3Jlc3VsdHMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2V0X2Rvd25sb2Fkc19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG4vLyBERUNMQVJFIFZBUklBQkxFUyBhbmQgaW5pdCByYWN0aXZlIGluc3RhbmNlXG52YXIgcmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgZWw6ICcjcHNpcHJlZF9zaXRlJyxcbiAgdGVtcGxhdGU6ICcjZm9ybV90ZW1wbGF0ZScsXG4gIGRhdGE6IHtcbiAgICAgICAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgICAgICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICAgICAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgICAgICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgICAgICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgICAgICAgbW9kZWxsZXJfa2V5OiBudWxsLFxuXG4gICAgICAgICAgcHNpcHJlZF9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBwc2lwcmVkX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgZGlzb3ByZWRfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgZGlzb3ByZWRfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICBtZW1zYXRzdm1fY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgbWVtc2F0c3ZtX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgcGdlbnRocmVhZGVyX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl9idXR0b246IGZhbHNlLFxuICAgICAgICAgIG1lbXBhY2tfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgbWVtcGFja19idXR0b246IGZhbHNlLFxuICAgICAgICAgIGdlbnRocmVhZGVyX2NoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgZ2VudGhyZWFkZXJfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICBkb21wcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIGRvbXByZWRfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICBwZG9tdGhyZWFkZXJfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgcGRvbXRocmVhZGVyX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgYmlvc2VyZl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBiaW9zZXJmX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgZG9tc2VyZl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBkb21zZXJmX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgZmZwcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIGZmcHJlZF9idXR0b246IGZhbHNlLFxuICAgICAgICAgIG1ldHNpdGVfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgbWV0c2l0ZV9idXR0b246IGZhbHNlLFxuICAgICAgICAgIGhzcHJlZF9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBoc3ByZWRfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICBtZW1lbWJlZF9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBtZW1lbWJlZF9idXR0b246IGZhbHNlLFxuICAgICAgICAgIGdlbnRkYl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBnZW50ZGJfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICBtZXRhcHNpY292X2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIG1ldGFwc2ljb3ZfYnV0dG9uOiBmYWxzZSxcblxuICAgICAgICAgIC8vIHBnZW50aHJlYWRlcl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAvLyBwZG9tdGhyZWFkZXJfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgLy8gZG9tcHJlZF9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAvLyBtZW1wYWNrX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIGZmcHJlZF9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAvLyBiaW9zZXJmX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIGRvbXNlcmZfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgZG93bmxvYWRfbGlua3M6ICcnLFxuICAgICAgICAgIHBzaXByZWRfam9iOiAncHNpcHJlZF9qb2InLFxuICAgICAgICAgIGRpc29wcmVkX2pvYjogJ2Rpc29wcmVkX2pvYicsXG4gICAgICAgICAgbWVtc2F0c3ZtX2pvYjogJ21lbXNhdHN2bV9qb2InLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl9qb2I6ICdwZ2VudGhyZWFkZXJfam9iJyxcbiAgICAgICAgICBtZW1wYWNrX2pvYjogJ21lbXBhY2tfam9iJyxcbiAgICAgICAgICBnZW50aHJlYWRlcl9qb2I6ICdnZW50aHJlYWRlcl9qb2InLFxuICAgICAgICAgIGRvbXByZWRfam9iOiAnZG9tcHJlZF9qb2InLFxuICAgICAgICAgIHBkb210aHJlYWRlcl9qb2I6ICdwZG9tdGhyZWFkZXJfam9iJyxcbiAgICAgICAgICBiaW9zZXJmX2pvYjogJ2Jpb3NlcmZfam9iJyxcbiAgICAgICAgICBkb21zZXJmX2pvYjogJ2RvbXNlcmZfam9iJyxcbiAgICAgICAgICBmZnByZWRfam9iOiAnZmZwcmVkX2pvYicsXG4gICAgICAgICAgbWV0c2l0ZV9qb2I6ICdtZXRzaXRlX2pvYicsXG4gICAgICAgICAgaHNwcmVkX2pvYjogJ2hzcHJlZF9qb2InLFxuICAgICAgICAgIG1lbWVtYmVkX2pvYjogJ21lbWVtYmVkX2pvYicsXG4gICAgICAgICAgZ2VudGRiX2pvYjogJ2dlbnRkYl9qb2InLFxuICAgICAgICAgIG1ldGFwc2ljb3Zfam9iOiAnbWV0YXBzaWNvdl9qb2InLFxuXG5cbiAgICAgICAgICBwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBQU0lQUkVEIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIHBzaXByZWRfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBwc2lwcmVkX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIHBzaXByZWRfaG9yaXo6IG51bGwsXG5cbiAgICAgICAgICBkaXNvcHJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRElTT1BSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgZGlzb3ByZWRfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBkaXNvcHJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBkaXNvX3ByZWNpc2lvbjogbnVsbCxcblxuICAgICAgICAgIG1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTUVNU0FULVNWTSBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBtZW1zYXRzdm1fd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBtZW1zYXRzdm1fdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgbWVtc2F0c3ZtX3NjaGVtYXRpYzogJycsXG4gICAgICAgICAgbWVtc2F0c3ZtX2NhcnRvb246ICcnLFxuXG4gICAgICAgICAgcGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBwR2VuVEhSRUFERVIgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgcGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgcGdlbnRocmVhZGVyX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIHBnZW5fdGFibGU6IG51bGwsXG4gICAgICAgICAgcGdlbl9hbm5fc2V0OiB7fSxcblxuICAgICAgICAgIG1lbXBhY2tfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIE1FTVBBQ0sgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgbWVtcGFja193YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIG1lbXBhY2tfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgbWVtc2F0cGFja19zY2hlbWF0aWM6ICcnLFxuICAgICAgICAgIG1lbXNhdHBhY2tfY2FydG9vbjogJycsXG5cbiAgICAgICAgICBnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgR2VuVEhSRUFERVIgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBnZW50aHJlYWRlcl90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBnZW5fdGFibGU6IG51bGwsXG4gICAgICAgICAgZ2VuX2Fubl9zZXQ6IHt9LFxuXG4gICAgICAgICAgZG9tcHJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRE9NUFJFRCBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBkb21wcmVkX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgZG9tcHJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBkb21wcmVkX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIHBEb21USFJFQURFUiBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBwZG9tdGhyZWFkZXJfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgcGRvbXRocmVhZGVyX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBiaW9zZXJmX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBCaW9TZXJmIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGJpb3NlcmZfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBiaW9zZXJmX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIGJpb3NlcmZfZGF0YTogbnVsbCxcblxuICAgICAgICAgIGRvbXNlcmZfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIERvbVNlcmYgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgZG9tc2VyZl93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIGRvbXNlcmZfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgZG9tc2VyZl9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgZmZwcmVkX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBGRlByZWQgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgZmZwcmVkX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgZmZwcmVkX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIGZmcHJlZF9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgbWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTWV0YVBTSUNPViBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBtZXRhcHNpY292X3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgbWV0YXBzaWNvdl90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBtZXRhcHNpY292X2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBtZXRzaXRlX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNZXRTaXRlIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIG1ldHNpdGVfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBtZXRzaXRlX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIG1ldHNpdGVfZGF0YTogbnVsbCxcblxuICAgICAgICAgIGhzcHJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgSFNQcmVkIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGhzcHJlZF93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIGhzcHJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBoc3ByZWRfZGF0YTogbnVsbCxcblxuICAgICAgICAgIG1lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNRU1FTUJFRCBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBtZW1lbWJlZF93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIG1lbWVtYmVkX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIG1lbWVtYmVkX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBnZW50ZGJfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciBUREIgR2VuZXJhdGlvbiBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBnZW50ZGJfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBnZW50ZGJfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgZ2VudGRiX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICAvLyBTZXF1ZW5jZSBhbmQgam9iIGluZm9cbiAgICAgICAgICBzZXF1ZW5jZTogJycsXG4gICAgICAgICAgc2VxdWVuY2VfbGVuZ3RoOiAxLFxuICAgICAgICAgIHN1YnNlcXVlbmNlX3N0YXJ0OiAxLFxuICAgICAgICAgIHN1YnNlcXVlbmNlX3N0b3A6IDEsXG4gICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgIGJhdGNoX3V1aWQ6IG51bGwsXG5cbiAgICAgICAgICAvL2hvbGQgYW5ub3RhdGlvbnMgdGhhdCBhcmUgcmVhZCBmcm9tIGRhdGFmaWxlc1xuICAgICAgICAgIGFubm90YXRpb25zOiBudWxsLFxuICAgICAgICB9XG59KTtcblxuLy9zZXQgc29tZSB0aGluZ3Mgb24gdGhlIHBhZ2UgZm9yIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXJcbmlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiKSB7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcsICdkYW5pZWwuYnVjaGFuQHVjbC5hYy51aycpO1xuICByYWN0aXZlLnNldCgnbmFtZScsICd0ZXN0Jyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsICdRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBU0RRV0VBUycpO1xufVxuXG4vLzRiNmFkNzkyLWVkMWYtMTFlNS04OTg2LTk4OTA5NmMxM2VlNlxubGV0IHV1aWRfcmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xubGV0IHV1aWRfbWF0Y2ggPSB1dWlkX3JlZ2V4LmV4ZWMoZ2V0VXJsVmFycygpLnV1aWQpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy9cbi8vIEFQUExJQ0FUSU9OIEhFUkVcbi8vXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vL0hlcmUgd2VyZSBrZWVwIGFuIGV5ZSBvbiBzb21lIGZvcm0gZWxlbWVudHMgYW5kIHJld3JpdGUgdGhlIG5hbWUgaWYgcGVvcGxlXG4vL2hhdmUgcHJvdmlkZWQgYSBmYXN0YSBmb3JtYXR0ZWQgc2VxXG5sZXQgc2VxX29ic2VydmVyID0gcmFjdGl2ZS5vYnNlcnZlKCdzZXF1ZW5jZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSApIHtcbiAgbGV0IHJlZ2V4ID0gL14+KC4rPylcXHMvO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKG5ld1ZhbHVlKTtcbiAgaWYobWF0Y2gpXG4gIHtcbiAgICB0aGlzLnNldCgnbmFtZScsIG1hdGNoWzFdKTtcbiAgfVxuICAvLyBlbHNlIHtcbiAgLy8gICB0aGlzLnNldCgnbmFtZScsIG51bGwpO1xuICAvLyB9XG5cbiAgfSxcbiAge2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9KTtcbi8vdGhlc2VzIHR3byBvYnNlcnZlcnMgc3RvcCBwZW9wbGUgc2V0dGluZyB0aGUgcmVzdWJtaXNzaW9uIHdpZGdldCBvdXQgb2YgYm91bmRzXG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdG9wJywgZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgbGV0IHNlcV9sZW5ndGggPSByYWN0aXZlLmdldCgnc2VxdWVuY2VfbGVuZ3RoJyk7XG4gIGxldCBzZXFfc3RhcnQgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RhcnQnKTtcbiAgaWYodmFsdWUgPiBzZXFfbGVuZ3RoKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfbGVuZ3RoKTtcbiAgfVxuICBpZih2YWx1ZSA8PSBzZXFfc3RhcnQpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHNlcV9zdGFydCsxKTtcbiAgfVxufSk7XG5yYWN0aXZlLm9ic2VydmUoICdzdWJzZXF1ZW5jZV9zdGFydCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfc3RvcCA9IHJhY3RpdmUuZ2V0KCdzdWJzZXF1ZW5jZV9zdG9wJyk7XG4gIGlmKHZhbHVlIDwgMSlcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIDEpO1xuICB9XG4gIGlmKHZhbHVlID49IHNlcV9zdG9wKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jywgc2VxX3N0b3AtMSk7XG4gIH1cbn0pO1xuXG4vL0FmdGVyIGEgam9iIGhhcyBiZWVuIHNlbnQgb3IgYSBVUkwgYWNjZXB0ZWQgdGhpcyByYWN0aXZlIGJsb2NrIGlzIGNhbGxlZCB0b1xuLy9wb2xsIHRoZSBiYWNrZW5kIHRvIGdldCB0aGUgcmVzdWx0c1xucmFjdGl2ZS5vbigncG9sbF90cmlnZ2VyJywgZnVuY3Rpb24obmFtZSwgam9iX3R5cGUpe1xuICBjb25zb2xlLmxvZyhcIlBvbGxpbmcgYmFja2VuZCBmb3IgcmVzdWx0c1wiKTtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwgKyByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYXBwX3BhdGgrJy8mdXVpZD0nK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJykpO1xuICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG5cbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICBsZXQgYmF0Y2ggPSBzZW5kX3JlcXVlc3QodXJsLCBcIkdFVFwiLCB7fSk7XG4gICAgbGV0IGRvd25sb2Fkc19pbmZvID0ge307XG5cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0NvbXBsZXRlJylcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJlbmRlciByZXN1bHRzXCIpO1xuICAgICAgbGV0IHN1Ym1pc3Npb25zID0gYmF0Y2guc3VibWlzc2lvbnM7XG4gICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHByZXBhcmVfZG93bmxvYWRzX2h0bWwoZGF0YSwgZG93bmxvYWRzX2luZm8pO1xuICAgICAgICAgIGhhbmRsZV9yZXN1bHRzKHJhY3RpdmUsIGRhdGEsIGZpbGVfdXJsLCB6aXAsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgfSk7XG4gICAgICBzZXRfZG93bmxvYWRzX3BhbmVsKHJhY3RpdmUsIGRvd25sb2Fkc19pbmZvKTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICAgIGlmKGJhdGNoLnN0YXRlID09PSAnRXJyb3InIHx8IGJhdGNoLnN0YXRlID09PSAnQ3Jhc2gnKVxuICAgIHtcbiAgICAgIGxldCBzdWJtaXNzaW9uX21lc3NhZ2UgPSBiYXRjaC5zdWJtaXNzaW9uc1swXS5sYXN0X21lc3NhZ2U7XG4gICAgICBhbGVydChcIlBPTExJTkcgRVJST1I6IEpvYiBGYWlsZWRcXG5cIitcbiAgICAgICAgICAgIFwiUGxlYXNlIENvbnRhY3QgcHNpcHJlZEBjcy51Y2wuYWMudWsgcXVvdGluZyB0aGlzIGVycm9yIG1lc3NhZ2UgYW5kIHlvdXIgam9iIElEXFxuXCIrc3VibWlzc2lvbl9tZXNzYWdlKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9LCA1MDAwKTtcblxufSx7aW5pdDogZmFsc2UsXG4gICBkZWZlcjogdHJ1ZVxuIH1cbik7XG5cbi8vIE9uIGNsaWNraW5nIHRoZSBHZXQgWmlwIGZpbGUgbGluayB0aGlzIHdhdGNoZXJzIHByZXBhcmVzIHRoZSB6aXAgYW5kIGhhbmRzIGl0IHRvIHRoZSB1c2VyXG5yYWN0aXZlLm9uKCdnZXRfemlwJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgdXVpZCA9IHJhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgemlwLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCJ9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHNhdmVBcyhibG9iLCB1dWlkK1wiLnppcFwiKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBUaGVzZSByZWFjdCB0byB0aGUgaGVhZGVycyBiZWluZyBjbGlja2VkIHRvIHRvZ2dsZSB0aGUgcmVzdWx0cyBwYW5lbFxuLy9cbnJhY3RpdmUub24oICdzZXF1ZW5jZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoICdwc2lwcmVkX2NoZWNrZWQnLCB0cnVlKTtcbiAgcmFjdGl2ZS5zZXQoICdkaXNvcHJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ21lbXNhdHN2bV9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ3BnZW50aHJlYWRlcl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ21lbXBhY2tfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdnZW50aHJlYWRlcl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2RvbXByZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdwZG9tdGhyZWFkZXJfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdiaW9zZXJmX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZG9tc2VyZl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2ZmcHJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ21ldGFwc2ljb3ZfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZXRzaXRlX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnaHNwcmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnbWVtZW1iZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdnZW50ZGJfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5yYWN0aXZlLm9uKCAnc3RydWN0dXJlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDAgKTtcbiAgcmFjdGl2ZS5zZXQoICdwc2lwcmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZGlzb3ByZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZW1zYXRzdm1fY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdwZ2VudGhyZWFkZXJfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZW1wYWNrX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZ2VudGhyZWFkZXJfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdkb21wcmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAncGRvbXRocmVhZGVyX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnYmlvc2VyZl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2RvbXNlcmZfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdmZnByZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZXRhcHNpY292X2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnbWV0c2l0ZV9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2hzcHJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ21lbWVtYmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZ2VudGRiX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgMSApO1xufSk7XG5cbnJhY3RpdmUub24oICdkb3dubG9hZHNfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTEgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ3BzaXByZWRfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMSApO1xuICBpZihyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpKVxuICB7XG4gICAgYmlvZDMucHNpcHJlZChyYWN0aXZlLmdldCgncHNpcHJlZF9ob3JpeicpLCAncHNpcHJlZENoYXJ0Jywge3BhcmVudDogJ2Rpdi5wc2lwcmVkX2NhcnRvb24nLCBtYXJnaW5fc2NhbGVyOiAyfSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbiggJ2Rpc29wcmVkX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDQgKTtcbiAgaWYocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJykpXG4gIHtcbiAgICBiaW9kMy5nZW5lcmljeHlMaW5lQ2hhcnQocmFjdGl2ZS5nZXQoJ2Rpc29fcHJlY2lzaW9uJyksICdwb3MnLCBbJ3ByZWNpc2lvbiddLCBbJ0JsYWNrJyxdLCAnRGlzb05OQ2hhcnQnLCB7cGFyZW50OiAnZGl2LmNvbWJfcGxvdCcsIGNoYXJ0VHlwZTogJ2xpbmUnLCB5X2N1dG9mZjogMC41LCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vbiggJ21lbXNhdHN2bV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2ICk7XG59KTtcbnJhY3RpdmUub24oICdwZ2VudGhyZWFkZXJfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMiApO1xufSk7XG5yYWN0aXZlLm9uKCAnbWVtcGFja19hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA1ICk7XG59KTtcbnJhY3RpdmUub24oICdnZW50aHJlYWRlcl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3ICk7XG59KTtcbnJhY3RpdmUub24oICdkb21wcmVkX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDggKTtcbn0pO1xucmFjdGl2ZS5vbiggJ3Bkb210aHJlYWRlcl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA5ICk7XG59KTtcbnJhY3RpdmUub24oICdiaW9zZXJmX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwICk7XG59KTtcbnJhY3RpdmUub24oICdkb21zZXJmX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEyICk7XG59KTtcbnJhY3RpdmUub24oICdmZnByZWRfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ21ldGFwc2ljb3ZfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTggKTtcbn0pO1xucmFjdGl2ZS5vbiggJ21ldHNpdGVfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ2hzcHJlZF9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSApO1xufSk7XG5yYWN0aXZlLm9uKCAnbWVtZW1iZWRfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTYgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ2dlbnRkYl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyApO1xufSk7XG5cblxucmFjdGl2ZS5vbiggJ3N1Ym1pc3Npb25fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgbGV0IHN0YXRlID0gcmFjdGl2ZS5nZXQoJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnKTtcbiAgaWYoc3RhdGUgPT09IDEpe1xuICAgIHJhY3RpdmUuc2V0KCAnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScsIDAgKTtcbiAgfVxuICBlbHNle1xuICAgIHJhY3RpdmUuc2V0KCAnc3VibWlzc2lvbl93aWRnZXRfdmlzaWJsZScsIDEgKTtcbiAgfVxufSk7XG5cbi8vZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIG1haW4gZm9ybSBhbmQgc2VuZCB0aGUgc2VxdWVuY2UgdG8gdGhlIGJhY2tlbmRcbnJhY3RpdmUub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdTdWJtaXR0aW5nIGRhdGEnKTtcbiAgbGV0IHNlcSA9IHRoaXMuZ2V0KCdzZXF1ZW5jZScpO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXj4uKyQvbWcsIFwiXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNlcSA9IHNlcS5yZXBsYWNlKC9cXG58XFxzL2csXCJcIik7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJywgc2VxKTtcblxuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJyk7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICBsZXQgcHNpcHJlZF9qb2IgPSB0aGlzLmdldCgncHNpcHJlZF9qb2InKTtcbiAgbGV0IHBzaXByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdwc2lwcmVkX2NoZWNrZWQnKTtcbiAgbGV0IGRpc29wcmVkX2pvYiA9IHRoaXMuZ2V0KCdkaXNvcHJlZF9qb2InKTtcbiAgbGV0IGRpc29wcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnZGlzb3ByZWRfY2hlY2tlZCcpO1xuICBsZXQgbWVtc2F0c3ZtX2pvYiA9IHRoaXMuZ2V0KCdtZW1zYXRzdm1fam9iJyk7XG4gIGxldCBtZW1zYXRzdm1fY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZW1zYXRzdm1fY2hlY2tlZCcpO1xuICBsZXQgcGdlbnRocmVhZGVyX2pvYiA9IHRoaXMuZ2V0KCdwZ2VudGhyZWFkZXJfam9iJyk7XG4gIGxldCBwZ2VudGhyZWFkZXJfY2hlY2tlZCA9IHRoaXMuZ2V0KCdwZ2VudGhyZWFkZXJfY2hlY2tlZCcpO1xuICBsZXQgbWVtcGFja19qb2IgPSB0aGlzLmdldCgnbWVtcGFja19qb2InKTtcbiAgbGV0IG1lbXBhY2tfY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZW1wYWNrX2NoZWNrZWQnKTtcbiAgbGV0IGdlbnRocmVhZGVyX2pvYiA9IHRoaXMuZ2V0KCdnZW50aHJlYWRlcl9qb2InKTtcbiAgbGV0IGdlbnRocmVhZGVyX2NoZWNrZWQgPSB0aGlzLmdldCgnZ2VudGhyZWFkZXJfY2hlY2tlZCcpO1xuICBsZXQgZG9tcHJlZF9qb2IgPSB0aGlzLmdldCgnZG9tcHJlZF9qb2InKTtcbiAgbGV0IGRvbXByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdkb21wcmVkX2NoZWNrZWQnKTtcbiAgbGV0IHBkb210aHJlYWRlcl9qb2IgPSB0aGlzLmdldCgncGRvbXRocmVhZGVyX2pvYicpO1xuICBsZXQgcGRvbXRocmVhZGVyX2NoZWNrZWQgPSB0aGlzLmdldCgncGRvbXRocmVhZGVyX2NoZWNrZWQnKTtcbiAgbGV0IGJpb3NlcmZfam9iID0gdGhpcy5nZXQoJ2Jpb3NlcmZfam9iJyk7XG4gIGxldCBiaW9zZXJmX2NoZWNrZWQgPSB0aGlzLmdldCgnYmlvc2VyZl9jaGVja2VkJyk7XG4gIGxldCBkb21zZXJmX2pvYiA9IHRoaXMuZ2V0KCdkb21zZXJmX2pvYicpO1xuICBsZXQgZG9tc2VyZl9jaGVja2VkID0gdGhpcy5nZXQoJ2RvbXNlcmZfY2hlY2tlZCcpO1xuICBsZXQgZmZwcmVkX2pvYiA9IHRoaXMuZ2V0KCdmZnByZWRfam9iJyk7XG4gIGxldCBmZnByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdmZnByZWRfY2hlY2tlZCcpO1xuICBsZXQgbWV0YXBzaWNvdl9qb2IgPSB0aGlzLmdldCgnbWV0YXBzaWNvdl9qb2InKTtcbiAgbGV0IG1ldGFwc2ljb3ZfY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZXRhcHNpY292X2NoZWNrZWQnKTtcbiAgbGV0IG1ldHNpdGVfam9iID0gdGhpcy5nZXQoJ21ldGFzaXRlX2pvYicpO1xuICBsZXQgbWV0c2l0ZV9jaGVja2VkID0gdGhpcy5nZXQoJ21ldGFzaXRlX2NoZWNrZWQnKTtcbiAgbGV0IGhzcHJlZF9qb2IgPSB0aGlzLmdldCgnaHNwcmVkX2pvYicpO1xuICBsZXQgaHNwcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnaHNwcmVkX2NoZWNrZWQnKTtcbiAgbGV0IG1lbWVtYmVkX2pvYiA9IHRoaXMuZ2V0KCdtZW1lbWJlZF9qb2InKTtcbiAgbGV0IG1lbWVtYmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnbWVtZW1iZWRfY2hlY2tlZCcpO1xuICBsZXQgZ2VudGRiX2pvYiA9IHRoaXMuZ2V0KCdnZW50ZGJfam9iJyk7XG4gIGxldCBnZW50ZGJfY2hlY2tlZCA9IHRoaXMuZ2V0KCdnZW50ZGJfY2hlY2tlZCcpO1xuXG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBtZW1zYXRzdm1fY2hlY2tlZCwgcGdlbnRocmVhZGVyX2NoZWNrZWQsIG1lbXBhY2tfY2hlY2tlZCwgZ2VudGhyZWFkZXJfY2hlY2tlZCwgZG9tcHJlZF9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBwZG9tdGhyZWFkZXJfY2hlY2tlZCwgYmlvc2VyZl9jaGVja2VkLCBkb21zZXJmX2NoZWNrZWQsIGZmcHJlZF9jaGVja2VkLCBtZXRhcHNpY292X2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIG1ldHNpdGVfY2hlY2tlZCwgaHNwcmVkX2NoZWNrZWQsIG1lbWVtYmVkX2NoZWNrZWQsIGdlbnRkYl9jaGVja2VkKTtcbiAgZXZlbnQub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG4vLyBncmFiIHRoZSBzdWJtaXQgZXZlbnQgZnJvbSB0aGUgUmVzdWJtaXNzaW9uIHdpZGdldCwgdHJ1bmNhdGUgdGhlIHNlcXVlbmNlXG4vLyBhbmQgc2VuZCBhIG5ldyBqb2JcbnJhY3RpdmUub24oJ3Jlc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgY29uc29sZS5sb2coJ1Jlc3VibWl0dGluZyBzZWdtZW50Jyk7XG4gIGxldCBzdGFydCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RhcnRcIik7XG4gIGxldCBzdG9wID0gcmFjdGl2ZS5nZXQoXCJzdWJzZXF1ZW5jZV9zdG9wXCIpO1xuICBsZXQgc2VxdWVuY2UgPSByYWN0aXZlLmdldChcInNlcXVlbmNlXCIpO1xuICBsZXQgc3Vic2VxdWVuY2UgPSBzZXF1ZW5jZS5zdWJzdHJpbmcoc3RhcnQtMSwgc3RvcCk7XG4gIGxldCBuYW1lID0gdGhpcy5nZXQoJ25hbWUnKStcIl9zZWdcIjtcbiAgbGV0IGVtYWlsID0gdGhpcy5nZXQoJ2VtYWlsJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RvcCcsIHN1YnNlcXVlbmNlLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHN1YnNlcXVlbmNlKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCBuYW1lKTtcbiAgbGV0IHBzaXByZWRfam9iID0gdGhpcy5nZXQoJ3BzaXByZWRfam9iJyk7XG4gIGxldCBwc2lwcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgncHNpcHJlZF9jaGVja2VkJyk7XG4gIGxldCBkaXNvcHJlZF9qb2IgPSB0aGlzLmdldCgnZGlzb3ByZWRfam9iJyk7XG4gIGxldCBkaXNvcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ2Rpc29wcmVkX2NoZWNrZWQnKTtcbiAgbGV0IG1lbXNhdHN2bV9qb2IgPSB0aGlzLmdldCgnbWVtc2F0c3ZtX2pvYicpO1xuICBsZXQgbWVtc2F0c3ZtX2NoZWNrZWQgPSB0aGlzLmdldCgnbWVtc2F0c3ZtX2NoZWNrZWQnKTtcbiAgbGV0IHBnZW50aHJlYWRlcl9qb2IgPSB0aGlzLmdldCgncGdlbnRocmVhZGVyX2pvYicpO1xuICBsZXQgcGdlbnRocmVhZGVyX2NoZWNrZWQgPSB0aGlzLmdldCgncGdlbnRocmVhZGVyX2NoZWNrZWQnKTtcbiAgbGV0IG1lbXBhY2tfam9iID0gdGhpcy5nZXQoJ21lbXBhY2tfam9iJyk7XG4gIGxldCBtZW1wYWNrX2NoZWNrZWQgPSB0aGlzLmdldCgnbWVtcGFja19jaGVja2VkJyk7XG4gIGxldCBnZW50aHJlYWRlcl9qb2IgPSB0aGlzLmdldCgnZ2VudGhyZWFkZXJfam9iJyk7XG4gIGxldCBnZW50aHJlYWRlcl9jaGVja2VkID0gdGhpcy5nZXQoJ2dlbnRocmVhZGVyX2NoZWNrZWQnKTtcbiAgbGV0IGRvbXByZWRfam9iID0gdGhpcy5nZXQoJ2RvbXByZWRfam9iJyk7XG4gIGxldCBkb21wcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnZG9tcHJlZF9jaGVja2VkJyk7XG4gIGxldCBwZG9tdGhyZWFkZXJfam9iID0gdGhpcy5nZXQoJ3Bkb210aHJlYWRlcl9qb2InKTtcbiAgbGV0IHBkb210aHJlYWRlcl9jaGVja2VkID0gdGhpcy5nZXQoJ3Bkb210aHJlYWRlcl9jaGVja2VkJyk7XG4gIGxldCBiaW9zZXJmX2pvYiA9IHRoaXMuZ2V0KCdiaW9zZXJmX2pvYicpO1xuICBsZXQgYmlvc2VyZl9jaGVja2VkID0gdGhpcy5nZXQoJ2Jpb3NlcmZfY2hlY2tlZCcpO1xuICBsZXQgZG9tc2VyZl9qb2IgPSB0aGlzLmdldCgnZG9tc2VyZl9qb2InKTtcbiAgbGV0IGRvbXNlcmZfY2hlY2tlZCA9IHRoaXMuZ2V0KCdkb21zZXJmX2NoZWNrZWQnKTtcbiAgbGV0IGZmcHJlZF9qb2IgPSB0aGlzLmdldCgnZmZwcmVkX2pvYicpO1xuICBsZXQgZmZwcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnZmZwcmVkX2NoZWNrZWQnKTtcbiAgbGV0IG1ldGFwc2ljb3Zfam9iID0gdGhpcy5nZXQoJ21ldGFwc2ljb3Zfam9iJyk7XG4gIGxldCBtZXRhcHNpY292X2NoZWNrZWQgPSB0aGlzLmdldCgnbWV0YXBzaWNvdl9jaGVja2VkJyk7XG4gIGxldCBtZXRzaXRlX2pvYiA9IHRoaXMuZ2V0KCdtZXRhc2l0ZV9qb2InKTtcbiAgbGV0IG1ldHNpdGVfY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZXRhc2l0ZV9jaGVja2VkJyk7XG4gIGxldCBoc3ByZWRfam9iID0gdGhpcy5nZXQoJ2hzcHJlZF9qb2InKTtcbiAgbGV0IGhzcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ2hzcHJlZF9jaGVja2VkJyk7XG4gIGxldCBtZW1lbWJlZF9qb2IgPSB0aGlzLmdldCgnbWVtZW1iZWRfam9iJyk7XG4gIGxldCBtZW1lbWJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ21lbWVtYmVkX2NoZWNrZWQnKTtcbiAgbGV0IGdlbnRkYl9qb2IgPSB0aGlzLmdldCgnZ2VudGRiX2pvYicpO1xuICBsZXQgZ2VudGRiX2NoZWNrZWQgPSB0aGlzLmdldCgnZ2VudGRiX2NoZWNrZWQnKTtcbiAgLy9jbGVhciB3aGF0IHdlIGhhdmUgcHJldmlvdXNseSB3cml0dGVuXG4gIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nKTtcbiAgLy92ZXJpZnkgZm9ybSBjb250ZW50cyBhbmQgcG9zdFxuICAvL2NvbnNvbGUubG9nKG5hbWUpO1xuICAvL2NvbnNvbGUubG9nKGVtYWlsKTtcbiAgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0ocmFjdGl2ZSwgc3Vic2VxdWVuY2UsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIHBzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgbWVtc2F0c3ZtX2NoZWNrZWQsIHBnZW50aHJlYWRlcl9jaGVja2VkLCBtZW1wYWNrX2NoZWNrZWQsIGdlbnRocmVhZGVyX2NoZWNrZWQsIGRvbXByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgcGRvbXRocmVhZGVyX2NoZWNrZWQsIGJpb3NlcmZfY2hlY2tlZCwgZG9tc2VyZl9jaGVja2VkLCBmZnByZWRfY2hlY2tlZCwgbWV0YXBzaWNvdl9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBtZXRzaXRlX2NoZWNrZWQsIGhzcHJlZF9jaGVja2VkLCBtZW1lbWJlZF9jaGVja2VkLCBnZW50ZGJfY2hlY2tlZCk7XG4gIC8vd3JpdGUgbmV3IGFubm90YXRpb24gZGlhZ3JhbVxuICAvL3N1Ym1pdCBzdWJzZWN0aW9uXG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gSGVyZSBoYXZpbmcgc2V0IHVwIHJhY3RpdmUgYW5kIHRoZSBmdW5jdGlvbnMgd2UgbmVlZCB3ZSB0aGVuIGNoZWNrXG4vLyBpZiB3ZSB3ZXJlIHByb3ZpZGVkIGEgVVVJRCwgSWYgdGhlIHBhZ2UgaXMgbG9hZGVkIHdpdGggYSBVVUlEIHJhdGhlciB0aGFuIGFcbi8vIGZvcm0gc3VibWl0LlxuLy9UT0RPOiBIYW5kbGUgbG9hZGluZyB0aGF0IHBhZ2Ugd2l0aCB1c2UgdGhlIE1FTVNBVCBhbmQgRElTT1BSRUQgVVVJRFxuLy9cbmlmKGdldFVybFZhcnMoKS51dWlkICYmIHV1aWRfbWF0Y2gpXG57XG4gIGNvbnNvbGUubG9nKCdDYXVnaHQgYW4gaW5jb21pbmcgVVVJRCcpO1xuICBzZXFfb2JzZXJ2ZXIuY2FuY2VsKCk7XG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7IC8vIHNob3VsZCBtYWtlIGEgZ2VuZXJpYyBvbmUgdmlzaWJsZSB1bnRpbCByZXN1bHRzIGFycml2ZS5cbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgcmFjdGl2ZS5zZXQoXCJiYXRjaF91dWlkXCIsIGdldFVybFZhcnMoKS51dWlkKTtcbiAgbGV0IHByZXZpb3VzX2RhdGEgPSBnZXRfcHJldmlvdXNfZGF0YShnZXRVcmxWYXJzKCkudXVpZCwgc3VibWl0X3VybCwgZmlsZV91cmwsIHJhY3RpdmUpO1xuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BzaXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXNhdHN2bScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ3BnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAyKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbXBhY2snKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnbWVtcGFja19idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDcpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZG9tcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZG9tdGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdiaW9zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEwKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXNlcmYnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTIpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZmZwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTMpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnbWV0c2l0ZScpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTQpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnaHNwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE1KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21lbWVtYmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1lbWJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTYpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGRiJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdnZW50ZGJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE3KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldGFwc2ljb3YnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE4KTtcbiAgfVxuXG5cbiAgcmFjdGl2ZS5zZXQoJ3NlcXVlbmNlJyxwcmV2aW91c19kYXRhLnNlcSk7XG4gIHJhY3RpdmUuc2V0KCdlbWFpbCcscHJldmlvdXNfZGF0YS5lbWFpbCk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJyxwcmV2aW91c19kYXRhLm5hbWUpO1xuICBsZXQgc2VxID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlJyk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZV9sZW5ndGgnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXEubGVuZ3RoKTtcbiAgcmFjdGl2ZS5maXJlKCdwb2xsX3RyaWdnZXInLCAncHNpcHJlZCcpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL1xuLy8gTmV3IFBhbm5lbCBmdW5jdGlvbnNcbi8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5mdW5jdGlvbiBsb2FkTmV3QWxpZ25tZW50KGFsblVSSSxhbm5VUkksdGl0bGUpIHtcbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21zYS8/YW5uPVwiK2ZpbGVfdXJsK2FublVSSStcIiZhbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTgwMCxoZWlnaHQ9NDAwXCIpO1xufVxuXG4vL1JlbG9hZCBhbGlnbm1lbnRzIGZvciBKYWxWaWV3IGZvciB0aGUgZ2VuVEhSRUFERVIgdGFibGVcbmZ1bmN0aW9uIGJ1aWxkTW9kZWwoYWxuVVJJKSB7XG5cbiAgbGV0IHVybCA9IHN1Ym1pdF91cmwrcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgbGV0IG1vZF9rZXkgPSByYWN0aXZlLmdldCgnbW9kZWxsZXJfa2V5Jyk7XG4gIGlmKG1vZF9rZXkgPT09ICdNJysnTycrJ0QnKydFJysnTCcrJ0knKydSJysnQScrJ04nKydKJysnRScpXG4gIHtcbiAgICB3aW5kb3cub3BlbihcIi4uXCIrYXBwX3BhdGgrXCIvbW9kZWwvcG9zdD9hbG49XCIrZmlsZV91cmwrYWxuVVJJLCBcIlwiLCBcIndpZHRoPTY3MCxoZWlnaHQ9NzAwXCIpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIE0nKydPJysnRCcrJ0UnKydMJysnTCcrJ0UnKydSIExpY2VuY2UgS2V5Jyk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiaW1wb3J0IHsgc2VuZF9qb2IgfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0c19pbmRleC5qcyc7XG5pbXBvcnQgeyBpc0luQXJyYXkgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4uL2NvbW1vbi9jb21tb25faW5kZXguanMnO1xuXG4vL1Rha2VzIHRoZSBkYXRhIG5lZWRlZCB0byB2ZXJpZnkgdGhlIGlucHV0IGZvcm0gZGF0YSwgZWl0aGVyIHRoZSBtYWluIGZvcm1cbi8vb3IgdGhlIHN1Ym1pc3NvbiB3aWRnZXQgdmVyaWZpZXMgdGhhdCBkYXRhIGFuZCB0aGVuIHBvc3RzIGl0IHRvIHRoZSBiYWNrZW5kLlxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCwgcHNpcHJlZF9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzb3ByZWRfY2hlY2tlZCwgbWVtc2F0c3ZtX2NoZWNrZWQsIHBnZW50aHJlYWRlcl9jaGVja2VkLCBtZW1wYWNrX2NoZWNrZWQsIGdlbnRocmVhZGVyX2NoZWNrZWQsIGRvbXByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBkb210aHJlYWRlcl9jaGVja2VkLCBiaW9zZXJmX2NoZWNrZWQsIGRvbXNlcmZfY2hlY2tlZCwgZmZwcmVkX2NoZWNrZWQsIG1ldGFwc2ljb3ZfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHNpdGVfY2hlY2tlZCwgaHNwcmVkX2NoZWNrZWQsIG1lbWVtYmVkX2NoZWNrZWQsIGdlbnRkYl9jaGVja2VkKVxue1xuICAvKnZlcmlmeSB0aGF0IGV2ZXJ5dGhpbmcgaGVyZSBpcyBvayovXG4gIGxldCBlcnJvcl9tZXNzYWdlPW51bGw7XG4gIGxldCBqb2Jfc3RyaW5nID0gJyc7XG4gIC8vZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9mb3JtKHNlcSwgbmFtZSwgZW1haWwsIFtwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkXSk7XG5cbiAgZXJyb3JfbWVzc2FnZSA9IHZlcmlmeV9mb3JtKHNlcSwgbmFtZSwgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbXNhdHN2bV9jaGVja2VkLCBwZ2VudGhyZWFkZXJfY2hlY2tlZCwgbWVtcGFja19jaGVja2VkLCBnZW50aHJlYWRlcl9jaGVja2VkLCBkb21wcmVkX2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGRvbXRocmVhZGVyX2NoZWNrZWQsIGJpb3NlcmZfY2hlY2tlZCwgZG9tc2VyZl9jaGVja2VkLCBmZnByZWRfY2hlY2tlZCwgbWV0YXBzaWNvdl9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHNpdGVfY2hlY2tlZCwgaHNwcmVkX2NoZWNrZWQsIG1lbWVtYmVkX2NoZWNrZWQsIGdlbnRkYl9jaGVja2VkXSk7XG4gIGlmKGVycm9yX21lc3NhZ2UubGVuZ3RoID4gMClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdmb3JtX2Vycm9yJywgZXJyb3JfbWVzc2FnZSk7XG4gICAgYWxlcnQoXCJGT1JNIEVSUk9SOlwiK2Vycm9yX21lc3NhZ2UpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vaW5pdGlhbGlzZSB0aGUgcGFnZVxuICAgIGxldCByZXNwb25zZSA9IHRydWU7XG4gICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCBudWxsICk7XG4gICAgLy9Qb3N0IHRoZSBqb2JzIGFuZCBpbnRpYWxpc2UgdGhlIGFubm90YXRpb25zIGZvciBlYWNoIGpvYlxuICAgIC8vV2UgYWxzbyBkb24ndCByZWR1bmRhbnRseSBzZW5kIGV4dHJhIHBzaXByZWQgZXRjLi4gam9ic1xuICAgIC8vYnl0IGRvaW5nIHRoZXNlIHRlc3QgaW4gYSBzcGVjaWZpYyBvcmRlclxuICAgIGlmKHBnZW50aHJlYWRlcl9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcInBnZW50aHJlYWRlcixcIik7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICBwc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYoZGlzb3ByZWRfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJkaXNvcHJlZCxcIik7XG4gICAgICByYWN0aXZlLnNldCgnZGlzb3ByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICAgIHBzaXByZWRfY2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZihwc2lwcmVkX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwicHNpcHJlZCxcIik7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYobWVtc2F0c3ZtX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwibWVtc2F0c3ZtLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKG1lbXBhY2tfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJtZW1wYWNrLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1wYWNrX2J1dHRvbicsIHRydWUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYoZ2VudGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJnZW50aHJlYWRlcixcIik7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKGRvbXByZWRfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJkb21wcmVkLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21wcmVkX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihwZG9tdGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJwZG9tdGhyZWFkZXIsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYoYmlvc2VyZl9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcImJpb3NlcmYsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Jpb3NlcmZfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKGRvbXNlcmZfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJkb21zZXJmLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdkb21zZXJmX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihmZnByZWRfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJmZnByZWQsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYobWV0YXBzaWNvdl9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcIm1ldGFwc2ljb3YsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKG1ldHNpdGVfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJtZXRzaXRlLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRzaXRlX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihoc3ByZWRfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJoc3ByZWQsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYobWVtZW1iZWRfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJtZW1lbWJlZCxcIik7XG4gICAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKGdlbnRkYl9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcImdlbnRkYixcIik7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUpO1xuICAgIH1cblxuICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICByZXNwb25zZSA9IHNlbmRfam9iKHJhY3RpdmUsIGpvYl9zdHJpbmcsIHNlcSwgbmFtZSwgZW1haWwsIHN1Ym1pdF91cmwsIHRpbWVzX3VybCk7XG4gICAgLy9zZXQgdmlzaWJpbGl0eSBhbmQgcmVuZGVyIHBhbmVsIG9uY2VcbiAgICBpZiAocHNpcHJlZF9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAncHNpcHJlZF9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgICAvLyBwYXJzZSBzZXF1ZW5jZSBhbmQgbWFrZSBzZXEgcGxvdFxuICAgIH1cbiAgICBlbHNlIGlmKGRpc29wcmVkX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdkaXNvcHJlZF9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYobWVtc2F0c3ZtX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdtZW1zYXRzdm1fYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1cbiAgICBlbHNlIGlmKHBnZW50aHJlYWRlcl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAncGdlbnRocmVhZGVyX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9XG4gICAgZWxzZSBpZihtZW1wYWNrX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdtZW1wYWNrX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihnZW50aHJlYWRlcl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnZ2VudGhyZWFkZXJfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKGRvbXByZWRfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ2RvbXByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKHBkb210aHJlYWRlcl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAncGRvbXRocmVhZGVyX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihiaW9zZXJmX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdiaW9zZXJmX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihkb21zZXJmX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdkb21zZXJmX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihmZnByZWRfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ2ZmcHJlZF9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYobWV0YXBzaWNvdl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnbWV0YXBzaWNvdl9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYobWV0c2l0ZV9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnbWV0c2l0ZV9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYoaHNwcmVkX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdoc3ByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKG1lbWVtYmVkX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdtZW1lbWJlZF9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYoZ2VudGRiX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdnZW50ZGJfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1cblxuICAgIGlmKCEgcmVzcG9uc2Upe3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7fVxuICB9XG59XG5cbi8vVGFrZXMgdGhlIGZvcm0gZWxlbWVudHMgYW5kIGNoZWNrcyB0aGV5IGFyZSB2YWxpZFxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeV9mb3JtKHNlcSwgam9iX25hbWUsIGVtYWlsLCBjaGVja2VkX2FycmF5KVxue1xuICBsZXQgZXJyb3JfbWVzc2FnZSA9IFwiXCI7XG4gIGlmKCEgL15bXFx4MDAtXFx4N0ZdKyQvLnRlc3Qoam9iX25hbWUpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIlBsZWFzZSByZXN0cmljdCBKb2IgTmFtZXMgdG8gdmFsaWQgbGV0dGVycyBudW1iZXJzIGFuZCBiYXNpYyBwdW5jdHVhdGlvbjxiciAvPlwiO1xuICB9XG5cbiAgLyogbGVuZ3RoIGNoZWNrcyAqL1xuICBpZihzZXEubGVuZ3RoID4gMTUwMClcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGlzIHRvbyBsb25nIHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuICBpZihzZXEubGVuZ3RoIDwgMzApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gc2hvcnQgdG8gcHJvY2VzczxiciAvPlwiO1xuICB9XG5cbiAgLyogbnVjbGVvdGlkZSBjaGVja3MgKi9cbiAgbGV0IG51Y2xlb3RpZGVfY291bnQgPSAoc2VxLm1hdGNoKC9BfFR8Q3xHfFV8TnxhfHR8Y3xnfHV8bi9nKXx8W10pLmxlbmd0aDtcbiAgaWYoKG51Y2xlb3RpZGVfY291bnQvc2VxLmxlbmd0aCkgPiAwLjk1KVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgYXBwZWFycyB0byBiZSBudWNsZW90aWRlIHNlcXVlbmNlLiBUaGlzIHNlcnZpY2UgcmVxdWlyZXMgcHJvdGVpbiBzZXF1ZW5jZSBhcyBpbnB1dDxiciAvPlwiO1xuICB9XG4gIGlmKC9bXkFDREVGR0hJS0xNTlBRUlNUVldZWF8tXSsvaS50ZXN0KHNlcSkpXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnM8YnIgLz5cIjtcbiAgfVxuXG4gIGlmKGlzSW5BcnJheSh0cnVlLCBjaGVja2VkX2FycmF5KSA9PT0gZmFsc2UpIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBhbmFseXNpcyBwcm9ncmFtXCI7XG4gIH1cbiAgcmV0dXJuKGVycm9yX21lc3NhZ2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==