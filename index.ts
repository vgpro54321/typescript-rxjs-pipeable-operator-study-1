// Import stylesheets
import './style.css';
import { of, interval, timer } from 'rxjs';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

console.log('app start');

let o$ = timer(1000, 1000); //of(1, 2, 3);
o$.subscribe((x) => {
  console.log(x);
});
