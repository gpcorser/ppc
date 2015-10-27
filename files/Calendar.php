<html>
    <head>
    </head>
    <body>
        <h1>About Webtop</h1>
        <p>
            Webtop is an alternative to standard web-pages, which tend to display content a series of long documents, which are navigated 
            to by selecting links, to get to the desired content. Webtop, attempts
            to mimic some of the features most users of a contemporary desktop is familiar with.  Webtop, uses floating windows instead
            to display and interact with content, instead of needing to link to several pages to get to the desired feature.
        </p>
        <hr>
        <h2>How To ... </h2>
        <p>A short description how to use, customize and develope the webtop framework.</p>
        <h4>Create a new webtop</h4>
        <p>
			The usage of the webtop, is strait forward, create the typical HTML script, including html,head and body.  Included is a simple
			CSS style, to disallow selecting of text, and a default font.  Add a script that references the webtop.js and wtWidgets.js source code.
			It is important that the webtop.js is include before the wtWidgets.js module. 
        </p>
        <p>
			Finally, create a <u>single</u> webtop object, thats it, to begin.
        </p>
	<div style="background: #E8F8FE; overflow:auto;width:auto;border:solid gray;border-width:1px;padding:.2em .6em;margin:0em 1em;">
		<pre style="margin: 0; line-height: 125%">
			
	<span style="color: #007700">&lt;html&gt;</span>

	<span style="color: #007700">&lt;head&gt;</span>
		<span style="color: #007700">&lt;title&gt;</span>Main Body<span style="color: #007700">&lt;/title&gt;</span>
		
		<span style="color: #007700">&lt;style&gt;</span>
			<span style="color: #007700">body</span> {
				<span style="color: #333333">-</span>webkit<span style="color: #333333">-</span>touch<span style="color: #333333">-</span>callout<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">none</span>;
				<span style="color: #333333">-</span>webkit<span style="color: #333333">-</span>user<span style="color: #333333">-</span>select<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">none</span>;
				<span style="color: #333333">-</span>khtml<span style="color: #333333">-</span>user<span style="color: #333333">-</span>select<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">none</span>;
				<span style="color: #333333">-</span>moz<span style="color: #333333">-</span>user<span style="color: #333333">-</span>select<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">none</span>;
				<span style="color: #333333">-</span>ms<span style="color: #333333">-</span>user<span style="color: #333333">-</span>select<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">none</span>;
				user<span style="color: #333333">-</span>select<span style="color: #333333">:</span> <span style="color: #008800; font-weight: bold">none</span>;
				<span style="color: #008800; font-weight: bold">font-family</span><span style="color: #333333">:</span>Verdana<span style="color: #333333">,</span> Geneva<span style="color: #333333">,</span> <span style="color: #008800; font-weight: bold">sans-serif</span>;
				<span style="color: #008800; font-weight: bold">overflow</span><span style="color: #333333">:</span><span style="color: #008800; font-weight: bold">hidden</span>;
			}
		<span style="color: #007700">&lt;/style&gt;</span>
	
	<span style="color: #007700">&lt;/head&gt;</span>

	<span style="color: #007700">&lt;body&gt;</span>
	
		<span style="color: #007700">&lt;script </span><span style="color: #0000CC">src=</span><span style="color: #FF8000">&quot;java/webtop.js&quot;</span><span style="color: #007700">&gt;&lt;/script&gt;</span>
		<span style="color: #007700">&lt;script </span><span style="color: #0000CC">src=</span><span style="color: #FF8000">&quot;java/wtWidgets.js&quot;</span><span style="color: #007700">&gt;&lt;/script&gt;</span>
		
		<span style="color: #007700">&lt;script&gt;</span>
			<span style="color: #008800; font-weight: bold">var</span> wt <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> webTop;
			
		<span style="color: #007700">&lt;/script&gt;</span>
	<span style="color: #007700">&lt;/body&gt;</span>

<span style="color: #007700">&lt;/html&gt;</span>
</pre>
</div>
		
		<p>
			Any customizations will occure within within the frame work, including configuration files which define the theme colors,
			wallpaper and a favicon.  Applications ie (custom built php or HTML) files will be where the user/developer will be able
			to add extra features.  When the php/html file is created, it can be added to the start-menu configuration file so it can
			be accessed through the menu, or a link can be placed in an eventual webtop (ie desktop) short cut.
		</p>
		
		<h4>
			The initial screen ...
		</h4>
		<div style="margin:1em;padding:1em;border:1px solid gray;display:inline-block;">
		<img src= "images/webtop_a.png"></img>
		</div>
		<h3>Features and how to implemnt them. </h3>
		<hr>
		<h4>
			The input box ...
		</h4>
		<div style="margin:1em;padding:1em;border:1px solid gray;display:inline-block;">
		<img src= "images/input_box.png"></img>
		<p>
			the input box, to be useful takes at least 3 parameters ...
		</p>
		<ul>
			<li>title</li> <p>the title of the popup window which will hold input controls (text or droplists)</p>
			<li>Controls</li><p>These controls will be delimited using the character <strong>|</strong>, and controles
			which are intended to be used as a drop list will inturn will contain a colon following the items in the list which <strong>:</strong>
			contain items delimited with a comma.</p>
			<p>
				First|Last|Class:CS-116,CS-216,CIS-255,CIS-355
			</p>
		</ul>
		<div style="background: #E8F8FE; overflow:auto;width:auto;border:solid gray;border-width:1px;padding:.2em .6em;margin:0em 1em;">
			
			<span>inputBox(</span>
		</div>
		</div>

		
    </body>

    

</html>
