/*
 * 	MODULE:		webtop.js
 * 
 * 				The webtop implements a desktop-like design for web pages
 * 
 * 
 */
 
 /*
  * 	FUNCTION:	theme colors, the theme will be a list of values from dark to light, based on the RGB provided, 
  * 				there will be 32 shades of the provided RGB triplet, with various components of the webtop
  * 				using these shades to create the webtop theme. CAUTION: some variants cause transparency
  * 
  * 				for best results, use a color triplent nearer to the middle of the shade desired, since this 
  * 				function will use an average of each of the 3 components, and step through from 0 to 255
  * 
  * 	@PARAMS:	[r]	- the red component
  * 				[g] - the green component
  * 				[b] - the blue compentne
  * 
  * 	@RETURN:	returns an array of 32 RGB Triplets, using the RGB input as a basis
  * 
  */
function getThemeColors(r, g, b) {
    var shades = [];													            // reset the shades array
    var rb = r/16, gb = g/16, bb = b/16;								            // step by 16 for each of the 3 componets, before 
    var ra = (255-r)/16;												            // step by 16 for each of the 3 componets, after
    var ga = (255-g)/16;
    var ba = (255-b)/16;
    
    var fr = 0, fg = 0; fb = 0;											            // color shades begin at zero
    
    var ro, go, bo;														            // these will hold the 2digit hex values of each component

    for(var i=0;i<32; i++) {
        // want an integer, not a float
        ro = parseInt(fr);
        go = parseInt(fg);
        bo = parseInt(fb);
        // not too big ...
        if (ro > 255) ro = 255;
        if (bo > 255) go = 255;
        if (bo > 255) bo = 255;				
        // convert to a base 16 hex with 2 digits, lead with zero if needed
        ro = ro.toString(16); if (ro.length == 1) ro = "0" + ro;				
        go = go.toString(16); if (go.length == 1) go = "0" + go;				
        bo = bo.toString(16); if (bo.length == 1) bo = "0" + bo;				
        // assign to the shades
        shades[i] = '#' + ro + go + bo;
        
        // change steping after the middle value
        
        if (i == 15) {
            rb = ra;
            gb = ga;
            bb = ba;	
        }
        
        // preform the step
        
        fr+=rb;
        fg+=gb;
        fb+=bb;	
    }
    
    return shades;
    
}

/*
 * 	OBJECT:		webtop, the webtop will create and manage the webtop enviroment
 * 
 * 
 * 
 * 
 */

var webTop = function() {
    
    this.webtop = null                                                              // the webtop, the main div, where everything will be placed
    
    this.webbar = null;                                                             // the webtop's webbar
    
    this.startbutton = null;														// the start button on the bottom left of the page
    
    this.setTheme(86, 56, 50, null);												// this is a default theme, this will be updated from a JSON file latter
    
    this.form_focus = null;															// this is the current web form who has focus, this will allow the application
																					//   to track which form should be highlighted, and which should be muted
																					//   it also assists with the implementation of the associated appbar button 
                                                                                    
    this.default_list_view  = 0;                                                    // this will preserve any views which can be toggled, from list view to icon view
    
    this.zIndex = 1000;                                                             // to set zindexes of webforms, this will allow a newly focused 
                                                                                    // webform to be brought to the front, while preserving the
                                                                                    // relative positions of the other webforms
    this.startMenu = null;
    
    this.configData = null;															
    
    this.focusWTI	= null;
    
    
    this.mouseFocus = {
            bind                        : 0,
            relative_x                  : 0,
            relative_y                  : 0,
            element                     : 0
    }
    //this.create();
    this.qConfig();																	// access the settings config file, this file must exists for the webtop to 
																					//   work correctly
	//this.qFiles();

}

/*
 * 	FUNCTION:	sets various component with color themes
 * 
 */
webTop.prototype.setTheme = function(r, g, b, wp) {
	this.shades = getThemeColors(r,g,b);                                         	// a default shade for NOW!!!

 	this.theme = {
            backgroundImage             : ((wp==null)?"url('../pics/23-beautiful-sunrise.jpg')":"url('"+wp+"')"),
            webtopColor                 : this.shades[16],
            webbarColor                 : "linear-gradient(" + this.shades[8] +  "," + this.shades[12] + ")",
            webbarText                  : this.shades[8],
            webbarBorder                : "1px solid " + this.shades[18],
            startButtonColor            : "linear-gradient(" + this.shades[18] +  "," + this.shades[15] + ")",
            startButtonColorHover       : "linear-gradient(" + this.shades[19] +  "," + this.shades[16] + ")",
            startButtonTextColor        : this.shades[22],

            appBarButtonColorHover2     : "linear-gradient(" + this.shades[19] +  "," + this.shades[12] + ")",
            appBarButtonColor2          : "linear-gradient(" + this.shades[20] +  "," + this.shades[17] + ")",

            appBarButtonColor           : "linear-gradient(" + this.shades[17] +  "," + this.shades[14] + ")",
            appBarButtonColorHover      : "linear-gradient(" + this.shades[18] +  "," + this.shades[15] + ")",
            
            appBarButtonTextColor        : this.shades[25],
            
            appBarBackground            : "linear-gradient(" + this.shades[20] +  "," + this.shades[17] + ")",
            appBarBackgroundFocus       : "linear-gradient(" + this.shades[16] +  "," + this.shades[13] + ")",
            appBarText                  : this.shades[28],
            
            window                      : this.shades[22],
            windowFrame                 : "1px solid " + this.shades[4],
            windowShadow                : "5px 5px 10px " + this.shades[4],
            
            // default images used for the web form close, minimize and maximize button
            btnClose                    : "url('../pics/bullet_cross.png')",
            btnMin                      : "url('../pics/minimize_square.png')",
            btnMax                      : "url('../pics/maximize_square.png')",
            btnAboveOff                 : "url('../pics/pinA.png')",
            btnAboveOn                  : "url('../pics/pinB.png')",
            
            fontSize                    : "16px"
    }
}
/* 
 * 	FUNCTION: creates the empty webtop, including: webtop (desktop), webtop panel (where active application buttons are located), and a start menu button
 * 	
 * 
 */
webTop.prototype.create = function() {
    
    this.webtop = document.createElement("DIV");
    
    /// initalize the webtop div
    
    this.webtop.style.position              = "absolute";                           // webtop, must be fixed/absolute
    
    this.webtop.style.left                  = "0";                                  // stretch the webtop to fill the browser's window
    this.webtop.style.right                 = "0";
    this.webtop.style.top                   = "0";
    this.webtop.style.bottom                = "0";
    
    this.webtop.style.backgroundColor       = this.theme.webtopColor;               // set the default background color, currently no background image
    
    this.webtop.style.backgroundImage       = this.theme.backgroundImage;   
    this.webtop.style.backgroundSize        = "100% 100%";                          // all pictures will be stretched to fill the webtop
    
    /// create an webtop app bar, this will contain the start button, and is a place to hold buttons of any open documents
    
    this.webbar = document.createElement("DIV");
    
    this.webbar.style.position              = "absolute";                           // the webbar, as the webtop will have an absolute position
    
    this.webbar.style.left                  = "0px";
    this.webbar.style.bottom                = "0px";
    this.webbar.style.right                 = "0px";
    
    this.webbar.style.background            = this.theme.webbarColor;               // slightly darker than the webtop
    
    this.webbar.style.padding               = "3px";
    
    this.webbar.style.borderTop             = this.theme.webbarBorder;
    
    this.webtop.appendChild(this.webbar);                                           // add webbar to webtop
    
    /// create a start button, this will allow a user to select various items from the start menu
    
    this.startbutton = document.createElement("div");
    
    this.startbutton.style.background       = this.theme.startButtonColor;          // use gradiant color for the button background
    this.startbutton.style.color            = this.theme.startButtonTextColor;      // use a lighter color to highlight the text
    this.startbutton.style.padding          = "4px";                                // create some padding
    
    this.startbutton.style.textShadow       = "1px 1px " + this.shades[2];          // a shadow'd text
    
    this.startbutton.innerHTML              = "&#9776;";
	this.startbutton.innerHTML              = "Start";
    
    this.startbutton.style.display          = "inline-block";
    
    this.startbutton.style.marginRight      = "6px";                                // this will create a small space between the start button and subsequent webform-app buttons
    
    this.startbutton.style.cursor           = "pointer";
    
    this.webbar.appendChild(this.startbutton);
    this.webbar.style.zIndex                = 1000000;                              // keep the webbar ontop of all windows
    
    document.body.appendChild(this.webtop);                                         // add webtop to the body
    
    this.startbutton.addEventListener("mouseenter", this.startButtonMouseAction.bind(this));
    this.startbutton.addEventListener("mouseleave", this.startButtonMouseAction.bind(this));
    this.startbutton.addEventListener('click', this.showStartMenu.bind(this));
    window.addEventListener("resize", this.resizeWindow.bind(this));
    
}

/*
 * 	FUNCTION:	ensures upon resizing of the browsers window, that forms still reside in the visible area of the window
 * 
 * 	@PARAM:		[e]	- the event of the resizeEvent
 * 
 */

webTop.prototype.resizeWindow = function (e) {
    
    /// ensure all web forms are within the view
    
    var wfs = document.getElementsByClassName("web_form");                          // query web_form s
    
    var wt = this.webtop.getBoundingClientRect();                                   // limits of the form's position
    var wb = this.webbar.getBoundingClientRect();                                   // consider the web bar on the bottom
    
    for(var i=0;i<wfs.length;i++) {
        
        var wf = wfs[i];
        var fr = wf.getBoundingClientRect();
        
        /// the form is beyond the right edge?
        
        if (fr.left > wt.right - 10) wf.style.left = wt.right - 10 + "px";
        
        /// the form is beyond the bottom edge?
        
        if (fr.top > wt.height - wb.height - 20) wf.style.top = wt.height - wb.height - 20 + "px";
        
    }
    
    /// ensures icons are still in view
    
    this.alignWebTopIcons();

}

webTop.prototype.startButtonMouseAction = function(e) {
    
    switch (e.type) {
        case "mouseenter":
            this.startbutton.style.background = this.theme.startButtonColorHover;   
            break;
        case "mouseleave":
            this.startbutton.style.background = this.theme.startButtonColor;
            break;
    };

}
/*
 *  creates a floating window
 * 
 * 	@PARAMS:		[ title ] 	the title of the window, will be shown in the window's app bar
 * 
 * 					[ x and y ]	the prefered location of the window
 * 
 * 					[ parent ]	may be null
 * 								
 * 								this parameter is intended to be used to create popup windows, these windows have a subset of the primary's, they
 * 								may display simple messages, or be used as a simple input window, this window will contain only a close button, 
 * 								it will have a slightly smaller title bar, and can't be resized, also this window will not appear in the webtop 
 * 								application bar, finally this window will not allow others to get focus while it is active.
 * 
 * 								
 */

webTop.prototype.createWindow = function(title, x, y, parent) {
    
    /// create the frame
    
    var frm = document.createElement('div');
    
    var w = "600px",																// a default size for the window, Chrome currently has a bug
		h = "420px";																// and will not allow the window to be resized manually below this
		
	if (parent != null) {
		w = "400px";																// a popup window, will be slightly smaller
		h = "240px";
	}
    
    frm.className                           = "web_form";							// define the class name, this will be used to query form objects
    frm.style.display                       = "block";
    
    if (parent == null)
		frm.style.zIndex                        = this.zIndex++;					// used to bring forms to foreground when they get focus
    
    frm.style.position                      = "absolute";							// absolute position, required to create the webtop effect
    frm.style.minWidth                      = "120px";
    frm.style.minHeight                     = "60px";
    frm.style.resize                        = (parent==null)?"both":"none";			// resizeable only if webtop is the parent
    
    frm.style.backgroundColor               = this.theme.window;
    frm.style.border                        = this.theme.windowFrame;
    frm.style.borderRadius                  = "3px";
    
    frm.style.overflow                      = "auto";								
    
    frm.style.boxShadow                     = this.theme.windowShadow;				// create a shadow effect for floating forms
    
    frm.style.left                          = ((x!=null)?x:"10")+"px";				// set the initial postion of the window
    frm.style.top                           = ((y!=null)?y:"10")+"px";
    
    frm.style.width                         = w;									// set the size of the form, [ defined above ]
    frm.style.height                        = h;
    
    frm.form_data = new Object();													// this will allow access to various objects related to this form/window
    
    frm.form_data.state = 0;														// track the forms state, normal, max or min [0, 1, 2]
    frm.form_data.style = 0;														// allows resetting of styles when being restored
    frm.form_data.title = title;													// the default title for this form
    frm.tabIndex                            = "-1";                     			// set tabindex, so the form can get focus
    
    /// append to the correct parent
    if (parent == null)
		this.webtop.appendChild(frm);												// webtop is parent by default
    else
		parent.appendChild(frm);													// [ parent ] is the parent to append the form to
		
    /// create window app bar
    
    var titlebar = document.createElement('div');									// the title bar
    var caption = document.createElement('div');									// the caption of the title bar
    
    frm.caption = caption;
    caption.innerHTML = title;
    caption.style.overflow = "hidden";
    caption.style.textOverflow = "ellipsis";
    caption.style.whiteSpace = "nowrap";
    
    frm.setCaption = function(cap) { 
		var title = cap.replace(/\.[^/.]+$/, "");
		
		this.form_data.caption.innerHTML = title;
        if (this.form_data.appbutton != null)
            this.form_data.appbutton.innerHTML = title;
    };
    frm.caption = title;															
    
    titlebar.style.position                   = "absolute";
    titlebar.style.left                       = "0";
    titlebar.style.top                        = "0";
    titlebar.style.right                      = "0";
    titlebar.style.background                 = this.theme.appBarBackground;
    titlebar.style.color                      = this.theme.appBarText;
    titlebar.style.padding                    = "2px 2px 4px 6px";
    titlebar.style.cursor                     = "default";
    titlebar.style.textShadow                 = "1px 1px " + this.shades[2];          // a shadow'd text
    titlebar.className                        = "form_app_bar";
    
    if (parent != null)
		titlebar.style.fontSize = ".8em";
		
    frm.form_data.titlebar = titlebar;
    frm.form_data.caption = caption;
    
    titlebar.appendChild(caption);

    /// create app button for the webbar
    if (parent == null) {
			
		var appbtn = document.createElement('div');
		
		appbtn.className                        = "webform_app_button";
		
		appbtn.style.display                    = "inline-block";                       // ensure they are inline, on the webbar
		appbtn.style.padding                    = "4px";                                // create some padding
		appbtn.style.textShadow                 = "1px 1px " + this.shades[2];          // a shadow'd text
		
		appbtn.style.cursor                     = "default";
		appbtn.innerHTML                        = title;
		
		appbtn.style.background                 = this.theme.appBarButtonColor;          // use gradiant color for the button background
		appbtn.style.color                      = this.theme.appBarButtonTextColor;      // use a lighter color to highlight the text
		
		appbtn.style.marginRight                = "2px";
		
        appbtn.style.maxWidth                   = "120px";
        appbtn.style.textOverflow               = "ellipsis";
        appbtn.style.whiteSpace                 = "nowrap";
        appbtn.style.overflow                   = "hidden";
        appbtn.style.verticalAlign              = "bottom";
		appbtn.btn_data = new Object();
		
		appbtn.btn_data.webform = frm;
		frm.form_data.appbutton = appbtn;
        
	}
	/// create close, maximize and minimize buttons
	
	var btn_bar = document.createElement('div');                                    // create the button bar
	btn_bar.style.padding                   = "1px 0px 1px 1px";

	var btn_close = document.createElement('div');                                  // create the several buttons

	
		btn_close.style.display                 = "inline-block";                       // set the close button styles
		btn_close.style.backgroundImage         = this.theme.btnClose;
		btn_close.style.backgroundSize          = "100% 100%";
		btn_close.style.width                   = "16px";
		btn_close.style.height                  = "16px";
		btn_close.web_form = frm;
		btn_close.name                          = "close";    
		
		btn_bar.style.backgroundColor           = this.shades[4];
		

	if (parent == null) {
		var btn_min   = document.createElement('div');
		var btn_max   = document.createElement('div');
		
		
		btn_min.style.display                   = "inline-block";                       // set the minimize button styles
		btn_min.style.backgroundImage           = this.theme.btnMin;
		btn_min.style.backgroundSize            = "100% 100%";
		btn_min.style.width                     = "16px";
		btn_min.style.height                    = "16px";
		btn_min.style.marginRight               = "1px";
		btn_min.web_form = frm;
		btn_min.name                            = "min";
		
		btn_max.style.display                   = "inline-block";                       // set the maximize button styles
		btn_max.style.backgroundImage           = this.theme.btnMax;
		btn_max.style.backgroundSize            = "100% 100%";
		btn_max.style.width                     = "16px";
		btn_max.style.height                    = "16px";
		btn_max.style.marginRight               = "1px";
		btn_max.web_form = frm;
		btn_max.name                            = "max";
		
		btn_bar.appendChild(btn_min);
		btn_bar.appendChild(btn_max);
		
		this.webbar.appendChild(appbtn);
    	
		btn_min.addEventListener("click", this.appBtnActivate.bind(this));
		btn_max.addEventListener("click", this.appBtnActivate.bind(this));
		
	} 

	btn_bar.style.position                  = "absolute";                           // set button bar styles
	btn_bar.style.right                     = "2px";
	btn_bar.style.top                       = "2px";

	titlebar.appendChild(btn_bar);
	
	btn_bar.appendChild(btn_close);
    
	btn_close.addEventListener("click", this.appBtnActivate.bind(this));
		
	frm.close = function() { btn_close.click(); };
    	
	
    /// finishing up
    
    frm.appendChild(titlebar);
    
    /// event listeners
    
    // the app bar, will be used to move and change state of form
    
    titlebar.addEventListener("mousedown", this.windowMouseAction.bind(this));
    if (parent == null) {
		titlebar.addEventListener("dblclick", this.windowMouseAction.bind(this));
        frm.addEventListener("focus", this.windowMouseAction.bind(this));
        caption.addEventListener('mousedown', this.windowMouseAction.bind(this));
       
    // appbtn
    	appbtn.addEventListener("mouseenter", this.appbtnButtonMouseAction.bind(this));
		appbtn.addEventListener("mouseleave", this.appbtnButtonMouseAction.bind(this));
		appbtn.addEventListener("click", this.appbtnButtonMouseAction.bind(this));
	}
    // min/max/close buttons
    
    return frm;
}

webTop.prototype.formClose = function(frm) {
    
    if (frm.form_data.appbutton != null)
		frm.form_data.appbutton.parentNode.removeChild(frm.form_data.appbutton);
    else
		frm.parentNode.parentNode.removeChild(frm.parentNode);
    frm.parentNode.removeChild(frm);
    
}

webTop.prototype.appBtnActivate = function (e) {
    switch(e.target.name) {
        case "close":
            this.formClose(e.target.web_form);
            break;
        case "min":
            e.target.web_form.focus();
            e.target.web_form.form_data.appbutton.click();
            break;
        case "max":
            this.toggleFormState(e.target.web_form);
            break;
    }
}

/*
 *      Set or restore the state of a webform, maximized or normal
 * 
 *      state:
 *              0:  normal
 *              1:  maximized
 *              2:  minimized
 * 
 */
 
webTop.prototype.toggleFormState = function (frm, tomax) {

    var wb = this.webbar.getBoundingClientRect();                                   // this is used to determain the bottom postion

    if (frm.form_data.state == 0 || tomax != null) {                                                 
        
        /// toggle state to maximize
        
        frm.form_data.style = frm.getAttribute('style')                             // save the current style 
        
        frm.style.width = null;                                                     // the width and height need to be null so they don't conflict
        frm.style.height = null;                                                    // with the right and bottom attributes which are set below
        
        frm.style.resize = null;                                                    // disallow resize during maximized state
        
        frm.style.borderRadius = null;                                              // remove the rounded corners of the webform while maximized
        
        frm.style.left = "0px";                                                     // set the location of the webform to fill the window
        frm.style.top = "0px";                                                  
        frm.style.right = "0px";
        frm.style.bottom = wb.height + "px";                                        // considering the web bar on the bottom
        
        frm.form_data.state = 1;                                                    // set the state flag
    } else {
        
        /// toggle state to restore
        
        frm.setAttribute('style', frm.form_data.style);                             // restore the styles
        frm.form_data.state = 0;                                                    // set the state flag
        
    }                        
}

/*
 *  set focus to a form [frm]
 * 
 *  bring to the front (make [frm's] zIndex greater than the others)
 *  highlight the newly focused window
 *  de-highlight the previously focused window
 * 
 */
 
webTop.prototype.setFormFocus = function(frm) {

    if (this.form_focus && this.form_focus != frm) {
        this.form_focus.form_data.titlebar.style.background = this.theme.appBarBackground;
        this.form_focus.form_data.appbutton.style.background = this.theme.appBarButtonColor;
    } 
    
    var forms = document.getElementsByClassName("web_form");
    
    for(var i=0;i<forms.length;i++) {
        
        var form = forms[i];
        if (form.style.zIndex > frm.style.zIndex)
            form.style.zIndex--;
    }
    
    frm.style.zIndex = this.zIndex - 1;
    
    
    frm.form_data.titlebar.style.background = this.theme.appBarBackgroundFocus;
    if (frm.form_data.appbutton != null)
		frm.form_data.appbutton.style.background = this.theme.appBarButtonColor2;
    
    this.form_focus = frm;
                        
}

webTop.prototype.windowMouseAction = function(e) {
        switch(e.type) {
            case "focus":
                {
                    this.setFormFocus(e.target);
                }
                break;            
            case "dblclick":
                {
                    // if the caption was double clicked, the following loop, will find the parent with className 'form_app_bar'
                    var target = e.target;
                    while(target) {
                        if (target.className == "form_app_bar") break;
                        target = target.parentNode;
                    } 
                    console.log(target);
                    if (target)
                        this.toggleFormState(target.parentNode);
                    
                }
                break;
            case "mousedown":
                if (this.mouseFocus.bind != 0) {    
                    window.removeEventListener("mousemove", this.mouseFocus.bind);
                    window.removeEventListener("mouseup", this.mouseFocus.bind);
                }
                var target = e.target;
                while(target) {
                    if (target.className == "form_app_bar") break;
                    target = target.parentNode;
                }
                if (target.className == "form_app_bar") {
                    if (e.buttons == 1 && target.parentNode.form_data.state == 0) {
                        
                        var ap = target.getBoundingClientRect();
                        
                        this.mouseFocus.relative_x = e.clientX - ap.left;
                        this.mouseFocus.relative_y = e.clientY - ap.top;
                        this.mouseFocus.bind = this.windowMouseAction.bind(this);
                        this.mouseFocus.element = target.parentNode;
                        window.addEventListener("mousemove", this.mouseFocus.bind);
                        window.addEventListener("mouseup", this.mouseFocus.bind);
                        
                    }
                }
                break;
            case "mousemove": 
                if (e.buttons == 1) {
                    
                    
                    var wt = this.webtop.getBoundingClientRect();
                    var wb = this.webbar.getBoundingClientRect();
                    
                    var cx = e.clientX - this.mouseFocus.relative_x;
                    var cy = e.clientY - this.mouseFocus.relative_y;
                    
                    if (cx < 0) cx = 0;
                    if (cy < 0) cy = 0;
                    
                    if (cx > wt.right-10) cx = wt.right-10;
                    if (cy > wt.height - wb.height - 20) cy = wt.height - wb.height - 20;
                    
                    this.mouseFocus.element.style.left = cx + "px";
                    this.mouseFocus.element.style.top = cy + "px";
                    
                }
                break;
            case "mouseup":
                {
					
                    window.removeEventListener("mousemove", this.mouseFocus.bind);
                    window.removeEventListener("mouseup", this.mouseFocus.bind);
                }
                break;
        }
    
}

webTop.prototype.appbtnButtonMouseAction = function(e) {
    switch (e.type) {
        case "mouseenter":
            if (this.form_focus == e.target.btn_data.webform)
                e.target.style.background = this.theme.appBarButtonColorHover2;
            else
                e.target.style.background = this.theme.appBarButtonColorHover;
            break;
        case "mouseleave":
            if (this.form_focus == e.target.btn_data.webform)
                e.target.style.background = this.theme.appBarButtonColor2;
            else
                e.target.style.background = this.theme.appBarButtonColor;
            break;
        case "click":
            {
                if (e.target.btn_data.webform.style.display == "none") {
                    e.target.btn_data.webform.style.display = "block";
                    e.target.btn_data.webform.focus();
                } else if (e.target.btn_data.webform != this.form_focus) 
                    e.target.btn_data.webform.focus();
                else
                    e.target.btn_data.webform.style.display = "none";
            }
            break;
    };
}

webTop.prototype.getAssociatedIcon = function(extention, treat_as_folder) {
	if (!treat_as_folder) {
		if(this.configData != null) {
			for(var i=0;i<this.configData['mimi-types'].length;i++) {
				var mmt = this.configData['mimi-types'][i];
				if (mmt.type == extention)	
					return mmt.file;
			}
		}
		
		return "unknown.png";
	} else {
		switch(extention) {
			
			case "Pictures"		: return "folder-pictures.png";
			case "Videos"		: return "folder-videos.png";
			case "Music"		: return "folder-music.png";
			case "Download"		: return "folder-download.png";
			case "Documents" 	: return "folder-documents.png";
			case "Public"		: return "folder-publicshare.png";
			case "Resume"		: return "folder-documents.png";
			default: return "folder.png";		
		}
	}
}

webTop.prototype.addItemToDesktop = function(file, path, is_folder) {
    var extention = file.split('.').pop();
  //  console.log(path + " :: " + file + ", " + extention);
    
    var div = document.createElement('div');
    var cap = document.createElement('p');
    var pic = document.createElement('div');
    
	div.file_attributes = new Object();
	div.file_attributes.path = path;
	div.file_attributes.file = file;
	div.file_attributes.is_folder = is_folder;
	
	
	
    div.appendChild(pic);
    div.appendChild(cap);
    div.style.textAlign				= "center";
    
    div.className 					= "desk-top-icons";
    div.style.position				= "absolute";
    div.style.padding        	    = "5px";
    div.style.margin    	        = "1em";
    div.style.display	            = "inline-block";
    div.style.color         	    = "white";
    div.style.width					= "144px";
    div.style.padding				= "4px";
    div.style.borderRadius 			= "3px";
	div.style.cursor				= "pointer";
	div.style.overflow				= "hidden";
	div.tabIndex					= -1;
	div.style.fontSize              = this.theme.fontSize;
    
    
    cap.innerHTML = file.replace(/\.[^/.]+$/, "");
    
    cap.style.wordWrap				= "break-word";
    cap.style.textAlign				= "center";
    cap.style.margin				= "2px";
    cap.style.textOverflow			= "ellipsis";
	cap.style.textShadow	        = "1px 1px black";
    
    var pic_src = this.getAssociatedIcon(extention, is_folder);

    pic.style.display 				= "inline-block";
    pic.style.backgroundImage 		= "url('../pics/48/"+pic_src+"')";
    pic.style.backgroundSize  		= "48px 48px";
    pic.style.backgroundRepeat		= "no-repeat";
    pic.style.backgroundPosition	= "center";
    pic.style.width			  		= "100%";
    pic.style.height		  		= "48px";
    
    this.webtop.appendChild(div);
    
    this.alignWebTopIcons();
    
    div.addEventListener('focusin', this.selectDesktopIcon.bind(this));
    
	div.addEventListener('dblclick', this.selectDesktopIcon.bind(this));
    div.addEventListener('touchstart', this.selectDesktopIcon.bind(this));
    
}

function getParent(elm, cls) {
	while (elm) {
		if(elm.className == cls)
			return elm;
		elm = elm.parentNode;
		
	}
	return elm;
}

webTop.prototype.selectDesktopIcon = function(e) {
	switch (e.type) {
		case 'focusin': {
						if (this.focusWTI) 
				this.focusWTI.style.backgroundColor = null;

			this.focusWTI = e.target;
			e.target.style.backgroundColor = this.shades[14];
		} break;
		case 'dblclick': {
			var par = getParent(e.target, "desk-top-icons");
			var fp = par.file_attributes.path + par.file_attributes.file;
			var extention = fp.split('.').pop();
			var frm = this.createWindow("Viewer ");
			
			this.fromSetContent(frm, fp, extention.toUpperCase());
		} break;
	};
}

webTop.prototype.alignWebTopIcons = function() {
	
    var dtis = document.getElementsByClassName('desk-top-icons');
    
    var x = 10,
		y = 10;
	
	var w = this.webtop.getBoundingClientRect();
	for(var i=0;i<dtis.length;i++) {
		var dts = dtis[i];
		var r = dts.getBoundingClientRect();

		if (y > w.height-60-r.height) {
			y=10;
			x+=160;
		}

		
		dts.style.left = x + "px";
		dts.style.top = y + "px";
		
		y+=(r.height + 8);
		
	}
    
    
}

webTop.prototype.qFiles = function() {
    web_top_q_server("GETFILES", qfx.bind(this), null);
    
    function qfx(result) {
        var p = JSON.parse(result);
        
		for(var i=0;i<p['dirs'].length;i++) {
            this.addItemToDesktop(p['dirs'][i], p['path'], true);
        }
        
		
        for(var i=0;i<p['files'].length;i++) {
            this.addItemToDesktop(p['files'][i], p['path'], false);
        }
		//console.log(p);
        
    }
}

webTop.prototype.qConfig = function() {
	web_top_q_server("GETFILECONTENTS?../../src/settings.conf", gsettings.bind(this), null);
	
	function gsettings(result) {
		var settings = JSON.parse(result);
		
		var cats = settings['categories'];
		
		for(var i=0;i<cats.length;i++) {
				if (cats[i].title == "Theme") {
					var props = cats[i];
					
					for(var p=0;p<props['properties'].length;p++) {
						
						switch (props['properties'][p].title) {
							case "Color":
								var RGB = props['properties'][p].value.split(' ');
										this.setTheme (RGB[0], RGB[1], RGB[2]);

								break;
							case "Wallpaper":
									this.theme.backgroundImage = "URL('"+props['properties'][p].value +"')";
								break;
							case "favicon":
                                {
                                    
                                    var head = document.getElementsByTagName('head').item(0);
                                     var link = document.createElement('link');

                                    link.setAttribute('rel', 'shortcut icon');
                                    link.setAttribute('type', 'image/x-icon');
                                    link.setAttribute('href', props['properties'][p].value);

                                    head.appendChild(link);
                                    
                                } 
                                break;
                            case "font size":
                                {
                                    document.body.style.fontSize = props['properties'][p].value;
                                    this.theme.fontSize = props['properties'][p].value;
                                }
                                break;
                            case "font family":
                                {
                                    document.body.style.fontFamily = props['properties'][p].value;
                                }
                                break;
						}
					}
					break;
				}
		}
		
		/*
		 *	alternative settings configuration implementation
		 * 
		 *	this.setTheme (
		 *	  settings['theme-colors']['red'],
		 *	  settings['theme-colors']['green'],
		 *	  settings['theme-colors']['blue'],
		 *	  settings['wallpaper']['file']);
		 *
		 *  this.theme.backgroundImage = "URL('"+settings['wallpaper']['file']+"')";
         * http://www.iconsdb.com/icons/download/black/desktop-16.ico
		*/
		
		web_top_q_server("GETMIMI", gmimi.bind(this), null);
	
		function gmimi(result) {
		
			this.configData = JSON.parse(result);

			this.create();

			this.qFiles();
			
		}
	
	}

	
	
}

webTop.prototype.popup = function(title) {
	var t_div = document.createElement('div');							// this will mask the stuff underneath
	t_div.style.position = "absolute";
	t_div.style.left = "0px";
	t_div.style.top = "0px";
	t_div.style.right = "0px";
	t_div.style.bottom = "0px";
	t_div.style.zIndex = "2000000";
	t_div.style.backgroundColor = "rgba(10, 10, 10, .15)";
	
	var frm = this.createWindow(title, 10, 10, t_div);
	frm.setCaption(title);
	t_div.appendChild(frm);
	document.body.appendChild(t_div);
	return frm;
}
webTop.prototype.centerForm = function(frm) {
		var f = frm.getBoundingClientRect();
		var w = this.webtop.getBoundingClientRect();
		frm.style.left = ((w.width - f.width)>>1)+ "px";
		frm.style.top = ((w.height - f.height)>>1)-40+ "px";

}

webTop.prototype.inputBox = function(title, controls, callback, sub_title) {
	var frm = this.popup((title==null)?"Input Box":title);

	frm.style.height = null;
	frm.style.padding = "28px 8px 8px 8px";
	

	var btn_bar = document.createElement('div');
	var b_cancel = document.createElement('button');
	var b_okay = document.createElement('button');
	var xoff = 0;
	
	btn_bar.style.textAlign = "center";
	
	b_okay.innerHTML = "Okay";
	b_cancel.innerHTML = "Cancel";
	
	b_cancel.style.fontSize = "1.25em";
	b_cancel.style.padding = "2px 8px";
	b_cancel.style.margin = "2px 4px";
	
	b_okay.style.fontSize = "1.25em";
	b_okay.style.padding = "2px 8px";
	b_okay.style.margin = "2px 4px";
	
	
	var div = document.createElement('div');
	
	div.style.backgroundColor = this.shades[28];
	div.style.padding = "8px";
	div.style.border = "1px solid " + this.shades[4];
	div.style.borderRadius = "4px";
	div.style.marginBottom = "8px";
	
	if (sub_title != null) {
		var xtitle = document.createElement('p');
		xtitle.style.margin = "0px 4px 6px 4px";
		xtitle.innerHTML = sub_title;
		xtitle.style.paddingBottom = "12px";
		xtitle.style.borderBottom = "1px solid " + this.shades[12];
		div.appendChild(xtitle);
		
	}
	
	
	var ctrls = controls.split('|');
	var pf = null;
	for(var i=0;i<ctrls.length;i++) {
		var ctrl = ctrls[i];
		var parts = ctrl.split(':');
		
		var c_div = document.createElement('div');
		
		var span = document.createElement('div');
		c_div.style.boxSizing = "border-box";
		c_div.style.padding = "4px";
		div.appendChild(c_div);
		c_div.appendChild(span);
		
		span.innerHTML = parts[0];
		span.style.width = "25%";
		span.style.display = "inline-block";
		if (parts.length == 1) {
			var input = document.createElement('input');
			input.className = "this_input";
			input.id = parts[0];
			input.type = "text";
			input.style.width = "75%";
			c_div.appendChild(input);
            if (pf == null) pf = input;
		} else {
			var input = document.createElement('select');
			input.className = "this_input";
			input.id = parts[0];
			var options = parts[1].split(',');
			for(var j=0;j<options.length;j++) {
				input.innerHTML+='<option>'+options[j]+'</option';
			}
			c_div.appendChild(input);
            if (pf == null) pf = input;
        }
	}
	
    
	
	b_cancel.addEventListener('click', function() { frm.close(); });
	b_okay.addEventListener('click', function() {
		if (callback) {
			var arr = div.getElementsByClassName("this_input");
			var result = [];
			for(var i = 0;i<arr.length;i++) {
				result[arr[i].id] = arr[i].value;
			}
			callback(result);
		}
			frm.close();
		
	});
	
	
	frm.addEventListener('keyup', function(){ 
			if (event.keyCode == 13) {
				b_okay.click();		
			} else if (event.keyCode == 27) {
				b_cancel.click();
			}
		});
	btn_bar.appendChild(b_okay);
	btn_bar.appendChild(b_cancel);
	frm.appendChild(div);
	frm.appendChild(btn_bar);
	this.centerForm(frm);
    if (pf) pf.focus();
}


webTop.prototype.messageBox = function(message, title, buttons, callback) {
	var frm = this.popup((title==null)?"Message Box":title);
	var div = document.createElement('div');
	var msg = document.createElement('p');
	if (buttons == null)
		buttons = "Ok";
	frm.style.height = null;
	frm.style.padding = "28px 8px 8px 8px";
	div.style.backgroundColor = this.shades[28];
	div.style.padding = "8px";
	div.style.border = "1px solid " + this.shades[4];
	div.style.borderRadius = "4px";
	div.appendChild(msg);
	msg.style.padding = "0px";
	msg.style.margin = "0px";
	frm.appendChild(div);
	msg.innerHTML = message;
	div.style.marginBottom = "8px";
	var b_focus = null;
	if (buttons != null) {
		var d_btns = document.createElement('div');
		d_btns.style.textAlign = "center";
		var btns = buttons.split('|');
		for(var i=0;i<btns.length;i++) {
			var btn = document.createElement('button');
			if (b_focus == null) b_focus = btn;
			btn.innerHTML = btns[i];
			btn.style.fontSize = "1.25em";
			btn.style.padding = "2px 8px";
			btn.style.margin = "2px 4px";
			d_btns.appendChild(btn);
			btn.addEventListener('click', function() {
				if (callback)
					callback(this.innerHTML);
				frm.close();
			});
		}
		frm.appendChild(d_btns);
	}
	this.centerForm(frm);
	if (b_focus != null) b_focus.focus();
	
}

function validateURL(s) {    
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);    
}
    
webTop.prototype.fromSetContent = function(frm, source, type) {
    if (frm) {
        var c = frm.children;
        
        for(var i=0;i<c.length;i++) {
            if (c[i].className == "CONTENT") 
                frm.removeChild(c[i]);
            
        }
            
        var div = document.createElement('div');
        var r = frm.form_data.titlebar.getBoundingClientRect();
        
        
        div.className = "CONTENT";
        
        div.style.position              = "absolute";
        div.style.left                  = "8px";
        div.style.top                   = r.height + 8 + "px";
        div.style.right                 = "8px";
        div.style.bottom                = "22px";
        div.style.border                = "1px solid black";
        div.style.boxSizing             = "border-box";
        
		div.style.backgroundColor = this.shades[25];
		
        frm.appendChild(div);
        
        
        if (validateURL(source)) {
            return; // not adding cross origin stuff
        }
        
        var filename = source.replace(/^.*[\\\/]/, '')
        		
        
        frm.setCaption(filename);
        switch (type) {
            case "PHP":
            source = source.replace('../', '');
             div.style.backgroundColor = "white";
             var iframe = document.createElement('IFRAME');
                iframe.src = source;
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.sandbox= "allow-same-origin allow-scripts allow-forms";
                div.appendChild(iframe);
               
                break;
            case "PDF": 
                source = source.replace('../', '');
                div.innerHTML = '<object data="' + source + '" type="application/pdf" width="100%" height="100%"><parm name="view" value="FitW/></object>';
                break;
            case "YOUTUBE": {
                source = source.replace('../', '');
				div.innerHTML = '<iframe width="100%" height="100%" src="'+source+'" frameborder="0" allowfullscreen></iframe>'
				frm.setCaption("YouTube");
				} break;
			
			case "Y-SHORT": {
                createYoutubeWidget(this, div, source);
				frm.setCaption("YouTube");
				} break;
            case "PNG":
			case "JPG":
			case "JPEG":
                source = source.replace('../', '');
				div.style.display = "table-cell";
				div.style.textAlign = "center";
				div.style.padding = "1em";
				div.style.verticalAlign = "middle";
				div.innerHTML = "<image src='" + source + "' style='max-width:100%;max-height:100%;'>";
            	break;
			
			case "NOTES":
				createConfigWidget(this, div, "../" + source);
				break;
			case "CONF":
                //source = source.replace('../', '');
				createFormWidget(this, div, source);
				break;
            case "JSON":
                createJSONEditWidget(this, div, source);
				break;
            default:
                if (type.indexOf('/') != -1) {
                    div.style.backgroundColor = "white";
                    var iframe = document.createElement('IFRAME');
                    iframe.src = "../src/php/fbrowser.php/?" + source;
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                    iframe.sandbox= "allow-same-origin allow-scripts allow-forms";
                    div.appendChild(iframe);
                    frm.setCaption(filename);
                }
                break;
           
        }
		
		
        
    }
}

webTop.prototype.openFile = function (url, title) {
            var fp = url;
			var extention = fp.split('.').pop();
			var frm = this.createWindow(title);
			
			this.fromSetContent(frm, fp, extention.toUpperCase());  
            frm.focus();  
}

webTop.prototype.q_start_menu = function(results) {
            var J = JSON.parse(results);
                    
        
               var wb = this.webbar.getBoundingClientRect();
               
               this.startMenu = document.createElement('div');
               
               this.startMenu.style.position = "absolute";
               this.startMenu.style.left = "0px";
               this.startMenu.style.bottom = wb.height + "px";
               this.startMenu.style.backgroundColor = "white";
               this.startMenu.style.backgroundColor = this.theme.window;
               this.startMenu.style.border = "1px solid " + this.shades[12];
               this.startMenu.style.padding = "8px 5px 5px 10px";
               this.startMenu.style.boxSizing = "border-box";
               this.startMenu.style.minWidth = "23em";
               this.startMenu.style.zIndex = "1000000";
               this.startMenu.tabIndex = -1;
               this.startMenu.style.overflowX = "auto";
               var d_list = document.createElement('div');
               var b_list = document.createElement('div');
               
               d_list.style.display = "inline-block";
               d_list.style.border = "1px solid " + this.shades[10];
               d_list.style.backgroundColor = this.shades[28];
               d_list.style.overflowY = "auto";
               d_list.style.width = "12em";
               b_list.style.minWidth = "10em";
               d_list.style.minHeight = "200px";
               d_list.style.marginRight = ".5em";
               
               b_list.style.display = "inline-block";
               b_list.style.width = "9.5em";
               b_list.style.minHeight = "200px";
               
               
               b_list.style.boxSizing = "border-box";
               d_list.style.boxSizing = "border-box";
               
               b_list.style.verticalAlign = "top";
               d_list.style.verticalAlign = "top";
               
               this.webtop.appendChild(this.startMenu);
               
               
               
               
               var btnFocus = null;
               this.startMenuFocus =function(e) {
                    this.startMenu.style.display = "none";
                    
                }
               
               this.startMenu.addEventListener('blur', this.startMenuFocus.bind(this));
               
              
               
               this.add_button = function(prop, src) {
                        var btn = document.createElement('div');
                        btn.innerHTML = prop;
                        btn.style.width = "100%";
                        btn.style.padding = "3px 4px 5px 8px";
                        btn.style.marginBottom = "3px";
                        
                        btn.style.boxSizing = "border-box";
                        btn.style.background = this.theme.appBarButtonColor2;
                        btn.style.border = "1px solid " + this.shades[14];
                        btn.style.borderRadius = "3px";
                        btn.style.cursor = "pointer";
                        btn.style.color = (src.length || src.length!=0)?this.shades[2]:this.shades[9];
                        btn.source_json = src;
                        btn.style.overflow = "hidden";
                        b_list.appendChild(btn);
                        
                        btn.addEventListener('click', this.cats_click.bind(this));
                        return btn;
                    }
                    
                this.populateStartMenu = function (e) {
                    var js = e.source_json; 
                    function remove_children(par) {
                        while (par.hasChildNodes()) {   
                            par.removeChild(par.firstChild);
                        }
                    }
                    
                    this.openit = function(e) {
                            this.openFile(e.target.source_json.url, e.target.source_json.title);
                    }
                    
                    if (btnFocus != null)
                        btnFocus.style.color = (btnFocus.source_json.length || btnFocus.source_json.length!=0)?this.shades[2]:this.shades[9];
                
                    remove_children(d_list);
                    for(var i=0;i<js.length;i++) {
                        if (js[i].title.length > 0) {
                            var pannel = document.createElement('div');
                            var title = document.createElement('div');
                            pannel.style.padding = "4px";
                            title.innerHTML = js[i].title;
                            pannel.style.cursor = "pointer";
                            pannel.appendChild(title);
                            d_list.appendChild(pannel);
                            
                            title.source_json = js[i];
                            
                            title.addEventListener('click', this.openit.bind(this));
                        }
                    }
                    e.style.color = this.shades[27];
                    btnFocus = e;
                }    
                
                this.cats_click = function (e) {
                    this.populateStartMenu(e.target);
                }
                    
                    if (J['image']) {
                        
                        var img = document.createElement('div');
                        
                        img.style.backgroundImage = "URL('" + J.image.url + "')";
                        img.style.backgroundSize = "100% 100%";
                        img.style.width = J.image.width;
                        img.style.height = J.image.height;
                        img.style.marginBottom = "8px";
                        
                        this.startMenu.appendChild(img);
                        var hr = document.createElement('hr');
                        this.startMenu.appendChild(hr);

                    }
                    this.startMenu.appendChild(d_list);
                    this.startMenu.appendChild(b_list);
                    
                    var favs = this.add_button("Webtop", J.favorites);
                    var hr = document.createElement('hr');
                    b_list.appendChild(hr);
                    var z = 0;
                    for(prop in J) {
                        if (z++>=2)
                            this.add_button(prop, J[prop]);
                    }
                    
                    this.populateStartMenu(favs);
                    var wb = b_list.getBoundingClientRect();
                    d_list.style.height = wb.height + "px";
                    
                    
               
               
               this.startMenu.focus();
}

webTop.prototype.killStartMenu = function() {
    if (this.startMenu != null) {
        this.startMenu.parentNode.removeChild(this.startMenu);
        this.startMenu = null;
    }
}
webTop.prototype.showStartMenu = function (e) {
        if (e.type == 'click') {
            if (this.startMenu == null) {
                web_top_q_server("GETFILECONTENTS?../startmenu.json", this.q_start_menu.bind(this), null);
                
           } else {
                if (this.startMenu.style.display != "none")
                    this.startMenu.style.display = "none";
                else {
                    this.startMenu.style.display = "block";
                    this.startMenu.focus();
                }
           }
           
           this.webbar
       }
}


function web_top_q_server(query, callback, data) {
        query = encodeURI(query);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "../src/php/file_req.php/"+query, true);
        
        var params = "";
        
        if (data != null) {
            params = (data);
           
        }
        
        
        xhr.onload = function() {
            if (callback != null)
                callback(this.responseText);
        };
        xhr.onerror = function() {
            console.log('error: ' + this.responseText);
			if (callback != null)
                callback("");
        };
        xhr.upload.onloadstart = function(event) {
        }

        xhr.send(params);
            
    }



/*
 xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(someStuff);
*/




var webTopInstance = new webTop;
