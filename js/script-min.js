const lib=["what the fuck?","No fucking way!","Horse pee hole!","To bullshit","Fucking-digging!","Holly Fuck!","That’s it, you’re fuckin' dead","Fuck off","Get the fuck away from me","All fucked-up","I’m sick of it all","Hard fucking dick","Pee hole dandruff","Don’t fuck my brain!"];function wtf(e){let t=1e4*Math.random(),o=randomInteger(0,13);console.log(lib[o]),setTimeout(wtf,t)}function randomInteger(e,t){var o=e-.5+Math.random()*(t-e+1);return o=Math.round(o)}wtf();