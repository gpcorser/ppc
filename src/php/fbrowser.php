<!---
    MODULE:     fbrowser.php
        
                this script, creates a list of files from a selected directory, which is provided in the query string which 
                was created when this file was created.   
                
                    QString = ../src/php/fbrowser.php/?" + [ source file ]
-->
<?php
    // allow javascript access to relivent SERVER variables
    echo "<script>var source_path = '".$_SERVER['QUERY_STRING']."';";
    echo "var root_dir = '".$_SERVER['CONTEXT_DOCUMENT_ROOT']."';";
    echo "</script>";
?>
<html>

    <head>
        <style>
            body {
                margin: "1em";
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                font-family:Verdana, Geneva, sans-serif;
                overflow:hidden;
            }
            .main_control {
                position: absolute;
                left: 0px;
                top: 0px;
                padding: 6px;
                box-sizing: border-box;
                right: 0px;
                border-bottom: 1px solid #333;
            }
            
            .xdiv {
                display:inline-block;
                vertical-align: middle;
            }
            
            .container {
                position: absolute;
                left: 0px;
                top: 62px;
                padding: 0;
                box-sizing: border-box;
                right: 3px;
                bottom: 0px;
                overflow-y: auto;
                
            }
            .list_item {
                cursor:pointer;
                padding: .5em;
                box-sizing: border-box;
                width: 100%;
                margin-bottom: 0px;
                background-color: #ddd;
            }
            .list_item:nth-child(even) {
                background-color: #eee;
            }
            
            .list_item_2 {
                cursor:pointer;
                padding: .5em;
                display:inline-block;
                box-sizing: border-box;
                max-width: 180px;
                margin: .5em;
                background-color: #eee;
                vertical-align: top;
                word-wrap: break-word;
                word-break: break-all;
            }
        </style>
    </head>
    
    <body>
        <!-- create the header for the file browser (single level), a folder icon and a span for a title-->
        <div class="main_control">
            <div class="xdiv">
            <img id="i_icon" src="../../../pics/48/folder.png">
            </div>
            <div class="xdiv">
            <div id="title" style="font-weight:bold;position:absolute;left:58px;right:10px;top:10px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;"></div>
            <button style="position:absolute;right:3em;top:1px;" onclick="do_toggle(0);">&#x2630;</button>
            <button style="position:absolute;right:.5em;top:1px;" onclick="do_toggle(1);">&#x2637;</button>
            </div>
        </div>
        
        <script>
            
            document.body.style.fontSize = window.parent.document.body.style.fontSize;
            document.body.style.fontFamily = window.parent.document.body.style.fontFamily;
        // adjust the root directory/context root
            root_dir = root_dir.replace('home/','~');
            root_dir = root_dir.replace('/public_html','');
            
            // prepare form data, which includes the source path        
                var fdata = new FormData();
                fdata.append('source', encodeURI(source_path));
            // get content from server
                window.parent.web_top_q_server("GETFILES", qfx.bind(this), fdata);
            // create the master div for the file list    
                var wnd = document.createElement('div');
                wnd.className = "container";
                document.body.appendChild(wnd);
            // set the title, according to the source path provided
                title.innerHTML = "File Browser: [" + source_path + "]";
                var pfocus = null;
            function do_toggle( currentView) {
                var cs = wnd.children;
                window.parent.webTopInstance.default_list_view = currentView;
                if (currentView == 1) {
                    for(var i=0;i<cs.length;i++) {
                        cs[i].className = "list_item_2";
                        cs[i].children[0].style.backgroundSize = "48px 48px";
                        cs[i].children[0].style.width = "100%";
                        cs[i].children[0].style.height = "48px";
                        cs[i].children[1].style.textAlign = "center";
                    }
                } else {
                    for(var i=0;i<cs.length;i++) {
                        cs[i].className = "list_item";
                        cs[i].children[0].style.backgroundSize = "32px 32px";
                        cs[i].children[0].style.width = "32px";
                        cs[i].children[0].style.height = "32px";
                        cs[i].children[1].style.textAlign = "left";
                    }
                }
            }
            // respond to keyboard event, used to navigate
                function item_key_event(e) {
                            
                            switch(e.keyCode) {
                                case (40): {                            // down arrow pressed
                                    e.preventDefault();                 // prevents the window who has a vertical scroll bar from scrolling, its annoying when moving to next item
                                    if (e.target.nextSibling)
                                        e.target.nextSibling.focus();
                                    break;
                                }
                                case (38): {                            // up arrow pressed
                                    e.preventDefault();                 // prevents the window who has a vertical scroll bar from scrolling
                                    if (e.target.previousSibling)
                                        e.target.previousSibling.focus();
                                    break;
                                    
                                }
                                case (13): {                            // enter, select the item
                                    e.preventDefault();
                                    window.parent.webTopInstance.openFile(e.target.file_path);
                                    break;
                                }
                                default:
                                    break;
                            }
                        
                }
            // call back for server request of files
                function qfx(result) {
                    var J = JSON.parse(result);
                    
                    // loop through the files in the result, (folders are also present, but will not be included here)
                    for(var i=0;i<J['files'].length;i++) {
                        var extention = (J['files'][i]).split('.').pop();               // get the extention, this will allow us to grab the associated icon
                        var item = document.createElement('div');                       // create the item (div)
                        var item_title = document.createElement('div');                 // a title 
                        var item_img = document.createElement('div');                   // the associated image
                        item.tabIndex = -1;                                             // tabIndex of -1, allows the item div to get focus
                        item.className = "list_item";
                        
                        item_title.style.display = "inline-block";                      // the image and title, will be inline (on the same line)                      
                        item_title.style.verticalAlign = "middle";
                        item_img.style.verticalAlign = "middle";                        // children of item, are centered veritcally
                        
                        item_title.innerHTML = J['files'][i].replace(/\.[^/.]+$/, "");  // set the title, according to the file name
                        
                        // get the assocated icon
                        var pic_src = window.parent.webTopInstance.getAssociatedIcon(extention, false);
                        // set the image styles
                        item_img.style.display 				= "inline-block";
                        item_img.style.backgroundImage 		= "url('../../../pics/48/"+pic_src+"')";
                        item_img.style.backgroundSize  		= "32px 32px";
                        item_img.style.backgroundRepeat		= "no-repeat";
                        item_img.style.backgroundPosition	= "center";
                        item_img.style.width			  	= "32px";
                        item_img.style.height		  		= "32px";
                        item_img.style.marginRight          = "6px";
                        
                        item.appendChild(item_img);                                     // add the image and title to the item
                        item.appendChild(item_title);
                        
                        wnd.appendChild(item);                                          // add the item to the window (list)
                        
                        item.file_path = source_path + '/' + J['files'][i];             // allows eventListeners easy access to the correct file associated with the item
                        // include event listeners
                        item.addEventListener("dblclick", function() {
                            window.parent.webTopInstance.openFile(this.file_path);
                        });
                        
                        item.addEventListener('focus', function() {
                            if (pfocus != null)                                         // if pfocus (previous focus)
                                pfocus.style.backgroundColor = null;                    // - de-highlight it
                                
                            this.style.backgroundColor = "#ccf";                        // highlight the current focus
                            pfocus = this;                                              // remember the new focus
                        });
                        
                        item.addEventListener('keydown', item_key_event.bind(this));    // respond to keyboard event
                        
                    }
                    
                    do_toggle(window.parent.webTopInstance.default_list_view);
                }
            
        </script>
    
    </body>

</html>
<?php
    //var_dump($_SERVER);
?>
