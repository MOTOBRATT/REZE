/* ABOUT: an editorial portrait of the character. Text only (no frames, no scroll animation).
   Four blocks, each with its own layout and colour: 01 WHO IS REZE? / 02 TWO SIDES / 03 PERSONALITY / 04 CHARACTER ANALYSIS.
   Edit the words right here; the layout is in css/pages/about.css (.ab1 ... .ab4). */
(() => {
  // 01: fact sheet [label, value]
  const SHEET = [
    ['Is', 'A hybrid of a human and the Bomb Devil'],
    ['Serves', 'The Soviet Union, as an agent'],
    ['Cover', 'Waitress at the Double Deker café'],
    ['Trigger', 'A pin on her choker'],
    ['Target', 'The Chainsaw Devil’s heart']
  ];

  // 03: four traits [title, text]
  const TRAITS = [
    ['WARM ON PURPOSE', 'Her playful warmth helps her get close to Denji. Yet her sympathy for him becomes genuine, and she considers leaving her mission behind to run away with him.'],
    ['PATIENT', 'She works at the café, waits, watches, takes her time with Denji. The plan runs on schedule because she can afford to let it breathe.'],
    ['PRECISE', 'In a fight there are no wasted movements: a pin, a palm, a blast placed exactly. She was built for this and never looks surprised by it.'],
    ['UNFINISHED', 'She was raised to be a weapon and never quite stopped being a person. The two never settle their argument; it simply runs out of time.']
  ];

  // 04: rows of the analysis [title, text]
  const ROWS = [
    ['Motives', 'On paper: the heart of the Chainsaw Devil, for the Soviet Union. In practice: a few days of ordinary life she has never had. The arc is built on the distance between those two answers, and in the end she chooses to run with Denji. That choice is hers alone.'],
    ['Contradictions', 'She lies in the first scene and means the second. She approaches Denji under false pretences, but her feelings are not entirely an act. She empathizes with him because they share the experience of never having attended school.'],
    ['Relationships', 'With Denji: her target, whom she comes to empathize with and considers escaping with. With Makima: someone who sees through her at once and decides her fate. With the Soviet Union: the state that trained her and sent her on the mission.'],
    ['Why she matters', 'She turns a story about fighting into a story about wanting, and then takes it away. From that point on, Denji’s idea of an ordinary life is measured against her.']
  ];

  const sheet = SHEET.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
  const traits = TRAITS.map(([title, text]) => `<div class="t"><b>${title}</b><p>${text}</p></div>`).join('');
  const rows = ROWS.map(([title, text]) => `<div class="rw"><h3>${title}</h3><p>${text}</p></div>`).join('');

  REZE.pages.about = {
    html: () => `<article class="ab">
<header class="hd"><h1>ABOUT</h1></header>

<section class="ab1">
 <header><span class="no">01</span><h2>WHO IS REZE?</h2></header>
 <p class="lead">A girl in a phone booth, in the rain, who smiles as if she already knows you. For a few days she seems to offer him the ordinary kindness he has never known. But she has approached him with a mission: to take the Chainsaw Devil’s heart.</p>
 <p class="txt">Reze is the Bomb Devil in a human body: a hybrid, trained and sent into Japan for one thing, the heart of the Chainsaw Devil. In the Reze Arc she is the first person who seems to want nothing from Denji, and the one who takes the most from him.</p>
 <p class="txt">Among the cast she stands apart. She is not a Public Safety hunter, and not a devil with an appetite. She is a soldier who learned to look like the girl next door.</p>
 <dl>${sheet}</dl>
</section>

<section class="ab2">
 <header><span class="no">02</span><h2>TWO SIDES</h2></header>
 <div class="sp">
  <div class="sd a"><span class="kk">WHAT SHE SHOWS</span><h3>The girl from the café</h3>
   <p>Easy to talk to, quick to laugh, unafraid to touch a shoulder or take a hand. She reads Denji’s loneliness in minutes and offers exactly what he has never been given: shelter, attention, a plan for the two of them.</p>
   <ul><li>A smile before the first question</li><li>A hand on his arm</li><li>An invitation to run away together</li></ul></div>
  <div class="sd b"><span class="kk">WHAT SHE IS</span><h3>The Bomb Devil</h3>
   <p>A trained agent with a mission and a deadline. She studies rooms, exits and habits, and chooses her moment. When the pin comes out she does not hesitate: the choker, the blast, a fight that flattens a block.</p>
   <ul><li>A mission she carries out with patience</li><li>A pin at her throat</li><li>A mission that was never hers to drop</li></ul></div>
 </div>
 <div class="both"><b>Both are real.</b><p>The story never reduces one side to a disguise for the other. The warmth is a method and also a wish. The bomb is a weapon and also the only thing she was ever allowed to be.</p></div>
</section>

<section class="ab3">
 <header><span class="no">03</span><h2>PERSONALITY</h2></header>
 <div class="tr">${traits}</div>
</section>

<section class="ab4"><div class="in">
 <header><span class="no">04</span><h2>CHARACTER<br>ANALYSIS</h2></header>
 <blockquote>Reze is not a villain who falls in love. She is an agent who discovers, too late, that she wanted something of her own.</blockquote>
 ${rows}
</div></section>
</article>`
  };
})();
