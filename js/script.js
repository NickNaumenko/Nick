const lib = ["what the fuck?",
  "No fucking way!",
  "Horse pee hole!",
  "To bullshit",
  "Fucking-digging!",
  "Holly Fuck!",
  "That’s it, you’re fuckin' dead",
  "Fuck off",
  "Get the fuck away from me",
  "All fucked-up",
  "I’m sick of it all",
  "Hard fucking dick",
  "Pee hole dandruff",
  "Don’t fuck my brain!"
];

function wtf(a) {
    let time = Math.random() * 10000;
    let phrase = randomInteger(0, 13);
    console.log(lib[phrase]);

    setTimeout(wtf, time);
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

wtf();
