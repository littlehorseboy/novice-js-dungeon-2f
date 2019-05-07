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
    position: 'relative',
  },
  hourHand: {
    position: 'absolute',
    left: '36.2%',
    top: '48.6%',
    transformOrigin: '95.7% 50%',
  },
  minuteHand: {
    position: 'absolute',
    top: '30.93%',
    transformOrigin: '50% 96%',
  },
  secondHand: {
    position: 'absolute',
    top: '49.4%',
    transformOrigin: 'top',
  },
};

const { classes } = jss.createStyleSheet(styles).attach();

const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();
const second = now.getSeconds();

const secondHand = document.createElement('img');
secondHand.src = secondHandSvg;
secondHand.classList.add(classes.secondHand);

const minuteHand = document.createElement('img');
minuteHand.src = minuteHandSvg;
minuteHand.classList.add(classes.minuteHand);

const hourHand = document.createElement('img');
hourHand.src = hourHandSvg;
hourHand.classList.add(classes.hourHand);

let secondCurrentDeg = 180;
const secondDegStep = 360 / 60;
secondCurrentDeg += secondDegStep * second;
secondHand.style.transform = `rotate(${secondCurrentDeg}deg)`;
setInterval(() => {
  secondCurrentDeg += secondDegStep;
  secondHand.style.transform = `rotate(${secondCurrentDeg}deg)`;
}, 1000);

let minuteCurrentDeg = 0;
const minuteDegStep = 360 / 60;
minuteHand.style.transform = `rotate(${minuteCurrentDeg + minuteDegStep * minute}deg)`;
setInterval(() => {
  minuteCurrentDeg += minuteDegStep;
  minuteHand.style.transform = `rotate(${minuteCurrentDeg}deg)`;
}, 1000 * 60);

let hourCurrentDeg = 90;
const hourDegStep = 360 / 24;
hourHand.style.transform = `rotate(${hourCurrentDeg + hourDegStep * hour}deg)`;
setInterval(() => {
  hourCurrentDeg += hourDegStep;
  hourHand.style.transform = `rotate(${hourCurrentDeg}deg)`;
}, 1000 * 60 * 60);

const clockBg = document.createElement('div');
clockBg.classList.add(classes.clockBg);
clockBg.appendChild(hourHand);
clockBg.appendChild(minuteHand);
clockBg.appendChild(secondHand);

const app = document.querySelector('#app');
app.appendChild(clockBg);
