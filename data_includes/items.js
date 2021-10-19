//Preload images using Alex Drummond's Preloader controller.
//All bugs, errors, and stylistic faux pas can be attributed to Brandon Prickett.

//**************************************
// INITIALIZE VARIABLES AND FUNCTIONS
//***************************************

//Conditions:
var set = "b"; //a or b
var prop = "5"; //25, 375, or 5 (no decimals!)

//Other params:
var train_trials = 299; //Should be 299 in real exp.
var test_trials = 24; //Should be 24 in real exp.
var post_trials = 24; //Should be 24 in real exp.
var break_every = 50; //Should be 50 in real exp.
    
//Functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
   
//**************************************
// BUILD TRAINING TRIALS
//***************************************
//Visual stimuli      
var stim_dir = "https://people.umass.edu/bprickett/exceptionality/";     
var pics = [];
var all_pics = [];
for (var i = 1; i <= 24; i ++){
    this_pic = stim_dir.concat("train_").concat(set).concat("_").concat(i).concat(".png");
    pics.push(this_pic);
    all_pics.push(this_pic);
}

//Suffixes
if (prop == "25"){
     var suffixes = [
                       "fi",    "ku",   "fi",    "fi",
                       "fi",    "ku",    "fi",    "fi",
                       "fi",    "fi",    "ku",    "fi",
                       "ku",    "fi",    "ku",    "fi",
                       "fi",    "ku",    "fi",    "fi",
                       "fi",    "fi",    "fi",    "fi"
                   ];   
}
if (prop == "375"){
     var suffixes = [
                       "fi", "ku", "fi", "ku",
                       "fi", "ku", "fi", "ku",
                       "fi", "ku", "ku", "fi",
                       "ku", "fi", "ku", "fi",
                       "fi", "ku", "fi", "fi",
                       "fi", "fi", "fi", "fi"
                   ];   
}
if (prop == "5"){
    var suffixes = [
                       "fi", "ku", "ku", "ku",
                       "fi", "ku", "fi", "ku",
                       "fi", "ku", "ku", "ku",
                       "ku", "fi", "ku", "fi",
                       "fi", "ku", "ku", "fi",
                       "fi", "fi","fi", "fi"
                   ];  
}

//Stems
if (set == "a"){
    var words = [
                   "marel",    "lugat",    "krakle",    "dosid",
                   "drokra",   "fudki",    "pisfu",    "zakta",
                   "glakod",    "gragol",    "freglu",    "tazku",
                   "tikle",    "mafdi",    "gazal",    "blezan",
                   "trapla",    "flebon",    "brugan",    "vidfo",
                   "same",    "truvit",    "kisal",    "tutun"
                 ];
}
if (set == "b"){
    var suff_switch = {"ku":"fi", "fi":"ku"};
    var words = [
                   "trapla","dosid", "glakod", "marel",
                   "vidfo", "zakta", "same", "drokra",
                   "truvit", "pisfu", "gragol", "mafdi",
                   "krakle", "kisal", "tazku", "tutun",
                   "lugat", "brugan", "blezan", "fudki",
                   "freglu", "tikle", "gazal", "flebon"
                 ];
    
    //Switch ku and fi for set b!
    for (var s = 0; s < suffixes.length; s++){
           suffixes[s] = suff_switch[suffixes[s]];
    } 
}
console.log(suffixes);
//Audio stimuli
var stem_audios = [];
var plur_audios = [];
var all_audios = "";
for (var i = 1; i <= 24; i ++){
    this_sa = stim_dir.concat("train_").concat(set).concat(prop).concat("_stem_").concat(i).concat(".wav");
    this_pa = stim_dir.concat("train_").concat(set).concat(prop).concat("_plur_").concat(i).concat(".wav");
    stem_audios.push(this_sa);
    plur_audios.push(this_pa);

    all_audios = all_audios + "<audio style='display:none;' preload><source src='"+this_sa+"' type='audio/wav'></audio>" + "<audio style='display:none;' preload><source src='"+this_pa+"' type='audio/wav'></audio>";
}

//Create a randomly ordered list of tokens with the appropriate frequencies:
var freqs = [
               79,    40,    26,    20,
               16,    13,    11,    10,
               9,    8,   7,    7,
               6,    6,    5,    5,
               5,    4,    4,    4,
               4,   4,    3,    3
            ];
var tokens = [];
for (var i = 0; i < freqs.length; i++){
     for (var j = 0; j < freqs[i]; j++){
         tokens.push(words[i]+","+suffixes[i]+","+pics[i]+","+stem_audios[i]+","+plur_audios[i]); 
     }   
}
shuffle(tokens);    

//Arrays to build:
var train_names = [];
var train_items = [];
var total_breaks = Math.floor((train_trials+1)/break_every);
for (var trial_num = 0; trial_num < train_trials; trial_num++){ 
    [stem, suffix, picture, stem_audio, plur_audio] = tokens[trial_num].split(",");
    
    var pic_html = "<img src='".concat(picture).concat("'>");
    var stem_audio_html = "<audio autoplay><source src='".concat(stem_audio).concat("'>Error! Please contact researcher.</audio>");
    var plur_audio_html = "<audio autoplay><source src='".concat(plur_audio).concat("'>Error! Please contact researcher.</audio>");
    
    //Teach participants the stem:
    var stem_html = pic_html.concat("<br><br><table><tr><td colspan='3'>The word for the above picture is:</td></tr><tr><td></td><td style='text-align:center;'><h2 style='align:center;'>").concat(stem).concat("</h2></td><td></td></tr></table>").concat(stem_audio_html);
    train_items.push(["train_stem_"+trial_num, "my_Message", {html:stem_html, transfer:2000}]);
    train_names.push("train_stem_"+trial_num);
    
    //Ask participants the plural:
    var plural_pic = "<tr><td>".concat(pic_html).concat("</td><td>").concat(pic_html).concat("</td><td>").concat(pic_html).concat("</td></tr>");
    var plural_html = "<table>".concat(plural_pic).concat("<tr>").concat("<td colspan='3' style='text-align:center;'><br>What’s the word for the above picture?</td></tr><tr><td></td><td><br><input type='text' name='train_answer_"+trial_num+"' id='train_answer_box_"+trial_num+"' class='obligatory'></td><td></td></tr></table><script>document.getElementById('train_answer_box_"+trial_num+"').focus();</script>");
    train_items.push(
                      [
                          "train_plural_"+trial_num,
                           "my_Form",
                           {
                               html:plural_html,
                               continueOnReturn:true,
                               answer:stem.concat(suffix),
                               continueMessage: "Click here or press ENTER to continue..."
                            }
                        ]
                   );
    train_names.push("train_plural_"+trial_num);
                                                              
    
    
    //Give feedback:
    train_items.push([
                       "train_feedback"+trial_num, 
                       "my_Separator2", 
                       {
                           normalMessage:"<table>"+plural_pic+"<tr><td colspan='3' style='text-align:center;'><br><h1 style='display:inline;font-size:3em;'>✔</h1><h1 style='display:inline;'>"+stem+suffix+"</h1></td></tr></table>"+plur_audio_html, 
                           errorMessage:"<table>"+plural_pic+"<tr><td colspan='3' style='text-align:center;'><br><h1 style='display:inline;font-size:3em;'>✘</h1><h1 style='display:inline;'>"+stem+suffix+"</h1></td></tr></table>"+plur_audio_html, 
                           transfer:2000, 
                           ignoreFailure: false
                       }
    ]),
    train_names.push("train_feedback"+trial_num);
    
    if (((trial_num+1) % break_every == 0) && (trial_num+1 != train_trials)){               
        break_num = (trial_num+1)/break_every;
        train_items.push(["train_break_"+break_num, "my_Message", {html:"<h1>Optional Break</h1><p>Great work! You’re "+break_num+"/"+total_breaks+" of the way through the Language Learning Phase. Feel free to take a break now if you need one.</p><br><br><p><i>Press any key to continue.</i>", transfer:"keypress"}]);
        train_names.push("train_break_"+break_num);
    }
        
            
}


//**************************************
// BUILD TESTING TRIALS
//***************************************

//Visual stimuli         
var pics = [];
for (var i = 1; i <= 24; i ++){
    this_pic = stim_dir.concat("test_").concat(i).concat(".png");
    pics.push(this_pic);
    all_pics.push(this_pic);
}
shuffle(pics);

//Stems
if (set == "a"){
    var words = ["mubni",    "zezo",    "fetle",    "krotud",    "slozar",    "kidan",
                 "bogdi",    "bozpu",    "kekla",    "midad",    "fralol",    "brulen",
                 "redre",    "notma",    "bakra",    "krimid",    "patul",    "pliton",
                 "lodbi",    "latko",    "nipa",    "suzat",    "krilel",    "demun"];
}
if (set == "b"){
    var words = ["mubni",    "zezo",    "fetle",    "krotud",    "slozar",    "kidan",
                 "bogdi",    "bozpu",    "kekla",    "midad",    "fralol",    "brulen",
                 "redre",    "notma",    "bakra",    "krimid",    "patul",    "pliton",
                 "lodbi",    "latko",    "nipa",    "suzat",    "krilel",    "demun"];
}

//Audio stimuli
var stem_audios = [];
for (var i = 1; i <= 24; i ++){
    this_sa = stim_dir.concat("test_").concat(i).concat(".wav");
    stem_audios.push(this_sa);
    all_audios = all_audios + "<audio style='display:none;' preload><source src='"+this_sa+"' type='audio/wav'></audio>";
}

//Create a randomly ordered list of tokens with the appropriate frequencies:
var tokens = [];
for (var i = 0; i < words.length; i++){
     tokens.push(words[i]+","+pics[i]+","+stem_audios[i]);  
}
shuffle(tokens);    

//Arrays to build:
var test_names = [];
var test_items = [];
for (var trial_num = 0; trial_num < test_trials; trial_num++){
    [stem, picture, stem_audio] = tokens[trial_num].split(",");
    
    var pic_html = "<img src='".concat(picture).concat("'>");
    var stem_audio_html = "<audio autoplay><source src='".concat(stem_audio).concat("'>Error! Please contact researcher.</audio>");
    
    //Teach participants the stem:
    var stem_html = pic_html.concat("<br><br><table><tr><td colspan='3'>The word for the above picture is:</td></tr><tr><td></td><td style='text-align:center;'><h2 style='align:center;'>").concat(stem).concat("</h2></td><td></td></tr></table>").concat(stem_audio_html);
    test_items.push(["test_stem_"+trial_num, "my_Message", {html:stem_html, transfer:2000}]);
    test_names.push("test_stem_"+trial_num);
    
    //Ask participants the plural:
    var plural_pic = "<tr><td>".concat(pic_html).concat("</td><td>").concat(pic_html).concat("</td><td>").concat(pic_html).concat("</td></tr>");
    var plural_html = "<table>".concat(plural_pic).concat("<tr>").concat("<td colspan='3' style='text-align:center;'><br>What's the word for the above picture?</td></tr><tr><td></td><td><br><input type='text' name='test_answer_"+trial_num+"' id='test_answer_box_"+trial_num+"' class='obligatory'></td><td></td></tr></table><script>document.getElementById('test_answer_box_"+trial_num+"').focus();</script>");
    test_items.push(
                      [
                          "test_plural_"+trial_num,
                           "my_Form",
                           {
                               html:plural_html,
                               continueOnReturn:true,
                               answer:stem.concat(suffix),
                               continueMessage: "Click here or press ENTER to continue..."
                            }
                        ]
                   );
    test_names.push("test_plural_"+trial_num);               
}

//**********************
// BUILD POST-TEST TRIALS
//***********************
//Visual stimuli         
var pics = [];
for (var i = 1; i <= 24; i ++){
    this_pic = stim_dir.concat("train_").concat(set).concat("_").concat(i).concat(".png");
    pics.push(this_pic);
    all_pics.push(this_pic);
}

//Stems
if (set == "a"){
    var words = [
                   "marel",    "lugat",    "krakle",   "dosid",
                   "drokra",   "fudki",    "pisfu",    "zakta",
                   "glakod",   "gragol",   "freglu",   "tazku",
                   "tikle",    "mafdi",    "gazal",    "blezan",
                   "trapla",   "flebon",   "brugan",   "vidfo",
                   "same",     "truvit",   "kisal",    "tutun"
                 ];
}
if (set == "b"){
    var words = [
                   "trapla","dosid", "glakod", "marel",
                   "vidfo", "zakta", "same", "drokra",
                   "truvit", "pisfu", "gragol", "mafdi",
                   "krakle", "kisal", "tazku", "tutun",
                   "lugat", "brugan", "blezan", "fudki",
                   "freglu", "tikle", "gazal", "flebon"
                 ];
}

//Audio stimuli
var stem_audios = [];
var indeces = []
for (var i = 1; i <= 24; i ++){
    this_sa = stim_dir.concat("train_").concat(set).concat("_stem_").concat(i).concat(".wav");
    stem_audios.push(this_sa);
    indeces.push(i-1);
}

//Create a randomly ordered list of tokens with the appropriate frequencies:
var tokens = [];
for (var i = 0; i < words.length; i++){
    if (i < (words.length-1)){
        [wrong_choice, right_choice] = [pics[i+1], pics[i]];
    }
    else {
        [wrong_choice, right_choice] = [pics[0], pics[i]]; 
    }
    tokens.push(words[i]+","+right_choice+","+wrong_choice+","+stem_audios[i]);  
}
shuffle(tokens);    

//Arrays to build:
var post_names = [];
var post_items = [];
for (var trial_num = 0; trial_num < post_trials; trial_num++){
    [stem, right_pic, wrong_pic, stem_audio] = tokens[trial_num].split(",");
    
    //Save the actual stem by putting it in a div:
    var saved_info = "<div style='display:none'>"+stem+"</div>";
    
    //Randomize which size the right answer is on (0=left):
    answers = [1, 0];
    shuffle(answers)
    my_ans = answers[0]
        
    if (my_ans == 0){
        var pic_html = "<tr><td><img class='Question-fake-link' src='".concat(right_pic).concat("'></td><td><img src='").concat(wrong_pic).concat("'></td></tr>");
    }
    else {
        var pic_html = "<tr><td><img class='Question-fake-link' src='".concat(wrong_pic).concat("'></td><td><img src='").concat(right_pic).concat("'></td></tr>");
    }
        
    var stem_audio_html = "<audio autoplay><source src='".concat(stem_audio).concat("'>Error! Please contact researcher.</audio>");
    
    //Teach participants the stem:
    var question_html = saved_info.concat("<h2>").concat(stem).concat("</h2>").concat("<br><br><table><tr><td colspan='2' style='padding-left:10%;'><h4>The picture that corresponds to the above word is:</h4><br><br></td></tr>").concat(pic_html).concat("</table>").concat(stem_audio_html);
    post_items.push([
                      "post_quest_"+trial_num,
                      "Question",
                      {
                          q:question_html, 
                          randomOrder: false, 
                          as:["Left", "Right"], 
                          hasCorrect:my_ans,
                          presentHorizontally: true
                      }
    ]);
    post_names.push("post_quest_"+trial_num);              
}



//**********************
// BUILD ITEMS ARRAY
//***********************

//Pieces of the "intro" screen:
instruct = "<style>*.Message-continue-link {position: relative; left:200px;}</style><div style='padding:50px;'><h1>Welcome!</h1><p>In this experiment, you will be asked to learn aspects of an ‘alien’ language. The experiment should take about an hour, but before we start, there are some important pieces of information that we need to go over first:</p><ul>";
headphones = "<li>Please be sure to wear headphones while participating.</li><li>Do not take notes of any kind during the experiment.</li>";
contact = "<li>Feel free to contact the researchers at bprickett@umass.edu if you have any questions or concerns.</li>";
browser = "<li>And <strong>do not use Internet Explorer or Safari</strong>, as the experiment software will not work with these browsers. <span style='font-weight: bold;color:red;'>If you are using these browsers, you will not be compensated.</span> Please use another browser, such as: Google Chrome, Microsoft Edge, Firefox, or Opera.</li></ul>";
consent = "<input type='checkbox' id='consent' name='consent' class='obligatory'>I have read the <a href='https://people.umass.edu/bprickett/Consent_Exceptionality.pdf' target='_blank'>consent form</a> and agree to participate in this experiment.</div>";
      
//Start material..
var items = [
               [
                   "preload_img", 
                   "Preloader", 
                   {
                       images: all_pics, 
                       hideProgressBar: true
                   }
               ],
               [
                   "preload_audio",
                   "Message",
                   {
                       consentRequired: false,
                       html: "<div align='center'>Loading audio files...</div>"+all_audios,
                       transfer: 3000,
                       hideProgressBar: true
                   }
               ],
               [
                   "intro",
                   "Form",
                   {
                       html: instruct.concat(headphones).concat(contact).concat(browser).concat(consent),
                       consentRequired: true,
                       transfer: "click",
                       hideProgressBar: true
                   }
               ],
    
            [
                "compQ1",
                "Question",
                {
                    q:"Which browser should you <strong>not</strong> be using?",
                    hasCorrect:"Safari",
                    as:["Safari", "Firefox", "Chrome", "Edge"]
                }
            ], 
    
            [
                "comp_feedback", 
                "my_Separator", 
                {
                    normalMessage:"<img src='https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png'>", 
                    errorMessage:"<img src='https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png'>", 
                    transfer:1500, 
                    ignoreFailure: false
                }
            ],
                
               
            [
                   "headphone_check", 
                   "Form", 
                  {
                      consentRequired: false,
                       hideProgressBar: true,
                      html:"<b>What kind of headphones are you using? (Please give the brand and model number if available)</b><br><br>"+'<textarea rows="3" cols="60" name="headphones" class="obligatory"></textarea><br><br>'
                  }
             ],
    
             [
                   "Instr1",
                   "Message",
                   {html:  
                          "<h1>The Structure of the Experiment</h1>"
                          +"<p>The experiment has three phases:</p>"
                          +"<ul><li><strong>Language Learning:</strong> this phase will be the longest and will teach you how to express the plural in the alien language. Feedback will be given throughout this phase.</li>"
                          +"<li><strong>Testing:</strong> this phase will test what you learned and feedback will no longer be given.</li>"
                          +"<li><strong>Post-Test:</strong> this phase will see how well you remember some aspects of the Language Learning Phase after you’re done being tested.</li></ul>"
                          +"<p>The entire experiment should take about an hour, with most of that time being spent on the Language Learning Phase. The progress bar above will show you how far along you are throughout.</p>"
                    }
            ],
    
            [
                "compQ2", 
                "Question", 
                {
                    q:"What will you learn to express in the alien language?",
                    hasCorrect:"The Plural", 
                    as:["The Plural", "The Past Tense", "The Possessive"]
                }
            ],

             [
                   "Instr2",
                   "Message",
                   {html:  
                          "<h1>Language Learning Phase Start</h1>"
                          +"<p>Now you’ll learn how to express the plural in an alien language:</p>"
                          +"<ul><li>Each trial will show you a picture of an item and present you with the word for that item in the alien language (via a written form and an audio file).</li>"
                          +"<li>Then you’ll see an image that depicts three of them. You’ll be asked to <strong>type the plural and then click or press ENTER</strong> to continue.</li>"
                          +"<li>Next you’ll see the correct answer and whether you were right (✔) or wrong (✘).</li></ul>"
                          +"<p>You’ll have to guess at first, but eventually you’ll start to learn how to correctly pluralize each word.</p>"
                    }
            ],
    
             [
                   "Instr3",
                   "Message",
                   {html:  
                          "<h1>Making the Plural</h1>"
                          +"<p>In this language, the plural is made by adding either ‘ku’ or ‘fi’ to the end of the word. You’ll have to guess at first, but eventually you’ll learn which ending to add.</p>"
                    }
            ],
    
            [
                "compQ3",
                "Question",
                {
                    q:"What are the two suffixes in the language?",
                    hasCorrect:"‘ku’ and ‘fi’",
                    as:["‘ku’ and ‘fi’", "‘du’ and ‘gi’", "‘koy’ and ‘fe’"]
                }
            ]
    ];
    
//Training...
items = items.concat(train_items);

//Testing...
items.push(             [
                   "Instr4",
                   "Message",
                   {html:  
                          "<h1>Testing Phase Start</h1>"
                          +"<p>Now, you’ll be tested on what you learned:</p>"
                          +"<ul><li>Just like before, you will type in the plural for the item you see.</li>"
                          +"<li>But you will no longer be told the correct answer or whether you were right or wrong.</li></ul>"
                          +"<p>Sometimes, you might not be sure, but do your best to type in whatever seems <i>most right</i>.</p>"
                    }
            ],);
items = items.concat(test_items);

//Post test...
items.push(             [
                   "Instr5",
                   "Message",
                   {html:  
                          "<h1>Post-Test Phase Start</h1>"
                          +"<p>Almost done! In this last phase, you’ll be tested on whether you remember the meanings of the words you learned:</p>"
                          +"<ul><li>Each trial will show you a word from the alien language (via a written form and an audio file).</li>"
                          +"<li>Then you’ll need to choose between two images: one for the correct meaning and one for an incorrect meaning.</li>"
                          +"<li>You will not be told the correct answer.</li></ul>"
                    }
            ],);
items = items.concat(post_items);
    
//Ending material:
items = items.concat([    
               [
                   "survey",
                   "Form",
                   {
                       consentRequired: false,
                       html:"<h2>Please answer the following questions about yourself:</h2><p><i>None of your answers here will impact your compensation and you can skip anything you feel uncomfortable providing us with.</i></p>"+
                              "<div>"+
                                "<b>A) What is your year of birth? (Please answer with a four-digit year, like '1992')</b><br><br>"+
                                  '<textarea rows="1" cols="4" name="age"></textarea><br><br>'+
                                "<b>B) What is your gender?</b><br>"+
                                  '<input type="radio" name="gender" value="W"> Woman<br>'+
                                  '<input type="radio" name="gender" value="M"> Man<br>'+
                                  '<input type="radio" name="gender" value="N"> Nonbinary<br>'+
                                  '<input type="radio" name="gender" value="O"> Other<br>'+
                                  '<input type="radio" name="gender" value="P"> Prefer not to Say<br><br><br>'+
                                "<b>C) Please describe your prior language experience (for example, do you speak any languages other than English?):</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="prior_ling_exp"></textarea><br><br>'+
                              "</div>"+
                            "<h2>Please also answer the following questions about your experience:</h2>"+
                              "<div>"+
                                "<b>1) How did you approach the language learning trials? Please choose all that apply.</b><br>"+
                                  '<input type="checkbox" name="train_approach" value="intuition_gut"> Went by intuition or gut feeling.<br>'+
                                  '<input type="checkbox" name="train_approach" value="memorize"> Tried to memorize the words.<br>'+
                                  '<input type="checkbox" name="train_approach" value="rule_pattern"> Tried to find a rule or pattern.<br>'+
                                  '<input type="checkbox" name="train_approach" value="notes"> Took notes<br>'+
                                "<br><b>2) If you looked for a rule, what rule(s) did you try?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="train_description"></textarea><br><br>'+
                                "<br><b>3) How did you approach the test trials? Please choose all that apply:</b><br>"+
                                  '<input type="checkbox" name="test_approach" value="similarity"> Went with by intuition or gut feeling.<br>'+
                                  '<input type="checkbox" name="test_approach" value="difference"> Following an explicit rule or pattern.<br>'+
                                  '<input type="checkbox" name="test_approach" value="rule_pattern"> Chose at random.<br>'+
                                "<br><b>4) If you used any rules discovered while learning, what were they?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="test_description"></textarea><br><br>'+
                                "<br><b>5) What percent of test trials do you think you got right?</b><br><br>"+
                                  '<textarea rows="1" cols="3" name="test_percentage"></textarea><br><br>'+
                                "<br><b>6) Did you have an “Aha!” moment, where you suddenly realized what the pattern was?</b><br>"+
                                  '<input type="radio" name="aha_yesNo" value="1"> Yes<br>'+
                                  '<input type="radio" name="aha_yesNo" value="0"> No<br>'+
                                "<br><b>7) If so, please describe the “Aha!” moment. When did it happen? What exactly did you suddenly realize?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="aha_description"></textarea><br><br>'+
                                "<br><b>8) If you have any other questions or comments please type those here:</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="Qs_Meaning"></textarea><br><br>'+
                              "</div>"+
                              "<h2>Now please enter your Prolific ID:</h2>"+
                              "<div><textarea rows='1' cols='50' name='prolific_id' class='obligatory'></textarea><br><br></div>",
                       hideProgressBar: true
                   }
               ],
               ["sr", "__SendResults__", {hideProgressBar: true }],
               [
                   "end",
                   "Message",
                   {
                       transfer: 15000,
                       html: "<div><p>All done! To receive compensation, click <a href='https://app.prolific.co/submissions/complete?cc=263F7CE3'>here</a>.</p></div>",
                       hideProgressBar: true
                   }
               ]
          ]);


//*************************
// DEFINE OTHER VARIABLES
//*************************

//Define sequence of experiment; preload must be first
var all_trials = [
                    "preload_img", "preload_audio", "intro", "compQ1", "comp_feedback", "heaadphone_check",  "Instr1", "compQ2",  "comp_feedback", "Instr2", "Instr3", "compQ3", "comp_feedback"
                   ];

all_trials = all_trials.concat(train_names);
all_trials.push("Instr4");
all_trials = all_trials.concat(test_names);
all_trials.push("Instr5");
all_trials = all_trials.concat(post_names);
all_trials = all_trials.concat(["survey", "sr", "end"]);
                         
//Send all of this info to the Ibex scripts that actually make the webpage:
var shuffleSequence = seq(...all_trials);
var showProgressBar = true;
progressBarText = "";
var manualSendResults = true;

    
//Set some defaults:
var defaults = [
    "my_Separator2", {
        transfer: 2500,
        normalMessage: "Press any key to continue.",
        errorMessage: "Error! Please contact experimenter.",
        ignoreFailure: true
    },
    "my_Form", {
                 countsForProgressBar: true
               },
    "Message", {
                 countsForProgressBar: true
               }
];

