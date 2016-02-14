const assert = require('assert');

const Tone = window.Tone = require('Tone');

const $play = document.getElementById('js-play');
const $stop = document.getElementById('js-stop');
const $freq = document.getElementById('js-freq');
const $depth = document.getElementById('js-depth');
const $pitch = document.getElementById('js-pitch');

const reverb = new Tone.JCReverb(0.6).connect(Tone.Master);
const delay = new Tone.FeedbackDelay(0.1);
const filter = new Tone.AutoFilter({
  frequency: $freq.value,
  depth: $depth.value
}).toMaster().start();

const osc1 = new Tone.OmniOscillator({
  volume: -Infinity,
  type: 'sawtooth16',
  frequency: $pitch.value
}).chain(filter, delay, reverb).start();

$play.addEventListener('click', function() {
  osc1.volume.rampTo(1, 0.5);
});

$stop.addEventListener('click', function() {
  osc1.volume.rampTo(-Infinity, 0.5);
});

$freq.addEventListener('change', function() {
  const val = $freq.value;
  console.assert(typeof val === 'string');
  filter.set({
    frequency: val
  });
});

$depth.addEventListener('change', function() {
  const val = $depth.value;
  console.assert(typeof val === 'string');
  filter.set({
    depth: val
  });
});

$pitch.addEventListener('change', function() {
  const val = $pitch.value;
  console.assert(typeof val === 'string');
  osc1.frequency.rampTo($val);
});
