//	Retinal.jsx
//	Evadne Wu at Iridia, 2010










	function main (activeDocument) {
	
		if (activeDocument.artboards.length == 0) return;
		
		var inArtboardsToProcess = prompt("Export Artboards? [m, n-o]", (activeDocument.artboards.getActiveArtboardIndex() + 1));
		
		if (inArtboardsToProcess == null) return;
		
		var artboardsToProcess = parseRange(inArtboardsToProcess);
		if (artboardsToProcess.length == 0) return;
		
		for (var i = 0; i < artboardsToProcess.length; i++) {
			
			if (artboardsToProcess[i] > activeDocument.artboards.length) artboardsToProcess[i] = undefined;
		
		}
		
		
		
		
		
		var oldActiveArtboardIndex = activeDocument.artboards.getActiveArtboardIndex();	
		
		var oldRasterEffectResolution = activeDocument.rasterEffectSettings.resolution;
		
		var plausibleRasterEffectResolution = parseFloat(prompt("Change Raster Effect Resolution?", oldRasterEffectResolution));
		
		
		
		
		
		if (!isNaN(plausibleRasterEffectResolution))
		if (activeDocument.rasterEffectSettings.resolution != plausibleRasterEffectResolution)
		activeDocument.rasterEffectSettings.resolution = parseFloat(plausibleRasterEffectResolution);
		
		
		
		
		
		var exportType = ExportType.PNG24;
		var exportOptions = new ExportOptionsPNG24();
		var exportOptions2x = new ExportOptionsPNG24();
		
		exportOptions.artBoardClipping = true;
		exportOptions2x.artBoardClipping = true;

		exportOptions.antiAliasing = true;
		exportOptions2x.antiAliasing = true;

		exportOptions.transparency = true;
		exportOptions2x.transparency = true;

		exportOptions2x.horizontalScale = 200;
		exportOptions2x.verticalScale = 200;		


		
		
		
		for (plausibleArtboardIndex in artboardsToProcess) {
		
			if (!artboardsToProcess.hasOwnProperty(plausibleArtboardIndex)) continue;
			
			var indexOfArtboardStartingFromOne = parseInt(artboardsToProcess[plausibleArtboardIndex]);
			
			
			var theArtboard = activeDocument.artboards[indexOfArtboardStartingFromOne - 1];
			
			activeDocument.artboards.setActiveArtboardIndex(indexOfArtboardStartingFromOne - 1);
			
			
			
			
		
		//	No dots in file names, otherwise the file will not get written.  File() replaces spaces, but does not recognize dots correctly!  Idiotic Illustrator idiosyncrasy…
			
			
			
			
			
			var fileName = theArtboard.name.replace(/\./ig, "_");
		
			var exportedFileSpecification = new File(activeDocument.path + "/" + fileName);
			
			var exportedFileSpecification2x = new File(activeDocument.path + "/" + fileName + "@2x");
			
			
			
			
						
			activeDocument.exportFile(
			
				exportedFileSpecification,
				exportType,
				exportOptions
			
			);
			
			activeDocument.exportFile(
			
				exportedFileSpecification2x,
				exportType,
				exportOptions2x
			
			);
					
		}
		
		
		
		
		
		activeDocument.artboards.setActiveArtboardIndex(oldActiveArtboardIndex);
			
		if (activeDocument.rasterEffectSettings.resolution != oldRasterEffectResolution)
		activeDocument.rasterEffectSettings.resolution = oldRasterEffectResolution;
		
		beep();
			
	}










	function l () {
		
		var responseString = "Debug Output \n";
		
		for (var i = 0; i < arguments.length; i ++) {

			responseString += String(arguments[i]) + "\n";
		
		}
		
		alert(responseString);
	
	}
	
	
	
	
	
	var IRArraySortFunctionAscending = function(a,b){ return a - b };
	
	
	
	
	
	Array.prototype.unique = function () {

		var r = new Array();

		o:for(var i = 0, n = this.length; i < n; i++) {
		
			if (this[i] == undefined) continue o;
			if (this[i] == null) continue o;
			if (isNaN(this[i])) continue o;

			for(var x = 0, y = r.length; x < y; x++)
			if(r[x] == this[i]) continue o;
			
			r[r.length] = this[i];
		
		}
		
		return r;
	
	}
	
	
	
	
	
	function parseRange (inString) {
	
		if (typeof inString != 'string') return [];
		
		var tokenGroups = inString.replace(/\s+/, ",").split(",");
				
		var responseArray = [];
		
		for (var i = 0; i < tokenGroups.length; i++) {
		
			var tokenElements = tokenGroups[i].split("-");
						
			if (tokenElements.length == 1) {
			
				responseArray.push(parseInt(tokenElements[0]));
				
			} else {

				tokenElements = tokenElements.sort(IRArraySortFunctionAscending);
				
				for (var j = tokenElements[0]; j <= tokenElements[1]; j ++)
					responseArray.push(j);
			
			}

		}
		
		return responseArray.unique();
	
	}





	if (app.documents.length != 0) main(app.activeDocument);









