import jss from 'jss';
import preset from 'jss-preset-default';
import normalize from 'normalize-jss';
import clockBgSvg from './assets/images/clock-bg.svg';
import hourHandSvg from './assets/images/hour-hand.svg';
import minuteHandSvg from './assets/images/minute-hand.svg';
import secondHandSvg from './assets/images/second-hand.svg';

jss.setup(preset());
jss.createStyleSheet(normalize).attach();

const styles = {
  clockBg: {
    width: 500,
    height: 500,
    backgroundImage: `url(${clockBgSvg})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourHand: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'right',
  },
  minuteHand: {
    position: 'absolute',
    transform: 'translate(0, -50%)',
    transformOrigin: 'bottom',
  },
  secondHand: {
    position: 'absolute',
    transform: 'translate(0, -50%)',
    transformOrigin: 'bottom',
  },
};

const { classes } = jss.createStyleSheet(styles).attach();

const now = new Date();
const hour = now.getHours();

const secondHand = document.createElement('img');
secondHand.src = secondHandSvg;
secondHand.classList.add(classes.secondHand);

let secondCurrentDeg = 0;
const secondDegStep = 360 / 24;
setInterval(() => {
  secondCurrentDeg += secondDegStep;
  secondHand.style.transform = `translate(0, -50%) rotate(${secondCurrentDeg}deg)`;
}, 50);

const minuteHand = document.createElement('img');
minuteHand.src = minuteHandSvg;
minuteHand.classList.add(classes.minuteHand);

let minuteCurrentDeg = 0;
const minuteDegStep = 360 / 24;
setInterval(() => {
  minuteCurrentDeg += minuteDegStep;
  minuteHand.style.transform = `translate(0, -50%) rotate(${minuteCurrentDeg}deg)`;
}, 1000);

const hourHand = document.createElement('img');
hourHand.src = hourHandSvg;
hourHand.classList.add(classes.hourHand);

let hourCurrentDeg = 0;
const hourDegStep = 360 / 24;
setInterval(() => {
  hourCurrentDeg += hourDegStep;
  hourHand.style.transform = `translate(-50%, -50%) rotate(${hourCurrentDeg}deg)`;
}, 1000);

const clockBg = document.createElement('div');
clockBg.classList.add(classes.clockBg);
clockBg.appendChild(hourHand);
clockBg.appendChild(minuteHand);
clockBg.appendChild(secondHand);

const app = document.querySelector('#app');
app.appendChild(clockBg);
