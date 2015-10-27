<?php

// immediately redirect without showing this login screen
header('Location: src/main.php');
exit;

    if (isset($_POST['login'])) {
        $user = $_POST['user'];
		$pass = $_POST['password'];

		$link = mysqli_connect('localhost', $user, $pass, $user);
        if (!mysqli_connect_errno()) {
			$link->close();
            header('Location: src/main.php');
            exit;
        }
    }

?>
<html>

    <head>
    
        <title>WebTop</title>
    
        <style>
            
            body {
                font-family:Verdana, Geneva, sans-serif
            }
            
            .main_block {
                width: 522;
                height: 756;
                border: 1px solid #888;
                margin: 36px auto;
                box-shadow: 5px 5px 10px #666;
                padding: 18px 18px 18px 74px;
            }
            .vertical_line {
                position: absolute;
                border-right: 1px solid #f00;
                left: 72px;
               
            }
            
            hr {
                position:absolute;
                border: 1px solid #b7dae6;
            }
            
            h1 { 
                margin: 3px;   
            }
            
            p {
                position:absolute;
                font-family: "Comic Sans MS", cursive, sans-serif;
                font-size: 20px;
                padding: 0px;
                margin: 0px;
                text-align: justify;
                line-height: 30px;
            }
            
            #login {
                position: absolute;
                border:1px solid #666;
                padding: 24px;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 3px 3px 6px #555;
                
            }
            
            .label {
                min-width: 144px;
                display:inline-block;
                margin-bottom: 1em;
                
            }
            
            .input_box {
                font-size: 20px;
                width: 270px;
                border: none;
                border-bottom: 1px solid #888;
                outline: none;
                outline-bottom: 1px solid #93c8d9;
            }
            
            .button {
                font-size: 20px;
                float: right;
                min-width: 96px;
                margin-top: 18px;
            }
        </style>
    
    </head>

    <body>
    
        <div id="main" class="main_block">
            <div id="vl" class="vertical_line"> </div>
            <H1 style="text-align:right;">WebTop</H1>
            <p>Webtop is an alternative to traditional webpages it attempts to mimic some of the functionality of a typical destktop environment.</p>
            <p>The user must be logged in to continue.</p>
            <div id="login">
                <h2 style="margin:0px;padding:4px;text-align:center;background-color:#538899;color:white;margin-bottom:.5em;">Login</h2>
                <form action="index.php" method="POST" autocomplete="off">
                    <div class="label">User ID:</div><input class="input_box" name="user" autofocus value="jfnickly">
                    <div class="label">Password ID:</div><input class="input_box" type="password" name="password" value="104149">
                    <input class="button" style="margin-right:18px" type="submit" name="login" value="login">
                </form>
            </div>
        </div>
        
        <script>
            
            function addBars() {
                for(var i=0;i<24;i++) {
                    var h = document.createElement("hr");
                    main.appendChild(h);
                }
            }
            
            function setPositions()  {
                var r = main.getBoundingClientRect();
                
                vl.style.left = r.left + 72 + "px";
                vl.style.top = r.top + "px";
                vl.style.height = r.height + "px";
                
                
                var y = r.top + 84;
                var h = document.getElementsByTagName("HR");
                
                for(var i=0;i<h.length;i++) {
                    
                    h[i].style.top = y + "px";
                    h[i].style.left = r.left + 4 + "px";
                    h[i].style.width = r.width - 8 + "px";
                    y+=30;
                    
                }
                
                y = r.top + 84;
                var p = document.getElementsByTagName("P");
                
                for(var i=0;i<p.length;i++) {
                    p[i].style.top = y + 8 + "px";
                    p[i].style.width = r.width - 108 + "px";
                    p[i].style.left = r.left + 80 + "px";
                    var k = p[i].getBoundingClientRect();
                    y+=k.height+30;
                }
                
                login.style.left = r.left + 102 + "px";
                login.style.width = r.width - 186 + "px";
                login.style.top = r.bottom - 410 + "px";
            }
            
            addBars();
            setPositions();
            
            window.addEventListener("resize", function() { setPositions(); });
            
            
        </script>
    
    </body>


</html>
