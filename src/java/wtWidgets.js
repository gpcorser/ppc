function createYoutubeWidget(pWt, div, source) {
		var frm = div.parentNode;
        var fdata = new FormData();
        fdata.append('source', source);
        web_top_q_server("GETFILECONTENTS", qfx.bind(this), fdata);
                
                var ldiv = document.createElement('div');
                var rdiv = document.createElement('div');
                var btn_edit = document.createElement('button');
                
                
                var toggle_state = document.createElement('div');
                var vid_next   = document.createElement('div');
                var vid_prev   = document.createElement('div');
                var vid_index  = 0;
                
                btn_edit.innerHTML = "edit";
                
                toggle_state.style.position     = "absolute";
                toggle_state.style.color        = pWt.shades[28];
                toggle_state.style.textShadow   = "1px 1px black";
                toggle_state.style.background   = "rgba(0,0,0)";
                toggle_state.innerHTML          = "full&nbsp;";
                toggle_state.style.fontWeight   = "normal";
                toggle_state.style.zIndex       = "10000";
                toggle_state.style.bottom       = "-20px";
                toggle_state.style.fontSize     = "16px";
                toggle_state.style.left         = "4px";
                toggle_state.style.cursor       = "pointer";
                
                vid_next.style.position     = "absolute";
                vid_next.style.color        = pWt.shades[28];
                vid_next.style.textShadow   = "1px 1px black";
                vid_next.style.background   = "rgba(0,0,0)";
                vid_next.innerHTML          = "&nbsp;<<&nbsp;";
                vid_next.style.fontWeight   = "bold";
                vid_next.style.zIndex       = "10000";
                vid_next.style.bottom       = "-20px";
                vid_next.style.fontSize     = "16px";
                vid_next.style.left         = "100px";
                vid_next.style.cursor       = "pointer";
                
                vid_prev.style.position     = "absolute";
                vid_prev.style.color        = pWt.shades[28];
                vid_prev.style.textShadow   = "1px 1px black";
                vid_prev.style.background   = "rgba(0,0,0)";
                vid_prev.innerHTML          = "&nbsp;>>&nbsp;";
                vid_prev.style.fontWeight   = "bold";
                vid_prev.style.zIndex       = "10000";
                vid_prev.style.bottom       = "-20px";
                vid_prev.style.fontSize     = "16px";
                vid_prev.style.left         = "140px";
                vid_prev.style.cursor       = "pointer";
                
                div.appendChild(toggle_state);
                div.appendChild(vid_next);
                div.appendChild(vid_prev);
                
                ldiv.style.display              = "inline-block";
                ldiv.style.width                = "61%";
                ldiv.style.boxSizing            = "border-box";
                ldiv.style.height               = "100%";
                rdiv.style.display              = "inline-block";
                rdiv.style.width                = "39%";
                rdiv.style.boxSizing            = "border-box";
                rdiv.style.height               = "100%";
                rdiv.style.padding              = "4px";
                rdiv.style.overflowY            = "auto";
                rdiv.style.verticalAlign        = "top";
                ldiv.style.verticalAlign        = "top";
                
                ldiv.style.backgroundColor = pWt.shades[29];
                div.appendChild(ldiv);
                div.appendChild(rdiv);
        
				rdiv.appendChild(btn_edit);
				
				btn_edit.addEventListener('click', function(){ 
						frm.close();
						frm = pWt.createWindow("Editor");
						pWt.fromSetContent(frm, source,"JSON");
						
				});
				
				function qfx(result) {
                    var J = JSON.parse(result);
                    
                    frm.setCaption( "YouTube [ " + J['title'] + " ]" );
                    
                    var vdiv = document.createElement('div');
                    var tdiv = document.createElement('div');
                    var title = document.createElement('h3');
                    var desc = document.createElement('p');
                    var notes = document.createElement('p');
                    var hd1 = document.createElement('p');
                    var hd2 = document.createElement('p');
                    vdiv.style.display = "block";
                    vdiv.style.boxSizing = "border-box";
                    vdiv.style.height = "65%";
                    vdiv.style.backgroundColor = pWt.shades[3];
                    tdiv.style.display = "block";
                    tdiv.style.boxSizing = "border-box";
                    tdiv.style.height = "34%";
                    tdiv.style.marginTop = "1%";
                    tdiv.style.padding = "1em";
                    tdiv.style.overflowY = "auto";
                    
                    title.innerHTML = J['items'][0].title;
                    
                    title.style.padding = "0px";
                    title.style.margin = "0px 0px 5px 0px";
                    
                    desc.innerHTML = J['items'][0].description;
                    desc.style.padding = "0px";
                    desc.style.margin = "0px 0px 5px 0px";
                    desc.style.textAlign = "justify";
                   
                    notes.innerHTML = J['items'][0].notes;
                    notes.style.padding = "0px";
                    notes.style.margin = "0px 0px 5px 0px";
                    notes.style.textAlign = "justify";
                   
                   
                    hd1.innerHTML = "Description";
                    hd1.style.padding = "0px";
                    hd1.style.margin = "0px 0px 5px 0px";
                    hd1.style.textAlign = "justify";
                    hd1.style.fontWeight = "bold";
                    hd1.style.color = "blue";
                    hd2.innerHTML = "Notes:"
                    hd2.style.padding = "0px";
                    hd2.style.margin = "0px 0px 5px 0px";
                    hd2.style.textAlign = "justify";
                    hd2.style.fontWeight = "bold";
                    hd2.style.color = "blue";
                    
                    tdiv.appendChild(title);
                    tdiv.appendChild(hd1);
                    tdiv.appendChild(desc);
                    tdiv.appendChild(hd2);
                    tdiv.appendChild(notes);
                    
                    ldiv.appendChild(vdiv);
                    ldiv.appendChild(tdiv);
                    
					vdiv.innerHTML = '<iframe style="height:calc(100%-40px);" width="100%" height="100%;" src="'+J['items'][0]['url']+'" frameborder="0" allowfullscreen></iframe>'
					
                    vid_prev.addEventListener('click', function () {
                        vid_index--;
                        if (vid_index<=0)
                            vid_index = J['items'].length-1;
                        if (vid_index < 0) 
                            vid_index = 0;
                        vdiv.innerHTML = '<iframe style="height:calc(100%-40px);" width="100%" height="100%;" src="'+J['items'][vid_index].url+'" frameborder="0" allowfullscreen></iframe>'
                        title.innerHTML =  J['items'][vid_index].title;
                        notes.innerHTML = J['items'][vid_index].notes;
                        desc.innerHTML = J['items'][vid_index].description;
                    });
                    vid_next.addEventListener('click', function () {
                        vid_index++;
                        if (vid_index>=J['items'].length)
                            vid_index = 0;
                        vdiv.innerHTML = '<iframe style="height:calc(100%-40px);" width="100%" height="100%;" src="'+J['items'][vid_index].url+'" frameborder="0" allowfullscreen></iframe>'
                        title.innerHTML =  J['items'][vid_index].title;
                        notes.innerHTML = J['items'][vid_index].notes;
                        desc.innerHTML = J['items'][vid_index].description;
                    });
                    toggle_state.addEventListener('click', function() {
                            
                            if (vdiv.parentNode != div) {
                                div.appendChild(vdiv);
                                ldiv.style.display = "none";
                                rdiv.style.display = "none";
                                vdiv.style.width = "100%";
                                vdiv.style.height = "100%";
                                toggle_state.innerHTML = "details&nbsp;";
                            } else {
                                ldiv.appendChild(vdiv);
                                ldiv.appendChild(tdiv);
                                ldiv.style.display = "inline-block";
                                rdiv.style.display = "inline-block";
                                vdiv.style.width = "100%";
                                vdiv.style.height = "65%";
                                toggle_state.innerHTML = "full&nbsp;";
                            }
                        });
                    
                    toggle_state.click();    
                    var sdiv = 0;
                    
                    var cselect = pWt.shades[16];
                    
                    for(var i=0;i<J['items'].length;i++) {
                        
                        var pdiv = document.createElement('div');
                        pdiv.tabIndex = -1;
                        pdiv.innerHTML = J['items'][i]['title'];
                        pdiv.style.cursor = "pointer";
                        pdiv.style.backgroundColor = ((i % 2)?pWt.shades[26]:pWt.shades[27]);
                        pdiv.style.padding = "4px";
                        pdiv.node_data = new Object();
                        pdiv.node_data.source = J['items'][i];
                        pdiv.node_data.backgroundColor = pdiv.style.backgroundColor;
                        rdiv.appendChild(pdiv);
                        
                        pdiv.addEventListener('click', function() {
                                
                                if (sdiv) {
                                    sdiv.style.backgroundColor = sdiv.node_data.backgroundColor;
                                    sdiv.style.color = "black";
                                }
                                this.style.color = "white";
                                title.innerHTML =  this.node_data.source.title;
                                notes.innerHTML = this.node_data.source.notes;
                                desc.innerHTML = this.node_data.source.description;
                                vdiv.innerHTML = '<iframe style="height:calc(100%-40px);" width="100%" height="100%;" src="'+this.node_data.source.url+'" frameborder="0" allowfullscreen></iframe>'
                                this.style.backgroundColor = cselect;
                                sdiv = this;
                            });
                    
                    }
					
                }
}

function createConfigWidget(pWt, div, source) {
	web_top_q_server("GETFILECONTENTS?"+source, qfx.bind(this), null);
	
	var tdiv = document.createElement('div');
	var bdiv = document.createElement('div');
	var bsave = document.createElement('button');
	
	tdiv.style.overflowY = "auto";
	tdiv.style.position = "absolute";
	tdiv.style.left = "0px";
	tdiv.style.top = "0px";
	tdiv.style.right = "0px";
	tdiv.style.bottom = "28px";
	
	bdiv.style.position = "absolute";
	bdiv.style.left = "0px";
	bdiv.style.bottom = "0px";
	bdiv.style.right = "0px";
	bdiv.style.height = "22px";
	
	
	bsave.innerHTML = "Save";
	
	bdiv.appendChild(bsave);
	div.appendChild(tdiv);
	div.appendChild(bdiv);
	
	tdiv.style.padding = "3px";
	bdiv.style.padding = "3px";
	
	
	var p = 0;
	
	function qfx(result) {
		p = JSON.parse(result);
		
		for (var prop in p) {
		    
		    var ndiv = document.createElement('div');
		    
		    ndiv.style.border = "1px outset #777";
		    ndiv.style.fontSize = "24px";
		    ndiv.style.padding = "4px 8px";
		    ndiv.style.textShadow = "1px 1px solid black";
		    ndiv.style.color = "white";
		    ndiv.style.backgroundColor = pWt.shades[10];
		    ndiv.innerHTML = prop;
		    
		    ndiv.style.marginBottom = "2px";
		    ndiv.name = prop;
    		ndiv.className = "attributePrime";
		    
		    for(var propx in p[prop]) {
		        var cdiv = document.createElement('div');
		        var cname = document.createElement('div');
		        var pdiv = document.createElement('div');
		        
		        ndiv.appendChild(pdiv);
		        
		        pdiv.appendChild(cname);
    		    pdiv.appendChild(cdiv);
    		    
    		    pdiv.style.boxSizing = "border-box";
    		    cname.style.boxSizing = "border-box";
    		    cdiv.style.boxSizing = "border-box";
		        
    		    
    		    cname.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + propx;
		        cname.style.width = "120px";
		        cname.style.fontSize = "16px";
		        cname.style.display = "inline-block";
    		    
    		    cdiv.className = "attribute";
    		    
    		    cdiv.style.width = "calc(100% - 130px)";
    		    cdiv.style.display = "inline-block";
    		    cdiv.style.fontSize = "16px";
    		    cdiv.style.marginTop = "4px";
    		    cdiv.style.border = "1px solid black";
    		    cdiv.style.padding = "4px";
    		    cdiv.style.backgroundColor = pWt.shades[20];
    		    cdiv.contentEditable = "true";
    		    cdiv.name = propx;
    		    cdiv.innerHTML = p[prop][propx];
		    }
		    tdiv.appendChild(ndiv);
		    
		    
		}
		

	}

    bsave.addEventListener('click', function() {
       var cs = tdiv.children;
       
       for(var i=0;i<cs.length;i++) {
           
           var c = cs[i];
           if (c.className == "attributePrime") {
               var gc = c.children;
               for(var j=0;j<gc.length;j++) {
                   var xp = gc[j].lastChild;
                    p[c.name][xp.name] = xp.innerHTML;
                
               }
           }
           
       }
      // console.log (p);
       //WRITECONFIG
       
       
      var fdata = new FormData();
        fdata.append('source', source);
        fdata.append('data', JSON.stringify(p));
        
       web_top_q_server("WRITECONFIG", writeconfig.bind(this), fdata);
       
       function writeconfig(result) {
           
           console.log(result);
       } 
        
        
    });
	
}

function createFormWidget(pWt, div, source) {
	
	div.style.overflowY = "auto";
    var fdata = new FormData();
        fdata.append('source', source);
	
	web_top_q_server("GETFILECONTENTS", getData.bind(this), fdata);
				
	
	function getData(result) {
		var J = JSON.parse(result);
		var table_id = "this_table";
		var titems = "categories";
		
		if (J['title_bar'] != null) {
			var title_div = document.createElement('div');
			
			var x_margin = 8;
			
			title_div.style.backgroundColor = "white";
			title_div.style.padding = "8px";
			
			title_div.style.display = "block";
			
			if (J['title_bar'].icon != null) {
				x_margin = 64;
				var title_image = document.createElement('div');	
			
				title_image.style.backgroundImage = "URL('" + J['title_bar'].icon + "')";
				title_image.style.width = "48px";
				title_image.style.height = "48px";
				title_div.appendChild(title_image);
			}
			if (J['title_bar'].title != null) {
				
				this_table = J['title_bar'].title;
				this_table = this_table.replace(' ', '_');
				
				var title_title = document.createElement('span');
				title_title.style.position = "absolute";
				title_title.style.left = x_margin+"px";
				title_title.style.top = "8px";
				title_title.style.fontSize = "24px";
				title_title.style.fontWeight = "bold";
				title_title.innerHTML = J['title_bar'].title;
				title_div.appendChild(title_title);
			}
			if (J['title_bar'].sub_title != null) {
				var title_subtitle = document.createElement('span');
				
				title_subtitle.style.position = "absolute";
				title_subtitle.style.left = x_margin+"px";
				title_subtitle.style.top = "34px";
				title_subtitle.style.fontSize = "16px";
				title_subtitle.style.fontWeight = "normal";
				title_subtitle.innerHTML = J['title_bar'].sub_title;
				title_div.appendChild(title_subtitle);
			}
			
			if (J[titems] != null) {
				var d_btns = document.createElement('div');
				
				var d_cats = document.createElement('div');
				var d_span = document.createElement('span');
				var b_save = document.createElement('button');
				var b_cancel = document.createElement('button');
				
				b_save.style.marginLeft = "4px";
				
				d_span.id = "d_span";
				d_btns.style.position = "absolute";
				d_btns.style.left = "0px";
				d_btns.style.bottom = "0px";
				d_btns.style.right = "0px";
				d_btns.style.padding = "4px 6px";
				
				d_btns.appendChild(b_save);
				d_btns.appendChild(b_cancel);
				
				b_save.innerHTML = "save";
				b_save.style.padding = "4px";
				b_save.style.fontSize = "20px";
				b_save.style.float = "right";
				b_save.style.marginLeft = "4px";
				
				b_cancel.style.marginLeft = "4px";
				b_cancel.innerHTML = "cancel";
				b_cancel.style.padding = "4px";
				b_cancel.style.fontSize = "20px";
				b_cancel.style.float = "right";
				
				
				d_cats.style.position = "absolute";
				d_cats.style.left = "0px";
				d_cats.style.right = "0px";
				d_cats.style.top = "68px";
				d_cats.style.bottom = "48px";
				d_cats.style.boxSizing = "border-box";
				d_cats.style.backgroundColor = "white";
				d_cats.style.padding = "8px";
                d_cats.style.overflowY = "auto";
				var cats = J[titems];
				for(var i=0;i<cats.length;i++) {
					var cat = cats[i];
					var d_cat = document.createElement('div');
					var d_title = document.createElement('p');
					
					d_cat.style.border = "1px solid black";
					d_cat.style.padding = "4px";
					d_cat.style.marginBottom = "2px";
					d_title.innerHTML = cat.title;
					d_title.style.padding = "0px";
					d_title.style.margin = "2px 0px";
					d_title.style.fontWeight = "bold";

					d_cat.appendChild(d_title);

					var props = cat.properties;
					var table = document.createElement("table");
					
					table.style.cursor = "default";
					table.style.width = "95%";
					table.style.marginTop = "8px";
					table.style.borderCollapse = "collapse";
					table.style.marginLeft = "5%";
					var r="<thead><tr style='text-align:left;'><th style='border-bottom: 1px solid black;padding:4px;'>Property&nbsp;&nbsp;</th><th style='border-bottom: 1px solid black;padding:4px;width:100%;'>Value</th></tr></thead>";
					r+= "<tbody id='"+table_id+"'>";
	
					
					for(var p = 0;p<props.length;p++) {
						var prop = props[p];                       
						r += "<tr onclick='d_span.innerHTML=\""+prop['description']+"\";'>";
						r+="<td style='padding:4px;'>"+prop['title']+"</td>";
						r += "<td class='props-value' cat='"+i+"' prop='"+p+"' style='padding:4px;word-break: break-word;' contenteditable='true'>"+prop['value']+"</td></tr>";
					}
					r+="</tbody>";
					table.innerHTML+=r;
					
					d_cat.appendChild(table);
					d_cats.appendChild(d_cat);
				}
			}
			div.appendChild(d_btns);
			d_btns.appendChild(d_span);
			div.appendChild(d_cats);
			div.appendChild(title_div);
			
			b_cancel.addEventListener('click', function() {
				div.parentNode.close();
			});
			
			b_save.addEventListener('click', function() {
					var values = d_cats.getElementsByClassName('props-value');
					for(var i=0;i<values.length;i++) {
						var cat = values[i].getAttribute("cat");
						var prop = values[i].getAttribute("prop");
						J[titems][cat]['properties'][prop]['value'] = values[i].innerHTML;
						console.log(cat + ", " + prop);
					}
				var fdata = new FormData();
				fdata.append('source', source);
				fdata.append('data', JSON.stringify(J));
				
				console.log(JSON.stringify(J));
				web_top_q_server("WRITECONFIG", writeconfig.bind(this), fdata);
				
       
				function writeconfig(result) {
				
					pWt.messageBox(J['on-update'],J['title_bar']['title'], "Ok", on_select);
				   
					function on_select(cmd) {
					   console.log("user selected " + cmd);
					}
			   } 
			   
			});

			
		}
	}
	
	
}



function createJSONEditWidgetA(pWt, xdiv, source) {
	
	var previous_focus = null;
	var title_div = document.createElement('div');
			
    var x_margin = 8;
    
    title_div.style.backgroundColor = "white";
    title_div.style.padding = "8px";
    
    title_div.style.display = "block";

    x_margin = 64;
    var title_image = document.createElement('div');	

    title_image.style.backgroundImage = "URL('../pics/48/applications-system.png')";
    title_image.style.width = "48px";
    title_image.style.height = "48px";
    title_div.appendChild(title_image);

    xdiv.parentNode.setCaption("JSON Editor");
    
    var title_title = document.createElement('span');
    title_title.style.position = "absolute";
    title_title.style.left = x_margin+"px";
    title_title.style.top = "8px";
    title_title.style.fontSize = "24px";
    title_title.style.fontWeight = "bold";
    title_title.innerHTML = "JSON Editor";
    title_div.appendChild(title_title);

    var title_subtitle = document.createElement('span');
    
    title_subtitle.style.position = "absolute";
    title_subtitle.style.left = x_margin+"px";
    title_subtitle.style.top = "34px";
    title_subtitle.style.fontSize = "16px";
    title_subtitle.style.fontWeight = "normal";
    title_subtitle.innerHTML = source;
    title_div.appendChild(title_subtitle);


    xdiv.appendChild(title_div);
    
    var button_bar = document.createElement('div');
    button_bar.style.backgroundColor = "white";
    button_bar.style.position = "absolute";
    button_bar.style.bottom = "0px";
    button_bar.style.left = "0px";
    button_bar.style.right = "0px";
    button_bar.style.padding = "8px";
    
    button_bar.style.display = "block";

    xdiv.appendChild(button_bar);

    var btn_insert = document.createElement('button');
    
    btn_insert.innerHTML = "insert";
    btn_insert.style.float = "left";
    btn_insert.style.padding = "2px 8px";
    btn_insert.style.marginLeft = "4px";
    
    var btn_create = document.createElement('button');
    
    btn_create.innerHTML = "save";
    btn_create.style.float = "left";
    btn_create.style.padding = "2px 8px";
    btn_create.style.marginLeft = "4px";
    
    var btn_help = document.createElement('button');
    
    btn_help.innerHTML = "help";
    btn_help.style.float = "right";
    btn_help.style.padding = "2px 8px";
    btn_help.style.marginLeft = "4px";
    
    var btn_delete = document.createElement('button');
    
    btn_delete.innerHTML = "delete";
    btn_delete.style.float = "left";
    btn_delete.style.padding = "2px 8px";
    btn_delete.style.marginLeft = "4px";
    
    var btn_clone = document.createElement('button');
    
    btn_clone.innerHTML = "clone";
    btn_clone.style.float = "left";
    btn_clone.style.padding = "2px 8px";
    btn_clone.style.marginLeft = "4px";
    
    
    button_bar.appendChild(btn_insert);
    button_bar.appendChild(btn_clone);
    button_bar.appendChild(btn_delete);
    button_bar.appendChild(btn_create);
    button_bar.appendChild(btn_help);
    
    var w_div = document.createElement('div');
    
    w_div.style.position = "absolute";
    w_div.style.top = "65px";
    w_div.style.left = "0px";
    w_div.style.right = "0px";
    w_div.style.bottom = "40px";
    w_div.style.backgroundColor="white";
    w_div.style.padding = "4px";
    w_div.style.overflowY = "scroll";
    xdiv.appendChild(w_div);
    
        
        web_top_q_server("GETFILECONTENTS?"+source, qfx.bind(this), null);
        var K_JSON = null;
        function qfx(result) {
            if (result == null || result.length < 3) {
                return;
            }
          K_JSON = JSON.parse(result);
			parse_j(K_JSON, w_div);
		}
		
		function parse_j(J, par) {
			
			for(prop in J) {
          
                var div = addPanel(par, prop, J[prop], J);
                if (typeof J[prop] == "object")
                    parse_j(J[prop], div);
        	}
		}
		
		function set_new_focus(e) {
			var div = e.target;
			if (div.className == "JSON_EDITOR_PARENT_NODE") {
				if (previous_focus != null) 
					previous_focus.style.backgroundColor = "white";
			
				div.style.backgroundColor = pWt.shades[28];
				previous_focus = div;
				
				var chs = div.children;
				for(var i=0;i<chs.length;i++)
					if(chs[i].className == "JSON_EDITOR_PARENT_NODE")
						chs[i].style.backgroundColor = "white";
			}
		}
		
		function addPanel(par, xtitle, xcontent, obj) {
			if (par) {
				if (par.className == "JSON_EDITOR_PARENT_NODE") {
					if (par.json_item_data.content != null) {
						par.removeChild(par.json_item_data.content);
						par.json_item_data.content = null;
					}
				}
			}
			
			var div = document.createElement('div');
				var title = document.createElement('div');
				var content = null;
				div.style.boxSizing = "border-box";
				div.style.outline = "1px solid black";
				div.style.padding = "6px 0px 4px 32px";
				div.style.margin = "4px 0";
				
				if (isNaN(xtitle)) {
					title.contentEditable = true;				
					title.style.fontWeight = "bold";
				}
				
				title.style.display = "inline-block";
				title.style.width = "28%";
				title.style.boxSizing = "border-box";
				title.style.padding = "4px";
				title.innerHTML = xtitle;
				title.style.verticalAlign = "top";
				title.style.background = "#fafafa";
				title.className = "TITLE_EDIT";
				
				div.appendChild(title);
				
				if (xcontent != null) {
					if (typeof xcontent != "object") {
						
						content = document.createElement('div');
						content.style.marginLeft = "1%";
						content.style.verticalAlign = "top";
						content.style.display = "inline-block";
						content.style.width = "69%";
						content.style.boxSizing = "border-box";
						content.style.padding = "4px";
						content.style.border = "1px solid #aaa";
						content.style.borderRadius = "3px";
						content.style.background = "#fafafa";
						content.innerHTML = xcontent;
						content.contentEditable = true;
						content.className = "CONTENT_EDIT";
						div.appendChild(content);
						content.addEventListener('focusin', function() { this.parentNode.click();});
											}
				}
				title.addEventListener('focusin', function() { this.parentNode.click();});
				div.className = "JSON_EDITOR_PARENT_NODE";
				div.addEventListener('click', set_new_focus.bind(div), true);
				par.appendChild(div);
				
				if (content != null) 
					content.focus();
				div.setAttribute("name", xtitle);
                
                
				div.json_item_data = new Object();
                div.json_item_data.json = obj;
				
                div.json_item_data.content = content;
				div.json_item_data.title = title;
				div.json_item_data.isArray = (content==null);
				
				return div;
		}
        var J_FOCUS = null;
        
        function remove_children(par) {
            while (par.hasChildNodes()) {   
                par.removeChild(par.firstChild);
            }
        }
        
        
		btn_clone.addEventListener('click', function() {
			if (previous_focus != null) {
				if (previous_focus.className == "JSON_EDITOR_PARENT_NODE") {
					
					var px = previous_focus;
                    var js = px.json_item_data.json;
					
					if (js.constructor == [].constructor ) {
						
						var px2 = previous_focus.parentNode;
						var js2 = px2.json_item_data.json;
                    
						var xclone = clone(js);
						console.log(js);
						console.log(xclone);
						
						js2[px2.json_item_data.title.innerHTML][js2[px2.json_item_data.title.innerHTML].length] = xclone[0];
												
						remove_children(w_div);
						parse_j(K_JSON, w_div);
					} else {
						pWt.messageBox("Error: only an array can be cloned.", "Clone Error");
					}
				}
			}

		});
		
		btn_insert.addEventListener('click', function() {
				var xtitle = "Adds a new node ...";
				if (previous_focus != null) {
					if (previous_focus.className == "JSON_EDITOR_PARENT_NODE") {
						xtitle = "Relative to: "+previous_focus.getAttribute('name');
					}
				}
				pWt.inputBox("Create a new JSON item", "Title|Relative:Sibling,Child|Type:Data,Array", new_item_create, xtitle);
				
                
                
				function new_item_create(params) {
                    var title = params.Title;

                    
                    if (params.Title.length == 0) {
							pWt.messageBox("A title must be defined.", "Error:");
                    } else if (K_JSON == null || !w_div.hasChildNodes()) {
                            var data = new Object();
                                data[title] = "";
                            if (params.Type!="Data")
                                data = Array(data);
                            
                            console.log(data);
                            K_JSON = data;
                            
                            parse_j(K_JSON, w_div); 
                                                    
                    } else if (previous_focus) {
                        
                        if (previous_focus.json_item_data != null) {
                            if (params.Relative == "Sibling") {
                                var px = previous_focus.parentNode;
                                var js = previous_focus.json_item_data.json;
                                if (params.Type=="Data") {
									
                                    js[title] = "";
                                    var json = mapDOM(px, true);
									js = json;
									console.log(js);
									
                                } else {
								
									if (px) {
										if (px.className == "JSON_EDITOR_PARENT_NODE") {
											js = px.json_item_data.json;
											var data = new Object();
											data[title] = "";
											js[px.json_item_data.title.innerHTML][js[px.json_item_data.title.innerHTML].length] = data;
											console.log(px.json_item_data.title.innerHTML);
											console.log(js);
										} else {
											K_JSON[title] = [];
											pWt.messageBox("adding to root");
										}
									}
                                }
                                remove_children(w_div);
                                parse_j(K_JSON, w_div);
                           } else {
                                var js = previous_focus.json_item_data.json;
                                
                                
                                console.log(js);
                                
                                var data = new Object();
								data[title] = "";
                                    
                                if (params.Type!="Data")
                                    data = Array(data);
                                
                                
                                js[previous_focus.json_item_data.title.innerHTML] = data;
                                remove_children(w_div);
                                parse_j(K_JSON, w_div);
                                
                               
                           }
                        }
                    }
				}
			
			});
    
    btn_help.addEventListener('click', function() {
        var msg ="<h2 style='margin:0px;'>JSON Edit Help</h2>";
        msg+="<p>Select an item, then to add a node, press the button [insert], define a title, the new nodes type and relationship.</p>";
        pWt.messageBox(msg, "JSON Editor Help");
        
        
    });

    btn_delete.addEventListener('click', function() {
        if (previous_focus != null) {
            var js = previous_focus.json_item_data.json;
            
            previous_focus.parentNode.removeChild(previous_focus);
            var json = mapDOM(w_div, true);
            K_JSON = JSON.parse(json);
            remove_children(w_div);
            parse_j(K_JSON, w_div);
            if (!w_div.hasChildNodes())
                K_JSON = null;
        }
        if (!w_div.hasChildNodes())
            previous_focus = null;
    });
    
    btn_create.addEventListener('click', function() {
        var json = mapDOM(w_div, true);
        K_JSON = JSON.parse(json);
        
        
        var fdata = new FormData();
				fdata.append('source', source);
				fdata.append('data', JSON.stringify(K_JSON));
				
				console.log(JSON.stringify(K_JSON));
				web_top_q_server("WRITECONFIG", writeconfig.bind(this), fdata);
				
       
				function writeconfig(result) {
				
					console.log(result);
					
				   
					function on_select(cmd) {
					   console.log("user selected " + cmd);
					}
			   } 
    });
			
    

	function mapDOM(element, json) {
		var treeObject = {};

		// If string convert to document Node
		if (typeof element === "string") {
			parser = new DOMParser();
			docNode = parser.parseFromString(element,"text/xml"); 
			
			element = docNode.firstChild;
		}

		//Recursively loop through DOM elements and assign properties to object
		function treeHTML(element, object) {
			if (element == previous_focus) 
                J_FOCUS = object;
           
			var nodeList = element.childNodes;
			if (nodeList != null) {
				if (nodeList.length) {
					for (var i = 0; i < nodeList.length; i++) {
                        
						if (nodeList[i].className == "JSON_EDITOR_PARENT_NODE") {
							var tag = nodeList[i].json_item_data.title.innerHTML;
							if (nodeList[i].json_item_data.content == null) {
								if (isNaN(tag)) {
									if (nodeList[i].json_item_data.isArray == true)
										object[tag] = [];
									else
										object[tag] = {};
                                   
									treeHTML(nodeList[i], object[tag]);
								} else {
									console.log(tag);
									object[tag] = {};
                                    
									treeHTML(nodeList[i],object[tag]);
								}
								
							} else {
								object[tag] = nodeList[i].json_item_data.content.innerHTML;
								treeHTML(nodeList[i], object[tag]);
							}
						}
					}
				}
			}
			
			
			}
			
		
		treeHTML(element, treeObject);

		return (json) ? JSON.stringify(treeObject) : treeObject;
	}
}
	
function clone(obj) {
	if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
		return obj;

	var temp = obj.constructor(); // changed

	for(var key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key)) {
			obj['isActiveClone'] = null;
			temp[key] = clone(obj[key]);
			delete obj['isActiveClone'];
		}
	}    

	return temp;
}

function createJSONEditWidget(pWt, xdiv, source) {

	var J_SRC = "";
	var previous_focus = null;
	var title_div = document.createElement('div');
			
    var x_margin = 8;
    
    title_div.style.backgroundColor = "white";
    title_div.style.padding = "8px";
    
    title_div.style.display = "block";

    x_margin = 64;
    var title_image = document.createElement('div');	

    title_image.style.backgroundImage = "URL('../pics/48/applications-system.png')";
    title_image.style.width = "48px";
    title_image.style.height = "48px";
    title_div.appendChild(title_image);

    xdiv.parentNode.setCaption("JSON Editor");
    
    var title_title = document.createElement('span');
    title_title.style.position = "absolute";
    title_title.style.left = x_margin+"px";
    title_title.style.top = "8px";
    title_title.style.fontSize = "24px";
    title_title.style.fontWeight = "bold";
    title_title.innerHTML = "JSON Editor";
    title_div.appendChild(title_title);

    var title_subtitle = document.createElement('span');
    
    title_subtitle.style.position = "absolute";
    title_subtitle.style.left = x_margin+"px";
    title_subtitle.style.top = "34px";
    title_subtitle.style.fontSize = "16px";
    title_subtitle.style.fontWeight = "normal";
    title_subtitle.innerHTML = source;
    title_div.appendChild(title_subtitle);


    xdiv.appendChild(title_div);
    
    var button_bar = document.createElement('div');
    button_bar.style.backgroundColor = "white";
    button_bar.style.position = "absolute";
    button_bar.style.bottom = "0px";
    button_bar.style.left = "0px";
    button_bar.style.right = "0px";
    button_bar.style.padding = "8px";
    
    button_bar.style.display = "block";

    xdiv.appendChild(button_bar);

	var w_div = document.createElement('div');
    
    w_div.style.position = "absolute";
    w_div.style.top = "65px";
    w_div.style.left = "0px";
    w_div.style.right = "0px";
    w_div.style.bottom = "40px";
    w_div.style.backgroundColor="white";
    w_div.style.padding = "4px";
    w_div.style.overflowY = "scroll";
    w_div.style.boxSizing = "border-box";
    xdiv.appendChild(w_div);
    
    var btn_save = document.createElement("BUTTON");
    btn_save.innerHTML = "Save";
	btn_save.style.float = "right";
    button_bar.appendChild(btn_save);

	var btn_clone = document.createElement("BUTTON");
    btn_clone.innerHTML = "Clone";
    btn_clone.style.marginLeft = "2px";
    button_bar.appendChild(btn_clone);

    var btn_special = document.createElement("BUTTON");
    btn_special.innerHTML = "Special";
    btn_special.style.marginLeft = "2px";
    button_bar.appendChild(btn_special);
    
	var btn_insert = document.createElement("BUTTON");
    btn_insert.innerHTML = "Insert";
    btn_insert.style.marginLeft = "2px";
    button_bar.appendChild(btn_insert);

	var btn_delete = document.createElement("BUTTON");
    btn_delete.innerHTML = "Delete";
    btn_delete.style.marginLeft = "2px";
    button_bar.appendChild(btn_delete);
    
	btn_save.addEventListener('click', function() { 
			
		});
	var str = "";
	var CURRENT_JSON_ITEM = null;
	var PREVIOUS_TARGET = null;
	w_div.tabIndex = -1;
	/*
	w_div.addEventListener('mousedown', function() {
		if (event.target.className != 't_div') {
		if (PREVIOUS_TARGET != null)
			PREVIOUS_TARGET.style.backgroundColor = null;
		PREVIOUS_TARGET = null;
		
		}
	}, false);
	*/
	function treeManager(name, J, root, JROOT) {
	
		
			var t_div = document.createElement('div');
			var t_pic = document.createElement('div');
			var t_lab = document.createElement('div');
			var t_dat = document.createElement('div');
	
			t_div.tabIndex = -1;
			
			t_div.appendChild(t_pic);
			t_div.appendChild(t_lab);
			if (root == null)
				w_div.appendChild(t_div);
			else 
				root.appendChild(t_div);
				
			t_div.style.boxSizing            = "border-box";
			t_lab.style.boxSizing            = "border-box";
			t_pic.style.boxSizing            = "border-box";
			t_div.tabIndex = -1;
			t_div.style.outline = "1px solid #eee";
			t_div.style.padding = "4px 0px 4px 8px";
			t_pic.style.backgroundImage = "URL('../pics/48/folder-documents.png')";
			t_pic.style.width = "48px";
			t_pic.style.height = "48px";
			t_pic.style.backgroundSize = "48px 48px";
			t_pic.style.backgroundRepeat = "no-repeat";
			t_pic.style.display = "inline-block";
			t_lab.style.display = "inline-block";
			t_lab.style.margin = "0px 0px 0px 6px";
			t_lab.style.verticalAlign = "top";
			t_lab.style.fontSize = "24px";
			t_lab.style.padding = "12px 4px 4px 4px";
			t_lab.innerHTML = name;
			if (!isNaN(name))
				t_lab.innerHTML = "Item: " + t_lab.innerHTML;
			t_div.style.margin = "2px 0px 2px 20px";
			
			
			//js.constructor == [].constructor 
			//var c_div = document.createElement('div');
			
			t_dat.style.width = "100%";
			t_dat.style.boxSizing = "border-box";
			t_dat.style.margin = "3px 0px";
			t_div.appendChild(t_dat);
			t_dat.style.display = "none";
			
			
			t_div.json_src = new Object();
			t_div.json_src.val = J;
			t_div.json_src.prop = name;
			t_div.json_src.root = JROOT;


			t_div.addEventListener('focus', function() {
				if (PREVIOUS_TARGET != null)
					PREVIOUS_TARGET.style.backgroundColor = null;
				event.target.style.backgroundColor = "#ccc";
				PREVIOUS_TARGET = this;
			});
			
			if (J.constructor == str.constructor) {
				var t_inp = document.createElement("input");
				t_inp.value = J;
				t_inp.style.padding = "2px 6px";
				t_inp.style.margin = "3px 0px";
				t_inp.style.width = "100%";
				
				t_dat.appendChild(t_inp);
				
				t_inp.json_src = new Object();
				t_inp.json_src.val = J_SRC[name];
				t_inp.json_src.prop = prop;
				
				t_inp.addEventListener('keyup', function() {
					J_SRC[name] = this.value;
					
				});
				
			} else if (J.constructor == [].constructor) {
				t_pic.style.backgroundImage = "URL('../pics/48/folder-download.png')";
			
				for (prop in J) {
					treeManager(prop, J[prop], t_dat, J);
				}
				
				
			} else {
				t_pic.style.backgroundImage = "URL('../pics/48/extension.png')";
			
				for(prop in J){
					
					var i_div = document.createElement('div');
					i_div.style.boxSizing            = "border-box";
					t_div.appendChild(i_div);
							
					if (J[prop].constructor != str.constructor) {
						treeManager(prop, J[prop], i_div, J);
					} else {
						
						var i_key = document.createElement('div');
						var i_val = document.createElement('input');
						
						i_div.appendChild(i_key);
						i_div.appendChild(i_val);
						
						i_key.style.boxSizing            = "border-box";
						i_val.style.boxSizing            = "border-box";
						
						i_val.style.margin	= "2px 0";
						i_key.style.margin	= "2px 0";
						
						i_key.innerHTML = prop;
						i_val.value = J[prop];
						//i_key.contentEditable = "true";
						i_val.contentEditable = "true";
						
						i_key.style.display = "inline-block";
						i_key.style.width = "29%";
						i_key.style.marginRight = "1%";
						i_val.style.display = "inline-block";
						i_val.style.width = "70%";
					
						i_key.style.padding = "4px";
						i_val.style.padding = "4px";
						i_val.json_src = new Object();
						i_val.json_src.val = J;
						i_val.json_src.prop = prop;
						
						i_key.json_src = new Object();
						i_key.json_src = i_val.json_src;
						
						
						i_val.addEventListener('keyup', function() {
							this.json_src.val[this.json_src.prop] = this.value;
							
						});
						/*
						i_key.addEventListener('keyup', function() {
							var x = this.json_src.prop;
							
							this.json_src.prop = this.value;
							delete this.json_src.val[x];
							
						});
						*/

					}
				
				}
			}
			t_div.prim = t_dat;
			t_div.className = "t_div";
		
			t_div.addEventListener('dblclick', strap.bind(this), false);
			
			function strap(e) {
				var t = e.target;
				if (e.target.tagName != "DIV") return;
				while(t.className != "t_div")
					t = t.parentNode;
					
				console.log(t.className);
					
				if (t.className == 't_div') {
					e.preventDefault();
					if (t.prim.style.display == "block")
						t.prim.style.display = "none";
					else
						t.prim.style.display = "block";
					
				}
			}
			
		return t_div;
		
	}
    
    btn_delete.addEventListener('click', function() {
        if (PREVIOUS_TARGET != null) {
            if (PREVIOUS_TARGET.json_src.root != null) {
                //delete PREVIOUS_TARGET.json_src.root[PREVIOUS_TARGET.json_src.prop];
                if (PREVIOUS_TARGET.json_src.root.constructor == [].constructor) {
                    PREVIOUS_TARGET.json_src.root.splice(PREVIOUS_TARGET.json_src.prop, 1);
                } else {
                    delete PREVIOUS_TARGET.json_src.root[PREVIOUS_TARGET.json_src.prop];
                }
                    console.log(PREVIOUS_TARGET.json_src.root);
                    PREVIOUS_TARGET.parentNode.removeChild(PREVIOUS_TARGET);
                    PREVIOUS_TARGET=null;
                
            }
        }
    });
	//{"title":"Start Menu","url":"../../src/startmenu.json"}
    btn_special.addEventListener('click', function() {
        if (PREVIOUS_TARGET != null) {
                pWt.inputBox("Insert Special Item", "Special:Start menu item,Start menu sub group|Title", xinsert, "Select a specail item to insert.");
                
                
                function xinsert(R) {
                    if (R.Special == "Start menu sub group") {
                      J_SRC[R.Title] = [];
                      
                      
                      console.log(J_SRC);
                      var xdiv = treeManager(R.Title, J_SRC[R.Title], null, J_SRC);
                      
                      //treeManager(PREVIOUS_TARGET.json_src.length-1, xclone, PREVIOUS_TARGET, PREVIOUS_TARGET.json_src);
                        
                      
                      xdiv.focus();
                      //PREVIOUS_TARGET.json_src.root.splice(
                      /*
                        var xclone = JSON.parse('{"' + R.Title + '"' + ':[]}');
                        PREVIOUS_TARGET.json_src.val.push[R.Title] = Array();
                        console.log(PREVIOUS_TARGET.json_src);
                        var xdiv = treeManager(PREVIOUS_TARGET.json_src.length-1, xclone, PREVIOUS_TARGET, PREVIOUS_TARGET.json_src);
                        xdiv.focus();
                        */
                    } else if (R.Special == "Start menu item") {
                        var xclone = JSON.parse('{"title":"title to be shown in the menu","url":"relative path of the document"}');
                        PREVIOUS_TARGET.json_src.val.push(xclone);
                        console.log(PREVIOUS_TARGET.json_src);
                        var xdiv = treeManager(PREVIOUS_TARGET.json_src.length-1, xclone, PREVIOUS_TARGET, PREVIOUS_TARGET.json_src);
                        xdiv.focus();
                    }
                }
            
        } else {
            pWt.messageBox("Select an item to insert the pre-defined construct.");
        }
    });
	btn_clone.addEventListener('click', function() { 
			if (PREVIOUS_TARGET != null) {
				if (PREVIOUS_TARGET.json_src.constructor === {}.constructor) {
					
					var xclone = clone(PREVIOUS_TARGET.json_src.val);
                    console.log(JSON.stringify(xclone));
					PREVIOUS_TARGET.json_src.root.push(xclone);
					console.log(PREVIOUS_TARGET.json_src);
					for(prop in xclone) 
						xclone[prop] = "";
					var xdiv = treeManager(PREVIOUS_TARGET.json_src.root.length-1, xclone, PREVIOUS_TARGET.parentNode, PREVIOUS_TARGET.json_src.root);
					xdiv.focus();
				} else {
					pWt.messageBox("Only an object apart of an array can be cloned.", "Coning Error");
				} 
			} else {
				pWt.messageBox("Select an item to be cloned.");
			}
			
			
		});
	
	web_top_q_server("GETFILECONTENTS?"+source, qfx.bind(this), null);
    function qfx(r) {
		J_SRC = JSON.parse(r);
		for(prop in J_SRC) {
			treeManager(prop, J_SRC[prop], null, J_SRC);
		}
	}   
	
		btn_save.addEventListener('click', function() {
				var fdata = new FormData();
                var xjson = JSON.stringify(J_SRC);
                while(xjson.indexOf('null') != -1) {
                    xjson = xjson.replace('null', '');
                }
               
				fdata.append('source', source);
				fdata.append('data', xjson);
				
				web_top_q_server("WRITECONFIG", writeconfig.bind(this), fdata);
				console.log(J_SRC);
       
				function writeconfig(result) {
				
					console.log(xjson);
					
					pWt.messageBox(source + " has been updated");
                    if (source.indexOf("startmenu.json") != -1)
                        pWt.killStartMenu();
			   } 
			   
			});


	btn_insert.addEventListener('click', function() { 
		if (PREVIOUS_TARGET != null)
			pWt.inputBox("Insert a new item", "Key|Value|Relative:Sibling,Child|As:Object,Array,String", xinsert, "Select a unique key and provide an optional value.<hr>Caution currently there is no control over malformed key or value pairs.");
		else
			pWt.inputBox("Insert a new item", "Key|Value|As:Object,Array,String", xinsert, "Select a unique key and provide an optional value.  The new item will be relative to the root.<hr>Caution currently there is no control over malformed key or value pairs.");
		
			
			
		});
	function xinsert(R) {
        if (R.Key.length == 0) {
            pWt.messageBox("A key needs to be defined.");
            return;
            
        }
        
         if (PREVIOUS_TARGET == null) {
             pWt.messageBox("Select a parent node.");
             return;
         }
        var pt = PREVIOUS_TARGET;
        
        if (R.Relative == "Sibling" && pt.parentNode.json_src != null) pt = pt.parentNode;
        
        if (!pt.json_src) return;
        
        if (R.As == "Object") {
            
            
            console.log(pt.json_src.constructor);
            
            var obj = '{"'+R.Key+'":"'+R.Value+'"}';
            var xclone = JSON.parse(obj);
            var xdiv = null;
            if (R.Relative == "Child") {
                if (pt.json_src.val.constructor === {}.constructor) {
                    pt.json_src.val[R.Key] = R.Value;
                    xclone = '{"'+R.Key+'":"'+R.Value+'"}';
                    console.log(pt);
                    pt.parentNode.removeChild(pt);
                    xdiv = treeManager(pt.json_src.prop, pt.json_src.val, pt.parentNode, pt.json_src.root);
                } else {
                    pt.json_src.val+=(xclone);
                    xdiv = treeManager(pt.json_src.length-1, xclone, pt, pt.json_src);
                }
                
            } else {
                xclone = JSON.parse("{}");
                pt.json_src.root[R.Key]=(xclone);
                console.log(pt.json_src);
                 xdiv = treeManager(R.Key, xclone, pt.parentNode, pt.json_src.root);
            }
            if (xdiv != null)
                xdiv.focus();
        }
        
			
			
		}
}













