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

// 取得目前時間
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

// 秒針 分針 時針
// 設定目前旋轉角度，每次旋轉的角度
// 依照目前時間改變初始呈現的角度
let secondCurrentDeg = 180;
const secondDegStep = 360 / 60;
secondCurrentDeg += secondDegStep * second;
secondHand.style.transform = `rotate(${secondCurrentDeg}deg)`;

let minuteCurrentDeg = 0;
const minuteDegStep = 360 / 60;
minuteCurrentDeg += minuteDegStep * minute;
minuteHand.style.transform = `rotate(${minuteCurrentDeg}deg)`;

let hourCurrentDeg = 90;
const hourDegStep = 360 / 12;
hourCurrentDeg += hourDegStep * hour;
hourHand.style.transform = `rotate(${hourCurrentDeg}deg)`;

// 每秒累加秒針角度，並判斷以下情形
// 秒針指到 12 點，分針 +
// 分針指到 12 點，時針 +，並將分針目前角度歸 0，否則指到 12 點時每秒都 === 360
setInterval(() => {
  secondCurrentDeg += secondDegStep;
  secondHand.style.transform = `rotate(${secondCurrentDeg}deg)`;

  if ((secondCurrentDeg - 180) % 360 === 0) {
    minuteCurrentDeg += minuteDegStep;
    minuteHand.style.transform = `rotate(${minuteCurrentDeg}deg)`;
  }

  if (minuteCurrentDeg === 360) {
    minuteCurrentDeg = 0;
    hourCurrentDeg += hourDegStep;
    hourHand.style.transform = `rotate(${hourCurrentDeg}deg)`;
  }
}, 1000);

const clockBg = document.createElement('div');
clockBg.classList.add(classes.clockBg);
clockBg.appendChild(hourHand);
clockBg.appendChild(minuteHand);
clockBg.appendChild(secondHand);

const app = document.querySelector('#app');
app.appendChild(clockBg);
