//let textHere = document.getElementById('textHere');
let usedSentences = []; // has sentences used previously
let currentIndex = 0;
let currentRound = 1;


let userInfo = {
    1: {},
    2: {},
    3: {},
};

document.addEventListener('keyup', (e) => {
    getKey(e);
});


const sentences = [
    "Mary had a little lamb",
    "Christina Blakely",
    "I like bananas"
    /*
    "Nice to meet you. Where you been? I could show you incredible things. Magic, madness, heaven, sin. Saw you there and I thought oh my god. Look at that face, you look like my next mistake. Love\'s a game, wanna play?",
    "Gotta keep my head held high. There's always gonna be another mountain. I'm always gonna wanna make it move. Always gonna be an uphill battle. Sometimes I'm gonna have to lose. Ain't about how fast I get there. Ain't about what's waiting on the other side. It's the climb.",
    "A thousand miles seems pretty far. But they've got planes and trains and cars. I'd walk to you if I had no other way. Our friends would all make fun of us. And we'll just laugh along because we know. That none of them have felt this way. Delilah, I can promise you. That by the time we get through. The world will never ever be the same. And you're to blame",
    "Backbeat, the word is on the street. That the fire in your heart is out. I'm sure you've heard it all before. But you never really had a doubt. I don't believe that anybody. Feels the way I do about you now. And all the roads we have to walk are winding. And all the lights that lead us there are blinding. There are many things that I would like to say to you but I don't know how",
    "Well, the plane landed and when I came out. There was a dude who looked like a cop standing there with my name out. I ain't trying to get arrested yet I just got here. I sprang with the quickness like lightning, disappeared. I whistled for a cab and when it came near The license plate said fresh and it had dice in the mirror, If anything I could say that this cab was rare. But I thought 'Nah, forget it' - 'Yo, home to Bel Air'"
    */
];


function getSentence(randomIndex) {
    let randomSen = sentences[randomIndex];
    usedSentences.push(sentences.splice(randomIndex, randomIndex + 1));
    
    return randomSen;
}
function getKey(e) {
    let keyPressed = `${e.key}`;
    const keysToIgnore = [
      "Shift",
      "Enter",
      "Tab",
      "CapsLock",
      "Control",
      "Alt",
      "Meta",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
      "ArrowRight",
      "`"
    ];
    if (keysToIgnore.includes(keyPressed)) {
        console.log('Ignore key');
    } else if (keyPressed == 'Backspace') {
        backspaceKey();
    } else if (e.keyCode == 32) {
        colorText(e.keyCode);
        //console.log('space');
    } else {
        colorText(keyPressed);
    }
}

function colorText(key) {
    let currentLetter = userInfo[currentRound].valArr.shift();
    if (key == 32) {
        userInfo[currentRound].lastWords.push(document.getElementById('inputField').value);
        userInfo[currentRound].lastKeys.push(' ');
        userInfo[currentRound].newStringArr.push(' ');
        document.getElementById('inputField').value = '';
    } else {
        let coloredLetter = isCorrect(key, currentLetter);

        userInfo[currentRound].lastKeys.push(key); 
        userInfo[currentRound].lenArr.push(coloredLetter.length);
        userInfo[currentRound].newStringArr.push(coloredLetter);
    }
    currentIndex++;
    insertNew(userInfo[currentRound].valArr);
}

function isCorrect(key, currentLetter) {
    if (key == currentLetter) {
        return '<span style="color: green">' + currentLetter + '</span>';
    } else {
        return'<span style="color: red">' + currentLetter + '</span>';
    }
}


function backspaceKey() {
    currentIndex--;

    let lastLetter = userInfo[currentRound].newStringArr.pop();
    userInfo[currentRound].lastKeys.pop();
    lastLetter = lastLetter.replace(/<\/?span[^>]*>/g, "");
    userInfo[currentRound].valArr.unshift(lastLetter);
    //console.log(lastLetter);


    
    insertNew(userInfo[currentRound].valArr);
}
  
function insertNew(valArr) {
    document.getElementById("mainP").innerHTML = userInfo[currentRound].newStringArr.join("") + valArr.join("");
    
    if (userInfo[currentRound].lastKeys.join('') == userInfo[currentRound].gameString) {
        console.log('cool');
        currentRound++;
        //document.getElementById('modalPopup').innerText = 'Well done! To Round 2...';
        hideElements([document.getElementById('inputField')]);
        showElements([document.getElementById('modalPopup')]);
        
    }
}

function hideElements(arr) {
    arr.forEach((elem) => {
        elem.setAttribute('class', 'hide');
    });
}
function showElements(arr) {
    arr.forEach((elem) => {
        elem.removeAttribute('class', 'hide');
    });
}


document.getElementById('startBtn').addEventListener('click', () => {
    userInfo[currentRound].gameString = getSentence(Math.floor(Math.random() * sentences.length));
    document.getElementById('mainP').innerHTML = userInfo[currentRound].gameString;
    userInfo[currentRound].valArr = userInfo[currentRound].gameString.split('');
    userInfo[currentRound].newStringArr = [];
    userInfo[currentRound].lenArr = [];
    userInfo[currentRound].lastKeys = [];
    userInfo[currentRound].lastWords = [];

    showElements([document.getElementById('inputField')]);
    hideElements([document.getElementById('startBtn')]);
});
