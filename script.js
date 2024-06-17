window.onload = function (){

    var textHolder = "While reading this text, and as each word passes, your precious time ticks away. Each second you spend reading these lines, you're not just passing time, you're trading a moment of your life for words that loop endlessly. Words that serve no purpose but to remind you how every moment spent here is a moment you'll never recover. As you continue to read, ask yourself what you could be doing instead. Could it be something inspiring? Something productive, or joyous? Yet, here you remain, eyes gliding over each meaningless word, each sentence crafted to lead you right back to the start, ensuring you're well aware that this is time you will never get back. The irony, of course, is that by reading about how you're wasting time, you're embodying the very essence of wasting time. And still, the seconds turn to minutes. How many have passed already? Too many, just to read about the irretrievable nature of spent time. This loop of text is a mirror, reflecting not just a message, but a choice. Every loop you read through, every round of these words, is another tick of the clock, another piece of your life spent. So here you are, still reading, still wasting, as each word, each phrase pulls you deeper into the realization that life is short, and you're spending yours here, reading about how short life truly is.";
    var firstInterac = document.getElementById("gif");
    var loopingText = document.getElementById("looping-text");
    var dramAudio = document.getElementById("audio-drama");
    var happAudio = document.getElementById("audio-happy");
    var stopBtn = document.getElementById("stop");

    function playMusic(){
        dramAudio.play();
    }

    firstInterac.onclick = playMusic;

    var apiKey = "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";
    var url = "https://api-inference.huggingface.co/models/gpt2";




    function fetchGeneratedMessage() {
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: "Generate me a message about wasting precious time in life to make a user read and keep him engaged on the website."
            })
        })
        .then(function(response) {
            if (response.ok) {
                const result = response.json();
                console.log(result);
                return result;

            } else {
                loopingText.innerHTML = "API is unavailable";
                throw new Error('API request failed: ' + response.statusText);
            }
        })
        .then(function(data) {
            // Ensure correct data parsing
            if (data && data.length > 0 && data[0].generated_text) {
                var i = 0;
                var speed = 60;
                // textHolder = data[0].generated_text;
                function typeText(){
                    if (i < textHolder.length){
                        loopingText.innerHTML = textHolder.substring(0, i) + '<span class="cursor">|</span>';
                        i++;
                        setTimeout(typeText, speed);
                    } else {
                        if(loopingText.innerHTML!=="Good choice!"){
                            setTimeout(function() {
                                i = 0;
                                loopingText.innerHTML = textHolder;
                                typeText();
                            }, speed);
                        }
                        
                    }
                } //end of typing animation
            
                typeText(); 

            } else {
                throw new Error('Unexpected response format');

            }
            
        })

    } //end of API fetching function

    fetchGeneratedMessage();

    function pauseAudio(){
        dramAudio.pause();
        dramAudio.currentTime = 0;
        happAudio.play();
        stopBtn.style.display = "none";
        document.getElementById("flex-container").style.display = "none";
        document.getElementById("clapping").style.display = "block";
        textHolder = "Good choice!"
        loopingText.innerHTML = textHolder;
    }//end of pausing audio file

    stopBtn.onclick = pauseAudio;


    //timer
    var seconds = 0;
    var displayH = document.getElementById("hours");
    var displayMin = document.getElementById("minutes");
    var displaySec = document.getElementById("seconds");
    var timerInterval;

    function updateTimer() {
        seconds++;
        var hrs = Math.floor(seconds / 3600);
        var mins = Math.floor((seconds % 3600) / 60);
        var secs = seconds % 60;

        displayH.innerHTML = "<strong>" + addZeros(hrs) + ":</strong>";
        displayMin.innerHTML = "<strong>" + addZeros(mins) + ":</strong>";
        displaySec.innerHTML = "<strong>" + addZeros(secs) +"</strong>";

        if(secs > 0) {
            displaySec.style.color = "crimson";
        } else if(mins > 0){
            displayMin.style.color = "crimson";
        } else if( hrs > 0){
            displayH.style.color = "crimson";
        }

        function addZeros(z){
            if (z < 10) {z = "0" + z};
            return z;
        }

    } //end of timer function

    timerInterval = setInterval(updateTimer, 1000);


} //end of onload function