/* This controller is designed to run AcceptabilityJudgment tasks with comics.*/

define_ibex_controller({
name: "ComicCaption",

jqueryWidget: {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        var face = this.options.face;
        if (true){// face == "human"){
         //face_html = "<img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_neutral.png'>";
         //If you want faces in the comic caption pages, uncomment the stuff above and comment out the stuff below:
         face_html = "";
        }
        else {
         face_html = "<img src='http://people.umass.edu/bprickett/Opacity_Denial/alien_face_neutral.png'>";   
        }
        
        var meaning = this.options.mean;
        var partial_html1 = "<td><img id='my_img1' style='display:block;' class=\"".concat(this.cssPrefix+"img").concat("\" src=\"").concat(this.options.html).concat("\"></td>");//Build full html object from the url provided in items
        var arrow_src = "https://people.umass.edu/bprickett/Opacity_Denial/arrow.png";
        var fullhtml1 = "<b>Error! Please contact researcher at bprickett@umass.edu.</b>";
        if (meaning == "L"){
            fullhtml1 = "<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td>".concat(face_html).concat("</td><td><img style='width:100px;height:100px;' src='").concat(arrow_src).concat("'></td>").concat(partial_html1).concat("<td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>");
        }
        if (meaning == "R"){
            fullhtml1 = "<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td>".concat(face_html).concat("</td><td></td>").concat(partial_html1).concat("<td><img style='width:100px;height:100px;' src='").concat(arrow_src).concat("'></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>");
        }
        if (meaning == "B"){
            fullhtml1 = "<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td>".concat(face_html).concat("</td><td></td>").concat(partial_html1).concat("<td></td></tr><tr><td></td><td></td><td><img style='width:100px;height:100px;' src='").concat(arrow_src).concat("'></td><td></td></tr></table>");
        }
        if (meaning == "T"){
            fullhtml1 = "<table align='center'><tr><td></td><td></td><td><img style='width:100px;height:100px;' src='".concat(arrow_src).concat("'></td><td></td></tr><tr><td>").concat(face_html).concat("</td><td></td>").concat(partial_html1).concat("<td></td></tr><tr><td></td><td></td><td></td></tr></table>");
        }
        if (meaning == "F"){
            fullhtml1 = 
              "<table align='center'><tr><td>".concat(face_html).concat("</td><td></td><td>").concat("<div style='border:0; position:relative;'><img id='stim' style='border:0; position:relative; top: 10px; left: 10px; z-index: 1;' src='").concat(this.options.html).concat("'><img id='arrow' style='border:0; position:absolute; top: 50px; left: 50px; z-index: 2;width:100px;height:100px;' src='").concat(arrow_src).concat("'></div>").concat("</td></tr></table>");  
        }
        if (meaning == "Practice"){
            fullhtml1 = "<table align='center'><tr><td></td><td></td><td></td></tr><tr><td></td>".concat(partial_html1).concat("<td></td>").concat(partial_html1).concat("<tr><td></td><td></td><td></td></tr></table>"); 
        }
        //console.log(fullhtml); //Make sure url is correct
        var opts = {
            options:     this.options,
            triggers:    [2],
            children:    [
                        "Message", 
                            {html : fullhtml1,
                            transfer: null,
                            consentRequired: false,
                            cssPrefix: "ComicCaption"+this.options.cssPrefix,},
                        "FlashSentence",
                            {s: this.options.s,
                            timeout: null,
                            audio: this.options.audio,
                            audioMessage: this.options.audioMessage,
                            audioTrigger: this.options.audioTrigger},
                        "Question", 
                            {q:                   this.options.q,
                            as:                  this.options.as,
                            hasCorrect:          dget(this.options, "hasCorrect", false),
                            presentAsScale:      this.options.presentAsScale,
                            presentHorizontally: this.options.presentHorizontally,
                            autoFirstChar:       typeof(this.options.autoFirstChar) == "undefined" ? this.options.presentAsScale : this.options.autoFirstChar,
                            randomOrder:         this.options.randomOrder,
                            showNumbers:         this.options.showNumbers,
                            timeout:             this.options.timeout,
                            instructions:        this.options.instructions,
                            leftComment:         this.options.leftComment,
                            rightComment:        this.options.rightComment,
                            }
                            ]};
        this.element.VBox(opts);
    }
},

properties: {
    obligatory: ["s", "as", "q", "html"],
    htmlDescription:
        function (opts) {
            var m = ibex_controller_get_property("Message", "htmlDescription")(opts);
            var s = ibex_controller_get_property("FlashSentence", "htmlDescription")(opts);
            var q = ibex_controller_get_property("Question", "htmlDescription")(opts);
            var p =
                $(document.createElement("div"))
                .append(("M: ").append($(m)))
                .append($("<p>").append("Q: ").append($(q)))
                .append("").append($("<b>").text("S:"))
                .append($(s));
             return p;
        }}
});