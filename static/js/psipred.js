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

function parse_presult(ractive, file) {
  let lines = file.split('\n');
  let ann_list = ractive.get('pgen_ann_set');
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
      entries = line.split(/\s+/);
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
    ractive.set("pgen_table", pseudo_table);
  } else {
    ractive.set("pgen_table", "<h3>No good hits found. GUESS and LOW confidence hits can be found in the results file</h3>");
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
    if (result_dict.name === 'pseudo_bas_align') {
      downloads_info.pgenthreader.align = '<a href="' + file_url + result_dict.data_path + '">pGenTHREADER Alignments</a><br />';
    }
  }
  if (!mempack_result_found) {
    ractive.set('mempack_cartoon', '<h3>No packing prediction possible</h3>');
  }
}

function set_downloads_panel(ractive, downloads_info) {
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parsers_parsers_index_js__["e" /* parse_presult */])(ractive, file);
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
    mempack_checked: true,
    mempack_button: false,
    genthreader_checked: false,
    genthreader_button: false,

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
    genthreader_data: null,

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWFlNzBkYjRjNWQ4ODg0NWM1NzEiLCJ3ZWJwYWNrOi8vLy4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Zvcm1zL2Zvcm1zX2luZGV4LmpzIl0sIm5hbWVzIjpbImdldF9tZW1zYXRfcmFuZ2VzIiwicmVnZXgiLCJkYXRhIiwibWF0Y2giLCJleGVjIiwiaW5jbHVkZXMiLCJyZWdpb25zIiwic3BsaXQiLCJmb3JFYWNoIiwicmVnaW9uIiwiaSIsInBhcnNlSW50IiwiY29uc29sZSIsImxvZyIsInNlZyIsInBhcnNlX3NzMiIsInJhY3RpdmUiLCJmaWxlIiwiYW5ub3RhdGlvbnMiLCJnZXQiLCJsaW5lcyIsInNoaWZ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxlbmd0aCIsImxpbmUiLCJlbnRyaWVzIiwic3MiLCJzZXQiLCJiaW9kMyIsImFubm90YXRpb25HcmlkIiwicGFyZW50IiwibWFyZ2luX3NjYWxlciIsImRlYnVnIiwiY29udGFpbmVyX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWluZXJfaGVpZ2h0IiwiYWxlcnQiLCJwYXJzZV9wYmRhdCIsImRpc29wcmVkIiwicGFyc2VfY29tYiIsInByZWNpc2lvbiIsInBvcyIsImdlbmVyaWN4eUxpbmVDaGFydCIsImNoYXJ0VHlwZSIsInlfY3V0b2ZmIiwicGFyc2VfbWVtc2F0ZGF0YSIsInNlcSIsInRvcG9fcmVnaW9ucyIsInNpZ25hbF9yZWdpb25zIiwicmVlbnRyYW50X3JlZ2lvbnMiLCJ0ZXJtaW5hbCIsImNvaWxfdHlwZSIsInRtcF9hbm5vIiwiQXJyYXkiLCJwcmV2X2VuZCIsImZpbGwiLCJhbm5vIiwibWVtc2F0IiwicGFyc2VfcHJlc3VsdCIsImFubl9saXN0IiwiT2JqZWN0Iiwia2V5cyIsInBzZXVkb190YWJsZSIsInRvTG93ZXJDYXNlIiwicGRiIiwic3Vic3RyaW5nIiwiYWxuIiwiYW5uIiwiaXNJbkFycmF5IiwidmFsdWUiLCJhcnJheSIsImluZGV4T2YiLCJkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwiLCJyZXNpZHVlcyIsInJlcyIsInB1c2giLCJnZXRVcmxWYXJzIiwidmFycyIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsIm0iLCJrZXkiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImltcG9ydGFudCIsInN0eWxlIiwiZ2V0RW1QaXhlbHMiLCJlbGVtZW50IiwiZXh0cmFCb2R5IiwiY3JlYXRlRWxlbWVudCIsImNzc1RleHQiLCJpbnNlcnRCZWZvcmUiLCJib2R5IiwidGVzdEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJjbGVhcl9zZXR0aW5ncyIsImdlYXJfc3RyaW5nIiwiY2xlYXJTZWxlY3Rpb24iLCJ6aXAiLCJKU1ppcCIsInByZXBhcmVfZG93bmxvYWRzX2h0bWwiLCJkb3dubG9hZHNfaW5mbyIsImpvYl9uYW1lIiwicHNpcHJlZCIsImhlYWRlciIsIm1lbXNhdHN2bSIsInBnZW50aHJlYWRlciIsIm1lbXBhY2siLCJnZW50aHJlYWRlciIsImRvbXByZWQiLCJwZG9tdGhyZWFkZXIiLCJiaW9zZXJmIiwiZG9tc2VyZiIsImZmcHJlZCIsIm1ldGFwc2ljb3YiLCJtZXRzaXRlIiwiaHNwcmVkIiwibWVtZW1iZWQiLCJnZW50ZGIiLCJoYW5kbGVfcmVzdWx0cyIsImZpbGVfdXJsIiwiaG9yaXpfcmVnZXgiLCJzczJfcmVnZXgiLCJtZW1zYXRfY2FydG9vbl9yZWdleCIsIm1lbXNhdF9zY2hlbWF0aWNfcmVnZXgiLCJtZW1zYXRfZGF0YV9yZWdleCIsIm1lbXBhY2tfY2FydG9vbl9yZWdleCIsIm1lbXBhY2tfZ3JhcGhfb3V0IiwibWVtcGFja19jb250YWN0X3JlcyIsIm1lbXBhY2tfbGlwaWRfcmVzIiwibWVtcGFja19yZXN1bHRfZm91bmQiLCJpbWFnZV9yZWdleCIsInJlc3VsdHMiLCJyZXN1bHRfZGljdCIsIm5hbWUiLCJhbm5fc2V0IiwidG1wIiwiZGF0YV9wYXRoIiwicGF0aCIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiaWQiLCJwcm9jZXNzX2ZpbGUiLCJob3JpeiIsInNzMl9tYXRjaCIsInNzMiIsInBiZGF0IiwiY29tYiIsInNjaGVtZV9tYXRjaCIsInNjaGVtYXRpYyIsImNhcnRvb25fbWF0Y2giLCJjYXJ0b29uIiwibWVtc2F0X21hdGNoIiwiZ3JhcGhfbWF0Y2giLCJncmFwaF9vdXQiLCJjb250YWN0X21hdGNoIiwiY29udGFjdCIsImxpcGlkX21hdGNoIiwibGlwaWRfb3V0IiwidGFibGUiLCJhbGlnbiIsInNldF9kb3dubG9hZHNfcGFuZWwiLCJkb3dubG9hZHNfc3RyaW5nIiwiY29uY2F0Iiwic2VuZF9yZXF1ZXN0IiwidXJsIiwidHlwZSIsInNlbmRfZGF0YSIsInJlc3BvbnNlIiwiJCIsImFqYXgiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwic2VuZF9qb2IiLCJlbWFpbCIsInN1Ym1pdF91cmwiLCJ0aW1lc191cmwiLCJ1cHBlcl9uYW1lIiwidG9VcHBlckNhc2UiLCJCbG9iIiwiZSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZV9kYXRhIiwidGltZXMiLCJrIiwiZmlyZSIsImdldF9wcmV2aW91c19kYXRhIiwidXVpZCIsInN1Ym1pc3Npb25fcmVzcG9uc2UiLCJnZXRfdGV4dCIsInN1Ym1pc3Npb25zIiwiaW5wdXRfZmlsZSIsImpvYnMiLCJzdWJtaXNzaW9uIiwic2xpY2UiLCJzdWJtaXNzaW9uX25hbWUiLCJ1cmxfc3R1YiIsImN0bCIsInBhdGhfYml0cyIsImZvbGRlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmQiLCJvbiIsImVuZHBvaW50c191cmwiLCJnZWFyc19zdmciLCJtYWluX3VybCIsImFwcF9wYXRoIiwiaG9zdG5hbWUiLCJSYWN0aXZlIiwiZWwiLCJ0ZW1wbGF0ZSIsInNlcXVlbmNlX2Zvcm1fdmlzaWJsZSIsInN0cnVjdHVyZV9mb3JtX3Zpc2libGUiLCJyZXN1bHRzX3Zpc2libGUiLCJyZXN1bHRzX3BhbmVsX3Zpc2libGUiLCJzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlIiwibW9kZWxsZXJfa2V5IiwicHNpcHJlZF9jaGVja2VkIiwicHNpcHJlZF9idXR0b24iLCJkaXNvcHJlZF9jaGVja2VkIiwiZGlzb3ByZWRfYnV0dG9uIiwibWVtc2F0c3ZtX2NoZWNrZWQiLCJtZW1zYXRzdm1fYnV0dG9uIiwicGdlbnRocmVhZGVyX2NoZWNrZWQiLCJwZ2VudGhyZWFkZXJfYnV0dG9uIiwibWVtcGFja19jaGVja2VkIiwibWVtcGFja19idXR0b24iLCJnZW50aHJlYWRlcl9jaGVja2VkIiwiZ2VudGhyZWFkZXJfYnV0dG9uIiwiZG93bmxvYWRfbGlua3MiLCJwc2lwcmVkX2pvYiIsImRpc29wcmVkX2pvYiIsIm1lbXNhdHN2bV9qb2IiLCJwZ2VudGhyZWFkZXJfam9iIiwibWVtcGFja19qb2IiLCJwc2lwcmVkX3dhaXRpbmdfbWVzc2FnZSIsInBzaXByZWRfd2FpdGluZ19pY29uIiwicHNpcHJlZF90aW1lIiwicHNpcHJlZF9ob3JpeiIsImRpc29wcmVkX3dhaXRpbmdfbWVzc2FnZSIsImRpc29wcmVkX3dhaXRpbmdfaWNvbiIsImRpc29wcmVkX3RpbWUiLCJkaXNvX3ByZWNpc2lvbiIsIm1lbXNhdHN2bV93YWl0aW5nX21lc3NhZ2UiLCJtZW1zYXRzdm1fd2FpdGluZ19pY29uIiwibWVtc2F0c3ZtX3RpbWUiLCJtZW1zYXRzdm1fc2NoZW1hdGljIiwibWVtc2F0c3ZtX2NhcnRvb24iLCJwZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlIiwicGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvbiIsInBnZW50aHJlYWRlcl90aW1lIiwicGdlbl90YWJsZSIsInBnZW5fYW5uX3NldCIsIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlIiwibWVtcGFja193YWl0aW5nX2ljb24iLCJtZW1wYWNrX3RpbWUiLCJtZW1zYXRwYWNrX3NjaGVtYXRpYyIsIm1lbXNhdHBhY2tfY2FydG9vbiIsImdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZSIsImdlbnRocmVhZGVyX3dhaXRpbmdfaWNvbiIsImdlbnRocmVhZGVyX3RpbWUiLCJnZW50aHJlYWRlcl9kYXRhIiwiZG9tcHJlZF93YWl0aW5nX21lc3NhZ2UiLCJkb21wcmVkX3dhaXRpbmdfaWNvbiIsImRvbXByZWRfdGltZSIsImRvbXByZWRfZGF0YSIsInBkb210aHJlYWRlcl93YWl0aW5nX21lc3NhZ2UiLCJwZG9tdGhyZWFkZXJfd2FpdGluZ19pY29uIiwicGRvbXRocmVhZGVyX3RpbWUiLCJwZG9tdGhyZWFkZXJfZGF0YSIsImJpb3NlcmZfd2FpdGluZ19tZXNzYWdlIiwiYmlvc2VyZl93YWl0aW5nX2ljb24iLCJiaW9zZXJmX3RpbWUiLCJiaW9zZXJmX2RhdGEiLCJkb21zZXJmX3dhaXRpbmdfbWVzc2FnZSIsImRvbXNlcmZfd2FpdGluZ19pY29uIiwiZG9tc2VyZl90aW1lIiwiZG9tc2VyZl9kYXRhIiwiZmZwcmVkX3dhaXRpbmdfbWVzc2FnZSIsImZmcHJlZF93YWl0aW5nX2ljb24iLCJmZnByZWRfdGltZSIsImZmcHJlZF9kYXRhIiwibWV0YXBzaWNvdl93YWl0aW5nX21lc3NhZ2UiLCJtZXRhcHNpY292X3dhaXRpbmdfaWNvbiIsIm1ldGFwc2ljb3ZfdGltZSIsIm1ldGFwc2ljb3ZfZGF0YSIsIm1ldHNpdGVfd2FpdGluZ19tZXNzYWdlIiwibWV0c2l0ZV93YWl0aW5nX2ljb24iLCJtZXRzaXRlX3RpbWUiLCJtZXRzaXRlX2RhdGEiLCJoc3ByZWRfd2FpdGluZ19tZXNzYWdlIiwiaHNwcmVkX3dhaXRpbmdfaWNvbiIsImhzcHJlZF90aW1lIiwiaHNwcmVkX2RhdGEiLCJtZW1lbWJlZF93YWl0aW5nX21lc3NhZ2UiLCJtZW1lbWJlZF93YWl0aW5nX2ljb24iLCJtZW1lbWJlZF90aW1lIiwibWVtZW1iZWRfZGF0YSIsImdlbnRkYl93YWl0aW5nX21lc3NhZ2UiLCJnZW50ZGJfd2FpdGluZ19pY29uIiwiZ2VudGRiX3RpbWUiLCJnZW50ZGJfZGF0YSIsInNlcXVlbmNlIiwic2VxdWVuY2VfbGVuZ3RoIiwic3Vic2VxdWVuY2Vfc3RhcnQiLCJzdWJzZXF1ZW5jZV9zdG9wIiwiYmF0Y2hfdXVpZCIsInV1aWRfcmVnZXgiLCJ1dWlkX21hdGNoIiwic2VxX29ic2VydmVyIiwib2JzZXJ2ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJpbml0IiwiZGVmZXIiLCJzZXFfbGVuZ3RoIiwic2VxX3N0YXJ0Iiwic2VxX3N0b3AiLCJqb2JfdHlwZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiYmF0Y2giLCJzdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJzdWJtaXNzaW9uX21lc3NhZ2UiLCJsYXN0X21lc3NhZ2UiLCJjb250ZXh0IiwiZ2VuZXJhdGVBc3luYyIsInRoZW4iLCJibG9iIiwic2F2ZUFzIiwiZXZlbnQiLCJnZW50aHJlYWRlcl9qb2IiLCJkb21wcmVkX2pvYiIsImRvbXByZWRfY2hlY2tlZCIsInBkb210aHJlYWRlcl9qb2IiLCJwZG9tdGhyZWFkZXJfY2hlY2tlZCIsImJpb3NlcmZfam9iIiwiYmlvc2VyZl9jaGVja2VkIiwiZG9tc2VyZl9qb2IiLCJkb21zZXJmX2NoZWNrZWQiLCJmZnByZWRfam9iIiwiZmZwcmVkX2NoZWNrZWQiLCJtZXRhcHNpY292X2pvYiIsIm1ldGFwc2ljb3ZfY2hlY2tlZCIsIm1ldHNpdGVfam9iIiwibWV0c2l0ZV9jaGVja2VkIiwiaHNwcmVkX2pvYiIsImhzcHJlZF9jaGVja2VkIiwibWVtZW1iZWRfam9iIiwibWVtZW1iZWRfY2hlY2tlZCIsImdlbnRkYl9qb2IiLCJnZW50ZGJfY2hlY2tlZCIsInZlcmlmeV9hbmRfc2VuZF9mb3JtIiwib3JpZ2luYWwiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0Iiwic3RvcCIsInN1YnNlcXVlbmNlIiwiY2FuY2VsIiwicHJldmlvdXNfZGF0YSIsImxvYWROZXdBbGlnbm1lbnQiLCJhbG5VUkkiLCJhbm5VUkkiLCJ0aXRsZSIsIm9wZW4iLCJidWlsZE1vZGVsIiwibW9kX2tleSIsImVycm9yX21lc3NhZ2UiLCJqb2Jfc3RyaW5nIiwidmVyaWZ5X2Zvcm0iLCJjaGVja2VkX2FycmF5IiwidGVzdCIsIm51Y2xlb3RpZGVfY291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQy9EQTtBQUNPLFNBQVNBLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQ0MsSUFBbEMsRUFDUDtBQUNJLE1BQUlDLFFBQVFGLE1BQU1HLElBQU4sQ0FBV0YsSUFBWCxDQUFaO0FBQ0EsTUFBR0MsTUFBTSxDQUFOLEVBQVNFLFFBQVQsQ0FB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YWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVhZTcwZGI0YzVkODg4NDVjNTcxIiwiXG4vLyBmb3IgYSBnaXZlbiBtZW1zYXQgZGF0YSBmaWxlcyBleHRyYWN0IGNvb3JkaW5hdGUgcmFuZ2VzIGdpdmVuIHNvbWUgcmVnZXhcbmV4cG9ydCBmdW5jdGlvbiBnZXRfbWVtc2F0X3JhbmdlcyhyZWdleCwgZGF0YSlcbntcbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpO1xuICAgIGlmKG1hdGNoWzFdLmluY2x1ZGVzKCcsJykpXG4gICAge1xuICAgICAgbGV0IHJlZ2lvbnMgPSBtYXRjaFsxXS5zcGxpdCgnLCcpO1xuICAgICAgcmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lvbiwgaSl7XG4gICAgICAgIHJlZ2lvbnNbaV0gPSByZWdpb24uc3BsaXQoJy0nKTtcbiAgICAgICAgcmVnaW9uc1tpXVswXSA9IHBhcnNlSW50KHJlZ2lvbnNbaV1bMF0pO1xuICAgICAgICByZWdpb25zW2ldWzFdID0gcGFyc2VJbnQocmVnaW9uc1tpXVsxXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybihyZWdpb25zKTtcbiAgICB9XG4gICAgZWxzZSBpZihtYXRjaFsxXS5pbmNsdWRlcygnLScpKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2cobWF0Y2hbMV0pO1xuICAgICAgICBsZXQgc2VnID0gbWF0Y2hbMV0uc3BsaXQoJy0nKTtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbW10sIF07XG4gICAgICAgIHJlZ2lvbnNbMF1bMF0gPSBwYXJzZUludChzZWdbMF0pO1xuICAgICAgICByZWdpb25zWzBdWzFdID0gcGFyc2VJbnQoc2VnWzFdKTtcbiAgICAgICAgcmV0dXJuKHJlZ2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4obWF0Y2hbMV0pO1xufVxuXG4vLyB0YWtlIGFuZCBzczIgKGZpbGUpIGFuZCBwYXJzZSB0aGUgZGV0YWlscyBhbmQgd3JpdGUgdGhlIG5ldyBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zczIocmFjdGl2ZSwgZmlsZSlcbntcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zaGlmdCgpO1xuICAgIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmKGFubm90YXRpb25zLmxlbmd0aCA9PSBsaW5lcy5sZW5ndGgpXG4gICAge1xuICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICAgICAgbGV0IGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGFubm90YXRpb25zW2ldLnNzID0gZW50cmllc1szXTtcbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGFsZXJ0KFwiU1MyIGFubm90YXRpb24gbGVuZ3RoIGRvZXMgbm90IG1hdGNoIHF1ZXJ5IHNlcXVlbmNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4oYW5ub3RhdGlvbnMpO1xufVxuXG4vL3Rha2UgdGhlIGRpc29wcmVkIHBiZGF0IGZpbGUsIHBhcnNlIGl0IGFuZCBhZGQgdGhlIGFubm90YXRpb25zIHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9wYmRhdChyYWN0aXZlLCBmaWxlKVxue1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpO1xuICAgIGxldCBsaW5lcyA9IGZpbGUuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gICAgbGluZXMgPSBsaW5lcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYoYW5ub3RhdGlvbnMubGVuZ3RoID09IGxpbmVzLmxlbmd0aClcbiAgICB7XG4gICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgICAgICBsZXQgZW50cmllcyA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICAgICAgaWYoZW50cmllc1szXSA9PT0gJy0nKXthbm5vdGF0aW9uc1tpXS5kaXNvcHJlZCA9ICdEJzt9XG4gICAgICAgIGlmKGVudHJpZXNbM10gPT09ICdeJyl7YW5ub3RhdGlvbnNbaV0uZGlzb3ByZWQgPSAnUEInO31cbiAgICAgIH0pO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMpO1xuICAgICAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcbiAgICB9XG59XG5cbi8vcGFyc2UgdGhlIGRpc29wcmVkIGNvbWIgZmlsZSBhbmQgYWRkIGl0IHRvIHRoZSBhbm5vdGF0aW9uIGdyaWRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpXG57XG4gIGxldCBwcmVjaXNpb24gPSBbXTtcbiAgbGV0IGxpbmVzID0gZmlsZS5zcGxpdCgnXFxuJyk7XG4gIGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7IGxpbmVzLnNoaWZ0KCk7XG4gIGxpbmVzID0gbGluZXMuZmlsdGVyKEJvb2xlYW4pO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGxldCBlbnRyaWVzID0gbGluZS5zcGxpdCgvXFxzKy8pO1xuICAgIHByZWNpc2lvbltpXSA9IHt9O1xuICAgIHByZWNpc2lvbltpXS5wb3MgPSBlbnRyaWVzWzFdO1xuICAgIHByZWNpc2lvbltpXS5wcmVjaXNpb24gPSBlbnRyaWVzWzRdO1xuICB9KTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJywgcHJlY2lzaW9uKTtcbiAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHByZWNpc2lvbiwgJ3BvcycsIFsncHJlY2lzaW9uJ10sIFsnQmxhY2snLF0sICdEaXNvTk5DaGFydCcsIHtwYXJlbnQ6ICdkaXYuY29tYl9wbG90JywgY2hhcnRUeXBlOiAnbGluZScsIHlfY3V0b2ZmOiAwLjUsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG4vL3BhcnNlIHRoZSBtZW1zYXQgb3V0cHV0XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfbWVtc2F0ZGF0YShyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgYW5ub3RhdGlvbnMgPSByYWN0aXZlLmdldCgnYW5ub3RhdGlvbnMnKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICAvL2NvbnNvbGUubG9nKGZpbGUpO1xuICBsZXQgdG9wb19yZWdpb25zID0gZ2V0X21lbXNhdF9yYW5nZXMoL1RvcG9sb2d5OlxccysoLis/KVxcbi8sIGZpbGUpO1xuICBsZXQgc2lnbmFsX3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvU2lnbmFsXFxzcGVwdGlkZTpcXHMrKC4rKVxcbi8sIGZpbGUpO1xuICBsZXQgcmVlbnRyYW50X3JlZ2lvbnMgPSBnZXRfbWVtc2F0X3JhbmdlcygvUmUtZW50cmFudFxcc2hlbGljZXM6XFxzKyguKz8pXFxuLywgZmlsZSk7XG4gIGxldCB0ZXJtaW5hbCA9IGdldF9tZW1zYXRfcmFuZ2VzKC9OLXRlcm1pbmFsOlxccysoLis/KVxcbi8sIGZpbGUpO1xuICAvL2NvbnNvbGUubG9nKHNpZ25hbF9yZWdpb25zKTtcbiAgLy8gY29uc29sZS5sb2cocmVlbnRyYW50X3JlZ2lvbnMpO1xuICBsZXQgY29pbF90eXBlID0gJ0NZJztcbiAgaWYodGVybWluYWwgPT09ICdvdXQnKVxuICB7XG4gICAgY29pbF90eXBlID0gJ0VDJztcbiAgfVxuICBsZXQgdG1wX2Fubm8gPSBuZXcgQXJyYXkoc2VxLmxlbmd0aCk7XG4gIGlmKHRvcG9fcmVnaW9ucyAhPT0gJ05vdCBkZXRlY3RlZC4nKVxuICB7XG4gICAgbGV0IHByZXZfZW5kID0gMDtcbiAgICB0b3BvX3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdUTScsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgICAgaWYocHJldl9lbmQgPiAwKXtwcmV2X2VuZCAtPSAxO31cbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbChjb2lsX3R5cGUsIHByZXZfZW5kLCByZWdpb25bMF0pO1xuICAgICAgaWYoY29pbF90eXBlID09PSAnRUMnKXsgY29pbF90eXBlID0gJ0NZJzt9ZWxzZXtjb2lsX3R5cGUgPSAnRUMnO31cbiAgICAgIHByZXZfZW5kID0gcmVnaW9uWzFdKzI7XG4gICAgfSk7XG4gICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKGNvaWxfdHlwZSwgcHJldl9lbmQtMSwgc2VxLmxlbmd0aCk7XG5cbiAgfVxuICAvL3NpZ25hbF9yZWdpb25zID0gW1s3MCw4M10sIFsxMDIsMTE3XV07XG4gIGlmKHNpZ25hbF9yZWdpb25zICE9PSAnTm90IGRldGVjdGVkLicpe1xuICAgIHNpZ25hbF9yZWdpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaW9uKXtcbiAgICAgIHRtcF9hbm5vID0gdG1wX2Fubm8uZmlsbCgnUycsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIC8vcmVlbnRyYW50X3JlZ2lvbnMgPSBbWzQwLDUwXSwgWzIwMCwyMThdXTtcbiAgaWYocmVlbnRyYW50X3JlZ2lvbnMgIT09ICdOb3QgZGV0ZWN0ZWQuJyl7XG4gICAgcmVlbnRyYW50X3JlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdpb24pe1xuICAgICAgdG1wX2Fubm8gPSB0bXBfYW5uby5maWxsKCdSSCcsIHJlZ2lvblswXSwgcmVnaW9uWzFdKzEpO1xuICAgIH0pO1xuICB9XG4gIHRtcF9hbm5vLmZvckVhY2goZnVuY3Rpb24oYW5ubywgaSl7XG4gICAgYW5ub3RhdGlvbnNbaV0ubWVtc2F0ID0gYW5ubztcbiAgfSk7XG4gIHJhY3RpdmUuc2V0KCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zKTtcbiAgYmlvZDMuYW5ub3RhdGlvbkdyaWQoYW5ub3RhdGlvbnMsIHtwYXJlbnQ6ICdkaXYuc2VxdWVuY2VfcGxvdCcsIG1hcmdpbl9zY2FsZXI6IDIsIGRlYnVnOiBmYWxzZSwgY29udGFpbmVyX3dpZHRoOiA5MDAsIHdpZHRoOiA5MDAsIGhlaWdodDogMzAwLCBjb250YWluZXJfaGVpZ2h0OiAzMDB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlKVxue1xuICBsZXQgbGluZXMgPSBmaWxlLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGFubl9saXN0ID0gcmFjdGl2ZS5nZXQoJ3BnZW5fYW5uX3NldCcpO1xuICBpZihPYmplY3Qua2V5cyhhbm5fbGlzdCkubGVuZ3RoID4gMCl7XG4gIGxldCBwc2V1ZG9fdGFibGUgPSAnPHRhYmxlIGNsYXNzPVwic21hbGwtdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZFwiPlxcbic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRyPjx0aD5Db25mLjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TmV0IFNjb3JlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5wLXZhbHVlPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QYWlyRTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U29sdkU8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsbiBTY29yZTwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+QWxuIExlbmd0aDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U3RyIExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U2VxIExlbjwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+Rm9sZDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+U0VBUkNIIFNDT1A8L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPlNFQVJDSCBDQVRIPC90aD4nO1xuICBwc2V1ZG9fdGFibGUgKz0gJzx0aD5QREJTVU08L3RoPic7XG4gIHBzZXVkb190YWJsZSArPSAnPHRoPkFsaWdubWVudDwvdGg+JztcbiAgcHNldWRvX3RhYmxlICs9ICc8dGg+TU9ERUw8L3RoPic7XG5cbiAgLy8gaWYgTU9ERUxMRVIgVEhJTkdZXG4gIHBzZXVkb190YWJsZSArPSAnPC90cj48dGJvZHlcIj5cXG4nO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIGlmKGxpbmUubGVuZ3RoID09PSAwKXtyZXR1cm47fVxuICAgIGVudHJpZXMgPSBsaW5lLnNwbGl0KC9cXHMrLyk7XG4gICAgaWYoZW50cmllc1s5XStcIl9cIitpIGluIGFubl9saXN0KVxuICAgIHtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkIGNsYXNzPSdcIitlbnRyaWVzWzBdLnRvTG93ZXJDYXNlKCkrXCInPlwiK2VudHJpZXNbMF0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzFdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1syXStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbM10rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzRdK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s1XStcIjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPHRkPlwiK2VudHJpZXNbNl0rXCI8L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD5cIitlbnRyaWVzWzddK1wiPC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+XCIrZW50cmllc1s4XStcIjwvdGQ+XCI7XG4gICAgbGV0IHBkYiA9IGVudHJpZXNbOV0uc3Vic3RyaW5nKDAsIGVudHJpZXNbOV0ubGVuZ3RoLTIpO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly93d3cucmNzYi5vcmcvcGRiL2V4cGxvcmUvZXhwbG9yZS5kbz9zdHJ1Y3R1cmVJZD1cIitwZGIrXCInPlwiK2VudHJpZXNbOV0rXCI8L2E+PC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHA6Ly9zY29wLm1yYy1sbWIuY2FtLmFjLnVrL3Njb3AvcGRiLmNnaT9wZGI9XCIrcGRiK1wiJz5TQ09QIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5jYXRoZGIuaW5mby9wZGIvXCIrcGRiK1wiJz5DQVRIIFNFQVJDSDwvYT48L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cDovL3d3dy5lYmkuYWMudWsvdGhvcm50b24tc3J2L2RhdGFiYXNlcy9jZ2ktYmluL3BkYnN1bS9HZXRQYWdlLnBsP3BkYmNvZGU9XCIrcGRiK1wiJz5PcGVuIFBEQlNVTTwvYT48L3RkPlwiO1xuICAgIHBzZXVkb190YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2J1dHRvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPSdsb2FkTmV3QWxpZ25tZW50KFxcXCJcIisoYW5uX2xpc3RbZW50cmllc1s5XStcIl9cIitpXS5hbG4pK1wiXFxcIixcXFwiXCIrKGFubl9saXN0W2VudHJpZXNbOV0rXCJfXCIraV0uYW5uKStcIlxcXCIsXFxcIlwiKyhlbnRyaWVzWzldK1wiX1wiK2kpK1wiXFxcIik7JyB2YWx1ZT0nRGlzcGxheSBBbGlnbm1lbnQnIC8+PC90ZD5cIjtcbiAgICBwc2V1ZG9fdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdidXR0b24nIHR5cGU9J2J1dHRvbicgb25DbGljaz0nYnVpbGRNb2RlbChcXFwiXCIrKGFubl9saXN0W2VudHJpZXNbOV0rXCJfXCIraV0uYWxuKStcIlxcXCIpOycgdmFsdWU9J0J1aWxkIE1vZGVsJyAvPjwvdGQ+XCI7XG4gICAgcHNldWRvX3RhYmxlICs9IFwiPC90cj5cXG5cIjtcbiAgICB9XG4gIH0pO1xuICBwc2V1ZG9fdGFibGUgKz0gXCI8L3Rib2R5PjwvdGFibGU+XFxuXCI7XG4gIHJhY3RpdmUuc2V0KFwicGdlbl90YWJsZVwiLCBwc2V1ZG9fdGFibGUpO1xuICB9XG4gIGVsc2Uge1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VuX3RhYmxlXCIsIFwiPGgzPk5vIGdvb2QgaGl0cyBmb3VuZC4gR1VFU1MgYW5kIExPVyBjb25maWRlbmNlIGhpdHMgY2FuIGJlIGZvdW5kIGluIHRoZSByZXN1bHRzIGZpbGU8L2gzPlwiKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyIsIi8vZ2l2ZW4gYW5kIGFycmF5IHJldHVybiB3aGV0aGVyIGFuZCBlbGVtZW50IGlzIHByZXNlbnRcbmV4cG9ydCBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gIGlmKGFycmF5LmluZGV4T2YodmFsdWUpID4gLTEpXG4gIHtcbiAgICByZXR1cm4odHJ1ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuKGZhbHNlKTtcbiAgfVxufVxuXG4vL3doZW4gYSByZXN1bHRzIHBhZ2UgaXMgaW5zdGFudGlhdGVkIGFuZCBiZWZvcmUgc29tZSBhbm5vdGF0aW9ucyBoYXZlIGNvbWUgYmFja1xuLy93ZSBkcmF3IGFuZCBlbXB0eSBhbm5vdGF0aW9uIHBhbmVsXG5leHBvcnQgZnVuY3Rpb24gZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpe1xuXG4gIGxldCBzZXEgPSByYWN0aXZlLmdldCgnc2VxdWVuY2UnKTtcbiAgbGV0IHJlc2lkdWVzID0gc2VxLnNwbGl0KCcnKTtcbiAgbGV0IGFubm90YXRpb25zID0gW107XG4gIHJlc2lkdWVzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHsncmVzJzogcmVzfSk7XG4gIH0pO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLCBhbm5vdGF0aW9ucyk7XG4gIGJpb2QzLmFubm90YXRpb25HcmlkKHJhY3RpdmUuZ2V0KCdhbm5vdGF0aW9ucycpLCB7cGFyZW50OiAnZGl2LnNlcXVlbmNlX3Bsb3QnLCBtYXJnaW5fc2NhbGVyOiAyLCBkZWJ1ZzogZmFsc2UsIGNvbnRhaW5lcl93aWR0aDogOTAwLCB3aWR0aDogOTAwLCBoZWlnaHQ6IDMwMCwgY29udGFpbmVyX2hlaWdodDogMzAwfSk7XG59XG5cblxuLy9naXZlbiBhIFVSTCByZXR1cm4gdGhlIGF0dGFjaGVkIHZhcmlhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFZhcnMoKSB7XG4gICAgbGV0IHZhcnMgPSB7fTtcbiAgICAvL2NvbnNpZGVyIHVzaW5nIGxvY2F0aW9uLnNlYXJjaCBpbnN0ZWFkIGhlcmVcbiAgICBsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksXG4gICAgZnVuY3Rpb24obSxrZXksdmFsdWUpIHtcbiAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbi8qISBnZXRFbVBpeGVscyAgfCBBdXRob3I6IFR5c29uIE1hdGFuaWNoIChodHRwOi8vbWF0YW5pY2guY29tKSwgMjAxMyB8IExpY2Vuc2U6IE1JVCAqL1xuKGZ1bmN0aW9uIChkb2N1bWVudCwgZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgLy8gRW5hYmxlIHN0cmljdCBtb2RlXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBGb3JtIHRoZSBzdHlsZSBvbiB0aGUgZmx5IHRvIHJlc3VsdCBpbiBzbWFsbGVyIG1pbmlmaWVkIGZpbGVcbiAgICBsZXQgaW1wb3J0YW50ID0gXCIhaW1wb3J0YW50O1wiO1xuICAgIGxldCBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGVcIiArIGltcG9ydGFudCArIFwidmlzaWJpbGl0eTpoaWRkZW5cIiArIGltcG9ydGFudCArIFwid2lkdGg6MWVtXCIgKyBpbXBvcnRhbnQgKyBcImZvbnQtc2l6ZToxZW1cIiArIGltcG9ydGFudCArIFwicGFkZGluZzowXCIgKyBpbXBvcnRhbnQ7XG5cbiAgICB3aW5kb3cuZ2V0RW1QaXhlbHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGxldCBleHRyYUJvZHk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBFbXVsYXRlIHRoZSBkb2N1bWVudEVsZW1lbnQgdG8gZ2V0IHJlbSB2YWx1ZSAoZG9jdW1lbnRFbGVtZW50IGRvZXMgbm90IHdvcmsgaW4gSUU2LTcpXG4gICAgICAgICAgICBlbGVtZW50ID0gZXh0cmFCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJvZHlcIik7XG4gICAgICAgICAgICBleHRyYUJvZHkuc3R5bGUuY3NzVGV4dCA9IFwiZm9udC1zaXplOjFlbVwiICsgaW1wb3J0YW50O1xuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShleHRyYUJvZHksIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBzdHlsZSBhIHRlc3QgZWxlbWVudFxuICAgICAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGNsaWVudCB3aWR0aCBvZiB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgIGxldCB2YWx1ZSA9IHRlc3RFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChleHRyYUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXh0cmEgYm9keSBlbGVtZW50XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXh0cmFCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGVzdCBlbGVtZW50XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZW0gdmFsdWUgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY29tbW9uL2NvbW1vbl9pbmRleC5qcyIsImltcG9ydCB7IHByb2Nlc3NfZmlsZSB9IGZyb20gJy4uL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcblxuLy9iZWZvcmUgYSByZXN1Ym1pc3Npb24gaXMgc2VudCBhbGwgdmFyaWFibGVzIGFyZSByZXNldCB0byB0aGUgcGFnZSBkZWZhdWx0c1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3NldHRpbmdzKHJhY3RpdmUsIGdlYXJfc3RyaW5nKXtcbiAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfdmlzaWJsZScsIDIpO1xuICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMSk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgJycpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIFBTSVBSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgncHNpcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2hvcml6JyxudWxsKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRElTT1BSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnZGlzb3ByZWRfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnZGlzb3ByZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ2Rpc29fcHJlY2lzaW9uJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNRU1TQVQtU1ZNIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9zY2hlbWF0aWMnLCAnJyk7XG4gIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fY2FydG9vbicsICcnKTtcbiAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIHBHZW5USFJFQURFUiBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VudGhyZWFkZXJfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdwZ2VuX3RhYmxlJywgJycpO1xuICByYWN0aXZlLnNldCgncGdlbl9zZXQnLCB7fSk7XG5cbiAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNRU1QQUNLIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnbWVtcGFja190aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBHZW5USFJFQURFUiBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdnZW50aHJlYWRlcl90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIERvbVBSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnZG9tcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdkb21wcmVkX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBwRG9tVEhSRUFERVIgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgncGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ3Bkb210aHJlYWRlcl90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIEJpb1NlcmYgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnYmlvc2VyZl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdiaW9zZXJmX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRG9tU2VyZiBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdkb21zZXJmX3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ2RvbXNlcmZfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ2ZmcHJlZF93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIEZGUHJlZCBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdmZnByZWRfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnZmZwcmVkX3RpbWUnLCAnTG9hZGluZyBEYXRhJyk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTWV0YVBTSUNPViBqb2IgdG8gcHJvY2VzczwvaDI+Jyk7XG4gIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X3dhaXRpbmdfaWNvbicsIGdlYXJfc3RyaW5nKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldGFwc2ljb3ZfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfd2FpdGluZ19tZXNzYWdlJywgJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNZXRTaXRlIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnbWV0c2l0ZV90aW1lJywgJ0xvYWRpbmcgRGF0YScpO1xuICByYWN0aXZlLnNldCgnaHNwcmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgSFNQcmVkIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ2hzcHJlZF93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdoc3ByZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX3dhaXRpbmdfbWVzc2FnZScsICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTUVNRU1CRUQgam9iIHRvIHByb2Nlc3M8L2gyPicpO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfd2FpdGluZ19pY29uJywgZ2Vhcl9zdHJpbmcpO1xuICByYWN0aXZlLnNldCgnbWVtZW1iZWRfdGltZScsICdMb2FkaW5nIERhdGEnKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl93YWl0aW5nX21lc3NhZ2UnLCAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIFREQiBnZW5lcmF0aW9uIGpvYiB0byBwcm9jZXNzPC9oMj4nKTtcbiAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl93YWl0aW5nX2ljb24nLCBnZWFyX3N0cmluZyk7XG4gIHJhY3RpdmUuc2V0KCdnZW50ZGJfdGltZScsICdMb2FkaW5nIERhdGEnKTtcblxuICAvL3JhY3RpdmUuc2V0KCdkaXNvX3ByZWNpc2lvbicpO1xuICByYWN0aXZlLnNldCgnYW5ub3RhdGlvbnMnLG51bGwpO1xuICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsbnVsbCk7XG4gIGJpb2QzLmNsZWFyU2VsZWN0aW9uKCdkaXYuc2VxdWVuY2VfcGxvdCcpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LnBzaXByZWRfY2FydG9vbicpO1xuICBiaW9kMy5jbGVhclNlbGVjdGlvbignZGl2LmNvbWJfcGxvdCcpO1xuXG4gIHppcCA9IG5ldyBKU1ppcCgpO1xufVxuXG4vL1Rha2UgYSBjb3VwbGUgb2YgdmFyaWFibGVzIGFuZCBwcmVwYXJlIHRoZSBodG1sIHN0cmluZ3MgZm9yIHRoZSBkb3dubG9hZHMgcGFuZWxcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvKVxue1xuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwc2lwcmVkJykpXG4gIHtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZC5oZWFkZXIgPSBcIjxoNT5Qc2lwcmVkIERPV05MT0FEUzwvaDU+XCI7XG4gIH1cbiAgaWYoZGF0YS5qb2JfbmFtZS5pbmNsdWRlcygnZGlzb3ByZWQnKSlcbiAge1xuICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZGlzb3ByZWQuaGVhZGVyID0gXCI8aDU+RGlzb1ByZWREIERPV05MT0FEUzwvaDU+XCI7XG4gIH1cbiAgaWYoZGF0YS5qb2JfbmFtZS5pbmNsdWRlcygnbWVtc2F0c3ZtJykpXG4gIHtcbiAgICBkb3dubG9hZHNfaW5mby5tZW1zYXRzdm09IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5oZWFkZXIgPSBcIjxoNT5NRU1TQVRTVk0gRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXI9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlci5oZWFkZXIgPSBcIjxoNT5wR2VuVEhSRUFERVIgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZW1wYWNrJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bT0ge307XG4gICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmhlYWRlciA9IFwiPGg1Pk1FTVNBVFNWTSBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2sgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmhlYWRlciA9IFwiPGg1Pk1FTVBBQ0sgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdnZW50aHJlYWRlcicpKXtcbiAgICBkb3dubG9hZHNfaW5mby5nZW50aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZ2VudGhyZWFkZXIuaGVhZGVyID0gXCI8aDU+R2VuVEhSRUFERVIgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdkb21wcmVkJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdwZG9tdGhyZWFkZXInKSl7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBEb21USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ2Jpb3NlcmYnKSl7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBnZW50aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBHZW5USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmY9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmJpb3NlcmYuaGVhZGVyID0gXCI8aDU+QmlvU2VyZiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ2RvbXNlcmYnKSl7XG4gICAgZG93bmxvYWRzX2luZm8ucHNpcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyID0gXCI8aDU+UHNpcHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBkb210aHJlYWRlcj0ge307XG4gICAgZG93bmxvYWRzX2luZm8ucGRvbXRocmVhZGVyLmhlYWRlciA9IFwiPGg1PnBEb21USFJFQURFUiBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmY9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmRvbXNlcmYuaGVhZGVyID0gXCI8aDU+RG9tU2VyZiBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ2ZmcHJlZCcpKXtcbiAgICBkb3dubG9hZHNfaW5mby5kaXNvcHJlZCA9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmhlYWRlciA9IFwiPGg1PkRpc29QcmVkRCBET1dOTE9BRFM8L2g1PlwiO1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5kb21wcmVkLmhlYWRlciA9IFwiPGg1PkRvbVByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5mZnByZWQ9IHt9O1xuICAgIGRvd25sb2Fkc19pbmZvLmZmcHJlZC5oZWFkZXIgPSBcIjxoNT5GRlByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZXRhcHNpY292Jykpe1xuICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhlYWRlciA9IFwiPGg1PlBzaXByZWQgRE9XTkxPQURTPC9oNT5cIjtcbiAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292PSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5tZXRhcHNpY292LmhlYWRlciA9IFwiPGg1Pk1ldGFQU0lDT1YgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdtZXRzaXRlJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLm1ldHNpdGUgPSB7fTtcbiAgICBkb3dubG9hZHNfaW5mby5tZXRzaXRlLmhlYWRlciA9IFwiPGg1Pk1ldHNpdGUgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdoc3ByZWQnKSl7XG4gICAgZG93bmxvYWRzX2luZm8uaHNwcmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uaHNwcmVkLmhlYWRlciA9IFwiPGg1PkhTUHJlZCBET1dOTE9BRFM8L2g1PlwiO1xuICB9XG4gIGlmKGRhdGEuam9iX25hbWUuaW5jbHVkZXMoJ21lbWVtYmVkJykpe1xuICAgIGRvd25sb2Fkc19pbmZvLm1lbWVtYmVkID0ge307XG4gICAgZG93bmxvYWRzX2luZm8ubWVtZW1iZWQuaGVhZGVyID0gXCI8aDU+TUVNRU1CRUQgRE9XTkxPQURTPC9oNT5cIjtcbiAgfVxuICBpZihkYXRhLmpvYl9uYW1lLmluY2x1ZGVzKCdnZW50ZGInKSl7XG4gICAgZG93bmxvYWRzX2luZm8uZ2VudGRiID0ge307XG4gICAgZG93bmxvYWRzX2luZm8uZ2VudGRiLmhlYWRlciA9IFwiPGg1PlREQiBET1dOTE9BRDwvaDU+XCI7XG4gIH1cblxufVxuXG4vL3Rha2UgdGhlIGRhdGFibG9iIHdlJ3ZlIGdvdCBhbmQgbG9vcCBvdmVyIHRoZSByZXN1bHRzXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX3Jlc3VsdHMocmFjdGl2ZSwgZGF0YSwgZmlsZV91cmwsIHppcCwgZG93bmxvYWRzX2luZm8pXG57XG4gIGxldCBob3Jpel9yZWdleCA9IC9cXC5ob3JpeiQvO1xuICBsZXQgc3MyX3JlZ2V4ID0gL1xcLnNzMiQvO1xuICBsZXQgbWVtc2F0X2NhcnRvb25fcmVnZXggPSAvX2NhcnRvb25fbWVtc2F0X3N2bVxcLnBuZyQvO1xuICBsZXQgbWVtc2F0X3NjaGVtYXRpY19yZWdleCA9IC9fc2NoZW1hdGljXFwucG5nJC87XG4gIGxldCBtZW1zYXRfZGF0YV9yZWdleCA9IC9tZW1zYXRfc3ZtJC87XG4gIGxldCBtZW1wYWNrX2NhcnRvb25fcmVnZXggPSAvS2FtYWRhLUthd2FpX1xcZCsucG5nJC87XG4gIGxldCBtZW1wYWNrX2dyYXBoX291dCA9IC9pbnB1dF9ncmFwaC5vdXQkLztcbiAgbGV0IG1lbXBhY2tfY29udGFjdF9yZXMgPSAvQ09OVEFDVF9ERUYxLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfbGlwaWRfcmVzID0gL0xJUElEX0VYUE9TVVJFLnJlc3VsdHMkLztcbiAgbGV0IG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gZmFsc2U7XG5cbiAgbGV0IGltYWdlX3JlZ2V4ID0gJyc7XG4gIGxldCByZXN1bHRzID0gZGF0YS5yZXN1bHRzO1xuICBmb3IobGV0IGkgaW4gcmVzdWx0cylcbiAge1xuICAgIGxldCByZXN1bHRfZGljdCA9IHJlc3VsdHNbaV07XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ0dlbkFsaWdubWVudEFubm90YXRpb24nKVxuICAgIHtcbiAgICAgICAgbGV0IGFubl9zZXQgPSByYWN0aXZlLmdldChcInBnZW5fYW5uX3NldFwiKTtcbiAgICAgICAgbGV0IHRtcCA9IHJlc3VsdF9kaWN0LmRhdGFfcGF0aDtcbiAgICAgICAgbGV0IHBhdGggPSB0bXAuc3Vic3RyKDAsIHRtcC5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgICAgICBsZXQgaWQgPSBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKFwiLlwiKSsxLCBwYXRoLmxlbmd0aCk7XG4gICAgICAgIGFubl9zZXRbaWRdID0ge307XG4gICAgICAgIGFubl9zZXRbaWRdLmFubiA9IHBhdGgrXCIuYW5uXCI7XG4gICAgICAgIGFubl9zZXRbaWRdLmFsbiA9IHBhdGgrXCIuYWxuXCI7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicGdlbl9hbm5fc2V0XCIsIGFubl9zZXQpO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgZm9yKGxldCBpIGluIHJlc3VsdHMpXG4gIHtcbiAgICBsZXQgcmVzdWx0X2RpY3QgPSByZXN1bHRzW2ldO1xuICAgIC8vcHNpcHJlZCBmaWxlc1xuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT0gJ3BzaXBhc3MyJylcbiAgICB7XG4gICAgICBsZXQgbWF0Y2ggPSBob3Jpel9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtYXRjaClcbiAgICAgIHtcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdob3JpeicsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIHJhY3RpdmUuc2V0KFwicHNpcHJlZF93YWl0aW5nX21lc3NhZ2VcIiwgJycpO1xuICAgICAgICBkb3dubG9hZHNfaW5mby5wc2lwcmVkLmhvcml6ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+SG9yaXogRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgICByYWN0aXZlLnNldChcInBzaXByZWRfd2FpdGluZ19pY29uXCIsICcnKTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoXCJwc2lwcmVkX3RpbWVcIiwgJycpO1xuICAgICAgfVxuICAgICAgbGV0IHNzMl9tYXRjaCA9IHNzMl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzczJfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+U1MyIEZvcm1hdCBPdXRwdXQ8L2E+PGJyIC8+JztcbiAgICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdzczInLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvL2Rpc29wcmVkIGZpbGVzXG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fZm9ybWF0JylcbiAgICB7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3BiZGF0JywgemlwLCByYWN0aXZlKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwiZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLnBiZGF0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+UEJEQVQgRm9ybWF0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJkaXNvcHJlZF90aW1lXCIsICcnKTtcbiAgICB9XG4gICAgaWYocmVzdWx0X2RpY3QubmFtZSA9PT0gJ2Rpc29fY29tYmluZScpXG4gICAge1xuICAgICAgcHJvY2Vzc19maWxlKGZpbGVfdXJsLCByZXN1bHRfZGljdC5kYXRhX3BhdGgsICdjb21iJywgemlwLCByYWN0aXZlKTtcbiAgICAgIGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DT01CIE5OIE91dHB1dDwvYT48YnIgLz4nO1xuICAgIH1cblxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdtZW1zYXRzdm0nKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtc2F0c3ZtX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXNhdHN2bV93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1zYXRzdm1fdGltZVwiLCAnJyk7XG4gICAgICBsZXQgc2NoZW1lX21hdGNoID0gbWVtc2F0X3NjaGVtYXRpY19yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihzY2hlbWVfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fc2NoZW1hdGljJywgJzxpbWcgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5zY2hlbWF0aWMgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5TY2hlbWF0aWMgRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSBtZW1zYXRfY2FydG9vbl9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjYXJ0b29uX21hdGNoKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2NhcnRvb24nLCAnPGltZyBzcmM9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCIgLz4nKTtcbiAgICAgICAgZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5DYXJ0b29uIERpYWdyYW08L2E+PGJyIC8+JztcbiAgICAgIH1cbiAgICAgIGxldCBtZW1zYXRfbWF0Y2ggPSBtZW1zYXRfZGF0YV9yZWdleC5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihtZW1zYXRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3NfZmlsZShmaWxlX3VybCwgcmVzdWx0X2RpY3QuZGF0YV9wYXRoLCAnbWVtc2F0ZGF0YScsIHppcCwgcmFjdGl2ZSk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXNhdHN2bS5kYXRhID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TWVtc2F0IE91dHB1dDwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZXN1bHRfZGljdC5uYW1lID09PSAnbWVtcGFja193cmFwcGVyJylcbiAgICB7XG4gICAgICByYWN0aXZlLnNldChcIm1lbXBhY2tfd2FpdGluZ19tZXNzYWdlXCIsICcnKTtcbiAgICAgIHJhY3RpdmUuc2V0KFwibWVtcGFja193YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJtZW1wYWNrX3RpbWVcIiwgJycpO1xuICAgICAgbGV0IGNhcnRvb25fbWF0Y2ggPSAgbWVtcGFja19jYXJ0b29uX3JlZ2V4LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGNhcnRvb25fbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIG1lbXBhY2tfcmVzdWx0X2ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aW1nIHdpZHRoPVwiMTAwMHB4XCIgc3JjPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiIC8+Jyk7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY2FydG9vbiA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkNhcnRvb24gRGlhZ3JhbTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGdyYXBoX21hdGNoID0gIG1lbXBhY2tfZ3JhcGhfb3V0LmV4ZWMocmVzdWx0X2RpY3QuZGF0YV9wYXRoKTtcbiAgICAgIGlmKGdyYXBoX21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCA9ICc8YSBocmVmPVwiJytmaWxlX3VybCtyZXN1bHRfZGljdC5kYXRhX3BhdGgrJ1wiPkRpYWdyYW0gRGF0YTwvYT48YnIgLz4nO1xuICAgICAgfVxuICAgICAgbGV0IGNvbnRhY3RfbWF0Y2ggPSAgbWVtcGFja19jb250YWN0X3Jlcy5leGVjKHJlc3VsdF9kaWN0LmRhdGFfcGF0aCk7XG4gICAgICBpZihjb250YWN0X21hdGNoKVxuICAgICAge1xuICAgICAgICBkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNvbnRhY3QgPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5Db250YWN0IFByZWRpY3Rpb25zPC9hPjxiciAvPic7XG4gICAgICB9XG4gICAgICBsZXQgbGlwaWRfbWF0Y2ggPSAgbWVtcGFja19saXBpZF9yZXMuZXhlYyhyZXN1bHRfZGljdC5kYXRhX3BhdGgpO1xuICAgICAgaWYobGlwaWRfbWF0Y2gpXG4gICAgICB7XG4gICAgICAgIGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0ID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+TGlwaWQgRXhwb3N1cmUgUHJlZGl0aW9uczwvYT48YnIgLz4nO1xuICAgICAgfVxuXG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdzb3J0X3ByZXN1bHQnKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KFwicGdlbnRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZVwiLCAnJyk7XG4gICAgICByYWN0aXZlLnNldChcInBnZW50aHJlYWRlcl93YWl0aW5nX2ljb25cIiwgJycpO1xuICAgICAgcmFjdGl2ZS5zZXQoXCJwZ2VudGhyZWFkZXJfdGltZVwiLCAnJyk7XG4gICAgICBwcm9jZXNzX2ZpbGUoZmlsZV91cmwsIHJlc3VsdF9kaWN0LmRhdGFfcGF0aCwgJ3ByZXN1bHQnLCB6aXAsIHJhY3RpdmUpO1xuICAgICAgZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlID0gJzxhIGhyZWY9XCInK2ZpbGVfdXJsK3Jlc3VsdF9kaWN0LmRhdGFfcGF0aCsnXCI+cEdlblRIUkVBREVSIFRhYmxlPC9hPjxiciAvPic7XG4gICAgfVxuICAgIGlmKHJlc3VsdF9kaWN0Lm5hbWUgPT09ICdwc2V1ZG9fYmFzX2FsaWduJylcbiAgICB7XG4gICAgICBkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuYWxpZ24gPSAnPGEgaHJlZj1cIicrZmlsZV91cmwrcmVzdWx0X2RpY3QuZGF0YV9wYXRoKydcIj5wR2VuVEhSRUFERVIgQWxpZ25tZW50czwvYT48YnIgLz4nO1xuICAgIH1cbiAgfVxuICBpZighIG1lbXBhY2tfcmVzdWx0X2ZvdW5kKVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfY2FydG9vbicsICc8aDM+Tm8gcGFja2luZyBwcmVkaWN0aW9uIHBvc3NpYmxlPC9oMz4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbylcbntcbiAgbGV0IGRvd25sb2Fkc19zdHJpbmcgPSByYWN0aXZlLmdldCgnZG93bmxvYWRfbGlua3MnKTtcbiAgaWYoJ3BzaXByZWQnIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucHNpcHJlZC5ob3Jpeik7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLnBzaXByZWQuc3MyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ2Rpc29wcmVkJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5oZWFkZXIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5kaXNvcHJlZC5wYmRhdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLmRpc29wcmVkLmNvbWIpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZignbWVtc2F0c3ZtJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmRhdGEpO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1zYXRzdm0uc2NoZW1hdGljKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ubWVtc2F0c3ZtLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIjxiciAvPlwiKTtcbiAgfVxuICBpZigncGdlbnRocmVhZGVyJyBpbiBkb3dubG9hZHNfaW5mbylcbiAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5wZ2VudGhyZWFkZXIuaGVhZGVyKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLnRhYmxlKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoZG93bmxvYWRzX2luZm8ucGdlbnRocmVhZGVyLmFsaWduKTtcbiAgICBkb3dubG9hZHNfc3RyaW5nID0gZG93bmxvYWRzX3N0cmluZy5jb25jYXQoXCI8YnIgLz5cIik7XG4gIH1cbiAgaWYoJ21lbXBhY2snIGluIGRvd25sb2Fkc19pbmZvKVxuICB7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suaGVhZGVyKTtcbiAgICBpZihkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pXG4gICAge1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmNhcnRvb24pO1xuICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChkb3dubG9hZHNfaW5mby5tZW1wYWNrLmdyYXBoX291dCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2suY29udGFjdCk7XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KGRvd25sb2Fkc19pbmZvLm1lbXBhY2subGlwaWRfb3V0KTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGRvd25sb2Fkc19zdHJpbmcgPSBkb3dubG9hZHNfc3RyaW5nLmNvbmNhdChcIk5vIHBhY2tpbmcgcHJlZGljdGlvbiBwb3NzaWJsZTxiciAvPlwiKTtcbiAgICB9XG4gICAgZG93bmxvYWRzX3N0cmluZyA9IGRvd25sb2Fkc19zdHJpbmcuY29uY2F0KFwiPGJyIC8+XCIpO1xuICB9XG5cbiAgcmFjdGl2ZS5zZXQoJ2Rvd25sb2FkX2xpbmtzJywgZG93bmxvYWRzX3N0cmluZyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyIsImltcG9ydCB7IGdldF9tZW1zYXRfcmFuZ2VzIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX3NzMiB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9wYmRhdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5pbXBvcnQgeyBwYXJzZV9jb21iIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZXJzX2luZGV4LmpzJztcbmltcG9ydCB7IHBhcnNlX21lbXNhdGRhdGEgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlcnNfaW5kZXguanMnO1xuaW1wb3J0IHsgcGFyc2VfcHJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2Vyc19pbmRleC5qcyc7XG5cblxuLy9naXZlbiBhIHVybCwgaHR0cCByZXF1ZXN0IHR5cGUgYW5kIHNvbWUgZm9ybSBkYXRhIG1ha2UgYW4gaHR0cCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc2VuZF9yZXF1ZXN0KHVybCwgdHlwZSwgc2VuZF9kYXRhKVxue1xuICBjb25zb2xlLmxvZygnU2VuZGluZyBVUkkgcmVxdWVzdCcpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgdmFyIHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IHNlbmRfZGF0YSxcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICBhc3luYzogICBmYWxzZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgLy9jb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgdXJsOiB1cmwsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKVxuICAgIHtcbiAgICAgIGlmKGRhdGEgPT09IG51bGwpe2FsZXJ0KFwiRmFpbGVkIHRvIHNlbmQgZGF0YVwiKTt9XG4gICAgICByZXNwb25zZT1kYXRhO1xuICAgICAgLy9hbGVydChKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7YWxlcnQoXCJTZW5kaW5nIEpvYiB0byBcIit1cmwrXCIgRmFpbGVkLiBcIitlcnJvci5yZXNwb25zZVRleHQrXCIuIFRoZSBCYWNrZW5kIHByb2Nlc3Npbmcgc2VydmljZSB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgeW91ciBzdWJtaXNzaW9uLiBQbGVhc2UgY29udGFjdCBwc2lwcmVkQGNzLnVjbC5hYy51a1wiKTsgcmV0dXJuIG51bGw7XG4gIH19KS5yZXNwb25zZUpTT047XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cbi8vZ2l2ZW4gYSBqb2IgbmFtZSBwcmVwIGFsbCB0aGUgZm9ybSBlbGVtZW50cyBhbmQgc2VuZCBhbiBodHRwIHJlcXVlc3QgdG8gdGhlXG4vL2JhY2tlbmRcbmV4cG9ydCBmdW5jdGlvbiBzZW5kX2pvYihyYWN0aXZlLCBqb2JfbmFtZSwgc2VxLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsKVxue1xuICAvL2FsZXJ0KHNlcSk7XG4gIGNvbnNvbGUubG9nKFwiU2VuZGluZyBmb3JtIGRhdGFcIik7XG4gIGNvbnNvbGUubG9nKGpvYl9uYW1lKTtcbiAgdmFyIGZpbGUgPSBudWxsO1xuICBsZXQgdXBwZXJfbmFtZSA9IGpvYl9uYW1lLnRvVXBwZXJDYXNlKCk7XG4gIHRyeVxuICB7XG4gICAgZmlsZSA9IG5ldyBCbG9iKFtzZXFdKTtcbiAgfSBjYXRjaCAoZSlcbiAge1xuICAgIGFsZXJ0KGUpO1xuICB9XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICBmZC5hcHBlbmQoXCJpbnB1dF9kYXRhXCIsIGZpbGUsICdpbnB1dC50eHQnKTtcbiAgZmQuYXBwZW5kKFwiam9iXCIsam9iX25hbWUpO1xuICBmZC5hcHBlbmQoXCJzdWJtaXNzaW9uX25hbWVcIixuYW1lKTtcbiAgZmQuYXBwZW5kKFwiZW1haWxcIiwgZW1haWwpO1xuXG4gIGxldCByZXNwb25zZV9kYXRhID0gc2VuZF9yZXF1ZXN0KHN1Ym1pdF91cmwsIFwiUE9TVFwiLCBmZCk7XG4gIGlmKHJlc3BvbnNlX2RhdGEgIT09IG51bGwpXG4gIHtcbiAgICBsZXQgdGltZXMgPSBzZW5kX3JlcXVlc3QodGltZXNfdXJsLCdHRVQnLHt9KTtcbiAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KHRpbWVzKSk7XG4gICAgaWYoam9iX25hbWUgaW4gdGltZXMpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgdXBwZXJfbmFtZStcIiBqb2JzIHR5cGljYWxseSB0YWtlIFwiK3RpbWVzW2pvYl9uYW1lXStcIiBzZWNvbmRzXCIpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoam9iX25hbWUrJ190aW1lJywgXCJVbmFibGUgdG8gcmV0cmlldmUgYXZlcmFnZSB0aW1lIGZvciBcIit1cHBlcl9uYW1lK1wiIGpvYnMuXCIpO1xuICAgIH1cbiAgICBmb3IodmFyIGsgaW4gcmVzcG9uc2VfZGF0YSlcbiAgICB7XG4gICAgICBpZihrID09IFwiVVVJRFwiKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgnYmF0Y2hfdXVpZCcsIHJlc3BvbnNlX2RhdGFba10pO1xuICAgICAgICByYWN0aXZlLmZpcmUoJ3BvbGxfdHJpZ2dlcicsIGpvYl9uYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHNlcXVlbmNlIGZyb20gYSBwcmV2aW91cyBzdWJtaXNzaW9uIGlzIHRoZVxuLy9wYWdlIHdhcyBsb2FkZWQgd2l0aCBhIFVVSURcbmV4cG9ydCBmdW5jdGlvbiBnZXRfcHJldmlvdXNfZGF0YSh1dWlkLCBzdWJtaXRfdXJsLCBmaWxlX3VybCwgcmFjdGl2ZSlcbntcbiAgICBjb25zb2xlLmxvZygnUmVxdWVzdGluZyBkZXRhaWxzIGdpdmVuIFVSSScpO1xuICAgIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gICAgLy9hbGVydCh1cmwpO1xuICAgIGxldCBzdWJtaXNzaW9uX3Jlc3BvbnNlID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGlmKCEgc3VibWlzc2lvbl9yZXNwb25zZSl7YWxlcnQoXCJOTyBTVUJNSVNTSU9OIERBVEFcIik7fVxuICAgIGxldCBzZXEgPSBnZXRfdGV4dChmaWxlX3VybCtzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmlucHV0X2ZpbGUsIFwiR0VUXCIsIHt9KTtcbiAgICBsZXQgam9icyA9ICcnO1xuICAgIHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihzdWJtaXNzaW9uKXtcbiAgICAgIGpvYnMgKz0gc3VibWlzc2lvbi5qb2JfbmFtZStcIixcIjtcbiAgICB9KTtcbiAgICBqb2JzID0gam9icy5zbGljZSgwLCAtMSk7XG4gICAgcmV0dXJuKHsnc2VxJzogc2VxLCAnZW1haWwnOiBzdWJtaXNzaW9uX3Jlc3BvbnNlLnN1Ym1pc3Npb25zWzBdLmVtYWlsLCAnbmFtZSc6IHN1Ym1pc3Npb25fcmVzcG9uc2Uuc3VibWlzc2lvbnNbMF0uc3VibWlzc2lvbl9uYW1lLCAnam9icyc6IGpvYnN9KTtcbn1cblxuXG4vL2dldCB0ZXh0IGNvbnRlbnRzIGZyb20gYSByZXN1bHQgVVJJXG5mdW5jdGlvbiBnZXRfdGV4dCh1cmwsIHR5cGUsIHNlbmRfZGF0YSlcbntcblxuIGxldCByZXNwb25zZSA9IG51bGw7XG4gICQuYWpheCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBzZW5kX2RhdGEsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYXN5bmM6ICAgZmFsc2UsXG4gICAgLy9kYXRhVHlwZTogXCJ0eHRcIixcbiAgICAvL2NvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB1cmw6IHVybCxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpXG4gICAge1xuICAgICAgaWYoZGF0YSA9PT0gbnVsbCl7YWxlcnQoXCJGYWlsZWQgdG8gcmVxdWVzdCBpbnB1dCBkYXRhIHRleHRcIik7fVxuICAgICAgcmVzcG9uc2U9ZGF0YTtcbiAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge2FsZXJ0KFwiR2V0dGluZ3MgcmVzdWx0cyB0ZXh0IGZhaWxlZC4gVGhlIEJhY2tlbmQgcHJvY2Vzc2luZyBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrXCIpO31cbiAgfSk7XG4gIHJldHVybihyZXNwb25zZSk7XG59XG5cblxuLy9wb2xscyB0aGUgYmFja2VuZCB0byBnZXQgcmVzdWx0cyBhbmQgdGhlbiBwYXJzZXMgdGhvc2UgcmVzdWx0cyB0byBkaXNwbGF5XG4vL3RoZW0gb24gdGhlIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzX2ZpbGUodXJsX3N0dWIsIHBhdGgsIGN0bCwgemlwLCByYWN0aXZlKVxue1xuICBsZXQgdXJsID0gdXJsX3N0dWIgKyBwYXRoO1xuICBsZXQgcGF0aF9iaXRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIC8vZ2V0IGEgcmVzdWx0cyBmaWxlIGFuZCBwdXNoIHRoZSBkYXRhIGluIHRvIHRoZSBiaW8zZCBvYmplY3RcbiAgLy9hbGVydCh1cmwpO1xuICBjb25zb2xlLmxvZygnR2V0dGluZyBSZXN1bHRzIEZpbGUgYW5kIHByb2Nlc3NpbmcnKTtcbiAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBhc3luYzogICB0cnVlLFxuICAgIHVybDogdXJsLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZmlsZSlcbiAgICB7XG4gICAgICB6aXAuZm9sZGVyKHBhdGhfYml0c1sxXSkuZmlsZShwYXRoX2JpdHNbMl0sIGZpbGUpO1xuICAgICAgaWYoY3RsID09PSAnaG9yaXonKVxuICAgICAge1xuICAgICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9ob3JpeicsIGZpbGUpO1xuICAgICAgICBiaW9kMy5wc2lwcmVkKGZpbGUsICdwc2lwcmVkQ2hhcnQnLCB7cGFyZW50OiAnZGl2LnBzaXByZWRfY2FydG9vbicsIG1hcmdpbl9zY2FsZXI6IDJ9KTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3NzMicpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX3NzMihyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ3BiZGF0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcGJkYXQocmFjdGl2ZSwgZmlsZSk7XG4gICAgICAgIC8vYWxlcnQoJ1BCREFUIHByb2Nlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmKGN0bCA9PT0gJ2NvbWInKVxuICAgICAge1xuICAgICAgICBwYXJzZV9jb21iKHJhY3RpdmUsIGZpbGUpO1xuICAgICAgfVxuICAgICAgaWYoY3RsID09PSAnbWVtc2F0ZGF0YScpXG4gICAgICB7XG4gICAgICAgIHBhcnNlX21lbXNhdGRhdGEocmFjdGl2ZSwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZihjdGwgPT09ICdwcmVzdWx0JylcbiAgICAgIHtcbiAgICAgICAgcGFyc2VfcHJlc3VsdChyYWN0aXZlLCBmaWxlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHthbGVydChKU09OLnN0cmluZ2lmeShlcnJvcikpO31cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMiLCIvKiAxLiBDYXRjaCBmb3JtIGlucHV0XG4gICAgIDIuIFZlcmlmeSBmb3JtXG4gICAgIDMuIElmIGdvb2QgdGhlbiBtYWtlIGZpbGUgZnJvbSBkYXRhIGFuZCBwYXNzIHRvIGJhY2tlbmRcbiAgICAgNC4gc2hyaW5rIGZvcm0gYXdheVxuICAgICA1LiBPcGVuIHNlcSBwYW5lbFxuICAgICA2LiBTaG93IHByb2Nlc3NpbmcgYW5pbWF0aW9uXG4gICAgIDcuIGxpc3RlbiBmb3IgcmVzdWx0XG4qL1xuaW1wb3J0IHsgdmVyaWZ5X2FuZF9zZW5kX2Zvcm0gfSBmcm9tICcuL2Zvcm1zL2Zvcm1zX2luZGV4LmpzJztcbmltcG9ydCB7IHNlbmRfcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgZ2V0X3ByZXZpb3VzX2RhdGEgfSBmcm9tICcuL3JlcXVlc3RzL3JlcXVlc3RzX2luZGV4LmpzJztcbmltcG9ydCB7IGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbCB9IGZyb20gJy4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRVcmxWYXJzIH0gZnJvbSAnLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcbmltcG9ydCB7IGNsZWFyX3NldHRpbmdzIH0gZnJvbSAnLi9yYWN0aXZlX2hlbHBlcnMvcmFjdGl2ZV9oZWxwZXJzLmpzJztcbmltcG9ydCB7IHByZXBhcmVfZG93bmxvYWRzX2h0bWwgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgaGFuZGxlX3Jlc3VsdHMgfSBmcm9tICcuL3JhY3RpdmVfaGVscGVycy9yYWN0aXZlX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc2V0X2Rvd25sb2Fkc19wYW5lbCB9IGZyb20gJy4vcmFjdGl2ZV9oZWxwZXJzL3JhY3RpdmVfaGVscGVycy5qcyc7XG5cbnZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKCcuY29weUJ1dHRvbicpO1xudmFyIHppcCA9IG5ldyBKU1ppcCgpO1xuXG5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbmNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcblxuLy8gU0VUIEVORFBPSU5UUyBGT1IgREVWLCBTVEFHSU5HIE9SIFBST0RcbmxldCBlbmRwb2ludHNfdXJsID0gbnVsbDtcbmxldCBzdWJtaXRfdXJsID0gbnVsbDtcbmxldCB0aW1lc191cmwgPSBudWxsO1xubGV0IGdlYXJzX3N2ZyA9IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG5sZXQgbWFpbl91cmwgPSBcImh0dHA6Ly9iaW9pbmYuY3MudWNsLmFjLnVrXCI7XG5sZXQgYXBwX3BhdGggPSBcIi9wc2lwcmVkX2JldGFcIjtcbmxldCBmaWxlX3VybCA9ICcnO1xubGV0IGdlYXJfc3RyaW5nID0gJzxvYmplY3Qgd2lkdGg9XCIxNDBcIiBoZWlnaHQ9XCIxNDBcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGRhdGE9XCInK2dlYXJzX3N2ZysnXCI+PC9vYmplY3Q+JztcblxuaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpXG57XG4gIGVuZHBvaW50c191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvZW5kcG9pbnRzLyc7XG4gIHN1Ym1pdF91cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvc3VibWlzc2lvbi8nO1xuICB0aW1lc191cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FuYWx5dGljc19hdXRvbWF0ZWQvam9idGltZXMvJztcbiAgYXBwX3BhdGggPSAnL2ludGVyZmFjZSc7XG4gIG1haW5fdXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMCc7XG4gIGdlYXJzX3N2ZyA9IFwiLi4vc3RhdGljL2ltYWdlcy9nZWFycy5zdmdcIjtcbiAgZmlsZV91cmwgPSBtYWluX3VybDtcbn1cbmVsc2UgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwiYmlvaW5mc3RhZ2UxLmNzLnVjbC5hYy51a1wiIHx8IGxvY2F0aW9uLmhvc3RuYW1lICA9PT0gXCJiaW9pbmYuY3MudWNsLmFjLnVrXCIgfHwgbG9jYXRpb24uaHJlZiAgPT09IFwiaHR0cDovL2Jpb2luZi5jcy51Y2wuYWMudWsvcHNpcHJlZF9iZXRhL1wiKSB7XG4gIGVuZHBvaW50c191cmwgPSBtYWluX3VybCthcHBfcGF0aCsnL2FwaS9lbmRwb2ludHMvJztcbiAgc3VibWl0X3VybCA9IG1haW5fdXJsK2FwcF9wYXRoKycvYXBpL3N1Ym1pc3Npb24vJztcbiAgdGltZXNfdXJsID0gbWFpbl91cmwrYXBwX3BhdGgrJy9hcGkvam9idGltZXMvJztcbiAgZmlsZV91cmwgPSBtYWluX3VybCthcHBfcGF0aCtcIi9hcGlcIjtcbiAgLy9nZWFyc19zdmcgPSBcIi4uL3N0YXRpYy9pbWFnZXMvZ2VhcnMuc3ZnXCI7XG59XG5lbHNlIHtcbiAgYWxlcnQoJ1VOU0VUVElORyBFTkRQT0lOVFMgV0FSTklORywgV0FSTklORyEnKTtcbiAgZW5kcG9pbnRzX3VybCA9ICcnO1xuICBzdWJtaXRfdXJsID0gJyc7XG4gIHRpbWVzX3VybCA9ICcnO1xufVxuXG4vLyBERUNMQVJFIFZBUklBQkxFUyBhbmQgaW5pdCByYWN0aXZlIGluc3RhbmNlXG52YXIgcmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgZWw6ICcjcHNpcHJlZF9zaXRlJyxcbiAgdGVtcGxhdGU6ICcjZm9ybV90ZW1wbGF0ZScsXG4gIGRhdGE6IHtcbiAgICAgICAgICBzZXF1ZW5jZV9mb3JtX3Zpc2libGU6IDEsXG4gICAgICAgICAgc3RydWN0dXJlX2Zvcm1fdmlzaWJsZTogMCxcbiAgICAgICAgICByZXN1bHRzX3Zpc2libGU6IDEsXG4gICAgICAgICAgcmVzdWx0c19wYW5lbF92aXNpYmxlOiAxLFxuICAgICAgICAgIHN1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGU6IDAsXG4gICAgICAgICAgbW9kZWxsZXJfa2V5OiBudWxsLFxuXG4gICAgICAgICAgcHNpcHJlZF9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBwc2lwcmVkX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgZGlzb3ByZWRfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgZGlzb3ByZWRfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICBtZW1zYXRzdm1fY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgbWVtc2F0c3ZtX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgcGdlbnRocmVhZGVyX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl9idXR0b246IGZhbHNlLFxuICAgICAgICAgIG1lbXBhY2tfY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgICBtZW1wYWNrX2J1dHRvbjogZmFsc2UsXG4gICAgICAgICAgZ2VudGhyZWFkZXJfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgZ2VudGhyZWFkZXJfYnV0dG9uOiBmYWxzZSxcblxuXG4gICAgICAgICAgLy8gcGdlbnRocmVhZGVyX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIHBkb210aHJlYWRlcl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAvLyBkb21wcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIG1lbXBhY2tfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgLy8gZmZwcmVkX2NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIC8vIGJpb3NlcmZfY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgLy8gZG9tc2VyZl9jaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICBkb3dubG9hZF9saW5rczogJycsXG4gICAgICAgICAgcHNpcHJlZF9qb2I6ICdwc2lwcmVkX2pvYicsXG4gICAgICAgICAgZGlzb3ByZWRfam9iOiAnZGlzb3ByZWRfam9iJyxcbiAgICAgICAgICBtZW1zYXRzdm1fam9iOiAnbWVtc2F0c3ZtX2pvYicsXG4gICAgICAgICAgcGdlbnRocmVhZGVyX2pvYjogJ3BnZW50aHJlYWRlcl9qb2InLFxuICAgICAgICAgIG1lbXBhY2tfam9iOiAnbWVtcGFja19qb2InLFxuXG4gICAgICAgICAgcHNpcHJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgUFNJUFJFRCBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBwc2lwcmVkX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgcHNpcHJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBwc2lwcmVkX2hvcml6OiBudWxsLFxuXG4gICAgICAgICAgZGlzb3ByZWRfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIERJU09QUkVEIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGRpc29wcmVkX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgZGlzb3ByZWRfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgZGlzb19wcmVjaXNpb246IG51bGwsXG5cbiAgICAgICAgICBtZW1zYXRzdm1fd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIE1FTVNBVC1TVk0gam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgbWVtc2F0c3ZtX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgbWVtc2F0c3ZtX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIG1lbXNhdHN2bV9zY2hlbWF0aWM6ICcnLFxuICAgICAgICAgIG1lbXNhdHN2bV9jYXJ0b29uOiAnJyxcblxuICAgICAgICAgIHBnZW50aHJlYWRlcl93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgcEdlblRIUkVBREVSIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIHBnZW50aHJlYWRlcl90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBwZ2VuX3RhYmxlOiBudWxsLFxuICAgICAgICAgIHBnZW5fYW5uX3NldDoge30sXG5cbiAgICAgICAgICBtZW1wYWNrX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBNRU1QQUNLIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIG1lbXBhY2tfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBtZW1wYWNrX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIG1lbXNhdHBhY2tfc2NoZW1hdGljOiAnJyxcbiAgICAgICAgICBtZW1zYXRwYWNrX2NhcnRvb246ICcnLFxuXG4gICAgICAgICAgZ2VudGhyZWFkZXJfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIEdlblRIUkVBREVSIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGdlbnRocmVhZGVyX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgZ2VudGhyZWFkZXJfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgZ2VudGhyZWFkZXJfZGF0YTogbnVsbCxcblxuICAgICAgICAgIGRvbXByZWRfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIERPTVBSRUQgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgZG9tcHJlZF93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIGRvbXByZWRfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgZG9tcHJlZF9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgcGRvbXRocmVhZGVyX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBwRG9tVEhSRUFERVIgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgcGRvbXRocmVhZGVyX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgcGRvbXRocmVhZGVyX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIHBkb210aHJlYWRlcl9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgYmlvc2VyZl93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgQmlvU2VyZiBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBiaW9zZXJmX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgYmlvc2VyZl90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBiaW9zZXJmX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBkb21zZXJmX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgeW91ciBEb21TZXJmIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGRvbXNlcmZfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBkb21zZXJmX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIGRvbXNlcmZfZGF0YTogbnVsbCxcblxuICAgICAgICAgIGZmcHJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgRkZQcmVkIGpvYiB0byBwcm9jZXNzPC9oMj4nLFxuICAgICAgICAgIGZmcHJlZF93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIGZmcHJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBmZnByZWRfZGF0YTogbnVsbCxcblxuICAgICAgICAgIG1ldGFwc2ljb3Zfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIE1ldGFQU0lDT1Ygam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgbWV0YXBzaWNvdl93YWl0aW5nX2ljb246IGdlYXJfc3RyaW5nLFxuICAgICAgICAgIG1ldGFwc2ljb3ZfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgbWV0YXBzaWNvdl9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgbWV0c2l0ZV93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTWV0U2l0ZSBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBtZXRzaXRlX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgbWV0c2l0ZV90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBtZXRzaXRlX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBoc3ByZWRfd2FpdGluZ19tZXNzYWdlOiAnPGgyPlBsZWFzZSB3YWl0IGZvciB5b3VyIEhTUHJlZCBqb2IgdG8gcHJvY2VzczwvaDI+JyxcbiAgICAgICAgICBoc3ByZWRfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBoc3ByZWRfdGltZTogJ0xvYWRpbmcgRGF0YScsXG4gICAgICAgICAgaHNwcmVkX2RhdGE6IG51bGwsXG5cbiAgICAgICAgICBtZW1lbWJlZF93YWl0aW5nX21lc3NhZ2U6ICc8aDI+UGxlYXNlIHdhaXQgZm9yIHlvdXIgTUVNRU1CRUQgam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgbWVtZW1iZWRfd2FpdGluZ19pY29uOiBnZWFyX3N0cmluZyxcbiAgICAgICAgICBtZW1lbWJlZF90aW1lOiAnTG9hZGluZyBEYXRhJyxcbiAgICAgICAgICBtZW1lbWJlZF9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgZ2VudGRiX3dhaXRpbmdfbWVzc2FnZTogJzxoMj5QbGVhc2Ugd2FpdCBmb3IgVERCIEdlbmVyYXRpb24gam9iIHRvIHByb2Nlc3M8L2gyPicsXG4gICAgICAgICAgZ2VudGRiX3dhaXRpbmdfaWNvbjogZ2Vhcl9zdHJpbmcsXG4gICAgICAgICAgZ2VudGRiX3RpbWU6ICdMb2FkaW5nIERhdGEnLFxuICAgICAgICAgIGdlbnRkYl9kYXRhOiBudWxsLFxuXG4gICAgICAgICAgLy8gU2VxdWVuY2UgYW5kIGpvYiBpbmZvXG4gICAgICAgICAgc2VxdWVuY2U6ICcnLFxuICAgICAgICAgIHNlcXVlbmNlX2xlbmd0aDogMSxcbiAgICAgICAgICBzdWJzZXF1ZW5jZV9zdGFydDogMSxcbiAgICAgICAgICBzdWJzZXF1ZW5jZV9zdG9wOiAxLFxuICAgICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICBiYXRjaF91dWlkOiBudWxsLFxuXG4gICAgICAgICAgLy9ob2xkIGFubm90YXRpb25zIHRoYXQgYXJlIHJlYWQgZnJvbSBkYXRhZmlsZXNcbiAgICAgICAgICBhbm5vdGF0aW9uczogbnVsbCxcbiAgICAgICAgfVxufSk7XG5cbi8vc2V0IHNvbWUgdGhpbmdzIG9uIHRoZSBwYWdlIGZvciB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyXG5pZihsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIikge1xuICByYWN0aXZlLnNldCgnZW1haWwnLCAnZGFuaWVsLmJ1Y2hhbkB1Y2wuYWMudWsnKTtcbiAgcmFjdGl2ZS5zZXQoJ25hbWUnLCAndGVzdCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCAnUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVNEUVdFQVMnKTtcbn1cblxuLy80YjZhZDc5Mi1lZDFmLTExZTUtODk4Ni05ODkwOTZjMTNlZTZcbmxldCB1dWlkX3JlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbmxldCB1dWlkX21hdGNoID0gdXVpZF9yZWdleC5leGVjKGdldFVybFZhcnMoKS51dWlkKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vXG4vLyBBUFBMSUNBVElPTiBIRVJFXG4vL1xuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9IZXJlIHdlcmUga2VlcCBhbiBleWUgb24gc29tZSBmb3JtIGVsZW1lbnRzIGFuZCByZXdyaXRlIHRoZSBuYW1lIGlmIHBlb3BsZVxuLy9oYXZlIHByb3ZpZGVkIGEgZmFzdGEgZm9ybWF0dGVkIHNlcVxubGV0IHNlcV9vYnNlcnZlciA9IHJhY3RpdmUub2JzZXJ2ZSgnc2VxdWVuY2UnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUgKSB7XG4gIGxldCByZWdleCA9IC9ePiguKz8pXFxzLztcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhuZXdWYWx1ZSk7XG4gIGlmKG1hdGNoKVxuICB7XG4gICAgdGhpcy5zZXQoJ25hbWUnLCBtYXRjaFsxXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgdGhpcy5zZXQoJ25hbWUnLCBudWxsKTtcbiAgLy8gfVxuXG4gIH0sXG4gIHtpbml0OiBmYWxzZSxcbiAgIGRlZmVyOiB0cnVlXG4gfSk7XG4vL3RoZXNlcyB0d28gb2JzZXJ2ZXJzIHN0b3AgcGVvcGxlIHNldHRpbmcgdGhlIHJlc3VibWlzc2lvbiB3aWRnZXQgb3V0IG9mIGJvdW5kc1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RvcCcsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIGxldCBzZXFfbGVuZ3RoID0gcmFjdGl2ZS5nZXQoJ3NlcXVlbmNlX2xlbmd0aCcpO1xuICBsZXQgc2VxX3N0YXJ0ID0gcmFjdGl2ZS5nZXQoJ3N1YnNlcXVlbmNlX3N0YXJ0Jyk7XG4gIGlmKHZhbHVlID4gc2VxX2xlbmd0aClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxX2xlbmd0aCk7XG4gIH1cbiAgaWYodmFsdWUgPD0gc2VxX3N0YXJ0KVxuICB7XG4gICAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzZXFfc3RhcnQrMSk7XG4gIH1cbn0pO1xucmFjdGl2ZS5vYnNlcnZlKCAnc3Vic2VxdWVuY2Vfc3RhcnQnLCBmdW5jdGlvbiAoIHZhbHVlICkge1xuICBsZXQgc2VxX3N0b3AgPSByYWN0aXZlLmdldCgnc3Vic2VxdWVuY2Vfc3RvcCcpO1xuICBpZih2YWx1ZSA8IDEpXG4gIHtcbiAgICByYWN0aXZlLnNldCgnc3Vic2VxdWVuY2Vfc3RhcnQnLCAxKTtcbiAgfVxuICBpZih2YWx1ZSA+PSBzZXFfc3RvcClcbiAge1xuICAgIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdGFydCcsIHNlcV9zdG9wLTEpO1xuICB9XG59KTtcblxuLy9BZnRlciBhIGpvYiBoYXMgYmVlbiBzZW50IG9yIGEgVVJMIGFjY2VwdGVkIHRoaXMgcmFjdGl2ZSBibG9jayBpcyBjYWxsZWQgdG9cbi8vcG9sbCB0aGUgYmFja2VuZCB0byBnZXQgdGhlIHJlc3VsdHNcbnJhY3RpdmUub24oJ3BvbGxfdHJpZ2dlcicsIGZ1bmN0aW9uKG5hbWUsIGpvYl90eXBlKXtcbiAgY29uc29sZS5sb2coXCJQb2xsaW5nIGJhY2tlbmQgZm9yIHJlc3VsdHNcIik7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsICsgcmFjdGl2ZS5nZXQoJ2JhdGNoX3V1aWQnKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIGFwcF9wYXRoKycvJnV1aWQ9JytyYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpKTtcbiAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuXG4gIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGJhdGNoID0gc2VuZF9yZXF1ZXN0KHVybCwgXCJHRVRcIiwge30pO1xuICAgIGxldCBkb3dubG9hZHNfaW5mbyA9IHt9O1xuXG4gICAgaWYoYmF0Y2guc3RhdGUgPT09ICdDb21wbGV0ZScpXG4gICAge1xuICAgICAgY29uc29sZS5sb2coXCJSZW5kZXIgcmVzdWx0c1wiKTtcbiAgICAgIGxldCBzdWJtaXNzaW9ucyA9IGJhdGNoLnN1Ym1pc3Npb25zO1xuICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBwcmVwYXJlX2Rvd25sb2Fkc19odG1sKGRhdGEsIGRvd25sb2Fkc19pbmZvKTtcbiAgICAgICAgICBoYW5kbGVfcmVzdWx0cyhyYWN0aXZlLCBkYXRhLCBmaWxlX3VybCwgemlwLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIH0pO1xuICAgICAgc2V0X2Rvd25sb2Fkc19wYW5lbChyYWN0aXZlLCBkb3dubG9hZHNfaW5mbyk7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBpZihiYXRjaC5zdGF0ZSA9PT0gJ0Vycm9yJyB8fCBiYXRjaC5zdGF0ZSA9PT0gJ0NyYXNoJylcbiAgICB7XG4gICAgICBsZXQgc3VibWlzc2lvbl9tZXNzYWdlID0gYmF0Y2guc3VibWlzc2lvbnNbMF0ubGFzdF9tZXNzYWdlO1xuICAgICAgYWxlcnQoXCJQT0xMSU5HIEVSUk9SOiBKb2IgRmFpbGVkXFxuXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSBDb250YWN0IHBzaXByZWRAY3MudWNsLmFjLnVrIHF1b3RpbmcgdGhpcyBlcnJvciBtZXNzYWdlIGFuZCB5b3VyIGpvYiBJRFxcblwiK3N1Ym1pc3Npb25fbWVzc2FnZSk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgNTAwMCk7XG5cbn0se2luaXQ6IGZhbHNlLFxuICAgZGVmZXI6IHRydWVcbiB9XG4pO1xuXG4vLyBPbiBjbGlja2luZyB0aGUgR2V0IFppcCBmaWxlIGxpbmsgdGhpcyB3YXRjaGVycyBwcmVwYXJlcyB0aGUgemlwIGFuZCBoYW5kcyBpdCB0byB0aGUgdXNlclxucmFjdGl2ZS5vbignZ2V0X3ppcCcsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgbGV0IHV1aWQgPSByYWN0aXZlLmdldCgnYmF0Y2hfdXVpZCcpO1xuICAgIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICBzYXZlQXMoYmxvYiwgdXVpZCtcIi56aXBcIik7XG4gICAgfSk7XG59KTtcblxuLy8gVGhlc2UgcmVhY3QgdG8gdGhlIGhlYWRlcnMgYmVpbmcgY2xpY2tlZCB0byB0b2dnbGUgdGhlIHJlc3VsdHMgcGFuZWxcbi8vXG5yYWN0aXZlLm9uKCAnc2VxdWVuY2VfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdzdHJ1Y3R1cmVfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCAncHNpcHJlZF9jaGVja2VkJywgdHJ1ZSk7XG4gIHJhY3RpdmUuc2V0KCAnZGlzb3ByZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZW1zYXRzdm1fY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdwZ2VudGhyZWFkZXJfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZW1wYWNrX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZ2VudGhyZWFkZXJfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdkb21wcmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAncGRvbXRocmVhZGVyX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnYmlvc2VyZl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2RvbXNlcmZfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdmZnByZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZXRhcHNpY292X2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnbWV0c2l0ZV9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2hzcHJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ21lbWVtYmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZ2VudGRiX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnc2VxdWVuY2VfZm9ybV92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ3N0cnVjdHVyZV9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3NlcXVlbmNlX2Zvcm1fdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdzZXF1ZW5jZV9mb3JtX3Zpc2libGUnLCAwICk7XG4gIHJhY3RpdmUuc2V0KCAncHNpcHJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2Rpc29wcmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnbWVtc2F0c3ZtX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAncGdlbnRocmVhZGVyX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnbWVtcGFja19jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2dlbnRocmVhZGVyX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZG9tcHJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ3Bkb210aHJlYWRlcl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2Jpb3NlcmZfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdkb21zZXJmX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnZmZwcmVkX2NoZWNrZWQnLCBmYWxzZSk7XG4gIHJhY3RpdmUuc2V0KCAnbWV0YXBzaWNvdl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ21ldHNpdGVfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdoc3ByZWRfY2hlY2tlZCcsIGZhbHNlKTtcbiAgcmFjdGl2ZS5zZXQoICdtZW1lbWJlZF9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ2dlbnRkYl9jaGVja2VkJywgZmFsc2UpO1xuICByYWN0aXZlLnNldCggJ3N0cnVjdHVyZV9mb3JtX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAnc3RydWN0dXJlX2Zvcm1fdmlzaWJsZScsIDEgKTtcbn0pO1xuXG5yYWN0aXZlLm9uKCAnZG93bmxvYWRzX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDExICk7XG59KTtcbnJhY3RpdmUub24oICdwc2lwcmVkX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEgKTtcbiAgaWYocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSlcbiAge1xuICAgIGJpb2QzLnBzaXByZWQocmFjdGl2ZS5nZXQoJ3BzaXByZWRfaG9yaXonKSwgJ3BzaXByZWRDaGFydCcsIHtwYXJlbnQ6ICdkaXYucHNpcHJlZF9jYXJ0b29uJywgbWFyZ2luX3NjYWxlcjogMn0pO1xuICB9XG59KTtcbnJhY3RpdmUub24oICdkaXNvcHJlZF9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA0ICk7XG4gIGlmKHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpKVxuICB7XG4gICAgYmlvZDMuZ2VuZXJpY3h5TGluZUNoYXJ0KHJhY3RpdmUuZ2V0KCdkaXNvX3ByZWNpc2lvbicpLCAncG9zJywgWydwcmVjaXNpb24nXSwgWydCbGFjaycsXSwgJ0Rpc29OTkNoYXJ0Jywge3BhcmVudDogJ2Rpdi5jb21iX3Bsb3QnLCBjaGFydFR5cGU6ICdsaW5lJywgeV9jdXRvZmY6IDAuNSwgbWFyZ2luX3NjYWxlcjogMiwgZGVidWc6IGZhbHNlLCBjb250YWluZXJfd2lkdGg6IDkwMCwgd2lkdGg6IDkwMCwgaGVpZ2h0OiAzMDAsIGNvbnRhaW5lcl9oZWlnaHQ6IDMwMH0pO1xuICB9XG59KTtcbnJhY3RpdmUub24oICdtZW1zYXRzdm1fYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNiApO1xufSk7XG5yYWN0aXZlLm9uKCAncGdlbnRocmVhZGVyX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDIgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ21lbXBhY2tfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNSApO1xufSk7XG5yYWN0aXZlLm9uKCAnZ2VudGhyZWFkZXJfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNyApO1xufSk7XG5yYWN0aXZlLm9uKCAnZG9tcHJlZF9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA4ICk7XG59KTtcbnJhY3RpdmUub24oICdwZG9tdGhyZWFkZXJfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgOSApO1xufSk7XG5yYWN0aXZlLm9uKCAnYmlvc2VyZl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCApO1xufSk7XG5yYWN0aXZlLm9uKCAnZG9tc2VyZl9hY3RpdmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIG51bGwgKTtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMiApO1xufSk7XG5yYWN0aXZlLm9uKCAnZmZwcmVkX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzICk7XG59KTtcbnJhY3RpdmUub24oICdtZXRhcHNpY292X2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE4ICk7XG59KTtcbnJhY3RpdmUub24oICdtZXRzaXRlX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0ICk7XG59KTtcbnJhY3RpdmUub24oICdoc3ByZWRfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTUgKTtcbn0pO1xucmFjdGl2ZS5vbiggJ21lbWVtYmVkX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgbnVsbCApO1xuICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE2ICk7XG59KTtcbnJhY3RpdmUub24oICdnZW50ZGJfYWN0aXZlJywgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCBudWxsICk7XG4gIHJhY3RpdmUuc2V0KCAncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMTcgKTtcbn0pO1xuXG5cbnJhY3RpdmUub24oICdzdWJtaXNzaW9uX2FjdGl2ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gIGxldCBzdGF0ZSA9IHJhY3RpdmUuZ2V0KCdzdWJtaXNzaW9uX3dpZGdldF92aXNpYmxlJyk7XG4gIGlmKHN0YXRlID09PSAxKXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAwICk7XG4gIH1cbiAgZWxzZXtcbiAgICByYWN0aXZlLnNldCggJ3N1Ym1pc3Npb25fd2lkZ2V0X3Zpc2libGUnLCAxICk7XG4gIH1cbn0pO1xuXG4vL2dyYWIgdGhlIHN1Ym1pdCBldmVudCBmcm9tIHRoZSBtYWluIGZvcm0gYW5kIHNlbmQgdGhlIHNlcXVlbmNlIHRvIHRoZSBiYWNrZW5kXG5yYWN0aXZlLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBkYXRhJyk7XG4gIGxldCBzZXEgPSB0aGlzLmdldCgnc2VxdWVuY2UnKTtcbiAgc2VxID0gc2VxLnJlcGxhY2UoL14+LiskL21nLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xuICBzZXEgPSBzZXEucmVwbGFjZSgvXFxufFxccy9nLFwiXCIpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScsIHNlcSk7XG5cbiAgbGV0IG5hbWUgPSB0aGlzLmdldCgnbmFtZScpO1xuICBsZXQgZW1haWwgPSB0aGlzLmdldCgnZW1haWwnKTtcbiAgbGV0IHBzaXByZWRfam9iID0gdGhpcy5nZXQoJ3BzaXByZWRfam9iJyk7XG4gIGxldCBwc2lwcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgncHNpcHJlZF9jaGVja2VkJyk7XG4gIGxldCBkaXNvcHJlZF9qb2IgPSB0aGlzLmdldCgnZGlzb3ByZWRfam9iJyk7XG4gIGxldCBkaXNvcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ2Rpc29wcmVkX2NoZWNrZWQnKTtcbiAgbGV0IG1lbXNhdHN2bV9qb2IgPSB0aGlzLmdldCgnbWVtc2F0c3ZtX2pvYicpO1xuICBsZXQgbWVtc2F0c3ZtX2NoZWNrZWQgPSB0aGlzLmdldCgnbWVtc2F0c3ZtX2NoZWNrZWQnKTtcbiAgbGV0IHBnZW50aHJlYWRlcl9qb2IgPSB0aGlzLmdldCgncGdlbnRocmVhZGVyX2pvYicpO1xuICBsZXQgcGdlbnRocmVhZGVyX2NoZWNrZWQgPSB0aGlzLmdldCgncGdlbnRocmVhZGVyX2NoZWNrZWQnKTtcbiAgbGV0IG1lbXBhY2tfam9iID0gdGhpcy5nZXQoJ21lbXBhY2tfam9iJyk7XG4gIGxldCBtZW1wYWNrX2NoZWNrZWQgPSB0aGlzLmdldCgnbWVtcGFja19jaGVja2VkJyk7XG4gIGxldCBnZW50aHJlYWRlcl9qb2IgPSB0aGlzLmdldCgnZ2VudGhyZWFkZXJfam9iJyk7XG4gIGxldCBnZW50aHJlYWRlcl9jaGVja2VkID0gdGhpcy5nZXQoJ2dlbnRocmVhZGVyX2NoZWNrZWQnKTtcbiAgbGV0IGRvbXByZWRfam9iID0gdGhpcy5nZXQoJ2RvbXByZWRfam9iJyk7XG4gIGxldCBkb21wcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnZG9tcHJlZF9jaGVja2VkJyk7XG4gIGxldCBwZG9tdGhyZWFkZXJfam9iID0gdGhpcy5nZXQoJ3Bkb210aHJlYWRlcl9qb2InKTtcbiAgbGV0IHBkb210aHJlYWRlcl9jaGVja2VkID0gdGhpcy5nZXQoJ3Bkb210aHJlYWRlcl9jaGVja2VkJyk7XG4gIGxldCBiaW9zZXJmX2pvYiA9IHRoaXMuZ2V0KCdiaW9zZXJmX2pvYicpO1xuICBsZXQgYmlvc2VyZl9jaGVja2VkID0gdGhpcy5nZXQoJ2Jpb3NlcmZfY2hlY2tlZCcpO1xuICBsZXQgZG9tc2VyZl9qb2IgPSB0aGlzLmdldCgnZG9tc2VyZl9qb2InKTtcbiAgbGV0IGRvbXNlcmZfY2hlY2tlZCA9IHRoaXMuZ2V0KCdkb21zZXJmX2NoZWNrZWQnKTtcbiAgbGV0IGZmcHJlZF9qb2IgPSB0aGlzLmdldCgnZmZwcmVkX2pvYicpO1xuICBsZXQgZmZwcmVkX2NoZWNrZWQgPSB0aGlzLmdldCgnZmZwcmVkX2NoZWNrZWQnKTtcbiAgbGV0IG1ldGFwc2ljb3Zfam9iID0gdGhpcy5nZXQoJ21ldGFwc2ljb3Zfam9iJyk7XG4gIGxldCBtZXRhcHNpY292X2NoZWNrZWQgPSB0aGlzLmdldCgnbWV0YXBzaWNvdl9jaGVja2VkJyk7XG4gIGxldCBtZXRzaXRlX2pvYiA9IHRoaXMuZ2V0KCdtZXRhc2l0ZV9qb2InKTtcbiAgbGV0IG1ldHNpdGVfY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZXRhc2l0ZV9jaGVja2VkJyk7XG4gIGxldCBoc3ByZWRfam9iID0gdGhpcy5nZXQoJ2hzcHJlZF9qb2InKTtcbiAgbGV0IGhzcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ2hzcHJlZF9jaGVja2VkJyk7XG4gIGxldCBtZW1lbWJlZF9qb2IgPSB0aGlzLmdldCgnbWVtZW1iZWRfam9iJyk7XG4gIGxldCBtZW1lbWJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ21lbWVtYmVkX2NoZWNrZWQnKTtcbiAgbGV0IGdlbnRkYl9qb2IgPSB0aGlzLmdldCgnZ2VudGRiX2pvYicpO1xuICBsZXQgZ2VudGRiX2NoZWNrZWQgPSB0aGlzLmdldCgnZ2VudGRiX2NoZWNrZWQnKTtcblxuICB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIHBzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgbWVtc2F0c3ZtX2NoZWNrZWQsIHBnZW50aHJlYWRlcl9jaGVja2VkLCBtZW1wYWNrX2NoZWNrZWQsIGdlbnRocmVhZGVyX2NoZWNrZWQsIGRvbXByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgcGRvbXRocmVhZGVyX2NoZWNrZWQsIGJpb3NlcmZfY2hlY2tlZCwgZG9tc2VyZl9jaGVja2VkLCBmZnByZWRfY2hlY2tlZCwgbWV0YXBzaWNvdl9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBtZXRzaXRlX2NoZWNrZWQsIGhzcHJlZF9jaGVja2VkLCBtZW1lbWJlZF9jaGVja2VkLCBnZW50ZGJfY2hlY2tlZCk7XG4gIGV2ZW50Lm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gZ3JhYiB0aGUgc3VibWl0IGV2ZW50IGZyb20gdGhlIFJlc3VibWlzc2lvbiB3aWRnZXQsIHRydW5jYXRlIHRoZSBzZXF1ZW5jZVxuLy8gYW5kIHNlbmQgYSBuZXcgam9iXG5yYWN0aXZlLm9uKCdyZXN1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKCdSZXN1Ym1pdHRpbmcgc2VnbWVudCcpO1xuICBsZXQgc3RhcnQgPSByYWN0aXZlLmdldChcInN1YnNlcXVlbmNlX3N0YXJ0XCIpO1xuICBsZXQgc3RvcCA9IHJhY3RpdmUuZ2V0KFwic3Vic2VxdWVuY2Vfc3RvcFwiKTtcbiAgbGV0IHNlcXVlbmNlID0gcmFjdGl2ZS5nZXQoXCJzZXF1ZW5jZVwiKTtcbiAgbGV0IHN1YnNlcXVlbmNlID0gc2VxdWVuY2Uuc3Vic3RyaW5nKHN0YXJ0LTEsIHN0b3ApO1xuICBsZXQgbmFtZSA9IHRoaXMuZ2V0KCduYW1lJykrXCJfc2VnXCI7XG4gIGxldCBlbWFpbCA9IHRoaXMuZ2V0KCdlbWFpbCcpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc3Vic2VxdWVuY2UubGVuZ3RoKTtcbiAgcmFjdGl2ZS5zZXQoJ3N1YnNlcXVlbmNlX3N0b3AnLCBzdWJzZXF1ZW5jZS5sZW5ndGgpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2UnLCBzdWJzZXF1ZW5jZSk7XG4gIHJhY3RpdmUuc2V0KCduYW1lJywgbmFtZSk7XG4gIGxldCBwc2lwcmVkX2pvYiA9IHRoaXMuZ2V0KCdwc2lwcmVkX2pvYicpO1xuICBsZXQgcHNpcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ3BzaXByZWRfY2hlY2tlZCcpO1xuICBsZXQgZGlzb3ByZWRfam9iID0gdGhpcy5nZXQoJ2Rpc29wcmVkX2pvYicpO1xuICBsZXQgZGlzb3ByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdkaXNvcHJlZF9jaGVja2VkJyk7XG4gIGxldCBtZW1zYXRzdm1fam9iID0gdGhpcy5nZXQoJ21lbXNhdHN2bV9qb2InKTtcbiAgbGV0IG1lbXNhdHN2bV9jaGVja2VkID0gdGhpcy5nZXQoJ21lbXNhdHN2bV9jaGVja2VkJyk7XG4gIGxldCBwZ2VudGhyZWFkZXJfam9iID0gdGhpcy5nZXQoJ3BnZW50aHJlYWRlcl9qb2InKTtcbiAgbGV0IHBnZW50aHJlYWRlcl9jaGVja2VkID0gdGhpcy5nZXQoJ3BnZW50aHJlYWRlcl9jaGVja2VkJyk7XG4gIGxldCBtZW1wYWNrX2pvYiA9IHRoaXMuZ2V0KCdtZW1wYWNrX2pvYicpO1xuICBsZXQgbWVtcGFja19jaGVja2VkID0gdGhpcy5nZXQoJ21lbXBhY2tfY2hlY2tlZCcpO1xuICBsZXQgZ2VudGhyZWFkZXJfam9iID0gdGhpcy5nZXQoJ2dlbnRocmVhZGVyX2pvYicpO1xuICBsZXQgZ2VudGhyZWFkZXJfY2hlY2tlZCA9IHRoaXMuZ2V0KCdnZW50aHJlYWRlcl9jaGVja2VkJyk7XG4gIGxldCBkb21wcmVkX2pvYiA9IHRoaXMuZ2V0KCdkb21wcmVkX2pvYicpO1xuICBsZXQgZG9tcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ2RvbXByZWRfY2hlY2tlZCcpO1xuICBsZXQgcGRvbXRocmVhZGVyX2pvYiA9IHRoaXMuZ2V0KCdwZG9tdGhyZWFkZXJfam9iJyk7XG4gIGxldCBwZG9tdGhyZWFkZXJfY2hlY2tlZCA9IHRoaXMuZ2V0KCdwZG9tdGhyZWFkZXJfY2hlY2tlZCcpO1xuICBsZXQgYmlvc2VyZl9qb2IgPSB0aGlzLmdldCgnYmlvc2VyZl9qb2InKTtcbiAgbGV0IGJpb3NlcmZfY2hlY2tlZCA9IHRoaXMuZ2V0KCdiaW9zZXJmX2NoZWNrZWQnKTtcbiAgbGV0IGRvbXNlcmZfam9iID0gdGhpcy5nZXQoJ2RvbXNlcmZfam9iJyk7XG4gIGxldCBkb21zZXJmX2NoZWNrZWQgPSB0aGlzLmdldCgnZG9tc2VyZl9jaGVja2VkJyk7XG4gIGxldCBmZnByZWRfam9iID0gdGhpcy5nZXQoJ2ZmcHJlZF9qb2InKTtcbiAgbGV0IGZmcHJlZF9jaGVja2VkID0gdGhpcy5nZXQoJ2ZmcHJlZF9jaGVja2VkJyk7XG4gIGxldCBtZXRhcHNpY292X2pvYiA9IHRoaXMuZ2V0KCdtZXRhcHNpY292X2pvYicpO1xuICBsZXQgbWV0YXBzaWNvdl9jaGVja2VkID0gdGhpcy5nZXQoJ21ldGFwc2ljb3ZfY2hlY2tlZCcpO1xuICBsZXQgbWV0c2l0ZV9qb2IgPSB0aGlzLmdldCgnbWV0YXNpdGVfam9iJyk7XG4gIGxldCBtZXRzaXRlX2NoZWNrZWQgPSB0aGlzLmdldCgnbWV0YXNpdGVfY2hlY2tlZCcpO1xuICBsZXQgaHNwcmVkX2pvYiA9IHRoaXMuZ2V0KCdoc3ByZWRfam9iJyk7XG4gIGxldCBoc3ByZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdoc3ByZWRfY2hlY2tlZCcpO1xuICBsZXQgbWVtZW1iZWRfam9iID0gdGhpcy5nZXQoJ21lbWVtYmVkX2pvYicpO1xuICBsZXQgbWVtZW1iZWRfY2hlY2tlZCA9IHRoaXMuZ2V0KCdtZW1lbWJlZF9jaGVja2VkJyk7XG4gIGxldCBnZW50ZGJfam9iID0gdGhpcy5nZXQoJ2dlbnRkYl9qb2InKTtcbiAgbGV0IGdlbnRkYl9jaGVja2VkID0gdGhpcy5nZXQoJ2dlbnRkYl9jaGVja2VkJyk7XG4gIC8vY2xlYXIgd2hhdCB3ZSBoYXZlIHByZXZpb3VzbHkgd3JpdHRlblxuICBjbGVhcl9zZXR0aW5ncyhyYWN0aXZlLCBnZWFyX3N0cmluZyk7XG4gIC8vdmVyaWZ5IGZvcm0gY29udGVudHMgYW5kIHBvc3RcbiAgLy9jb25zb2xlLmxvZyhuYW1lKTtcbiAgLy9jb25zb2xlLmxvZyhlbWFpbCk7XG4gIHZlcmlmeV9hbmRfc2VuZF9mb3JtKHJhY3RpdmUsIHN1YnNlcXVlbmNlLCBuYW1lLCBlbWFpbCwgc3VibWl0X3VybCwgdGltZXNfdXJsLCBwc2lwcmVkX2NoZWNrZWQsIGRpc29wcmVkX2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIG1lbXNhdHN2bV9jaGVja2VkLCBwZ2VudGhyZWFkZXJfY2hlY2tlZCwgbWVtcGFja19jaGVja2VkLCBnZW50aHJlYWRlcl9jaGVja2VkLCBkb21wcmVkX2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIHBkb210aHJlYWRlcl9jaGVja2VkLCBiaW9zZXJmX2NoZWNrZWQsIGRvbXNlcmZfY2hlY2tlZCwgZmZwcmVkX2NoZWNrZWQsIG1ldGFwc2ljb3ZfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgbWV0c2l0ZV9jaGVja2VkLCBoc3ByZWRfY2hlY2tlZCwgbWVtZW1iZWRfY2hlY2tlZCwgZ2VudGRiX2NoZWNrZWQpO1xuICAvL3dyaXRlIG5ldyBhbm5vdGF0aW9uIGRpYWdyYW1cbiAgLy9zdWJtaXQgc3Vic2VjdGlvblxuICBldmVudC5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIEhlcmUgaGF2aW5nIHNldCB1cCByYWN0aXZlIGFuZCB0aGUgZnVuY3Rpb25zIHdlIG5lZWQgd2UgdGhlbiBjaGVja1xuLy8gaWYgd2Ugd2VyZSBwcm92aWRlZCBhIFVVSUQsIElmIHRoZSBwYWdlIGlzIGxvYWRlZCB3aXRoIGEgVVVJRCByYXRoZXIgdGhhbiBhXG4vLyBmb3JtIHN1Ym1pdC5cbi8vVE9ETzogSGFuZGxlIGxvYWRpbmcgdGhhdCBwYWdlIHdpdGggdXNlIHRoZSBNRU1TQVQgYW5kIERJU09QUkVEIFVVSURcbi8vXG5pZihnZXRVcmxWYXJzKCkudXVpZCAmJiB1dWlkX21hdGNoKVxue1xuICBjb25zb2xlLmxvZygnQ2F1Z2h0IGFuIGluY29taW5nIFVVSUQnKTtcbiAgc2VxX29ic2VydmVyLmNhbmNlbCgpO1xuICByYWN0aXZlLnNldCgncmVzdWx0c192aXNpYmxlJywgbnVsbCApOyAvLyBzaG91bGQgbWFrZSBhIGdlbmVyaWMgb25lIHZpc2libGUgdW50aWwgcmVzdWx0cyBhcnJpdmUuXG4gIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gIHJhY3RpdmUuc2V0KFwiYmF0Y2hfdXVpZFwiLCBnZXRVcmxWYXJzKCkudXVpZCk7XG4gIGxldCBwcmV2aW91c19kYXRhID0gZ2V0X3ByZXZpb3VzX2RhdGEoZ2V0VXJsVmFycygpLnV1aWQsIHN1Ym1pdF91cmwsIGZpbGVfdXJsLCByYWN0aXZlKTtcbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwc2lwcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2Rpc29wcmVkJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdkaXNvcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1zYXRzdm0nKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXNhdHN2bV9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgNik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdwZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncmVzdWx0c19wYW5lbF92aXNpYmxlJywgMik7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1wYWNrJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbXBhY2tfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDUpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnZ2VudGhyZWFkZXInKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCA3KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2RvbXByZWQnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2RvbXByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDgpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygncGRvbXRocmVhZGVyJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDkpO1xuICB9XG4gIGlmKHByZXZpb3VzX2RhdGEuam9icy5pbmNsdWRlcygnYmlvc2VyZicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgncGdlbnRocmVhZGVyX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxMCk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdkb21zZXJmJykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEyKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2ZmcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgncHNpcHJlZF9idXR0b24nLCB0cnVlICk7XG4gICAgICByYWN0aXZlLnNldCgnZGlzb3ByZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDEzKTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ21ldHNpdGUnKSlcbiAge1xuICAgICAgcmFjdGl2ZS5zZXQoJ21ldHNpdGVfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE0KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2hzcHJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnaHNwcmVkX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNSk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZW1lbWJlZCcpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnbWVtZW1iZWRfYnV0dG9uJywgdHJ1ZSApO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3Jlc3VsdHNfcGFuZWxfdmlzaWJsZScsIDE2KTtcbiAgfVxuICBpZihwcmV2aW91c19kYXRhLmpvYnMuaW5jbHVkZXMoJ2dlbnRkYicpKVxuICB7XG4gICAgICByYWN0aXZlLnNldCgnZ2VudGRiX2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxNyk7XG4gIH1cbiAgaWYocHJldmlvdXNfZGF0YS5qb2JzLmluY2x1ZGVzKCdtZXRhcHNpY292JykpXG4gIHtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUgKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdyZXN1bHRzX3BhbmVsX3Zpc2libGUnLCAxOCk7XG4gIH1cblxuXG4gIHJhY3RpdmUuc2V0KCdzZXF1ZW5jZScscHJldmlvdXNfZGF0YS5zZXEpO1xuICByYWN0aXZlLnNldCgnZW1haWwnLHByZXZpb3VzX2RhdGEuZW1haWwpO1xuICByYWN0aXZlLnNldCgnbmFtZScscHJldmlvdXNfZGF0YS5uYW1lKTtcbiAgbGV0IHNlcSA9IHJhY3RpdmUuZ2V0KCdzZXF1ZW5jZScpO1xuICByYWN0aXZlLnNldCgnc2VxdWVuY2VfbGVuZ3RoJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuc2V0KCdzdWJzZXF1ZW5jZV9zdG9wJywgc2VxLmxlbmd0aCk7XG4gIHJhY3RpdmUuZmlyZSgncG9sbF90cmlnZ2VyJywgJ3BzaXByZWQnKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vIE5ldyBQYW5uZWwgZnVuY3Rpb25zXG4vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vUmVsb2FkIGFsaWdubWVudHMgZm9yIEphbFZpZXcgZm9yIHRoZSBnZW5USFJFQURFUiB0YWJsZVxuZnVuY3Rpb24gbG9hZE5ld0FsaWdubWVudChhbG5VUkksYW5uVVJJLHRpdGxlKSB7XG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIHdpbmRvdy5vcGVuKFwiLi5cIithcHBfcGF0aCtcIi9tc2EvP2Fubj1cIitmaWxlX3VybCthbm5VUkkrXCImYWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD04MDAsaGVpZ2h0PTQwMFwiKTtcbn1cblxuLy9SZWxvYWQgYWxpZ25tZW50cyBmb3IgSmFsVmlldyBmb3IgdGhlIGdlblRIUkVBREVSIHRhYmxlXG5mdW5jdGlvbiBidWlsZE1vZGVsKGFsblVSSSkge1xuXG4gIGxldCB1cmwgPSBzdWJtaXRfdXJsK3JhY3RpdmUuZ2V0KCdiYXRjaF91dWlkJyk7XG4gIGxldCBtb2Rfa2V5ID0gcmFjdGl2ZS5nZXQoJ21vZGVsbGVyX2tleScpO1xuICBpZihtb2Rfa2V5ID09PSAnTScrJ08nKydEJysnRScrJ0wnKydJJysnUicrJ0EnKydOJysnSicrJ0UnKVxuICB7XG4gICAgd2luZG93Lm9wZW4oXCIuLlwiK2FwcF9wYXRoK1wiL21vZGVsL3Bvc3Q/YWxuPVwiK2ZpbGVfdXJsK2FsblVSSSwgXCJcIiwgXCJ3aWR0aD02NzAsaGVpZ2h0PTcwMFwiKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBNJysnTycrJ0QnKydFJysnTCcrJ0wnKydFJysnUiBMaWNlbmNlIEtleScpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFpbi5qcyIsImltcG9ydCB7IHNlbmRfam9iIH0gZnJvbSAnLi4vcmVxdWVzdHMvcmVxdWVzdHNfaW5kZXguanMnO1xuaW1wb3J0IHsgaXNJbkFycmF5IH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbl9pbmRleC5qcyc7XG5pbXBvcnQgeyBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwgfSBmcm9tICcuLi9jb21tb24vY29tbW9uX2luZGV4LmpzJztcblxuLy9UYWtlcyB0aGUgZGF0YSBuZWVkZWQgdG8gdmVyaWZ5IHRoZSBpbnB1dCBmb3JtIGRhdGEsIGVpdGhlciB0aGUgbWFpbiBmb3JtXG4vL29yIHRoZSBzdWJtaXNzb24gd2lkZ2V0IHZlcmlmaWVzIHRoYXQgZGF0YSBhbmQgdGhlbiBwb3N0cyBpdCB0byB0aGUgYmFja2VuZC5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfYW5kX3NlbmRfZm9ybShyYWN0aXZlLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwsIHBzaXByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc29wcmVkX2NoZWNrZWQsIG1lbXNhdHN2bV9jaGVja2VkLCBwZ2VudGhyZWFkZXJfY2hlY2tlZCwgbWVtcGFja19jaGVja2VkLCBnZW50aHJlYWRlcl9jaGVja2VkLCBkb21wcmVkX2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZG9tdGhyZWFkZXJfY2hlY2tlZCwgYmlvc2VyZl9jaGVja2VkLCBkb21zZXJmX2NoZWNrZWQsIGZmcHJlZF9jaGVja2VkLCBtZXRhcHNpY292X2NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRzaXRlX2NoZWNrZWQsIGhzcHJlZF9jaGVja2VkLCBtZW1lbWJlZF9jaGVja2VkLCBnZW50ZGJfY2hlY2tlZClcbntcbiAgLyp2ZXJpZnkgdGhhdCBldmVyeXRoaW5nIGhlcmUgaXMgb2sqL1xuICBsZXQgZXJyb3JfbWVzc2FnZT1udWxsO1xuICBsZXQgam9iX3N0cmluZyA9ICcnO1xuICAvL2Vycm9yX21lc3NhZ2UgPSB2ZXJpZnlfZm9ybShzZXEsIG5hbWUsIGVtYWlsLCBbcHNpcHJlZF9jaGVja2VkLCBkaXNvcHJlZF9jaGVja2VkLCBtZW1zYXRzdm1fY2hlY2tlZF0pO1xuXG4gIGVycm9yX21lc3NhZ2UgPSB2ZXJpZnlfZm9ybShzZXEsIG5hbWUsIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BzaXByZWRfY2hlY2tlZCwgZGlzb3ByZWRfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1zYXRzdm1fY2hlY2tlZCwgcGdlbnRocmVhZGVyX2NoZWNrZWQsIG1lbXBhY2tfY2hlY2tlZCwgZ2VudGhyZWFkZXJfY2hlY2tlZCwgZG9tcHJlZF9jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBkb210aHJlYWRlcl9jaGVja2VkLCBiaW9zZXJmX2NoZWNrZWQsIGRvbXNlcmZfY2hlY2tlZCwgZmZwcmVkX2NoZWNrZWQsIG1ldGFwc2ljb3ZfY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRzaXRlX2NoZWNrZWQsIGhzcHJlZF9jaGVja2VkLCBtZW1lbWJlZF9jaGVja2VkLCBnZW50ZGJfY2hlY2tlZF0pO1xuICBpZihlcnJvcl9tZXNzYWdlLmxlbmd0aCA+IDApXG4gIHtcbiAgICByYWN0aXZlLnNldCgnZm9ybV9lcnJvcicsIGVycm9yX21lc3NhZ2UpO1xuICAgIGFsZXJ0KFwiRk9STSBFUlJPUjpcIitlcnJvcl9tZXNzYWdlKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL2luaXRpYWxpc2UgdGhlIHBhZ2VcbiAgICBsZXQgcmVzcG9uc2UgPSB0cnVlO1xuICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgbnVsbCApO1xuICAgIC8vUG9zdCB0aGUgam9icyBhbmQgaW50aWFsaXNlIHRoZSBhbm5vdGF0aW9ucyBmb3IgZWFjaCBqb2JcbiAgICAvL1dlIGFsc28gZG9uJ3QgcmVkdW5kYW50bHkgc2VuZCBleHRyYSBwc2lwcmVkIGV0Yy4uIGpvYnNcbiAgICAvL2J5dCBkb2luZyB0aGVzZSB0ZXN0IGluIGEgc3BlY2lmaWMgb3JkZXJcbiAgICBpZihwZ2VudGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJwZ2VudGhyZWFkZXIsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BnZW50aHJlYWRlcl9idXR0b24nLCB0cnVlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwc2lwcmVkX2J1dHRvbicsIHRydWUpO1xuICAgICAgcHNpcHJlZF9jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmKGRpc29wcmVkX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwiZGlzb3ByZWQsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2Rpc29wcmVkX2J1dHRvbicsIHRydWUpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgICBwc2lwcmVkX2NoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYocHNpcHJlZF9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcInBzaXByZWQsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ3BzaXByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKG1lbXNhdHN2bV9jaGVja2VkID09PSB0cnVlKVxuICAgIHtcbiAgICAgIGpvYl9zdHJpbmcgPSBqb2Jfc3RyaW5nLmNvbmNhdChcIm1lbXNhdHN2bSxcIik7XG4gICAgICByYWN0aXZlLnNldCgnbWVtc2F0c3ZtX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihtZW1wYWNrX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwibWVtcGFjayxcIik7XG4gICAgICByYWN0aXZlLnNldCgnbWVtcGFja19idXR0b24nLCB0cnVlKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZW1zYXRzdm1fYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKGdlbnRocmVhZGVyX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwiZ2VudGhyZWFkZXIsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRocmVhZGVyX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihkb21wcmVkX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwiZG9tcHJlZCxcIik7XG4gICAgICByYWN0aXZlLnNldCgnZG9tcHJlZF9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYocGRvbXRocmVhZGVyX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwicGRvbXRocmVhZGVyLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdwZG9tdGhyZWFkZXJfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKGJpb3NlcmZfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJiaW9zZXJmLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdiaW9zZXJmX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihkb21zZXJmX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwiZG9tc2VyZixcIik7XG4gICAgICByYWN0aXZlLnNldCgnZG9tc2VyZl9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYoZmZwcmVkX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwiZmZwcmVkLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdmZnByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKG1ldGFwc2ljb3ZfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJtZXRhcHNpY292LFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdtZXRhcHNpY292X2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihtZXRzaXRlX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwibWV0c2l0ZSxcIik7XG4gICAgICByYWN0aXZlLnNldCgnbWV0c2l0ZV9idXR0b24nLCB0cnVlKTtcbiAgICB9XG4gICAgaWYoaHNwcmVkX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwiaHNwcmVkLFwiKTtcbiAgICAgIHJhY3RpdmUuc2V0KCdoc3ByZWRfYnV0dG9uJywgdHJ1ZSk7XG4gICAgfVxuICAgIGlmKG1lbWVtYmVkX2NoZWNrZWQgPT09IHRydWUpXG4gICAge1xuICAgICAgam9iX3N0cmluZyA9IGpvYl9zdHJpbmcuY29uY2F0KFwibWVtZW1iZWQsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ21lbWVtYmVkX2J1dHRvbicsIHRydWUpO1xuICAgIH1cbiAgICBpZihnZW50ZGJfY2hlY2tlZCA9PT0gdHJ1ZSlcbiAgICB7XG4gICAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5jb25jYXQoXCJnZW50ZGIsXCIpO1xuICAgICAgcmFjdGl2ZS5zZXQoJ2dlbnRkYl9idXR0b24nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBqb2Jfc3RyaW5nID0gam9iX3N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgcmVzcG9uc2UgPSBzZW5kX2pvYihyYWN0aXZlLCBqb2Jfc3RyaW5nLCBzZXEsIG5hbWUsIGVtYWlsLCBzdWJtaXRfdXJsLCB0aW1lc191cmwpO1xuICAgIC8vc2V0IHZpc2liaWxpdHkgYW5kIHJlbmRlciBwYW5lbCBvbmNlXG4gICAgaWYgKHBzaXByZWRfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ3BzaXByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgICAgLy8gcGFyc2Ugc2VxdWVuY2UgYW5kIG1ha2Ugc2VxIHBsb3RcbiAgICB9XG4gICAgZWxzZSBpZihkaXNvcHJlZF9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnZGlzb3ByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1cbiAgICBlbHNlIGlmKG1lbXNhdHN2bV9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnbWVtc2F0c3ZtX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9XG4gICAgZWxzZSBpZihwZ2VudGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ3BnZW50aHJlYWRlcl9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYobWVtcGFja19jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnbWVtcGFja19hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYoZ2VudGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ2dlbnRocmVhZGVyX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihkb21wcmVkX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdkb21wcmVkX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihwZG9tdGhyZWFkZXJfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ3Bkb210aHJlYWRlcl9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYoYmlvc2VyZl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnYmlvc2VyZl9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYoZG9tc2VyZl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnZG9tc2VyZl9hY3RpdmUnICk7XG4gICAgICBkcmF3X2VtcHR5X2Fubm90YXRpb25fcGFuZWwocmFjdGl2ZSk7XG4gICAgfWVsc2UgaWYoZmZwcmVkX2NoZWNrZWQgPT09IHRydWUgJiYgcmVzcG9uc2UpXG4gICAge1xuICAgICAgcmFjdGl2ZS5zZXQoICdyZXN1bHRzX3Zpc2libGUnLCAyICk7XG4gICAgICByYWN0aXZlLmZpcmUoICdmZnByZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKG1ldGFwc2ljb3ZfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ21ldGFwc2ljb3ZfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKG1ldHNpdGVfY2hlY2tlZCA9PT0gdHJ1ZSAmJiByZXNwb25zZSlcbiAgICB7XG4gICAgICByYWN0aXZlLnNldCggJ3Jlc3VsdHNfdmlzaWJsZScsIDIgKTtcbiAgICAgIHJhY3RpdmUuZmlyZSggJ21ldHNpdGVfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKGhzcHJlZF9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnaHNwcmVkX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9ZWxzZSBpZihtZW1lbWJlZF9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnbWVtZW1iZWRfYWN0aXZlJyApO1xuICAgICAgZHJhd19lbXB0eV9hbm5vdGF0aW9uX3BhbmVsKHJhY3RpdmUpO1xuICAgIH1lbHNlIGlmKGdlbnRkYl9jaGVja2VkID09PSB0cnVlICYmIHJlc3BvbnNlKVxuICAgIHtcbiAgICAgIHJhY3RpdmUuc2V0KCAncmVzdWx0c192aXNpYmxlJywgMiApO1xuICAgICAgcmFjdGl2ZS5maXJlKCAnZ2VudGRiX2FjdGl2ZScgKTtcbiAgICAgIGRyYXdfZW1wdHlfYW5ub3RhdGlvbl9wYW5lbChyYWN0aXZlKTtcbiAgICB9XG5cbiAgICBpZighIHJlc3BvbnNlKXt3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO31cbiAgfVxufVxuXG4vL1Rha2VzIHRoZSBmb3JtIGVsZW1lbnRzIGFuZCBjaGVja3MgdGhleSBhcmUgdmFsaWRcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlfZm9ybShzZXEsIGpvYl9uYW1lLCBlbWFpbCwgY2hlY2tlZF9hcnJheSlcbntcbiAgbGV0IGVycm9yX21lc3NhZ2UgPSBcIlwiO1xuICBpZighIC9eW1xceDAwLVxceDdGXSskLy50ZXN0KGpvYl9uYW1lKSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJQbGVhc2UgcmVzdHJpY3QgSm9iIE5hbWVzIHRvIHZhbGlkIGxldHRlcnMgbnVtYmVycyBhbmQgYmFzaWMgcHVuY3R1YXRpb248YnIgLz5cIjtcbiAgfVxuXG4gIC8qIGxlbmd0aCBjaGVja3MgKi9cbiAgaWYoc2VxLmxlbmd0aCA+IDE1MDApXG4gIHtcbiAgICBlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZSArIFwiWW91ciBzZXF1ZW5jZSBpcyB0b28gbG9uZyB0byBwcm9jZXNzPGJyIC8+XCI7XG4gIH1cbiAgaWYoc2VxLmxlbmd0aCA8IDMwKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgaXMgdG9vIHNob3J0IHRvIHByb2Nlc3M8YnIgLz5cIjtcbiAgfVxuXG4gIC8qIG51Y2xlb3RpZGUgY2hlY2tzICovXG4gIGxldCBudWNsZW90aWRlX2NvdW50ID0gKHNlcS5tYXRjaCgvQXxUfEN8R3xVfE58YXx0fGN8Z3x1fG4vZyl8fFtdKS5sZW5ndGg7XG4gIGlmKChudWNsZW90aWRlX2NvdW50L3NlcS5sZW5ndGgpID4gMC45NSlcbiAge1xuICAgIGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlICsgXCJZb3VyIHNlcXVlbmNlIGFwcGVhcnMgdG8gYmUgbnVjbGVvdGlkZSBzZXF1ZW5jZS4gVGhpcyBzZXJ2aWNlIHJlcXVpcmVzIHByb3RlaW4gc2VxdWVuY2UgYXMgaW5wdXQ8YnIgLz5cIjtcbiAgfVxuICBpZigvW15BQ0RFRkdISUtMTU5QUVJTVFZXWVhfLV0rL2kudGVzdChzZXEpKVxuICB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdXIgc2VxdWVuY2UgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzPGJyIC8+XCI7XG4gIH1cblxuICBpZihpc0luQXJyYXkodHJ1ZSwgY2hlY2tlZF9hcnJheSkgPT09IGZhbHNlKSB7XG4gICAgZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UgKyBcIllvdSBtdXN0IHNlbGVjdCBhdCBsZWFzdCBvbmUgYW5hbHlzaXMgcHJvZ3JhbVwiO1xuICB9XG4gIHJldHVybihlcnJvcl9tZXNzYWdlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9mb3Jtcy9mb3Jtc19pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=